import React, { useState } from 'react';
import './BurgerMenu.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      <div className="burger-icon" onClick={toggleMenu}>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
      </div>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#New">New stories</a></li>
          <li><a href="#Best">Best</a></li>
          <li><a href="#Top">Top</a></li>
          <li><a href="#Ask">Ask HN</a></li>
          <li><a href="#Show">Show HN</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;
