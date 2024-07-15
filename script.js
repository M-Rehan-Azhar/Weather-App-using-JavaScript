const apiKey = "0dbf17aa018fec5fc0fecb8897589260";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weathericon');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.windspeed').innerHTML = data.wind.speed + ' km/h';

        const weather = data.weather[0].main.toLowerCase();
        if (weather === 'clouds') {
            weatherIcon.src = "images/clouds.png";
        } else if (weather === 'clear') {
            weatherIcon.src = "images/clear.png";
        } else if (weather === 'rain') {
            weatherIcon.src = "images/rain.png";
        } else if (weather === 'drizzle') {
            weatherIcon.src = "images/drizzle.png";
        } else if (weather === 'mist') {
            weatherIcon.src = "images/mist.png";
        } else if (weather === 'haze') {
            weatherIcon.src = "images/haze.png";
        } else {
            weatherIcon.src = "images/default.png"; // A default image for conditions not specifically handled
        }

        document.querySelector('.weather').style.display = 'block';
        searchBox.value = ''; // Clear the input field
    } catch (error) {
        console.error('Error:', error.message);
        alert('City not found. Please try again.');
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Allow the Enter key to trigger the search
searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});
