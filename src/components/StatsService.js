

// API URL
const apiURL = 'http://localhost:3033/win/loss';

const getBlackJackStats =  async () => {
  const response = await fetch(apiURL,
    {mode: 'no-cors'})

    .then(response => response.json())
    .then(data => console.log(data))
    return response;
}

export default getBlackJackStats;





