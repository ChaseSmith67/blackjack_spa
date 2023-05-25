/**
 *  Retrieve statistics from the database via API call.
 */

const apiURL = 'http://localhost:3033/win/loss'; // API URL

export default async function getBlackJackStats() {
  const response = await fetch(apiURL);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}






