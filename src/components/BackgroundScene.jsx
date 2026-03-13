import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function DustMotes() {
  const meshRef = useRef()
  const count = 600

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28  // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8   // z
      speeds[i]  = 0.0008 + Math.random() * 0.0025
      phases[i]  = Math.random() * Math.PI * 2
    }
    return { positions, speeds, phases }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = meshRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      // Gentle upward drift
      pos[i * 3 + 1] += speeds[i]
      // Subtle horizontal sway
      pos[i * 3]     += Math.sin(t * 0.3 + phases[i]) * 0.0008

      // Wrap when mote reaches top
      if (pos[i * 3 + 1] > 9) {
        pos[i * 3 + 1] = -9
        pos[i * 3]     = (Math.random() - 0.5) * 28
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points
      ref={meshRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#e8c870"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// A second layer — slightly larger, brighter firefly particles
function Fireflies() {
  const meshRef = useRef()
  const count = 40

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      speeds[i] = 0.0003 + Math.random() * 0.001
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, speeds, phases }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i]
      pos[i * 3]     += Math.sin(t * 0.2 + phases[i]) * 0.002
      pos[i * 3 + 2] += Math.cos(t * 0.15 + phases[i]) * 0.001
      if (pos[i * 3 + 1] > 8) pos[i * 3 + 1] = -8
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffdd88"
        size={0.07}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function BackgroundScene() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
      >
        <DustMotes />
        <Fireflies />
      </Canvas>
    </div>
  )
}
