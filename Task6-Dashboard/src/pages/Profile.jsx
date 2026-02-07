import React from "react";
import Sidebar_Header from "../components/Sidebar_Header";

const Profile = ({ userName }) => {
  
  return (
    <div>
        <Sidebar_Header page="Profile" userName={userName} />

    </div>
  );
};

export default Profile;
