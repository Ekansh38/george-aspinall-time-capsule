import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { chapters, chapterOrder } from '../data/chapters'

gsap.registerPlugin(ScrollTrigger)

function TimelineEvent({ event, accentColor, index }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start',
        opacity: 0,
        marginBottom: '2.5rem',
      }}
    >
      {/* Year badge */}
      <div style={{ flexShrink: 0, width: '120px', textAlign: 'right' }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          color: accentColor,
          whiteSpace: 'nowrap',
        }}>
          {event.year}
        </span>
      </div>
      {/* Line & dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 12px ${accentColor}88`,
          flexShrink: 0,
          marginTop: '2px',
        }} />
        <div style={{
          width: '1px',
          flex: 1,
          minHeight: '30px',
          background: `linear-gradient(180deg, ${accentColor}60, transparent)`,
          marginTop: '4px',
        }} />
      </div>
      {/* Content */}
      <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#f5e8cc',
          marginBottom: '0.3rem',
        }}>
          {event.title}
        </div>
        <div style={{
          fontFamily: 'Crimson Text, serif',
          fontSize: '1.05rem',
          color: '#c4b090',
          lineHeight: 1.6,
        }}>
          {event.text}
        </div>
      </div>
    </div>
  )
}

export default function ChapterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const introRef = useRef(null)

  const chapter = chapters[id]
  const currentIndex = chapterOrder.indexOf(id)
  const prevChapter = currentIndex > 0 ? chapters[chapterOrder[currentIndex - 1]] : null
  const nextChapter = currentIndex < chapterOrder.length - 1 ? chapters[chapterOrder[currentIndex + 1]] : null

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    gsap.fromTo(introRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 80%',
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [id])

  if (!chapter) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p style={{ color: '#c8933d', fontFamily: 'Cinzel, serif' }}>Chapter not found.</p>
        <button onClick={() => navigate('/capsule')} style={{ marginTop: '1rem', color: '#f5e8cc', background: 'none', border: '1px solid #c8933d', padding: '0.5rem 1.5rem', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
          BACK TO CAPSULE
        </button>
      </div>
    )
  }

  const { accentColor, accentLight } = chapter

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: '#0d0906',
        minHeight: '100vh',
        color: '#f5e8cc',
      }}
    >
      {/* Hero Section */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          height: 'clamp(400px, 55vh, 650px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Atmospheric background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 50% 30%, ${accentColor}18 0%, transparent 60%),
            linear-gradient(180deg, #0d0906 0%, ${accentColor}08 40%, #0d0906 100%)
          `,
        }} />

        {/* Decorative horizontal lines */}
        <div style={{
          position: 'absolute', top: '30%', left: 0, right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}22, transparent)`,
        }} />

        {/* Chapter number */}
        <div style={{
          position: 'absolute',
          top: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          fontWeight: 700,
          color: `${accentColor}08`,
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          {String(currentIndex + 1).padStart(2, '0')}
        </div>

        {/* Nav back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            position: 'absolute',
            top: '1.5rem', left: '2rem',
            zIndex: 10,
          }}
        >
          <button
            onClick={() => navigate('/capsule')}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: '#8b7355',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = accentLight}
            onMouseLeave={e => e.target.style.color = '#8b7355'}
          >
            ← TIME CAPSULE
          </button>
        </motion.div>

        {/* Hero text */}
        <div style={{
          position: 'relative',
          padding: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              color: accentColor,
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}>
              {chapter.years}
            </div>
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 700,
              color: '#f5e8cc',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '0.5rem',
              textShadow: `0 0 60px ${accentColor}30`,
            }}>
              {chapter.title}
            </h1>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
              color: accentLight,
              opacity: 0.8,
            }}>
              {chapter.subtitle}
            </h2>
          </motion.div>
        </div>

        {/* Accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0,
          height: '2px',
          width: '100%',
          background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}44 60%, transparent 100%)`,
        }} />
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
        }}
      >
        <div style={{
          position: 'relative',
          padding: '2rem 2.5rem',
        }}>
          {/* Fictional label */}
          {chapter.quoteFictional && (
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: '#5a4a38',
              marginBottom: '1.2rem',
              textTransform: 'uppercase',
              margin: '0 0 1.2rem 0',
            }}>
              Fictional
            </p>
          )}
          {/* Decorative quote marks */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            fontFamily: 'Playfair Display, serif',
            fontSize: '5rem',
            color: accentColor,
            opacity: 0.2,
            lineHeight: 1,
            userSelect: 'none',
          }}>"</div>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#d4c09a',
            lineHeight: 1.7,
            position: 'relative',
            zIndex: 1,
          }}>
            {chapter.quote}
          </p>
          <p style={{
            marginTop: '1rem',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: accentColor,
            opacity: 0.7,
          }}>
            {chapter.quoteSource}
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <div style={{
        maxWidth: '800px', margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
        }} />
      </div>

      {/* Intro text */}
      <div
        ref={introRef}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          opacity: 0,
        }}
      >
        {chapter.intro.split('\n\n').map((para, i) => (
          <p key={i} style={{
            fontFamily: 'Crimson Text, serif',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.85,
            color: '#c4b090',
            marginBottom: i < chapter.intro.split('\n\n').length - 1 ? '1.5rem' : 0,
          }}>
            {para}
          </p>
        ))}
      </div>

      {/* Timeline */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'clamp(1rem, 3vw, 2rem) clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: accentColor,
            marginBottom: '2rem',
            paddingBottom: '0.75rem',
            borderBottom: `1px solid ${accentColor}33`,
          }}>
            TIMELINE OF EVENTS
          </div>
          {chapter.events.map((event, i) => (
            <TimelineEvent key={i} event={event} accentColor={accentColor} index={i} />
          ))}
        </div>

        {/* Image caption area */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          border: `1px solid ${accentColor}22`,
          borderRadius: '4px',
          background: `${accentColor}05`,
          textAlign: 'center',
        }}>
          {/* Historical image */}
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '2px',
            marginBottom: '1rem',
            border: `1px solid ${accentColor}18`,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(160deg, #1a1008, #0d0906)`,
          }}>
            {chapter.image ? (
              <img
                src={chapter.image}
                alt={chapter.imageCaption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `
                    linear-gradient(${accentColor}08 1px, transparent 1px),
                    linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <div>
                    <div style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      color: `${accentColor}60`,
                      marginBottom: '0.5rem',
                    }}>
                      HISTORICAL PHOTOGRAPH
                    </div>
                    <div style={{
                      fontFamily: 'Crimson Text, serif',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: `${accentColor}50`,
                    }}>
                      {chapter.imageCaption}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chapter navigation */}
      <div style={{
        maxWidth: '800px',
        margin: '3rem auto 0',
        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: `1px solid rgba(200,147,61,0.12)`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}>
        {prevChapter ? (
          <Link
            to={`/chapter/${prevChapter.id}`}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              padding: '1rem 1.5rem',
              border: `1px solid ${prevChapter.accentColor}33`,
              borderRadius: '4px',
              transition: 'all 0.2s',
              background: 'transparent',
              flex: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${prevChapter.accentColor}08`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8b7355' }}>← PREVIOUS</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: prevChapter.accentLight }}>{prevChapter.title}</span>
          </Link>
        ) : <div style={{ flex: 1 }} />}

        <button
          onClick={() => navigate('/capsule')}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#c8933d',
            background: 'none',
            border: '1px solid rgba(200,147,61,0.35)',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            borderRadius: '3px',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(200,147,61,0.08)'; e.target.style.borderColor = 'rgba(200,147,61,0.7)' }}
          onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.borderColor = 'rgba(200,147,61,0.35)' }}
        >
          CAPSULE
        </button>

        {nextChapter ? (
          <Link
            to={`/chapter/${nextChapter.id}`}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.3rem',
              padding: '1rem 1.5rem',
              border: `1px solid ${nextChapter.accentColor}33`,
              borderRadius: '4px',
              transition: 'all 0.2s',
              background: 'transparent',
              flex: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${nextChapter.accentColor}08`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8b7355' }}>NEXT →</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: nextChapter.accentLight }}>{nextChapter.title}</span>
          </Link>
        ) : <div style={{ flex: 1 }} />}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(200,147,61,0.08)',
        marginTop: '3rem',
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
