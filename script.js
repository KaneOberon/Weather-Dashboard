async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = "Loading...";

  try {
    // Get lat/lon from OpenCage
    const geoRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=8d33f8a1f1834ae9ac7c9b234da3c824`);
    const geoData = await geoRes.json();
    const { lat, lng } = geoData.results[0].geometry;

    // Get weather from Open-Meteo
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
    const weatherData = await weatherRes.json();
    const weather = weatherData.current_weather;

    resultDiv.innerHTML = `
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
      <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
      <p><strong>Condition Code:</strong> ${weather.weathercode}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = "Error fetching data. Try another city.";
    console.error(err);
  }
}
