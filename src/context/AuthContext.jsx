import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate auth state on load
  useEffect(() => {
    const storedUser = localStorage.getItem('neuralMatch_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (licenseNumber) => {
    const userProfile = { 
      id: licenseNumber, 
      role: 'doctor', 
      authenticatedAt: new Date().toISOString(),
      usageCount: 0,
      activePlan: null
    };
    localStorage.setItem('neuralMatch_user', JSON.stringify(userProfile));
    setCurrentUser(userProfile);
  };

  const incrementUsage = () => {
    if (currentUser) {
      const updatedUser = { 
        ...currentUser, 
        usageCount: (currentUser.usageCount || 0) + 1 
      };
      localStorage.setItem('neuralMatch_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }
  };

  const syncPlan = (planName) => {
    if (currentUser) {
      const upgradedUser = { ...currentUser, activePlan: planName };
      localStorage.setItem('neuralMatch_user', JSON.stringify(upgradedUser));
      setCurrentUser(upgradedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('neuralMatch_user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    incrementUsage,
    syncPlan
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
