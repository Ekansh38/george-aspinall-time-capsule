import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { artifacts } from '../data/artifacts'
import { chapters } from '../data/chapters'

const chapterColors = {
  enlistment: '#8b7355',
  changi: '#c4614a',
  railway: '#5a9a3a',
  legacy: '#4a6aaa',
  family: '#9a6a8a',
}

export default function ArtifactPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const artifactRef = useRef(null)
  const bodyRef = useRef(null)

  const artifact = artifacts.find(a => a.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!artifact) return

    gsap.fromTo(artifactRef.current,
      { opacity: 0, y: 40, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)', delay: 0.2 }
    )
    gsap.fromTo(bodyRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.5 }
    )
  }, [id, artifact])

  if (!artifact) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p style={{ color: '#c8933d', fontFamily: 'Cinzel, serif' }}>Artifact not found.</p>
        <button onClick={() => navigate('/capsule')} style={{ marginTop: '1rem', color: '#f5e8cc', background: 'none', border: '1px solid #c8933d', padding: '0.5rem 1.5rem', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
          BACK TO CAPSULE
        </button>
      </div>
    )
  }

  const { label, description, body, SVG, pageChapter, size, letters, letterAnalysis, notCreated } = artifact
  const accentColor = chapterColors[pageChapter] || '#c8933d'
  const chapter = chapters[pageChapter]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#0d0906', minHeight: '100vh', color: '#f5e8cc' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse at 50% 30%, ${accentColor}10 0%, transparent 65%)`,
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
      }} />

      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          position: 'relative', zIndex: 10,
          padding: '1.5rem 2rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
          borderBottom: `1px solid ${accentColor}18`,
          background: 'linear-gradient(180deg, rgba(13,9,6,0.95) 0%, transparent 100%)',
        }}
      >
        <button
          onClick={() => navigate('/capsule')}
          style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
            letterSpacing: '0.2em', color: '#8b7355',
            background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = accentColor}
          onMouseLeave={e => e.target.style.color = '#8b7355'}
        >
          ← TIME CAPSULE
        </button>
      </motion.div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 5,
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
      }}>

        {/* Two-column layout: artifact visual + header */}
        <div style={{
          display: 'flex',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>

          {/* Artifact display */}
          <div
            ref={artifactRef}
            style={{
              opacity: 0,
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              background: `radial-gradient(ellipse at 50% 50%, ${accentColor}12 0%, transparent 70%)`,
              border: `1px solid ${accentColor}25`,
              borderRadius: '8px',
              boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 60px ${accentColor}10`,
            }}
          >
            <div style={{
              filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 30px ${accentColor}40)`,
              transform: 'scale(1.8)',
              transformOrigin: 'center center',
            }}>
              <SVG />
            </div>
          </div>

          {/* Header text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            style={{ flex: '1 1 260px' }}
          >
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              color: accentColor,
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}>
              Artefact
            </div>
            {notCreated && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: '#888',
                border: '1px solid #44403a',
                padding: '0.4rem 0.9rem',
                borderRadius: '3px',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#666', display: 'inline-block' }} />
                Artifact not yet created
              </div>
            )}
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#f5e8cc',
              lineHeight: 1.1,
              marginBottom: '1.2rem',
              textShadow: `0 0 50px ${accentColor}30`,
            }}>
              {label}
            </h1>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#a09070',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}>
              {description}
            </p>
            {/* Chapter link */}
            {chapter && (
              <Link
                to={`/chapter/${pageChapter}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.22em',
                  color: accentColor,
                  textDecoration: 'none',
                  border: `1px solid ${accentColor}44`,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '3px',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${accentColor}12`
                  e.currentTarget.style.borderColor = `${accentColor}99`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = `${accentColor}44`
                }}
              >
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: accentColor, flexShrink: 0,
                }} />
                View Chapter: {chapter.title}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
          marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
        }} />

        {/* Body text */}
        <div ref={bodyRef} style={{ opacity: 0 }}>
          {body.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontFamily: 'Crimson Text, serif',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.85,
              color: '#c4b090',
              marginBottom: i < body.split('\n\n').length - 1 ? '1.5rem' : 0,
            }}>
              {para}
            </p>
          ))}

          {/* Letters section */}
          {letters && (
            <>
              <div style={{
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
                margin: 'clamp(2.5rem, 5vw, 4rem) 0',
              }} />

              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                color: accentColor,
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
              }}>
                The Correspondence
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {letters.map((letter, i) => (
                  <div key={i} style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1a120a 0%, #120d07 100%)',
                    border: `1px solid ${accentColor}22`,
                    borderRadius: '4px',
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    boxShadow: `inset 0 0 40px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.5)`,
                  }}>

                    {/* Location + date header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem',
                      paddingBottom: '1rem',
                      borderBottom: `1px solid ${accentColor}20`,
                    }}>
                      <span style={{
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        color: '#8a7050',
                      }}>
                        {letter.location}
                      </span>
                      <span style={{
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        color: '#8a7050',
                      }}>
                        {letter.date}
                      </span>
                    </div>

                    {/* Salutation */}
                    {letter.salutation && (
                      <p style={{
                        fontFamily: 'Crimson Text, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                        color: '#c4b090',
                        marginBottom: '1.2rem',
                      }}>
                        {letter.salutation}
                      </p>
                    )}

                    {/* Body */}
                    {letter.body.split('\n\n').map((para, j) => (
                      <p key={j} style={{
                        fontFamily: 'Crimson Text, serif',
                        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                        lineHeight: 1.9,
                        color: '#b8a880',
                        marginBottom: '1rem',
                      }}>
                        {para}
                      </p>
                    ))}

                    {/* Closing */}
                    <p style={{
                      fontFamily: 'Crimson Text, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                      color: '#c4b090',
                      marginTop: '1.5rem',
                      marginBottom: letter.signature ? '0.3rem' : 0,
                    }}>
                      {letter.closing}
                    </p>
                    {letter.signature && (
                      <p style={{
                        fontFamily: 'Crimson Text, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                        color: '#c4b090',
                      }}>
                        {letter.signature}
                      </p>
                    )}

                    {/* Censor stamp */}
                    {letter.censored && (
                      <div style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        right: '1.8rem',
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        border: '2px solid #8b2020',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.35,
                        transform: 'rotate(-12deg)',
                      }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.45rem', letterSpacing: '0.1em', color: '#8b2020' }}>PASSED</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.45rem', letterSpacing: '0.1em', color: '#8b2020' }}>CENSOR</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Analysis */}
              {letterAnalysis && (
                <>
                  <div style={{
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)`,
                    margin: 'clamp(2.5rem, 5vw, 4rem) 0 2rem',
                  }} />
                  <div style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.35em',
                    color: accentColor,
                    marginBottom: '1.2rem',
                    textTransform: 'uppercase',
                  }}>
                    A Hidden Message
                  </div>
                  <p style={{
                    fontFamily: 'Crimson Text, serif',
                    fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                    lineHeight: 1.85,
                    color: '#c4b090',
                    fontStyle: 'italic',
                    borderLeft: `2px solid ${accentColor}44`,
                    paddingLeft: '1.5rem',
                  }}>
                    {letterAnalysis}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        borderTop: `1px solid rgba(200,147,61,0.08)`,
        marginTop: '4rem',
        position: 'relative', zIndex: 5,
      }}>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: '#4a3a28',
        }}>
          GEORGE ASPINALL: A DIGITAL TIME CAPSULE
        </p>
      </div>
    </motion.div>
  )
}
