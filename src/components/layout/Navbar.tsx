import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BUSINESS } from '../../data/business';
import './Navbar.css';

const SERVICE_SLUGS = [
  'tree-removal',
  'storm-cleanup',
  'stump-grinding',
  'tree-pruning',
  'land-clearing',
  'landscaping',
];

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
];

function isActiveLink(path: string, currentPathname: string): boolean {
  if (path === '/') return currentPathname === '/';
  return currentPathname.startsWith(path);
}

function scrollToHash(hash: string) {
  setTimeout(() => {
    const id = hash.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 150);
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (path: string) => {
    setMenuOpen(false);
    const isServicePage = SERVICE_SLUGS.some(s => location.pathname === `/${s}`);
    if (path === '/#contact') {
      if (location.pathname === '/' || isServicePage) {
        scrollToHash('contact');
        if (isServicePage) navigate('/');
      } else {
        navigate('/');
        scrollToHash('contact');
      }
      return;
    }
    if (path === '/#work') {
      if (location.pathname === '/') {
        scrollToHash('work');
      } else {
        navigate('/');
        scrollToHash('work');
      }
      return;
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPath = location.pathname;

  return (
    <>
      <header className={['hts-nav', scrolled ? 'hts-nav--scrolled' : ''].join(' ')}>
        <button className="hts-nav-logo" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}>
          <span className="hts-nav-logo-text">{BUSINESS.name}</span>
        </button>

        <nav className="hts-nav-links">
          {NAV_LINKS.map(link => (
            <button
              key={link.path}
              className={['hts-nav-link', isActiveLink(link.path, currentPath) ? 'hts-nav-link--active' : ''].join(' ')}
              onClick={() => handleNav(link.path)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hts-nav-actions">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-nav-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
            </svg>
            {BUSINESS.phone}
          </a>
          <button className="hts-nav-cta" onClick={() => handleNav('/#contact')}>
            Order Now
          </button>
          <button
            className="hts-nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </header>

      <div className={['hts-mobile-menu', menuOpen ? 'hts-mobile-menu--open' : ''].join(' ')}>
        {NAV_LINKS.map(link => (
          <button
            key={link.path}
            className="hts-mobile-link"
            onClick={() => handleNav(link.path)}
          >
            {link.label}
          </button>
        ))}
        <button className="hts-mobile-link" onClick={() => handleNav('/#contact')}>
          Contact
        </button>
        <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-mobile-phone">
          Call {BUSINESS.phone}
        </a>
      </div>
    </>
  );
}
