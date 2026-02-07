import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar'
import Header from './header'

const Sidebar_Header = ({ page, userName, isDarkMode, onToggleTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen')
    return saved !== null ? JSON.parse(saved) : true
  })

  const [localDarkMode, setLocalDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? JSON.parse(saved) : false
  })

  const hasThemeProps = typeof isDarkMode === 'boolean' && typeof onToggleTheme === 'function'
  const effectiveDarkMode = hasThemeProps ? isDarkMode : localDarkMode
  const handleThemeToggle = (nextValue) => {
    if (hasThemeProps) {
      onToggleTheme(nextValue)
    } else {
      setLocalDarkMode(nextValue)
    }
  }

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen))
    if (isSidebarOpen) {
      document.body.classList.remove('sidebar-collapsed')
    } else {
      document.body.classList.add('sidebar-collapsed')
    }
  }, [isSidebarOpen])

  useEffect(() => {
    if (hasThemeProps) {
      return
    }
    localStorage.setItem('darkMode', JSON.stringify(localDarkMode))
    document.body.classList.toggle('darkMode', localDarkMode)
  }, [localDarkMode, hasThemeProps])

  return (
    <div>
        <Sidebar page={page} userName={userName} isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} isDarkMode={effectiveDarkMode} onToggleTheme={handleThemeToggle} />
        <Header page={page} userName={userName} isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default Sidebar_Header
