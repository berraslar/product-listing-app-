const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
const goldPrice = 74.3; // USD/gram olarak sabit altın fiyatı


const rawProducts = [
  {
    "name": "Engagement Ring 1",
    "popularityScore": 0.85,
    "weight": 2.1,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-Y.jpg?v=1696588368",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-R.jpg?v=1696588406",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-W.jpg?v=1696588402"
    },
    "priceUSD": 288.66,
    "rating": 4.3
  },
  {
    "name": "Engagement Ring 2",
    "popularityScore": 0.51,
    "weight": 3.4,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG012-Y.jpg?v=1707727068",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG012-R.jpg?v=1707727068",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG012-W.jpg?v=1707727068"
    },
    "priceUSD": 381.46,
    "rating": 2.5
  },
  {
    "name": "Engagement Ring 3",
    "popularityScore": 0.92,
    "weight": 3.8,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG020-100P-Y.jpg?v=1683534032",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG020-100P-R.jpg?v=1683534032",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG020-100P-W.jpg?v=1683534032"
    },
    "priceUSD": 542.09,
    "rating": 4.6
  },
  {
    "name": "Engagement Ring 4",
    "popularityScore": 0.88,
    "weight": 4.5,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG022-100P-Y.jpg?v=1683532153",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG022-100P-R.jpg?v=1683532153",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG022-100P-W.jpg?v=1683532153"
    },
    "priceUSD": 628.58,
    "rating": 4.4
  },
  {
    "name": "Engagement Ring 5",
    "popularityScore": 0.8,
    "weight": 2.5,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG074-100P-Y.jpg?v=1696232035",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG074-100P-R.jpg?v=1696927124",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG074-100P-W.jpg?v=1696927124"
    },
    "priceUSD": 334.35,
    "rating": 4
  },
  {
    "name": "Engagement Ring 6",
    "popularityScore": 0.82,
    "weight": 1.8,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG075-100P-Y.jpg?v=1696591786",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG075-100P-R.jpg?v=1696591802",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG075-100P-W.jpg?v=1696591798"
    },
    "priceUSD": 243.41,
    "rating": 4.1
  },
  {
    "name": "Engagement Ring 7",
    "popularityScore": 0.7,
    "weight": 5.2,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG094-100P-Y.jpg?v=1696589183",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG094-100P-R.jpg?v=1696589214",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG094-100P-W.jpg?v=1696589210"
    },
    "priceUSD": 656.81,
    "rating": 3.5
  },
  {
    "name": "Engagement Ring 8",
    "popularityScore": 0.9,
    "weight": 3.7,
    "images": {
      "yellow": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG115-100P-Y.jpg?v=1696596076",
      "rose": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG115-100P-R.jpg?v=1696596151",
      "white": "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG115-100P-W.jpg?v=1696596147"
    },
    "priceUSD": 522.33,
    "rating": 4.5
  }
];

const products = rawProducts.map((product, index) => {
  const priceUSD = ((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2);
  return {
    id: index,
    ...product,
    priceUSD: Number(priceUSD)
  };
});


app.get('/api/products', (req, res) => {
  res.json(products);
});


app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Ürün bulunamadı" });
  }
  res.json(product);
});


app.listen(PORT, () => {
  console.log(`API çalışıyor: http://localhost:${PORT}`);
});