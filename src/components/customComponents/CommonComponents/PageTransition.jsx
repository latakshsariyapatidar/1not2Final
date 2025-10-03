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
  const filmStripRef = useRef(null);
  const scanLineRef = useRef(null);
  const particlesRef = useRef(null);
  const prevLocation = useRef(null); // Start with null instead of current location

  const getPageInfo = useCallback((pathname) => {
    const pages = {
      "/": { title: "HOME", subtitle: "CREATIVE VISION" },
      "/about": { title: "ABOUT", subtitle: "OUR STORY" },
      "/works": { title: "WORKS", subtitle: "WHAT WE HAVE DONE" },
      "/contact": { title: "CONTACT", subtitle: "LET'S CONNECT" },
    };
    return pages[pathname] || { title: "PAGE", subtitle: "LOADING" };
  }, []);

  const performTransition = useCallback(() => {
    console.log('performTransition called for:', location.pathname);
    
    // Kill any existing animations first
    gsap.killTweensOf([containerRef.current, overlayRef.current, titleRef.current, subtitleRef.current, progressBarRef.current, curtainLeftRef.current, curtainRightRef.current, filmStripRef.current, scanLineRef.current, particlesRef.current]);
    
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const progressBar = progressBarRef.current;
    const curtainLeft = curtainLeftRef.current;
    const curtainRight = curtainRightRef.current;
    const filmStrip = filmStripRef.current;
    const scanLine = scanLineRef.current;
    const particles = particlesRef.current;

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
    gsap.set([filmStrip, scanLine, particles], { 
      opacity: 0,
      clearProps: "transform,filter" 
    });

    // Create enhanced cinematic transition timeline
    const tl = gsap.timeline({
      onStart: () => console.log('Transition animation started'),
      onComplete: () => console.log('Transition animation completed')
    });

    // Phase 1: Screen distortion effect
    tl.to(container, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(3px) brightness(0.8) contrast(1.2)",
      duration: 0.4,
      ease: "power2.out",
    })

    // Phase 2: Film strip entrance
    .fromTo(filmStrip, {
      x: "-100%",
      opacity: 0,
    }, {
      x: "0%",
      opacity: 0.8,
      duration: 0.5,
      ease: "power3.out",
    }, "+=0.1")

    // Phase 3: Curtain slide in effect with enhanced timing
    .fromTo(curtainLeft, {
      scaleX: 0,
      transformOrigin: 'left center'
    }, {
      scaleX: 1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3")
    .fromTo(curtainRight, {
      scaleX: 0,
      transformOrigin: 'right center'
    }, {
      scaleX: 1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.4")

    // Phase 4: Scan line effect
    .fromTo(scanLine, {
      x: "-100%",
      opacity: 0,
    }, {
      x: "100%",
      opacity: 1,
      duration: 0.8,
      ease: "none",
    }, "-=0.2")

    // Phase 5: Particles entrance
    .fromTo(particles, {
      opacity: 0,
      scale: 0,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.4")

    // Phase 6: Enhanced title entrance with glitch effect
    .fromTo(title, {
      y: 80,
      opacity: 0,
      letterSpacing: "0.8em",
      filter: "blur(15px) brightness(0.5)",
      scaleY: 0.8,
    }, {
      y: 0,
      opacity: 1,
      letterSpacing: "0.15em",
      filter: "blur(0px) brightness(1)",
      scaleY: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3")

    // Phase 7: Glitch effect on title
    .to(title, {
      x: "+=3",
      duration: 0.1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 3,
    }, "-=0.2")

    // Phase 8: Subtitle with typewriter effect
    .fromTo(subtitle, {
      y: 40,
      opacity: 0,
      filter: "blur(5px)",
    }, {
      y: 0,
      opacity: 0.9,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")

    // Phase 9: Enhanced progress bar with pulsing effect
    .fromTo(progressBar, {
      scaleX: 0,
      opacity: 0,
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.3")

    // Phase 10: Progress bar pulse
    .to(progressBar, {
      boxShadow: "0 0 30px rgba(234, 234, 234, 0.8)",
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    }, "-=0.2")

    // Phase 11: Hold for dramatic effect
    .to({}, { duration: 0.6 })

    // Phase 12: Exit sequence with enhanced effects
    .to(particles, {
      opacity: 0,
      scale: 1.5,
      duration: 0.4,
      ease: "power2.in",
    })
    .to([title, subtitle], {
      y: -60,
      opacity: 0,
      filter: "blur(8px) brightness(1.5)",
      duration: 0.5,
      ease: "power2.in",
      stagger: 0.1,
    }, "-=0.2")

    // Phase 13: Progress bar dramatic exit
    .to(progressBar, {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.3")

    // Phase 14: Scan line exit
    .to(scanLine, {
      x: "200%",
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, "-=0.2")

    // Phase 15: Film strip exit
    .to(filmStrip, {
      x: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    }, "-=0.3")

    // Phase 16: Curtain slide out with stagger
    .to([curtainLeft, curtainRight], {
      x: "-100%",
      duration: 0.6,
      ease: "power3.in",
      stagger: 0.08,
    }, "-=0.2")

    // Phase 17: Hide overlay
    .to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.2")
    .set(overlay, { display: "none" })

    // Phase 18: Enhanced content entrance
    .fromTo(container, {
      opacity: 0,
      scale: 1.05,
      filter: "blur(2px) brightness(1.2)",
    }, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.4");

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

      {/* Enhanced Cinematic Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] hidden items-center justify-center bg-[#1C1C1C] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1C1C1C 25%, #2B2B2B 50%, #1C1C1C 75%, #0a0a0a 100%)'
        }}
      >
        {/* Animated Film Strip */}
        <div 
          ref={filmStripRef}
          className="absolute left-0 top-0 w-16 h-full z-[1] opacity-60"
          style={{ 
            background: 'repeating-linear-gradient(0deg, #000 0px, #000 20px, transparent 20px, transparent 40px)',
            borderRight: '4px solid #333'
          }}
        />

        {/* Scan Line Effect */}
        <div 
          ref={scanLineRef}
          className="absolute top-0 w-1 h-full z-[10] opacity-80"
          style={{ 
            background: 'linear-gradient(to bottom, transparent 0%, #5227FF 20%, #FF9FFC  50%, #B19EEF  80%, transparent 100%)',
            boxShadow: '0 0 20px #5227FF, 0 0 40px #FF9FFC'
          }}
        />

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0 z-[3] pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, #5227FF, #FF9FFC, #B19EEF)`,
                animation: `particle-float-${i % 4} ${6 + (i % 3)}s infinite linear`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Curtain Elements */}
        <div 
          ref={curtainLeftRef}
          className="absolute inset-0 z-[4]"
          style={{ 
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, #000000 0%, #111111 20%, #1C1C1C 50%, #2B2B2B 80%, #1C1C1C 100%)',
            boxShadow: 'inset -20px 0 40px rgba(82, 39, 255, 0.1)'
          }}
        />
        <div 
          ref={curtainRightRef}
          className="absolute inset-0 z-[4]"
          style={{ 
            transformOrigin: 'right center',
            background: 'linear-gradient(to left, #000000 0%, #111111 20%, #1C1C1C 50%, #2B2B2B 80%, #1C1C1C 100%)',
            boxShadow: 'inset 20px 0 40px rgba(255, 159, 252, 0.1)'
          }}
        />

        {/* Multi-layered Glow Effects */}
        <div 
          className="absolute inset-0 z-[5] opacity-30"
          style={{ 
            background: 'radial-gradient(ellipse at 30% 50%, #5227FF 0%, transparent 50%)',
            pointerEvents: 'none'
          }}
        />
        <div 
          className="absolute inset-0 z-[5] opacity-30"
          style={{ 
            background: 'radial-gradient(ellipse at 70% 50%, #FF9FFC 0%, transparent 50%)',
            pointerEvents: 'none',
            mixBlendMode: 'screen'
          }}
        />
        <div 
          className="absolute inset-0 z-[5] opacity-20"
          style={{ 
            background: 'radial-gradient(circle at center, #B19EEF 0%, transparent 60%)',
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 z-[2] opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(82, 39, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 159, 252, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 10s linear infinite'
          }}
        />

        {/* Content Container */}
        <div className="text-center z-[100] relative">
          {/* Enhanced Main Title */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase text-[#EAEAEA] mb-4 z-[101] relative"
            style={{
              fontFamily: '"Roboto Flex", sans-serif',
              fontWeight: 900,
              textShadow: '0 0 20px rgba(82, 39, 255, 0.5), 0 0 40px rgba(255, 159, 252, 0.3)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
            }}
          >
            PAGE
          </h1>

          {/* Enhanced Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase text-[#A0A0A0] mb-12 z-[101] relative"
            style={{
              fontFamily: '"Roboto Flex", sans-serif',
              fontWeight: 300,
              textShadow: '0 0 10px rgba(255, 159, 252, 0.3)',
            }}
          >
            LOADING
          </p>

          {/* Enhanced Progress Bar */}
          <div className="w-64 md:w-80 lg:w-96 mx-auto z-[101] relative">
            <div className="relative h-1 bg-[#2C2C2C] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  transformOrigin: 'left center',
                  background: 'linear-gradient(90deg, #5227FF 0%, #FF9FFC 50%, #B19EEF 100%)',
                  boxShadow: '0 0 20px rgba(82, 39, 255, 0.6), 0 0 40px rgba(255, 159, 252, 0.4)',
                }}
              />
              {/* Progress bar glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
            </div>
            
            {/* Enhanced accent indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, #5227FF, #FF9FFC)`,
                    opacity: 0.6 - (i * 0.1),
                    animation: `pulse ${1 + i * 0.2}s infinite alternate`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Film Grain */}
        <div 
          className="absolute inset-0 opacity-8 pointer-events-none z-[6]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            animation: 'noise 0.2s infinite'
          }}
        />

        {/* Vignette Effect */}
        <div 
          className="absolute inset-0 z-[7] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)'
          }}
        />

        {/* Custom CSS Animations */}
        <style jsx>{`
          @keyframes particle-float-0 {
            from { transform: translate(0, 100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { transform: translate(20px, -100px) rotate(360deg); opacity: 0; }
          }
          @keyframes particle-float-1 {
            from { transform: translate(0, 100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { transform: translate(-30px, -100px) rotate(-360deg); opacity: 0; }
          }
          @keyframes particle-float-2 {
            from { transform: translate(0, 100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { transform: translate(10px, -100px) rotate(180deg); opacity: 0; }
          }
          @keyframes particle-float-3 {
            from { transform: translate(0, 100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { transform: translate(-15px, -100px) rotate(-180deg); opacity: 0; }
          }
          @keyframes grid-move {
            from { transform: translate(0, 0); }
            to { transform: translate(50px, 50px); }
          }
          @keyframes noise {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-1px, -1px); }
            20% { transform: translate(1px, 1px); }
            30% { transform: translate(-1px, 1px); }
            40% { transform: translate(1px, -1px); }
            50% { transform: translate(-1px, -1px); }
            60% { transform: translate(1px, 1px); }
            70% { transform: translate(-1px, 1px); }
            80% { transform: translate(1px, -1px); }
            90% { transform: translate(-1px, -1px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PageTransition;
