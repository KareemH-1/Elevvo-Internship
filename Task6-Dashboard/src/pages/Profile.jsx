import React from "react";
import Sidebar_Header from "../components/Sidebar_Header";

const Profile = ({ userName, isDarkMode, setIsDarkMode }) => {
  
  return (
    <div>
        <Sidebar_Header page="Profile" userName={userName} isDarkMode={isDarkMode} onToggleTheme={setIsDarkMode} />

    </div>
  );
};

export default Profile;
