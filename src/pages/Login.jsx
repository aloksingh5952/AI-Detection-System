import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, Shield, Key, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login } = useAuth();
  const [formData, setFormData] = useState({
    licenseNumber: '',
    pin: '',
  });

  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.licenseNumber && formData.pin) {
      login(formData.licenseNumber);
      // login updates currentUser, which triggers the useEffect redirect
    }
  };

  return (
    <div className="login-page animate-fade-in">
      <div className="login-container glass-panel">
        <div className="login-header">
          <div className="logo-icon logo-icon-large mx-auto">
            <Activity className="icon-pulse" size={32} color="var(--primary)" />
          </div>
          <h2>Doctor Authentication Portal</h2>
          <p className="text-muted text-sm mt-2">Secure access for verified medical professionals via NPI or Medical License.</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">NPI or Medical License Number</label>
            <div className="input-with-icon">
              <Stethoscope className="input-icon" size={20} />
              <input 
                type="text" 
                className="glass-input has-icon" 
                placeholder="e.g. 1928374650"
                value={formData.licenseNumber}
                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label">Secure Access PIN</label>
            <div className="input-with-icon">
              <Key className="input-icon" size={20} />
              <input 
                type="password" 
                className="glass-input has-icon" 
                placeholder="••••••••"
                value={formData.pin}
                onChange={e => setFormData({...formData, pin: e.target.value})}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full mt-4 login-btn">
            <Shield size={18} /> Authenticate & Access
          </button>
        </form>
        
        <div className="login-footer">
          <p className="text-sm text-muted">Protected by NeuralMatch Security Infrastructure. Unauthorized access is strictly prohibited under HIPAA regulations.</p>
        </div>
      </div>
    </div>
  );
}
