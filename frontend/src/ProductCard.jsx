import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ product, index, updateProduct }) {
  const {
    id,
    name,
    priceUSD,
    rating,
    images = {},
    selectedColor,
    carouselIndex
  } = product;

  const imageKeys = Object.keys(images);

  const handleColorChange = (color, e) => {
    e.stopPropagation();
    e.preventDefault();
    updateProduct(index, { selectedColor: color, carouselIndex: 0 });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const nextIndex = (carouselIndex + 1) % imageKeys.length;
    updateProduct(index, {
      carouselIndex: nextIndex,
      selectedColor: imageKeys[nextIndex]
    });
  };

  const handlePrev = (e) => {
    e.preventDefault();
    const prevIndex = (carouselIndex - 1 + imageKeys.length) % imageKeys.length;
    updateProduct(index, {
      carouselIndex: prevIndex,
      selectedColor: imageKeys[prevIndex]
    });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id || product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

        <div className="image-container" style={{ position: 'relative' }}>
          <img
            src={images[selectedColor]}
            alt={`${name} - ${selectedColor}`}
            loading="lazy"
          />
          <button onClick={handlePrev} className="carousel-btn left">←</button>
          <button onClick={handleNext} className="carousel-btn right">→</button>
        </div>

        <h3>{name}</h3>
        <p><strong>${priceUSD}</strong> USD</p>
        <p>Rating: {rating} / 5</p>
      </Link>

      <div className="color-options">
        {imageKeys.map((color) => (
          <div
            key={color}
            className={selectedColor === color ? 'selected' : ''}
            onClick={(e) => handleColorChange(color, e)}
            style={{
              backgroundColor:
                color === 'yellow' ? '#E6CA97' :
                color === 'white' ? '#D9D9D9' :
                '#E1A4A9',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: selectedColor === color ? '2px solid #000' : '1px solid #aaa',
              cursor: 'pointer'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    priceUSD: PropTypes.number,
    rating: PropTypes.number,
    images: PropTypes.object,
    selectedColor: PropTypes.string,
    carouselIndex: PropTypes.number
  }).isRequired,
  
  index: PropTypes.number.isRequired,
  updateProduct: PropTypes.func.isRequired
};

export default ProductCard;
