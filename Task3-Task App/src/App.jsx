import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Features from './components/features.jsx'
import Reviews from './components/Reviews.jsx'
import Pricing from './components/Pricing.jsx'
import Footer from './components/Footer.jsx'

import { useEffect } from 'react';


function App() {

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('show');
        } else {
          reveal.classList.remove('show');
        }
      });
    };

    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <Reviews/>
    <Pricing />
    <Footer/>
    </>
  )
}

export default App
