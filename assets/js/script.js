const apiKey = "8eac768920bc228ecc692f30b2371da9"

var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function () {
    console.log("search button clicked");
    let cityName = $("#cityInput").val();
    console.log(cityName);
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
        })
        .catch(err => console.log(err));
})

// get the preset buttons to return weather information
var presetCityButtons = document.querySelectorAll(".cityNames");
presetCityButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        console.log(document.querySelectorAll(".cityNames"));
        let cityName = e.target.innerText;
        console.log(cityName);
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
            })
            .catch(err => console.log(err));
    });
});


// still need to create a container that contains the city, date, temp, wind, humidity and UV index
var jsonData;