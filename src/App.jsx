import './App.css';
import React from 'react';
import Navbar from './section/Navbar';
import Hero from './section/Hero';
import Menu from './section/Menu';
import Clients from './section/Clients';
import Services from './section/Services';
import Presentation from './section/Presentation';
import EmployeeReview from './section/EmployeeReview';
import DirectorMessage from './section/DirectorMessage';
import Contact from './section/Contact';

function App() {
  return (
    <>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="menu"><Menu /></div>
      <div id="clients"><Clients /></div>
      <div id="services"><Services /></div>
      <div id="presentation"><Presentation /></div>
      <div id="employee-review"><EmployeeReview /></div>
      <div id="director-message"><DirectorMessage /></div>
      <div id="contact"><Contact /></div>
    </>
  );
}

export default App;
