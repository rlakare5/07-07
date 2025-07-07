import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';

const data = {
  Water: [
    { id: 1, name: 'Mineral Water', price: '₹20.00', image: img1 },
    { id: 2, name: 'Sparkling Water', price: '₹25.00', image: img2 },
  ],
  Coldrink: [
    { id: 3, name: 'Orange juice', price: '₹75.00', image: img2 },
    { id: 4, name: 'Peach juice', price: '₹85.00', image: img3 },
    { id: 5, name: 'Grapes juice', price: '₹80.00', image: img4 },
  ],
  Beverages: [
    { id: 6, name: 'Strawberry Shake', price: '₹85.00', image: img5 },
    { id: 7, name: 'Lemonade', price: '₹75.00', image: img1 },
  ]
};

export default function Menu() {
  const [category, setCategory] = useState('Coldrink');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(data['Coldrink']);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectCategory = (cat) => {
    if (cat === category) {
      setShowDropdown(false);
      return;
    }

    setIsTransitioning(true);
    setShowDropdown(false);

    // Start fade out animation
    setTimeout(() => {
      setCategory(cat);
      setDisplayedProducts(data[cat]);
      setIsTransitioning(false);
    }, 300); // Match this with CSS transition duration
  };

  return (
    <div
      className="menu-page"
      style={{
        backgroundColor: '#ffefe1',
        color: 'black',
        minHeight: '100vh',
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 'bold',
      }}
    >
      <Navbar />

      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '2rem' }}>
          Explore Our Favorites
        </h1>

        {/* Dropdown Category Selector */}
        <div style={{ 
          marginBottom: '3rem',
          position: 'relative',
          display: 'inline-block'
        }}>
          <button
            onClick={toggleDropdown}
            style={{
              margin: '0 1rem',
              padding: '10px 24px',
              borderRadius: '9999px',
              border: '3px solid black',
              backgroundColor: 'black',
              color: '#fff5ec',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s',
              minWidth: '200px',
              position: 'relative',
            }}
          >
            {category} ▼
            {isTransitioning && (
              <span style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,245,236,0.3)',
                borderTop: '2px solid #fff5ec',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }}></span>
            )}
          </button>
          
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#fff5ec',
              borderRadius: '10px',
              border: '2px solid black',
              padding: '10px 0',
              zIndex: 10,
              minWidth: '200px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              {['Water', 'Coldrink', 'Beverages'].map((cat) => (
                <div
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  style={{
                    padding: '10px 24px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'black',
                    transition: 'all 0.2s',
                    ':hover': {
                      backgroundColor: 'black',
                      color: '#fff5ec'
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.color = '#fff5ec';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = 'black';
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '4rem',
            position: 'relative',
            minHeight: '300px'
          }}
        >
          {isTransitioning ? (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0,0,0,0.1)',
              borderTop: '3px solid black',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}></div>
          ) : (
            displayedProducts.map((product, index) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                  animation: `slideUp 0.5s ease ${index * 0.1}s forwards`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) rotate(1deg) translateY(0)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg) translateY(0)';
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    height: '300px',
                    marginBottom: '1.2rem',
                    borderRadius: '10px',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) rotate(5deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>
                  {product.price}
                </p>
                <button
                  style={{
                    color: 'black',
                    padding: '12px 32px',
                    borderRadius: '9999px',
                    backgroundColor: '#fff5ec',
                    border: '2px solid black',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = '#fff5ec';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#fff5ec';
                    e.target.style.color = 'black';
                  }}
                >
                  Shop now
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}