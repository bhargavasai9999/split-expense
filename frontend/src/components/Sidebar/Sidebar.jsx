// Sidebar.js

import React, { useState } from 'react';
import { FaHome, FaUser, FaUsers, FaChartBar} from 'react-icons/fa';
import './Sidebar.css';
import { ProfilePopup } from '../Profile/ProfilePopup';
import pic from './pic.jpg';
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from  './logo.png'
const Sidebar = ({onLogout, showSidebar, setShowSidebar, selectedNavItem, setSelectedNavItem }) => {

  const [showmodal, setmodal] = useState(false);
  const openModal = () => setmodal(true);
  const closemodal = () => setmodal(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem('userDetails');

  // Parse the user details string into an object
  const user = JSON.parse(userString);
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');
    onLogout();
  }
  // Access the username from the user object
  const username = user ? user.username : "User"

  const navItems = [
    { id: 'dashboard', icon: <FaHome />, text: 'Dashboard' },
    { id: 'friends', icon: <FaUsers />, text: 'Friends' },
    { id: 'groups', icon: <FaUsers />, text: 'Groups' },
    { id: 'activities', icon: <FaChartBar />, text: 'Activities' },

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
        <h3><img src={logo} className='logo-img m-0'/> Split Expenses</h3>
      </div>
      <div className="user" onClick={openModal}>
        <img src={pic} alt="User" />
        <h5>Hello,&nbsp;{username}</h5>
      </div>
      {showmodal == true && <ProfilePopup show={showmodal} close={closemodal} data={user} />}
      <ul className="nav-items ">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => { handleNavItemClick(item.id); navigate(item.id) }}
            className={selectedNavItem === item.id ? 'active' : ''}
          >
            {item.icon}
            <span className=''>{item.text}</span>
          </li>
        ))}
        <li onClick={handleLogout}>
         <FiLogOut/>
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );

};


export default Sidebar;
