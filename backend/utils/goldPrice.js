const axios = require('axios');

const getGoldPriceUSD = async () => {
  try {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': 'goldapi-45f3d19mcu6bqbi-io',
        'Content-Type': 'application/json',
      },
    });

    return response.data.price;
  } catch (error) {
    console.error("Altın fiyatı alınırken hata oluştu:", error.message);
    return null;
  }
};

module.exports = getGoldPriceUSD;
