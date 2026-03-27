// SVG artifact components — each is a styled inline SVG representing a physical object

export const DogTagsSVG = () => (
  <svg width="90" height="130" viewBox="0 0 90 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="metal1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d8d8d8" />
        <stop offset="40%" stopColor="#a0a0a0" />
        <stop offset="100%" stopColor="#c0c0c0" />
      </linearGradient>
      <linearGradient id="metal2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8c8c8" />
        <stop offset="40%" stopColor="#909090" />
        <stop offset="100%" stopColor="#b0b0b0" />
      </linearGradient>
      <filter id="metalShadow">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Chain */}
    <circle cx="45" cy="10" r="7" stroke="#888" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="10" r="4" stroke="#888" strokeWidth="1" fill="none" />
    <line x1="45" y1="17" x2="45" y2="32" stroke="#999" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Back tag (offset) */}
    <g filter="url(#metalShadow)" transform="translate(4, 2)">
      <rect x="8" y="30" width="64" height="46" rx="7" fill="url(#metal1)" />
      <path d="M40 76 L34 84 L46 84 Z" fill="url(#metal1)" />
      <rect x="12" y="35" width="56" height="1.5" rx="1" fill="#888" opacity="0.4" />
      <text x="40" y="50" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#666" fontWeight="bold">ASPINALL  G</text>
      <text x="40" y="60" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#777">NX37745  AIF</text>
      <text x="40" y="69" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#777">C OF E</text>
    </g>
    {/* Front tag */}
    <g filter="url(#metalShadow)">
      <rect x="6" y="38" width="64" height="46" rx="7" fill="url(#metal2)" />
      <path d="M38 84 L32 92 L44 92 Z" fill="url(#metal2)" />
      {/* Embossed lines */}
      <rect x="10" y="42" width="56" height="1.5" rx="1" fill="#999" opacity="0.3" />
      <rect x="10" y="80" width="56" height="1.5" rx="1" fill="#888" opacity="0.3" />
      <text x="38" y="58" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#666" fontWeight="bold">ASPINALL  G</text>
      <text x="38" y="68" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#777">NX37745  AIF</text>
      <text x="38" y="77" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#777">C OF E</text>
    </g>
  </svg>
)

export const CameraSVG = () => (
  <svg width="110" height="85" viewBox="0 0 110 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="leather" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4a3020" />
        <stop offset="50%" stopColor="#2d1c0e" />
        <stop offset="100%" stopColor="#3a2418" />
      </linearGradient>
      <linearGradient id="leatherTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a3a22" />
        <stop offset="100%" stopColor="#3a2010" />
      </linearGradient>
      <radialGradient id="lens" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6090c0" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#2040a0" stopOpacity="0.9" />
        <stop offset="80%" stopColor="#101828" />
        <stop offset="100%" stopColor="#080c14" />
      </radialGradient>
      <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d0d0d0" />
        <stop offset="50%" stopColor="#888" />
        <stop offset="100%" stopColor="#c0c0c0" />
      </linearGradient>
      <filter id="camShadow">
        <feDropShadow dx="3" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.6" />
      </filter>
    </defs>
    <g filter="url(#camShadow)">
      {/* Camera body */}
      <rect x="5" y="12" width="100" height="68" rx="4" fill="url(#leather)" />
      {/* Top strip */}
      <rect x="5" y="12" width="100" height="12" rx="4" fill="url(#leatherTop)" />
      {/* Leatherette texture dots */}
      {[...Array(8)].map((_, i) => [...Array(5)].map((_, j) => (
        <rect key={`${i}-${j}`} x={12 + i * 12} y={28 + j * 12} width="2" height="2" rx="1" fill="#1a0e06" opacity="0.5" />
      )))}
      {/* Viewfinder */}
      <rect x="12" y="15" width="18" height="8" rx="2" fill="#1a1008" />
      <rect x="13" y="16" width="16" height="6" rx="1" fill="url(#chrome)" opacity="0.3" />
      {/* BROWNIE text */}
      <text x="55" y="23" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="7" fill="#c8a060" letterSpacing="2" opacity="0.9">BROWNIE</text>
      <text x="55" y="31" textAnchor="middle" fontFamily="sans-serif" fontSize="4.5" fill="#a07040" letterSpacing="1" opacity="0.7">KODAK</text>
      {/* Main lens ring */}
      <circle cx="55" cy="55" r="24" fill="url(#chrome)" />
      <circle cx="55" cy="55" r="21" fill="#1a1008" />
      <circle cx="55" cy="55" r="18" fill="url(#lens)" />
      <circle cx="55" cy="55" r="10" fill="#060a10" />
      <circle cx="55" cy="55" r="6" fill="#0d1420" />
      {/* Lens glint */}
      <circle cx="49" cy="49" r="3" fill="white" opacity="0.15" />
      {/* Shutter button */}
      <circle cx="88" cy="20" r="5" fill="url(#chrome)" />
      <circle cx="88" cy="20" r="3" fill="#888" />
      {/* Strap lugs */}
      <rect x="3" y="30" width="4" height="16" rx="2" fill="#3a2010" />
      <rect x="103" y="30" width="4" height="16" rx="2" fill="#3a2010" />
    </g>
  </svg>
)

