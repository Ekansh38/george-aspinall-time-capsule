import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { artifacts } from '../data/artifacts'
import ArtifactItem from './ArtifactItem'
import BackgroundScene from './BackgroundScene'

export default function TimeCapsule() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mouse parallax — artifacts float at different depths
  useEffect(() => {
    const depths = [0.4, 0.9, 0.6, 1.1, 0.7, 1.3, 0.5, 0.8]

    const handleMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      }
    }
    window.addEventListener('mousemove', handleMove)

    // GSAP ticker applies parallax every frame
    const tick = gsap.ticker.add(() => {
      const { x, y } = mouseRef.current
      document.querySelectorAll('.artifact-parallax').forEach((el, i) => {
        const d = depths[i] ?? 0.6
        gsap.to(el, {
          x: x * 22 * d,
          y: y * 12 * d,
          duration: 2,
          ease: 'power1.out',
          overwrite: false,
        })
      })
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 30% 20%, #3d2a10 0%, transparent 45%),
          radial-gradient(ellipse at 70% 80%, #2d1a08 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, #251808 0%, #0d0906 100%)
        `,
      }}
    >
      {/* Wood grain surface */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          repeating-linear-gradient(172deg, transparent, transparent 100px, rgba(0,0,0,0.035) 101px, rgba(0,0,0,0.035) 102px),
          repeating-linear-gradient(8deg, transparent, transparent 70px, rgba(255,255,255,0.008) 71px, rgba(255,255,255,0.008) 72px)
        `,
      }} />

      {/* R3F floating particles */}
      <BackgroundScene />

      {/* Scanlines overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 150, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(0,0,0,0.7) 100%)',
      }} />

      {/* Candle glow spots */}
      <div style={{
        position: 'absolute', top: '8%', left: '18%',
        width: '350px', height: '350px', zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,147,61,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'candleFlicker 4s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', bottom: '12%', right: '12%',
        width: '280px', height: '280px', zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,120,40,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'candleFlicker 6s ease-in-out infinite alternate-reverse',
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '1.4rem 2rem',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(13,9,6,0.9) 0%, transparent 100%)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
            letterSpacing: '0.2em', color: '#8b7355', background: 'none',
            border: 'none', cursor: 'pointer', padding: '0.4rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#c8933d'}
          onMouseLeave={e => e.target.style.color = '#8b7355'}
        >
          ← BACK
        </button>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
            fontWeight: 600, color: '#f5e8cc',
            letterSpacing: '0.3em', marginBottom: '0.2rem',
          }}>
            LOREM IPSUM
          </h1>
          <p style={{
            fontFamily: 'Crimson Text, serif', fontStyle: 'italic',
            fontSize: '0.78rem', color: '#6a5540', letterSpacing: '0.08em',
          }}>
            Lorem ipsum dolor — sit amet consectetur adipiscing
          </p>
        </div>
        <div style={{ width: '60px' }} />
      </motion.div>

      {/* Artefact scatter — full viewport canvas */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '600px',
          zIndex: 10,
        }}
      >
        {artifacts.map((artifact, i) => (
          <ArtifactItem key={artifact.id} artifact={artifact} index={i} />
        ))}
      </div>

      {/* Chapter legend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          padding: '0.9rem 2rem', zIndex: 300,
          background: 'linear-gradient(0deg, rgba(13,9,6,0.95) 0%, transparent 100%)',
          display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap',
        }}
      >
        {[
          { id: 'enlistment', label: 'Enlistment', color: '#8b7355' },
          { id: 'changi', label: 'Changi', color: '#c4614a' },
          { id: 'railway', label: 'Death Railway', color: '#5a9a3a' },
          { id: 'legacy', label: 'Legacy', color: '#4a6aaa' },
          { id: 'family', label: 'Family', color: '#9a6a8a' },
        ].map(ch => (
          <button
            key={ch.id}
            onClick={() => navigate(`/chapter/${ch.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.3rem 0.6rem', borderRadius: '3px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,147,61,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: ch.color, flexShrink: 0,
              boxShadow: `0 0 6px ${ch.color}88`,
            }} />
            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.52rem',
              letterSpacing: '0.15em', color: '#7a6a50',
              textTransform: 'uppercase',
            }}>
              {ch.label}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Candle flicker CSS */}
      <style>{`
        @keyframes candleFlicker {
          0% { opacity: 0.7; transform: scale(1); }
          33% { opacity: 1; transform: scale(1.08); }
          66% { opacity: 0.85; transform: scale(0.97); }
          100% { opacity: 0.95; transform: scale(1.05); }
        }
      `}</style>
    </motion.div>
  )
}
