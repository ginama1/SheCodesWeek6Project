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
  displayIcon(response.data.weather[0].icon, response.data.weather[0].main);
  getForecast(response.data.coord);
  adoptBackgroundImage(response.data.weather[0].icon);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let forecastDay = new Date(timestamp * 1000);
  let day = forecastDay.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="container text-center row"> `;
  console.log(forecast);

  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);

    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="card" style="width: 10rem">
              <div class="card-body">
                <h5 class="card-title">${formatForecastDay(forecastDay.dt)}</h5>
                <p class="card-text">
                  <div class="material-symbols-outlined" class="forecast-icon">
                    ${getIconName(
                      forecastDay.weather[0].icon,
                      forecastDay.weather[0].main
                    )}
                  </div>
                 <strong class="forecast-high">${Math.round(
                   forecastDay.temp.max
                 )}°</strong> | <span class="forecast-low">${Math.round(
          forecastDay.temp.min
        )}°</span>
                </p>
              </div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayIcon(icon, main) {
  if (icon === "01d") {
    document.querySelector(`#currentEmoji`).innerHTML = "clear_day";
  } else if (icon === "01n") {
    document.querySelector(`#currentEmoji`).innerHTML = "clear_night";
  } else if (icon === "02d") {
    document.querySelector(`#currentEmoji,`).innerHTML = "partly_cloudy_day";
  } else if (icon === "02n") {
    document.querySelector(`#currentEmoji`).innerHTML = "partly_cloudy_night";
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    document.querySelector(`#currentEmoji`).innerHTML = "cloudy";
  } else if (
    (main =
      "Mist" ||
      main === "Smoke" ||
      main === "Haze" ||
      main === "Dust" ||
      main === "Fog" ||
      main === "Sand" ||
      main === "Dust" ||
      main === "Ash" ||
      main === "Squall")
  ) {
    document.querySelector(`#currentEmoji`).innerHTML = "foggy";
  } else if (main === "Tornado") {
    document.querySelector(`#currentEmoji`).innerHTML = "tornado";
  } else if (icon === "11d") {
    document.querySelector(`#currentEmoji`).innerHTML = "thunderstorm";
  } else if (icon === "13d") {
    document.querySelector(`#currentEmoji`).innerHTML = "weather_snowy";
  } else if (main === "Rain" || main === "Drizzle") {
    document.querySelector(`#currentEmoji`).innerHTML = "rainy";
  }
}
function getIconName(icon, main) {
  if (icon === "01d") {
    return "clear_day";
  } else if (icon === "01n") {
    return "clear_night";
  } else if (icon === "02d") {
    return "partly_cloudy_day";
  } else if (icon === "02n") {
    return "partly_cloudy_night";
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    return "cloudy";
  } else if (
    (main =
      "Mist" ||
      main === "Smoke" ||
      main === "Haze" ||
      main === "Dust" ||
      main === "Fog" ||
      main === "Sand" ||
      main === "Dust" ||
      main === "Ash" ||
      main === "Squall")
  ) {
    return "foggy";
  } else if (main === "Tornado") {
    return "tornado";
  } else if (icon === "11d") {
    return "thunderstorm";
  } else if (icon === "13d") {
    return "weather_snowy";
  } else if (main === "Rain" || main === "Drizzle") {
    return "rainy";
  }
}
function adoptBackgroundImage(icon) {
  console.log(icon);
  if (icon === "01d" || icon === "02d" || icon === "03d") {
    document.body.style.backgroundImage = "url('src/cloudy2.jpg')";
  } else if (icon === "01n" || icon === "02n" || icon === "03n") {
    document.body.style.backgroundImage = "url('src/nightClear.jpg')";
  } else if (
    icon === "09d" ||
    icon === "10d" ||
    icon === "11d" ||
    icon === "50d"
  ) {
    document.body.style.backgroundImage = "url('src/rainy.png')";
  } else if (icon === "04d" || icon === "04n") {
    document.body.style.backgroundImage = "url('src/rainy.png')";
  } else if (icon === "13d") {
    document.body.style.backgroundImage = "url('src/snowy.jpg')";
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
