import './App.css'
import { BrowserRouter as Router,Route,Routes, Navigate } from 'react-router-dom';
import { Home } from './Home/Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" exact element={<Home/>} />
        
      </Routes>
      </Router>
    </>
  )
}

export default App;
