let apiKey = "2b873762a1a6adb48de7a31bdbe782c2";
let city = "Frankfurt";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//The time of the day//

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDate()];
  return `${day} ${hours}:${minutes}`;
}

//Sunrise and sunset of the day//

function formatSunsetAndSunrise(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//The Temperatur, city, wind, humidity//

function displayTemperatur(response) {
  let temperaturElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#weatherHumidity");
  let windElement = document.querySelector("#weatherWind");
  let sunriseElement = document.querySelector("#weathersunrise");
  let dateElement = document.querySelector("#todayTime");
  temperaturElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  sunriseElement.innerHTML = `Sunrise/Sunset: ${formatSunsetAndSunrise(
    response.data.sys.sunrise * 1000
  )}/${formatSunsetAndSunrise(response.data.sys.sunset * 1000)}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  console.log(response.data);
}

axios.get(apiUrl).then(displayTemperatur);
