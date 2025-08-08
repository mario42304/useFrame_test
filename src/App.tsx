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

  useEffect(() => {
    if (!meshRef.current) return;

    const mixer = new THREE.AnimationMixer(meshRef.current);
    mixerRef.current = mixer;

    const time = [0, 1, 2];
    const value = [0, 0, 0, 1, 0, 0, 0, 0, 0];

    const track = new THREE.VectorKeyframeTrack(".position", time, value);
    const clip = new THREE.AnimationClip("move", -1, [track]);
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();

    actionRef.current = action;
  }, []);

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

function HTMLButton({ children, onClick }: HTMLButtonProps) {
  const handlePause = () => {
    if (!actionRef.current) return;
    setIsRunning(!isRunning);
    actionRef.current.paused = !isRunning;
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
  const [isRunning, setIsRunning] = useState<boolean>(false);

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
        <MyMesh isRunning={isRunning} setIsRunning={setIsRunning} />
      </Canvas>
      <HTMLButton>{isRunning ? "stop" : "start"}</HTMLButton>
    </>
  );
}
