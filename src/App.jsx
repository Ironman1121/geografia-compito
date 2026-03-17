import React, { useCallback, useMemo } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './App.css';
import Hero from './components/Hero';
import Itinerary from './components/Itinerary';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  const init = useCallback(async e => { await loadSlim(e); }, []);

  const opts = useMemo(() => ({
    background: { color: { value: 'transparent' } },
    fpsLimit: 50,
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
      modes:  { repulse: { distance: 60, duration: 0.3 } },
    },
    particles: {
      color: { value: ['#b8972a', '#c0341f', '#1c9e58', '#f2d06b', '#6090b0'] },
      links: { enable: false },
      move: { direction: 'top', enable: true, outModes: { default: 'out' }, random: true, speed: 0.3 },
      number: { density: { enable: true, area: 1200 }, value: 90 },
      opacity: { value: { min: 0.03, max: 0.30 }, animation: { enable: true, speed: 0.5, sync: false } },
      shape: { type: 'circle' },
      size:  { value: { min: 0.8, max: 2 } },
    },
    detectRetina: true,
  }), []);

  return (
    <>
      <div className="tricolore-bar" />
      <div className="noise" />

      <Particles
        id="tsparticles"
        init={init}
        options={opts}
        style={{ position: 'fixed', zIndex: 0, inset: 0, pointerEvents: 'none' }}
      />

      {/* Animated fog bands — enhanced visibility */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Bottom fog band */}
        <div style={{
          position: 'absolute', bottom: '12%', left: 0, width: '200%', height: '140px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(184,149,42,0.07) 20%, rgba(192,52,31,0.10) 40%, rgba(184,149,42,0.06) 60%, rgba(192,52,31,0.08) 80%, transparent 100%)',
          filter: 'blur(30px)',
          animation: 'fog-run 55s linear infinite',
        }} />
        {/* Middle fog band */}
        <div style={{
          position: 'absolute', top: '32%', left: 0, width: '200%', height: '110px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(10,92,58,0.06) 25%, rgba(21,88,160,0.08) 50%, rgba(10,92,58,0.05) 75%, transparent 100%)',
          filter: 'blur(38px)',
          animation: 'fog-run 85s linear infinite reverse',
        }} />
        {/* Top fog band */}
        <div style={{
          position: 'absolute', top: '8%', left: 0, width: '200%', height: '80px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(192,52,31,0.05) 30%, rgba(184,149,42,0.07) 55%, transparent 100%)',
          filter: 'blur(22px)',
          animation: 'fog-run 120s linear infinite',
        }} />
        {/* Bottom glow (Rome sunset) */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '240px',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(192,52,31,0.14) 0%, transparent 65%)',
          animation: 'glow-pulse 9s ease-in-out infinite',
        }} />
      </div>

      <main className="app-main">
        <Hero />
        <Itinerary />
        <Gallery />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}

export default App;
