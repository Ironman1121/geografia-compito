import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Data: multiple photos per city ── */
const photos = [
  // Roma
  { id: 1,  city: 'Roma',    label: 'Colosseo',             src: './images/g1.jpg' },
  { id: 2,  city: 'Roma',    label: 'Piazza Navona',        src: './images/g2.jpg' },
  { id: 3,  city: 'Roma',    label: 'Vaticano',             src: './images/g3.jpg' },
  // Firenze
  { id: 4,  city: 'Firenze', label: 'Duomo di Firenze',     src: './images/g4.jpg' },
  { id: 5,  city: 'Firenze', label: 'Ponte Vecchio',        src: './images/g5.jpg' },
  { id: 6,  city: 'Firenze', label: 'Piazzale',             src: './images/g6.jpg' },
  // Venezia
  { id: 7,  city: 'Venezia', label: 'Canal Grande',         src: './images/g7.jpg' },
  { id: 8,  city: 'Venezia', label: 'Gondola',              src: './images/g8.jpg' },
  { id: 9,  city: 'Venezia', label: 'San Marco',            src: './images/g9.jpg' },
  // Milano
  { id: 10, city: 'Milano',  label: 'Duomo di Milano',      src: './images/g10.jpg' },
  { id: 11, city: 'Milano',  label: 'Galleria Vittorio',    src: './images/g11.jpg' },
  { id: 12, city: 'Milano',  label: 'Navigli',              src: './images/g12.jpg' },
  // Amalfi
  { id: 13, city: 'Amalfi',  label: 'Positano',             src: './images/g13.jpg' },
  { id: 14, city: 'Amalfi',  label: 'Costiera',             src: './images/g14.jpg' },
  { id: 15, city: 'Amalfi',  label: 'Ravello',              src: './images/g15.jpg' },
  // Matera
  { id: 16, city: 'Matera',  label: 'I Sassi',              src: './images/g16.jpg' },
  { id: 17, city: 'Matera',  label: 'Città Vecchia',        src: './images/g17.jpg' },
  // Sicilia
  { id: 18, city: 'Sicilia', label: 'Taormina',             src: './images/g18.jpg' },
  { id: 19, city: 'Sicilia', label: 'Etna',                 src: './images/g19.jpg' },
  { id: 20, city: 'Sicilia', label: 'Cefalù',               src: './images/g20.jpg' },
];

const filters = [
  { key: 'Tutto',   color: 'var(--oro)',       grd: 'linear-gradient(135deg,var(--oro-l),var(--oro))' },
  { key: 'Roma',    color: 'var(--c-roma)',    grd: 'linear-gradient(135deg,#ff6b5b,var(--c-roma))' },
  { key: 'Firenze', color: 'var(--c-firenze)', grd: 'linear-gradient(135deg,#f5d27a,var(--c-firenze))' },
  { key: 'Venezia', color: 'var(--c-venezia)', grd: 'linear-gradient(135deg,#5fa8e0,var(--c-venezia))' },
  { key: 'Milano',  color: 'var(--c-milano)',  grd: 'linear-gradient(135deg,#b090e0,var(--c-milano))' },
  { key: 'Amalfi',  color: 'var(--c-amalfi)',  grd: 'linear-gradient(135deg,#60d095,var(--c-amalfi))' },
  { key: 'Matera',  color: 'var(--c-matera)',  grd: 'linear-gradient(135deg,#d4b870,var(--c-matera))' },
  { key: 'Sicilia', color: 'var(--c-sicilia)', grd: 'linear-gradient(135deg,#ff8060,var(--c-sicilia))' },
];

