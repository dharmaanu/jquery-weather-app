$(function() {
    var cityDiv = document.getElementById('city'),
        cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache),
        city = cache ? cache.location : "Sunnyvale, ca",
        wql;

    var options = {
        types: ['(regions)'],
        componentRestrictions: {
            country: "us"
        }
    };
    var autocomplete = new google.maps.places.Autocomplete(cityDiv, options);
    getWeather(city);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        if (typeof autocomplete.getPlace().address_components == "undefined") {
            showError("Please choose a city from autocomplete!");
        } else {
            city = autocomplete.getPlace().address_components[0].long_name + "," + autocomplete.getPlace().address_components[2].short_name;
            getWeather(city);
        }
    });

    function getWeather(city) {

        if (cache && cache.timestamp && isCacheRecent(cache.timestamp) && cache.location && cache.location === city) {
            console.log("Adding from cache");
            addWeather(cache.data);
        } else {
            console.log("Making a new request");
            wql = getWQLbyCity(city);
            getWeatherForecast(wql, city);
        }
    }
    setInterval(function() {
        localStorage.clear(); // Empty the cache after 15 minutes
    }, (1000 * 60 * 15));
});
