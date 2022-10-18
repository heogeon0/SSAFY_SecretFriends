/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Cube_Dirt_Single({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/Cube_Dirt_Single.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube045.geometry} material={materials.Dirt_1} />
      <mesh geometry={nodes.Cube045_1.geometry} material={materials.Dirt_2} />
      <mesh geometry={nodes.Cube045_2.geometry} material={materials.Dirt_3} />
    </group>
  );
}

useGLTF.preload("models/Cube_Dirt_Single.gltf");