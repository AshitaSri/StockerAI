import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          TradingApp
        </Link>
      </div>

      <button className="nav-toggle" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/fundamental-analysis" className="nav-item">Fundamental Analysis</Link>
        <Link to="/technical-analysis" className="nav-item">Technical Analysis</Link>
        <Link to="/futures-options" className="nav-item">Futures & Options</Link>
      </div>
    </nav>
  );
};

export default Navbar;