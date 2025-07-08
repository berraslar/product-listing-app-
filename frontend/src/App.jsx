import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterColor, setFilterColor] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  useEffect(() => {
    axios.get('https://product-listing-app-zvcz.onrender.com/api/products')

      .then(res => {
        const withExtras = res.data.map((p, index) => ({
          ...p,
          _id: p.id || String(index + 1), // id'yi _id olarak setle
          selectedColor: 'yellow',
          carouselIndex: 0
        }));
        setProducts(withExtras);
      })
      .catch(err => console.error("API Hatası:", err));
  }, []);

  const updateProduct = (index, updatedFields) => {
    const updated = [...products];
    updated[index] = { ...updated[index], ...updatedFields };
    setProducts(updated);
  };

  const filteredProducts = products
    .filter(p => {
      if (filterColor !== 'all' && !p.images[filterColor]) return false;
      if (minPrice && p.priceUSD < parseFloat(minPrice)) return false;
      if (maxPrice && p.priceUSD > parseFloat(maxPrice)) return false;
      if (minRating && p.rating < parseFloat(minRating)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return b.popularityScore - a.popularityScore;
      return 0;
    });

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Product list</h1>

            <div className="filter-panel">
              <div className="filter-group">
                <label>  Sırala:</label>
                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                  <option value="">Seç</option>
                  <option value="price-asc">Fiyat (Artan)</option>
                  <option value="price-desc">Fiyat (Azalan)</option>
                  <option value="rating">Puan (Yüksek)</option>
                  <option value="popularity">Popülerlik</option>
                </select>
              </div>

              <div className="filter-group">
                <label>  Renk:</label>
                <select onChange={(e) => setFilterColor(e.target.value)} value={filterColor}>
                  <option value="all">Tümü</option>
                  <option value="yellow">Sarı</option>
                  <option value="white">Beyaz</option>
                  <option value="rose">Rose</option>
                </select>
              </div>

              <div className="filter-group">
                <label>  Fiyat Aralığı:</label>
                <div className="price-inputs">
                  <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                  <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </div>
              </div>

              <div className="filter-group">
                <label> Minimum Puan:</label>
                <input type="number" placeholder="örn: 4" value={minRating} onChange={e => setMinRating(e.target.value)} min="0" max="5" step="0.1" />
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  index={index}
                  product={product}
                  updateProduct={updateProduct}
                />
              ))}
            </div>
          </div>
        } />

        <Route path="/product/:id" element={<ProductDetail products={products} />} />
      </Routes>
    </Router>
  );
}

export default App;
