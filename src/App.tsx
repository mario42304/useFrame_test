import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";

interface MyMeshProps {
  isRunning: boolean;
  speed: number;
}

function MyMesh({ isRunning, speed }: MyMeshProps) {
  const ref = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (ref.current && isRunning) {
      ref.current.rotation.y += 0.01 + speed;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshPhongMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);

  const onChangeRunning = () => {
    setIsRunning(!isRunning);
  };
  const onChangeSpeed = (operator: string) => {
    switch (operator) {
      case "+":
        setSpeed((prev) => prev + 0.01);
        break;
      case "-":
        setSpeed((prev) => prev - 0.01);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[1, 1, 1]}
          lookAt={[0, 0, 0]}
          intensity={1}
        />
        <MyMesh isRunning={isRunning} speed={speed} />
      </Canvas>
      <button onClick={onChangeRunning}>{isRunning ? "stop" : "start"}</button>
      <button onClick={() => onChangeSpeed("+")}>speed+</button>
      <button onClick={() => onChangeSpeed("-")}>speed-</button>
    </>
  );
}

// function MyRotatingBox() {
//   const ref = useRef<THREE.Object3D>(null);

//   useFrame(({ clock }) => {
//     if (ref.current) {
//       const a = clock.getElapsedTime();
//       ref.current.rotation.x = a;
//     }
//   });

//   return (
//     <mesh ref={ref}>
//       <boxGeometry />
//       <meshPhongMaterial color="royalblue" />
//     </mesh>
//   );
// }

// export default function App() {
//   return (
//     <div className="App">
//       <Canvas>
//         <MyRotatingBox />
//         <ambientLight intensity={0.1} />
//         <directionalLight />
//       </Canvas>
//     </div>
//   );
// }
