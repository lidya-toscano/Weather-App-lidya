// Date Java
let now = new Date();
let h4 = document.querySelector("h4");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
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

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
h4.innerHTML = `${day}, ${month} ${date} ${hours}:${mins}`;

//Form Java
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°";
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    "Wind Speed: " + Math.round(response.data.wind.speed) + "Km/h";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#next-forecast");
  forecastElement.innerHTML = "";
  let forecast = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.hourly[index];
    forecastElement.innerHTML += `
<div class="col-md-2 ms-auto">
<div><strong>
${displayHour(forecast.dt)}</strong>
<div>
<img class="icon-next"
src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
/>
<div>
   Max: ${Math.round(forecast.temp)}°
  </div>
 </div>
 `;
  }
}

function searchCity(city) {
  let apiKey = "3320ca0d42d8e30894a515d253ee5918";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall??q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    searchCity(city);
  } else {
    h2.innerHTML = null;
    alert("Please type something...");
  }
}

function searchLocation(position) {
  let apiKey = "3320ca0d42d8e30894a515d253ee5918";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayHour(time) {
  let date = new Date(time * 1000);
  console.log(date.getHours());

  let minutes = "0" + date.getMinutes();
  return date.getHours() + ":" + minutes.substr(-2);
}

function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let formCurrent = document.querySelector("#current-form");
formCurrent.addEventListener("submit", displayCurrent);

//temperature today java
let currentButton = document.querySelector("#current-button");

navigator.geolocation.getCurrentPosition(searchLocation);
