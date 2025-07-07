import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from './Navbar';
import presentationVideo from '../assets/presentation.mp4';

const Fruit = ({ x, y, type, onCut }) => {
  const [isCut, setIsCut] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [rotation, setRotation] = useState(Math.random() * 360);
  const [velocity, setVelocity] = useState({
    x: Math.random() * 0.2 - 0.1,
    y: Math.random() * 0.1 - 0.05
  });
  const fruitRef = useRef(null);

  const fruits = {
    orange: { emoji: '🍊', color: '#FFA52F', size: 60 },
    lemon: { emoji: '🍋', color: '#FFE135', size: 60 },
    watermelon: { emoji: '🍉', color: '#FC6C85', size: 70 },
    grapes: { emoji: '🍇', color: '#6B2D5C', size: 60 },
    strawberry: { emoji: '🍓', color: '#FC5A8D', size: 50 },
    pineapple: { emoji: '🍍', color: '#FEE356', size: 70 }
  };

  useEffect(() => {
    const float = () => {
      setPosition(prev => ({
        x: (prev.x + velocity.x + 100) % 100,
        y: (prev.y + velocity.y + 100) % 100
      }));
      setRotation(prev => (prev + velocity.x * 0.5) % 360);
      if (Math.random() < 0.02) {
        setVelocity(v => ({
          x: Math.min(Math.max(v.x + (Math.random() * 0.02 - 0.01), -0.15), 0.15),
          y: Math.min(Math.max(v.y + (Math.random() * 0.01 - 0.005), -0.08), 0.08)
        }));
      }
    };
    const floatInterval = setInterval(float, 30);
    return () => clearInterval(floatInterval);
  }, [velocity.x, velocity.y]);

  const handleHover = () => {
    if (!isCut) {
      setIsCut(true);
      onCut();
      setTimeout(() => {
        if (fruitRef.current) fruitRef.current.style.transform = 'scale(0)';
      }, 800);
    }
  };

  return (
    <motion.div
      ref={fruitRef}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: `${fruits[type].size}px`,
        cursor: 'crosshair',
        zIndex: 1,
        pointerEvents: 'auto',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform'
      }}
      onMouseEnter={handleHover}
      animate={isCut ? {
        scale: [1, 1.3, 0.8, 0],
        opacity: [1, 0.8, 0.5, 0],
        y: [0, -10, -20],
        rotate: [rotation, rotation + 45, rotation + 90]
      } : {}}
      transition={isCut ? { duration: 0.8, ease: [0.2, 0.8, 0.4, 1] } : {}}
    >
      {isCut ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <motion.div animate={{ x: [-10, -40], y: [0, -15], rotate: [-15, -60], opacity: [1, 0] }} transition={{ duration: 0.6, delay: 0.2 }}>{fruits[type].emoji}</motion.div>
          <motion.div animate={{ x: [10, 40], y: [0, 15], rotate: [15, 60], opacity: [1, 0] }} transition={{ duration: 0.6, delay: 0.2 }}>{fruits[type].emoji}</motion.div>
        </div>
      ) : (
        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>{fruits[type].emoji}</motion.div>
      )}
    </motion.div>
  );
};

