import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiUsers, FiBarChart2, FiPlus } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/tasks', icon: <FiCheckSquare />, label: 'Tasks' },
    { path: '/users', icon: <FiUsers />, label: 'Users' },
    { path: '/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <NavLink to="/tasks/new" className="btn btn-primary btn-create">
            <FiPlus size={20} />
            <span>New Task</span>
          </NavLink>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Menu</h3>
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;