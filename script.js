var getweatherData = function() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}")
  };
  
  getweatherData();

  // figure out how to use this web api ( re read the module 6)