function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  let hour = now.getHours();
  let minutes = now.getMinutes();
  return `${day}, ${hour}:${minutes}`;
}

// align Lesson 5 documentation
//change icons
//unit conversion high and low

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "c3a1dbbef95c81796ec3bc620cb49ed6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
  //displayIcon(response);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsius = Math.round(response.data.main.temp);
  celsiusH = Math.round(response.data.main.temp_max);
  celsiusL = Math.round(response.data.main.temp_min);
  document.querySelector("#currentTemp").innerHTML = celsius;
  document.querySelector("#high").innerHTML = celsiusH;
  document.querySelector("#low").innerHTML = celsiusL;

  document.querySelector("#currentWind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector(
    "#currentHumidity"
  ).innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentDate").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function displayIcon(response) {
  if ((response.data.weather[0].main = "01d")) {
    document.querySelector("#currentEmoji").innerHTML = "clear_day";
  }
  if ((response.data.weather[0].main = "01n")) {
    document.querySelector("#currentEmoji").innerHTML = "clear_night";
  }
  if ((response.data.weather[0].icon = "02d")) {
    document.querySelector("#currentEmoji").innerHTML = "partly_cloudy_day";
  }
  if ((response.data.weather[0].icon = "02n")) {
    document.querySelector("#currentEmoji").innerHTML = "partly_cloudy_night";
  }
  if ((response.data.weather[0].icon = "03d" || "03n" || "04d" || "04n")) {
    document.querySelector("#currentEmoji").innerHTML = "cloudy";
  }

  if (
    (response.data.weather[0].main =
      "Mist" ||
      "Smoke" ||
      "Haze" ||
      "Dust" ||
      "Fog" ||
      "Sand" ||
      "Dust" ||
      "Ash" ||
      "Squall")
  ) {
    document.querySelector("#currentEmoji").innerHTML = "foggy";
  }
  if ((response.data.weather[0].main = "Tornado")) {
    document.querySelector("#currentEmoji").innerHTML = "tornado";
  }
  if ((response.data.weather[0].icon = "11d")) {
    document.querySelector("#currentEmoji").innerHTML = "thunderstorm";
  }
  if ((response.data.weather[0].icon = "13d")) {
    document.querySelector("#currentEmoji").innerHTML = "weather_snowy";
  }
  if ((response.data.weather[0].main = "Rain" || "Drizzle")) {
    document.querySelector("#currentEmoji").innerHTML = "rainy";
  }
}

function searchByLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c3a1dbbef95c81796ec3bc620cb49ed6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmitCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusConversion.classList.remove("active");
  fahrenheit.classList.add("active");

  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  let fahrenheitTempH = (celsiusH * 9) / 5 + 32;
  let fahrenheitTempL = (celsiusL * 9) / 5 + 32;
  let currentTempF = document.querySelector("#currentTemp");
  currentTempF.innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#high").innerHTML = Math.round(fahrenheitTempH);
  document.querySelector("#low").innerHTML = Math.round(fahrenheitTempL);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTempC = document.querySelector("#currentTemp");
  currentTempC.innerHTML = celsius;
  document.querySelector("#high").innerHTML = Math.round(celsiusH);
  document.querySelector("#low").innerHTML = Math.round(celsiusL);
}

let cityForm = document.querySelector("#searchCity");
cityForm.addEventListener("submit", handleSubmit);

let celsius = null;
document.querySelector("#currentTemp").innerHTML = celsius;
let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", handleSubmitCurrentLocation);

searchCity("Leimen");
