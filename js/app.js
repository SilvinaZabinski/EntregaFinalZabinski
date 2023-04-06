const apiKey = "91e2d99b37cc0930c27a1d4634508efb";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const form = document.querySelector("form");
const cityInput = document.querySelector("#city");
const weatherDiv = document.querySelector("#weather");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const city = cityInput.value;
	getWeather(city);
});

function getWeather(city) {
	const url = `${baseUrl}${city}&appid=${apiKey}&units=metric`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			showWeather(data);
		})
		.catch(error => {
			console.error(error);
		});
}

function showWeather(data) {
	weatherDiv.innerHTML = `
		<h2>Clima en ${data.name}</h2>
		<p>Temperatura: ${data.main.temp}°C</p>
		<p>Descripción: ${data.weather[0].description}</p>
		<p>Velocidad del viento: ${data.wind.speed} km/h</p>
	`;
	weatherDiv.style.display = "block";
}

// Inicializa el mapa
var mymap = L.map('mapid').setView([0, 0], 2);

// Agrega una capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 {
    attribution: 'Map data &copy;<a href="https://www.openstreetmap.org/">OpenStreetMap</a>	contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

// Función para buscar la ciudad
function buscar() {
    // Obtiene el valor del input de la ciudad
    var ciudad = document.getElementById("city").value;

    // Realiza una solicitud a la API de geocodificación de OpenStreetMap
    fetch('https://nominatim.openstreetmap.org/search?q=' + ciudad + '&format=json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Obtiene las coordenadas de la ciudad
            var latitud = parseFloat(data[0].lat);
            var longitud = parseFloat(data[0].lon);

            // Agrega un marcador en la ubicación de la ciudad
            var marker = L.marker([latitud, longitud]).addTo(mymap);

            // Centra el mapa en la ubicación de la ciudad
            mymap.setView([latitud, longitud], 12);
        })
        .catch(function(error) {
            console.log(error);
        });
}