export const PhotographsSVG = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="photoShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
      </filter>
      <linearGradient id="photoScene1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a7060" />
        <stop offset="100%" stopColor="#3a2a1a" />
      </linearGradient>
      <linearGradient id="photoScene2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7a6a50" />
        <stop offset="100%" stopColor="#2a1a0a" />
      </linearGradient>
    </defs>
    {/* Photo 3 — back, rotated right */}
    <g filter="url(#photoShadow)" transform="rotate(14, 80, 60)">
      <rect x="50" y="20" width="60" height="75" rx="1" fill="#e8dcc0" />
      <rect x="54" y="24" width="52" height="58" fill="url(#photoScene2)" />
      {/* Blurry scene: figure, horizon */}
      <line x1="54" y1="60" x2="106" y2="62" stroke="#4a3a28" strokeWidth="4" opacity="0.6" />
      <rect x="70" y="42" width="8" height="18" rx="1" fill="#2a1a0a" opacity="0.7" />
      <text x="80" y="89" textAnchor="middle" fontFamily="'Crimson Text', serif" fontSize="5" fill="#9a8a6a" fontStyle="italic">no. 34</text>
    </g>
    {/* Photo 2 — middle, slight left tilt */}
    <g filter="url(#photoShadow)" transform="rotate(-8, 40, 55)">
      <rect x="8" y="15" width="60" height="78" rx="1" fill="#ece0c4" />
      <rect x="12" y="19" width="52" height="62" fill="url(#photoScene1)" />
      {/* Blurry scene: huts, trees */}
      <rect x="15" y="45" width="20" height="16" rx="1" fill="#2a1a0a" opacity="0.5" />
      <rect x="40" y="48" width="15" height="13" rx="1" fill="#2a1a0a" opacity="0.4" />
      <line x1="12" y1="61" x2="64" y2="63" stroke="#3a2a1a" strokeWidth="3" opacity="0.4" />
      <text x="38" y="90" textAnchor="middle" fontFamily="'Crimson Text', serif" fontSize="5" fill="#9a8a6a" fontStyle="italic">no. 12</text>
    </g>
    {/* Photo 1 — front, face up */}
    <g filter="url(#photoShadow)" transform="rotate(3, 55, 55)">
      <rect x="25" y="30" width="65" height="75" rx="1" fill="#f5e8cc" />
      <rect x="29" y="34" width="57" height="57" fill="#6a5540" />
      {/* A figure scene — more detailed */}
      <rect x="29" y="68" width="57" height="23" fill="#4a3020" />
      <ellipse cx="55" cy="60" rx="25" ry="15" fill="#3a2810" opacity="0.7" />
      <rect x="48" y="48" width="6" height="20" rx="1" fill="#2a1a0a" opacity="0.8" />
      <ellipse cx="51" cy="47" rx="5" ry="5" fill="#5a3020" opacity="0.9" />
      {/* Trees */}
      <rect x="35" y="40" width="3" height="28" fill="#1a0e00" opacity="0.6" />
      <ellipse cx="36" cy="40" rx="7" ry="8" fill="#2a3a10" opacity="0.5" />
      <rect x="72" y="44" width="3" height="24" fill="#1a0e00" opacity="0.6" />
      <ellipse cx="73" cy="43" rx="6" ry="7" fill="#2a3a10" opacity="0.5" />
      {/* Caption area */}
      <line x1="29" y1="96" x2="86" y2="96" stroke="#d0b880" strokeWidth="0.5" opacity="0.5" />
      <text x="58" y="101" textAnchor="middle" fontFamily="'Crimson Text', serif" fontSize="5" fill="#9a8a6a" fontStyle="italic">Thailand, 1943</text>
    </g>
  </svg>
)

