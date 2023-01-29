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
  //celLink.classList.remove("active");
  let fahrenhetTempt = (celsiusTemperature * 9) / 5 + 32;
  temptElement.innerHTML = Math.round(fahrenhetTempt);
}


let apiKey = "616b14cbd38253313b3b8852fa77335d";
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  console.log(cityInput);
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric`;
  axios
    .get(`${apiLink}&appid=${apiKey}`)
    .then(updateWeather)
    .catch((err) => console.log(err));
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

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

//document.querySelector("#cel-link").classList.remove("active");
