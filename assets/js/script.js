let cityName;
let storedCity = JSON.parse(localStorage.getItem("City")) || [];

for (let i = 0; i < storedCity.length; i++) {
    var addCityButtons = document.createElement("button");
    addCityButtons.setAttribute("class", "cityNames");
    addCityButtons.textContent = storedCity[i];
    console.log(storedCity[i]);
    $("#presetCities").append(addCityButtons);
    addWeatherEventListener();
}

    let fetchWeather = function (cityName) {
    let weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=e87a068abe5c917d5633f3c922dca1d9";
    fetch(weatherAPI)
        .then(function (response) {
            //console.log(weatherAPI);
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== 200) {
                console.log("City not found. Please try again");
                return;
            }
            getCityInfo(data.coord.lat, data.coord.lon);
        })
        .catch(err => console.log(err));
};
// Get the preset buttons to return weather information
function addWeatherEventListener() {
    var presetCityButtons = document.querySelectorAll(".cityNames");
    presetCityButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            var cityName = e.target.innerText;
            fetchWeather(cityName);
        });
    });
}

// search button
    var searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", function () {
        var cityName = $("#cityInput").val();
        fetchWeather(cityName);
        console.log(storedCity);
        storedCity.push(cityName);

    let addNewButton = document.createElement("button");
    addNewButton.setAttribute("class", "cityNames");
    addNewButton.textContent = cityName;
    $("#presetCities").append(addNewButton);

    localStorage.setItem("City", JSON.stringify(storedCity));
    addWeatherEventListener();
    });


    // create container for city and all weather data
        let formatDate = function(unixTimestamp) {
            return dayjs(unixTimestamp * 1000).format('M/D/YYYY');
        }
        let getCityInfo = function (lat, lon) {
            let uvAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + '&lon=' + lon + "&APPID=e87a068abe5c917d5633f3c922dca1d9";
            console.log(uvAPI);
            fetch(uvAPI)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
            console.log(data);
            $('.cityDate').html(cityName + " (" + formatDate(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
            $('.temperature').text("Temp: " + data.current.temp + " °F");
            $('.wind').text("Wind: " + data.current.wind_speed + " MPH");
            $('.humidity').text("Humidity: " + data.current.humidity + " %");
            $('.uvIndex').html("UV Index: " + `<span class="btnColor">${data.current.uvi}</span>`);
            fiveDayForecast(data);

            if (data.current.uvi <= 2) {
                $(".btnColor").attr("class", "btn btn-success");
            };
            if (data.current.uvi > 2 && data.current.uvi <= 5) {
                $(".btnColor").attr("class", "btn btn-warning");
            };
            if (data.current.uvi > 5) {
                $(".btnColor").attr("class", "btn btn-danger");
            };    
          
    });
};

// still need to create a container that contains the city, date, temp, wind, humidity and UV index
    let fiveDayForecast = function (data) {
        $('.fiveDayForecast').empty();
        for (let i = 1; i < 6; i++) {
            console.log(data.daily[i]); //debug statement
            var day = $("<div class='day'><div />")
            $(day).append(toDateTime(data.daily[i].dt));
            $(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
            $(day).append("<p>Temp: " + data.daily[i].temp.day + " °F</p>");
            $(day).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
            $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
            $('.fiveDayForecast').append(day)
            
        };
    }
