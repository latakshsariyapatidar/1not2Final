import React, { Suspense, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  OrbitControls,
  useAnimations,
  Stars,
  Float,
} from "@react-three/drei";
import TextPressure from "../../outSourcedComponents/TextPressure";

// Use correct public asset path
const projectorUrl = "/3DModals/projector2_animated.glb";

// 3D Projector Component with section-based positioning
function ProjectorModel({ url, windowWidth, section2Ref }) {
  const meshRef = useRef();
  const baseRotation = useRef({ y: Math.PI / 1.1, x: -0.2, z: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll to update model position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load GLTF with error handling - hooks must be called unconditionally
  const { scene, animations, error } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  // Responsive scale calculation based on window width
  const getResponsiveScale = (width) => {
    if (width < 1024) return [0.6, 0.6, 0.6]; // Reduced scale
    if (width < 1280) return [0.8, 0.8, 0.8];
    if (width < 1536) return [1.0, 1.0, 1.0];
    if (width < 1920) return [1.2, 1.2, 1.2];
    return [1.4, 1.4, 1.4]; // Reduced max scale
  };

  // Calculate position based on section 2's position relative to viewport
  const getScrollBasedPosition = () => {
    if (!section2Ref.current) return [0, 0, 0];

    const rect = section2Ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how much of section 2 is visible
    const visibleTop = Math.max(0, -rect.top);
    const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibilityRatio = visibleHeight / rect.height;

    // Position model based on section 2's visibility
    if (rect.top > windowHeight) {
      // Section 2 is below viewport - hide model below
      return [0, -5, 0];
    } else if (rect.bottom < 0) {
      // Section 2 is above viewport - hide model above
      return [0, 5, 0];
    } else {
      // Section 2 is partially or fully visible
      // Center the model when section 2 is centered in viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const offsetFromCenter = (sectionCenter - viewportCenter) / windowHeight;

      // Move model opposite to section offset for fixed feeling
      const modelY = -offsetFromCenter * 2;

      console.log(
        `Section visibility: ${(visibilityRatio * 100).toFixed(
          1
        )}%, modelY: ${modelY.toFixed(2)}, scrollPos: ${scrollPosition}`
      );
      return [0, modelY, 0];
    }
  };

  // Play all animations when component mounts
  useEffect(() => {
    console.log(
      "ProjectorModel mounted, scene:",
      scene,
      "animations:",
      animations
    );
    if (actions && Object.keys(actions).length > 0) {
      try {
        console.log("Playing animations:", Object.keys(actions));
        Object.keys(actions).forEach((key) => {
          const action = actions[key];
          if (action) {
            action.reset();
            action.play();
            action.setLoop(2201, Infinity);
          }
        });
      } catch (error) {
        console.warn("Animation playback failed:", error);
      }
    }
  }, [actions, scene, animations]);

  // Handle loading errors or missing scene
  if (error) {
    console.error("Failed to load GLTF model:", error);
    return (
      <mesh ref={meshRef} position={getScrollBasedPosition()}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#FF0000" wireframe />
      </mesh>
    );
  }

  if (!scene) {
    // Fallback model while loading
    console.log("Scene not loaded yet, showing fallback");
    return (
      <mesh ref={meshRef} position={getScrollBasedPosition()}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#00FF00" wireframe />
      </mesh>
    );
  }

  console.log("Rendering 3D model successfully, scene:", scene);

  return (
    <Float
      speed={1.5} // Reduced speed
      rotationIntensity={0.05} // Reduced intensity
      floatIntensity={0.1} // Reduced intensity
      floatingRange={[0, 0.05]} // Reduced range
    >
      <primitive
        ref={meshRef}
        object={scene}
        scale={getResponsiveScale(windowWidth)}
        position={getScrollBasedPosition()}
        rotation={[
          baseRotation.current.x,
          baseRotation.current.y,
          baseRotation.current.z,
        ]}
        castShadow={false}
        receiveShadow={false}
      />
    </Float>
  );
}

// Loading fallback component
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5227FF]"></div>
    </div>
  );
}

// Preload the GLTF model
useGLTF.preload(projectorUrl);

const HomePage = () => {
  const canvasRef = useRef(null);
  return (
    <div className="w-full min-h-screen text-[#EAEAEA] relative">
      {/* Fixed 3D Canvas that follows scroll */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-30 pointer-events-none"
        ref={canvasRef}
      >
        <Canvas
          shadows={false} // Disable shadows to reduce GPU load
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: "transparent", pointerEvents: "auto" }}
          gl={{
            antialias: false, // Disable antialiasing to improve performance
            alpha: true,
            preserveDrawingBuffer: false,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          frameloop="always" // Always render for continuous visibility
        >
          <Environment preset="night" intensity={0.3} />

          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            color="#5227FF"
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={0.3}
            color="#FF9FFC"
          />

          {/* Minimal stars for better performance */}
          <Stars
            radius={150}
            depth={20}
            count={200} // Further reduced from 200 to 100
            factor={1.5} // Reduced factor
            saturation={0.1}
            fade={true}
            speed={0.2} // Reduced speed
          />
        </Canvas>
      </div>

      {/* Section 1: Hero Landing */}
      <section
        className="w-full h-screen relative z-10"

      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-transparent">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-[#000000] to-[#FF9FFC] rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float 10s infinite linear`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center h-full px-8 z-20">
          <div className="w-full max-w-4xl text-center p-10">
            <div className="mb-8">
              <TextPressure
                text="1 NOT 2"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#fff"
                strokeColor="#ff0000"
                baseFontSize={80}
                minFontSize={40}
                maxFontSize={120}
                responsiveMultiplier={1.2}
                breakpoints={{
                  sm: 0.6,
                  md: 0.8,
                  lg: 1.0,
                  xl: 1.3,
                }}
              />
            </div>

            <div className="mb-8">
              <TextPressure
                text="PRODUCTIONS"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#fff"
                strokeColor="#ff0000"
                baseFontSize={60}
                minFontSize={30}
                maxFontSize={90}
                responsiveMultiplier={1.0}
                breakpoints={{
                  sm: 0.5,
                  md: 0.7,
                  lg: 0.9,
                  xl: 1.1,
                }}
              />
            </div>

            <div className="w-32 h-0.5 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] mx-auto mb-8 opacity-60" />

            <p className="text-[#A0A0A0] text-xl font-light tracking-wider opacity-90 mb-8">
              Making Every Story - <span className="font-light italic underline underline-offset-4">The Story</span>
            </p>


          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
