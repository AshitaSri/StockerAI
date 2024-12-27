import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import FundamentalAnalysis from './pages/funda/funda';
import TechnicalAnalysis from './pages/technical/technical';
import FutureAndOptionslAnalysis from './pages/future/future';
import Home from './pages/home/home';
import Navbar from './components/navbar/navbar';
import Chatbot from './components/chatbot/chatbot';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fundamental-analysis" element={<FundamentalAnalysis/>} />
            <Route path="/technical-analysis" element={<TechnicalAnalysis />} />
            <Route path="/futures-options" element={<FutureAndOptionslAnalysis />} />
          </Routes>
        </div>
        <Chatbot />
      </div>
    </Router>
    
  );
}

export default App;