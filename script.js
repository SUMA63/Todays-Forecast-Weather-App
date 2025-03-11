document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");

    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const pressure = document.getElementById("pressure");

    const container = document.body;

    const API_KEY = "82700e7757c5066beb400f678a0bdf0c"; // Replace with your API key

    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                cityName.textContent = data.name;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
                description.textContent = data.weather[0].description;
                humidity.textContent = `${data.main.humidity}%`;
                windSpeed.textContent = `${data.wind.speed} km/h`;
                pressure.textContent = `${data.main.pressure} hPa`;

                // Change background and icon based on weather
                const weatherMain = data.weather[0].main.toLowerCase();
                changeBackground(weatherMain);
                updateIcon(weatherMain);
            })
            .catch(() => alert("City not found!"));
    }

    function changeBackground(weather) {
        let bgImage = "media/default.jpg";
        if (weather.includes("c")) bgImage = "media/cloudy.jpg";
        else if (weather.includes("rain")) bgImage = "media/rainy.jpg";
        else if (weather.includes("storm")) bgImage = "media/storm.jpg";
        else if (weather.includes("clear")) bgImage = "media/clear sky.jpg";
        container.style.backgroundImage = `url('${bgImage}')`;
    }

    function updateIcon(weather) {
        let icon = "icons/cloudy.png";
        if (weather.includes("cloud")) icon = "icons/cloudy.png";
        else if (weather.includes("rain")) icon = "icons/rainy.png";
        else if (weather.includes("storm")) icon = "icons/storm.png";
        else if (weather.includes("clear")) icon = "icons/clear sky.jpg";
        weatherIcon.src = icon;
    }
});
