
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EmployeeReview() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case API fails
  const fallbackData = [
    {
      id: 1,
      name: "Aarohi Sharma",
      image: "https://i.pravatar.cc/150?img=32",
      text: "The juices taste incredibly fresh and vibrant. A daily treat that keeps me energized.",
      className: "card-mint",
      cardStyle: {
        background: "linear-gradient(135deg, #b2dfdb, #80cbc4)",
        transform: "rotate(-3deg)"
      }
    },
    {
      id: 2,
      name: "Rohan Mehta",
      image: "https://i.pravatar.cc/150?img=33",
      text: "The flavors are amazing, and I feel great knowing they're made with natural ingredients.",
      className: "card-sky",
      cardStyle: {
        background: "linear-gradient(135deg, #90caf9, #64b5f6)",
        transform: "rotate(2deg)"
      }
    },
    {
      id: 3,
      name: "Ananya Nair",
      image: "https://i.pravatar.cc/150?img=34",
      text: "I feel rejuvenated after every sip. The juices are delicious and refreshing.",
      className: "card-sun",
      cardStyle: {
        background: "linear-gradient(135deg, #fff59d, #ffe082)",
        transform: "rotate(-2deg)"
      }
    },
    {
      id: 4,
      name: "Ishita Rao",
      image: "https://i.pravatar.cc/150?img=35",
      text: "These juices are my go-to for a healthy pick-me-up. Always taste so fresh.",
      className: "card-lavender",
      cardStyle: {
        background: "linear-gradient(135deg, #ce93d8, #ba68c8)",
        transform: "rotate(3deg)"
      }
    },
    {
      id: 5,
      name: "Arjun Singh",
      image: "https://i.pravatar.cc/150?img=36",
      text: "Perfect blend of taste and nutrition. I recommend these to all my friends.",
      className: "card-coral",
      cardStyle: {
        background: "linear-gradient(135deg, #ffab91, #ff8a65)",
        transform: "rotate(-1deg)"
      }
    }
  ];

  useEffect(() => {
    // Try to fetch from API, fallback to default data
    const fetchReviews = async (showLoading = true) => {
      try {
        if (showLoading) {
          setLoading(true);
        }
        setError(null);
        
        // Try to fetch from the API
        const response = await fetch('http://localhost/admin/api/reviews.php');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          setCards(data);
        } else {
          // If no data from API, use fallback
          setCards(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError(error.message);
        // Use fallback data when API fails
        setCards(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    
    // Set up auto-refresh to fetch new data every 30 seconds
    const interval = setInterval(() => {
      fetchReviews();
    }, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <section style={styles.testimonialsSection}>
          <h1 style={styles.title}>What Our Legends Say</h1>
          <p style={styles.subtitle}>Loading reviews...</p>
          <div style={styles.loadingSpinner}>
            <div style={styles.spinner}></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <section style={styles.testimonialsSection}>
        <h1 style={styles.title}>What Our Legends Say</h1>
        <p style={styles.subtitle}>
          {error ? 'Showing sample reviews (Admin panel data will load when PHP server is running)' : 'Hear from our satisfied customers'}
        </p>

        <div style={styles.testimonialsSlider} className="testimonials-slider">
          {cards.map((card, index) => (
            <div
              key={index}
              style={{ ...styles.testimonialCard, ...card.cardStyle }}
              className={`testimonial-card ${card.className}`}
            >
              <div style={styles.cardHeader}>
                <div style={styles.customerInfo}>
                  <img
                    src={card.image}
                    alt={card.name}
                    style={styles.customerPhoto}
                    className="customer-photo"
                  />
                  <div>
                    <h3 style={styles.customerName}>{card.name}</h3>
                    <div style={styles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="fas fa-star"
                          style={styles.starIcon}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.testimonialText}>{card.text}</p>
              </div>
              <div style={styles.quoteIcon} className="quote-icon">"</div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .testimonial-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .testimonial-card:hover {
          transform: scale(1.03) rotate(0deg) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        .customer-photo {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover .customer-photo {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        .quote-icon {
          transition: all 0.3s ease;
          opacity: 0;
        }
        .testimonial-card:hover .quote-icon {
          opacity: 1;
          transform: scale(1.5);
        }

        .card-green:hover {
          background: linear-gradient(135deg, #b8e8c4 0%, #a8e0b8 100%) !important;
        }
        .card-blue:hover {
          background: linear-gradient(135deg, #a8d4ed 0%, #98cbe8 100%) !important;
        }
        .card-yellow:hover {
          background: linear-gradient(135deg, #ffe880 0%, #ffd933 100%) !important;
        }
        .card-purple:hover {
          background: linear-gradient(135deg, #e8a8e8 0%, #d893d8 100%) !important;
        }
        .card-orange:hover {
          background: linear-gradient(135deg, #ffd0a1 0%, #ffb366 100%) !important;
        }
        .card-pink:hover {
          background: linear-gradient(135deg, #f9c2d9 0%, #f792c2 100%) !important;
        }
        .card-gray:hover {
          background: linear-gradient(135deg, #d9d9d9 0%, #bfbfbf 100%) !important;
        }

        .testimonials-slider {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }

        .testimonials-slider::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Quicksand", sans-serif',
    backgroundColor: '#fdf1ec',
    minHeight: '100vh',
    padding: '2rem 0',
    lineHeight: 1.6,
    overflowX: 'hidden',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: 400,
    color: '#718096',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  testimonialsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 1rem',
    overflow: 'visible',
  },
  testimonialsSlider: {
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    gap: '2rem',
    scrollSnapType: 'x mandatory',
    padding: '2rem 0',
    margin: '0 auto',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  },
  testimonialCard: {
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    minHeight: '250px',
    flex: '0 0 80%',
    maxWidth: '320px',
    position: 'relative',
    scrollSnapAlign: 'start',
    overflow: 'hidden',
    marginBottom: '2rem',
    boxSizing: 'border-box',
  },
  cardHeader: {
    marginBottom: '1rem',
    zIndex: 2,
  },
  customerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  customerPhoto: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  customerName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '0.25rem',
  },
  starRating: {
    display: 'flex',
    gap: '2px',
    marginBottom: '0.5rem',
  },
  starIcon: {
    color: '#fbbf24',
    fontSize: '0.875rem',
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
  },
  testimonialText: {
    fontSize: '0.9rem',
    color: '#4a5568',
    fontWeight: 500,
    textAlign: 'left',
  },
  quoteIcon: {
    position: 'absolute',
    right: '1.5rem',
    bottom: '1rem',
    fontSize: '5rem',
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'serif',
    fontWeight: 'bold',
    lineHeight: 1,
    zIndex: 1,
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
};
