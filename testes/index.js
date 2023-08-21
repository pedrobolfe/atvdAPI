let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -24.916511, lng: -53.417593 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = "Rua Natal 1080, Cascavel - PR";


  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

	
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  
  marker = new google.maps.Marker({
    map,
  });
  /* map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  }); */
  
   geocode({ address: inputText });

}


function geocode(request) {
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
			
      console.log(results);
      console.log(results[0].place_id);
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      //responseDiv.style.display = "block";
      //response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}
window.initMap = initMap;
