const frm = document.querySelector("form");
const apiKey = "990a7b14056318ea064411f5411620c1";

const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

const toggleLoader = () => {
    loader.classList.toggle("hide");
};
// obter latitude e lngitude
const getWeatherLatLon = async (city) => {
    const apiWeatherLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`; 
  
    const res = await fetch(apiWeatherLatLon);
    const geo = await res.json();

    const lat = geo[0].lat;
    const lon = geo[0].lon;

    return [lat, lon];
};

const getWeatherData = async (city) => {
    //toggleLoader();
    const coordenadas = getWeatherLatLon();
    
    console.log(coordenadas);
    // const apiWeatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordenadas[0]}&lon=${coordenadas[1]}&&appid=${apiKey}`;

    // const res = await fetch(apiWeatherURL);
    // const data = await res.json();
  
    // toggleLoader();
    // console.log(data);
    // return data;
  };

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};
  
const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    hideInformation();
  
    const data = await getWeatherData(city);
  
    if (data.cod === "404") {
      showErrorMessage();
      return;
    }
  
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
  };
frm.addEventListener("submit", (e) => {
    //evita o envio do formulario
    e.preventDefault();

    // obter a cidade 
    const city = String(frm.inCity.value);

    // obter lat e lon da cidadem, pois o request do clima precisa desses dados
    getWeatherLatLon(city);
});

// const apiWeatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}`;