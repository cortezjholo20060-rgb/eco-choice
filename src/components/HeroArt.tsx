/** Original illustration: Earth with continents, mountains, water and trees. Decorative only. */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 520" role="img" aria-label="Illustration of planet Earth above green mountains, water and trees" className={className}>
      <defs>
        <radialGradient id="ocean" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#A9DCF0" />
          <stop offset="100%" stopColor="#3F8FB5" />
        </radialGradient>
        <clipPath id="globe"><circle cx="260" cy="200" r="150" /></clipPath>
      </defs>
      <circle cx="260" cy="200" r="175" fill="#A8C5A0" opacity="0.25" />
      <g className="animate-float">
        <circle cx="260" cy="200" r="150" fill="url(#ocean)" />
        <g clipPath="url(#globe)">
          <g className="animate-spin-slow" style={{ transformOrigin: "260px 200px" }}>
            <path d="M150 140c25-30 70-35 95-10 10 15-5 35-25 40-25 5-30 30-55 25-20-5-30-35-15-55z" fill="#3C8D5A" />
            <path d="M290 190c30-20 75-10 90 20 8 25-15 45-35 50-30 8-30 40-60 30-25-10-20-70 5-100z" fill="#3C8D5A" />
            <path d="M230 280c20-8 40 5 35 25-5 18-30 25-40 10-8-12-6-28 5-35z" fill="#2E7A4B" />
            <path d="M180 90c15-8 35-5 40 8-5 12-25 15-38 8z" fill="#2E7A4B" />
          </g>
          <ellipse cx="215" cy="140" rx="60" ry="28" fill="#fff" opacity="0.12" transform="rotate(-25 215 140)" />
        </g>
        <circle cx="260" cy="200" r="150" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
      </g>
      {/* water */}
      <path d="M0 400c60-18 120 14 180 0s120-18 180 0 110 14 160 0v120H0z" fill="#79B8D5" />
      <path d="M0 435c70-16 130 12 200 0s130-14 200 0 90 10 120 0v85H0z" fill="#5FA3C4" />
      {/* mountains */}
      <path d="M-10 410l110-150 70 90 60-80 90 140z" fill="#3C8D5A" />
      <path d="M170 410l120-170 90 120 40-50 110 100z" fill="#174D35" />
      <path d="M100 260l-22 30 22-8 14 12z M290 240l-20 28 20-8 16 10z" fill="#F7F7EF" opacity="0.9" />
      {/* trees */}
      {[70, 110, 400, 440, 480].map((x, i) => (
        <g key={x} transform={`translate(${x} ${392 + (i % 2) * 6})`}>
          <rect x="-3" y="14" width="6" height="14" fill="#856B4F" />
          <path d="M0-26l20 40h-40z" fill="#103B2A" />
          <path d="M0-10l22 36h-44z" fill="#174D35" />
        </g>
      ))}
    </svg>
  );
}
