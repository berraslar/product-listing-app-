import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('yellow');

  // ID’ye göre product’ı bul
const product = products.find(p => String(p._id || p.id) === String(id));


  // Ürün bulunamadıysa
  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#c00' }}>
        <h2>❌ Ürün bulunamadı veya yüklenmedi.</h2>
        <button onClick={() => navigate('/')} style={{
          marginTop: '1rem',
          background: '#eee',
          padding: '10px 16px',
          borderRadius: '6px',
          border: '1px solid #999',
          cursor: 'pointer'
        }}>
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const imageUrl = product.images[selectedColor];

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '2rem',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '1rem',
          background: '#eee',
          padding: '8px 12px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ← Geri Dön
      </button>

      <img
        src={imageUrl}
        alt={`${product.name} - ${selectedColor}`}
        style={{
          width: '100%',
          maxHeight: '400px',
          objectFit: 'contain',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      />

      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.name}</h2>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${product.priceUSD} USD</p>
      <p style={{ marginBottom: '1rem' }}>⭐ {product.rating} / 5</p>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Renk Seç:</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.keys(product.images).map(color => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor:
                  color === 'yellow' ? '#E6CA97' :
                  color === 'white' ? '#D9D9D9' : '#E1A4A9',
                border: selectedColor === color ? '2px solid black' : '1px solid #ccc',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductDetail;
