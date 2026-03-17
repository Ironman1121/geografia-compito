import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Activity Card: cascades in from the left with per-item delay ── */
const ActivityCard = ({ text, index, accentColor, gradient, panelInView, panelDelay }) => (
  <motion.div
    initial={{ opacity: 0, x: -22 }}
    animate={panelInView ? { opacity: 1, x: 0 } : {}}
    transition={{
      delay: panelDelay + 0.08 * index,
      duration: 0.5,
      ease: 'easeOut',
    }}
    style={{
      position: 'relative',
      padding: '0.9rem 1rem 0.9rem 1.2rem',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.06)',
      fontSize: '0.84rem',
      fontFamily: 'var(--font-b)',
      color: '#c0b09a',
      lineHeight: 1.6,
      overflow: 'hidden',
      cursor: 'default',
    }}
    whileHover={{
      scale: 1.025,
      x: 4,
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderColor: `${accentColor}40`,
      transition: { duration: 0.2 },
    }}
  >
    {/* Left gradient stripe animates width in */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={panelInView ? { scaleX: 1 } : {}}
      transition={{ delay: panelDelay + 0.08 * index + 0.15, duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
        background: gradient,
        borderRadius: '12px 0 0 12px',
        transformOrigin: 'top',
      }}
    />
    {text}
  </motion.div>
);

