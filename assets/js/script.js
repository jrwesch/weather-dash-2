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
    let weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=e87a068abe5c917d5633f3c922dca1d9&units=imperial";
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
            let uvAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + '&lon=' + lon + "&APPID=e87a068abe5c917d5633f3c922dca1d9&units=imperial";
            console.log(uvAPI);
            fetch(uvAPI)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
            console.log(data);
            $('.cityDate').html(cityName + " (" + formatDate(data.list[0].dt) + ")" ) // in the city variable
            $('.temperature').text("Temp: " + data.list[0].main.temp + " °F");
            $('.wind').text("Wind: " + data.list[0].wind.speed + " MPH");
            $('.humidity').text("Humidity: " + data.list[0].main.humidity + " %");
            fiveDayForecast(data);

            if (data.uvi <= 2) {
                $(".btnColor").attr("class", "btn btn-success");
            };
            if (data.current.uvi > 2 && data.uvi <= 5) {
                $(".btnColor").attr("class", "btn btn-warning");
            };
            if (data.uvi > 5) {
                $(".btnColor").attr("class", "btn btn-danger");
            };    
          
    });
};

// still need to create a container that contains the city, date, temp, wind, humidity and UV index
    let fiveDayForecast = function (data) {
        console.log(data.list[0]);
        $('.fiveDayForecast').empty();
        for (let i = 1; i <= 41; i+=8) {
            var day = $("<div class='day'><div />")
            $(day).append(formatDate(data.list[i].dt));
            $(day).append("<p>Temp: " + data.list[i].main.temp + " °F</p>");
            $(day).append("<p>Wind: " + data.list[i].wind.speed+ " MPH</p>");
            $(day).append("<p>Humidity: " + data.list[i].main.humidity + " %</p>");
            $('.fiveDayForecast').append(day)
            
        };
    }

