document.addEventListener("DOMContentLoaded", function () {
  // Array of cities
  const cities = [
    { name: "London", latitude: "51.509865", longitude: "-0.118092" },
    { name: "Berlin", latitude: "52.5200", longitude: "13.4050" },
    { name: "Paris", latitude: "48.8566", longitude: "2.3522" },
    { name: "Edinburgh", latitude: "55.9533", longitude: "-3.1883" },
    { name: "Madrid", latitude: "40.4168", longitude: "-3.7038" },
    { name: "Birmingham", latitude: "52.4862", longitude: "-1.8904" },
  ];

  // Get the city list container and ul element
  const cityListContainer = document.getElementById("cityList");
  const ulElement = document.createElement("ul");

  // Loop through the cities array and create list items
  cities.forEach((city) => {
    const liElement = document.createElement("li");
    liElement.textContent = city.name;
    ulElement.appendChild(liElement);
  });

  // Append the ul element to the city list container
  cityListContainer.appendChild(ulElement);
});