export const LetterSVG = () => (
  <svg width="95" height="80" viewBox="0 0 95 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f0ddb0" />
        <stop offset="100%" stopColor="#e0c890" />
      </linearGradient>
      <filter id="letterShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter="url(#letterShadow)">
      {/* Paper body */}
      <rect x="4" y="6" width="87" height="68" rx="2" fill="url(#paperGrad)" />
      {/* Aged edges */}
      <rect x="4" y="6" width="87" height="68" rx="2" fill="none" stroke="#b09060" strokeWidth="0.5" />
      {/* Fold lines */}
      <line x1="4" y1="29" x2="91" y2="29" stroke="#c4a870" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6" />
      <line x1="4" y1="52" x2="91" y2="52" stroke="#c4a870" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6" />
      {/* Header */}
      <text x="12" y="16" fontFamily="'Playfair Display', serif" fontSize="6.5" fill="#5a3a10" fontStyle="italic">Changi Barracks, Singapore</text>
      <text x="83" y="23" textAnchor="end" fontFamily="'Playfair Display', serif" fontSize="6" fill="#6a4a20">1942</text>
      <line x1="8" y1="21" x2="87" y2="21" stroke="#b09060" strokeWidth="0.5" opacity="0.7" />
      {/* Body text lines */}
      {[32, 39, 46].map((y, i) => (
        <line key={i} x1="10" x2={i === 1 ? 60 : 82} y1={y} y2={y} stroke="#8a6a30" strokeWidth="1.2" opacity="0.4" />
      ))}
      {[56, 63].map((y, i) => (
        <line key={i} x1="10" x2={i === 0 ? 70 : 45} y1={y} y2={y} stroke="#8a6a30" strokeWidth="1.2" opacity="0.4" />
      ))}
      {/* Dear Mum text */}
      <text x="10" y="30" fontFamily="'Crimson Text', serif" fontSize="6.5" fill="#5a3a10" fontStyle="italic">Dear Mum &amp; Dad,</text>
      {/* Closing */}
      <text x="10" y="71" fontFamily="'Crimson Text', serif" fontSize="6" fill="#5a3a10" fontStyle="italic">Your son, George</text>
      {/* Censor stamp */}
      <circle cx="72" cy="55" r="12" fill="none" stroke="#8b2020" strokeWidth="1.5" opacity="0.35" />
      <text x="72" y="53" textAnchor="middle" fontFamily="monospace" fontSize="4.5" fill="#8b2020" opacity="0.35">PASSED</text>
      <text x="72" y="59" textAnchor="middle" fontFamily="monospace" fontSize="4.5" fill="#8b2020" opacity="0.35">CENSOR</text>
    </g>
  </svg>
)

export const RailwayMapSVG = () => (
  <svg width="130" height="100" viewBox="0 0 130 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mapPaper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d4b878" />
        <stop offset="60%" stopColor="#c0a060" />
        <stop offset="100%" stopColor="#b89040" />
      </linearGradient>
      <filter id="mapShadow">
        <feDropShadow dx="3" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.55" />
      </filter>
    </defs>
    <g filter="url(#mapShadow)">
      <rect x="4" y="6" width="122" height="88" rx="2" fill="url(#mapPaper)" />
      {/* Edge wear */}
      <rect x="4" y="6" width="122" height="88" rx="2" fill="none" stroke="#8a6020" strokeWidth="1" opacity="0.5" />
      {/* Grid lines */}
      {[22, 40, 58, 76].map((x, i) => (
        <line key={i} x1={x} y1="10" x2={x} y2="90" stroke="#a07830" strokeWidth="0.3" opacity="0.4" />
      ))}
      {[22, 38, 54, 70, 86].map((y, i) => (
        <line key={i} x1="8" y1={y} x2="122" y2={y} stroke="#a07830" strokeWidth="0.3" opacity="0.4" />
      ))}
      {/* Title */}
      <text x="65" y="18" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="6.5" fill="#5a3010" letterSpacing="1">BURMA-SIAM RAILWAY</text>
      <line x1="18" y1="20" x2="112" y2="20" stroke="#5a3010" strokeWidth="0.5" opacity="0.6" />
      {/* Railway route — jagged path through jungle */}
      <path
        d="M20 80 C25 70, 30 75, 38 65 C45 55, 42 48, 50 42 C58 36, 65 40, 72 32 C79 24, 82 26, 90 24"
        stroke="#8b2020" strokeWidth="2.5" fill="none" strokeDasharray="4 3"
      />
      {/* Location markers */}
      <circle cx="20" cy="80" r="3.5" fill="#8b2020" opacity="0.8" />
      <text x="8" y="91" fontFamily="'Crimson Text', serif" fontSize="5.5" fill="#5a3010" fontStyle="italic">Bangkok</text>
      <circle cx="90" cy="24" r="3.5" fill="#8b2020" opacity="0.8" />
      <text x="78" y="18" fontFamily="'Crimson Text', serif" fontSize="5.5" fill="#5a3010" fontStyle="italic">Rangoon</text>
      {/* Jungle shading */}
      <ellipse cx="45" cy="55" rx="10" ry="6" fill="#4a6020" opacity="0.2" />
      <ellipse cx="65" cy="38" rx="8" ry="5" fill="#4a6020" opacity="0.2" />
      {/* Scale */}
      <line x1="15" y1="88" x2="55" y2="88" stroke="#5a3010" strokeWidth="1" />
      <line x1="15" y1="85" x2="15" y2="91" stroke="#5a3010" strokeWidth="1" />
      <line x1="55" y1="85" x2="55" y2="91" stroke="#5a3010" strokeWidth="1" />
      <text x="35" y="97" textAnchor="middle" fontFamily="sans-serif" fontSize="4.5" fill="#5a3010">415 km</text>
      {/* Coffee stain ring */}
      <circle cx="105" cy="75" r="14" fill="none" stroke="#7a5020" strokeWidth="1.5" opacity="0.2" />
    </g>
  </svg>
)


export const EnlistmentSVG = () => (
  <svg width="85" height="115" viewBox="0 0 85 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="docPaper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f8eed4" />
        <stop offset="100%" stopColor="#eeddb8" />
      </linearGradient>
      <filter id="docShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter="url(#docShadow)">
      <rect x="4" y="4" width="77" height="107" rx="2" fill="url(#docPaper)" />
      <rect x="4" y="4" width="77" height="107" rx="2" fill="none" stroke="#b09050" strokeWidth="0.5" opacity="0.7" />
      {/* AIF Header */}
      <text x="42" y="16" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="6" fill="#2a1a00" letterSpacing="1">AUSTRALIAN</text>
      <text x="42" y="24" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="6" fill="#2a1a00" letterSpacing="1">IMPERIAL FORCE</text>
      <line x1="10" y1="28" x2="74" y2="28" stroke="#b09050" strokeWidth="0.7" />
      <line x1="10" y1="30" x2="74" y2="30" stroke="#b09050" strokeWidth="0.3" opacity="0.5" />
      {/* ATTESTATION label */}
      <text x="42" y="39" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="5.5" fill="#3a2010" fontStyle="italic">Attestation Paper</text>
      {/* Form fields */}
      {[48, 57, 66, 75, 84].map((y, i) => (
        <g key={i}>
          <line x1="10" y1={y} x2="74" y2={y} stroke="#a08040" strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}
      {/* Labels */}
      <text x="10" y="46" fontFamily="sans-serif" fontSize="4" fill="#6a4a20" opacity="0.8">Name:</text>
      <text x="28" y="46" fontFamily="'Crimson Text', serif" fontSize="5" fill="#3a2010">Aspinall, George</text>
      <text x="10" y="55" fontFamily="sans-serif" fontSize="4" fill="#6a4a20" opacity="0.8">Date of Birth:</text>
      <text x="38" y="55" fontFamily="'Crimson Text', serif" fontSize="5" fill="#3a2010">1917</text>
      <text x="10" y="64" fontFamily="sans-serif" fontSize="4" fill="#6a4a20" opacity="0.8">Birthplace:</text>
      <text x="33" y="64" fontFamily="'Crimson Text', serif" fontSize="5" fill="#3a2010">Old Junee, NSW</text>
      <text x="10" y="73" fontFamily="sans-serif" fontSize="4" fill="#6a4a20" opacity="0.8">Trade:</text>
      <text x="26" y="73" fontFamily="'Crimson Text', serif" fontSize="5" fill="#3a2010">Motor Mechanic</text>
      {/* Signature area */}
      <line x1="10" y1="95" x2="55" y2="95" stroke="#8a6030" strokeWidth="0.8" />
      <text x="10" y="100" fontFamily="sans-serif" fontSize="4" fill="#6a4a20" opacity="0.7">Signature of Recruit</text>
      {/* Signature */}
      <path d="M14 93 C18 89, 22 91, 26 88 C30 85, 32 90, 36 88" stroke="#2a1008" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Stamp */}
      <circle cx="62" cy="90" r="11" fill="none" stroke="#1a3a6a" strokeWidth="1.5" opacity="0.4" />
      <text x="62" y="88" textAnchor="middle" fontFamily="monospace" fontSize="3.5" fill="#1a3a6a" opacity="0.4" letterSpacing="0.5">ENLISTED</text>
      <text x="62" y="93" textAnchor="middle" fontFamily="monospace" fontSize="3.5" fill="#1a3a6a" opacity="0.4">1941</text>
      {/* Condition date */}
      <text x="10" y="108" fontFamily="sans-serif" fontSize="4" fill="#6a4a20" opacity="0.6">No. NX37745  2/30th Inf Bn AIF</text>
    </g>
  </svg>
)

export const NewspaperSVG = () => (
  <svg width="100" height="130" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="newsprint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8d8a8" />
        <stop offset="100%" stopColor="#d8c898" />
      </linearGradient>
      <filter id="newsShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter="url(#newsShadow)">
      <rect x="4" y="4" width="92" height="122" rx="1" fill="url(#newsprint)" />
      <rect x="4" y="4" width="92" height="122" rx="1" fill="none" stroke="#a09060" strokeWidth="0.5" opacity="0.5" />
      {/* Masthead */}
      <rect x="4" y="4" width="92" height="16" rx="1" fill="#1a1008" />
      <text x="50" y="14" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="6.5" fill="#e8d8a8" letterSpacing="1">THE STRAITS TIMES</text>
      {/* Date */}
      <text x="50" y="24" textAnchor="middle" fontFamily="sans-serif" fontSize="4" fill="#5a4020">Monday, February 16, 1942</text>
      <line x1="8" y1="26" x2="92" y2="26" stroke="#8a7030" strokeWidth="1" />
      <line x1="8" y1="28" x2="92" y2="28" stroke="#8a7030" strokeWidth="0.3" />
      {/* HEADLINE */}
      <text x="50" y="39" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="11" fill="#0a0600" fontWeight="bold" letterSpacing="-0.5">SINGAPORE</text>
      <text x="50" y="52" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="11" fill="#0a0600" fontWeight="bold" letterSpacing="-0.5">SURRENDERS</text>
      <line x1="8" y1="56" x2="92" y2="56" stroke="#5a4020" strokeWidth="0.8" />
      {/* Subheadline */}
      <text x="50" y="63" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="5.5" fill="#2a1800" fontStyle="italic">130,000 Allied troops taken prisoner</text>
      <line x1="8" y1="67" x2="92" y2="67" stroke="#8a7030" strokeWidth="0.3" />
      {/* Columns */}
      <line x1="50" y1="68" x2="50" y2="122" stroke="#8a7030" strokeWidth="0.5" opacity="0.5" />
      {/* Column 1 text lines */}
      {[73, 79, 85, 91, 97, 103, 109, 115].map((y, i) => (
        <line key={i} x1="10" x2={i % 3 === 0 ? 42 : i % 3 === 1 ? 46 : 44} y1={y} y2={y} stroke="#6a5020" strokeWidth="0.7" opacity="0.5" />
      ))}
      {/* Column 2 text lines */}
      {[73, 79, 85, 91, 97, 103, 109, 115].map((y, i) => (
        <line key={i} x1="54" x2={i % 3 === 0 ? 88 : i % 3 === 1 ? 84 : 90} y1={y} y2={y} stroke="#6a5020" strokeWidth="0.7" opacity="0.5" />
      ))}
      {/* Small photo placeholder box */}
      <rect x="10" y="68" width="36" height="22" fill="#8a7050" opacity="0.3" />
      <text x="28" y="81" textAnchor="middle" fontFamily="sans-serif" fontSize="4" fill="#5a3010" opacity="0.6">Gen. Percival</text>
    </g>
  </svg>
)

// Artifact definitions — positions are percentages of container
export const artifacts = [
  {
    id: 'dogtags',
    notCreated: true,
    label: 'Dog Tags',
    chapter: 'changi',
    pageChapter: 'changi',
    description: "George's Army identification tags, worn throughout captivity",
    body: `Every Australian soldier was issued metal identification tags when they enlisted. George's tags were stamped with his name, service number NX37745, unit, and religion, listed as "C OF E" for Church of England. He wore them around his neck throughout his entire time as a prisoner of war.\n\nEven in the worst conditions of captivity, through hunger, disease, and forced labour, these tags were one of the few personal objects he managed to keep. They were a reminder of who he was when nearly everything else had been taken away from him.`,
    position: { x: 14, y: 20 },
    rotation: -18,
    SVG: DogTagsSVG,
    size: { w: 90, h: 130 },
  },
  {
    id: 'camera',
    notCreated: true,
    label: 'Kodak Brownie',
    chapter: 'railway',
    pageChapter: 'railway',
    description: 'The hidden camera George used to document the Death Railway',
    body: `George received this Kodak Brownie as a going-away gift from his uncle before leaving Australia in July 1941. He had it with him when Singapore fell, and kept photographing throughout his captivity. Taking photographs was strictly forbidden by the Japanese guards. Anyone caught could be executed on the spot.\n\nTo keep it hidden, George fashioned a kidney-belt to conceal the camera on his body, and also used a hollowed-out water bottle to hide it through searches. He smuggled it from Changi all the way to the Death Railway and back. The fact that it survived is remarkable.`,
    position: { x: 60, y: 12 },
    rotation: 8,
    SVG: CameraSVG,
    size: { w: 110, h: 85 },
  },
  {
    id: 'photographs',
    label: 'Secret Photographs',
    chapter: 'railway',
    pageChapter: 'railway',
    description: 'Around 100 forbidden photographs taken at enormous personal risk',
    body: `Over the course of his captivity, George took around 100 secret photographs documenting life at Changi and on the Burma-Thailand Death Railway. He captured prisoners working in brutal conditions, sick and dying men, makeshift jungle camps, and the railway being built by hand under Japanese supervision.\n\nEach photograph was taken at enormous personal risk. If a guard had spotted him, he almost certainly would have been killed. George hid the developed photographs and negatives throughout the war, protecting them through searches, flooding, and disease. Around 60 of the original negatives survive today at the Australian War Memorial.`,
    position: { x: 38, y: 42 },
    rotation: -5,
    SVG: PhotographsSVG,
    size: { w: 120, h: 110 },
  },
  {
    id: 'letter',
    label: 'Letter Home',
    chapter: 'changi',
    pageChapter: 'family',
    description: 'A censored letter to his family from Changi Prison',
    body: `Prisoners at Changi were sometimes allowed to send letters home. But the issue is that the letter was read by Japanese censors. George could not say where he was, how bad things really were, or anything that might be considered military information. Letters that passed inspection were stamped "PASSED CENSOR" before being sent of to the family of the prisoner.\n\nEach letter ment that Georges family knew he was still alive. Reading between the carefully chosen words, they would have understood that he couldn't tell them the whole truth about what he was going through.`,
    scans: [
      { src: '/letter-mum-p1.jpg', label: "Mum's Letter — Page 1" },
      { src: '/letter-mum-p2.jpg', label: "Mum's Letter — Page 2" },
      { src: '/letter-george.jpg', label: "George's Reply" },
    ],
    letters: [
      {
        from: 'Mum',
        location: 'Parramatta, New South Wales',
        date: 'July 1943',
        salutation: 'My dear George,',
        body: `I hope you find this letter, and I really hope you are safe and doing well. Every day I think about you, and if you are alright. I hope we can meet once again soon.\n\nThings at home are more or less the same. The winter is foggy and cold, and I remember when you used to complain about getting up early on cold mornings to go work in the garage.\n\nThe neighbors often ask about you and send their regards. Ms. Taylor wanted to let you know that the roses you planted are strong, healthy, and growing well.\n\nPlease remember that you are loved and missed very much here at home. Keep your spirits up as best you can. I look forward to the day when we can meet again.`,
        closing: 'All my love,',
        signature: 'Mum',
        censored: false,
      },
      {
        from: 'George',
        location: 'Changi Prison',
        date: 'September 1943',
        salutation: null,
        body: `I found your letter.\n\nI am glad to know our garden is doing well. Make sure to thank Ms. Taylor for remembering me.\n\nThings are going okay. The days are long. I am in reasonable health, so do not worry too much.\n\nThere are many things here that one would not normally expect to see. I sometimes think that if I had the chance, it would be worth keeping some kind of record of them for later. Memory might have to do.\n\nThe weather here is warm. Too warm and the guards are strict.`,
        closing: 'From George.',
        signature: null,
        censored: true,
      },
    ],
    letterAnalysis: `If you read George's reply carefully. you will realise it says more than you might think. The line "it would be worth keeping some kind of record of them for later" is a small little hint. at what he was doing. He was already photographing lots of the things he was seeing. This was a big risk that he took. "Memory might have to do" was written for the censor's eyes.`,
    position: { x: 72, y: 55 },
    rotation: 14,
    SVG: LetterSVG,
    size: { w: 95, h: 80 },
  },
  {
    id: 'railwaymap',
    label: 'Railway Map',
    chapter: 'railway',
    pageChapter: 'railway',
    description: 'A hand-drawn map of the 415km Burma-Thailand Death Railway',
    body: `The Burma-Thailand Death Railway stretched 415 kilometres through dense jungle and mountain terrain between Bangkok, Thailand, and Rangoon, Burma. It was built between 1942 and 1943 by around 60,000 Allied prisoners of war, including Australians, British, and Dutch soldiers, alongside more than 200,000 Asian labourers forced into service by the Japanese.\n\nConditions were horrific. Prisoners worked up to 18-hour days with almost no food, tools, or medicine. Over 100,000 workers died during construction, including more than 12,000 Allied POWs. The railway was completed in October 1943, a staggering human cost for a single military supply line.`,
    position: { x: 22, y: 58 },
    rotation: 6,
    SVG: RailwayMapSVG,
    size: { w: 130, h: 100 },
  },

  {
    id: 'enlistment',
    label: 'Enlistment Papers',
    scans: [
      { src: '/enlistment-form.jpg', label: 'Australian Military Forces — Attestation Form' },
    ],
    chapter: 'enlistment',
    pageChapter: 'enlistment',
    description: 'The attestation paper George signed to join the 2nd AIF in 1941',
    body: `In 1941. At the young fresh age of 17 years old. George H. Aspinall signed up to join the 2nd Australian Imperial Force. He enlisted as a Motor Mechanic and joined the 2nd/30th Infantry Battalion. Many many young Australians volunteered around the same time. They where motivated by a sense of duty and patriotism.\n\nThe "attestation" paper George signed was an official military document recording his name, age, birthplace, trade, and religion. When he signed that document. He could not have imagined that he was about to be sent into one of the most devastating places ever.`,
    position: { x: 8, y: 42 },
    rotation: 10,
    SVG: EnlistmentSVG,
    size: { w: 85, h: 115 },
  },
  {
    id: 'newspaper',
    label: '"Singapore Surrenders"',
    chapter: 'changi',
    pageChapter: 'changi',
    description: 'The Straits Times front page, February 16, 1942',
    body: `On 15 February 1942, British General Arthur Percival surrendered Singapore to Japanese General Tomoyuki Yamashita. It was the largest surrender of British-led forces in history. Around 80,000 Allied troops in Singapore became prisoners of war, including approximately 15,000 Australians.\n\nThe fall of Singapore was a massive shock to Australia, which had long relied on Britain to protect the region. Prime Minister John Curtin called it "Australia's darkest hour." For George and his fellow soldiers, this newspaper headline marked the moment everything changed, the beginning of years of brutal captivity that none of them had been prepared for.`,
    position: { x: 76, y: 22 },
    rotation: -12,
    SVG: NewspaperSVG,
    size: { w: 100, h: 130 },
  },
]
