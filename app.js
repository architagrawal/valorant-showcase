// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/agents"); // Replace with your API endpoint
    const result = await response.json();
    const data = result.data; // Adjust based on the API response structure
    // console.log(data);
    // Get the container
    const container = document.getElementById("container");

    // Iterate over the data array and create elements
    for (let i = 0; i < 5; i++) {
      const character = data[i];
      const box = document.createElement("div");
      box.classList.add("box");
      box.classList.add(`box-${i + 1}`);
      box.setAttribute("data-text", character.displayName); // Display name
      box.style.setProperty(
        "--background-image",
        `url(${character.background})`
      ); // Display icon
      // box.style.setProperty("")
      box.style.setProperty("--img", `url(${character.fullPortrait})`); // Full portrait
      let colorValues = character.backgroundGradientColors.map(
        (color) => `#${color}`
      );
      let backgroundGradientColors = `linear-gradient(0deg, ${colorValues.join(
        ", "
      )}`;
      //   box.style.backgroundImage = backgroundGradientColors;
      box.style.setProperty("--role-color", backgroundGradientColors);
      // Role color

      console.log(`linear-gradient(90deg, ${colorValues.join(", ")}`);

      container.appendChild(box);
    }
    //   data.forEach((character, index) => {
    //     const box = document.createElement("div");
    //     box.classList.add("box");
    //     box.classList.add(`box-${index + 1}`);
    //     box.style.setProperty("--img", `url(${character.fullPortrait})`); // Full portrait
    //     box.setAttribute("data-text", character.displayName); // Display name
    //     console.log(box);
    //     container.appendChild(box);
    //   });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the fetchData function when the page loads
window.onload = fetchData;
