import './App.css'
import { BrowserRouter as Router,Route,Routes, Navigate } from 'react-router-dom';
import {Home} from './components/Home/Home';
import { ActivityCard } from './components/ActivityHistory/ActivityCard';
import { FriendCard } from './components/Friends/FriendCard';
import { ActivityItem } from './components/ActivityHistory/ActivityItem';
import { GroupItem } from './components/Groups/GroupItem';
import { GroupCard } from './components/Groups/GroupCard';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate to="/card" />} />
        <Route path="/login" exact element={<Home/>} />
        <Route path="/managefriends" element={<FriendCard/>} />
        <Route path="/history" element={<ActivityCard/>} />
        <Route path="/card" element={<GroupCard/>} />

      </Routes>
      </Router>
    </>
  )
}

export default App;
