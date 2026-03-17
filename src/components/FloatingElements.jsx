import React from 'react';
import { motion } from 'framer-motion';

/* 
  Italian cultural symbols as inline SVG-based CSS elements
  Each floats with a different timing and path
*/

const italianSymbols = [
  // 🍕 Pizza slice top-left
  { id: 1, emoji: '🍕', top: '12%',  left: '7%',   size: 52, delay: 0,   dur: 14, tx: 15, ry: -10 },
  // 🛵 Vespa right
  { id: 2, emoji: '🛵', top: '38%',  left: '88%',  size: 60, delay: 2.5, dur: 18, tx: -12, ry: 8 },
  // 🫒 Olive branch top-right
  { id: 3, emoji: '🫒', top: '8%',   left: '80%',  size: 44, delay: 1,   dur: 12, tx: -8, ry: 15 },
  // 🍷 Wine glass left
  { id: 4, emoji: '🍷', top: '62%',  left: '5%',   size: 48, delay: 3,   dur: 16, tx: 18, ry: -12 },
  // 🏛️ Column bottom-left
  { id: 5, emoji: '🏛️', top: '78%',  left: '12%',  size: 56, delay: 4.5, dur: 22, tx: 10, ry: 6 },
  // 🎭 Masks
  { id: 6, emoji: '🎭', top: '20%',  left: '92%',  size: 50, delay: 1.5, dur: 15, tx: -14, ry: -8 },
  // 🌷 Flower
  { id: 7, emoji: '🌷', top: '85%',  left: '85%',  size: 40, delay: 5,   dur: 13, tx: -10, ry: 12 },
  // 🎻 Violin
  { id: 8, emoji: '🎻', top: '52%',  left: '40%',  size: 46, delay: 2,   dur: 20, tx: 6, ry: -6 },
  // ⛵ Boat
  { id: 9, emoji: '⛵', top: '90%',  left: '45%',  size: 44, delay: 6,   dur: 17, tx: 20, ry: -4 },
  // 🌿 Laurel
  { id: 10, emoji: '🌿', top: '30%', left: '2%',   size: 40, delay: 0.5, dur: 11, tx: 12, ry: 10 },
];

const FloatingElements = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}
  >
    {italianSymbols.map((s) => (
      <motion.div
        key={s.id}
        style={{
          position: 'absolute',
          top: s.top,
          left: s.left,
          fontSize: `${s.size}px`,
          lineHeight: 1,
          userSelect: 'none',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
        }}
        initial={{ opacity: 0, rotate: s.ry }}
        animate={{
          opacity: [0, 0.22, 0.14, 0.22, 0],
          y: [0, -s.tx, s.tx / 2, -s.tx * 0.7, 0],
          rotate: [s.ry, s.ry + 6, s.ry - 4, s.ry + 3, s.ry],
          scale: [0.9, 1, 0.95, 1.02, 0.9],
        }}
        transition={{
          duration: s.dur,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: s.delay,
        }}
      />
    ))}
  </div>
);

export default FloatingElements;
