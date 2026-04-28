import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Layers, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
        
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
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

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} color="var(--text-main)" /> : <Menu size={24} color="var(--text-main)" />}
        </button>
      </div>
    </nav>
  );
}
