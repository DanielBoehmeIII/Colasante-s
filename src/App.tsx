import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import ServiceDetail from './pages/ServiceDetail';

function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#faf8f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '2rem',
          fontWeight: 400,
          letterSpacing: '0.12em',
          color: '#8b2635',
          animation: 'loaderPulse 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        Colasante's
      </span>
    </div>
  );
}

function ScrollToHash() {
  const { hash } = window.location;
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [hash]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <LoadingOverlay visible={loading} />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/:slug" element={<ServiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
