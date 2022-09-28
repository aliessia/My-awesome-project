let now = new Date();
let h3 = document.querySelector("h3");
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
h3.innerHTML = `${day}, ${hours}:${minutes}`;
function submitBtn(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city").value;
  search(city);
}
function search(city) {
  let apiKey = "016941ffb8ff4863ebb702ba9639d53f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("button");
searchForm.addEventListener("click", submitBtn);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureunit = document.querySelector("#number");
  temperatureunit.innerHTML = `${temperature}`;
  let inputcity = document.querySelector("#current-city");
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let feeling = Math.round(response.data.main.feels_like);
  let feelsElement = document.querySelector("#feels-like");
  feelsElement.innerHTML = `Feels like: ${feeling}°`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function retrievePosition(position) {
  let apiKey = "016941ffb8ff4863ebb702ba9639d53f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function gocurrentButton() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", gocurrentButton);