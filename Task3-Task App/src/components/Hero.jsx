import React from "react";
import blobBg from "../assets/blob-scene-haikei.svg";
import taskBro from "../assets/Task-bro.svg";
import {ArrowDown} from 'lucide-react'

function Hero() {
  return (
    <div className="hero reveal">
      <div className="hero-bg">
        <img src={blobBg} alt="Background Blob" />
      </div>

      <div className="hero-content">
        <h1>
          Welcome to <span className="highlight">TaskFlow</span>
        </h1>
        <p className="text-muted">
          Organize your tasks with ease and efficiency.
        </p>
        <button className="primary-button btn-hero">Get Started</button>
        <a href="#features" className="secondary-button btn-hero">Learn More</a>
      </div>

      <div className="hero-image">
        <img src={taskBro} alt="Hero Illustration" />
      </div>

      <a href="#features" className="scroll-indicator">
        <span className="scroll-text">Scroll Down</span>
        <ArrowDown className="icon" size={20} />
      </a>
    </div>
  );
}

export default Hero;
