import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import '../css/header.css'

const Header = ({ page, userName, isSidebarOpen }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [date, setDate] = useState(new Date().toLocaleDateString())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
      
    }, 1000)

    const dateInterval = setInterval(() => {
      setDate(new Date().toLocaleDateString())
    }, 60000)
    return () => {
      clearInterval(interval)
      clearInterval(dateInterval)
    }
  }, [])

  return (
    <div className={`header ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <div className="header-start">
        <h1>{page}</h1>
        <h2>Welcome, {userName}!</h2>
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
  )
}

export default Header
