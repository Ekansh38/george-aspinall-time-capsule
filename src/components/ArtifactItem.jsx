import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import Tilt from 'react-parallax-tilt'

const chapterColors = {
  enlistment: '#8b7355',
  changi: '#c4614a',
  railway: '#5a9a3a',
  legacy: '#4a6aaa',
  family: '#9a6a8a',
}

export default function ArtifactItem({ artifact, index }) {
  const { label, chapter, description, position, rotation, SVG } = artifact
  const posRef = useRef(null)
  const lifterRef = useRef(null)
  const tooltipRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ px: 0, py: 0, ox: 0, oy: 0 })
  const hasMoved = useRef(false)
  const navigate = useNavigate()
  const accentColor = chapterColors[chapter] || '#c8933d'

  useEffect(() => {
    gsap.set(posRef.current, { opacity: 0, scale: 0.6, y: 40 })
    gsap.set(tooltipRef.current, { opacity: 0, y: 12 })

    gsap.to(posRef.current, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.8,
      delay: 0.35 + index * 0.12,
      ease: 'back.out(1.6)',
    })
  }, [index])

  const handleMouseEnter = () => {
    if (isDragging.current) return
    setHovered(true)
    gsap.killTweensOf(lifterRef.current)
    gsap.killTweensOf(tooltipRef.current)
    gsap.to(lifterRef.current, {
      y: -18, scale: 1.1,
      filter: `drop-shadow(0 24px 32px rgba(0,0,0,0.8)) drop-shadow(0 0 30px ${accentColor}70)`,
      duration: 0.32, ease: 'power2.out',
    })
    gsap.to(tooltipRef.current, {
      opacity: 1, y: 0, duration: 0.22, ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    gsap.killTweensOf(lifterRef.current)
    gsap.killTweensOf(tooltipRef.current)
    gsap.to(lifterRef.current, {
      y: 0, scale: 1,
      filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.6))',
      duration: 0.42, ease: 'power2.out',
    })
    gsap.to(tooltipRef.current, {
      opacity: 0, y: 12, duration: 0.18,
    })
  }

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation()
    isDragging.current = true
    hasMoved.current = false
    dragStart.current = {
      px: e.clientX,
      py: e.clientY,
      ox: dragOffset.x,
      oy: dragOffset.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    // hide tooltip while dragging
    gsap.to(tooltipRef.current, { opacity: 0, y: 12, duration: 0.1 })
  }, [dragOffset])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStart.current.px
    const dy = e.clientY - dragStart.current.py
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true
    setDragOffset({
      x: dragStart.current.ox + dx,
      y: dragStart.current.oy + dy,
    })
  }, [])

  const handlePointerUp = useCallback((e) => {
    if (!isDragging.current) return
    isDragging.current = false
    if (!hasMoved.current) {
      // treat as click — navigate to chapter
      gsap.to(posRef.current, {
        scale: 0.9, duration: 0.12,
        yoyo: true, repeat: 1,
        onComplete: () => navigate(`/chapter/${chapter}`),
      })
    }
  }, [chapter, navigate])

  return (
    <div
      ref={posRef}
      className="artifact-parallax"
      style={{
        position: 'absolute',
        left: `calc(${position.x}% + ${dragOffset.x}px)`,
        top: `calc(${position.y}% + ${dragOffset.y}px)`,
        zIndex: isDragging.current ? 500 : hovered ? 200 : 10 + index,
        userSelect: 'none',
        willChange: 'transform',
        touchAction: 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Layer 2: rotator — CSS only, GSAP never touches this */}
      <div style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        cursor: isDragging.current ? 'grabbing' : 'grab',
        position: 'relative',
      }}>
        {/* react-parallax-tilt for 3D hover tilt */}
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={10}
          scale={1}
          transitionSpeed={600}
          tiltEnable={hovered && !isDragging.current}
          glareEnable={hovered && !isDragging.current}
          glareMaxOpacity={0.12}
          glareColor={accentColor}
          glarePosition="all"
          glareBorderRadius="4px"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Layer 3: GSAP hover lift */}
          <div
            ref={lifterRef}
            style={{
              filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.6))',
              transformStyle: 'preserve-3d',
            }}
          >
            <SVG />
          </div>
        </Tilt>

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 16px)',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 400,
          }}
        >
          <div style={{
            background: 'rgba(6,4,2,0.97)',
            border: `1px solid ${accentColor}55`,
            borderRadius: '5px',
            padding: '9px 16px',
            textAlign: 'center',
            boxShadow: `0 12px 40px rgba(0,0,0,0.8), 0 0 0 1px ${accentColor}20, 0 0 20px ${accentColor}15`,
          }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.62rem',
              letterSpacing: '0.18em', color: '#f5e8cc',
              marginBottom: '4px', textTransform: 'uppercase',
            }}>
              {label}
            </div>
            <div style={{
              fontFamily: 'Crimson Text, serif', fontStyle: 'italic',
              fontSize: '0.78rem', color: accentColor,
              maxWidth: '200px', whiteSpace: 'normal', lineHeight: 1.4,
            }}>
              {description}
            </div>
            <div style={{
              marginTop: '6px', fontFamily: 'Cinzel, serif',
              fontSize: '0.5rem', letterSpacing: '0.22em',
              color: `${accentColor}88`,
            }}>
              CLICK TO EXPLORE →
            </div>
          </div>
          {/* Arrow */}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `6px solid ${accentColor}55`,
          }} />
        </div>
      </div>
    </div>
  )
}
