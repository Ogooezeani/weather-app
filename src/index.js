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
  let tempt = Math.round(response.data.main.temp);
  console.log(tempt);
  console.log(response);
  let temptElement = document.querySelector("#temp");
  temptElement.innerHTML = `${tempt}`;
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = response.data.main.humidity;
  let weather = document.querySelector("#weather-text");
  weather.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#windy");
  wind.innerHTML = response.data.wind.speed;
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
let searchInput = document.querySelector("#cities-form");

searchInput.addEventListener("submit", search);
let getLocation = document.querySelector("#get-location");
getLocation.addEventListener("click", getWeatherByLocation);
