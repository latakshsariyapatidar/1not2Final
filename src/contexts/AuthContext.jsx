import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Create the authentication context
const AuthContext = createContext({
  currentUser: null,
  isLoading: true,
  isAuthenticated: false,
  userData: null,
  signOut: () => {}
});

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // User is signed in and email is verified
        setCurrentUser(user);
        
        // Extract and save user data to localStorage
        const userInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
        };
        
        setUserData(userInfo);
        localStorage.setItem('userData', JSON.stringify(userInfo));
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        // User is signed out or email not verified
        setCurrentUser(null);
        setUserData(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('isAuthenticated');
      }
      setIsLoading(false);
    });

    // Check if user data exists in localStorage on app load
    const storedUserData = localStorage.getItem('userData');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (storedUserData && isAuthenticated) {
      setUserData(JSON.parse(storedUserData));
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign out function
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    userData,
    signOut: handleSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;