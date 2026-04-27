import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CheckCircle, DatabaseZap, Stethoscope, Building2, CreditCard, Lock, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Subscription.css';

export default function Subscription() {
  const navigate = useNavigate();
  const { currentUser, syncPlan } = useAuth();
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleSelectPlan = (planName, price) => {
    setSelectedPlan({ name: planName, price });
    setShowCheckout(true);
  };

  const simulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call to Stripe/Payment Gateway
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Update the mock user auth to show they have an active plan
      if (currentUser) {
        syncPlan(selectedPlan.name);
      }

      // Redirect after showing success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    }, 2500);
  };

  return (
    <div className="subscription-page animate-fade-in">
      <div className="subscription-header">
        <h1 className="text-gradient">Choose Your Clinical Plan</h1>
        <p className="text-muted">Flexible subscription tiers for individual practitioners, clinics, and enterprise hospitals.</p>
      </div>

      <div className="pricing-grid">
        {/* Basic Plan */}
        <div className="pricing-card glass-panel">
          <div className="plan-icon">
            <Stethoscope size={32} color="var(--primary)" />
          </div>
          <h3>Solo Practitioner</h3>
          <p className="plan-desc">For individual doctors needing occasional similarity inferences.</p>
          <div className="plan-price">
            <span className="currency">$</span>
            <span className="amount">29</span>
            <span className="period">/month</span>
          </div>
          <ul className="plan-features">
            <li><CheckCircle size={18} className="feat-icon" /> 100 Case Inferences / mo</li>
            <li><CheckCircle size={18} className="feat-icon" /> Sub-2 sec Processing Time</li>
            <li><CheckCircle size={18} className="feat-icon" /> Standard Email Support</li>
            <li className="disabled"><CheckCircle size={18} className="feat-icon" /> EHR API Integration</li>
          </ul>
          <button className="btn-ghost w-full" onClick={() => handleSelectPlan('Solo Practitioner', 29)}>
            Select Solo Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card glass-panel popular-tier">
          <div className="popular-badge">Most Popular</div>
          <div className="plan-icon highlight">
            <Activity size={32} color="white" />
          </div>
          <h3>Specialist Clinic</h3>
          <p className="plan-desc">High-volume usage tailored for Oncology & Infectious Disease centers.</p>
          <div className="plan-price">
            <span className="currency">$</span>
            <span className="amount">199</span>
            <span className="period">/month</span>
          </div>
          <ul className="plan-features">
            <li><CheckCircle size={18} className="feat-icon highlight-icon" /> Unlimited Case Inferences</li>
            <li><CheckCircle size={18} className="feat-icon highlight-icon" /> Sub-0.5 sec GPU Processing</li>
            <li><CheckCircle size={18} className="feat-icon highlight-icon" /> Priority 24/7 Phone Support</li>
            <li><CheckCircle size={18} className="feat-icon highlight-icon" /> Basic EHR Integration (HL7)</li>
          </ul>
          <button className="btn-primary w-full" onClick={() => handleSelectPlan('Specialist Clinic', 199)}>
            Select Clinic Plan
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-card glass-panel">
          <div className="plan-icon">
            <Building2 size={32} color="var(--secondary)" />
          </div>
          <h3>Enterprise Hospital</h3>
          <p className="plan-desc">Complete systemic integration across multiple medical departments.</p>
          <div className="plan-price">
            <span className="amount">Custom</span>
          </div>
          <ul className="plan-features">
            <li><CheckCircle size={18} className="feat-icon" /> Unlimited System-wide Seats</li>
            <li><CheckCircle size={18} className="feat-icon" /> Custom Deep Learning Finetuning</li>
            <li><CheckCircle size={18} className="feat-icon" /> Dedicated Account Manager</li>
            <li><CheckCircle size={18} className="feat-icon" /> Full FHIR / Epic Integration</li>
          </ul>
          <button className="btn-ghost w-full" onClick={() => handleSelectPlan('Enterprise Custom', 0)}>
            Contact Sales
          </button>
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {showCheckout && (
        <div className="checkout-overlay animate-fade-in">
          <div className="checkout-modal glass-panel">
            <button className="close-btn" onClick={() => !isProcessing && setShowCheckout(false)}>
              <X size={24} />
            </button>
            
            {paymentSuccess ? (
              <div className="success-state">
                <div className="success-icon-wrapper">
                  <ShieldCheck size={64} color="var(--success)" className="icon-pulse" />
                </div>
                <h2>Payment Successful!</h2>
                <p className="text-muted">Your {selectedPlan?.name} subscription is active.</p>
                <p className="redirect-text mt-4">Generating secure token and opening your Medical Dashboard...</p>
              </div>
            ) : (
              <>
                <div className="checkout-header">
                  <h2>Complete Purchase</h2>
                  <p className="text-muted text-sm">You are subscribing to the <strong>{selectedPlan?.name}</strong> plan.</p>
                  <div className="checkout-total">
                    <span>Total Billed Today:</span>
                    <span className="total-price">${selectedPlan?.price}.00</span>
                  </div>
                </div>

                <form onSubmit={simulatePayment} className="checkout-form">
                  <div className="input-group">
                    <label className="input-label">Cardholder Name</label>
                    <input type="text" className="glass-input" placeholder="e.g. Dr. Jane Doe" required />
                  </div>
                  
                  <div className="input-group">
                    <label className="input-label">Card Number</label>
                    <div className="input-with-icon">
                      <CreditCard className="input-icon" size={18} />
                      <input type="text" className="glass-input has-icon" placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </div>
                  </div>
                  
                  <div className="grid-2">
                    <div className="input-group">
                      <label className="input-label">Expiry</label>
                      <input type="text" className="glass-input" placeholder="MM/YY" maxLength="5" required />
                    </div>
                    <div className="input-group">
                      <label className="input-label">CVC</label>
                      <div className="input-with-icon">
                        <Lock className="input-icon" size={18} />
                        <input type="password" className="glass-input has-icon" placeholder="•••" maxLength="4" required />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-primary w-full checkout-submit ${isProcessing ? 'processing' : ''}`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <><Activity size={18} className="spinner" /> Verifying Bank Details...</>
                    ) : (
                      <><Lock size={18} /> Pay Securely</>
                    )}
                  </button>
                  <div className="secure-badge text-muted text-sm">
                    <ShieldCheck size={14} /> 256-bit TLS Encryption via Stripe Mock Processor
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
