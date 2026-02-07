import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar'
import Header from './header'

const Sidebar_Header = ({ page, userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen')
    return saved !== null ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen))
    if (isSidebarOpen) {
      document.body.classList.remove('sidebar-collapsed')
    } else {
      document.body.classList.add('sidebar-collapsed')
    }
  }, [isSidebarOpen])

  return (
    <div>
        <Sidebar page={page} userName={userName} isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
        <Header page={page} userName={userName} isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default Sidebar_Header
