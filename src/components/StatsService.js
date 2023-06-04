/**
 *  Retrieve and update statistics from the database via API call.
 */

const apiURL = "http://localhost:3033/"; // API URL

// Fetch statistics from the API endpoint
async function getBlackJackStats() {
  const response = await fetch(apiURL + "win/loss");
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

// Add a win to the stats
async function addWin() {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(apiURL + "win", options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

// Add a loss to the stats
async function addLoss() {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(apiURL + "loss", options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

// Reset the win/loss statistics
async function resetStats() {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(apiURL + "reset", options);
  if (response.ok) {
    const data = await response.json();
    document.location.reload(); // Force reload
    return data;
  }
}

export { getBlackJackStats, addWin, addLoss, resetStats };
