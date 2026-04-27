import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Layers, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (currentUser) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };
  
  return (
    <nav className="navbar glass-panel">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <Activity className="icon-pulse" size={24} color="var(--primary)" />
            <Layers size={20} color="var(--secondary)" className="icon-overlay" />
          </div>
          <span className="logo-text">NeuralMatch <span className="text-gradient">AI</span></span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Overview</Link>
          <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Plans & Pricing</Link>
          {currentUser && <Link to="/dashboard" className={location.pathname.includes('/dashboard') ? 'active' : ''}>Analysis Studio</Link>}
          <div className="nav-divider"></div>
          <button 
            type="button"
            className={currentUser ? "btn-ghost" : "btn-primary"} 
            onClick={handleAuthAction}
          >
            {currentUser ? <LogOut size={18} /> : <ShieldCheck size={18} />}
            <span>{currentUser ? 'Sign Out' : 'Doctor Login'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
