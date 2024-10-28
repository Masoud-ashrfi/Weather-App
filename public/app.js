//Selecting Elements
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const errorBox = document.querySelector(".error");
const errorText = document.querySelector(".error-text");

//Check weather based on a city
async function chechWeather(city) {
  const apiKey = "62fffd3d2a09cfc52802e5d488573ee0";
  errorBox.style.display = "none";

  try {
    //Fetching the data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Invalid city name`);
    }

    //Displaying the resault of API call on the screen(weather's information)
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp - 273.15) + "°C";

    //Making the iamge name based on the API's JSON(converting the first letter of an weather's condition to Uppercase)
    const dataWeather = data.weather[0].main
      .split(" ")
      .map((ch) => {
        return ch.charAt(0).toUpperCase() + ch.slice(1);
      })
      .join("");
    weatherIcon.src = `images/${dataWeather}.png`;

    weather.style.display = "block";
    searchInput.value = "";
  } catch (error) {
    //Checking for Networking issues
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      errorBox.style.display = "block";
      document.querySelector(".error-text").innerHTML =
        "Please check your internet connection.";
      weather.style.display = "none";
    } else {
      //Checking for Invalid city name
      errorBox.style.display = "block";
      errorText.innerHTML = error.message;
      weather.style.display = "none";
    }
  }
}

searchBtn.addEventListener("click", () => {
  chechWeather(searchInput.value);
});
