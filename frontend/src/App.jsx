import React, { useState, useEffect } from 'react';
import './App.css';
import { FaList } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import { Login } from './components/Home/Login';
import About from './components/Home/About';
import Home from "./components/Home/Home";

const App = () => {
  const [isAuthenticated, setAuthentication]  = useState(localStorage.getItem('jwtToken'));

  const location = useLocation();
  var path = location.pathname;
  path = path.slice(1,)
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768); // Show sidebar by default for widths >= 768px
  const [selectedNavItem, setSelectedNavItem] = useState(path);

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);


    };
  }, []);

  return (
    isAuthenticated ? (

      <div className="app">
        <button className="hamburger" onClick={handleHamburgerClick}>
          <FaList />
        </button>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setSelectedNavItem={setSelectedNavItem} />
        <Routes>
          <Route path={selectedNavItem} element={<Content selectedNavItem={selectedNavItem} />}>

          </Route>
        </Routes>
      </div>
    ) : (
      <About setAuthentication={setAuthentication}/>
    )

  );
};

export default App;
