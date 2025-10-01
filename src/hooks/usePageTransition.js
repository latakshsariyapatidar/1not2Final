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

    // Add any global transition effects here
    const body = document.body;
    
    // Add a subtle camera shake effect for cinematic feel
    gsap.fromTo(body, 
      { 
        filter: 'blur(0px)',
        scale: 1 
      },
      { 
        filter: 'blur(2px)',
        scale: 1.002,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(body, { filter: 'blur(0px)', scale: 1 });
        }
      }
    );

  }, [location.pathname]);

  return location.pathname;
};

export default usePageTransition;