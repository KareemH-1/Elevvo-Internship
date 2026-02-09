import React, { useState, useEffect } from "react";
import { Calendar , Bell} from "lucide-react";
import {recentActivities} from '../data/user.data.js'
import "../css/header.css";

const Header = ({ page, userName, isSidebarOpen }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const dateInterval = setInterval(() => {
      setDate(new Date().toLocaleDateString());
    }, 60000);
    return () => {
      clearInterval(interval);
      clearInterval(dateInterval);
    };
  }, []);

  useEffect(() => {
    const notifications = document.querySelector(".notification");
    notifications.addEventListener("click", () => {
      const dropdown = document.querySelector(".notification-dropdown");
      dropdown.classList.toggle("active");
    });

    return () => {
      notifications.removeEventListener("click", () => {
        const dropdown = document.querySelector(".notification-dropdown");
        dropdown.classList.toggle("active");
      });
    };
  }, []);

  return (
    <div className={`header ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
      <div className="header-start">
        <h1>{page}</h1>
        <h2>Welcome, {userName}!</h2>
      </div>

      <div className="header-end-cont">
        <div className="notification">
          <Bell size={20} className="notification-icon" />
          <div className="notification-count">3</div>
          <div className="notification-dropdown">
            <h3>Notifications</h3>
            <ul>
              {recentActivities.map((activity) => (
                <li key={activity.id} className="notification-item">
                  <span>{activity.id} ) {activity.activity}</span>
                  <span className="notification-date">{activity.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="header-end">
          <Calendar size={20} />
          Time:
          <div className="time">
            <span>{date}</span>
            <span> {time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
