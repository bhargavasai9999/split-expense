// Content.js

import React from 'react';
import "./Content.css"
import Dashboard from '../Dashboard/Dashboard';
import {GroupCard} from '../Groups/GroupCard';
import {FriendCard} from '../Friends/FriendCard'
import Expense from '../Expenses/Expense';
import {ActivityCard} from '../ActivityHistory/ActivityCard';




const Content = ({ selectedNavItem }) => {
  return (
    <div className="content">
      {selectedNavItem === 'dashboard' && <Dashboard />}
      {selectedNavItem === 'friends' && <FriendCard />}
      {selectedNavItem === 'groups' && <GroupCard />}
      {selectedNavItem === 'activities' && <ActivityCard />}
      {selectedNavItem === 'expenses' && <Expense />}
    </div>
  );
};

export default Content;
