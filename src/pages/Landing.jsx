import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Fingerprint, ActivitySquare, Microscope, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="landing-page animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge-pill">
            <span className="live-dot"></span>
            Advanced Diagnostics AI v2.4
          </div>
          <h1 className="hero-title">
            Clinical <span className="text-gradient">Case Similarity</span> Engine
          </h1>
          <p className="hero-subtitle">
            Empowering medical professionals with AI-driven inference. Compare real-time patient charts against our global oncology and mucormycosis dataset to accelerate diagnosis.
          </p>
          <div className="hero-actions">
            <button 
              className="btn-primary start-btn" 
              onClick={() => navigate(currentUser ? '/dashboard' : '/login')}
            >
              {currentUser ? (
                <>Go to Analysis Studio <LayoutDashboard size={18} /></>
              ) : (
                <>Doctor Login <ArrowRight size={18} /></>
              )}
            </button>
            <button className="btn-ghost" onClick={() => navigate('/pricing')}>
              View Plans
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="model-container glass-panel">
            <div className="scanning-line"></div>
            <Network size={120} color="var(--primary)" strokeWidth={1.5} className="floating-icon" />
            
            <div className="stat-card glass-panel floating-card-1">
              <ActivitySquare size={20} color="var(--primary)" />
              <div>
                <div className="stat-value">98.4%</div>
                <div className="stat-label">Model Accuracy</div>
              </div>
            </div>
            
            <div className="stat-card glass-panel floating-card-2">
              <Microscope size={20} color="var(--secondary)" />
              <div>
                <div className="stat-value">14.2M</div>
                <div className="stat-label">Analyzed Cases</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Core Capabilities</h2>
          <p>Powered by deep learning and comparative pattern recognition.</p>
        </div>
        
        <div className="grid-3">
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-blue">
              <Fingerprint size={28} color="var(--primary)" />
            </div>
            <h3>Symptom Clustering</h3>
            <p>Automatically groups multivariate symptoms to identify hidden patterns related to Mucormycosis.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-purple">
              <Network size={28} color="var(--secondary)" />
            </div>
            <h3>Oncology Matching</h3>
            <p>Cross-references tumor markers and imaging history with top cancer institutes' datasets.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-emerald">
              <ActivitySquare size={28} color="var(--success)" />
            </div>
            <h3>Real-time Inference</h3>
            <p>Sub-second response times for critical care environments where every second matters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
