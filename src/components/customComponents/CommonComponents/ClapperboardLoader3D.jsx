import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ClapperboardModel Component
 * 
 * 3D Clapperboard model that plays hover animation by default
 * and clapping animation when clicked
 */
function ClapperboardModel({ onAnimationComplete, isClicked }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/3DModals/clapperBoard.glb');
  const { actions, mixer } = useAnimations(animations, group);
  
  // Remove hover state management to prevent accidental triggers
  // const [isHovering, setIsHovering] = useState(false);
  const hoverAnimationRef = useRef();
  const [scale, setScale] = useState(1);

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // Responsive scaling based on screen size
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      
      // Base scale factor
      let scaleFactor = 1;
      
      // Mobile devices (phones)
      if (width <= 480) {
        scaleFactor = 0.6; // Smaller for phones
      }
      // Tablets
      else if (width <= 768) {
        scaleFactor = 0.8; // Medium for tablets
      }
      // Small laptops/tablets in landscape
      else if (width <= 1024) {
        scaleFactor = 0.9;
      }
      // Desktop and larger
      else {
        scaleFactor = 1.0;
      }
      
      // Adjust for very wide screens
      if (aspectRatio > 2) {
        scaleFactor *= 1.2;
      }
      
      // Adjust for very tall screens (portrait mobile)
      if (aspectRatio < 0.7) {
        scaleFactor *= 0.8;
      }
      
      setScale(scaleFactor);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Handle animations
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Get available animation names
      const animationNames = Object.keys(actions);
      console.log('Available animations:', animationNames);
      
      if (isClicked) {
        // Stop hover animation and play clapping animation
        hoverAnimationRef.current = false;
        
        // Find and play the clapping animation
        const clappingAnimation = animationNames.find(name => 
          name.toLowerCase().includes('clap') || 
          name.toLowerCase().includes('action') ||
          name.toLowerCase().includes('anim') ||
          name.toLowerCase().includes('open') ||
          name.toLowerCase().includes('close')
        ) || animationNames[0];
        
        console.log('Playing animation:', clappingAnimation);
        
        if (actions[clappingAnimation]) {
          // Stop all other animations first
          Object.keys(actions).forEach(actionName => {
            if (actions[actionName]) {
              actions[actionName].stop();
            }
          });
          
          actions[clappingAnimation].reset();
          actions[clappingAnimation].setLoop(THREE.LoopOnce, 1);
          actions[clappingAnimation].clampWhenFinished = true;
          actions[clappingAnimation].play();
          
          // Listen for animation completion
          const onFinished = (event) => {
            if (event.action === actions[clappingAnimation]) {
              mixer.removeEventListener('finished', onFinished);
              setTimeout(() => {
                onAnimationComplete();
              }, 800); // Delay before transition
            }
          };
          mixer.addEventListener('finished', onFinished);
        } else {
          // If no animation found, complete after a short delay
          setTimeout(() => {
            onAnimationComplete();
          }, 1500);
        }
      } else {
        // Start hover animation (gentle floating)
        hoverAnimationRef.current = true;
      }
    } else {
      console.log('No animations found in the model');
      // If no animations at all, still allow interaction
      if (isClicked) {
        setTimeout(() => {
          onAnimationComplete();
        }, 1500);
      } else {
        hoverAnimationRef.current = true;
      }
    }
  }, [actions, mixer, isClicked, onAnimationComplete]);

  // Hover animation using useFrame
  useFrame((state) => {
    if (group.current && hoverAnimationRef.current && !isClicked) {
      // Gentle floating animation with more natural movement
      const time = state.clock.elapsedTime;
      group.current.position.y = Math.sin(time * 0.6) * 0.1;
      group.current.rotation.y = Math.sin(time * 0.4) * 0.08;
      group.current.rotation.x = Math.cos(time * 0.5) * 0.03;
      group.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <Center>
      <group 
        ref={group}
        position={[0, 0, 0]}
      >
        <primitive 
          object={clonedScene} 
          scale={[scale, scale, scale]}
          position={[0, 0, 0]}
          rotation={[0, -Math.PI/2, 0]}
        />
      </group>
    </Center>
  );
}

/**
 * Fallback Component for loading state
 */
function LoadingFallback() {
  const meshRef = useRef();
  const [scale, setScale] = useState(1);
  
  // Responsive scaling for fallback
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      let scaleFactor = width <= 480 ? 0.6 : width <= 768 ? 0.8 : 1.0;
      setScale(scaleFactor);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Center>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={[scale, scale, scale]}>
        <boxGeometry args={[2, 1.2, 0.3]} />
        <meshStandardMaterial 
          color="#5227FF" 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Center>
  );
}

/**
 * ClapperboardLoader3D Component
 * 
 * Interactive 3D clapperboard loader with hover and click animations
 */
