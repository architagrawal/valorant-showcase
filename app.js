let rotationInterval;
let displayIndex = 0;
let data = [];

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch("https://valorant-api.com/v1/agents"); // Replace with your API endpoint
    const result = await response.json();
    data = result.data; // Adjust based on the API response structure
    data = result.data.filter((character) => character.isPlayableCharacter);
    // Get the container
    const container = document.getElementById("container");

    // Display the first five agents initially
    displayIndex = 0;
    let displayedAgents = data.slice(displayIndex, displayIndex + 5);
    updateDisplayedAgents(displayedAgents);

    // Set an interval to update the displayed agents every 3 seconds
    rotationInterval = setInterval(rotateAgents, 3000);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update the displayed agents
function updateDisplayedAgents(agents) {
  const container = document.getElementById("container");
  container.innerHTML = ""; // Clear existing agents

  agents.forEach((character, i) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.classList.add(`box-${i + 1}`);
    box.setAttribute("data-text", character.displayName); // Display name
    box.style.setProperty("--background-image", `url(${character.background})`); // Display icon
    box.style.setProperty("--img", `url(${character.fullPortrait})`); // Full portrait
    let colorValues = character.backgroundGradientColors.map(
      (color) => `#${color}`
    );
    let backgroundGradientColors = `linear-gradient(0deg, ${colorValues.join(
      ", "
    )}`;

    box.addEventListener("mouseenter", () => {
      let columnWidthbase = [1, 1, 1, 1, 1];
      columnWidthbase[i % 5] = 3;
      let columnWidth = columnWidthbase.map((num) => `${num}fr`).join(" ");
      container.style.gridTemplateColumns = columnWidth;
      clearInterval(rotationInterval); // Pause rotation on hover
    });

    box.addEventListener("mouseleave", () => {
      rotationInterval = setInterval(rotateAgents, 3000); // Resume rotation on leave
      // document.body.style.background = "";
      container.style.gridTemplateColumns = "1fr 1fr 1.5fr 1fr 1fr";
    });

    box.style.setProperty("--role-color", backgroundGradientColors);
    container.appendChild(box);
  });
}

// Function to rotate the agents
function rotateAgents() {
  displayIndex = (displayIndex + 1) % data.length;
  let displayedAgents = data.slice(displayIndex, displayIndex + 5);

  // If the slice exceeds the length, wrap around from the beginning
  if (displayedAgents.length < 5) {
    displayedAgents = displayedAgents.concat(
      data.slice(0, 5 - displayedAgents.length)
    );
  }

  updateDisplayedAgents(displayedAgents);
}

// Call the fetchData function when the page loads
window.onload = fetchData;
