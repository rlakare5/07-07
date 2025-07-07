import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

export default function Navbar() {
  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: '#FDF1EC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 1.5rem',
      height: '60px',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Segoe UI', sans-serif",
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#FFA52F',
      cursor: 'pointer',
    },
    nav: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
    },
    navLink: {
      textDecoration: 'none',
      color: '#061C2D',
      fontWeight: 500,
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    },
    contactBtn: {
      backgroundColor: '#FFA52F',
      color: '#fff',
      border: 'none',
      padding: '8px 18px',
      borderRadius: '999px',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
  };

  const sections = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'Clients', id: 'clients' },
    { name: 'Services', id: 'services' },
    { name: 'Presentation', id: 'presentation' },
    { name: 'Clients Review', id: 'employee-review' },
    { name: 'Message from Director', id: 'director-message' },
  ];

  return (
    <header style={styles.navbar}>
      <ScrollLink to="home" smooth={true} duration={600} style={styles.logo}>
        🍹 <span>ChillFizz</span>
      </ScrollLink>
      <nav style={styles.nav}>
        {sections.map(({ name, id }) => (
          <ScrollLink
            key={id}
            to={id}
            smooth={true}
            duration={600}
            offset={-60} // adjust for navbar height
            style={styles.navLink}
            activeClass="active"
            spy={true}
          >
            {name}
          </ScrollLink>
        ))}
        <ScrollLink
          to="contact"
          smooth={true}
          duration={600}
          offset={-60}
        >
          <button
            style={styles.contactBtn}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e6931a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFA52F'}
          >
            Contact
          </button>
        </ScrollLink>
      </nav>
    </header>
  );
}
