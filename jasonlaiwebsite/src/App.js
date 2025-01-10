import headshot from './headshotcropped.png'
import resume from './JasonLaiResume.pdf'
import earth from './8k_earth_daymap.jpg'
import moon from './8k_moon.jpg'
import React, { useRef, useState, useFrame, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'; // For embedding HTML content in the 3D scene
import { TextureLoader } from 'three';
import './App.css';


const handleScroll = (ref, initialY, scrollMultiplier = 0.01) => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  if (ref.current) {
    ref.current.position.y = initialY + scrollY * scrollMultiplier; // Adjust position
  }
};

const RotatingBox = ({pos}) => {
  const meshRef = useRef();
  const initialY = pos[1];

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

    const onScroll = () => handleScroll(meshRef, initialY, 0.02); // Pass meshRef and multiplier
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll); // Cleanup
  }, []);

  return (
    <mesh ref={meshRef} position={pos}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const RotatingPlanet = ({pos, radius, texture}) => {
  const meshRef = useRef();
  const initialY = pos[1];

  useEffect(() => {
    // Animation loop to rotate the box
    const animate = () => {
      if (meshRef.current) {
        //meshRef.current.rotation.x += 0.001; // Rotate around x-axis
        meshRef.current.rotation.y += 0.002; // Rotate around y-axis
        //meshRef.current.rotation.z += 0.005; // Rotate around z-axis
      }
      requestAnimationFrame(animate);
    };
    animate();

    const onScroll = () => handleScroll(meshRef, initialY, 0.003); // Pass meshRef and multiplier
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll); // Cleanup
  }, []);

  return (
    <mesh ref={meshRef} position={pos}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Star = ({pos, radius, clr}) => {
  const meshRef = useRef();
  const initialY = pos[1];

  useEffect(() => {
    const onScroll = () => handleScroll(meshRef, initialY, 0.005); // Pass meshRef and multiplier
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll); // Cleanup
  }, []);

  return (
    <mesh ref={meshRef} position={pos}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={clr} />
    </mesh>
  );
};

const makeStars = (numStars) => {
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * 0.015 + 0.015;  // Random radius between 0.1 and 0.6
    const pos = [
      Math.random() * 40 - 20,  // Random X position between -10 and 10
      Math.random() * 40 - 20,  // Random Y position between -10 and 10
      Math.random() * 20 - 20   // Random Z position between -10 and 10
    ];
    const clr = "white";//new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color

    stars.push(<Star key={i} pos={pos} radius={radius} clr={clr} />);
  }
  return stars;
};

const Model = () => {
  const gltf = useGLTF('/models/your-model.glb'); // Adjust the path as necessary
  return <primitive object={gltf.scene} />;
};

const SceneOne = ({ }) => {

  const numStars = 500;
  const stars = makeStars(numStars);
  const earthTexture = useLoader(TextureLoader, earth);
  const moonTexture = useLoader(TextureLoader, moon);

  return (
    <Canvas style={{ background: "#1a1a1a", width: '100%', height: '100%' }} > 
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={1000} position={[0, 0, 8]} />
      <ambientLight color={0xFFFFFF} intensity={0.75}/>
      <pointLight color={0xFFEA99} intensity={100} position={[0, 0, 8]} />

      {/* <RotatingBox pos={[2, 2.5, 0]}/> */}
      
      <RotatingPlanet pos={[2, 0, 5]} radius={2} texture={earthTexture}/>
      <RotatingPlanet pos={[1.25, -4, 5]} radius={0.3} texture={moonTexture}/>
      {/* <Sphere pos = {[4, 1, 0]} radius={0.1} color={"yellow"}/> */}
      {stars}

      {/* <OrbitControls /> */}

      {/* HTML content embedded into the 3D scene */}
      <Html position={[-3.5, 5, 0]}>
        <div id="section1">
          <div className="content" id="intro">
            <h1 className="text" id="title">Hi! I am Jason Lai</h1>
          </div>
          <img src={headshot} id = "headshot"/>
          <div className="content" id="objective">
            <h2 className="text" id="bigtext">I am an aspiring software developer aiming to create innovative and impactful solutions.</h2>
          </div>
        </div>
      </Html>

      <Html position={[-5.5, -0.5, 0]}>
        <div>
          <div className="content" id="aboutme">
            <h1>About Me</h1>
          </div>
          <div className="content" id="aboutme">
            <p className="text">My name is Jason, and I am a second year at Georgia Tech studying Computer Science. My areas of concentration are in Computational Intelligence and Information Networks, and I am also pursuing a minor in Mathematics.
              I hope to pursue a career where I can apply my development skills to create value or solve problems, particularly in the realm of software engineering or machine learning. In addition, my hobbies include working out and playing basketball.
            </p>
          </div>
          <div id="resume">
            <iframe src={resume} width="100%" height="600px"></iframe>
          </div>
        </div>
        
      </Html>
    </Canvas>
  );
};

const SceneTwo = ({ }) => {

  const numStars = 500;
  const stars = makeStars(numStars);

  return (
    <Canvas style={{ background: "#1a1a1a", width: '100%', height: '100%' }} > 
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={1000} position={[0, 0, 8]} />
      <ambientLight color={0xFFFFFF} intensity={0.75}/>
      {/* <pointLight color={0xFFEA99} intensity={100} position={[0, 0, 8]} /> */}

      {/* <RotatingBox pos={[2, 2.5, 0]}/> */}
      
      {/* <RotatingPlanet pos={[2, 0, 5]} radius={2} texture={earthTexture}/>
      <RotatingPlanet pos={[1.5, -3.5, 5]} radius={0.3} texture={moonTexture}/> */}
      {/* <Sphere pos = {[4, 1, 0]} radius={0.1} color={"yellow"}/> */}
      {stars}

      {/* <OrbitControls /> */}

      {/* HTML content embedded into the 3D scene */}
      
    </Canvas>
  );
};

const App = () => {
  return (
    <div>
      <div className="page-container">
        {/* 3D Canvas Background */}
        <SceneOne />
      </div>
      <div className="page-container">
      {/* 3D Canvas Background */}
        <SceneTwo />
      </div>
    </div>
    
  );
};

export default App;