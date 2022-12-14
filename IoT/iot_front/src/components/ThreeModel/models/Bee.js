/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";

export default function Bee({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Bee.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Flying.play();
  });
  return (
    <group ref={group} {...props} dispose={null} scale={2}>
      <group name="Scene">
        <group name="MonsterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <group name="Bee">
            <skinnedMesh
              name="Cube001"
              geometry={nodes.Cube001.geometry}
              material={materials.Main}
              skeleton={nodes.Cube001.skeleton}
            />
            <skinnedMesh
              name="Cube001_1"
              geometry={nodes.Cube001_1.geometry}
              material={materials.Main_2}
              skeleton={nodes.Cube001_1.skeleton}
            />
            <skinnedMesh
              name="Cube001_2"
              geometry={nodes.Cube001_2.geometry}
              material={materials.Wings}
              skeleton={nodes.Cube001_2.skeleton}
            />
            <skinnedMesh
              name="Cube001_3"
              geometry={nodes.Cube001_3.geometry}
              material={materials.Teeth}
              skeleton={nodes.Cube001_3.skeleton}
            />
            <skinnedMesh
              name="Cube001_4"
              geometry={nodes.Cube001_4.geometry}
              material={materials.Tongue}
              skeleton={nodes.Cube001_4.skeleton}
            />
            <skinnedMesh
              name="Cube001_5"
              geometry={nodes.Cube001_5.geometry}
              material={materials.Eyes}
              skeleton={nodes.Cube001_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Bee.gltf");
