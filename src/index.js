let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();

  let days = [
    "sunday",
    "monday",
    "tueday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  let dayOf = days[day];

  return `${dayOf} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed","Thur", "Fri", "Sat"];

  return days[day];

}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#predict");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) { 

    if (index < 5){
    forecastHTML = forecastHTML +
   `
        <div class="col-2">
          <div class="weather-forcast-day">${formatDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt=""
            width="40"
          />
          <div class="weather-forcast-temps">
            <span class="weather-forcast-temp-max"> ${Math.round(forecastDay.temp.max)}°</span>
            <span class="weather-forcast-temp-min"> ${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
          `;
    }
          });
          forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiLink).then(showForecast)
    .catch((err) => console.log(err));
}

function updateWeather(response) {
  let cityLabel = document.querySelector("#city-label");
  cityLabel.innerHTML = response.data.name;
  let dateElement = document.querySelector("#my-date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  celsiusTemperature = response.data.main.temp;
  let temptElement = document.querySelector("#temp");
  temptElement.innerHTML = Math.round(celsiusTemperature);
  fahLink.classList.remove("active");
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = response.data.main.humidity;
  let weather = document.querySelector("#weather-text");
  weather.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#windy");
  wind.innerHTML = response.data.wind.speed;
  let icon = document.querySelector("#weather-icon");
  icon.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  getForecast(response.data.coord);

}
function showcelsiusTemp(event){
  event.preventDefault();
  if (!celsiusTemperature) {
    return;
  }

  celLink.classList.add("active");
  fahLink.classList.remove("active");
  let temptElement = document.querySelector("#temp");
  temptElement.innerHTML = Math.round(celsiusTemperature);
}
function showfahrenheitTemp(event){
  event.preventDefault();
  if (!celsiusTemperature) {
    return;
  }

  let temptElement = document.querySelector("#temp");
  fahLink.classList.add("active");
  celLink.classList.remove("active");
  let fahrenhetTempt = (celsiusTemperature * 9) / 5 + 32;
  temptElement.innerHTML = Math.round(fahrenhetTempt);
}


function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric`;
  axios
    .get(`${apiLink}&appid=${apiKey}`)
    .then(updateWeather)
    .catch((err) => console.log(err));
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
      )
      .then(updateWeather)
      .catch((err) => console.log(err));
  });
}
let celsiusTemperature = null;

let searchInput = document.querySelector("#cities-form");

searchInput.addEventListener("submit", search);
let getLocation = document.querySelector("#get-location");
getLocation.addEventListener("click", getWeatherByLocation);

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", showfahrenheitTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showcelsiusTemp);

getWeatherByLocation();
