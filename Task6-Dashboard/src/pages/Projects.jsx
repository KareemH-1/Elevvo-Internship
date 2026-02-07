import React from 'react'
import Sidebar_Header from '../components/Sidebar_Header' 
const Projects = ({ userName, isDarkMode, setIsDarkMode }) => {
       
  return (
    <div>
      <Sidebar_Header page="Projects" userName={userName} isDarkMode={isDarkMode} onToggleTheme={setIsDarkMode} />
    </div>
  )
}

export default Projects
