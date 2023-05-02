let cityName;

const apiKey = "8eac768920bc228ecc692f30b2371da9"
let weatherAPI;

let searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", function () {
        cityName = $("#cityInput").val();
        weatherAPI =  "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

        console.log(cityName);

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod === "404") {
                console.log("City not found...");
                    
                return;
            
            }

            let responseContainerEl = document.querySelector("#res-container");
                console.log(data)

        })
        .catch(err => console.log(err));

})