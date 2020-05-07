//Time of the day//
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dato = date.getUTCDate();
  return `(${hours}:${minutes}) <br><strong>${day}</strong>, ${dato} of ${month}`;
}

//Forcast hours//
function formatHours(timestamp) {
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
function displayTemperature(response) {
  let temperaturElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#weatherHumidity");
  let windElement = document.querySelector("#weatherWind");
  let feelsLike = document.querySelector("#feels");
  let dateElement = document.querySelector("#todayTime");
  let iconsElement = document.querySelector("#upperIcon");

  celsiusTemperature = response.data.main.temp;
  FeelksLikeTemp = response.data.main.feels_like;

  temperaturElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind: <strong>${Math.round(
    response.data.wind.speed
  )} km/h </strong>`;
  humidityElement.innerHTML = `Humidity: <strong>${response.data.main.humidity}%</strong>`;
  feelsLike.innerHTML = `Feels like: <strong>${Math.round(
    FeelksLikeTemp
  )}˚ </strong>`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconsElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconsElement.setAttribute("alt", response.data.weather[0].description);
}

//Forecast //

function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    let max = Math.round(forecast.main.temp_max);
    let min = Math.round(forecast.main.temp_min);
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="forecast-temperature">
      <span id="maxTemp">
      <strong>${max}˚</strong>
        </span>
       <span id="minTemp"> 
        ${min}˚
        </span>
      </div>
    </div>
  `;
  }
}

//The search input //
function search(city) {
  let apiKey = "2b873762a1a6adb48de7a31bdbe782c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//Convert celcius to farenheit //
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let feelsLikeElement = document.querySelector("#feels");
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  let feelsLikeConvert = (FeelksLikeTemp * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  feelsLikeElement.innerHTML = `Feels like: <strong>${Math.round(
    feelsLikeConvert
  )}˚</strong>`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feels");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelsLikeElement.innerHTML = `Feels like: <strong>${Math.round(
    FeelksLikeTemp
  )}˚</strong>`;
}

let max = null;
let min = null;
let FeelksLikeTemp = null;
let celsiusTemperature = null;
// Button location//

function showPosition(position) {
  let apiKey = "2b873762a1a6adb48de7a31bdbe782c2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
  let urlNew = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlNew).then(dispalyForecast);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Add button backgrounds//

function morning() {
  backgroundColorBig.setAttribute("id", "morgningDiv");
  backgroundColorButtons.setAttribute("id", "morgningDiv");
  backgroundColorSmall.setAttribute("id", "morgningDiv");
}

function day() {
  backgroundColorBig.setAttribute("id", "dayDiv");
  backgroundColorButtons.setAttribute("id", "dayDiv");
  backgroundColorSmall.setAttribute("id", "dayDiv");
}

function night() {
  backgroundColorBig.setAttribute("id", "nightDiv");
  backgroundColorButtons.setAttribute("id", "nightDiv");
  backgroundColorSmall.setAttribute("id", "nightDiv");
}

// Added queastion "where are you from?"//

let backgroundColorBig = document.querySelector(".weather-big-container");
let backgroundColorButtons = document.querySelector(".buttonsBackgrounds");
let backgroundColorSmall = document.querySelector(".smallForcast");

let ShowLocation = document.querySelector("#locationButton");
ShowLocation.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
