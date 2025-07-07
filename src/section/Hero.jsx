import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import heroImg from '../assets/hero.png'; // Ensure you have the correct path to your image

export default function Hero() {
  const features = [
    { icon: '🧃', text: 'Finest Ingredients' },
    { icon: '💥', text: 'Fizz Secret' },
    { icon: '💡', text: 'Creative Innovation' },
    { icon: '✨', text: 'Excellent Bliss' },
    { icon: '🥤', text: 'Fizz Your Thirst' },
  ];

  return (
    <section 
      id="home"
      style={{
        background: '#ffefe1',
        color: '#061C2D',
        fontFamily: "'Poppins', sans-serif",
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: '#FDF1EC',
          boxShadow: '0 2px 15px rgba(0,0,0,0.08)'
        }}
      >
        <Navbar />
      </motion.div>

      {/* Hero Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '120px 48px 0',
        flex: 1,
        gap: '48px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1, maxWidth: '600px' }}
        >
          <motion.h1 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '24px',
              fontFamily: "'Georgia', serif",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Refreshing<br />ChillFizz
          </motion.h1>

          <motion.p
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
              marginBottom: '40px',
              lineHeight: '1.6',
              color: '#555',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Dive into the world of ChillFizz, where fizzy delights and vibrant flavors
            come together to create a truly refreshing experience.
          </motion.p>

          <motion.button
            style={{
              backgroundColor: '#FFA52F',
              color: '#fff',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ 
              backgroundColor: '#e6931a',
              scale: 1.05,
              boxShadow: '0 5px 15px rgba(255,165,47,0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Explore Now
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={heroImg}
            alt="ChillFizz Drink"
            style={{
              width: '100%',
              maxWidth: '480px',
              height: 'auto',
              borderRadius: '16px',
            }}
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Features */}
      <motion.div
        style={{
          backgroundColor: '#FFA52F',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem 1rem',
          textAlign: 'center',
          flexWrap: 'wrap',
          gap: '8rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {features.map((item, index) => (
          <motion.div 
            key={index}
            style={{
              minWidth: '120px',
              maxWidth: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                color: '#fff',
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              {item.icon}
            </motion.div>
            <div style={{
              fontWeight: '600',
              fontSize: '0.95rem',
            }}>
              {item.text}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
