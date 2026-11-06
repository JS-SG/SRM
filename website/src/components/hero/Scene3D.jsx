import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Stylized 3D Tree
const StylizedTree = ({ position, scale = 1 }) => {
  const treeRef = useRef();

  useFrame(({ clock }) => {
    if (treeRef.current) {
      treeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.5 + position[0]) * 0.03;
    }
  });

  return (
    <group ref={treeRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 1.2, 8]} />
        <meshStandardMaterial color="#854d0e" roughness={0.8} />
      </mesh>
      {/* Foliage Layers */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <dodecahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color="#16a34a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <dodecahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Stylized Cloud
const StylizedCloud = ({ position, speed = 0.2 }) => {
  const cloudRef = useRef();

  useFrame(({ clock }) => {
    if (cloudRef.current) {
      cloudRef.current.position.x = ((clock.getElapsedTime() * speed + position[0] + 10) % 20) - 10;
      cloudRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={cloudRef} position={position}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0.45, -0.05, 0]}>
        <sphereGeometry args={[0.45, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[-0.45, -0.05, 0]}>
        <sphereGeometry args={[0.45, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.25, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
    </group>
  );
};

// Floating Educational Props (Book, Star, Pencil)
const FloatingProps = () => {
  const bookRef = useRef();
  const starRef = useRef();
  const pencilRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bookRef.current) {
      bookRef.current.position.y = 2.4 + Math.sin(t * 2) * 0.15;
      bookRef.current.rotation.y = t * 0.6;
      bookRef.current.rotation.x = Math.sin(t) * 0.2;
    }
    if (starRef.current) {
      starRef.current.position.y = 2.7 + Math.cos(t * 1.8) * 0.12;
      starRef.current.rotation.y = t * 1.2;
      starRef.current.rotation.z = Math.sin(t * 1.5) * 0.2;
    }
    if (pencilRef.current) {
      pencilRef.current.position.y = 2.1 + Math.sin(t * 2.2 + 1) * 0.14;
      pencilRef.current.rotation.z = -0.4 + Math.sin(t * 0.8) * 0.15;
      pencilRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group>
      {/* Floating Book */}
      <group ref={bookRef} position={[-2.4, 2.4, 1]} scale={0.4}>
        <mesh castShadow>
          <boxGeometry args={[1, 0.2, 1.4]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[0.9, 0.05, 1.3]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Floating Star */}
      <group ref={starRef} position={[2.6, 2.7, 0.8]} scale={0.32}>
        <mesh castShadow>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.3} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>

      {/* Floating Pencil */}
      <group ref={pencilRef} position={[2.7, 2.1, 1.8]} scale={0.3}>
        {/* Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.4, 6]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Tip */}
        <mesh position={[0, 0.85, 0]}>
          <coneGeometry args={[0.15, 0.3, 6]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        {/* Graphite */}
        <mesh position={[0, 0.96, 0]}>
          <coneGeometry args={[0.06, 0.1, 6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Eraser */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 12]} />
          <meshStandardMaterial color="#f43f5e" />
        </mesh>
      </group>
    </group>
  );
};

// 3D School Building & Gates
const SchoolAndGate = () => {
  const leftGateRef = useRef();
  const rightGateRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Smooth gate swing animation that opens wide and breathes gently
    const gateAngle = Math.min(1.1, 0.3 + Math.sin(t * 0.4) * 0.1 + 0.7);
    if (leftGateRef.current) {
      leftGateRef.current.rotation.y = -gateAngle;
    }
    if (rightGateRef.current) {
      rightGateRef.current.rotation.y = gateAngle;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* School Building Base Facade */}
      <mesh position={[0, 1.6, -1.8]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 3.2, 1.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>

      {/* Sloped Roof */}
      <mesh position={[0, 3.6, -1.8]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[4.8, 1.3, 4]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.4} />
      </mesh>

      {/* Clock Tower / Bell Arch */}
      <mesh position={[0, 4.4, -1.8]} castShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 5.3, -1.8]}>
        <coneGeometry args={[0.9, 0.8, 4]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.3} />
      </mesh>
      {/* Clock Face */}
      <mesh position={[0, 4.4, -1.19]}>
        <circleGeometry args={[0.35, 24]} />
        <meshStandardMaterial color="#0c2340" />
      </mesh>

      {/* School Entrance Arch Door */}
      <mesh position={[0, 0.9, -0.89]} receiveShadow>
        <planeGeometry args={[1.4, 1.8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* --- PROMINENT KKK SCHOOL SIGN ON BUILDING TOP FACADE --- */}
      <group position={[0, 2.75, -0.82]}>
        {/* Outer Gold Border Frame */}
        <mesh castShadow>
          <boxGeometry args={[4.5, 0.65, 0.08]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Inner Royal Blue Signboard */}
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[4.36, 0.54, 0.04]} />
          <meshStandardMaterial color="#0f2b5c" roughness={0.4} />
        </mesh>

        {/* 3D Typography: KKK SCHOOL */}
        <Text
          position={[0, 0.08, 0.07]}
          fontSize={0.28}
          color="#ffffff"
          fontWeight="bold"
          letterSpacing={0.08}
          anchorX="center"
          anchorY="middle"
        >
          KKK SCHOOL
        </Text>

        {/* 3D Typography: SUBBULAPURAM */}
        <Text
          position={[0, -0.14, 0.07]}
          fontSize={0.12}
          color="#fbbf24"
          fontWeight="bold"
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
        >
          SUBBULAPURAM • ESTD 2007
        </Text>
      </group>

      {/* Windows Left */}
      <mesh position={[-1.8, 1.6, -0.88]}>
        <boxGeometry args={[1.1, 1.0, 0.05]} />
        <meshStandardMaterial color="#bae6fd" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Windows Right */}
      <mesh position={[1.8, 1.6, -0.88]}>
        <boxGeometry args={[1.1, 1.0, 0.05]} />
        <meshStandardMaterial color="#bae6fd" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* --- OVERHEAD GRAND ENTRANCE WELCOME ARCH ACROSS GATE --- */}
      <group position={[0, 2.45, 0.6]}>
        {/* Decorative Arch Beam */}
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.44, 0.12]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.4} roughness={0.4} />
        </mesh>
        {/* Gold Trim */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.1, 0.38, 0.02]} />
          <meshStandardMaterial color="#0c2340" />
        </mesh>
        {/* Welcome Text */}
        <Text
          position={[0, 0.02, 0.08]}
          fontSize={0.19}
          color="#fef08a"
          fontWeight="bold"
          letterSpacing={0.09}
          anchorX="center"
          anchorY="middle"
        >
          ★ WELCOME TO KKK SCHOOL ★
        </Text>
      </group>

      {/* Gate Left Pillar */}
      <group position={[-1.4, 0, 0.6]}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 2.2, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.3, 0]} castShadow>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Left Pillar Welcome Plaque */}
        <group position={[0, 1.2, 0.22]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.7, 0.03]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <Text
            position={[0, 0.18, 0.02]}
            fontSize={0.08}
            color="#ffffff"
            fontWeight="bold"
            letterSpacing={0.06}
            anchorX="center"
            anchorY="middle"
          >
            WELCOME
          </Text>
          <Text
            position={[0, 0.02, 0.02]}
            fontSize={0.065}
            color="#fef08a"
            fontWeight="bold"
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
          >
            LEARN
          </Text>
          <Text
            position={[0, -0.14, 0.02]}
            fontSize={0.065}
            color="#ffffff"
            fontWeight="bold"
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
          >
            GROW
          </Text>
        </group>

        {/* Swinging Left Gate Leaf */}
        <group ref={leftGateRef} position={[0.2, 0, 0]}>
          <mesh position={[0.55, 0.9, 0]} castShadow>
            <boxGeometry args={[1.1, 1.6, 0.06]} />
            <meshStandardMaterial color="#1e3a8a" wireframe={false} metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Gold Finials */}
          <mesh position={[0.3, 1.8, 0]}>
            <coneGeometry args={[0.06, 0.2, 8]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.8, 1.8, 0]}>
            <coneGeometry args={[0.06, 0.2, 8]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </group>
      </group>

      {/* Gate Right Pillar */}
      <group position={[1.4, 0, 0.6]}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 2.2, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.3, 0]} castShadow>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Right Pillar Plaque */}
        <group position={[0, 1.2, 0.22]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.7, 0.03]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <Text
            position={[0, 0.18, 0.02]}
            fontSize={0.08}
            color="#ffffff"
            fontWeight="bold"
            letterSpacing={0.06}
            anchorX="center"
            anchorY="middle"
          >
            DISCOVER
          </Text>
          <Text
            position={[0, 0.02, 0.02]}
            fontSize={0.065}
            color="#fef08a"
            fontWeight="bold"
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
          >
            LEAD
          </Text>
          <Text
            position={[0, -0.14, 0.02]}
            fontSize={0.065}
            color="#ffffff"
            fontWeight="bold"
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
          >
            EXCEL
          </Text>
        </group>

        {/* Swinging Right Gate Leaf */}
        <group ref={rightGateRef} position={[-0.2, 0, 0]}>
          <mesh position={[-0.55, 0.9, 0]} castShadow>
            <boxGeometry args={[1.1, 1.6, 0.06]} />
            <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Gold Finials */}
          <mesh position={[-0.3, 1.8, 0]}>
            <coneGeometry args={[0.06, 0.2, 8]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[-0.8, 1.8, 0]}>
            <coneGeometry args={[0.06, 0.2, 8]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// 3D Animated Boy Character (Wearing School Uniform)
const BoyCharacter = () => {
  const boyRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2.8;
    // Walk along the pathway entering school from front to gate
    const walkZ = 1.4 - ((clock.getElapsedTime() * 0.45) % 3.2);

    if (boyRef.current) {
      boyRef.current.position.z = walkZ;
      // Slight joyful vertical bounce
      boyRef.current.position.y = Math.abs(Math.sin(t)) * 0.08;
    }
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t) * 0.55;
      rightLegRef.current.rotation.x = -Math.sin(t) * 0.55;
    }
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -Math.sin(t) * 0.55;
      rightArmRef.current.rotation.x = Math.sin(t) * 0.55 + 0.3; // Slight wave/reach
    }
  });

  return (
    <group ref={boyRef} position={[-0.45, 0, 1.2]} scale={0.65}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.6} />
      </mesh>
      {/* Boy Hair */}
      <mesh position={[0, 1.72, -0.02]} castShadow>
        <sphereGeometry args={[0.23, 16, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Torso (White Uniform Shirt) */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.38, 0.5, 0.24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Blue School Tie */}
      <mesh position={[0, 1.2, 0.13]}>
        <boxGeometry args={[0.08, 0.28, 0.02]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Navy Blue Shorts */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.36, 0.24, 0.24]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 1.15, -0.18]} castShadow>
        <boxGeometry args={[0.32, 0.42, 0.16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} />
      </mesh>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.1, 0.7, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.55, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        {/* Black Shoe */}
        <mesh position={[0, -0.58, 0.05]} castShadow>
          <boxGeometry args={[0.1, 0.1, 0.18]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.1, 0.7, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.55, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        {/* Black Shoe */}
        <mesh position={[0, -0.58, 0.05]} castShadow>
          <boxGeometry args={[0.1, 0.1, 0.18]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.24, 1.35, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.42, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>

      {/* Right Arm (Waving friendly) */}
      <group ref={rightArmRef} position={[0.24, 1.35, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.42, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
    </group>
  );
};

// 3D Animated Girl Character (Wearing School Uniform)
const GirlCharacter = () => {
  const girlRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2.8;
    // Walk along the pathway entering school beside the boy
    const walkZ = 1.3 - ((clock.getElapsedTime() * 0.45) % 3.2);

    if (girlRef.current) {
      girlRef.current.position.z = walkZ;
      girlRef.current.position.y = Math.abs(Math.cos(t)) * 0.08;
    }
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = -Math.sin(t) * 0.55;
      rightLegRef.current.rotation.x = Math.sin(t) * 0.55;
    }
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t) * 0.55;
      rightArmRef.current.rotation.x = -Math.sin(t) * 0.55;
    }
  });

  return (
    <group ref={girlRef} position={[0.45, 0, 1.1]} scale={0.63}>
      {/* Head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.21, 16, 16]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.6} />
      </mesh>

      {/* Girl Hair & Pigtails */}
      <mesh position={[0, 1.66, -0.02]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#451a03" roughness={0.8} />
      </mesh>
      {/* Left Pigtail */}
      <mesh position={[-0.22, 1.55, -0.05]} castShadow>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      <mesh position={[-0.2, 1.62, -0.02]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Right Pigtail */}
      <mesh position={[0.22, 1.55, -0.05]} castShadow>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      <mesh position={[0.2, 1.62, -0.02]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Torso (White Uniform Shirt) */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.34, 0.46, 0.22]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Red Ribbon/Collar */}
      <mesh position={[0, 1.25, 0.12]}>
        <boxGeometry args={[0.1, 0.08, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* Navy Pleated Skirt */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <coneGeometry args={[0.26, 0.32, 16]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.5} />
      </mesh>

      {/* Pink Backpack */}
      <mesh position={[0, 1.15, -0.16]} castShadow>
        <boxGeometry args={[0.28, 0.38, 0.14]} />
        <meshStandardMaterial color="#ec4899" roughness={0.4} />
      </mesh>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.09, 0.65, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.045, 0.52, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        <mesh position={[0, -0.54, 0.04]} castShadow>
          <boxGeometry args={[0.09, 0.09, 0.16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.09, 0.65, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.045, 0.52, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        <mesh position={[0, -0.54, 0.04]} castShadow>
          <boxGeometry args={[0.09, 0.09, 0.16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.22, 1.3, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.38, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>

      {/* Right Arm (Holding Small Book) */}
      <group ref={rightArmRef} position={[0.22, 1.3, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.38, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        {/* Handheld Book */}
        <mesh position={[0.06, -0.25, 0.1]} rotation={[0.2, 0.3, 0]} castShadow>
          <boxGeometry args={[0.16, 0.22, 0.04]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </group>
    </group>
  );
};

// Main 3D Composition Scene
const Scene3D = () => {
  const sceneGroupRef = useRef();

  // Subtle interactive parallax tilt based on mouse position
  useFrame(({ pointer }) => {
    if (sceneGroupRef.current) {
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        pointer.x * 0.18,
        0.05
      );
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        -pointer.y * 0.08,
        0.05
      );
    }
  });

  return (
    <group ref={sceneGroupRef} position={[0, -0.8, 0]}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        color="#fffbeb"
      />
      <directionalLight position={[-4, 4, -2]} intensity={0.4} color="#bae6fd" />

      {/* Environment Trees */}
      <StylizedTree position={[-3.6, 0, -1.2]} scale={1.2} />
      <StylizedTree position={[-4.5, 0, 0.2]} scale={0.9} />
      <StylizedTree position={[3.6, 0, -1.2]} scale={1.2} />
      <StylizedTree position={[4.4, 0, 0.4]} scale={0.95} />

      {/* Clouds */}
      <StylizedCloud position={[-4, 3.8, -3]} speed={0.15} />
      <StylizedCloud position={[3.5, 4.2, -4]} speed={0.18} />
      <StylizedCloud position={[0, 4.6, -3.5]} speed={0.12} />

      {/* Floating Icons */}
      <FloatingProps />

      {/* School Building and Open Gate */}
      <SchoolAndGate />

      {/* Two Walking Children */}
      <BoyCharacter />
      <GirlCharacter />

      {/* Grass Ground Lawn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} />
      </mesh>

      {/* Cobblestone Pathway Leading to School */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.6]} receiveShadow>
        <planeGeometry args={[1.6, 5.5]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
      </mesh>
    </group>
  );
};

export default Scene3D;
