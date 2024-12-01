const apikey = "d65b6d12eba45a9ece9c968424789701";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src =
        "https://static.vecteezy.com/system/resources/previews/000/441/818/original/cloudy-vector-icon.jpg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src =
        "https://purepng.com/public/uploads/large/purepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src =
        "https://th.bing.com/th/id/OIP.8PHFGsNm10OOMJbivlW-IAHaGT?rs=1&pid=ImgDetMain";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src =
        "https://thumbs.dreamstime.com/z/drizzle-vector-icon-white-background-flat-symbol-sign-modern-weather-collection-mobile-concept-web-apps-design-161788420.jpg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src =
        "https://cdn0.iconfinder.com/data/icons/weather-346/64/fog-weather-mist-1024.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchbtn.addEventListener("click", (event) => {
  event.preventDefault();
  const city = searchBox.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  checkweather(city);
});
