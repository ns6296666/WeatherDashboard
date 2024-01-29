// // document.addEventListener("DOMContentLoaded", function () {
// //   // Array of cities
// //   const cities = [
// //     { name: "London", latitude: "51.509865", longitude: "-0.118092" },

// document.addEventListener("DOMContentLoaded", function () {
//   const apiKey = "e27118a78c7a5b789fe3a5f1701f6849"; // Replace with your API key
//   const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

//   const searchForm = document.getElementById("searchForm");
//   const cityInput = document.getElementById("cityInput");
//   const cityListContainer = document.getElementById("cityList");
//   const forecastSection = document.querySelector(".forecast-section");

//   // Event listener for the form submission
//   searchForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const cityName = cityInput.value.trim();
//     if (cityName !== "") {
//       fetchWeather(cityName);
//       cityInput.value = ""; // Clear the input after submission
//     }
//   });

//   // Function to fetch weather data
//   async function fetchWeather(city) {
//     try {
//       const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
//       const data = await response.json();

//       if (response.ok) {
//         displayWeather(data);
//         addToSearchHistory(city);
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   }

//   // Function to display weather information
//   function displayWeather(data) {
//     console.log("data", data);
//     const { weather, main, wind } = data.list[0];
//     const currentDate = new Date();
//     const dateOptions = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     const formattedDate = currentDate.toLocaleDateString("en-US", dateOptions);

//     // Map weather icon code to OpenWeatherMap icon URL
//     const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

//     const cityDetailHTML = `
//       <h4>${data.city.name} (${formattedDate}) <img src="${iconUrl}" alt="Weather Icon" width="50" height="50"></h4>
//       <span>Weather: ${weather[0].description}</span>
//       <p>Temperature: ${main.temp} &#8451;</p>
//       <p>Humidity: ${main.humidity}%</p>
//       <p>Wind Speed: ${wind.speed} m/s</p>

//     `;

//     forecastSection.innerHTML = cityDetailHTML;
//   }
//   // Display 5-day forecast
//   const daysForecastHTML = data.list.slice(1, 6).map((day) => {
//     const dayDate = new Date(day.dt_txt);
//     const dayFormattedDate = dayDate.toLocaleDateString("en-US", dateOptions);

//     return `
//       <div class="day">
//         <p>${dayFormattedDate}</p>
//         <p><img src="${iconUrl(
//           day.weather[0].icon
//         )}" alt="Weather Icon" width="30" height="30"></p>
//         <p>Temp: ${day.main.temp} &#8451;</p>
//         <p>Wind: ${day.wind.speed} m/s</p>
//         <p>Humidity: ${day.main.humidity}%</p>
//       </div>
//     `;
//   });

//   document.querySelector(".days-forecast").innerHTML =
//     daysForecastHTML.join("");

//   // Function to add city to the search history
//   function addToSearchHistory(city) {
//     const liElement = document.createElement("li");
//     liElement.textContent = city;
//     liElement.classList.add("city-item");
//     liElement.addEventListener("click", function () {
//       fetchWeather(city);
//     });

//     cityListContainer.appendChild(liElement);
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "e27118a78c7a5b789fe3a5f1701f6849"; // Replace with your API key
  const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
  const cityInput = document.getElementById("cityInput");
  const cityListContainer = document.getElementById("cityList");
  const searchForm = document.getElementById("searchForm");

  let iconUrl = ""; // Initialize iconUrl

  // Event listener for the form submission
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName !== "") {
      fetchWeather(cityName);
      cityInput.value = ""; // Clear the input after submission
    }
  });

  // Function to fetch weather data
  async function fetchWeather(city) {
    try {
      const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
      const data = await response.json();

      if (response.ok) {
        displayWeather(data);
        addToSearchHistory(city);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  // Function to display weather information
  function displayWeather(data) {
    console.log("data", data);
    const currentWeather = data.list[0];
    const currentDate = new Date(currentWeather.dt_txt);
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Map weather icon code to OpenWeatherMap icon URL
    iconUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;

    const cityDetailHTML = `
      <h4>${data.city.name} (${formattedDate}) <img src="${iconUrl}" alt="Weather Icon" width="50" height="50"></h4>
      <span>Weather: ${currentWeather.weather[0].description}</span>
      <p>Temperature: ${currentWeather.main.temp} &#8451;</p>
      <p>Humidity: ${currentWeather.main.humidity}%</p>
      <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `;

    const forecastSection = document.querySelector(".forecast-section");
    forecastSection.innerHTML = cityDetailHTML;

    // Display 5-day forecast
    const daysForecastHTML = data.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(1, 6)
      .map((day) => {
        const dayDate = new Date(day.dt_txt);
        const dayFormattedDate = dayDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Map weather icon code to OpenWeatherMap icon URL
        const dayIconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        return `
          <div class="day">
            <p>${moment(dayFormattedDate).format("DD-MM-YYYY")}</p>
            <p><img src="${dayIconUrl}" alt="Weather Icon" width="30" height="30"></p>
            <p>Temp: ${day.main.temp} &#8451;</p>
            <p>Wind: ${day.wind.speed} m/s</p>
            <p>Humidity: ${day.main.humidity}%</p>
          </div>
        `;
      });

    forecastSection.innerHTML +=
      ' <h5 class="forecast-heading">5-Day Forecast:</h5><div class="days-forecast">' +
      daysForecastHTML.join("") +
      "</div>";
  }

  // Function to add city to the search history
  function addToSearchHistory(city) {
    const liElement = document.createElement("li");
    liElement.textContent = city;
    liElement.classList.add("city-item");
    liElement.addEventListener("click", function () {
      fetchWeather(city);
    });

    cityListContainer.appendChild(liElement);
  }
});
