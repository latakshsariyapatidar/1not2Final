import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressBarRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const prevLocation = useRef(null); // Start with null instead of current location

  const getPageInfo = useCallback((pathname) => {
    const pages = {
      "/": { title: "HOME", subtitle: "CREATIVE VISION" },
      "/about": { title: "ABOUT", subtitle: "OUR STORY" },
      "/services": { title: "SERVICES", subtitle: "WHAT WE DO" },
      "/contact": { title: "CONTACT", subtitle: "LET'S CONNECT" },
    };
    return pages[pathname] || { title: "PAGE", subtitle: "LOADING" };
  }, []);

  const performTransition = useCallback(() => {
    console.log('performTransition called for:', location.pathname);
    
    // Kill any existing animations first
    gsap.killTweensOf([containerRef.current, overlayRef.current, titleRef.current, subtitleRef.current, progressBarRef.current, curtainLeftRef.current, curtainRightRef.current]);
    
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const progressBar = progressBarRef.current;
    const curtainLeft = curtainLeftRef.current;
    const curtainRight = curtainRightRef.current;

    if (!container || !overlay || !title || !subtitle || !progressBar || !curtainLeft || !curtainRight) {
      console.log('Missing refs:', {
        container: !!container,
        overlay: !!overlay,
        title: !!title,
        subtitle: !!subtitle,
        progressBar: !!progressBar,
        curtainLeft: !!curtainLeft,
        curtainRight: !!curtainRight
      });
      return;
    }

    console.log('All refs found, starting transition animation');

    // Get page info based on pathname
    const { title: pageTitle, subtitle: pageSubtitle } = getPageInfo(location.pathname);
    title.textContent = pageTitle;
    subtitle.textContent = pageSubtitle;

    console.log('Page info:', { title: pageTitle, subtitle: pageSubtitle });

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

    // Create modern cinematic transition timeline
    const tl = gsap.timeline({
      onStart: () => console.log('Transition animation started'),
      onComplete: () => console.log('Transition animation completed')
    });

    // Phase 1: Fade out current content quickly
    tl.to(container, {
      opacity: 0,
      scale: 0.98,
      filter: "blur(2px)",
      duration: 0.3,
      ease: "power2.out",
    })

    // Phase 2: Curtain slide in effect - both curtains properly
    .fromTo(curtainLeft, {
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

    // Phase 3: Title entrance with modern typography effect
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

    // Phase 4: Subtitle slide up
    .fromTo(subtitle, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 0.8,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3")

    // Phase 5: Progress bar animation
    .fromTo(progressBar, {
      scaleX: 0,
      opacity: 0,
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2")

    // Phase 6: Hold for effect
    .to({}, { duration: 0.4 })

    // Phase 7: Exit animation - text first
    .to([title, subtitle], {
      y: -40,
      opacity: 0,
      filter: "blur(5px)",
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.1,
    })

    // Phase 8: Progress bar exit
    .to(progressBar, {
      scaleX: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.2")

    // Phase 9: Curtain slide out - both slide to left
    .to([curtainLeft, curtainRight], {
      x: "-100%",
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.05,
    }, "-=0.1")

    // Phase 10: Hide overlay
    .to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    }, "-=0.1")
    .set(overlay, { display: "none" })

    // Phase 11: Fade in new content with slight zoom
    .fromTo(container, {
      opacity: 0,
      scale: 1.02,
      filter: "blur(1px)",
    }, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3");

  }, [location.pathname, getPageInfo]);

  useEffect(() => {
    console.log('Location changed from', prevLocation.current, 'to', location.pathname);
    
    if (prevLocation.current !== location.pathname && prevLocation.current !== null) {
      console.log('Triggering page transition');
      performTransition();
      prevLocation.current = location.pathname;
    } else if (prevLocation.current === null) {
      // First load, just set the location without transition
      prevLocation.current = location.pathname;
      console.log('Initial page load, no transition');
    }
  }, [location.pathname, performTransition]);

  return (
    <div className="relative w-full h-full">
      {/* Page Content */}
      <div ref={containerRef} className="w-full h-full">
        {children}
      </div>

      {/* Modern Cinematic Transition Overlay */}
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

        {/* Purple Glow Overlay for Cool Transitions */}
        <div 
          className="absolute inset-0 z-[2] opacity-40"
          style={{ 
            background: 'radial-gradient(circle at center, #5227FF 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Pink Glow Overlay for Warm Transitions */}
        <div 
          className="absolute inset-0 z-[2] opacity-40"
          style={{ 
            background: 'radial-gradient(circle at center, #FF9FFC 0%, transparent 70%)',
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
            PAGE
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
            LOADING
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
    </div>
  );
};

export default PageTransition;
