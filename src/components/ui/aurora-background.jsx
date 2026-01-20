import React from 'react'

export function AuroraBackground({ children, className = '' }) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-[#1a0506] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora-bands" />
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora-noise" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
