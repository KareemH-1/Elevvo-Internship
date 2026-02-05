import React from 'react';
import styled from 'styled-components';

const Switch = () => {
    
const [isDarkMode, setIsDarkMode] = React.useState(false);
const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
  document.body.classList.toggle('darkMode');
};
  return (
    <StyledWrapper>
      <div className="toggle-switch" aria-label="Toggle dark mode">
        <label className="switch-label">
          <input 
            type="checkbox" 
            className="checkbox" 
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider" />
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .toggle-switch {
    position: relative;
    width: 50px;
    height: 25px;
    --light: var(--background-color);
    --dark: var(--text-color);
    --link: rgb(27, 129, 112);
    --link-hover: rgb(24, 94, 82);
  }

  .switch-label {
    position: absolute;
    width: 100%;
    height: 25px;
    background-color: var(--dark);
    border-radius: 32px;
    cursor: pointer;
    border: 3px solid var(--dark);
  }

  .checkbox {
    position: absolute;
    display: none;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .checkbox:checked ~ .slider {
    background-color: var(--light);
  }

  .slider::before {
    content: "";
    position: absolute;
    top:3px;
    left: 7px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-box-shadow: inset 12px -4px 0px 0px var(--light);
    box-shadow: inset 12px -4px 0px 0px var(--light);
    background-color: var(--dark);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .checkbox:checked ~ .slider::before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
    background-color: var(--dark);
    -webkit-box-shadow: none;
    box-shadow: none;
  }`;

export default Switch;