/* ── Time Panel: has its OWN useInView so it fires when it scrolls into view ── */
const TimePanel = ({ icon, label, activities, accentColor, gradient, bg, panelIndex }) => {
  const ref = useRef(null);
  // once:false → re-animates every time this panel enters/exits the viewport
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const delay = panelIndex * 0.15; // Mattina: 0, Pomerriggio: 0.15, Sera: 0.30

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 45 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 45 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{
        y: -5,
        boxShadow: `0 18px 42px rgba(0,0,0,0.35), 0 0 22px ${accentColor}20`,
        borderColor: `${accentColor}50`,
        transition: { duration: 0.22 },
      }}
      style={{
        background: bg,
        border: `1px solid ${accentColor}22`,
        borderRadius: '18px',
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        flex: '1 1 280px',
        minWidth: '240px',
      }}
    >
      {/* Panel header */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
        transition={{ delay: delay + 0.1, duration: 0.4 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          paddingBottom: '0.8rem',
          borderBottom: `1px solid ${accentColor}25`,
          marginBottom: '0.2rem',
        }}
      >
        <motion.span
          initial={{ scale: 0, rotate: -25 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -25 }}
          transition={{ delay: delay + 0.15, type: 'spring', stiffness: 260, damping: 15 }}
          style={{ fontSize: '1.3rem', display: 'inline-block' }}
        >
          {icon}
        </motion.span>
        <span style={{
          fontFamily: 'var(--font-d)',
          fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase',
          background: gradient,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {label}
        </span>
      </motion.div>

      {/* Activity cards cascade in */}
      {activities.map((act, i) => (
        <ActivityCard
          key={i} index={i} text={act}
          accentColor={accentColor} gradient={gradient}
          panelInView={inView} panelDelay={delay + 0.2}
        />
      ))}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN ITINERARY DAY COMPONENT
   ══════════════════════════════════════════════════════ */
const ItineraryDay = ({ data, alignRight }) => {
  const {
    dayNum, city, title, accentColor, emoji, tagline, description, image,
    morningActivities, afternoonActivities, eveningActivities,
    uniqueElement, facts,
  } = data;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.06 });

  /* Per-city gradient that echoes the cityscape */
  const grad = `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`;
  const gradSoft = `linear-gradient(135deg, ${accentColor}60, ${accentColor}22)`;

  /* Subtle panel backgrounds (morning / afternoon / evening) */
  const bgM = `radial-gradient(ellipse at top left, ${accentColor}12 0%, rgba(255,255,255,0.01) 100%)`;
  const bgA = `radial-gradient(ellipse at top, ${accentColor}0c 0%, rgba(255,255,255,0.01) 100%)`;
  const bgE = `radial-gradient(ellipse at bottom right, ${accentColor}15 0%, rgba(255,255,255,0.015) 100%)`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        maxWidth: '1280px',
        margin: '0 auto 8rem auto',
        padding: '0 1.5rem',
      }}
    >
      {/* ────────────────────────────────────────
          1. PHOTO BANNER  (full width at top)
         ──────────────────────────────────────── */}
      <div style={{ position: 'relative', borderRadius: '24px 24px 0 0', overflow: 'hidden', height: '360px' }}>
        <motion.img
          src={image} alt={title} loading="lazy"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(to top, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.4) 40%, rgba(8,12,20,0.1) 100%),
            linear-gradient(to right, ${accentColor}22 0%, transparent 60%)
          `,
        }} />

        {/* Day badge */}
        <div style={{
          position: 'absolute', top: '1.5rem', left: '1.8rem',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: grad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1rem',
            color: '#fff',
            boxShadow: `0 0 25px ${accentColor}66, 0 0 0 2px rgba(255,255,255,0.15)`,
          }}>
            {dayNum}
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-d)', fontSize: '0.62rem',
              letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
            }}>
              Giorno {dayNum}
            </div>
            <div style={{
              fontFamily: 'var(--font-d)', fontSize: '0.75rem',
              letterSpacing: '2px', textTransform: 'uppercase',
              background: grad,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {city}
            </div>
          </div>
        </div>

        {/* Title block at image bottom */}
        <div style={{ position: 'absolute', bottom: '1.8rem', left: '1.8rem', right: '1.8rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-h)',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            lineHeight: 1.15,
            marginBottom: '0.4rem',
          }}>
            {title}
          </h2>
          <p style={{ fontFamily: 'var(--font-b)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0, fontStyle: 'italic' }}>
            {tagline}
          </p>
        </div>

        {/* Emoji on photo  */}
        <div style={{
          position: 'absolute', top: '1.3rem', right: '1.5rem',
          fontSize: '3rem', opacity: 0.85,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
        }}>{emoji}</div>
      </div>

      {/* ────────────────────────────────────────
          2. DESCRIPTION + FACTS bar
         ──────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, rgba(10,8,5,0.9), rgba(15,12,8,0.85))`,
        border: `1px solid ${accentColor}20`,
        borderTop: 'none',
        padding: '1.6rem 2rem',
        display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap',
      }}>
        <p style={{
          flex: '1 1 300px', fontFamily: 'var(--font-h)',
          fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.8,
          color: '#b8a890', margin: 0,
        }}>
          {description}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', alignSelf: 'center' }}>
          {facts.map((f, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-b)',
              fontSize: '0.68rem', fontWeight: 500,
              color: accentColor,
              background: `${accentColor}14`,
              border: `1px solid ${accentColor}30`,
              padding: '4px 12px', borderRadius: '20px',
              whiteSpace: 'nowrap', letterSpacing: '0.5px',
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────
          3. ACTIVITIES — 3-column grid layout
         ──────────────────────────────────────── */}
      <div style={{
        background: 'rgba(6,9,16,0.75)',
        border: `1px solid ${accentColor}18`,
        borderTop: 'none',
        padding: '2rem',
        display: 'flex',
        gap: '1.2rem',
        flexWrap: 'wrap',
      }}>
        <TimePanel
          icon="🌅" label="Mattina"
          activities={morningActivities}
          accentColor={accentColor}
          gradient={`linear-gradient(135deg, ${accentColor}, ${accentColor}55)`}
          bg={bgM}
          panelIndex={0}
          parentInView={isInView}
        />
        <TimePanel
          icon="☀️" label="Pomeriggio"
          activities={afternoonActivities}
          accentColor={accentColor}
          gradient={`linear-gradient(135deg, ${accentColor}dd, ${accentColor}44)`}
          bg={bgA}
          panelIndex={1}
          parentInView={isInView}
        />
        <TimePanel
          icon="🌙" label="Sera"
          activities={eveningActivities}
          accentColor={accentColor}
          gradient={`linear-gradient(135deg, ${accentColor}99, ${accentColor}22)`}
          bg={bgE}
          panelIndex={2}
          parentInView={isInView}
        />
      </div>

      {/* ────────────────────────────────────────
          4. UNIQUE EXPERIENCE — separate strip
         ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        style={{
          background: `linear-gradient(100deg, ${accentColor}22, ${accentColor}08 50%, transparent)`,
          border: `1px solid ${accentColor}30`,
          borderTop: `1px solid ${accentColor}15`,
          borderRadius: '0 0 24px 24px',
          padding: '1.4rem 2rem',
          display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
        }}
      >
        {/* Star badge */}
        <div style={{
          flexShrink: 0,
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
          boxShadow: `0 0 20px ${accentColor}55`,
        }}>
          ✦
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-d)', fontSize: '0.62rem',
            fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
            marginBottom: '5px',
            background: grad,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Esperienza Esclusiva del Giorno
          </div>
          <p style={{
            margin: 0, fontFamily: 'var(--font-h)',
            fontSize: '1.05rem', fontStyle: 'italic',
            color: '#c5b5a0', lineHeight: 1.7,
          }}>
            {uniqueElement.text}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default ItineraryDay;
