
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

export default function DirectorMessage() {
  const [directorData, setDirectorData] = useState({
    title: 'Welcome to ChillFizz',
    message: 'At ChillFizz, we believe that every sip should be a moment of pure refreshment and joy. Our commitment to quality and innovation drives us to create the most delicious and nutritious beverages for our valued customers.',
    director_name: 'Aryan Vaidya',
    director_position: 'Director & Founder'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirectorMessage = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/api/director.php');
        if (response.ok) {
          const data = await response.json();
          setDirectorData(data);
        }
      } catch (error) {
        console.error('Error fetching director message:', error);
        // Keep default data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchDirectorMessage();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDirectorMessage, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{
        background: 'radial-gradient(circle at top left, #fdf1ec 30%, #f8e2d6 100%)',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          color: '#444',
          fontWeight: '600'
        }}>
          Loading Director Message...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'radial-gradient(circle at top left, #fdf1ec 30%, #f8e2d6 100%)',
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
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
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Navbar />
      </motion.div>

      {/* Floating Fruit Emojis */}
      {['🍊', '🍓', '🥝'].map((fruit, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity }}
          style={{
            position: 'absolute',
            fontSize: '3rem',
            opacity: 0.06,
            top: `${20 + i * 20}%`,
            left: `${15 + i * 30}%`,
            zIndex: 0,
          }}
        >
          {fruit}
        </motion.div>
      ))}

      {/* Main Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            borderRadius: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '60px 40px',
            width: '100%',
            maxWidth: '800px',
            position: 'relative',
          }}
        >
          {/* Floating glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '-60px',
              left: '-60px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffc5c5, #fff0e3)',
              filter: 'blur(40px)',
              zIndex: 0
            }}
          />

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Avatar */}
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fca5a5, #fcd34d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(255, 165, 47, 0.3)',
                border: '4px solid white'
              }}
            >
              <span style={{ fontSize: '48px', color: 'white' }}>👔</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '32px',
                fontWeight: 800,
                textAlign: 'center',
                background: 'linear-gradient(90deg, #f97316, #db2777)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '25px'
              }}
            >
              {directorData.title}
            </motion.h2>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#444',
                maxWidth: '90%',
                textAlign: 'center',
                marginBottom: '40px',
              }}
            >
              {directorData.message}
            </motion.p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                textAlign: 'center'
              }}
            >
              <div style={{
                height: '2px',
                width: '120px',
                margin: 'auto',
                background: 'linear-gradient(to right, #f97316, #f43f5e)',
                marginBottom: '10px'
              }}></div>
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1a1a1a'
              }}>{directorData.director_name}</div>
              <div style={{
                fontSize: '14px',
                color: '#555',
                fontStyle: 'italic'
              }}>{directorData.director_position}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
