import React from 'react';
import { motion } from 'framer-motion';

const days = [
  { day: 1, city: 'Roma',               accent: '#b5191e', emoji: '🏟️', cost: 120, note: 'Colosseo + cena Trastevere' },
  { day: 2, city: 'Firenze',            accent: '#c8860a', emoji: '🎨', cost: 150, note: 'Uffizi + workshop + cena' },
  { day: 3, city: 'Venezia',            accent: '#1c6f9b', emoji: '🚣', cost: 180, note: 'Gondola + Murano + Burano' },
  { day: 4, city: 'Milano',             accent: '#7c5cbf', emoji: '🏙️', cost: 140, note: 'Duomo + Ultima Cena + Aperitivo' },
  { day: 5, city: 'Costiera Amalfitana',accent: '#1e8c5f', emoji: '🍋', cost: 200, note: 'Barca privata + Ravello + lezione cucina' },
  { day: 6, city: 'Matera',             accent: '#a08040', emoji: '🪨', cost: 110, note: 'Sassi + grotta-hotel esclusivo' },
  { day: 7, city: 'Taormina · Sicilia', accent: '#c04020', emoji: '🌋', cost: 160, note: 'Teatro Greco + Etna + degustazione Etna DOC' },
];

const total = days.reduce((a, d) => a + d.cost, 0);

const Pricing = () => (
  <section id="prezzi" style={{ padding: '6rem 2rem', position: 'relative' }}>

    {/* Divider with Italian flag colors */}
    <div style={{ display: 'flex', maxWidth: '800px', margin: '0 auto 5rem auto', gap: '4px' }}>
      {['#009246', '#ffffff', '#ce2b37'].map((c, i) => (
        <div key={i} style={{ flex: 1, height: '2px', background: c, opacity: 0.6, borderRadius: '2px' }} />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9 }}
      style={{ maxWidth: '820px', margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--oro)', letterSpacing: '4px',
          textTransform: 'uppercase', fontSize: '0.75rem',
          marginBottom: '0.8rem'
        }}>
          Riepilogo Economico
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>
          Budgeting del Viaggio
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Stime per persona · include attività, alloggi medi e pasti · voli esclusi
        </p>
      </div>

      {/* Ticket-style card */}
      <div style={{
        background: 'rgba(15, 6, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,160,23,0.2)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,215,100,0.06)',
      }}>
        {/* Ticket top notch */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(196,82,26,0.08))',
          borderBottom: '1px dashed rgba(212,160,23,0.25)',
          padding: '1.2rem 2.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--oro)', fontSize: '0.75rem', letterSpacing: '3px' }}>
            BIGLIETTO D'ITINERARIO
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
            7 GIORNI · PRIMAVERA 2025
          </div>
        </div>

        {/* Day rows */}
        <div style={{ padding: '1rem 0' }}>
          {days.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 1.6fr 1fr auto',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 2.2rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = `${d.accent}0a`}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Day circle */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: `${d.accent}33`, border: `1px solid ${d.accent}66`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700,
                color: d.accent,
              }}>
                {d.day}
              </div>

              {/* City name */}
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '1rem', fontFamily: 'var(--font-heading)', color: '#e8d8c0',
                }}>
                  <span>{d.emoji}</span> {d.city}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                  {d.note}
                </div>
              </div>

              {/* Cost bar */}
              <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(d.cost / 220) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.6 }}
                  style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    borderRadius: '2px',
                    background: `linear-gradient(90deg, ${d.accent}, ${d.accent}88)`,
                  }}
                />
              </div>

              {/* Price */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem', fontWeight: 700,
                color: d.accent,
                textAlign: 'right',
              }}>
                €{d.cost}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          style={{
            borderTop: '1px solid rgba(212,160,23,0.25)',
            padding: '1.8rem 2.2rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'rgba(212,160,23,0.06)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', color: 'var(--oro)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Totale Stimato
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '4px' }}>
              Per persona · 7 notti incluse · escursioni comprese
            </div>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 0 30px rgba(212,160,23,0.55)',
          }}>
            €{total}
          </div>
        </motion.div>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
        * I prezzi sono stime indicative in alta stagione. I voli internazionali e le spese personali non sono inclusi.
      </p>
    </motion.div>
  </section>
);

export default Pricing;
