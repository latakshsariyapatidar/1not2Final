import React, { Suspense, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  OrbitControls,
  useAnimations,
} from "@react-three/drei";

// Use correct public asset path
const projectorUrl = "/3DModals/projector2_animated.glb";

// 3D Projector Component with Enhanced Mouse Parallax
function ProjectorModel({ url }) {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);
  const meshRef = useRef();
  const baseRotation = useRef({ y: Math.PI / 1.1, x: -0.2, z: 0 });

  // Play all animations when component mounts
  useEffect(() => {
    if (actions) {
      console.log('Available animations:', Object.keys(actions));
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

  // Enhanced mouse parallax effect
  useFrame((state) => {
    if (meshRef.current) {
      // Get mouse position from R3F state (normalized between -1 and 1)
      const { mouse } = state;
      
      // Calculate target rotations based on mouse position
      const mouseInfluenceX = mouse.x * 0.15; // Horizontal mouse influence on Y rotation
      const mouseInfluenceY = mouse.y * 0.08; // Vertical mouse influence on X rotation
      
      // Target values
      const targetRotationY = baseRotation.current.y + mouseInfluenceX;
      const targetRotationX = baseRotation.current.x + mouseInfluenceY;
      const targetPositionX = mouse.x * 0.15; // Subtle horizontal movement
      const targetPositionY = -2.5 + mouse.y * 0.1; // Subtle vertical movement
      
      // Smooth interpolation for natural movement
      const dampingFactor = 0.08;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * dampingFactor;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * dampingFactor;
      meshRef.current.position.x += (targetPositionX - meshRef.current.position.x) * dampingFactor;
      meshRef.current.position.y += (targetPositionY - meshRef.current.position.y) * dampingFactor;
      
      // Keep Z position fixed
      meshRef.current.position.z = 0;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[2, 2, 2]}
      position={[0, -2.5, 0]}
      rotation={[baseRotation.current.x, baseRotation.current.y, baseRotation.current.z]}
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
useGLTF.preload(projectorUrl);

const HomePage = () => {
  return (
    <div className="w-full min-h-[100dvh] p-8 pt-20 text-[#EAEAEA] overflow-y-auto relative">
      {/* 3D Model - Fixed on right side - Only visible on laptop and larger screens */}
      <div className="hidden lg:block absolute top-0 left-0 w-1/2 h-screen z-0">
        <Canvas
          camera={{
            position: [5, 2.5, 5],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          style={{ background: "transparent" }}
          onPointerMove={(e) => {
            // Ensure mouse events are captured for parallax
            e.stopPropagation();
          }}
        >
          {/* Lighting Setup */}
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* Environment for reflections */}
          <Environment preset="dawn" />

          {/* 3D Model */}
          <Suspense fallback={null}>
            <ProjectorModel url={projectorUrl} />
          </Suspense>

          {/* Remove OrbitControls to prevent interference with mouse tracking */}
        </Canvas>
      </div>

      {/* Content - Right side to avoid interfering with 3D model mouse tracking */}
      <div className="relative z-10 w-full h-full">
        <div className="w-full h-full lg:w-1/2 lg:ml-auto lg:pl-8">
          {/* Add some interactive content here for testing */}
          <h1 className="text-4xl font-bold mb-4 cursor-pointer hover:text-[#00B2A9] transition-colors">
            Welcome to 1NOT2 Production
          </h1>
          <p className="text-lg mb-6 cursor-pointer hover:text-[#00B2A9] transition-colors">
            Move your mouse over the left side to see the projector parallax effect
          </p>
        
          
          {/* Invisible overlay to ensure mouse tracking works across the entire left side */}
          <div className="hidden lg:block fixed top-0 left-0 w-1/2 h-screen pointer-events-none z-20" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
