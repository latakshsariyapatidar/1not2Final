import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import ClapperboardLoader3D from './ClapperboardLoader3D';

/**
 * InitialLoadingScreen Component
 * 
 * Interactive 3D loading screen with clapperboard model.
 * Shows hover animation until user clicks, then plays clapping animation
 * and transitions to main content.
 */
const InitialLoadingScreen = ({ children, minLoadTime = 1000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  // Refs for transition elements
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressBarRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const containerRef = useRef(null);

  // Create the universal transition animation
  const performLoadingTransition = useCallback(() => {
    console.log('Starting loading transition animation');
    
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const progressBar = progressBarRef.current;
    const curtainLeft = curtainLeftRef.current;
    const curtainRight = curtainRightRef.current;

    if (!container || !overlay || !title || !subtitle || !progressBar || !curtainLeft || !curtainRight) {
      console.log('Missing refs for transition');
      // Fallback to simple transition
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 500);
      return;
    }

    // Set transition text
    title.textContent = 'LOADING';
    subtitle.textContent = 'EXPERIENCE';

    // Reset all elements to initial state immediately
    gsap.set([curtainLeft, curtainRight], { 
      scaleX: 0, 
      x: 0, 
      clearProps: "transform" 
    });
    gsap.set([title, subtitle, progressBar], { 
      opacity: 0, 
      y: 0, 
      scaleX: 1,
      clearProps: "transform,filter" 
    });
    gsap.set(overlay, { 
      display: 'flex', 
      opacity: 1 
    });

    // Create the transition timeline
    const tl = gsap.timeline({
      onStart: () => console.log('Loading transition started'),
      onComplete: () => {
        console.log('Loading transition completed');
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 300);
      }
    });

    // Phase 1: Curtain slide in effect - both curtains properly
    tl.fromTo(curtainLeft, {
      scaleX: 0,
      transformOrigin: 'left center'
    }, {
      scaleX: 1,
      duration: 0.4,
      ease: "power3.out",
    }, "+=0.1")
    .fromTo(curtainRight, {
      scaleX: 0,
      transformOrigin: 'right center'
    }, {
      scaleX: 1,
      duration: 0.4,
      ease: "power3.out",
    }, "-=0.3") // Start slightly after left curtain

    // Phase 2: Title entrance with modern typography effect
    .fromTo(title, {
      y: 60,
      opacity: 0,
      letterSpacing: "0.5em",
      filter: "blur(10px)",
    }, {
      y: 0,
      opacity: 1,
      letterSpacing: "0.15em",
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.2")

    // Phase 3: Subtitle slide up
    .fromTo(subtitle, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 0.8,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3")

    // Phase 4: Progress bar animation
    .fromTo(progressBar, {
      scaleX: 0,
      opacity: 0,
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2")

    // Phase 5: Hold for effect
    .to({}, { duration: 0.6 })

    // Phase 6: Exit animation - text first
    .to([title, subtitle], {
      y: -40,
      opacity: 0,
      filter: "blur(5px)",
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.1,
    })

    // Phase 7: Progress bar exit
    .to(progressBar, {
      scaleX: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.2")

    // Phase 8: Curtain slide out - both slide to left
    .to([curtainLeft, curtainRight], {
      x: "-100%",
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.05,
    }, "-=0.1")

    // Phase 9: Hide overlay
    .to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    }, "-=0.1")
    .set(overlay, { display: "none" });

  }, []);

  // Handle animation completion from 3D model
  const handleClapperAnimationComplete = useCallback(() => {
    console.log('Clapper animation completed, starting transition');
    setShowTransition(true);
    sessionStorage.setItem('hasLoadedBefore', 'true');
    performLoadingTransition();
  }, [performLoadingTransition]);

  useEffect(() => {
    // Clear previous session data to always show loader
    sessionStorage.removeItem('hasLoadedBefore');
    
    // Always show loading screen for better user experience
    // Comment out the skip logic to enable the loader every time
    // const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    // if (hasLoadedBefore) {
    //   // Not first load, skip loading screen immediately
    //   console.log('Loading screen skipped - already loaded before');
    //   setIsLoading(false);
    //   setShowContent(true);
    //   return;
    // }

    // Show loading screen
    console.log('3D Loading screen started');
    
    // Add a safety timeout to ensure content shows even if animation fails
    // const safetyTimeout = setTimeout(() => {
    //   console.log('Safety timeout triggered - forcing content to show');
    //   handleClapperAnimationComplete();
    // }, 5000000000000); // 10 seconds safety timeout
    
    // return () => clearTimeout(safetyTimeout);
  }, [minLoadTime, handleClapperAnimationComplete]);

  // Loading screen styles - minimal blank screen with 3D model
  const loadingScreenStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1C1C1C',
    display: isLoading ? 'flex' : 'none', // Completely hide when not loading
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    transition: 'opacity 0.5s ease-out',
    opacity: isLoading ? 1 : 0,
    pointerEvents: isLoading ? 'all' : 'none',
    overflow: 'hidden',
    margin: 0,
    padding: 0
  };

  const contentStyles = {
    opacity: showContent ? 1 : 0,
    transition: 'opacity 0.5s ease-in',
    width: '100%',
    height: '100%',
    pointerEvents: showContent ? 'auto' : 'none' // Ensure content is interactive when shown
  };

  return (
    <>
      {/* Interactive 3D Loading Screen - Only render when loading */}
      {isLoading && !showTransition && (
        <div style={loadingScreenStyles}>
          <ClapperboardLoader3D 
            onAnimationComplete={handleClapperAnimationComplete}
          />
        </div>
      )}

      {/* Universal Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] hidden items-center justify-center bg-[#1C1C1C]"
        style={{
          background: 'linear-gradient(135deg, #1C1C1C 0%, #2B2B2B 50%, #1C1C1C 100%)'
        }}
      >
        {/* Curtain Elements - Cinematic Gray Base */}
        <div 
          ref={curtainLeftRef}
          className="absolute inset-0 z-[1]"
          style={{ 
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, #111111 0%, #1C1C1C 50%, #2B2B2B 100%)'
          }}
        />
        <div 
          ref={curtainRightRef}
          className="absolute inset-0 z-[1]"
          style={{ 
            transformOrigin: 'right center',
            background: 'linear-gradient(to left, #111111 0%, #1C1C1C 50%, #2B2B2B 100%)'
          }}
        />

        {/* Teal Glow Overlay for Cool Transitions */}
        <div 
          className="absolute inset-0 z-[2] opacity-40"
          style={{ 
            background: 'radial-gradient(circle at center, #00B2A9 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Orange Glow Overlay for Warm Transitions */}
        <div 
          className="absolute inset-0 z-[2] opacity-40"
          style={{ 
            background: 'radial-gradient(circle at center, #FF6B35 0%, transparent 70%)',
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Content Container with higher z-index */}
        <div className="text-center z-[100] relative">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase text-[#EAEAEA] mb-4 z-[101] relative"
            style={{
              fontFamily: '"Roboto Flex", sans-serif',
              fontWeight: 900,
            }}
          >
            LOADING
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase text-[#A0A0A0] mb-12 z-[101] relative"
            style={{
              fontFamily: '"Roboto Flex", sans-serif',
              fontWeight: 300,
            }}
          >
            EXPERIENCE
          </p>

          {/* Modern Progress Bar */}
          <div className="w-64 md:w-80 lg:w-96 mx-auto z-[101] relative">
            <div className="relative h-0.5 bg-[#3C3C3C] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#EAEAEA] via-[#FFFFFF] to-[#EAEAEA] rounded-full"
                style={{
                  transformOrigin: 'left center',
                  boxShadow: '0 0 20px rgba(234, 234, 234, 0.6)',
                }}
              />
            </div>
            
            {/* Minimal accent dots */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-1 h-1 bg-[#EAEAEA] rounded-full opacity-60" />
              <div className="w-1 h-1 bg-[#EAEAEA] rounded-full opacity-40" />
              <div className="w-1 h-1 bg-[#EAEAEA] rounded-full opacity-20" />
            </div>
          </div>
        </div>

        {/* Subtle grain overlay for film effect */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div ref={containerRef} style={contentStyles}>
        {children}
      </div>
    </>
  );
};

export default InitialLoadingScreen;