import React from "react";
import Switch from "./switch";
import Search from "./Search";
import  {Menu , X} from 'lucide-react';
const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <>
      <nav className="navbar">
        <a href="#" className="navbar-logo">
          Blog
        </a>

        <div className={`navbar-center ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <a href="#hero" className="navbar-link">
                Hero
              </a>
            </li>
            <li>
              <a href="#posts" className="navbar-link">
                Posts
              </a>
            </li>
            <li>
              <a href="#footer" className="navbar-link">
                Footer
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-controls">
          <div>
            <Search />
          </div>
          <div className="theme-toggle theme-toggle-desktop">
            <Switch />
          </div>
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>
      
      <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-item search-mobile">
          <Search />
        </div>
        <div className="mobile-menu-item">
          <Switch />
        </div>
      </div>
    </>
  );
};

export default Navbar;