export default function Presentation() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const fruitTypes = ['orange', 'lemon', 'watermelon', 'grapes', 'strawberry', 'pineapple'];
    const generateFruit = () => {
      let x, y;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (x > 30 && x < 70 && y > 20 && y < 80);
      return {
        id: Date.now() + Math.random(),
        x,
        y,
        type: fruitTypes[Math.floor(Math.random() * fruitTypes.length)]
      };
    };
    setFruits(Array.from({ length: 8 }, generateFruit));
  }, []);

  const handleCutFruit = (id) => {
    setScore(prev => prev + 10);
    setFruits(prev => prev.filter(fruit => fruit.id !== id));
    setTimeout(() => {
      const fruitTypes = ['orange', 'lemon', 'watermelon', 'grapes', 'strawberry', 'pineapple'];
      let x, y;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (x > 30 && x < 70 && y > 20 && y < 80);
      setFruits(prev => [...prev, {
        id: Date.now() + Math.random(),
        x,
        y,
        type: fruitTypes[Math.floor(Math.random() * fruitTypes.length)]
      }]);
    }, 1500);
  };

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(error => console.log("Auto-play prevented:", error));
    }
  }, [isInView]);

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

  const styles = {
    wrapper: {
      background: 'linear-gradient(135deg, #FFE2D1, #FDF1EC)',
      color: '#061C2D',
      fontFamily: '"Quicksand", sans-serif',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    },
    navbarWrapper: {
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 999, background: 'transparent',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    container: {
      height: '100vh', padding: '1rem', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative'
    },
    heading: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700,
      marginBottom: '0.5rem', background: 'linear-gradient(90deg, #FF7B25, #FFA52F)',
      WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
      position: 'relative', zIndex: 2
    },
    subtext: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#555', marginBottom: '1.5rem',
      maxWidth: '600px', lineHeight: '1.5', position: 'relative', zIndex: 2
    },
    videoWrapper: {
      fontFamily: '"Quicksand", sans-serif',
      position: 'relative', width: '90%', maxWidth: '900px', borderRadius: '8px',
      overflow: 'hidden', boxShadow: '0 0 30px rgba(255, 165, 47, 0.6)',
      border: '2px solid transparent', background:
        'linear-gradient(#fdf1ec, #fdf1ec) padding-box, linear-gradient(135deg, rgba(255,165,47,0.8), rgba(255,165,47,0.2)) border-box',
      zIndex: 2
    },
    videoContainer: {
      position: 'relative', width: '100%', paddingBottom: '56.25%'
    },
    video: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'
    },
    borderGlow: {
      position: 'absolute', width: '100%', height: '100%', top: 0, left: 0,
      borderRadius: '8px', boxShadow: 'inset 0 0 20px rgba(255, 165, 47, 0.8), inset 0 0 30px rgba(255, 165, 47, 0.4), inset 0 0 40px rgba(255, 165, 47, 0.2)',
      pointerEvents: 'none'
    },
    muteButton: {
      position: 'absolute', bottom: '20px', right: '20px', zIndex: 10,
      background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%',
      width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer'
    },
    score: {
      position: 'absolute', top: '20px', right: '20px', zIndex: 10,
      background: 'rgba(255, 165, 47, 0.8)', color: 'white', padding: '0.5rem 1rem',
      borderRadius: '20px', fontSize: '1rem', fontWeight: 'bold'
    },
    fruitContainer: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 1
    }
  };

  return (
    <div style={styles.wrapper} id="presentation">
      <div style={styles.navbarWrapper}><Navbar /></div>

      <div style={styles.fruitContainer}>
        {fruits.map(fruit => (
          <Fruit key={fruit.id} x={fruit.x} y={fruit.y} type={fruit.type} onCut={() => handleCutFruit(fruit.id)} />
        ))}
      </div>

      <motion.div style={styles.score} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>Score: {score}</motion.div>

      <motion.div style={styles.container} ref={containerRef} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
        <motion.h2 style={styles.heading} variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>Our Presentation</motion.h2>
        <motion.p style={styles.subtext} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } } }}>Discover how ChillFizz came to life through vibrant visuals and stories.</motion.p>
        <motion.div style={styles.videoWrapper} ref={videoContainerRef} variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.3, type: "spring", damping: 15 } } }}>
          <div style={styles.borderGlow} />
          <div style={styles.videoContainer}>
            <video ref={videoRef} style={styles.video} playsInline muted autoPlay loop>
              <source src={presentationVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <motion.button style={styles.muteButton} onClick={toggleMute} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {videoRef.current?.muted ? '🔇' : '🔊'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
