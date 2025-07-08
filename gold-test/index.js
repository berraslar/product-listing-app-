const express = require('express');
const app = express();
const PORT = 4000;

app.get('/api/gold-price', (req, res) => {
  res.json({ price: 1234.56 });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

