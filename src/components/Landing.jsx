import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Floating particles behind the box
function LandingParticles() {
  const ref = useRef()
  const count = 300

  const { positions, speeds, phases } = (() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      speeds[i] = 0.001 + Math.random() * 0.003
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, speeds, phases }
  })()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i]
      pos[i * 3]     += Math.sin(t * 0.2 + phases[i]) * 0.001
      if (pos[i * 3 + 1] > 7) pos[i * 3 + 1] = -7
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#d4a840"
        size={0.022} sizeAttenuation
        depthWrite={false} opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const yearRef = useRef(null)
  const boxRef = useRef(null)
  const lidRef = useRef(null)
  const glowRef = useRef(null)
  const ctaRef = useRef(null)
  const lineRef = useRef(null)
  const [opening, setOpening] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    // Thin horizontal line expands from center
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.4, duration: 1.2, ease: 'power3.out' }
    )
    // Title letters drop in
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30, letterSpacing: '0.7em' },
      { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 1.6, ease: 'power3.out' },
      '-=0.6'
    )
    tl.fromTo(yearRef.current,
      { opacity: 0, letterSpacing: '0.8em' },
      { opacity: 1, letterSpacing: '0.3em', duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.5'
    )
    // Box rises up
    tl.fromTo(boxRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'back.out(1.2)' },
      '-=0.4'
    )
    // CTA fades in
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.3'
    )
  }, [])

  const spawnOpeningParticles = () => {
    const ps = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      left: `${44 + (Math.random() - 0.5) * 22}%`,
      top: `56%`,
      '--drift': `${(Math.random() - 0.5) * 120}px`,
      width: `${1.5 + Math.random() * 3.5}px`,
      height: `${1.5 + Math.random() * 3.5}px`,
      animationDuration: `${1.0 + Math.random() * 1.8}s`,
      animationDelay: `${Math.random() * 0.5}s`,
    }))
    setParticles(ps)
  }

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    spawnOpeningParticles()

    // Lid flies open
    gsap.to(lidRef.current, {
      rotateX: -122,
      duration: 1.8,
      ease: 'power3.inOut',
      transformOrigin: 'top center',
      transformPerspective: 800,
    })

    // Inner glow blooms
    gsap.to(glowRef.current, {
      opacity: 1, scale: 1.3,
      duration: 1.0, delay: 0.7,
      ease: 'power2.out',
    })

    // Page transition after lid opens
    setTimeout(() => navigate('/capsule'), 2700)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7 }}
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 55%, #1c1108 0%, #0d0906 65%, #080503 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* R3F particle canvas */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
      }}>
        <Canvas camera={{ position: [0, 0, 9], fov: 55 }} gl={{ alpha: true, antialias: false }} style={{ background: 'transparent' }}>
          <LandingParticles />
        </Canvas>
      </div>

      {/* Scanlines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 6, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)',
      }} />

      {/* Dust particles on open */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'fixed',
          left: p.left, top: p.top,
          width: p.width, height: p.height,
          borderRadius: '50%',
          background: '#e8bc5a',
          opacity: 0,
          animation: `particleRise ${p.animationDuration} ${p.animationDelay} ease-out forwards`,
          '--drift': p['--drift'],
          zIndex: 30,
        }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '700px', padding: '0 2rem' }}>

        {/* Thin line */}
        <div
          ref={lineRef}
          style={{
            width: '100%', height: '1px', margin: '0 auto 2.5rem',
            background: 'linear-gradient(90deg, transparent, rgba(200,147,61,0.35), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#f5e8cc',
            letterSpacing: '0.25em',
            opacity: 0,
            marginBottom: '0.5rem',
            textShadow: '0 0 60px rgba(200,147,61,0.25)',
          }}
        >
          GEORGE ASPINALL
        </h1>

        {/* Years */}
        <div
          ref={yearRef}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
            color: '#c8933d',
            letterSpacing: '0.3em',
            opacity: 0,
            marginBottom: '0.75rem',
          }}
        >
          1917 to 2010
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            color: '#8b7355',
            letterSpacing: '0.12em',
            opacity: 0,
            marginBottom: '3.5rem',
          }}
        >
          Soldier &nbsp;·&nbsp; Prisoner &nbsp;·&nbsp; Witness
        </p>

        {/* Wooden Box */}
        <div
          ref={boxRef}
          style={{
            opacity: 0,
            position: 'relative',
            display: 'inline-block',
            marginBottom: '2.5rem',
          }}
        >
          {/* Glow inside when opened */}
          <div
            ref={glowRef}
            style={{
              position: 'absolute',
              top: '4px', left: '50%',
              transform: 'translateX(-50%)',
              width: '220px', height: '80px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(232,188,90,0.95) 0%, rgba(200,147,61,0.5) 40%, transparent 80%)',
              opacity: 0, zIndex: 1, pointerEvents: 'none',
              filter: 'blur(10px)',
            }}
          />

          {/* Lid */}
          <div
            ref={lidRef}
            onClick={handleOpen}
            style={{
              width: '280px',
              height: '32px',
              background: 'linear-gradient(180deg, #6b4520 0%, #4a2e10 35%, #3a2008 100%)',
              borderRadius: '5px 5px 0 0',
              position: 'relative',
              zIndex: 3,
              cursor: opening ? 'default' : 'pointer',
              transformOrigin: 'top center',
              boxShadow: '0 -2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,147,61,0.25)',
              border: '1px solid #7a4a1a',
              borderBottom: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Wood grain on lid */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: `${20 + i * 22}%`,
                width: '1px',
                background: 'rgba(0,0,0,0.2)',
              }} />
            ))}
            {/* Lid clasp */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '24px', height: '14px',
              background: 'linear-gradient(135deg, #d4a840, #8a6020)',
              borderRadius: '4px',
              boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.25), 0 1px 3px rgba(0,0,0,0.4)',
            }} />
          </div>

          {/* Box body */}
          <div
            onClick={handleOpen}
            style={{
              width: '280px',
              height: '180px',
              background: 'linear-gradient(160deg, #5a3518 0%, #3d2210 30%, #2a1608 60%, #1a1008 100%)',
              borderRadius: '0 0 6px 6px',
              position: 'relative',
              zIndex: 2,
              cursor: opening ? 'default' : 'pointer',
              boxShadow: '0 12px 50px rgba(0,0,0,0.9), inset 0 -2px 20px rgba(0,0,0,0.4)',
              border: '1px solid #6a3c18',
              borderTop: 'none',
              overflow: 'hidden',
            }}
          >
            {/* Horizontal wood grain lines */}
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                position: 'absolute',
                top: `${10 + i * 24}px`, left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.1) 85%, transparent)',
              }} />
            ))}
            {/* Vertical grain */}
            {[20, 60, 100, 140, 180, 220, 260].map(x => (
              <div key={x} style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: `${x}px`, width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)',
              }} />
            ))}
            {/* Inner darkness overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 15%, rgba(200,147,61,0.05) 0%, rgba(0,0,0,0.35) 100%)',
            }} />
            {/* Label engraved into wood */}
            <div style={{
              position: 'absolute',
              bottom: '24px', left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.5rem',
                color: '#7a5a30',
                letterSpacing: '0.3em',
                opacity: 0.6,
                whiteSpace: 'nowrap',
              }}>
                A DIGITAL TIME CAPSULE
              </div>
            </div>
          </div>

          {/* Drop shadow */}
          <div style={{
            position: 'absolute', bottom: '-24px',
            left: '5%', right: '5%', height: '24px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.7) 0%, transparent 100%)',
            filter: 'blur(10px)',
          }} />
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          {!opening ? (
            <button
              onClick={handleOpen}
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                color: '#c8933d',
                background: 'transparent',
                border: '1px solid rgba(200,147,61,0.35)',
                padding: '0.85rem 2.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = 'rgba(200,147,61,0.8)'
                e.target.style.color = '#e8bc5a'
                e.target.style.boxShadow = '0 0 30px rgba(200,147,61,0.12)'
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'rgba(200,147,61,0.35)'
                e.target.style.color = '#c8933d'
                e.target.style.boxShadow = 'none'
              }}
            >
              Open the Capsule
            </button>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                color: '#c8933d',
              }}
            >
              Opening...
            </motion.p>
          )}
          <p style={{
            marginTop: '2rem',
            fontFamily: 'Crimson Text, serif',
            fontSize: '0.8rem',
            color: '#3a2a18',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
          }}>
            A history museum experience
          </p>
        </div>
      </div>
    </motion.div>
  )
}
