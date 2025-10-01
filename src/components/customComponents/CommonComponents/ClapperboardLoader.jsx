import React from 'react';

// Keyframes for the clapperboard animation (defined outside component to avoid re-creation)
const clapperAnimationKeyframes = `
  @keyframes clapperSlap {
    0% {
      transform: perspective(300px) rotateX(0deg);
    }
    15% {
      transform: perspective(300px) rotateX(-25deg);
    }
    30% {
      transform: perspective(300px) rotateX(0deg);
    }
    100% {
      transform: perspective(300px) rotateX(0deg);
    }
  }

  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(0, 178, 169, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 178, 169, 0.6), 0 0 30px rgba(0, 178, 169, 0.4);
    }
  }
`;

/**
 * ClapperboardLoader Component
 * 
 * A cinematic loader component featuring a realistic clapperboard animation
 * with 3D rotation effects, striped patterns, and smooth open/close motion.
 * Designed for movie production house websites with professional styling.
 */
const ClapperboardLoader = ({ 
  size = 120, 
  primaryColor = '#1C1C1C', 
  accentColor = '#5227FF',
  textColor = '#EAEAEA' 
}) => {
  // Inject keyframes into document head
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = clapperAnimationKeyframes;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Container styles for centering and responsiveness
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: '200px',
    animation: 'fadeInOut 2s ease-in-out infinite'
  };

  // Main clapperboard container styles
  const clapperboardStyles = {
    position: 'relative',
    width: `${size}px`,
    height: `${size * 0.8}px`,
    transformStyle: 'preserve-3d',
    perspective: '300px'
  };

  // Bottom board (static part) styles
  const bottomBoardStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '70%',
    backgroundColor: primaryColor,
    borderRadius: '8px',
    border: `2px solid ${accentColor}`,
    boxShadow: `
      0 8px 16px rgba(0, 0, 0, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    animation: 'glow 2s ease-in-out infinite',
    background: `linear-gradient(145deg, ${primaryColor}, #2B2B2B)`
  };

  // Top clapper (animated part) styles
  const topClapperStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '40%',
    backgroundColor: '#EAEAEA',
    borderRadius: '8px 8px 4px 4px',
    transformOrigin: 'bottom center',
    animation: 'clapperSlap 2s ease-in-out infinite',
    boxShadow: `
      0 4px 8px rgba(0, 0, 0, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.2)
    `,
    background: `linear-gradient(145deg, #EAEAEA, #F5F5F5)`,
    border: `1px solid #CCCCCC`
  };

  // Striped pattern on the top clapper
  const stripesContainerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '8px 8px 4px 4px',
    overflow: 'hidden',
    display: 'flex'
  };

  // Individual stripe styles
  const stripeStyles = (index) => ({
    flex: 1,
    height: '100%',
    backgroundColor: index % 2 === 0 ? '#1C1C1C' : '#EAEAEA',
    borderRight: index < 7 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
  });

  // Responsive text size calculation
  const getResponsiveSize = (baseMultiplier, minSize = 8, maxSize = null) => {
    const baseSize = size * baseMultiplier;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    // Responsive breakpoints
    let responsiveMultiplier = 1;
    if (screenWidth < 480) {
      responsiveMultiplier = 0.7; // Small phones
    } else if (screenWidth < 768) {
      responsiveMultiplier = 0.8; // Large phones
    } else if (screenWidth < 1024) {
      responsiveMultiplier = 0.9; // Tablets
    }
    
    const calculatedSize = baseSize * responsiveMultiplier;
    const finalSize = Math.max(minSize, calculatedSize);
    
    return maxSize ? Math.min(finalSize, maxSize) : finalSize;
  };

  // Text on the bottom board
  const boardTextStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: textColor,
    fontSize: `${getResponsiveSize(0.08, 10, 24)}px`,
    fontWeight: 900,
    fontFamily: 'Roboto Flex, sans-serif',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
    letterSpacing: '0.5px',
    lineHeight: '1.2'
  };

  // Scene/take text on the top clapper
  const clapperTextStyles = {
    position: 'absolute',
    bottom: '2px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#1C1C1C',
    fontSize: `${getResponsiveSize(0.06, 8, 18)}px`,
    fontWeight: 'bold',
    fontFamily: 'Roboto Flex, sans-serif',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)'
  };

  // Loading text below the clapperboard
  const loadingTextStyles = {
    position: 'absolute',
    bottom: `-${size * 0.3}px`,
    left: '50%',
    transform: 'translateX(-50%)',
    color: textColor,
    fontSize: `${getResponsiveSize(0.12, 12, 28)}px`,
    fontWeight: '300',
    fontFamily: 'Roboto Flex, sans-serif',
    textAlign: 'center',
    opacity: 0.8,
    letterSpacing: '2px',
    width: '100%'
  };

  return (
    <div style={containerStyles}>
      <div style={clapperboardStyles}>
        {/* Static bottom board */}
        <div style={bottomBoardStyles}>
          <div style={boardTextStyles}>
            WEBSITE
            <br />
            LOADING
          </div>
        </div>
        
        {/* Animated top clapper */}
        <div style={topClapperStyles}>
          {/* Striped pattern */}
          <div style={stripesContainerStyles}>
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} style={stripeStyles(index)} />
            ))}
          </div>
          
          {/* Scene/Take text */}
          <div style={clapperTextStyles}>
          </div>
        </div>
        
        {/* Loading text */}
        <div style={loadingTextStyles}>
          LOADING
        </div>
      </div>
    </div>
  );
};

export default ClapperboardLoader;