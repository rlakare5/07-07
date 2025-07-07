import React, { useState } from 'react';
import {
  FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaLinkedin, FaInstagram, FaTwitter, FaGithub
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const styles = {
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
      backgroundColor: 'rgba(255, 140, 160, 0.4)',
      filter: 'blur(1px)'
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #fdf1ec, #ffeae2)',
      color: '#3e002c',
      fontFamily: "'Quicksand', sans-serif",
      padding: '60px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* ⬆️ Bubbles only in this section ⬆️ */}
      <motion.div
        style={styles.bgBubbles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(25)].map((_, i) => {
          const size = 12 + Math.random() * 24;
          const left = Math.random() * 100;
          const duration = 4 + Math.random() * 3; // ⏱️ Faster rise
          const delay = Math.random() * 5;
          return (
            <motion.div
              key={i}
              style={{
                ...styles.bubble,
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}vw`
              }}
              initial={{ y: 0, opacity: 0.9 }}
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          zIndex: 1,
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #ff8fa3, #d88bd8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}
        >
          Let’s Connect
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: '#4a3c3b',
            textAlign: 'center',
            maxWidth: '600px',
            fontSize: '1.2rem',
            marginBottom: '60px'
          }}
        >
          We'd love to hear from you! Drop us a message or find us online.
        </motion.p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'center',
          width: '100%',
        }}>
          {/* Info Box */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={glassCardStyle}
          >
            <h2 style={sectionTitleStyle}><FaMapMarkerAlt style={{ color: '#ff6b81' }} /> Our Location</h2>
            <p style={infoTextStyle}>ChillFizz HQ<br />Neon Towers, Block D<br />Mumbai, India</p>

            <h3 style={labelStyle}><FaEnvelope style={{ color: '#d88bd8' }} /> Email</h3>
            <p style={infoTextStyle}>contact@chillfizz.com</p>

            <h3 style={{ ...labelStyle, marginTop: '20px' }}>
              <FaPhone style={{ color: '#b76e79' }} /> Phone
            </h3>
            <p style={infoTextStyle}>+91 90000 12345</p>

            <h3 style={{ ...labelStyle, marginTop: '30px' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '1.4rem' }}>
              {[
                { icon: <FaLinkedin />, color: '#0077b5' },
                { icon: <FaInstagram />, color: '#e1306c' },
                { icon: <FaTwitter />, color: '#1da1f2' },
                { icon: <FaGithub />, color: '#6e5494' }
              ].map((item, index) => (
                <a key={index} href="#" style={{
                  color: '#fff',
                  backgroundColor: item.color,
                  borderRadius: '50%',
                  padding: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s',
                }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={glassCardStyle}
          >
            <h2 style={sectionTitleStyle}><FaPaperPlane style={{ color: '#ff6b81' }} /> Send a Message</h2>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  padding: '20px',
                  background: 'rgba(255,0,102,0.1)',
                  border: '1px solid #ff6b81',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ color: '#ff6b81' }}>Message Sent!</h3>
                <p style={{ color: '#4a3c3b' }}>We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {['name', 'email'].map((field) => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    required
                    style={inputStyle}
                  />
                ))}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  style={{ ...inputStyle, resize: 'none' }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '14px 28px',
                    borderRadius: '50px',
                    background: 'linear-gradient(90deg, #ff8fa3, #d88bd8)',
                    color: '#fff',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Styles outside component
const glassCardStyle = {
  flex: '1 1 300px',
  maxWidth: '500px',
  padding: '40px',
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.35)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 200, 200, 0.3)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
};

const inputStyle = {
  padding: '14px 18px',
  borderRadius: '10px',
  border: '1px solid rgba(255, 200, 200, 0.4)',
  background: 'rgba(255,255,255,0.5)',
  color: '#3e002c',
  fontSize: '1rem'
};

const sectionTitleStyle = {
  fontSize: '1.6rem',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#3e002c'
};

const labelStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#3e002c',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const infoTextStyle = {
  color: '#4a3c3b',
  lineHeight: '1.6'
};