/* ── Lightbox overlay ── */
const Lightbox = ({ photo, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.92)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', cursor: 'zoom-out',
    }}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={e => e.stopPropagation()}
      style={{ position: 'relative', maxWidth: '800px', width: '100%' }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        style={{ width: '100%', borderRadius: '16px', display: 'block', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
      />
      <div style={{
        position: 'absolute', bottom: '1.2rem', left: '1.5rem',
        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
        padding: '8px 16px', borderRadius: '8px',
      }}>
        <span style={{ fontFamily: 'var(--font-d)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{photo.city} — </span>
        <span style={{ fontFamily: 'var(--font-h)', fontStyle: 'italic', fontSize: '1.1rem', color: '#fff' }}>{photo.label}</span>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }} 
        style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '40px', height: '40px', borderRadius: '50%',
          background: '#000', border: '2px solid rgba(255,255,255,0.8)',
          color: '#fff', fontSize: '1rem', cursor: 'pointer', lineHeight: 1,
          zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        ✕
      </button>
    </motion.div>
  </motion.div>
);

/* ── Gallery Grid Card ── */
const GalleryCard = ({ photo, onClick }) => (
  <div
    onClick={() => onClick(photo)}
    className="gallery-card"
    style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'zoom-in',
      aspectRatio: '4 / 3',
      background: '#111',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.03)';
      e.currentTarget.style.zIndex = '5';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      const overlay = e.currentTarget.querySelector('.hover-overlay');
      if(overlay) overlay.style.opacity = '1';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.zIndex = '1';
      e.currentTarget.style.boxShadow = 'none';
      const overlay = e.currentTarget.querySelector('.hover-overlay');
      if(overlay) overlay.style.opacity = '0';
    }}
  >
    <img
      src={photo.src}
      alt={photo.label}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
    />
    {/* Hover overlay */}
    <div
      className="hover-overlay"
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '1rem',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div style={{ fontFamily: 'var(--font-d)', fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '3px' }}>
        {photo.city}
      </div>
      <div style={{ fontFamily: 'var(--font-h)', fontStyle: 'italic', fontSize: '1.1rem', color: '#fff', lineHeight: 1.2 }}>
        {photo.label}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   MAIN GALLERY COMPONENT
   ══════════════════════════════════════════ */
const Gallery = () => {
  const [active, setActive] = useState('Tutto');
  const [lightbox, setLightbox] = useState(null);

  const activeFilter = filters.find(f => f.key === active) || filters[0];
  const visible = active === 'Tutto' ? photos : photos.filter(p => p.city === active);

  return (
    <section id="galleria" style={{ padding: '6rem 0', position: 'relative' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}>
        <p style={{
          fontFamily: 'var(--font-b)', fontWeight: 500,
          fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: 'var(--oro-l)', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
        }}>
          <span style={{ display: 'block', width: '30px', height: '1px', background: 'var(--oro)' }} />
          Immagini del Viaggio
          <span style={{ display: 'block', width: '30px', height: '1px', background: 'var(--oro)' }} />
        </p>
        <h2 style={{
          fontFamily: 'var(--font-h)', fontStyle: 'italic', fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.8rem',
          color: '#fff',
        }}>
          Galleria Fotografica
        </h2>
        <p style={{ fontFamily: 'var(--font-h)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(200,180,155,0.7)', maxWidth: '520px', margin: '0 auto' }}>
          Ogni scatto racconta un'emozione. Filtra per città e lasciati trasportare.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px',
        justifyContent: 'center', padding: '0 2rem',
        marginBottom: '3rem',
      }}>
        {filters.map(f => {
          const isActive = active === f.key;
          return (
            <motion.button
              key={f.key}
              onClick={() => setActive(f.key)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.55rem 1.4rem',
                borderRadius: '50px',
                fontFamily: 'var(--font-d)',
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                cursor: 'pointer',
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                background: isActive ? f.grd : 'rgba(255,255,255,0.03)',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                boxShadow: isActive ? `0 6px 24px ${f.color}55` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {f.key}
            </motion.button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {visible.map(photo => (
            <GalleryCard key={photo.id} photo={photo} onClick={setLightbox} />
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', padding: '4rem', fontFamily: 'var(--font-h)', fontStyle: 'italic', fontSize: '1.3rem' }}>
            Nessuna foto disponibile per questa città.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
