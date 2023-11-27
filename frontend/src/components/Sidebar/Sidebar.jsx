// Sidebar.js

import React, { useState } from 'react';
import { FaHome, FaUser, FaUsers, FaChartBar, FaDollarSign } from 'react-icons/fa';
import './Sidebar.css';
import { ProfilePopup } from '../Profile/ProfilePopup';
import pic from './pic.jpg';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ showSidebar, setShowSidebar, selectedNavItem, setSelectedNavItem }) => {

  const [showmodal, setmodal] = useState(false);
  const openModal = () => setmodal(true);
  const closemodal = () => setmodal(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem('userDetails');

  // Parse the user details string into an object
  const user = JSON.parse(userString);

  // Access the username from the user object
  const username = user ? user.username : "User"
  
  const navItems = [
    { id: 'dashboard', icon: <FaHome />, text: 'Dashboard' },
    { id: 'friends', icon: <FaUsers />, text: 'Friends' },
    { id: 'groups', icon: <FaUsers />, text: 'Groups' },
    { id: 'activities', icon: <FaChartBar />, text: 'Activities' },
    { id: 'expenses', icon: <FaDollarSign />, text: 'All Expenses' },
  ];

  const handleNavItemClick = (itemId) => {
    setSelectedNavItem(itemId);

    // On mobile, hide the sidebar after clicking a navigation item
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }
  };

  return (
    <nav className={`sidebar ${showSidebar ? 'show' : ''}`}>
      <div className="logo">
        <h2>Split Expenses</h2>
      </div>
      <div className="user" onClick={openModal}>
        <img src={pic} alt="User" />
        <p>Hello,{username}</p>
      </div>
      {showmodal == true && <ProfilePopup show={showmodal} close={closemodal} />}
      <ul className="nav-items">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => { handleNavItemClick(item.id); navigate(item.id) }}
            className={selectedNavItem === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );

};


export default Sidebar;
