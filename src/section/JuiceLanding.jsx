import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import juice1 from '../assets/1.png';
import juice2 from '../assets/4.png';
import juice3 from '../assets/3.png';
import juice4 from '../assets/5.png';
import juice5 from '../assets/5.png';

import bgorange from '../assets/bgorange.png';
import bgplumb from '../assets/bgplumb.png';
import bgkiwi from '../assets/bgkiwi.png';
import bgstrawberry from '../assets/bgstrawberry.png';

const juiceData = [
  {
    name: "Lemon Juice",
    description: "Zesty and revitalizing, lemon juice offers a burst of citrusy freshness and is rich in vitamin C. Perfect for boosting your energy and hydration.",
    bg: "linear-gradient(135deg, #FFFDE7, #FFF176)",
    accent: "#F57F17", 
    nutrients: ["Vitamin C", "Citric Acid", "Potassium", "Antioxidants"]
  },
  {
    name: "Grape Juice",
    description: "A rich, fruity flavor made from plump grapes. Full of antioxidants and polyphenols that support heart health and boost immunity.",
    bg: "linear-gradient(135deg, #ede7f6, #9575cd)",
    accent: "#4A148C", 
    nutrients: ["Vitamin C", "Resveratrol", "Polyphenols", "Manganese"]
  },
  {
    name: "Peach Juice",
    description: "Smooth and sweet, peach juice is a summery delight with a mellow flavor and a variety of vitamins and minerals for radiant skin and health.",
    bg: "linear-gradient(135deg, #FFF3E0, #FFB74D)", 
    accent: "#E65100", 
    nutrients: ["Vitamin A", "Vitamin C", "Fiber", "Potassium"]
  },
  {
    name: "Strawberry Juice",
    description: "Sweet and refreshing, loaded with antioxidants and essential vitamins. Made from hand-picked strawberries at peak ripeness for maximum flavor and nutritional benefits.",
    bg: "linear-gradient(135deg, #FCE4EC, #F06292)",
    accent: "#AD1457",
    nutrients: ["Vitamin C", "Manganese", "Antioxidants", "Folate"]
  }
];



const juices = [juice1, juice2, juice3, juice4];
const fruits = [bgorange, bgplumb, bgkiwi, bgstrawberry];

