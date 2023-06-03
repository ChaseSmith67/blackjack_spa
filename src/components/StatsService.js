/**
 *  Retrieve and update statistics from the database via API call.
 */

const apiURL = "http://localhost:3033/"; // API URL

async function getBlackJackStats(user = null) {
  if (user) {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: { name: user },
    };
    const response = await fetch(apiURL + "stats", options);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } else {
    const response = await fetch(apiURL + "win/loss");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
}

async function addWin(user) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { name: user },
  };
  const response = await fetch(apiURL + "win", options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

async function addLoss(user) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { name: user },
  };
  const response = await fetch(apiURL + "loss", options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export { getBlackJackStats, addWin, addLoss };