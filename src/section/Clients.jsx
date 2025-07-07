import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBolt } from 'react-icons/fa';
import Navbar from './Navbar';
import clientImg from '../assets/client.jpg';

export default function Clients() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } },
    hover: {
      backgroundColor: '#e6931a',
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const styles = {
    navbarWrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    section: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '120px 2rem 4rem',
      backgroundColor: '#fdf1ec',
      fontFamily: "'Quicksand', sans-serif",
    },
    left: {
      flex: '1 1 400px',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      maxWidth: '420px',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
    right: {
      flex: '1 1 500px',
      padding: '2rem 3rem',
    },
    boostButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: '#f0e6ff',
      color: 'black',
      fontWeight: '700',
      padding: '10px 20px',
      border: '1.5px solid black',
      borderRadius: '999px',
      marginBottom: '0',
      fontSize: '1rem',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: '800',
      fontFamily: "'Quicksand', sans-serif",
      marginBottom: '1rem',
      color: '#061C2D',
    },
    subtitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      fontStyle: 'italic',
      marginBottom: '1rem',
      color: '#333',
    },
    description: {
      fontSize: '1rem',
      marginBottom: '2rem',
      color: '#555',
      lineHeight: '1.6',
      maxWidth: '500px',
      fontWeight: '500',
    },
    logos: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '1.8rem',
      marginBottom: '2rem',
    },
    logoCard: {
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontFamily: "'Quicksand', sans-serif",
    },
    logoIcon: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      backgroundColor: '#061C2D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      color: '#FFA52F',
      margin: '0 auto 0.5rem',
      transition: 'transform 0.3s ease, background 0.3s',
    },
    brandText: {
      fontWeight: '700',
      fontSize: '1rem',
    },
    subBrand: {
      fontSize: '0.85rem',
      color: '#777',
    },
    button: {
      backgroundColor: '#FFA52F',
      border: 'none',
      color: '#fff',
      padding: '14px 30px',
      borderRadius: '50px',
      fontWeight: '700',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease, transform 0.2s',
      boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    },
  };

  return (
    <>
      <div style={styles.navbarWrapper}>
        <Navbar />
      </div>

      <motion.section
        style={styles.section}
        id="clients"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.div style={styles.left} variants={imageVariants}>
          <motion.img
            src={clientImg}
            alt="Client Glass"
            style={styles.image}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
        </motion.div>

        <div style={styles.right}>
          <motion.button style={styles.boostButton} variants={itemVariants}>
            <FaBolt /> Boost energy
          </motion.button>

          <motion.h2 style={styles.title} variants={itemVariants}>
            Discover Our Clients
          </motion.h2>
          <motion.p style={styles.subtitle} variants={itemVariants}>
            Trusted by Leading Brands
          </motion.p>
          <motion.p style={styles.description} variants={itemVariants}>
            At ChillFizz, we're proud to collaborate with world-class brands.
            Our fizzy magic reaches global heights with partners who believe in
            freshness and flavor.
          </motion.p>

          <motion.div style={styles.logos} variants={containerVariants}>
            {[
              { icon: '🥛', brand: 'Shell', sub: 'Ferrari' },
              { icon: '🍹', brand: 'Apple', sub: 'Microsoft' },
              { icon: '🍉', brand: 'Coca-Cola', sub: 'Nestle' },
              { icon: '🍺', brand: 'Amazon', sub: 'Google' },
            ].map((item, i) => (
              <motion.div
                key={i}
                style={styles.logoCard}
                variants={logoVariants}
                whileHover="hover"
              >
                <div style={styles.logoIcon}>{item.icon}</div>
                <div style={styles.brandText}>{item.brand}</div>
                <div style={styles.subBrand}>{item.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            style={styles.button}
            variants={buttonVariants}
            whileHover="hover"
          >
            Join Our Team
          </motion.button>
        </div>
      </motion.section>
    </>
  );
}
