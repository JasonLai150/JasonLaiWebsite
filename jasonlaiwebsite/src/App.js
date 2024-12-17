import headshot from './headshot.PNG'
import React, { useRef, useState, useFrame, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei'; // For embedding HTML content in the 3D scene
import './App.css';


const RotatingBox = () => {
  const meshRef = useRef();

  useEffect(() => {
    // Animation loop to rotate the box
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005; // Rotate around x-axis
        meshRef.current.rotation.y += 0.005; // Rotate around y-axis
        meshRef.current.rotation.z += 0.005; // Rotate around z-axis
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <mesh ref={meshRef} position={[3, 0, -5]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};


const Scene = ({ scrollY }) => {
  // Use ref for controlling objects
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      // Change the Y position of the mesh based on scrollY
      // console.log(scrollY);
      meshRef.current.position.y = scrollY * 0.05; // Adjust scroll speed here
    }
  }, [scrollY]);

  return (
    <Canvas>
      <ambientLight color={0xFFFFFF} intensity={0.5}/>
      <pointLight color={0xFFEA99} intensity={20} position={[0, 0, 0]} />

      {/* 3D Object */}
      <mesh ref={meshRef} position={[0, 0, -5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <RotatingBox />

      {/* HTML content embedded into the 3D scene */}
      <Html position={[-5, 3, 0]}>
        <div className="content">
          <h1 style={{textAlign:"center"}}>Hi! I am Jason Lai</h1>
          <img src={headshot} style={{width: '100%', height: 'auto'}}/>
        </div>
      </Html>
    </Canvas>
  );
};

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll events to adjust the scrollY state
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page-container">
      {/* 3D Canvas Background */}
      <div className="threejs-background">
        <Scene scrollY={scrollY} />
      </div>

      {/* HTML Sections */}
      <div className="content-container">
        <section className="section">
          <h1>Welcome to the Page</h1>
          <p>Scroll down to see the 3D background scroll with the page content.</p>
        </section>

        <section className="section">
          <h1>Section 2</h1>
          <p>More content that appears as you scroll.</p>
        </section>

        <section className="section">
          <h1>Section 3</h1>
          <p>Even more content in the next section.</p>
        </section>
      </div>
    </div>
  );
};

export default App;