import React from 'react';

/* Animated fog/mist layer using CSS animated SVG feTurbulence blur blobs */
const FogLayer = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Fog strip 1 */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        left: 0,
        width: '200%',
        height: '120px',
        background: 'linear-gradient(90deg, transparent, rgba(200,130,60,0.06), rgba(200,100,40,0.09), transparent, rgba(210,150,70,0.06), transparent)',
        filter: 'blur(28px)',
        animation: 'fog-scroll 50s linear infinite',
      }} />
      {/* Fog strip 2 — slower, higher */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: 0,
        width: '200%',
        height: '90px',
        background: 'linear-gradient(90deg, transparent, rgba(180,100,50,0.04), rgba(220,160,80,0.07), transparent, rgba(200,130,60,0.05), transparent)',
        filter: 'blur(35px)',
        animation: 'fog-scroll 80s linear infinite reverse',
      }} />
      {/* Large bottom glow — like the sun setting on Rome */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70vw',
        height: '200px',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(196,82,26,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'pulse-glow 8s ease-in-out infinite',
      }} />
    </div>
  );
};

export default FogLayer;
