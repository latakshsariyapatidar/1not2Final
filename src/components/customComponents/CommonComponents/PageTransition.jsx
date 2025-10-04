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
  const progressFillRef = useRef(null);
  const waveContainer1Ref = useRef(null);
  const waveContainer2Ref = useRef(null);
  const waveContainer3Ref = useRef(null);
  const filmGrainRef = useRef(null);
  const glowOrbRef = useRef(null);
  const hexGridRef = useRef(null);
  const prevLocation = useRef(null);

  const getPageInfo = useCallback((pathname) => {
    const pages = {
      "/": { title: "HOME", subtitle: "CREATIVE VISION" },
      "/about": { title: "ABOUT", subtitle: "OUR STORY" },
      "/works": { title: "WORKS", subtitle: "PORTFOLIO" },
      "/teams": { title: "TEAM", subtitle: "MEET OUR CREW" },
      "/contact": { title: "CONTACT", subtitle: "LET'S CONNECT" },
    };
    return pages[pathname] || { title: "PAGE", subtitle: "LOADING" };
  }, []);

  const performTransition = useCallback(() => {
    console.log('performTransition called for:', location.pathname);
    
    // Kill any existing animations first
    gsap.killTweensOf([
      containerRef.current, overlayRef.current, titleRef.current, 
      subtitleRef.current, progressBarRef.current, progressFillRef.current,
      waveContainer1Ref.current, waveContainer2Ref.current, waveContainer3Ref.current,
      filmGrainRef.current, glowOrbRef.current, hexGridRef.current
    ]);
    
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const progressBar = progressBarRef.current;
    const progressFill = progressFillRef.current;
    const wave1 = waveContainer1Ref.current;
    const wave2 = waveContainer2Ref.current;
    const wave3 = waveContainer3Ref.current;
    const filmGrain = filmGrainRef.current;
    const glowOrb = glowOrbRef.current;
    const hexGrid = hexGridRef.current;

    if (!container || !overlay || !title || !subtitle || !progressBar) {
      console.log('Missing essential refs');
      return;
    }

    console.log('All refs found, starting cinematic transition');

    // Get page info
    const { title: pageTitle, subtitle: pageSubtitle } = getPageInfo(location.pathname);
    title.textContent = pageTitle;
    subtitle.textContent = pageSubtitle;

    // Reset all elements
    gsap.set(overlay, { display: 'flex', opacity: 1 });
    gsap.set([wave1, wave2, wave3], { 
      scaleY: 0, 
      transformOrigin: 'bottom center',
      opacity: 0.8 
    });
    gsap.set([title, subtitle], { 
      opacity: 0, 
      y: 100,
      rotationX: -45,
      transformOrigin: 'center center'
    });
    gsap.set(progressBar, { 
      opacity: 0,
      scaleX: 0,
      transformOrigin: 'left center'
    });
    gsap.set(progressFill, { 
      width: '0%'
    });
    gsap.set(filmGrain, { opacity: 0 });
    gsap.set(glowOrb, { 
      scale: 0,
      opacity: 0,
      x: '-50%',
      y: '-50%'
    });
    gsap.set(hexGrid, { 
      opacity: 0,
      rotationZ: 0,
      scale: 0.8
    });

    // Create cinematic timeline
    const tl = gsap.timeline({
      onStart: () => console.log('Cinematic transition started'),
      onComplete: () => console.log('Cinematic transition completed')
    });

    // Phase 1: Content fade out with perspective
    tl.to(container, {
      opacity: 0,
      scale: 0.9,
      rotationY: 5,
      filter: "blur(8px) brightness(0.6)",
      duration: 0.6,
      ease: "power2.out",
    })

    // Phase 2: Hex grid entrance
    .to(hexGrid, {
      opacity: 0.3,
      scale: 1,
      rotationZ: 360,
      duration: 1.2,
      ease: "power2.out",
    }, "-=0.3")

    // Phase 3: Wave cascade entrance
    .to(wave1, {
      scaleY: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.8")
    .to(wave2, {
      scaleY: 1,
      duration: 0.9,
      ease: "power3.out",
    }, "-=0.6")
    .to(wave3, {
      scaleY: 1,
      duration: 1.0,
      ease: "power3.out",
    }, "-=0.7")

    // Phase 4: Glow orb expansion
    .to(glowOrb, {
      scale: 1,
      opacity: 0.8,
      duration: 1.0,
      ease: "back.out(1.7)",
    }, "-=1.0")

    // Phase 5: Film grain and atmosphere
    .to(filmGrain, {
      opacity: 0.15,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.8")

    // Phase 6: Title entrance with 3D effect
    .to(title, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.0,
      ease: "back.out(1.2)",
    }, "-=0.6")

    // Phase 7: Subtitle entrance
    .to(subtitle, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")

    // Phase 9: Progress bar entrance
    .to(progressBar, {
      opacity: 1,
      scaleX: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2")

    // Phase 10: Progress fill animation
    .to(progressFill, {
      width: '100%',
      duration: 1.2,
      ease: "power2.inOut",
    }, "-=0.1")

    // Phase 11: Hold moment
    .to({}, { duration: 0.4 })

    // Phase 12: Exit sequence - orb implosion
    .to(glowOrb, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })

    // Phase 13: Text exit with 3D flip
    .to([title, subtitle], {
      opacity: 0,
      y: -80,
      rotationX: 45,
      duration: 0.5,
      ease: "power2.in",
      stagger: 0.1,
    }, "-=0.2")

    // Phase 14: Progress bar exit
    .to(progressBar, {
      opacity: 0,
      scaleY: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.3")

    // Phase 15: Wave cascade exit
    .to([wave3, wave2, wave1], {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.6,
      ease: "power3.in",
      stagger: 0.1,
    }, "-=0.2")

    // Phase 16: Hex grid exit
    .to(hexGrid, {
      opacity: 0,
      scale: 1.2,
      rotationZ: 720,
      duration: 0.8,
      ease: "power2.in",
    }, "-=0.4")

    // Phase 17: Film grain fade
    .to(filmGrain, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.3")

    // Phase 18: Overlay exit
    .to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.2")
    .set(overlay, { display: "none" })

    // Phase 19: Content entrance with cinematic reveal
    .fromTo(container, {
      opacity: 0,
      scale: 1.1,
      rotationY: -5,
      filter: "blur(4px) brightness(1.2)",
    }, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      filter: "blur(0px) brightness(1)",
      duration: 1.0,
      ease: "power2.out",
    }, "-=0.6");

  }, [location.pathname, getPageInfo]);

  useEffect(() => {
    console.log('Location changed from', prevLocation.current, 'to', location.pathname);
    
    if (prevLocation.current !== location.pathname && prevLocation.current !== null) {
      console.log('Triggering page transition');
      performTransition();
      prevLocation.current = location.pathname;
    } else if (prevLocation.current === null) {
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

      {/* Cinematic Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] hidden items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #0F0F23 0%, #000000 70%)'
        }}
      >
        {/* Hexagonal Grid Background */}
        <div 
          ref={hexGridRef}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235227FF' fill-opacity='0.1'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Wave Containers */}
        <div 
          ref={waveContainer1Ref}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(82, 39, 255, 0.1) 0%, transparent 70%)',
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
          }}
        />
        <div 
          ref={waveContainer2Ref}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, rgba(255, 159, 252, 0.08) 0%, transparent 70%)',
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
          }}
        />
        <div 
          ref={waveContainer3Ref}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(177, 158, 239, 0.06) 0%, transparent 50%)',
            clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)'
          }}
        />

        {/* Central Glow Orb */}
        <div 
          ref={glowOrbRef}
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(82, 39, 255, 0.3) 0%, rgba(255, 159, 252, 0.2) 40%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Film Grain Texture */}
        <div 
          ref={filmGrainRef}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Content Container */}
        <div className="text-center z-50 relative px-8">
          {/* Main Title with Enhanced Typography */}
          <h1
            ref={titleRef}
            className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-wider uppercase text-transparent bg-clip-text mb-6"
            style={{
              fontFamily: '"Inter", "Roboto Flex", sans-serif',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #5227FF 30%, #FF9FFC 70%, #B19EEF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              letterSpacing: '0.1em'
            }}
          >
            PAGE
          </h1>

          {/* Subtitle with Cinematic Styling */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.4em] uppercase text-gray-300 mb-16"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              opacity: 0.9
            }}
          >
            LOADING
          </p>

          {/* Enhanced Progress Bar Container */}
          <div className="w-80 md:w-96 lg:w-[32rem] mx-auto">
            <div 
              ref={progressBarRef}
              className="relative h-1 bg-gray-800 rounded-full overflow-hidden backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Progress Fill with Gradient */}
              <div
                ref={progressFillRef}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #5227FF 0%, #FF9FFC 50%, #B19EEF 100%)',
                  boxShadow: '0 0 20px rgba(82, 39, 255, 0.8), 0 0 40px rgba(255, 159, 252, 0.6)',
                  width: '0%'
                }}
              />
              
              {/* Animated shine effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  animation: 'shine 2s ease-in-out infinite'
                }}
              />
            </div>
            
            {/* Progress indicators */}
            <div className="flex justify-between mt-6">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, #5227FF, #FF9FFC)`,
                    opacity: 0.6,
                    animation: `pulse ${1.5 + i * 0.3}s infinite alternate ease-in-out`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ambient Light Effects */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
          style={{
            background: 'conic-gradient(from 45deg, rgba(82, 39, 255, 0.1) 0deg, rgba(255, 159, 252, 0.1) 120deg, rgba(177, 158, 239, 0.1) 240deg, rgba(82, 39, 255, 0.1) 360deg)',
            animation: 'rotate 20s linear infinite'
          }}
        />

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PageTransition;
