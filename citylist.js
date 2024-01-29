// document.addEventListener("DOMContentLoaded", function () {
//   // Array of cities
//   const cities = [
//     { name: "London", latitude: "51.509865", longitude: "-0.118092" },
//     { name: "Berlin", latitude: "52.5200", longitude: "13.4050" },
//     { name: "Paris", latitude: "48.8566", longitude: "2.3522" },
//     { name: "Edinburgh", latitude: "55.9533", longitude: "-3.1883" },
//     { name: "Madrid", latitude: "40.4168", longitude: "-3.7038" },
//     { name: "Birmingham", latitude: "52.4862", longitude: "-1.8904" },
//   ];

//   // Get the city list container and ul element
//   const cityListContainer = document.getElementById("cityList");
//   const ulElement = document.createElement("ul");

//   // Loop through the cities array and create list items
//   cities.forEach((city) => {
//     const liElement = document.createElement("li");
//     liElement.textContent = city.name;
//     // Add a class to the li element based on the city name
//     liElement.classList.add(city.name.toLowerCase());
//     cityListContainer.appendChild(liElement);
//   });

//   // Append the ul element to the city list container
//   cityListContainer.appendChild(ulElement);
// });
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "e27118a78c7a5b789fe3a5f1701f6849"; // Replace with your API key
  const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

  const searchForm = document.getElementById("searchForm");
  const cityInput = document.getElementById("cityInput");
  const cityListContainer = document.getElementById("cityList");
  const forecastSection = document.querySelector(".forecast-section");

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
    const { weather, main, wind } = data.list[0];
    const currentDate = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", dateOptions);

    const cityDetailHTML = `
      <h4>${data.city.name} (${formattedDate})</h4>
      <p>Weather: ${weather[0].description}</p>
      <p>Temperature: ${main.temp} &#8451;</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    `;

    forecastSection.innerHTML = cityDetailHTML;
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