const ClapperboardLoader3D = ({ onAnimationComplete }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canInteract, setCanInteract] = useState(false);
  const [cameraConfig, setCameraConfig] = useState({
    position: [0, 0, 4],
    fov: 60
  });

  // Responsive camera configuration
  useEffect(() => {
    const updateCamera = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      
      let position = [0, 0, 4];
      let fov = 60;
      
      // Mobile devices (phones)
      if (width <= 480) {
        position = [0, 0, 5]; // Move camera back
        fov = 70; // Wider field of view
      }
      // Tablets
      else if (width <= 768) {
        position = [0, 0, 4.5];
        fov = 65;
      }
      // Desktop
      else {
        position = [0, 0, 4];
        fov = 60;
      }
      
      // Adjust for aspect ratio
      if (aspectRatio < 0.7) { // Very tall screens (portrait mobile)
        position[2] += 1; // Move camera further back
        fov += 10;
      } else if (aspectRatio > 2) { // Very wide screens
        position[2] -= 0.5; // Move camera closer
        fov -= 5;
      }
      
      setCameraConfig({ position, fov });
    };

    updateCamera();
    window.addEventListener('resize', updateCamera);
    return () => window.removeEventListener('resize', updateCamera);
  }, []);

  // Allow interaction only after a brief delay to prevent accidental triggers
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanInteract(true);
    }, 1000); // 1 second delay before allowing interaction

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Only trigger if explicitly clicked, loaded, no error, and interaction is allowed
    if (!isClicked && isLoaded && !hasError && canInteract) {
      console.log('Clapperboard clicked intentionally, starting animation...');
      setIsClicked(true);
    } else if (!canInteract) {
      console.log('Click ignored - interaction not yet enabled');
    }
  };

  const handleAnimationComplete = () => {
    console.log('Clapperboard animation complete, transitioning...');
    onAnimationComplete();
  };

  const handleError = (error) => {
    console.error('Error loading 3D model:', error);
    setHasError(true);
    // Fallback: complete after a short delay
    setTimeout(() => {
      onAnimationComplete();
    }, 3000);
  };

  // Container styles
  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: (isClicked || hasError || !canInteract) ? 'default' : 'pointer',
    position: 'relative',
    background: 'transparent',
    zIndex: 1 // Lower z-index to avoid conflicts
  };

  const canvasStyles = {
    width: '100%',
    height: '100%',
    display: 'block',
    background: 'transparent'
  };

  const instructionStyles = {
    position: 'absolute',
    bottom: window.innerWidth <= 480 ? '15%' : window.innerWidth <= 768 ? '18%' : '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#EAEAEA',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
    fontFamily: '"Roboto Flex", sans-serif',
    fontWeight: '300',
    textAlign: 'center',
    opacity: 0.9,
    animation: 'fadeInOut 2.5s ease-in-out infinite',
    pointerEvents: 'none',
    letterSpacing: '0.15em',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
    textTransform: 'uppercase',
    zIndex: 10,
    padding: '0 1rem',
    maxWidth: '90vw'
  };

  const errorStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#EAEAEA',
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    fontFamily: '"Roboto Flex", sans-serif',
    fontWeight: '300',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: '1.6',
    letterSpacing: '0.1em'
  };

  if (hasError) {
    return (
      <div style={containerStyles} onClick={handleClick}>
        <div style={errorStyles}>
          LOADING CINEMATIC EXPERIENCE
          <br />
          <span style={{ fontSize: '0.7em', marginTop: '1.5rem', display: 'block', opacity: 0.6 }}>
            CLICK ANYWHERE TO CONTINUE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles} onClick={handleClick}>
      <Canvas
        style={canvasStyles}
        camera={{ 
          position: cameraConfig.position, 
          fov: cameraConfig.fov,
          near: 0.1,
          far: 1000
        }}
        onCreated={({ camera, gl, scene }) => {
          console.log('Canvas created successfully');
          // Ensure camera is looking at center
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
          
          // Set background to transparent
          gl.setClearColor('#1C1C1C', 1);
          scene.background = null;
          
          setIsLoaded(true);
        }}
        onError={handleError}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Enhanced Lighting setup for better model visibility */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[3, 5, 2]} 
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight 
          position={[-3, 3, -2]} 
          intensity={0.8}
        />
        <pointLight position={[0, 3, 3]} intensity={0.6} />
        <spotLight
          position={[0, 8, 0]}
          angle={0.4}
          penumbra={0.1}
          intensity={0.7}
          castShadow
        />
        
        {/* 3D Clapperboard Model with Suspense for loading */}
        <Suspense fallback={<LoadingFallback />}>
          <ClapperboardModel 
            onAnimationComplete={handleAnimationComplete}
            isClicked={isClicked}
          />
        </Suspense>
      </Canvas>
      
      {/* Click instruction - only show when ready for interaction */}
      {!isClicked && isLoaded && !hasError && canInteract && (
        <div style={instructionStyles}>
          CLICK TO ACTION
        </div>
      )}
      
      {/* Loading message when not ready for interaction */}
      {!isClicked && isLoaded && !hasError && !canInteract && (
        <div style={{...instructionStyles, opacity: 0.6}}>
          LOADING...
        </div>
      )}
    </div>
  );
};

// Preload the model
useGLTF.preload('/3DModals/clapperBoard.glb');

export default ClapperboardLoader3D;