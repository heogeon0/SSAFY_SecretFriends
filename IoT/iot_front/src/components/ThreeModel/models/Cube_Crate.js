/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Cube_Crate({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/Cube_Crate.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube038.geometry} material={materials.Wood} />
      <mesh geometry={nodes.Cube038_1.geometry} material={materials.Wood_Light} />
    </group>
  )
}

useGLTF.preload('/models/Cube_Crate.gltf')
