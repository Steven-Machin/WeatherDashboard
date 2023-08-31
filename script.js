const apiKey = '6cc235f929684f269d20f39ca1ec496d';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const forecastContainer = document.getElementById('forecastContainer');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;

    fetch(apiUrl + cityName + '&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            forecastContainer.innerHTML = '';

            const forecasts = data.list;
            for (let i = 0; i < forecasts.length; i += 8) {
                const date = new Date(forecasts[i].dt * 1000);
                const temperature = Math.round((forecasts[i].main.temp - 273.15) * 9/5 + 32); // Convert to Fahrenheit
                const description = forecasts[i].weather[0].description;
                const iconCode = forecasts[i].weather[0].icon;

                const forecastElement = document.createElement('div');
                forecastElement.classList.add('forecast');

                forecastElement.innerHTML = `
                    <p>Date: ${date.toDateString()}</p>
                    <p>Temperature: ${temperature} °F</p>
                    <p>Description: ${description}</p>
                    <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
                `;

                forecastContainer.appendChild(forecastElement);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
