"use client";

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface IPhone3DProps {
  videoSrc?: string;
}

function IPhoneModel({ videoSrc }: IPhone3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Mouse position state
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  
  // Load the GLTF model
  const gltf = useGLTF('/models/scene.gltf') as any;
  const scene = gltf.scene;
  
  // Debug: Log all mesh names to find the screen
  React.useEffect(() => {
    if (scene) {
      // console.log('=== iPhone Model Meshes ===');
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          // console.log('Mesh name:', child.name, 'Material:', child.material?.name);
        }
      });
    }
  }, [scene]);
  
  // Create video texture
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = React.useState<THREE.VideoTexture | null>(null);

  React.useEffect(() => {
    if (videoSrc && typeof window !== 'undefined') {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      
      // Force video to play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // console.log('Video playing successfully');
          })
          .catch(error => {
            // console.log('Video autoplay failed, attempting to play again:', error);
            // Try playing with user interaction
            setTimeout(() => {
              video.play().catch(e => {
                // console.log('Retry failed:', e)
              });
            }, 100);
          });
      }

      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBAFormat;
      texture.colorSpace = THREE.SRGBColorSpace;
      
      // Rotate the video texture by 180 degrees
      texture.center.set(0.5, 0.5);
      texture.rotation = Math.PI; // 180 degrees in radians
      
      // For 9:16 video - ensure texture wrapping is set correctly
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      
      // Scale up the texture to fill the screen properly
      // The model's UV mapping might be causing the video to appear smaller
      // Increase repeat values to zoom in on the video
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);
      
      videoRef.current = video;
      setVideoTexture(texture);

      return () => {
        video.pause();
        texture.dispose();
      };
    }
  }, [videoSrc]);

  // Apply video texture to screen mesh
  React.useEffect(() => {
    if (videoTexture && scene) {
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          // console.log('Checking mesh:', child.name);
          
          // Look for the screen mesh - trying multiple possible names
          if (child.name === 'Object_18' || child.name === 'Object_94') {
            // console.log('Found Screen mesh:', child.name);
            
            // Clone the geometry to modify UVs without affecting original
            const geometry = child.geometry.clone();
            
            // Get UV attribute
            const uvAttribute = geometry.getAttribute('uv');
            if (uvAttribute) {
              // Find the min/max UV values to normalize them
              let minU = Infinity, maxU = -Infinity;
              let minV = Infinity, maxV = -Infinity;
              
              for (let i = 0; i < uvAttribute.count; i++) {
                const u = uvAttribute.getX(i);
                const v = uvAttribute.getY(i);
                minU = Math.min(minU, u);
                maxU = Math.max(maxU, u);
                minV = Math.min(minV, v);
                maxV = Math.max(maxV, v);
              }
              
              // Create new UV array with normalized values (0 to 1)
              const uvArray = new Float32Array(uvAttribute.array.length);
              const rangeU = maxU - minU || 1;
              const rangeV = maxV - minV || 1;
              
              for (let i = 0; i < uvAttribute.count; i++) {
                const u = uvAttribute.getX(i);
                const v = uvAttribute.getY(i);
                
                // Normalize UVs to 0-1 range
                uvArray[i * 2] = (u - minU) / rangeU;
                uvArray[i * 2 + 1] = (v - minV) / rangeV;
              }
              
              geometry.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
            }
            
            child.geometry = geometry;
            
            // Apply video texture directly to the Screen mesh
            child.material = new THREE.MeshBasicMaterial({ 
              map: videoTexture,
              toneMapped: false,
            });
          }
        }
      });
    }
  }, [videoTexture, scene]);

  // Mouse move handler
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
      
      // Set target rotation based on mouse position
      targetRotation.current = {
        x: mousePosition.current.y * 0.3,
        y: mousePosition.current.x * 0.5,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth rotation animation with mouse tracking
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth interpolation towards target rotation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
      
      // Apply rotation
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      
      // Hover effect - slight scale up (reduced to prevent overflow)
      const targetScale = hovered ? 0.55 : 0.52;
      const currentScale = groupRef.current.scale.x
      groupRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * 0.1);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} scale={0.65} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}

export function Iphone3D({ videoSrc }: IPhone3DProps) {
  return (
    <div className="w-full h-full cursor-pointer overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.6} />
        <spotLight position={[0, 10, 10]} angle={0.3} penumbra={1} intensity={0.5} />
        
        <Suspense fallback={null}>
          <IPhoneModel videoSrc={videoSrc} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the GLTF model
useGLTF.preload('/models/scene.gltf');
