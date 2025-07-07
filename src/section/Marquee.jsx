import React from 'react';
import { FaShippingFast } from 'react-icons/fa';

export default function Marquee() {
  return (
    <div style={styles.marqueeWrapper}>
      <div style={styles.marqueeContent}>
  <span style={styles.text}><FaShippingFast style={{ marginRight: '0.5rem' }} /> FREE SHIPPING WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style={styles.text}><FaShippingFast style={{ marginRight: '0.5rem' }} /> FREE SHIPPING WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style={styles.text}><FaShippingFast style={{ marginRight: '0.5rem' }} /> FREE SHIPPING WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style={styles.text}><FaShippingFast style={{ marginRight: '0.5rem' }} /> FREE SHIPPING WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;</span>
</div>


      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  marqueeWrapper: {
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#be002d',
    padding: '1.2rem 0', // ⬅️ Increases height
    whiteSpace: 'nowrap',
  },
  marqueeContent: {
    display: 'inline-block',
    animation: 'scroll 18s linear infinite', // ⬅️ Smooth scroll
  },
  text: {
    display: 'inline-block',
    color: 'white',
    fontWeight: '900',
    fontSize: '1.5rem', // ⬅️ Bigger text
    fontFamily: 'Quicksand, sans-serif',
    paddingRight: '3rem',
  },
};
