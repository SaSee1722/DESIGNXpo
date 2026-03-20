import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { m } from 'framer-motion';
import { 
  Zap, 
  Search, 
  Settings, 
  User, 
  Activity,
  CheckCircle2,
  Cpu,
  Palette,
  Layout,
  Layers,
  Sparkles,
  Command
} from 'lucide-react';

const RingElement = ({ component, angle, radius, index }: { component: React.ReactNode, angle: number, radius: number, index: number }) => {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const groupRef = useRef<THREE.Group>(null);
  const initialY = useMemo(() => (Math.random() - 0.5) * 4, []);
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = initialY + Math.sin(time * speed + index) * 0.8;
      // Gently face the camera/center
      groupRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef} position={[x, initialY, z]}>
      <Html transform center distanceFactor={22}>
        <m.div
          whileHover={{ scale: 1.2, y: -40, rotateY: 25, rotateZ: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="pointer-events-auto cursor-pointer"
        >
          {component}
        </m.div>
      </Html>
    </group>
  );
};

const FloatingParticles = ({ count = 50 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 40;
        p[i * 3 + 1] = (Math.random() - 0.5) * 40;
        p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color="#bae6fd" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const UIComponents = [
  // 01. Minimalist Action
  <div className="group p-4">
    <button className="relative px-12 py-5 rounded-full bg-slate-900/90 text-white font-black text-[10px] tracking-[0.4em] uppercase border border-white/10 backdrop-blur-xl shadow-2xl group-hover:bg-sky-600 transition-all duration-500">
      Launch Core
    </button>
  </div>,

  // 02. Simple Stat
  <div className="px-10 py-6 rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-sky-100/50 shadow-xl flex flex-col items-center">
    <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.3em] mb-2">System Load</span>
    <span className="text-3xl font-black text-slate-900 tracking-tighter">24<span className="text-sm opacity-30 ml-1">%</span></span>
  </div>,

  // 03. Icon Circle
  <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-sky-400 border border-white/10 shadow-2xl group cursor-pointer">
    <Layers className="w-8 h-8 group-hover:scale-110 transition-transform" />
  </div>,

  // 04. Minimal User
  <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 shadow-lg">
    <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white">
      <User size={20} />
    </div>
    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Operator</span>
  </div>,

  // 05. Command Chip
  <div className="px-8 py-4 rounded-2xl bg-slate-900 text-sky-400 border border-white/5 shadow-2xl font-mono text-[10px] tracking-tighter uppercase group cursor-pointer">
    <span className="opacity-40 mr-2">SYS:</span>
    <span className="group-hover:text-white transition-colors">ESTABLISH_LINK</span>
  </div>,

  // 06. Pulse Activity
  <div className="p-6 rounded-3xl bg-white/40 backdrop-blur-3xl border border-white/20 shadow-2xl">
    <Activity className="w-8 h-8 text-sky-500 animate-pulse" />
  </div>
];

const RingContent = ({ dragState }: { dragState: React.MutableRefObject<{ isDragging: boolean, velocity: number, isRotating: boolean, lastX: number }> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const radius = useMemo(() => {
    // World units: at z=0 with fov=35 and camera.z=35
    // viewport.width is around 22. We want a radius that fits well.
    const baseRadius = viewport.width * 0.45;
    return Math.min(baseRadius, 14);
  }, [viewport.width]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (dragState.current.isDragging) {
        groupRef.current.rotation.y += dragState.current.velocity;
        dragState.current.velocity *= 0.8; // dampening while dragging
      } else {
        const safeDelta = Math.min(delta, 0.1);
        if (dragState.current.isRotating) {
            groupRef.current.rotation.y += safeDelta * 0.15 + dragState.current.velocity;
        } else {
            groupRef.current.rotation.y += dragState.current.velocity;
        }
        dragState.current.velocity *= 0.95; // Friction
        if (Math.abs(dragState.current.velocity) < 0.0001) dragState.current.velocity = 0;
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      rotation={[0.15, 0, 0]}
    >
      <FloatingParticles count={150} />
      
      {UIComponents.map((component, i) => (
        <RingElement 
          key={i} 
          index={i}
          component={component} 
          angle={(i / UIComponents.length) * Math.PI * 2} 
          radius={radius} 
        />
      ))}
      
      {/* Dynamic central grid/light */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <ringGeometry args={[radius * 0.95, radius * 1.05, 128]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Decorative outer wireframe ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[radius * 1.2, radius * 1.202, 128]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const RotatingRing: React.FC = () => {
  const dragState = useRef({
    isDragging: false,
    velocity: 0,
    isRotating: true,
    lastX: 0
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.pointer-events-auto')) {
      return;
    }
    dragState.current.isDragging = true;
    dragState.current.lastX = e.clientX;
    dragState.current.isRotating = false;
    dragState.current.velocity = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragState.current.isDragging) {
      const deltaX = e.clientX - dragState.current.lastX;
      dragState.current.velocity = deltaX * 0.01;
      dragState.current.lastX = e.clientX;
    }
  };

  const handlePointerUp = () => {
    dragState.current.isDragging = false;
    setTimeout(() => {
      dragState.current.isRotating = true;
    }, 3000);
  };

  return (
    <div 
      className="h-full w-full relative group cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none z-0" />
      <Canvas 
        camera={{ position: [0, 8, 40], fov: 32 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={0.5} color="#60a5fa" />
          <pointLight position={[-10, -10, -10]} intensity={0.2} color="#818cf8" />
          
          <RingContent dragState={dragState} />
          
          <Environment preset="city" />
          
          <EffectComposer multisampling={4}>
            <Bloom 
              luminanceThreshold={0.8} 
              mipmapBlur 
              intensity={0.2} 
              radius={0.3}
            />
          </EffectComposer>
          <AdaptiveDpr pixelated={false} />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RotatingRing;
