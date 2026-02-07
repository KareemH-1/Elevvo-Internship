import React from 'react'
import Sidebar_Header from '../components/Sidebar_Header' 
const Projects = ({ userName }) => {
       
  return (
    <div>
      <Sidebar_Header page="Projects" userName={userName} />
    </div>
  )
}

export default Projects
