function displayDate(dayTime) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = currentDate.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayArray = days[day];
  return `${dayArray} ${hours}:${minutes}`;
}
function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#windy").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSub(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function findLocation(position) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function showFahrenheit(event) {
  event.preventDefault;
  let temperatureId = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = temperatureId.innerHTML;
  temperature = Number(temperature);
  temperatureId.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function showCelsius(event) {
  event.preventDefault;
  let celsiusDegree = document.querySelector("#degree");
  celsiusLink.classList.add("active");
  fahrenheit.classList.remove("active");
  let celsius = celsiusDegree.innerHTML;
  celsiusDegree.innerHTML = Math.round(((celsius - 32) * 5) / 9);
}
let dateId = document.querySelector("#date");
let currentDate = new Date();
dateId.innerHTML = displayDate(currentDate);

let searchId = document.querySelector("#search");
searchId.addEventListener("submit", handleSub);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

search("uyo");
