import React from 'react'
import { Sparkles, Users, Settings } from 'lucide-react'

const Features = () => {
  return (
    <div id="features" className="features-section reveal">   

        <hr className="section-divider" />

        <h2 className="section-title">Why Choose TaskFlow</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles size={40} />
            </div>
            <h3>Intuitive Design</h3>
            <p>Our user-friendly interface makes task management a easier.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={40} />
            </div>
            <h3>Seamless Collaboration</h3>
            <p>Work together with your team in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Settings size={40} />
            </div>
            <h3>Customizable Workflows</h3>
            <p>Adapt TaskFlow to fit your unique project needs.</p>
          </div>
        </div>



    </div>
  )
}

export default Features
