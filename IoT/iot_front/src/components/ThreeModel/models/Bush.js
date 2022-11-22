/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Bush({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/Bush.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Bush.geometry} material={materials.Green} />
    </group>
  )
}

useGLTF.preload('/models/Bush.gltf')