import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaGlassCheers, FaIceCream, FaTruck, FaStore, FaCocktail } from 'react-icons/fa';

export default function Services() {
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost/admin/api/services.php')
      .then(response => response.json())
      .then(data => {
        const servicesWithIcons = data.map(service => ({
          ...service,
          icon: getIconComponent(service.icon)
        }));
        setServices(servicesWithIcons);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const getIconComponent = (iconClass) => {
    switch(iconClass) {
      case 'fa-leaf': return <FaLeaf />;
      case 'fa-glass-cheers': return <FaGlassCheers />;
      case 'fa-ice-cream': return <FaIceCream />;
      case 'fa-truck': return <FaTruck />;
      case 'fa-store': return <FaStore />;
      case 'fa-cocktail': return <FaCocktail />;
      default: return <FaLeaf />;
    }
  };


  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'products', name: 'Our Products' },
    { id: 'distribution', name: 'Distribution' },
    { id: 'custom', name: 'Custom Solutions' }
  ];


  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div style={{ ...styles.container, maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={styles.bubble1}></div>
      <div style={styles.bubble2}></div>
      <div style={styles.bubble3}></div>

      <motion.section style={styles.content} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={styles.header}>
          <h1 style={styles.title}>Chill<span style={styles.fizz}>Fizz</span> Services</h1>
          <p style={styles.subtitle}>Refreshing solutions for every thirst occasion</p>
        </motion.div>

        <motion.div style={styles.categoryFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {categories.map(category => (
            <motion.button
              key={category.id}
              style={{
                ...styles.categoryButton,
                background: selectedCategory === category.id 
                  ? 'linear-gradient(90deg, #4dabf7, #339af0)' 
                  : 'rgba(255, 255, 255, 0.3)',
                color: selectedCategory === category.id ? 'white' : '#3e002c'
              }}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div style={styles.servicesGrid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              style={{
                ...styles.serviceCard,
                background: hoveredService === service.id ? service.hoverColor : service.color,
                willChange: 'transform'
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.4, duration: 0.4, ease: 'easeOut' }}
            >
              <motion.div 
                style={{ ...styles.serviceIcon, willChange: 'transform' }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {service.icon}
              </motion.div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>

              <motion.div
                style={styles.serviceDetails}
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredService === service.id ? 1 : 0,
                  height: hoveredService === service.id ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {service.flavor && <div style={styles.detailItem}><span style={styles.detailLabel}>Flavors:</span><span>{service.flavor}</span></div>}
                {service.coverage && <div style={styles.detailItem}><span style={styles.detailLabel}>Coverage:</span><span>{service.coverage}</span></div>}
                {service.partners && <div style={styles.detailItem}><span style={styles.detailLabel}>Partners:</span><span>{service.partners}</span></div>}
                {service.clients && <div style={styles.detailItem}><span style={styles.detailLabel}>Clients:</span><span>{service.clients}</span></div>}

                <motion.button 
                  style={{
                    ...styles.learnMoreButton,
                    background: hoveredService === service.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={styles.specialOffer}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
        >
          <div style={styles.offerContent}>
            <h3 style={styles.offerTitle}>Summer Special!</h3>
            <p style={styles.offerText}>Get 15% off bulk orders of our seasonal flavors</p>
          </div>
          <motion.button 
            style={styles.offerButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}
const styles = {
  container: {
    fontFamily: '"Quicksand", sans-serif',
    backgroundColor: '#f0f9ff',
    minHeight: '100vh',
    padding: '4rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  bubble1: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(77, 171, 247, 0.1) 0%, rgba(77, 171, 247, 0) 70%)',
    zIndex: 0
  },
  bubble2: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(178, 242, 187, 0.1) 0%, rgba(178, 242, 187, 0) 70%)',
    zIndex: 0
  },
  bubble3: {
    position: 'absolute',
    top: '50%',
    left: '30%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 201, 201, 0.1) 0%, rgba(255, 201, 201, 0) 70%)',
    zIndex: 0
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 800,
    color: '#1864ab',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  fizz: {
    background: 'linear-gradient(90deg, #4dabf7, #15aabf)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#495057',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  categoryFilter: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  categoryButton: {
    padding: '0.8rem 1.5rem',
    borderRadius: '50px',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  },
  serviceCard: {
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
  },
  serviceIcon: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
  },
  serviceTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  serviceDescription: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  serviceDetails: {
    overflow: 'hidden',
    marginTop: 'auto',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.8rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.9rem',
  },
  detailLabel: {
    fontWeight: 600,
    marginRight: '1rem',
  },
  learnMoreButton: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '50px',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
  },
  specialOffer: {
    background: 'linear-gradient(90deg, #ffe8cc, #ffd8a8)',
    borderRadius: '20px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  offerContent: {
    marginBottom: '1.5rem',
  },
  offerTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#3e002c',
    marginBottom: '0.5rem',
  },
  offerText: {
    fontSize: '1.1rem',
    color: '#495057',
    lineHeight: 1.6,
  },
  offerButton: {
    padding: '1rem 2rem',
    borderRadius: '50px',
    background: '#3e002c',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
};