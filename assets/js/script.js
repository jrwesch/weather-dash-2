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
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8eac768920bc228ecc692f30b2371da9";
    fetch(weatherAPI)
        .then(function (response) {
            console.log(weatherAPI);
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== "200") {
                console.log("City not found. Please try again");
                return;
            }
            // Use 'querySelector' to get the ID of where the Search for a City will be displayed
            var responseContainerEl = document.querySelector("#res-container");
            console.log(data)
            getCityInfo(data.city.coor.lat, data.city.coord.lon);
        })
        .catch(err => console.log(err));
};

    var searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", function () {
        const cityName = $("#cityInput").val();
        fetchWeather(cityName);
    });

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
            console.log(data);
            const date = dayjs.unix(data.current.dt).format("M/D/YYYY"); // convert unix timestamp to date
            $('.cityDate').html(`${cityName} (${date}) <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
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
    };

    // save to local storage

    function getItems() {
        let storedCities = 
            JSON.parse(localStorage.getItem("saveHistory"));
        if (storedCities !== null) {
            saveHistory = storedCities;
        };
        // display up to 10 locations
        for (i =0; i < saveHistory.length; i++) {
            if (i == 10) {
                break;
            }
        // create link buttons
        cityListButton = $("<a>").attr({ class: "list-group-item list-group-item-action", href: "#"});

        //append history as button below search field
        cityListButton.text(saveHistory[i]);
        $(".list-group").append(cityListButton);
        }
    };

    // searches and adds to history (event)
    $("#searchCity").click(function () {
        cityName = $("#city").val().trim();
        getData();
        let checkArray = saveHistory.includes(city);
        if (checkArray == true) {
            return
        } else {
            saveHistory.push(cityName);
            localStorage.setItem("saveHistory", JSON.stringify(saveHistory));

            let cityListButton = $("<a>").attr({
                //list-group-item-action keeps teh search history buttons consistent
                class: "list-group-item-action", href: "#"
            });
            cityListButton.text(cityName);
            $(".list-group").append(cityListButton);
        };
    });

    // listen for action on the history buttons (event)
    $(".list-group-item").click(function () {
        city = $(this).text();
        getData();
    });