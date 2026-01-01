// weather.js
// Controls weather fetching, UI update, and view switching

// ----------------------------------
// HTML Elements
// ----------------------------------
const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");
const refreshBtn = document.getElementById("refresh-btn");

const locationEl = document.getElementById("location");
const mainTempEl = document.getElementById("main-temperature");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const windGustEl = document.getElementById("wind-gust");
const badgeEl = document.getElementById("weather-badge");

// ----------------------------------
// Populate dropdown with cities
// ----------------------------------
pakistanCities.forEach(city => {
  const option = document.createElement("option");
  option.value = city.name;
  option.textContent = city.name;
  citySelect.appendChild(option);
});

// ----------------------------------
// Fetch weather from Open-Meteo
// ----------------------------------
async function getWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m&hourly=relative_humidity_2m`
    );

    if (!res.ok) throw new Error("API Error");
    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// ----------------------------------
// Emoji badge based on temperature
// ----------------------------------
function getWeatherBadge(temp) {
  if (temp >= 35) return "🔥";
  if (temp >= 25) return "☀️";
  if (temp >= 15) return "🌤️";
  if (temp >= 5) return "🌥️";
  return "❄️";
}

// ----------------------------------
// Show weather on UI
// ----------------------------------
async function showWeather() {
  const selectedCityName = citySelect.value;
  if (!selectedCityName) return;

  const city = pakistanCities.find(c => c.name === selectedCityName);
  if (!city) {
    alert("City not found");
    return;
  }

  const data = await getWeather(city.lat, city.lon);
  if (!data) {
    alert("Failed to load weather");
    return;
  }

  // Switch views
  document.getElementById("selection-view").classList.add("hidden");
  document.getElementById("weather-info").classList.remove("hidden");

  // Location
  locationEl.textContent = city.name;

  // Temperature
  mainTempEl.textContent =
    data.current?.temperature_2m !== undefined
      ? `${data.current.temperature_2m} °C`
      : "N/A";

  // Feels like
  feelsLikeEl.textContent =
    data.current?.apparent_temperature !== undefined
      ? `${data.current.apparent_temperature} °C`
      : "N/A";

  // Wind
  windEl.textContent =
    data.current?.wind_speed_10m !== undefined
      ? `${data.current.wind_speed_10m}`
      : "N/A";

  // Wind gust
  windGustEl.textContent =
    data.current?.wind_gusts_10m !== undefined
      ? `${data.current.wind_gusts_10m}`
      : "N/A";

  // Humidity
  humidityEl.textContent =
    data.hourly?.relative_humidity_2m?.[0] !== undefined
      ? `${data.hourly.relative_humidity_2m[0]}`
      : "N/A";

  // Weather badge
  if (data.current?.temperature_2m !== undefined) {
    badgeEl.textContent = getWeatherBadge(data.current.temperature_2m);
  }
}

// ----------------------------------
// Events
// ----------------------------------
getWeatherBtn.addEventListener("click", showWeather);

refreshBtn.addEventListener("click", () => {
  document.getElementById("weather-info").classList.add("hidden");
  document.getElementById("selection-view").classList.remove("hidden");
  citySelect.value = "";
});