export default function JuiceLanding() {
  const [current, setCurrent] = useState(0);
  const [deg, setDeg] = useState(-45);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (index) => {
    if (index === current || isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setDeg(prev => prev - 90);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [current]);

  // Styles
  const styles = {
    pageContainer: {
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    juiceHeader: {
      textAlign: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    },
    mainTitle: {
      fontSize: '3.5rem',
      fontWeight: 800,
      color: '#2d3748',
      marginBottom: '0.5rem'
    },
    titleAccent: {
      background: 'linear-gradient(90deg, #4dabf7, #15aabf)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontStyle: 'italic'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#4a5568',
      maxWidth: '600px',
      margin: '0 auto'
    },
    juiceSection: {
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      paddingLeft: '5%',
      background: juiceData[current].bg,
      transition: 'background 0.8s ease',
      marginTop: '-1px'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      width: '50%',
      zIndex: 2
    },
    juiceText: {
      maxWidth: '90%'
    },
    juiceName: {
  fontSize: '3rem',
  fontWeight: 700,
  marginBottom: '1rem',
  lineHeight: 1.2,
  color: juiceData[current].accent,
  textShadow: '0px 2px 6px rgba(255, 255, 255, 0.8)' // Add this line
},
    juiceDescription: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      maxWidth: '90%',
      margin: '1.5rem 0',
      fontWeight: 500,
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
      background: 'rgba(255,255,255,0.15)',
      padding: '1.5rem',
      borderRadius: '12px',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white'
    },
    nutrients: {
      display: 'flex',
      gap: '10px',
      marginTop: '30px',
      flexWrap: 'wrap'
    },
    nutrientTag: {
      color: 'white',
      padding: '8px 15px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 600,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: juiceData[current].accent
    },
    photos: {
      display: 'flex',
      gap: '30px'
    },
    juiceWrapper: {
      width: '100px',
      height: '140px',
      paddingBottom: '10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-end',
      transition: 'all 0.3s ease',
      borderBottom: current === 0 ? '3px solid white' : 'none'
    },
    staticJuice: {
      width: '100%',
      height: 'auto',
      maxHeight: '100%',
      objectFit: 'contain',
      filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))',
      transition: 'all 0.3s ease'
    },
    juiceWheel: {
      width: '550px',
      height: '600px',
      borderRadius: '50%',
      position: 'absolute',
      right: '-300px',
      bottom: '-300px',
      zIndex: 1,
      transform: `rotate(${deg}deg)`,
      transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    dynamicJuice: {
      width: '350px',
      position: 'absolute',
      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
    },
    fruitsWheel: {
      width: '800px',
      height: '800px',
      position: 'absolute',
      top: '-650px',
      left: '-500px',
      borderRadius: '50%',
      zIndex: 0,
      transform: `rotate(${deg}deg)`,
      transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    dynamicFruits: {
      width: '700px',
      opacity: 0.4,
      position: 'absolute',
      filter: 'blur(2px)'
    },
    bgBubbles: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 0,
  pointerEvents: 'none'
},
bubble: {
  position: 'absolute',
  bottom: '-60px',
  borderRadius: '50%',
  opacity: 0.7,
  backgroundColor: juiceData[current].accent,
  filter: 'blur(1px)'
}


  };

  // Dynamic juice positions
  const juicePositions = [
    { top: '-380px', right: '120px' },
    { transform: 'rotate(90deg)', right: '-320px', top: '40px' },
    { transform: 'rotate(180deg)', bottom: '-380px', right: '120px' },
    { transform: 'rotate(-90deg)', top: '40px', left: '-320px' }
  ];

  // Dynamic fruit positions
  const fruitPositions = [
    { transform: 'rotate(90deg)', bottom: '-550px', left: '40px' },
    { transform: 'rotate(180deg)', bottom: '220px', left: '-620px' },
    { transform: 'rotate(100deg)', top: '-380px', left: '120px' },
    { bottom: '150px', right: '-650px' }
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <header style={styles.juiceHeader}>
        <motion.h1 
          style={styles.mainTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Fresh<span style={styles.titleAccent}>Squeezed</span> Delights
        </motion.h1>
        <motion.p 
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover our premium selection of 100% natural fruit juices
        </motion.p>
      </header>

      {/* Main Juice Display Section */}
      <motion.section
        style={styles.juiceSection}
        id="menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div style={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              style={styles.juiceText}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                style={styles.juiceName}
                whileHover={{ scale: 1.02 }}
              >
                {juiceData[current].name}
              </motion.h2>
              <motion.p 
                style={styles.juiceDescription}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {juiceData[current].description}
              </motion.p>
              
              <div style={styles.nutrients}>
                {juiceData[current].nutrients.map((nutrient, i) => (
                  <motion.span 
                    key={i}
                    style={styles.nutrientTag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    {nutrient}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={styles.photos}>
            {juices.map((img, i) => (
              <motion.div
                key={i}
                style={{
                  ...styles.juiceWrapper,
                  borderBottom: current === i ? '3px solid white' : 'none'
                }}
                onClick={() => handleClick(i)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img 
                  src={img} 
                  style={styles.staticJuice}
                  alt={`juice${i + 1}`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: current === i ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Juice Wheel */}
        <motion.div 
          style={styles.juiceWheel}
          animate={{ rotate: deg }}
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
        >
          {juices.map((juice, i) => (
            <motion.img 
              key={i}
              src={juice}
              style={{
                ...styles.dynamicJuice,
                ...juicePositions[i]
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`dynamic-juice-${i+1}`}
            />
          ))}
        </motion.div>

        {/* Fruits Wheel */}
        <motion.div 
          style={styles.fruitsWheel}
          animate={{ rotate: deg }}
          transition={{ type: 'spring', stiffness: 30, damping: 10 }}
        >
          {fruits.map((fruit, i) => (
            <motion.img 
              key={i}
              src={fruit}
              style={{
                ...styles.dynamicFruits,
                ...fruitPositions[i]
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5 }}
              className={`dynamic-fruits-${i+1}`}
            />
          ))}
        </motion.div>
{/* Bubbles only in this section */}
<motion.div 
  style={styles.bgBubbles}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {[...Array(25)].map((_, i) => {
    const size = 10 + Math.random() * 30;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 5;
    const delay = Math.random() * 5;
    return (
      <motion.div
        key={i}
        style={{
          ...styles.bubble,
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}vw`,
          backgroundColor: juiceData[current].accent
        }}
        initial={{ y: 0, opacity: 0.8 }}
        animate={{ y: -window.innerHeight - 100, opacity: 0 }}
        transition={{
          duration,
          repeat: Infinity,
          delay
        }}
      />
    );
  })}
</motion.div>

        {/* Background Bubbles */}
        <motion.div 
          style={styles.bgBubbles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              style={styles.bubble}
              initial={{ y: 0, x: Math.random() * 100 }}
              animate={{ 
                y: [0, -100 - Math.random() * 500],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}