let now = new Date();
let date = document.querySelector("#date");
let hours = now.getHours();
if(hours < 10){
  hours = `0${hours}`}
  let minutes = now.getMinutes();
  if(minutes < 10){
    minutes = `0${minutes}`}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
date.innerHTML = `${day}, ${hours}:${minutes}`;
function submitBtn(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city").value;
  search(city);
}
function formatDay(timestamp) {
  let date = new Date(timestamp*1000)
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function search(city) {
  let apiKey = "016941ffb8ff4863ebb702ba9639d53f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("button");
searchForm.addEventListener("click", submitBtn);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#current-city");
  search(cityInputElement.value);
}

function displayForecast (response) {
  let forecast = response.data.daily; 
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  forecastHTML = forecastHTML +  `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)} </div> 
            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Few clouds" width="40" /> 
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
            </div>`;
    }
  });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML; 
};

function getForecast (coordinates) {
let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";
let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiurl).then(displayForecast);
};


function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-number");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature =response.data.main.temp;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  getForecast(response.data.coord);
}
function retrievePosition(position) {
  let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function gocurrentButton() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
let temperatureElement = document.querySelector("#temperature-number");
celsiuslink.classList.remove("active");
fahrenheitlink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-number");
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", gocurrentButton);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener ("click", showFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener ("click", showCelsiusTemperature);
search("Kyiv");