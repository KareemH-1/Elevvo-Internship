import React, { useState, useEffect } from "react";
import Sidebar_Header from "../components/Sidebar_Header";
import {user} from "../data/user.data";
import {Mail , Phone , BookUser , Building2} from 'lucide-react';
import "../css/profile.css";
import profilePic from "../assets/user_profile.png";
const Profile = ({ userName, setUserName, isDarkMode, setIsDarkMode }) => {
  
  const [userData, setUserData] = useState({
    name: userName,
    email: user.email,
    phone: user.phone,
    about: user.about,
    address: user.address,
    city: user.city
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      setUserData(parsedData);
      user.name = parsedData.name;
      user.email = parsedData.email;
      user.phone = parsedData.phone;
      user.about = parsedData.about;
      user.address = parsedData.address;
      user.city = parsedData.city;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    user.name = userData.name;
    user.email = userData.email;
    user.phone = userData.phone;
    user.about = userData.about;
    user.address = userData.address;
    user.city = userData.city;
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    if (userData.name !== userName) {
      setUserName(userData.name);
    }
    
    setSuccessMessage('Profile updated successfully!');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
        <Sidebar_Header page="Profile" userName={userName} isDarkMode={isDarkMode} onToggleTheme={setIsDarkMode} />
        <div className="content">
            <div className="profile-container">
              <div className="profile-data">
                
                <div className="profile-header">
                  <img src={profilePic} alt="User Profile" className="profile-image" />
                  
                  <div className="profile-info">
                    <h2 className="profile-name">{userData.name}</h2>
                    <p className="profile-email">{userData.email}</p>
                  </div>
                </div>

                <div className="profile-details">
                  <h3>About Me</h3>
                  <div className="details-cont">
                    <p>{userData.about}</p>
                  </div>  
                </div>

                <div className="profile-details">
                  <h3>Contact Information</h3>
                  <div className="details-cont">
                    <Mail />
                    <p>Email: {userData.email}</p>
                  </div>
                  <div className="details-cont">
                    <Phone />
                    <p>Phone: {userData.phone}</p>
                  </div>
                </div>

                <div className="profile-details">
                  <h3>Address</h3>
                  <div className="details-cont">
                    <BookUser />
                    <p>Address: {userData.address}</p>
                  </div>

                  <div className="details-cont">
                    <Building2 />
                    <p>City: {userData.city}</p>
                  </div>
                </div>
              </div>


              <div className="profile-edit">
                <div className="edit-info">
                <h3>Edit Profile</h3>
                {successMessage && (
                  <div className="success-message">
                    {successMessage}
                  </div>
                )}
                <form className="edit-form" onSubmit={handleSubmit}>
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Enter your name" 
                    value={userData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Phone</label>
                  <input 
                    type="text" 
                    name="phone"
                    placeholder="Enter your phone number" 
                    value={userData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <label>About Me</label>
                  <textarea 
                    name="about"
                    placeholder="Tell us about yourself" 
                    value={userData.about}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label>Address</label>
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Enter your address" 
                    value={userData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Enter your city" 
                    value={userData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Save Changes</button>
                </form>
              </div>

              <div className="edit-password">
                <h3>Change Password</h3>
                <form className="edit-form">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter your current password" />
                  <label>New Password</label>
                  <input type="password" placeholder="Enter your new password" />
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm your new password" />
                  <button type="submit">Change Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;
