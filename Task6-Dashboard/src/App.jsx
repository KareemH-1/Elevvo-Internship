import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Overview from './pages/overview'
import Projects from './pages/projects'
import Profile from './pages/profile'


function App() {
  const [userName, setUserName] = React.useState("Kareem Ahmed");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    document.body.classList.toggle('darkMode', isDarkMode)
  }, [isDarkMode])

  return (
    <Routes>
      <Route path="/" element={<Overview userName={userName} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      <Route path="/projects" element={<Projects userName={userName} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      <Route path="/profile" element={<Profile userName={userName} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
    </Routes>
  )
}

export default App
