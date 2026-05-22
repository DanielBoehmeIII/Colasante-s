import { useNavigate } from 'react-router-dom';
import { BUSINESS } from '../../data/business';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHash = (hash: string) => {
    navigate('/');
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <footer className="hts-footer">
      <div className="hts-footer-inner section-wrap">
        <div className="hts-footer-brand">
          <span className="hts-footer-wordmark">{BUSINESS.name}</span>
          <p className="hts-footer-tagline">{BUSINESS.tagline}</p>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-footer-phone">
            {BUSINESS.phone}
          </a>
          <div className="hts-footer-social">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="hts-footer-social-link" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="hts-footer-social-link" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="hts-footer-links">
          <p className="hts-footer-col-title">Navigate</p>
          <button className="hts-footer-link" onClick={() => handleNav('/')}>Home</button>
          <button className="hts-footer-link" onClick={() => handleNav('/services')}>Services</button>
          <button className="hts-footer-link" onClick={() => handleNav('/about')}>About</button>
          <button className="hts-footer-link" onClick={() => handleHash('contact')}>Contact</button>
        </div>

        <div className="hts-footer-services">
          <p className="hts-footer-col-title">Shop</p>
          <button className="hts-footer-service-item" onClick={() => handleNav('/fresh-arrangements')}>Fresh Arrangements</button>
          <button className="hts-footer-service-item" onClick={() => handleNav('/weddings')}>Weddings & Events</button>
          <button className="hts-footer-service-item" onClick={() => handleNav('/custom-designs')}>Custom Designs</button>
          <button className="hts-footer-service-item" onClick={() => handleNav('/same-day-delivery')}>Same-Day Delivery</button>
          <button className="hts-footer-service-item" onClick={() => handleNav('/subscriptions')}>Weekly Subscriptions</button>
        </div>

        <div className="hts-footer-contact">
          <p className="hts-footer-col-title">Contact</p>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-footer-contact-item">
            {BUSINESS.phone}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="hts-footer-contact-item">
            {BUSINESS.email}
          </a>
          <p className="hts-footer-contact-item">{BUSINESS.address.street}</p>
          <p className="hts-footer-contact-item">{BUSINESS.address.full}</p>
        </div>
      </div>

      <div className="hts-footer-bottom">
        <p>© {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.address.full} · All rights reserved</p>
        <p className="hts-footer-bottom-right">
          Delivering fresh flowers across Pittsburgh &amp; surrounding neighborhoods
        </p>
      </div>
    </footer>
  );
}
