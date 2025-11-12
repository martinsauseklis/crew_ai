import React from 'react';
import { FiMenu, FiBell, FiSettings, FiUser, FiCheckSquare } from 'react-icons/fi';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <FiMenu size={24} />
        </button>
        <div className="logo">
          <FiCheckSquare className="logo-icon" size={28} />
          <span className="logo-text">TaskFlow</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-icon-btn" aria-label="Notifications">
          <FiBell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <button className="header-icon-btn" aria-label="Settings">
          <FiSettings size={20} />
        </button>
        <button className="header-profile" aria-label="User profile">
          <FiUser size={20} />
          <span className="profile-name">John Doe</span>
        </button>
      </div>
    </header>
  );
};

export default Header;