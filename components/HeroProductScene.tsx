"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";

export default function HeroProductScene() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem] bg-[#F4E7C5]">
      <Canvas camera={{ position: [0, 0, 5], fov: 36 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 3]} intensity={1.6} color="#fff7d6" />
        <Float rotationIntensity={0.6} floatIntensity={1.2} speed={1.8}>
          <RoundedBox args={[1.8, 2.5, 0.42]} radius={0.12} castShadow>
            <meshStandardMaterial color="#f7f1de" metalness={0.15} roughness={0.48} />
          </RoundedBox>
          <RoundedBox args={[1.58, 2.2, 0.08]} radius={0.1} position={[0, 0, 0.24]}>
            <meshStandardMaterial color="#d9e7d4" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[1.3, 1.5, 0.04]} radius={0.08} position={[0, 0.15, 0.34]}>
            <MeshDistortMaterial
              color="#d4a017"
              emissive="#d4a017"
              emissiveIntensity={0.28}
              roughness={0.2}
              metalness={0.2}
              distort={0.26}
              speed={1.5}
            />
          </RoundedBox>
        </Float>
      </Canvas>
    </div>
  );
}
