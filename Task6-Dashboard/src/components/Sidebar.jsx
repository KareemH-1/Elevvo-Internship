import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  SquareChartGantt,
  FolderOpenDot,
  UserRoundPen,
  Settings,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "../css/sidebar.css";
import userProfile from "../assets/user_profile.png";

const Sidebar = ({ page, userName, onToggle, isOpen, isDarkMode, onToggleTheme }) => {
  const setIsOpen = (newStateOrCallback) => {
    const newState = typeof newStateOrCallback === 'function' 
      ? newStateOrCallback(isOpen) 
      : newStateOrCallback
    if (onToggle) {
      onToggle(newState)
    }
  };

    useEffect(() => {
     let link = null;
    switch (page) {
      case "Overview":
        link = document.getElementById("overview-link");
        break;
      case "Projects":
        link = document.getElementById("projects-link");
        break;
      case "Profile":
        link = document.getElementById("profile-link");
        break;
      default:
        break;
    }
    if (link) {
      link.classList.add("active");
    }
  }, [page]);

  function toggleDarkMode() {
    if (onToggleTheme) {
      onToggleTheme(!isDarkMode)
    }
  }

  return (
    <>
      {!isOpen && (
        <div className="sidebar-mobile-open">
          <button
            className="toggle-button"
            onClick={() => setIsOpen(true)}
            aria-label="Open sidebar"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
      <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
        <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <LayoutDashboard size={20} />
          </div>
          {isOpen && <span className="logo-text">Dashboard</span>}
        </div>
        <button 
          className="toggle-button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          {isOpen && <h3 className="section-title">MAIN</h3>}
          <Link to="/" className="sidebar-item" id="overview-link">
            <SquareChartGantt size={20} />
            {isOpen && <span className="item-label">Overview</span>}
          </Link>
          <Link to="/projects" className="sidebar-item" id="projects-link">
            <FolderOpenDot size={20} />
            {isOpen && <span className="item-label">Projects</span>}
          </Link>
        </div>

        <div className="sidebar-section">
          {isOpen && <h3 className="section-title">SYSTEM</h3>}
          <Link to="/profile" className="sidebar-item" id="profile-link">
            <UserRoundPen size={20} />
            {isOpen && <span className="item-label">Profile</span>}
          </Link>
          <div className="sidebar-item">
            <Settings size={20} />
            {isOpen && <span className="item-label">Settings</span>}
          </div>
          <div 
            className="sidebar-item dark-mode-toggle" 
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            {isOpen && <span className="item-label">{isDarkMode ? "Light mode" : "Dark mode"}</span>}
            {isOpen && (
              <div className={`toggle-switch ${isDarkMode ? 'active' : ''}`}>
                <div className="toggle-slider"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <img src={userProfile} alt="User" />
          </div>
          {isOpen && (
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-email">kareem.a.hassan15@gmail.com</span>
            </div>
          )}
        </div>
        <div className="logout-button">
          <LogOut size={20} />
          {isOpen && <span>Log out</span>}
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
