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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  maxMimElement.innerHTML = `Max/Min Temp.: ${Math.round(
    response.data.main.temp_max
  )}˚/${Math.round(response.data.main.temp_min)}˚`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconsElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconsElement.setAttribute("alt", response.data.weather[0].description);
}

axios.get(apiUrl).then(displayTemperatur);
