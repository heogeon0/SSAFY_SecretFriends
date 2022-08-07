/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Heart_Outline({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/Heart_Outline.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Heart_Outline.geometry} material={materials.Red} />
    </group>
  )
}

useGLTF.preload('/models/Heart_Outline.gltf')
