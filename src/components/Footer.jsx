import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 2rem 2rem 2rem',
      background: '#05020a',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-accent-gold)' }}>La Tua Avventura Italiana ti Aspetta</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 2rem auto', color: 'var(--color-text-muted)' }}>
          Preparati a vivere emozioni che porterai nel cuore per sempre. L'Italia non è solo un paese, è un sentimento.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button style={{
            padding: '1rem 2rem',
            background: 'transparent',
            border: '1px solid var(--color-accent)',
            color: 'var(--color-accent)',
            borderRadius: '30px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--color-accent)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-accent)';
          }}>
            Scarica Brochure
          </button>
          
          <button style={{
            padding: '1rem 2rem',
            background: 'var(--color-accent)',
            border: 'none',
            color: '#fff',
            borderRadius: '30px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
          >
            Prenota Ora
          </button>
        </div>

        <div style={{ 
          fontSize: '0.9rem', 
          color: 'rgba(255,255,255,0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px'
        }}>
          Realizzato con <Heart color="red" size={16} /> in Italia © {new Date().getFullYear()}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
