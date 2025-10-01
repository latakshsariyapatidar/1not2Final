import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export const usePageTransition = () => {
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip transition on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Minimal global effects for smooth page changes
    const body = document.body;
    
    // Add a subtle film grain and contrast adjustment for cinematic feel
    gsap.timeline()
      .to(body, {
        filter: 'contrast(1.1) brightness(0.95)',
        duration: 0.1,
        ease: "power1.inOut"
      })
      .to(body, {
        filter: 'contrast(1) brightness(1)',
        duration: 0.2,
        ease: "power1.out"
      });

    // Add a subtle camera movement effect
    gsap.fromTo('.page-content', 
      { 
        y: 0,
        scale: 1 
      },
      { 
        y: 2,
        scale: 1.001,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      }
    );

  }, [location.pathname]);

  return location.pathname;
};

export default usePageTransition;