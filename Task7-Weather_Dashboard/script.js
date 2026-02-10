async function getLocation() {
  let locationData = localStorage.getItem("locationData") || null;
  
  if (locationData) {
    today = new Date().toISOString().split('T')[0];
    if (JSON.parse(locationData).date !== today) {
      localStorage.removeItem("locationData");
      return await getLocation();
    }
    return JSON.parse(locationData);
  } 
  else {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const data = response.data;
      data.date = new Date().toISOString().split('T')[0];
      localStorage.setItem("locationData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  }
}

//if i was using backend i would put this api key in a .env file instead of being public in frontend code
const apiKey = "e6fe53c9c7da670e0144d51baeced77a";
let cities = [];
const loadingScreen = document.getElementsByClassName("loading-screen")[0];
let currentUnit = localStorage.getItem("temperatureUnit") || "C";
let currentWeatherData = null;
let currentForecastData = null;
let currentCity = null;

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function formatTemperature(celsius) {
  if (currentUnit === "F") {
    return Math.round(celsiusToFahrenheit(celsius));
  }
  return Math.round(celsius);
}

function getUnitSymbol() {
  return currentUnit === "F" ? "°F" : "°C";
}

function showLoading() {
  if (loadingScreen) {
    loadingScreen.style.display = "flex";
  }
}

function hideLoading() {
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
}

async function onLoadWeather() {
  /*
 {
    "coord": {
        "lon": 31.2044,
        "lat": 30.0046
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 22.42,
        "feels_like": 21.53,
        "temp_min": 21.9,
        "temp_max": 22.42,
        "pressure": 1013,
        "humidity": 31,
        "sea_level": 1013,
        "grnd_level": 1007
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.39,
        "deg": 287,
        "gust": 8.33
    },
    "clouds": {
        "all": 2
    },
    "dt": 1770745661,
    "sys": {
        "type": 1,
        "id": 2514,
        "country": "EG",
        "sunrise": 1770698375,
        "sunset": 1770737962
    },
    "timezone": 7200,
    "id": 360995,
    "name": "Giza",
    "cod": 200
}
  */

  const storedCities = localStorage.getItem("cities");
  cities = storedCities ? JSON.parse(storedCities) : [];
  
  showLoading();
  
  try {
    data = await getLocation();
    res = await callWeatherAPI(data.city, { lat: data.latitude, lon: data.longitude });
    const forecastData = await callForecastAPI({ lat: data.latitude, lon: data.longitude });
    
    if (res) {
      currentWeatherData = res;
      currentForecastData = forecastData;
      currentCity = data.city;
      
      let time = firstBoxUI(res , data.city);
      hourly_ui(res , time, forecastData);
      weekly_forecast_ui(forecastData, res.timezone);
      
      if (cities.length > 0) {
        await loadExistingCities();
      }
    }
  } catch (error) {
    console.error("Error loading weather:", error);
    alert("Failed to load weather data. Please refresh the page.");
  } finally {
    hideLoading();
  }
}


async function callWeatherAPI(city, { lat, lon } = {}) {
  let getLat, getLon;
  if (lat == undefined || lon == undefined) {
    try {
      const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.length > 0) {
        getLat = response.data[0].lat;
        getLon = response.data[0].lon;
      } else {
        console.error("City not found:", city);
        return null;
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      return null;
    }
  }

  if (getLat && getLon) {
    lat = getLat;
    lon = getLon;
  }

  if (!lat || !lon) {
    console.error("Invalid coordinates:", { lat, lon });
    return null;
  }

  try {
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await axios.get(weatherURL);
    return res.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

async function callForecastAPI({ lat, lon }) {
  try {
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await axios.get(forecastURL);
    console.log("Forecast data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
}

async function loadExistingCities() {
  const cityList = document.querySelector(".other-cities");
  const addButton = cityList.querySelector(".add_city");
  
  const existingCityItems = cityList.querySelectorAll(".city-item");
  existingCityItems.forEach(item => item.remove());
  
  for (const cityData of cities) {
    try {
      const data = await callWeatherAPI(cityData.name);
      if (data) {
        const updatedCityData = {
          name: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          weatherId: data.weather[0].id,
          time: new Date((data.dt + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
        };
        
        const cityItem = document.createElement("div");
        const img = getWeatherIcon(updatedCityData.weatherId);
        cityItem.className = "city-item";
        
        const deleteDiv = document.createElement("div");
        deleteDiv.className = "delete";
        deleteDiv.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        cityItem.appendChild(deleteDiv);
        
        const firstCol = document.createElement("div");
        firstCol.className = "first-col";
        firstCol.innerHTML = `
          <p class="city-time">${updatedCityData.time}</p>
          <p class="city-name">${updatedCityData.name}</p>
        `;
        cityItem.appendChild(firstCol);
        
        const secondCol = document.createElement("div");
        secondCol.className = "second-col";
        secondCol.appendChild(img);
        secondCol.innerHTML += `<p class="city-temp">${formatTemperature(updatedCityData.temp)}${getUnitSymbol()}</p>`;
        cityItem.appendChild(secondCol);
        
        cityList.insertBefore(cityItem, addButton);
      }
    } catch (error) {
      console.error(`Error loading city ${cityData.name}:`, error);
    }
  }
}

document.addEventListener("DOMContentLoaded", onLoadWeather);

function firstBoxUI(data, city){

  const time = document.querySelector(".time");
  const date = new Date((data.dt + data.timezone) * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  time.textContent = `${dayName} ${timeString}`;

  const cityName = document.querySelector(".city-name");
  cityName.textContent = city;

  const cityDesc = document.querySelector(".weather-description");
  cityDesc.textContent = data.weather[0].description;

  const descIcon = document.querySelector(".descIcon");
  const weatherIcon = getWeatherIcon(data.weather[0].id);
  descIcon.innerHTML = "";
  descIcon.appendChild(weatherIcon);

  const temp = document.querySelector(".temprature");
  temp.textContent = `${formatTemperature(data.main.temp)}${getUnitSymbol()}`;

  const feels_like = document.querySelector(".feelsLike");
  feels_like.textContent = `FL ${formatTemperature(data.main.feels_like)}${getUnitSymbol()}`;

  const humidity = document.querySelector(".humidity");
  humidity.textContent = `Humidity ${data.main.humidity}%`;

  return timeString;
}


function hourly_ui(data, time, forecastData) {
  const temp = document.querySelector(".temp_value");
  const feels_like = document.querySelector(".feels_like_temp");
  const wind_speed = document.querySelector(".wind_value");
  const humidity = document.querySelector(".humidity_value");
  const pressure = document.querySelector(".pressure_value");

  temp.textContent = `${formatTemperature(data.main.temp)}${getUnitSymbol()}`;
  feels_like.textContent = `${formatTemperature(data.main.feels_like)}${getUnitSymbol()}`;
  wind_speed.textContent = `${data.wind.speed} m/s`;
  humidity.textContent = `${data.main.humidity}%`;
  pressure.textContent = `${data.main.pressure} hPa`;

  if (forecastData) {
    getHourlyTemp(data, time, forecastData);
  }

}

function getHourlyTemp(data, time, forecastData) {
  const lowerDiv = document.querySelector(".lower");
  lowerDiv.innerHTML = "";
  
   const currentTimestamp = data.dt;
  const futureForecasts = forecastData.list
    .filter(forecast => forecast.dt > currentTimestamp)
    .slice(0, 5);
  
  futureForecasts.forEach(forecast => {
    const localTime = new Date((forecast.dt + data.timezone) * 1000);
    const hour = localTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true,
      timeZone: 'UTC' 
    });
    
   const hourlyItem = document.createElement('div');
    hourlyItem.className = 'hourly-item';
    
    const hourText = document.createElement('p');
    hourText.className = 'hour';
    hourText.textContent = hour;
    hourlyItem.appendChild(hourText);
    
    const weatherIcon = getWeatherIcon(forecast.weather[0].id);
    
    weatherIcon.style.color = "var(--box-visible-color)";
    weatherIcon.classList.add('hourly-icon');
    hourlyItem.appendChild(weatherIcon);
    
    const tempText = document.createElement('p');
    tempText.className = 'hourly-temp';
    tempText.textContent = `${formatTemperature(forecast.main.temp)}${getUnitSymbol()}`;
    hourlyItem.appendChild(tempText);
    
    lowerDiv.appendChild(hourlyItem);
  });
}

function weekly_forecast_ui(forecastData, timezone) {
  if (!forecastData || !forecastData.list) return;
  
  const weeklyForecastDiv = document.querySelector(".weekly-forecast");
  weeklyForecastDiv.innerHTML = "";
  
  const dailyForecasts = {};
  
  forecastData.list.forEach(forecast => {
    const date = new Date((forecast.dt + timezone) * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = {
        date: date,
        temps: [],
        weatherIds: [],
        forecasts: []
      };
    }
    
    dailyForecasts[dateKey].temps.push(forecast.main.temp);
    dailyForecasts[dateKey].weatherIds.push(forecast.weather[0].id);
    dailyForecasts[dateKey].forecasts.push(forecast);
  });
  
  const dailyForecastArray = Object.values(dailyForecasts).slice(0, 7);
  
  dailyForecastArray.forEach((dayData, index) => {
    const maxTemp = Math.max(...dayData.temps);
    const minTemp = Math.min(...dayData.temps);
    
    const weatherIdCounts = {};
    dayData.weatherIds.forEach(id => {
      weatherIdCounts[id] = (weatherIdCounts[id] || 0) + 1;
    });
    const mostCommonWeatherId = parseInt(Object.keys(weatherIdCounts).reduce((a, b) => 
      weatherIdCounts[a] > weatherIdCounts[b] ? a : b
    ));
    
    const dayName = dayData.date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    const dateStr = dayData.date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', timeZone: 'UTC' });
    
    const dayItem = document.createElement('div');
    dayItem.className = 'weekly-day-item';
    if (index === 0) dayItem.classList.add('today');
    
    const dayNameEl = document.createElement('p');
    dayNameEl.className = 'day-name';
    dayNameEl.textContent = dayName;
    dayItem.appendChild(dayNameEl);
    
    const dateEl = document.createElement('p');
    dateEl.className = 'day-date';
    dateEl.textContent = dateStr;
    dayItem.appendChild(dateEl);
    
    const weatherIcon = getWeatherIcon(mostCommonWeatherId);
    weatherIcon.classList.add('weekly-icon');
    dayItem.appendChild(weatherIcon);
    
    const tempEl = document.createElement('p');
    tempEl.className = 'day-temps';
    tempEl.innerHTML = `H ${formatTemperature(maxTemp)}° <span class="low-temp">L ${formatTemperature(minTemp)}°</span>`;
    dayItem.appendChild(tempEl);
    
    weeklyForecastDiv.appendChild(dayItem);
  });
}

function getWeatherIcon(weatherCode) {
  const span = document.createElement("span");
  span.className="material-symbols-outlined";

  if (weatherCode >= 200 && weatherCode <= 232) {
    // Thunderstorm
    span.textContent = "thunderstorm";
    span.style.color = "#9333ea";
    return span;
    
  } else if (weatherCode >= 300 && weatherCode <= 321) {
    // Drizzle
    span.textContent = "rainy_light";
    span.style.color = "#38bdf8";
    return span;
    
  } else if (weatherCode >= 500 && weatherCode <= 531) {
    // Rain
    span.textContent = "rainy";
    span.style.color = "#3b82f6";
    return span;
    
  } else if (weatherCode >= 600 && weatherCode <= 622) {
    // Snow
    span.textContent = "weather_snowy";
    span.style.color = "#e0f2fe";
    return span;

  } else if (weatherCode >= 701 && weatherCode <= 781) {
    span.textContent = "foggy";
    span.style.color = "#94a3b8";
    return span;
    
  } else if (weatherCode === 800) {
    // Clear sky
    span.textContent = "clear_day";
    span.style.color = "#fbbf24";
    return span;
    
  } else if (weatherCode >= 801 && weatherCode <= 804) {
    // Cloud
    span.textContent = "cloud";
    span.style.color = "#cbd5e1";
    return span;
  }
  
  span.textContent = "partly_cloudy_day";
  span.style.color = "#94a3b8";
  return span;
}

document.querySelector(".other-cities").addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    const cityItem = deleteBtn.closest(".city-item");
    const cityName = cityItem.querySelector(".city-name").textContent;
    
    cities = cities.filter(city => city.name !== cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
    
    cityItem.remove();
  }
});

document.querySelector(".add_city").addEventListener("click", async () => {
  if(cities.length >= 3){
    alert("You can only add up to 3 cities");
    return;
  }
  const city = prompt("Enter city name:");
  if (city && city.trim() !== "") {
    showLoading();
    try {
      const data = await callWeatherAPI(city);
      if (data) {
        const cityData = {
          name: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          weatherId: data.weather[0].id,
          time: new Date((data.dt + data.timezone) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
        };
        cities.unshift(cityData);
        localStorage.setItem("cities", JSON.stringify(cities));

        const cityList = document.querySelector(".other-cities");
        const cityItem = document.createElement("div");
        const img = getWeatherIcon(cityData.weatherId);
        cityItem.className = "city-item";
        
        const deleteDiv = document.createElement("div");
        deleteDiv.className = "delete";
        deleteDiv.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        cityItem.appendChild(deleteDiv);
        
        const firstCol = document.createElement("div");
        firstCol.className = "first-col";
        firstCol.innerHTML = `
          <p class="city-time">${cityData.time}</p>
          <p class="city-name">${cityData.name}</p>
        `;
        cityItem.appendChild(firstCol);
        
        const secondCol = document.createElement("div");
        secondCol.className = "second-col";
        secondCol.appendChild(img);
        secondCol.innerHTML += `<p class="city-temp">${formatTemperature(cityData.temp)}${getUnitSymbol()}</p>`;
        cityItem.appendChild(secondCol);
        
        const addButton = cityList.querySelector(".add_city");
        cityList.insertBefore(cityItem, addButton);
      } else {
        alert("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error adding city:", error);
      alert("An error occurred. Please try again.");
    } finally {
      hideLoading();
    }
  }
});

document.querySelector(".search-btn").addEventListener("click", async () => {
  const searchInput = document.querySelector(".end input");
  let city = searchInput.value;
  if (city.trim() !== "") {
    showLoading();
    try {
      const data = await callWeatherAPI(city);
      if (data) {
        currentWeatherData = data;
        currentCity = data.name;
        
        firstBoxUI(data, data.name);
        const forecastData = await callForecastAPI({ lat: data.coord.lat, lon: data.coord.lon });
        if (forecastData) {
          currentForecastData = forecastData;
          hourly_ui(data, null, forecastData);
          weekly_forecast_ui(forecastData, data.timezone);
        }
        searchInput.value = "";
      } else {
        alert("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error searching for city:", error);
      alert("An error occurred. Please try again.");
    } finally {
      hideLoading();
    }
  }
});

document.querySelector(".end input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector(".search-btn").click();
  }
});

document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    const clickedUnit = e.target.textContent.includes("C") ? "C" : "F";
    
    if (clickedUnit === currentUnit) return;
    
    currentUnit = clickedUnit;
    localStorage.setItem("temperatureUnit", currentUnit);
    
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    
    if (currentWeatherData && currentForecastData && currentCity) {
      firstBoxUI(currentWeatherData, currentCity);
      hourly_ui(currentWeatherData, null, currentForecastData);
      weekly_forecast_ui(currentForecastData, currentWeatherData.timezone);
      await loadExistingCities();
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.remove("active");
    if ((currentUnit === "C" && btn.textContent.includes("C")) ||
        (currentUnit === "F" && btn.textContent.includes("F"))) {
      btn.classList.add("active");
    }
  });
});