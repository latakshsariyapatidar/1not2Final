import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  OrbitControls,
  useAnimations,
} from "@react-three/drei";
import projector from "../../../../public/3DModals/projector2_animated.glb";

// 3D Projector Component
function ProjectorModel({ url }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);
  const meshRef = useRef();

  // Play all animations when component mounts
  useEffect(() => {
    if (actions) {
      // Play all available animations
      Object.keys(actions).forEach((key) => {
        const action = actions[key];
        if (action) {
          action.reset();
          action.play();
          action.setLoop(2201, Infinity); // Loop indefinitely
        }
      });
    }
  }, [actions]);

  // Auto-rotation animation (optional - can be disabled if model has enough animation)

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[2, 2, -2]}
      position={[0, -2.3, 0]}
      rotation={[0, Math.PI / 1.1, 0]}
    />
  );
}

// Loading fallback component
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00B2A9]"></div>
    </div>
  );
}

// Preload the GLTF model
useGLTF.preload(projector);

const HomePage = () => {
  return (
    <div className="w-full min-h-[100dvh] p-8 pt-20 text-[#EAEAEA] overflow-y-auto relative">
      {/* 3D Model - Fixed on right side - Only visible on laptop and larger screens */}
      <div className="hidden lg:block fixed top-0 right-0 w-1/2 h-screen z-0 pointer-events-none">
        <Canvas
          camera={{
            position: [5, 2, 5],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          style={{ background: "transparent" }}
        >
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          {/* <pointLight position={[-10, -10, -10]} intensity={0.5} /> */}
          {/* <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
          /> */}

          {/* Environment for reflections */}
          <Environment preset="lobby" />

          {/* 3D Model */}
          <Suspense fallback={null}>
            <ProjectorModel url={projector} />
          </Suspense>

          {/* Disable controls but allow auto-rotation */}
        </Canvas>
      </div>

      {/* Content - Left side with text overlay on model */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[80vh] items-center">
          {/* Text content - Full width on mobile, left side on desktop */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-center lg:text-left">
              Welcome to Our
              <span className="block text-[#00B2A9]">Production House</span>
            </h1>
            <p className="text-lg md:text-xl text-[#A0A0A0] leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              Where stories come to life through cinematic excellence and
              cutting-edge visual storytelling.
            </p>
            <div className="flex items-center space-x-4 justify-center lg:justify-start">
              <div className="w-16 h-0.5 bg-[#00B2A9] opacity-80"></div>
              <span className="text-sm text-[#A0A0A0] uppercase tracking-wider">
                Cinematic Excellence
              </span>
            </div>
          </div>

          {/* Right side - Space for 3D model (invisible spacer) */}
          <div className="hidden lg:block"></div>
        </div>        
      </div>
    </div>
  );
};

export default HomePage;