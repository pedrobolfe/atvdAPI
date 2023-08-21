#polyline is a Python implementation of Google’s Encoded Polyline Algorithm Format. It is essentially a port of Mapbox polyline with some additional features.
#Follium used to draw maps
from fastapi import FastAPI
import requests
import folium, polyline

#Adicionar chave do BING maps
#python3 -m uvicorn main:app --reload
#127.0.0.0/docs para testar o GET


API_KEY = ""

app = FastAPI()

     
@app.get("/data/{addr_origin}/{addr_destination}")
def geo_data(addr_origin,addr_destination):

    #Bing Maps request URL to get locations 
    url_origin = f"https://dev.virtualearth.net/REST/v1/Locations?query={addr_origin}&key={API_KEY}"
    url_destination = f"https://dev.virtualearth.net/REST/v1/Locations?query={addr_destination}&key={API_KEY}"


    #Getting requests from url
    response_origin = requests.get(url_origin)
    response_dest = requests.get(url_destination)
    
    #Converting data to JSON
    json_dataORG = response_origin.json()
    json_dataDEST = response_dest.json()
    
    #Getting coordinates data from JSON
    origin = json_dataORG['resourceSets'][0]['resources'][0]['point']['coordinates']
    destination = json_dataDEST['resourceSets'][0]['resources'][0]['point']['coordinates']

    #Defining long and lat variables
    origin_lat,origin_long = origin[0],origin[1]
    dest_lat,dest_long = destination[0],destination[1]

    #OSRM url to get distance information
    locations = '{},{};{},{}'.format(origin_long,origin_lat,dest_long,dest_lat)
    url_osrm = "http://router.project-osrm.org/route/v1/driving/"

    #Request to get data
    OSRM_data = requests.get(url_osrm+locations)

    #Converting data to JSON
    OSRM_response = OSRM_data.json()

    #Getting distance data and creating variables
    distanceDATA = OSRM_response['routes'][0]
    distanceMetters= distanceDATA['distance']
    distanceKm = distanceMetters/1000

    #Getting duration data in seconds
    durationSeconds = OSRM_response['routes'][0]['duration']
    durationMin = durationSeconds/60

    #Decodes the polyline string response into coordinates
    geocoded_routes = polyline.decode(OSRM_response['routes'][0]['geometry'])

    follium_map = folium.Map(location=[(origin_lat + dest_lat)/2, 
                             (origin_long + dest_long)/2], 
                   zoom_start=13)

    folium.PolyLine(
        geocoded_routes,
        weight=8,
        color='blue',
        opacity=0.6
    ).add_to(follium_map)

    folium.Marker(
        location=[origin_lat,origin_long],
        icon=folium.Icon(icon='play', color='green')
    ).add_to(follium_map)

    folium.Marker(
        location=[dest_lat,dest_long],
        icon=folium.Icon(icon='stop', color='red')
    ).add_to(follium_map)

    #Saving the follium object in a html file
    follium_map.save('map.html')
    
    string_follium = str(follium_map)
    
    #Output 
    return {'Latitude do ponto de origem': origin_lat,
            'Longitude do ponto de origem': origin_long,
            'Latitude do ponto de destino': dest_lat, 
            'Longitude do ponto de destino': dest_long,
            'Duração da rota em segundos': durationSeconds,
            'Duração da rota em minutos': durationMin,
            'Distância em metros': distanceMetters,
            'Distância em quilômetros': distanceKm,
            'Decodificação da rota em coordenadas':geocoded_routes,
            'Objeto follium do mapa desenhado, disponível no html':string_follium 
    }