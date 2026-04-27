import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Info, X, ShieldCheck, Database, FileText, Activity, Layers } from 'lucide-react';
import "./Footer.css";

export default function Footer() {
  const [activeInfo, setActiveInfo] = useState(null);

  const footerDetails = {
    'Global Oncology DB': {
      title: 'Global Oncology Database',
      icon: <Database size={32} color="var(--primary)" />,
      description: 'Access to over 14.2 million curated oncology cases sourced from leading institutions including MSKCC, Mayo Clinic, and Tata Memorial Hospital.',
      stats: ['14.2M+ Records', 'Daily Sync', 'Global Reach']
    },
    'Mucormycosis Archive': {
      title: 'Mucormycosis Archive',
      icon: <FileText size={32} color="var(--secondary)" />,
      description: 'The world\'s most comprehensive specialized dataset for Post-Viral Fungal infections, featuring clinical patterns from the 2021-2022 outbreaks.',
      stats: ['85K+ Fungal Cases', 'Image Recognition', 'Pattern Clusters']
    },
    'National Health Inst.': {
      title: 'National Health Institute Integration',
      icon: <ShieldCheck size={32} color="var(--success)" />,
      description: 'Our AI models are directly aligned with National Health Institute (NHI) Clinical Decision Support frameworks and peer-reviewed protocols.',
      stats: ['Govt. Aligned', 'Peer Reviewed', 'Clinical Grade']
    },
    'HIPAA Compliance': {
      title: 'HIPAA & SOC2 Compliance',
      icon: <ShieldCheck size={32} color="var(--primary)" />,
      description: 'Enterprise-grade security infrastructure ensuring full HIPAA compliance and SOC2 Type II certification for handling Protected Health Information (PHI).',
      stats: ['PHI Protected', 'Audit Ready', 'Type II Certified']
    },
    'Data Encryption Model': {
      title: 'Neural Encryption Model',
      icon: <Info size={32} color="var(--secondary)" />,
      description: 'Multi-layer security featuring AES-256 hardware-level encryption at rest and TLS 1.3 for all medical imaging data transmissions.',
      stats: ['AES-256', 'TLS 1.3', 'Quantum Ready']
    },
    'Ethics Board Review': {
      title: 'Ethics & AI Governance',
      icon: <FileText size={32} color="var(--success)" />,
      description: 'All AI inference models undergo quarterly transparency audits by our Independent Medical Ethics Board to ensure unbiased clinical assistance.',
      stats: ['Unbiased AI', 'Quarterly Audits', 'Ethical Design']
    }
  };

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    setActiveInfo(footerDetails[item]);
  };

  return (
    <>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="nav-logo">
              <div className="logo-icon">
                <Activity className="icon-pulse" size={24} color="var(--primary)" />
                <Layers size={20} color="var(--secondary)" className="icon-overlay" />
              </div>
              <h4 className="logo-text">
                NeuralMatch <span className="text-gradient">AI</span>
              </h4>
            </div>
            <p className="text-muted text-sm mt-4">
              Elite AI Similarity Detection System for modern clinicians. 
            </p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h5>Dataset Providers</h5>
              {['Global Oncology DB', 'Mucormycosis Archive', 'National Health Inst.'].map(item => (
                <button key={item} className="footer-info-btn" onClick={(e) => handleLinkClick(e, item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="link-group">
              <h5>System Security</h5>
              {['HIPAA Compliance', 'Data Encryption Model', 'Ethics Board Review'].map(item => (
                <button key={item} className="footer-info-btn" onClick={(e) => handleLinkClick(e, item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom text-muted">
          <p>
            &copy; {new Date().getFullYear()} NeuralMatch AI. Precision Analytical Systems.
          </p>
        </div>
      </footer>

      {/* Info Modal */}
      {activeInfo && (
        <div className="footer-modal-overlay animate-fade-in" onClick={() => setActiveInfo(null)}>
          <div className="footer-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveInfo(null)}>
              <X size={24} />
            </button>
            
            <div className="footer-modal-header">
              <div className="modal-icon-wrapper">
                {activeInfo.icon}
              </div>
              <h3>{activeInfo.title}</h3>
            </div>
            
            <p className="modal-description">{activeInfo.description}</p>
            
            <div className="modal-stats">
              {activeInfo.stats.map(stat => (
                <div key={stat} className="stat-badge">{stat}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
