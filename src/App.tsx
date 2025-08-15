import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Animation from "./Animation";
import "./App.css";
import type { MyMeshProps, HTMLButtonProps } from "./types";

function MyMesh({ isPaused }: MyMeshProps) {
  const meshRef = useRef<THREE.Object3D>(null);
  const mixerRef = useRef<THREE.AnimationMixer>(null);
  const actionRef = useRef<THREE.AnimationAction>(null);

  if (actionRef.current) {
    actionRef.current.paused = isPaused;
  }

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshPhongMaterial attach="material" color="hotpink" />
      </mesh>
    </>
  );
}

function HTMLButton({ children, setIsPaused }: HTMLButtonProps) {
  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };
  return (
    <>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <button onClick={handlePause}>{children}</button>
      </div>
    </>
  );
}

export default function App() {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <>
      <Canvas>
        <Animation />
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[1, 1, 1]}
          lookAt={[0, 0, 0]}
          intensity={1}
        />
        <MyMesh isPaused={isPaused} />
      </Canvas>
      <HTMLButton setIsPaused={setIsPaused}>
        {isPaused ? "stop" : "start"}
      </HTMLButton>
    </>
  );
}
