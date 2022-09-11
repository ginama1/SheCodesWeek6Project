let now = new Date();
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
let minutes = ("0" + now.getMinutes()).slice(-2);
let date = `${day}, ${hour}:${minutes}`;
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = date;

//date in seperate function, get data from response (lesson 6)
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
  document.querySelector("#currentTemp").innerHTML = celsius;
  document.querySelector("#currentWind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector(
    "#currentHumidity"
  ).innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  document.querySelector("#highLow").innerHTML = `H: ${Math.round(
    response.data.main.temp_max
  )}°C L: ${Math.round(response.data.main.temp_min)}°C`;
  console.log(response);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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
  let currentTempF = document.querySelector("#currentTemp");
  currentTempF.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTempC = document.querySelector("#currentTemp");
  currentTempC.innerHTML = celsius;
}

let cityForm = document.querySelector("#searchCity");
cityForm.addEventListener("submit", handleSubmit);

let celsius = null;
let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", handleSubmitCurrentLocation);

searchCity("Leimen");
