import React from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">TaskFlow</a>
      
      <div className={`navbar-center ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li><a href="#features" className="navbar-link">Features</a></li>
          <li><a href="#reviews" className="navbar-link">Reviews</a></li>
          <li><a href="#pricing" className="navbar-link">Pricing</a></li>
       </ul>
      </div>

      <button 
        className="theme-toggle" 
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  )
}

export default Navbar
