import React, { useState, useEffect } from 'react';
import ClapperboardLoader from './ClapperboardLoader';

/**
 * InitialLoadingScreen Component
 * 
 * Shows the clapperboard loader only on the first website load.
 * Uses sessionStorage to track if the site has been loaded before.
 * Displays for a minimum time to ensure smooth user experience.
 */
const InitialLoadingScreen = ({ children, minLoadTime = 2000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is the first load in this session
    // const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    // For development/testing: Comment out the lines below to always show loading screen
    // if (hasLoadedBefore) {
    //   // Not first load, skip loading screen
    //   setIsLoading(false);
    //   setShowContent(true);
    //   return;
    // }

    // Always show loading screen (remove the above check for testing)
    console.log('Loading screen started, duration:', minLoadTime + 'ms');
    
    // First load - show loading screen
    // Simulate loading time and mark as loaded
    const loadTimer = setTimeout(() => {
      console.log('Loading screen ending...');
      sessionStorage.setItem('hasLoadedBefore', 'true');
      setIsLoading(false);
      
      // Add small delay for smooth transition
      setTimeout(() => {
        setShowContent(true);
        console.log('Content shown');
      }, 500);
    }, minLoadTime);

    return () => clearTimeout(loadTimer);
  }, [minLoadTime]);

  // Loading screen styles
  const loadingScreenStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1C1C',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    transition: 'opacity 0.5s ease-out',
    opacity: isLoading ? 1 : 0,
    pointerEvents: isLoading ? 'all' : 'none',
    padding: '1rem',
    boxSizing: 'border-box'
  };

  const titleStyles = {
    color: '#EAEAEA',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Responsive font size
    fontWeight: 'bold',
    fontFamily: '"Roboto Flex", sans-serif',
    textAlign: 'center',
    letterSpacing: '0.2em',
    marginBottom: '2rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    lineHeight: '1.2',
    maxWidth: '90%'
  };

  const subtitleStyles = {
    color: '#A0A0A0',
    fontSize: 'clamp(0.8rem, 2vw, 1rem)', // Responsive font size
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    letterSpacing: '0.1em',
    marginTop: '2rem',
    opacity: 0.8,
    maxWidth: '90%'
  };

  const contentStyles = {
    opacity: showContent ? 1 : 0,
    transition: 'opacity 0.5s ease-in',
    width: '100%',
    height: '100%'
  };

  return (
    <>
      {/* Initial Loading Screen */}
      <div style={loadingScreenStyles}>
        <h1 style={titleStyles}>
          WELCOME TO 1NOT2 PRODUCTION
        </h1>
        
        <ClapperboardLoader 
          size={180} 
          primaryColor="#1C1C1C" 
          accentColor="#00B2A9" 
          textColor="#EAEAEA" 
        />
        
        <p style={subtitleStyles}>
          PREPARING YOUR CINEMATIC EXPERIENCE
        </p>
      </div>

      {/* Main Content */}
      <div style={contentStyles}>
        {children}
      </div>
    </>
  );
};

export default InitialLoadingScreen;