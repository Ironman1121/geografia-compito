import React from 'react';
import { motion } from 'framer-motion';

const cities = [
  { name: 'Roma', color: 'var(--c-roma)' },
  { name: 'Firenze', color: 'var(--c-firenze)' },
  { name: 'Venezia', color: 'var(--c-venezia)' },
  { name: 'Milano', color: 'var(--c-milano)' },
  { name: 'Amalfi', color: 'var(--c-amalfi)' },
  { name: 'Matera', color: 'var(--c-matera)' },
  { name: 'Taormina', color: 'var(--c-sicilia)' },
];

const floaters = [
  { e: '🍕', t: '12%', l: '8%',  d: 0,   dur: 14 },
  { e: '🛵', t: '40%', l: '88%', d: 2.5, dur: 18 },
  { e: '🫒', t: '7%',  l: '78%', d: 1,   dur: 12 },
  { e: '🍷', t: '65%', l: '4%',  d: 3,   dur: 16 },
  { e: '🏛️', t: '80%', l: '14%', d: 4.5, dur: 22 },
  { e: '🎭', t: '22%', l: '91%', d: 1.5, dur: 15 },
  { e: '🌷', t: '88%', l: '84%', d: 5,   dur: 13 },
  { e: '🎻', t: '55%', l: '42%', d: 2,   dur: 20 },
  { e: '⛵', t: '92%', l: '48%', d: 6,   dur: 17 },
  { e: '🌿', t: '32%', l: '2%',  d: 0.5, dur: 11 },
];

const Hero = () => (
  <section style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '5rem 2rem 3rem',
    overflow: 'hidden',
  }}>
    {/* Floating Italian icons */}
    {floaters.map((f, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute', top: f.t, left: f.l,
          fontSize: `${40 + (i % 3) * 10}px`,
          pointerEvents: 'none', userSelect: 'none',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
          zIndex: 0,
        }}
        animate={{
          y: [0, -22, 14, 0],
          rotate: [-4, 6, -3, -4],
          opacity: [0.08, 0.2, 0.13, 0.08],
          scale: [0.92, 1.02, 0.96, 0.92],
        }}
        transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: f.d }}
      >
        {f.e}
      </motion.div>
    ))}

    {/* Faint Italian flag watermark */}
    <div aria-hidden="true" style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '680px', height: '450px', display: 'flex',
      opacity: 0.022, pointerEvents: 'none', zIndex: 0, borderRadius: '6px', overflow: 'hidden',
    }}>
      <div style={{ flex: 1, background: 'var(--b-verde)' }} />
      <div style={{ flex: 1, background: '#fff' }} />
      <div style={{ flex: 1, background: 'var(--b-rosso)' }} />
    </div>

    {/* Hero content */}
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
      style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}
    >
      {/* Small eyebrow label */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '12px' }}
        animate={{ opacity: 1, letterSpacing: '6px' }}
        transition={{ delay: 0.3, duration: 1.2 }}
        style={{
          fontFamily: 'var(--font-b)', fontWeight: 500,
          fontSize: '0.78rem', letterSpacing: '6px', textTransform: 'uppercase',
          color: 'var(--oro-l)', marginBottom: '1.4rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
        }}
      >
        <span style={{ display: 'block', width: '35px', height: '1px', background: 'var(--oro)' }} />
        Un Viaggio Indimenticabile
        <span style={{ display: 'block', width: '35px', height: '1px', background: 'var(--oro)' }} />
      </motion.p>

      {/* ITALIA wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 1 }}
        style={{
          fontFamily: 'var(--font-d)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '10px',
          lineHeight: 1,
          color: '#fff',
          textShadow: `
            0 2px 60px rgba(192,52,31,0.25),
            0 0 120px rgba(184,149,42,0.15)
          `,
          marginBottom: '0.5rem',
        }}
      >
        ITALIA
      </motion.h1>

      {/* Cormorant italic subtitle */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 1 }}
        style={{
          fontFamily: 'var(--font-h)',
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
          marginBottom: '2.2rem',
          lineHeight: 1.3,
          background: 'linear-gradient(135deg, var(--oro-l), var(--cinabro), var(--b-rosso))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >
        Sette Giorni, Un'Eternità di Emozioni
      </motion.h2>

      {/* Ornamental divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.9 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          justifyContent: 'center', marginBottom: '2.2rem',
        }}
      >
        <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to right, transparent, var(--oro))' }} />
        <span style={{ color: 'var(--oro)', fontSize: '1rem' }}>✦</span>
        <span style={{ fontSize: '1.4rem' }}>🇮🇹</span>
        <span style={{ color: 'var(--oro)', fontSize: '1rem' }}>✦</span>
        <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to left, transparent, var(--oro))' }} />
      </motion.div>

      {/* Description in Cormorant */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          fontFamily: 'var(--font-h)',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontStyle: 'italic',
          maxWidth: '620px',
          margin: '0 auto 2.8rem auto',
          color: 'rgba(220,200,175,0.75)',
          lineHeight: 2,
        }}
      >
        Dal Colosseo al vulcano Etna, dalle gondole veneziane al silenzio eterno dei Sassi di Matera. Sette tappe, sette anime, un solo Paese insuperabile.
      </motion.p>

      {/* City Route */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '4px', marginBottom: '3.5rem',
        }}
      >
        {cities.map((c, i) => (
          <React.Fragment key={c.name}>
            <span style={{
              fontFamily: 'var(--font-d)', fontSize: '0.7rem', letterSpacing: '1.5px',
              textTransform: 'uppercase', color: c.color,
              padding: '3px 10px', borderRadius: '4px',
              background: `${c.color}12`, border: `1px solid ${c.color}30`,
            }}>
              {c.name}
            </span>
            {i < cities.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.65rem' }}>›</span>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.7, duration: 0.6, type: 'spring', stiffness: 200 }}
      >
        <a
          href="#itinerary"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            padding: '1rem 2.6rem',
            background: 'linear-gradient(135deg, var(--c-roma) 0%, #7a0e14 100%)',
            color: '#fff', textDecoration: 'none', borderRadius: '50px',
            fontFamily: 'var(--font-b)', fontWeight: 700,
            fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase',
            boxShadow: '0 8px 35px rgba(192,52,31,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 14px 45px rgba(192,52,31,0.6), inset 0 1px 0 rgba(255,255,255,0.15)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 8px 35px rgba(192,52,31,0.45), inset 0 1px 0 rgba(255,255,255,0.1)';
          }}
        >
          <span>Inizia il Viaggio</span>
          <span style={{ opacity: 0.8 }}>↓</span>
        </a>
      </motion.div>
    </motion.div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2.5 }}
      style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        opacity: 0.35, zIndex: 2,
      }}
    >
      <span style={{ fontFamily: 'var(--font-b)', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Scorri</span>
      <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
    </motion.div>
  </section>
);

export default Hero;
