"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Holoboard3DProps {
  scrollProgress: number;
}

function HoloboardModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/holoboard/scene.gltf');

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation based on scroll progress - full 360 rotation
      const targetRotationY = scrollProgress * Math.PI * 2;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
      
      // Add subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      
      // Slight tilt based on scroll
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.1;
      
      // Scale in as user scrolls - smoother transition
      const targetScale = Math.min(1, scrollProgress * 1.5 + 0.3);
      const currentScale = groupRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      groupRef.current.scale.setScalar(newScale);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={1.8} />
    </group>
  );
}

export default function Holoboard3D({ scrollProgress }: Holoboard3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#60a5fa" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4299e1" />
        <pointLight position={[10, 10, 5]} intensity={0.5} color="#60a5fa" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#3b82f6" />
        
        {/* 3D Model */}
        <HoloboardModel scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/holoboard/scene.gltf');
