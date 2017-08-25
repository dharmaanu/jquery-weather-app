var temp, loc, desc, zip;
var APP_KEY = "6d1a9707e89064e6d72dcd49252bbcab";

function weatherByZip(zipCode) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "zip=" + zipCode +
        "&APPID=" + APP_KEY;
    sendRequest(url);
}

function weatherByLocation() {
    window.navigator.geolocation.getCurrentPosition(function(position) {
        var url = "http://api.openweathermap.org/data/2.5/weather?" +
            "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude +
            "&APPID=" + APP_KEY;
        sendRequest(url);
    });

}

function getZip() {
    var userZip = document.getElementById("zip").value;
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(userZip);
    if (isValidZip) {
        weatherByZip(userZip);
    } else {
        alert("Please enter a valid five digit zip!");
    }
}

function sendRequest(url) {

    var weatherReq = new XMLHttpRequest();
    weatherReq.onreadystatechange = function() {
        if (weatherReq.readyState == 4 && weatherReq.status == 200) {
            var data = JSON.parse(weatherReq.responseText);
            var weather = {};
            weather.description = data.weather[0].description;
            weather.location = data.name;
            weather.temp = kelvinToFarenheit(data.main.temp);
            update(weather);
        }
    }
    weatherReq.open("GET", url, true);
    weatherReq.send();
}

function update(weather) {
    desc.innerHTML = weather.description;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
}

function kelvinToFarenheit(k) {
    return Math.round(k * (9 / 5) - 459.67);
}

window.onload = function() {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    desc = document.getElementById("description");
    weatherByLocation();
}
