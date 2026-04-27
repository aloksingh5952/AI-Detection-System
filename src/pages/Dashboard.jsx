import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Activity, FileText, AlertCircle, Database, ChevronRight, Lock, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, incrementUsage } = useAuth();
  
  const [formData, setFormData] = useState({
    patientId: '',
    age: '',
    gender: 'mock',
    symptoms: '',
    duration: '',
  });
  
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const determineMockResult = (symptomsText) => {
    const text = symptomsText.toLowerCase();
    if (text.includes('tumor') || text.includes('lump') || text.includes('weight') || text.includes('cancer') || text.includes('bleeding')) {
      return { type: 'Oncology', diagnosis: 'Malignant Neoplasm Potential', percentage: Math.floor(Math.random() * 15) + 80 };
    } else if (text.includes('necrosis') || text.includes('vision') || text.includes('swelling') || text.includes('black') || text.includes('fungus')) {
      return { type: 'Mucormycosis', diagnosis: 'Black Fungus (Mucormycosis)', percentage: Math.floor(Math.random() * 10) + 88 };
    }
    return { type: 'General', diagnosis: 'Benign / Non-Specific Pattern', percentage: Math.floor(Math.random() * 30) + 40 };
  };

  const startAnalysis = () => {
    // 1. Check Freemium Limits
    const usage = currentUser?.usageCount || 0;
    const hasPlan = currentUser?.activePlan;

    if (!hasPlan && usage >= 3) {
      setShowPaywall(true);
      return;
    }

    // 2. Increment usage if free tier
    if (!hasPlan) {
      incrementUsage();
    }

    setIsProcessing(true);
    if (!formData.symptoms) {
      alert("Please enter primary symptoms for analysis.");
      setIsProcessing(false);
      return;
    }
    
    const result = determineMockResult(formData.symptoms);
    
    // Mock the delay of an AI model processing the case
    setTimeout(() => {
      // Navigate to the analysis page with a mock ID
      const randomId = Math.floor(1000 + Math.random() * 9000);
      navigate(`/analysis/CASE-${randomId}`, { 
        state: { 
          resultInfo: result, 
          patientData: formData 
        } 
      });
    }, 3000);
  };

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="dashboard-header">
        <h1>Analysis Studio</h1>
        <p className="text-muted">Input patient parameters and medical scans to run similarity detection against our global medical dataset.</p>
      </div>

      <div className="dashboard-grid">
        <div className="patient-form-section glass-panel">
          <div className="section-title">
            <FileText size={20} color="var(--primary)" />
            <h3>Patient Parameters</h3>
          </div>
          
          <form>
            <div className="input-group">
              <label className="input-label">Patient ID</label>
              <input 
                type="text" 
                className="glass-input" 
                placeholder="e.g. PT-2026-942" 
                value={formData.patientId}
                onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                required 
              />
            </div>
            
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Age</label>
                <input 
                  type="number" 
                  className="glass-input" 
                  placeholder="Years" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label className="input-label">Gender</label>
                <select 
                  className="glass-input" 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Primary Symptoms (comma separated)</label>
              <textarea 
                className="glass-input" 
                placeholder="Examples: Facial swelling, vision loss... OR tumor, unexplained weight loss..." 
                rows="3"
                value={formData.symptoms}
                onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                required
              ></textarea>
            </div>
            
            <div className="input-group">
              <label className="input-label">Known Comorbidities</label>
              <input type="text" className="glass-input" placeholder="e.g. Diabetes, Hypertension" />
            </div>
            
          </form>
        </div>

        <div className="upload-section">
          <div className="glass-panel upload-card" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="section-title">
              <Database size={20} color="var(--secondary)" />
              <h3>Medical Imaging</h3>
            </div>
            
            <div className={`upload-zone ${file ? 'has-file' : ''}`}>
              {!file ? (
                <>
                  <div className="upload-icon-wrapper">
                    <UploadCloud size={48} color="var(--text-muted)" />
                  </div>
                  <h4>Drag & Drop Imaging Data</h4>
                  <p className="text-muted text-sm">Supports MRI, CT Scans (DICOM, JPG, PNG)</p>
                  <div className="upload-divider">Or</div>
                  <button className="btn-ghost">Browse Files</button>
                </>
              ) : (
                <div className="file-ready">
                  <Activity size={48} color="var(--success)" className="icon-pulse" />
                  <h4>{file.name}</h4>
                  <p className="text-success">Ready for analysis</p>
                  <button className="btn-ghost mt-4" onClick={() => setFile(null)}>Remove File</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="glass-panel notice-card">
            <AlertCircle size={20} color="var(--warning)" />
            <p>Ensure all personally identifiable information (PII) is removed from scans before uploading.</p>
            {/* Analysis Action */}
            <button 
              className={`btn-primary scan-btn ${(!currentUser?.activePlan && (currentUser?.usageCount || 0) >= 3) ? 'locked-btn' : ''}`}
              onClick={startAnalysis}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Activity className="icon-pulse" size={20} />
                  Processing Neural Inference...
                </>
              ) : (!currentUser?.activePlan && (currentUser?.usageCount || 0) >= 3) ? (
                <>
                  <Lock size={20} />
                  Scan Limit Reached
                </>
              ) : (
                <>
                  <Database size={20} />
                  Start Analysis Engine
                </>
              )}
            </button>
            <p className="text-muted text-sm text-center mt-2">
              Deep comparison against global oncology & fungal data structures.
              {!currentUser?.activePlan && (
                <span style={{color: 'var(--warning)', display: 'block', marginTop:'4px'}}>
                  Free Scans Remaining: {Math.max(0, 3 - (currentUser?.usageCount || 0))} 
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="paywall-overlay animate-fade-in">
          <div className="paywall-modal glass-panel">
            <div className="paywall-icon">
              <ShieldAlert size={48} color="var(--warning)" className="icon-pulse" />
            </div>
            <h2>Free Trial Exhausted</h2>
            <p className="text-muted mb-4">
              You have reached the maximum limit of 3 free case analyses. Please subscribe to a premium plan to continue using the Neural Inference Engine.
            </p>
            <div className="paywall-actions">
              <button className="btn-primary w-full" onClick={() => navigate('/pricing')}>
                View Subscription Plans
              </button>
              <button className="btn-ghost w-full mt-2" onClick={() => setShowPaywall(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
