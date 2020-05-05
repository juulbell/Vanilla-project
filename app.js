let apiKey = "2b873762a1a6adb48de7a31bdbe782c2";
let city = "frankfurt";
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
  let month = months[date.getDate()];
  let dato = date.getUTCDate();
  return `(${hours}:${minutes}) <br><strong>${day}</strong>, ${dato} of ${month}`;
}

//The Temperatur, city, wind, humidity//

function displayTemperatur(response) {
  let temperaturElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#weatherHumidity");
  let windElement = document.querySelector("#weatherWind");
  let maxMimElement = document.querySelector("#weatherMaxMin");
  let dateElement = document.querySelector("#todayTime");
  let iconsElement = document.querySelector("#upperIcon");

  temperaturElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `Wind: <strong>${Math.round(
    response.data.wind.speed
  )} km/h </strong>`;
  humidityElement.innerHTML = `Humidity: <strong>${response.data.main.humidity}%</strong>`;
  maxMimElement.innerHTML = `Max/Min Temp.: <strong>${Math.round(
    response.data.main.temp_max
  )}˚/${Math.round(response.data.main.temp_min)}˚ </strong>`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconsElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconsElement.setAttribute("alt", response.data.weather[0].description);
}

axios.get(apiUrl).then(displayTemperatur);

//The search input //

//The search input //

function search(city) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let apiKey = "2b873762a1a6adb48de7a31bdbe782c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperatur);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);
