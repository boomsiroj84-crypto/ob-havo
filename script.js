const apiKey = "597e25cdb154ff650382aad103127729";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const errorMsg = document.getElementById("error-msg");
const weatherInfo = document.getElementById("weather-info");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherInfo.style.display = "none";
            return;
        }

        const data = await response.json();

        // Ma'lumotlarni HTML elementlarga joylash
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        // Ob-havo holatiga qarab ikonkani o'zgartirish
        const weatherCondition = data.weather[0].main;
        
        if (weatherCondition == "Clouds") {
            weatherIcon.src = "https://openweathermap.org/img/wn/03d@4x.png";
        } else if (weatherCondition == "Clear") {
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@4x.png";
        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@4x.png";
        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "https://openweathermap.org/img/wn/09d@4x.png";
        } else if (weatherCondition == "Thunderstorm") {
            weatherIcon.src = "https://openweathermap.org/img/wn/11d@4x.png";
        } else if (weatherCondition == "Snow") {
            weatherIcon.src = "https://openweathermap.org/img/wn/13d@4x.png";
        } else {
            weatherIcon.src = "https://openweathermap.org/img/wn/50d@4x.png";
        }

        weatherInfo.style.display = "block";
        errorMsg.style.display = "none";

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}

// Tugma bosilganda qidirish
searchBtn.addEventListener("click", () => {
    if(cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

// Enter tugmasi bosilganda qidirish
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

// Dastur ishga tushganda standart shahar (masalan, Toshkent) ob-havosini ko'rsatish
checkWeather("Tashkent");