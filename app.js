let apiKey = "2b873762a1a6adb48de7a31bdbe782c2";
let city = "Miami";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//The time of the day//

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let today1 = document.querySelector("#todayTime");
today1.innerHTML = `<b>${day}</b> ${month} ${date} (${hours}:${minutes})`;
