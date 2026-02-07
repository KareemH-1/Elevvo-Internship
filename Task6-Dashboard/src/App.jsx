import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Overview from './pages/overview'
import Projects from './pages/projects'
import Profile from './pages/profile'


function App() {
  const [userName, setUserName] = React.useState("Kareem Ahmed");

  return (
    <Routes>
      <Route path="/" element={<Overview userName={userName} />} />
      <Route path="/projects" element={<Projects userName={userName} />} />
      <Route path="/profile" element={<Profile userName={userName} />} />
    </Routes>
  )
}

export default App
