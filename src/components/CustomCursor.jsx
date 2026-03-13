import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Hide the system cursor
    document.body.style.cursor = 'none'

    const dot = dotRef.current
    const ring = ringRef.current

    gsap.set(dot,  { x: -20, y: -20 })
    gsap.set(ring, { x: -20, y: -20 })

    const onMove = (e) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' })
    }

    const onDown = () => {
      gsap.to(dot,  { scale: 0.5, duration: 0.1 })
      gsap.to(ring, { scale: 0.7, duration: 0.15 })
    }

    const onUp = () => {
      gsap.to(dot,  { scale: 1, duration: 0.2 })
      gsap.to(ring, { scale: 1, duration: 0.25 })
    }

    const onEnterClickable = () => {
      gsap.to(dot,  { scale: 1.8, background: '#e8bc5a', duration: 0.2 })
      gsap.to(ring, { scale: 1.6, borderColor: '#e8bc5a', opacity: 0.8, duration: 0.2 })
    }

    const onLeaveClickable = () => {
      gsap.to(dot,  { scale: 1, background: '#c8933d', duration: 0.2 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(200,147,61,0.5)', opacity: 0.6, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    // Detect hovering over clickable elements
    const clickables = document.querySelectorAll('button, a, [style*="cursor: pointer"]')
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onEnterClickable)
      el.addEventListener('mouseleave', onLeaveClickable)
    })

    // Use MutationObserver to also catch dynamically added clickables
    const observer = new MutationObserver(() => {
      document.querySelectorAll('button, a').forEach(el => {
        el.removeEventListener('mouseenter', onEnterClickable)
        el.removeEventListener('mouseleave', onLeaveClickable)
        el.addEventListener('mouseenter', onEnterClickable)
        el.addEventListener('mouseleave', onLeaveClickable)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      observer.disconnect()
    }
  }, [])

  const dotStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '7px', height: '7px',
    borderRadius: '50%',
    background: '#c8933d',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 99999,
    mixBlendMode: 'screen',
  }

  const ringStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '28px', height: '28px',
    borderRadius: '50%',
    border: '1.5px solid rgba(200,147,61,0.5)',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 99998,
    opacity: 0.6,
  }

  return (
    <>
      <div ref={dotRef} style={dotStyle} />
      <div ref={ringRef} style={ringStyle} />
    </>
  )
}
