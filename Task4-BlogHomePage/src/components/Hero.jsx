import React from 'react'
import Search from './Search.jsx';
const Hero = () => {
  return (
    <div className="hero" id="hero">
        <p className="text-muted">Blog</p>
        <h1 className="hero-title">Discover latest news</h1>
        <p className="hero-description">Discover insightful articles, tips, and stories on a variety of topics. Join our community and stay updated with the latest trends and ideas.</p>
        
        <div className="hero-buttons">
            <Search />
            <button className="explore-button">Explore</button>
        </div>
      </div> 
)
}

export default Hero
