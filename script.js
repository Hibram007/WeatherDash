 // defined variables --- use jquery to set class to DomEL elements
var apiKey = "2370e41fc95d54a4723df2add8b6b547";
var searchBtn = $(".searchBtn");
 searchInput = $(".searchInput");

// Left column locations
let cityNameEl = $(".cityName");
let currentDateEl = $(".currentDate");
let weatherIconEl = $(".weatherIcon");
let searchHistoryEl = $(".historyItems");

// Right column locations
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".uvIndex");
let cardRow = $(".card-row");

// Code to set a current date at the top
var todayDate = new Date();
let dd = String(todayDate.getDate()).padStart(2, "0");
let mm = String(todayDate.getMonth() + 1).padStart(2, "0");
let yyyy = todayDate.getFullYear();
var todayDate = mm + "/" + dd + "/" + yyyy;


// error catching mech for no input.
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
  console.log("searchHistory not found");
} else {
  console.log("searchHistory loaded into searchHistoryArr");
  renderSearchHistory();
}

// if statment to check for null value when event listeneer is activated
searchBtn.on("click", function (e) {
  e.preventDefault();
  if (searchInput.val() === "") {
    alert("You must enter a city");
    return;
  }
  console.log("clicked button");
  getWeather(searchInput.val());
});

// event handler to run getWheather func
$(document).on("click", ".historyEntry", function () {
  console.log("clicked history item");
  let thisElement = $(this);
  getWeather(thisElement.text());
});

function renderSearchHistory(cityName) {
  searchHistoryEl.empty();
  let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < searchHistoryArr.length; i++) {
    // We put newListItem in loop because otherwise the text of the li element changes, rather than making a new element for each array index
    let newListItem = $("<li>").attr("class", "historyEntry");
    newListItem.text(searchHistoryArr[i]);
    searchHistoryEl.prepend(newListItem);
  }
}

// setting specific values to a variable for desired stats to be displayed
function renderWeatherData(
  cityName,
  cityTemp,
  cityHumidity,
  cityWindSpeed,
  cityWeatherIcon,
  uvVal
) {
  cityNameEl.text(cityName);
  currentDateEl.text(`(${todayDate})`);
  tempEl.text(`Temperature: ${cityTemp} °F`);
  humidityEl.text(`Humidity: ${cityHumidity}%`);
  windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
  uvIndexEl.text(`UV Index: ${uvVal}`);
  weatherIconEl.attr("src", cityWeatherIcon);
}

function getWeather(desiredCity) {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (weatherData) {
    let cityObj = {
      cityName: weatherData.name,
      cityTemp: weatherData.main.temp,
      cityHumidity: weatherData.main.humidity,
      cityWindSpeed: weatherData.wind.speed,
      cityUVIndex: weatherData.coord,
      cityWeatherIconName: weatherData.weather[0].icon,
    };
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`;
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (uvData) {
      if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
        let searchHistoryArr = [];
        // Keeps user from adding the same city to the searchHistory array list more than once
        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
          searchHistoryArr.push(cityObj.cityName);
          // store our array of searches and save
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(searchHistoryArr)
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
          renderSearchHistory(cityObj.cityName);
        } else {
          console.log(
            "City already in searchHistory. Not adding to history list"
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
        }
      } else {
        let searchHistoryArr = JSON.parse(
          localStorage.getItem("searchHistory")
        );
        // Keeps user from adding the same city to the searchHistory array list more than once
        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
          searchHistoryArr.push(cityObj.cityName);
          // store our array of searches and save
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(searchHistoryArr)
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
          renderSearchHistory(cityObj.cityName);
        } else {
          console.log(
            "City already in searchHistory. Not adding to history list"
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
        }
      }
    });
  });
}
