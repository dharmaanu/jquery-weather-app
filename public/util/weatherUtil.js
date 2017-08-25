var DEG = "c",
    weatherDiv = $('div.container');
/* Configuration */
// Mapping the weather codes returned by Yahoo's API
// to the correct icons in the img/icons folder
var weatherIconMap = [
    'storm', 'storm', 'storm', 'lightning', 'lightning', 'snow', 'hail', 'hail',
    'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'snow', 'snow', 'snow', 'snow',
    'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
    'cloud', 'cloud_moon', 'cloud_sun', 'cloud_moon', 'cloud_sun', 'moon', 'sun',
    'moon', 'sun', 'hail', 'sun', 'lightning', 'lightning', 'lightning', 'rain',
    'snowflake', 'snowflake', 'snowflake', 'cloud', 'rain', 'snow', 'lightning'
];

// Forming the query for Yahoo's weather forecasting API with YQL
// http://developer.yahoo.com/weather/
getWQLbyCity = function(city) {
    var wsql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")',
        weatherYQL = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(wsql) + '&format=json&callback=?',
        state, city, results;
    return weatherYQL;
}

function getWeatherForecast(wql, city) {
    $.getJSON(wql, function(response) {
        if (response.query && response.query.count == 1) {
            localStorage.weatherCache = JSON.stringify({
                timestamp: (new Date()).getTime(),
                data: response,
                location: city
            });
            addWeather(response);
        } else {
            showError("Error retrieving weather data! You may want to double check the city name!");
        }
    }).error(function() {
        showError("Your browser does not support CORS requests!");

    })
}

function addWeather(data) {

    var item = data.query.results.channel.item.condition,
        city = data.query.results.channel.location.city,
        state = data.query.results.channel.location.region;

    if (!item) {
        showError("We can't find weather information about your city!");
        return false;
    }
    $('span[class=header]').css("color", "yellow");
    $('span[class=header]').text("10 Day forecast for " + city + ", " + state);
    for (var i = 0; i < 10; i++) {
        item = data.query.results.channel.item.forecast[i];

        var code = item.code,
            day = item.day + ' <b>' + item.date.replace('\d+$', '') + '</b>',
            condition = item.text + ' <b>' + item.low + '°' + DEG + ' / ' + item.high + '°' + DEG + '</b>';
        var markup = "<ul><p class='day'>" + day + "</p>" +
            "<img src=img/icons/" + weatherIconMap[code] + ".png  width='150' height='80'/> </li>" +
            "<p class='temp'>" + condition + "</p></ul>";
        $("div[id='" + i + "']").empty();
         $("div[id='" + i + "']").show();
        $(markup).appendTo("div[id='" + i + "']");        
    }

}

function showError(msg) {
    $('span[class=header]').text(msg);
    $('span[class=header]').css("color", "red");
    for (var i = 0; i < 10; i++) {
        $("div[id='" + i + "']").hide();
    }
}
