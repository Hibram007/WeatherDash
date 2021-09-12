 // defined variables

 // Fetch requests for 4 cities
//fetch request function - London
fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2370e41fc95d54a4723df2add8b6b547")
.then(resonse => resonse.json())
.then(data => console.log(data));

//fetch request function - Denver
fetch("https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=2370e41fc95d54a4723df2add8b6b547")
.then(resonse => resonse.json())
.then(data => console.log(data));
  
//fetch request function - Austin
fetch("https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=2370e41fc95d54a4723df2add8b6b547")
.then(resonse => resonse.json())
.then(data => console.log(data));

//fetch request function - L.A.
fetch("https://api.openweathermap.org/data/2.5/weather?q=Los angeles&appid=2370e41fc95d54a4723df2add8b6b547")
.then(resonse => resonse.json())
.then(data => console.log(data));

//fetch request based on user input 
var cityInputEl = document.getElementById(cityname);

// search button Dom linking
var buttonEl = document.querySelector(".btn");

 buttonEl.addEventListener("click", function() {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" +  /*city name given by user*/ cityInputEl + "&appid=2370e41fc95d54a4723df2add8b6b547")
  .then(resonse => resonse.json())
  .then(data => console.log(data));
  });


// conveting fetch weather API data into DOM elements

//var displayWeatherStats = function() {

//};


 // variable for entire form

 var cityFormEl = document.querySelector("#city-form");


  // Austin button 
  var AustinEl = document.querySelector(".city1-btn");

  AustinEl.addEventListener("click", function() {
     alert("Austin button clicked");
   });
  
 // L.A. button 
 var LosEl = document.querySelector(".city2-btn");

 LosEl.addEventListener("click", function() {
    alert(" L.A. button clicked");
  });

   // Denver button 
 var DenEl = document.querySelector(".city3-btn");

 DenEl.addEventListener("click", function() {
    alert("Denver button clicked");
  });
