import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "../shaders/Fragment";
import { Vertex } from "../shaders/Vertex";
import { useFrame, useLoader } from "@react-three/fiber";
import { DoubleSide, TextureLoader } from "three";
import { useAspect } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const Model = () => {
  const mesh = useRef();
  const { bias, shadow, highlight } = useControls({
    shadow: {
      value: "#00FF00",
    },
    highlight: {
      value: "#FFFFFF",
    },
    bias: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.05,
    },
  });
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const texture = useLoader(TextureLoader, "/BinaryImage.png");
  const scale = useAspect(texture.image.width, texture.image.height, 0.08);

  const uniforms = useRef({
    u_texture: { value: texture },
    shadow: { value: new THREE.Vector3(0, 1, 0) },
    highlight: { value: new THREE.Vector3(1, 1, 1) },
    bias: { value: 0.3 },
  });
  useFrame(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.bias.value = bias;

      const shadowColor = new THREE.Color(shadow);
      const highlightColor = new THREE.Color(highlight);

      mesh.current.material.uniforms.shadow.value = shadowColor.toArray();
      mesh.current.material.uniforms.highlight.value = highlightColor.toArray();
    }
  });
  return (
    <group>
      <mesh scale={scale} position={isDesktop ? [-3, 0, 0] : [0, 1.5, 0]}>
        <planeGeometry args={[4, 4, 50, 50]} />
        <meshBasicMaterial map={texture} side={DoubleSide} />
      </mesh>
      <mesh
        ref={mesh}
        scale={scale}
        position={isDesktop ? [3, 0, 0] : [0, -1.5, 0]}
      >
        <planeGeometry args={[4, 4, 50, 50]} />
        <shaderMaterial
          vertexShader={Vertex}
          fragmentShader={Fragment}
          side={DoubleSide}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
};

export default Model;
