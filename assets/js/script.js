const apiKey = "8eac768920bc228ecc692f30b2371da9";
let cityName;



    let fetchWeather = function (cityName) {
    let weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== "200") {
                console.log("City not found. Please try again");
                return;
            }
            // Use 'querySelector' to get the ID of where the Search for a City will be displayed
            var responseContainerEl = document.querySelector("#response-container");
            console.log(data)
            getCityInfo(data.city.coor.lat, data.city.coord.lon);
        })
        .catch(err => console.log(err));
};

    var searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", function () {
        cityName = $("#cityInput").val();
        fetchWeather(cityName);
    })

// get the preset buttons to return weather information
var presetCityButtons = document.querySelectorAll(".cityNames");
presetCityButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {

        //console.log(document.querySelectorAll(".cityNames"));
        cityName = e.target.innerText;
        fetchWeather(cityName);
        });
});

    // create container for city and all weather data
        let getCityInfo = function (lat, lon) {
            let uvAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + '&lon=' + lon + "&appid=8eac768920bc228ecc692f30b2371da9";
            fetch(uvApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $('.cityDate').html(cityName + " (" + toDateTime(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
            $('.temperature').text("Temp: " + data.current.temp);
            $('.wind').text("Wind: " + data.current.wind_speed + " MPH");
            $('.humidity').text("Humidity: " + data.current.humidity + " %");
            $('.uvIndex').html("UV Index: " + `<span class="btnColor">${data.current.uvi}</span>`);
            fiveDayForecast(data);

          
    });
};

// still need to create a container that contains the city, date, temp, wind, humidity and UV index
    let fiveDayForecast = function (data) {
        $('.fiveDayForecast').empty();
        for (let i = 0; i < 5; i++) {
            let day = $("<div class='day'><div />")
            console.log(fiveDayForecast);
           // $('.fiveDayForecast').append(fiveDayForecast[i]);
            $(day).append("<p>Temp: " + data.daily[i].temp.day);
            $(day).append("<p>Wind: " + data.daily[i].wind_speed + "MPH</p>");
            $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
            $('fiveDayForecast').append(day)
        };
    }