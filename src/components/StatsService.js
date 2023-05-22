
  // API URL
  const apiURL = 'http://localhost:3033/win/loss';

  export default async function getBlackJackStats() {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      // console.log('Data: ', data);
      // console.log(JSON.stringify(data));
      // let stats = [];
      // for (let i = 0; i < data.length; i++) {
      //   stats.push(data[i].title, data[i].count)
      // }
      // return stats;
      return data;
    }
  }






