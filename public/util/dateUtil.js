function getLocalTime() {
    var d = new Date();
    // Offset from UTC.. Convert the offset minutues to ms
    var offset = d.getTimezoneOffset()*60*1000;
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate;
}

function isCacheRecent(timestamp) {
    var currentTime = new Date().getTime();
    console.log("Current time in ms:" +currentTime);
    console.log("Cache timestamp in ms:" +timestamp);
    return (timestamp > currentTime - 5*60*1000);
}