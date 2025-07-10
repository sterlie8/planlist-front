// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Meeting from './pages/Meeting';
import Dining from './pages/Dining';
import Travel from './pages/Travel';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header
        logoSrc="/logo.png"
        navItems={[
          { label: '미팅', path: '/meeting' },
          { label: '회식', path: '/dining' },
          { label: '여행', path: '/travel' },
        ]}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
