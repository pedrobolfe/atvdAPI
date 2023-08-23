let map;
let marker;
let geocoder;
let responseDiv;
let response;


const apiKey = ""; // CHAVE DA API DO BING

// 'use strict';
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = "";
    document.getElementById('distancia').value = '';
    document.getElementById('temp_aprox').value = "";
}

function preencherFormulario(data_bing, data_osrm) {
    // document.getElementById('endereco').value = data.logradouro;
    document.getElementById('latitude').value = data_bing.resourceSets[0].resources[0].point.coordinates[0];
    document.getElementById('longitude').value = data_bing.resourceSets[0].resources[0].point.coordinates[1];
    document.getElementById('distancia').value = (data_osrm.routes[0].distance / 1000).toFixed(2) + " Km"; // deixando em KM
    document.getElementById('temp_aprox').value = (data_osrm.routes[0].duration / 60).toFixed(2) + " min"; // deixando em minutos
}

async function cadastrarAluno() {
    const endereco = document.getElementById('endereco').value.replace(" ", "");
   
    // url para obter as coordenadas do ponto inicial, da para pegar outros dados tambem
    const url_origin = `https://dev.virtualearth.net/REST/v1/Locations?query=${endereco}&key=${apiKey}`;

    // OBter latitude e longitude
    // fazendo o request na API do bing maps (Microsoft)
    const dados_bing = await fetch(url_origin);
    // carregando o json da response
    const data_bing = await dados_bing.json();
    console.log(data_bing);
    // Coordenadas para fazer a consulta na API da OSRM
    // coordenadas do ponto inicial
    const lot_ini = data_bing.resourceSets[0].resources[0].point.coordinates[0];
    const lon_ini = data_bing.resourceSets[0].resources[0].point.coordinates[1];
    // cordenadas do destino (IFPR Campus Cascavel)
    const lot_fim = '-24.9172418';
    const lon_fim = '-53.4178149';
    
    // Obter a distancia e tempo de viagem
    // url para fazer consulta e obter a distancia do destino e viagem. A viagem esta no modo de carro para fazer os calculos
    const url_osrm = `http://router.project-osrm.org/route/v1/driving/`;

    // url complementar para a consulta na api da osrm
    const url_coordenas = `${lon_ini},${lot_ini};${lon_fim},${lot_fim}`;
    
    // fazendo o request na API da OSRM
    const dados_osrm = await fetch(url_osrm + url_coordenas);
    // carregando o json da response
    const data_osrm = await dados_osrm.json();

    // usando a biblioteca para geodecodificar as rotas obtidas na response da OSRM
    const georoute = data_osrm.routes[0].geometry

    //Se a consulta da API não retornar um CEP, um erro ocorre
    if (data_bing.hasOwnProperty('erro')) {
        document.getElementById('endereco').value = 'Endereço não encontrado!';    
    } else {
        preencherFormulario(data_bing, data_osrm);
    }
}

document.getElementById('endereco').addEventListener('focusout', cadastrarAluno);
