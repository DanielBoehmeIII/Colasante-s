import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import heroTransitionVideo from '../../animations/transitions/Hero-scrub.mp4';
import './Home.css';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.10 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`cs-stat-card ${visible ? 'cs-stat-card--visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className="cs-stat-value">{value}</span>
      <span className="cs-stat-label">{label}</span>
    </div>
  );
}

const OCCASIONS = [
  {
    id: 'birthday',
    label: 'Birthday',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 8c0-3 2-5 2-5s2 2 2 5-2 5-2 5-2-2-2-5z"/>
        <rect x="6" y="18" width="28" height="18" rx="3"/>
        <path d="M6 28h28"/>
        <path d="M12 18v-4a2 2 0 0 1 4 0v4M20 18v-4M24 18v-4a2 2 0 0 1 4 0v4"/>
      </svg>
    ),
    desc: "Make someone's day unforgettable with a stunning birthday bouquet crafted to their personality and favorite colors.",
    cta: 'Shop Birthday',
    color: '#fce8ee',
    accent: '#c86878',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="8"/>
        <path d="M20 12V8M20 32v-4M12 20H8M32 20h-4"/>
        <path d="M14.34 14.34l-2.83-2.83M28.49 28.49l-2.83-2.83M14.34 25.66l-2.83 2.83M28.49 11.51l-2.83 2.83"/>
      </svg>
    ),
    desc: 'From bridal bouquets to ceremony installations, we craft every piece to make your wedding day breathtaking.',
    cta: 'Plan Wedding Flowers',
    color: '#fdf6ec',
    accent: '#b8895a',
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 34S8 26 8 16a8 8 0 0 1 12-6.93A8 8 0 0 1 32 16c0 10-12 18-12 18z"/>
      </svg>
    ),
    desc: 'Celebrate another year of love with romantic roses, garden peonies, or a custom arrangement just for them.',
    cta: 'Shop Anniversary',
    color: '#fce8ec',
    accent: '#8b2635',
  },
  {
    id: 'sympathy',
    label: 'Sympathy',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="14" r="6"/>
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12"/>
        <path d="M20 8V6M14 10l-1.5-1.5M26 10l1.5-1.5"/>
      </svg>
    ),
    desc: 'Express compassion and comfort with thoughtfully arranged tributes, wreaths, and memorial pieces.',
    cta: 'Shop Sympathy',
    color: '#eef2ed',
    accent: '#6d7c5c',
  },
  {
    id: 'just-because',
    label: 'Just Because',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6c-7 0-12 4.5-12 10 0 8 12 18 12 18s12-10 12-18c0-5.5-5-10-12-10z"/>
        <path d="M20 14c-2 0-4 1.5-4 4s2 4 4 4 4-1.5 4-4-2-4-4-4z"/>
      </svg>
    ),
    desc: 'No occasion needed. Surprise someone you love with a fresh arrangement, simply because they deserve it.',
    cta: 'Shop Just Because',
    color: '#fef3e8',
    accent: '#c4784a',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="28" height="22" rx="2"/>
        <path d="M14 14v-4a6 6 0 0 1 12 0v4"/>
        <line x1="20" y1="22" x2="20" y2="28"/>
        <line x1="17" y1="25" x2="23" y2="25"/>
      </svg>
    ),
    desc: 'Premium floral arrangements for offices, hotel lobbies, galas, and corporate events — delivered on schedule.',
    cta: 'Corporate Inquiry',
    color: '#f0eeec',
    accent: '#6a5c50',
  },
];

const PRODUCTS = [
  {
    id: 'spring-meadow',
    name: 'Spring Meadow',
    desc: 'A soft lush mix of ranunculus, sweet peas, and seasonal greens in blush, ivory, and soft peach.',
    price: 'From $68',
    badge: 'Bestseller',
    bg: 'linear-gradient(155deg, #faedf2 0%, #f0d8e0 100%)',
  },
  {
    id: 'classic-dozen',
    name: 'Classic Dozen',
    desc: 'Twelve premium long-stem roses, hand-selected and elegantly wrapped with eucalyptus and ribbon.',
    price: 'From $95',
    badge: 'Classic',
    bg: 'linear-gradient(155deg, #fdf0ec 0%, #f5dbd4 100%)',
  },
  {
    id: 'garden-wildflower',
    name: 'Garden Wildflower',
    desc: 'Free-form and lush — lisianthus, cosmos, and foliage arranged in warm natural tones.',
    price: 'From $55',
    badge: 'Seasonal',
    bg: 'linear-gradient(155deg, #f8f0e8 0%, #ede0cc 100%)',
  },
  {
    id: 'orchid-garden',
    name: 'Orchid & Succulent',
    desc: 'A lasting statement piece: sculptural phalaenopsis orchids paired with curated succulents.',
    price: 'From $120',
    badge: 'Signature',
    bg: 'linear-gradient(155deg, #f0efee 0%, #e2dbd6 100%)',
  },
];

const SERVICES_PREVIEW = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4C10 4 6 8 6 14c0 7 10 14 10 14s10-7 10-14c0-6-4-10-10-10z"/>
        <path d="M16 10c-2 0-4 1.8-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/>
      </svg>
    ),
    title: 'Same-Day Delivery',
    desc: 'Order by noon for same-day delivery across Pittsburgh and surrounding neighborhoods.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 16l5-5 5 5 12-12"/>
        <path d="M22 4h6v6"/>
        <path d="M5 26h22"/>
      </svg>
    ),
    title: 'Custom Arrangements',
    desc: 'Work directly with our florists to design a piece that perfectly matches your vision and budget.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="10" r="5"/>
        <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"/>
        <path d="M20 20l4-4 4 4"/>
      </svg>
    ),
    title: 'Weddings & Events',
    desc: 'Full-service floral design for weddings, corporate galas, and styled events of any size.',
  },
];

export default function Home() {
  const pageRef = useReveal();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', occasion: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const heroContent = heroContentRef.current;
    const nav = document.querySelector<HTMLElement>('.hts-nav');
    if (!hero || !video) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      video.currentTime = 0;
      if (nav) {
        nav.style.opacity = '1';
        nav.style.transform = '';
        nav.style.pointerEvents = '';
      }
      return;
    }

    const root = document.getElementById('root');
    const rootOverflowY = root ? window.getComputedStyle(root).overflowY : 'visible';
    const rootCanScroll =
      root &&
      root.scrollHeight > root.clientHeight &&
      (rootOverflowY === 'auto' || rootOverflowY === 'scroll');
    const scrollContainer =
      rootCanScroll
        ? root
        : document.scrollingElement ?? document.documentElement;
    let frame = 0;

    const updateVideoTime = () => {
      frame = 0;

      const viewportHeight =
        scrollContainer === document.documentElement || scrollContainer === document.body
          ? window.innerHeight
          : scrollContainer.clientHeight;
      const scrollTop =
        scrollContainer === document.documentElement || scrollContainer === document.body
          ? window.scrollY
          : scrollContainer.scrollTop;
      const scrollRange = Math.max(hero.offsetHeight - viewportHeight, 1);
      const progress = Math.min(Math.max((scrollTop - hero.offsetTop) / scrollRange, 0), 1);

      if (heroContent) {
        const fadeProgress = Math.min(Math.max((progress - 0.08) / 0.28, 0), 1);
        const copyOpacity = 1 - fadeProgress;
        heroContent.style.setProperty('--hero-copy-opacity', copyOpacity.toFixed(3));
        heroContent.style.setProperty('--hero-copy-lift', `${(-18 * fadeProgress).toFixed(1)}px`);
        heroContent.style.pointerEvents = copyOpacity > 0.2 ? 'auto' : 'none';
      }

      if (nav) {
        const fadeOutProgress = Math.min(Math.max((progress - 0.08) / 0.28, 0), 1);
        const fadeInProgress = Math.min(Math.max((progress - 0.94) / 0.06, 0), 1);
        const navOpacity = Math.max(1 - fadeOutProgress, fadeInProgress);
        const navLift =
          fadeInProgress > 0
            ? -14 * (1 - fadeInProgress)
            : -14 * fadeOutProgress;

        nav.style.transition =
          'padding 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.12s linear, transform 0.12s linear';
        nav.style.opacity = navOpacity.toFixed(3);
        nav.style.transform = `translateY(${navLift.toFixed(1)}px)`;
        nav.style.pointerEvents = navOpacity > 0.25 ? 'auto' : 'none';
        nav.style.background =
          fadeInProgress > 0
            ? `rgba(250, 248, 245, ${(0.96 * fadeInProgress).toFixed(3)})`
            : 'transparent';
        nav.style.borderBottomColor = `rgba(110, 72, 52, ${(0.1 * fadeInProgress).toFixed(3)})`;
        nav.style.boxShadow = `0 2px 24px rgba(100, 60, 30, ${(0.07 * fadeInProgress).toFixed(3)})`;
        nav.style.backdropFilter =
          fadeInProgress > 0
            ? `blur(${(20 * fadeInProgress).toFixed(1)}px) saturate(${(1 + 0.3 * fadeInProgress).toFixed(2)})`
            : 'none';
        nav.style.setProperty(
          '-webkit-backdrop-filter',
          fadeInProgress > 0
            ? `blur(${(20 * fadeInProgress).toFixed(1)}px) saturate(${(1 + 0.3 * fadeInProgress).toFixed(2)})`
            : 'none',
        );
      }

      if (!video.duration || Number.isNaN(video.duration)) return;

      const targetTime = progress * Math.max(video.duration - 0.05, 0);

      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateVideoTime);
    };

    updateVideoTime();
    scrollContainer.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (heroContent) {
        heroContent.style.removeProperty('--hero-copy-opacity');
        heroContent.style.removeProperty('--hero-copy-lift');
        heroContent.style.pointerEvents = '';
      }
      if (nav) {
        nav.style.opacity = '';
        nav.style.transform = '';
        nav.style.pointerEvents = '';
        nav.style.transition = '';
        nav.style.background = '';
        nav.style.borderBottomColor = '';
        nav.style.boxShadow = '';
        nav.style.backdropFilter = '';
        nav.style.removeProperty('-webkit-backdrop-filter');
      }
      scrollContainer.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [videoReady]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const scrollToContact = () => {
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const scrollToOccasions = () => {
    setTimeout(() => document.getElementById('occasions')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="cs-page" ref={pageRef}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="cs-hero" ref={heroRef}>
        <div className="cs-hero-sticky">
          <video
            ref={videoRef}
            className={`cs-hero-video${videoReady ? ' cs-hero-video--ready' : ''}`}
            src={heroTransitionVideo}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
          />
          <div className="cs-hero-overlay" />

          <div className="cs-hero-content" ref={heroContentRef}>
            <div className="cs-hero-copy cs-hero-copy--left">
              <p className="eyebrow cs-hero-eyebrow animate-fade-in">Pittsburgh's Florist Since 1998</p>
              <h1 className="cs-hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Flowers for
              </h1>
              <h1 className="cs-hero-title cs-hero-title-em animate-fade-in" style={{ animationDelay: '0.14s' }}>
                Every Moment
              </h1>
            </div>

            <div className="cs-hero-copy cs-hero-copy--right">
              <p className="cs-hero-sub animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Custom arrangements crafted fresh daily from seasonal and imported blooms — delivered across Pittsburgh.
              </p>

              <div className="cs-hero-ctas animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <button className="btn-primary cs-hero-cta-primary" onClick={scrollToContact}>
                  Order Now
                </button>
                <button className="btn-secondary" onClick={scrollToOccasions}>
                  Browse Occasions
                </button>
              </div>

              <a href={`tel:${BUSINESS.phoneRaw}`} className="cs-hero-phone animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {BUSINESS.phone}
              </a>
            </div>
          </div>

          <div className="cs-hero-scroll animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="cs-hero-scroll-line" />
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      <div className="cs-stats">
        <div className="section-wrap cs-stats-inner">
          {BUSINESS.stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 90} />
          ))}
        </div>
      </div>

      {/* ── Browse by Occasion ───────────────────────────────────────────────── */}
      <section className="cs-section cs-occasions-section" id="occasions">
        <div className="section-wrap">
          <div className="cs-section-header reveal">
            <p className="eyebrow">Shop by Occasion</p>
            <h2 className="cs-section-title">Browse by Occasion</h2>
            <p className="cs-section-sub">
              Whether it's a birthday, a wedding, or just a Tuesday — we have the perfect flowers for every moment.
            </p>
          </div>

          <div className="cs-occasions-grid">
            {OCCASIONS.map((occ, i) => (
              <Link
                key={occ.id}
                to={`/${occ.id}`}
                className={`cs-occasion-card reveal reveal-delay-${Math.min(i + 1, 6)}`}
                style={{ '--occ-bg': occ.color, '--occ-accent': occ.accent } as React.CSSProperties}
              >
                <div className="cs-occasion-icon">{occ.icon}</div>
                <h3 className="cs-occasion-label">{occ.label}</h3>
                <div className="cs-occasion-hover">
                  <p className="cs-occasion-desc">{occ.desc}</p>
                  <span className="cs-occasion-cta">
                    {occ.cta}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fresh From Our Shop ──────────────────────────────────────────────── */}
      <section className="cs-section cs-products-section">
        <div className="section-wrap">
          <div className="cs-section-header reveal">
            <p className="eyebrow">Featured Arrangements</p>
            <h2 className="cs-section-title">Fresh From Our Shop</h2>
            <p className="cs-section-sub">
              Crafted by hand, assembled the morning of delivery — from seasonal and imported blooms.
            </p>
          </div>

          <div className="cs-products-grid">
            {PRODUCTS.map((p, i) => (
              <div key={p.id} className={`cs-product-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="cs-product-img" style={{ background: p.bg }}>
                  <span className="cs-product-badge">{p.badge}</span>
                  <div className="cs-product-img-floral" aria-hidden>
                    <svg viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="40" r="16" fill="rgba(139,38,53,0.12)"/>
                      <circle cx="40" cy="40" r="10" fill="rgba(139,38,53,0.18)"/>
                      <ellipse cx="40" cy="24" rx="6" ry="10" fill="rgba(200,104,120,0.25)" transform="rotate(0 40 40)"/>
                      <ellipse cx="40" cy="24" rx="6" ry="10" fill="rgba(200,104,120,0.20)" transform="rotate(60 40 40)"/>
                      <ellipse cx="40" cy="24" rx="6" ry="10" fill="rgba(200,104,120,0.22)" transform="rotate(120 40 40)"/>
                      <ellipse cx="40" cy="24" rx="6" ry="10" fill="rgba(200,104,120,0.18)" transform="rotate(180 40 40)"/>
                      <ellipse cx="40" cy="24" rx="6" ry="10" fill="rgba(200,104,120,0.20)" transform="rotate(240 40 40)"/>
                      <ellipse cx="40" cy="24" rx="6" ry="10" fill="rgba(200,104,120,0.22)" transform="rotate(300 40 40)"/>
                    </svg>
                  </div>
                </div>
                <div className="cs-product-body">
                  <h3 className="cs-product-name">{p.name}</h3>
                  <p className="cs-product-desc">{p.desc}</p>
                  <div className="cs-product-footer">
                    <span className="cs-product-price">{p.price}</span>
                    <button className="cs-product-cta" onClick={scrollToContact}>
                      Order
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Preview ─────────────────────────────────────────────────── */}
      <section className="cs-section cs-services-section">
        <div className="section-wrap">
          <div className="cs-section-header reveal">
            <p className="eyebrow">How We Serve You</p>
            <h2 className="cs-section-title">More Than Just Flowers</h2>
          </div>

          <div className="cs-services-grid">
            {SERVICES_PREVIEW.map((svc, i) => (
              <div key={svc.title} className={`cs-service-card reveal reveal-delay-${i + 1}`}>
                <div className="cs-service-icon">{svc.icon}</div>
                <h3 className="cs-service-title">{svc.title}</h3>
                <p className="cs-service-desc">{svc.desc}</p>
                <Link to="/services" className="cs-service-link">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Local Florist ────────────────────────────────────────────── */}
      <section className="cs-section cs-about-section">
        <div className="section-wrap">
          <div className="cs-about-inner">
            <div className="cs-about-text reveal">
              <p className="eyebrow">Our Story</p>
              <h2 className="cs-section-title">Pittsburgh's Florist,<br />Since 1998</h2>
              <p className="cs-about-body">
                Colasante's has been part of Pittsburgh's neighborhoods for over 25 years. We started as a small shop in Shadyside and grew because people kept coming back — not just for the flowers, but for the care we put into every arrangement.
              </p>
              <p className="cs-about-body">
                We source seasonally, work with trusted growers, and assemble every piece by hand the morning it leaves our shop. Whether it's a single stem or a full wedding installation, we bring the same attention to each.
              </p>
              <div className="cs-about-actions">
                <Link to="/about" className="btn-primary">
                  Our Story
                </Link>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-secondary">
                  Call Us
                </a>
              </div>
            </div>

            <div className="cs-about-visual reveal reveal-delay-2">
              <div className="cs-about-card cs-about-card-main depth-panel">
                <div className="cs-about-floral" aria-hidden>
                  <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="80" cy="100" rx="30" ry="50" fill="rgba(109,124,92,0.15)" transform="rotate(-15 80 100)"/>
                    <ellipse cx="80" cy="100" rx="25" ry="44" fill="rgba(109,124,92,0.12)" transform="rotate(15 80 100)"/>
                    <circle cx="80" cy="72" r="22" fill="rgba(139,38,53,0.14)"/>
                    <circle cx="80" cy="72" r="14" fill="rgba(139,38,53,0.20)"/>
                    <ellipse cx="80" cy="50" rx="8" ry="14" fill="rgba(200,104,120,0.30)" transform="rotate(0 80 72)"/>
                    <ellipse cx="80" cy="50" rx="8" ry="14" fill="rgba(200,104,120,0.26)" transform="rotate(60 80 72)"/>
                    <ellipse cx="80" cy="50" rx="8" ry="14" fill="rgba(200,104,120,0.28)" transform="rotate(120 80 72)"/>
                    <ellipse cx="80" cy="50" rx="8" ry="14" fill="rgba(200,104,120,0.25)" transform="rotate(180 80 72)"/>
                    <ellipse cx="80" cy="50" rx="8" ry="14" fill="rgba(200,104,120,0.27)" transform="rotate(240 80 72)"/>
                    <ellipse cx="80" cy="50" rx="8" ry="14" fill="rgba(200,104,120,0.26)" transform="rotate(300 80 72)"/>
                    <circle cx="80" cy="72" r="6" fill="rgba(196,149,106,0.6)"/>
                    <path d="M60 130 Q80 115 100 130" stroke="rgba(109,124,92,0.4)" strokeWidth="2" fill="none"/>
                    <path d="M50 145 Q80 128 110 145" stroke="rgba(109,124,92,0.3)" strokeWidth="1.5" fill="none"/>
                    <ellipse cx="55" cy="110" rx="12" ry="8" fill="rgba(109,124,92,0.18)" transform="rotate(-25 55 110)"/>
                    <ellipse cx="105" cy="115" rx="10" ry="7" fill="rgba(109,124,92,0.15)" transform="rotate(20 105 115)"/>
                  </svg>
                </div>
                <p className="cs-about-card-quote">"Every stem tells a story."</p>
              </div>
              <div className="cs-about-stats">
                {BUSINESS.stats.map(s => (
                  <div key={s.label} className="cs-about-stat">
                    <span className="cs-about-stat-value">{s.value}</span>
                    <span className="cs-about-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="cs-section cs-testimonials-section">
        <div className="section-wrap">
          <div className="cs-section-header reveal">
            <p className="eyebrow">Customer Reviews</p>
            <h2 className="cs-section-title">What Pittsburgh Says</h2>
          </div>

          <div className="cs-testimonials-grid">
            {BUSINESS.testimonials.map((t, i) => (
              <div key={t.name} className={`cs-testimonial-card depth-panel reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="cs-testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="cs-testimonial-text">"{t.text}"</p>
                <div className="cs-testimonial-author">
                  <span className="cs-testimonial-name">{t.name}</span>
                  <span className="cs-testimonial-loc">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      <section className="cs-section cs-contact-section" id="contact">
        <div className="section-wrap">
          <div className="cs-contact-inner">
            <div className="cs-contact-left reveal">
              <p className="eyebrow">Get in Touch</p>
              <h2 className="cs-section-title">Ready to Order<br />or Need Advice?</h2>
              <p className="cs-contact-sub">
                Call, email, or fill out the form. Our florists are happy to help you choose the right arrangement for any occasion.
              </p>

              <div className="cs-contact-methods">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="cs-contact-method">
                  <div className="cs-contact-method-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="cs-contact-method-label">Call or Text</span>
                    <span className="cs-contact-method-value">{BUSINESS.phone}</span>
                  </div>
                </a>

                <a href={`mailto:${BUSINESS.email}`} className="cs-contact-method">
                  <div className="cs-contact-method-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="cs-contact-method-label">Email Us</span>
                    <span className="cs-contact-method-value">{BUSINESS.email}</span>
                  </div>
                </a>

                <div className="cs-contact-method">
                  <div className="cs-contact-method-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className="cs-contact-method-label">Visit Us</span>
                    <span className="cs-contact-method-value">{BUSINESS.address.street}</span>
                    <span className="cs-contact-method-value cs-contact-method-value--dim">{BUSINESS.address.full}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs-contact-right reveal reveal-delay-2">
              {formSent ? (
                <div className="cs-form-success depth-panel">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3>Message Sent!</h3>
                  <p>We'll be in touch shortly. For immediate orders, call {BUSINESS.phone}.</p>
                </div>
              ) : (
                <form className="cs-form depth-panel" onSubmit={handleFormSubmit}>
                  <h3 className="cs-form-title">Send Us a Message</h3>

                  <div className="cs-form-row">
                    <div className="cs-form-group">
                      <label className="cs-form-label">Your Name</label>
                      <input
                        type="text"
                        className="cs-form-input"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="cs-form-group">
                      <label className="cs-form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="cs-form-input"
                        placeholder="(412) 000-0000"
                        value={formData.phone}
                        onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="cs-form-group">
                    <label className="cs-form-label">Email Address</label>
                    <input
                      type="email"
                      className="cs-form-input"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    />
                  </div>

                  <div className="cs-form-group">
                    <label className="cs-form-label">Occasion</label>
                    <select
                      className="cs-form-input cs-form-select"
                      value={formData.occasion}
                      onChange={e => setFormData(d => ({ ...d, occasion: e.target.value }))}
                      required
                    >
                      <option value="">Select an occasion...</option>
                      <option value="birthday">Birthday</option>
                      <option value="wedding">Wedding / Event</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="sympathy">Sympathy</option>
                      <option value="just-because">Just Because</option>
                      <option value="corporate">Corporate / Business</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>

                  <div className="cs-form-group">
                    <label className="cs-form-label">Tell Us About Your Order</label>
                    <textarea
                      className="cs-form-input cs-form-textarea"
                      placeholder="Describe your occasion, preferred colors, flowers, budget, and delivery date..."
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                    />
                  </div>

                  <button type="submit" className="btn-primary cs-form-submit">
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile sticky CTA */}
      <div className="cs-mobile-sticky">
        <a href={`tel:${BUSINESS.phoneRaw}`} className="cs-mobile-sticky-call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
          </svg>
          Call Now
        </a>
        <button className="cs-mobile-sticky-order" onClick={scrollToContact}>
          Order Flowers
        </button>
      </div>
    </div>
  );
}
