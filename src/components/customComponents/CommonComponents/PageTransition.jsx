import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const dotRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const prevLocation = useRef(location.pathname);

  const getPageTitle = useCallback((pathname) => {
    const titles = {
      "/": "HOME",
      "/about": "ABOUT",
      "/services": "SERVICES",
      "/contact": "CONTACT",
    };
    return titles[pathname] || "PAGE";
  }, []);

  const performTransition = useCallback(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const dot = dotRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;

    if (!container || !overlay || !title || !dot || !leftLine || !rightLine) return;

    // Get page title based on pathname
    const pageTitle = getPageTitle(location.pathname);
    title.textContent = pageTitle;

    // Create cinematic transition timeline
    const tl = gsap.timeline();

    // Fade out current content
    tl.to(container, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut",
    })

      // Show cinematic overlay with title
      .set(overlay, { display: "flex" })
      .fromTo(
        overlay,
        {
          opacity: 0,
          background:
            "linear-gradient(45deg, #1C1C1C 0%, #2B2B2B 50%, #1C1C1C 100%)",
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        }
      )

      // Animate title with film-like effect
      .fromTo(
        title,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )

      // Animate center dot first
      .fromTo(
        dot,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(2)",
        },
        "-=0.3"
      )

      // Animate lines extending from center
      .fromTo(
        [leftLine, rightLine],
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 0.7,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.000,
        },
        "-=0.1"
      )

      // Hold for dramatic effect
      .to({}, { duration: 0.5 })

      // Fade out divider elements
      .to([dot, leftLine, rightLine], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      })

      // Fade out title
      .to(title, {
        y: -30,
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.in",
      }, "-=0.1")

      // Hide overlay with cinematic wipe
      .to(overlay, {
        opacity: 0,
        background:
          "linear-gradient(45deg, #1C1C1C 0%, #2B2B2B 50%, #3C3C3C 100%)",
        duration: 0.5,
        ease: "power2.inOut",
      })
      .set(overlay, { display: "none" })

      // Fade in new content
      .fromTo(
        container,
        {
          opacity: 0,
          scale: 1.05,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }, [location.pathname, getPageTitle]);

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      performTransition();
      prevLocation.current = location.pathname;
    }
  }, [location.pathname, performTransition]);

  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* Page Content */}
      <div ref={containerRef} className="w-full h-full">
        {children}
      </div>

      {/* Cinematic Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] hidden items-center justify-center"
      >
        <div className="text-center">
          <h1
            ref={titleRef}
            className="relative text-6xl md:text-8xl font-extrabold tracking-[0.25em] uppercase text-[#EAEAEA] drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]"
            style={{
              fontFamily: '"Roboto Flex", sans-serif',
              letterSpacing: "0.25em",
            }}
          >
            <span className="relative inline-block before:absolute before:-inset-1 before:bg-gradient-to-r before:from-[#00B2A9] before:via-[#A0A0A0] before:to-[#00B2A9] before:blur-lg before:opacity-40 before:-z-10">
              PAGE
            </span>
          </h1>

          {/* Cinematic Divider */}
          <div className="mt-8 flex justify-center items-center space-x-3">
            <div 
              ref={leftLineRef}
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EAEAEA] to-transparent opacity-70"
              style={{ transformOrigin: 'right center' }}
            ></div>
            <div 
              ref={dotRef}
              className="w-2 h-2 bg-[#00B2A9] rounded-full shadow-[0_0_10px_rgba(0,178,169,0.8)]"
            ></div>
            <div 
              ref={rightLineRef}
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EAEAEA] to-transparent opacity-70"
              style={{ transformOrigin: 'left center' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
