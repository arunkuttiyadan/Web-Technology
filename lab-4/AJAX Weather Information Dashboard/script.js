const result = document.getElementById("weatherResult");
const spinner = document.getElementById("spinner");

let weatherCache = {};

function getWeather()
{
    const city = document.getElementById("cityInput").value.trim();

    if(city === "")
    {
        result.innerHTML = "Please enter city name";
        result.className = "error";
        return;
    }

    // Check cache
    if(weatherCache[city])
    {
        displayWeather(weatherCache[city], city);
        return;
    }

    spinner.classList.remove("hidden");

    result.innerHTML = "";

    // Step 1: Get latitude and longitude using public API
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)

    .then(response => response.json())

    .then(data =>
    {
        if(!data.results)
        throw "City not found";

        const lat = data.results[0].latitude;
        const lon = data.results[0].longitude;

        // Step 2: Fetch weather data using public API
        return fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
    })

    .then(response => response.json())

    .then(data =>
    {
        spinner.classList.add("hidden");

        weatherCache[city] = data;

        displayWeather(data, city);
    })

    .catch(error =>
    {
        spinner.classList.add("hidden");

        result.innerHTML = error;
        result.className = "error";
    });
}

function displayWeather(data, city)
{
    const weather = data.current_weather;

    result.className = "success";

    result.innerHTML =
        "<b>City:</b> " + city + "<br>" +
        "<b>Temperature:</b> " + weather.temperature + " °C<br>" +
        "<b>Wind Speed:</b> " + weather.windspeed + " km/h<br>" +
        "<b>Weather Code:</b> " + weather.weathercode;
}
