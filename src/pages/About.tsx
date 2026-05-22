import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './About.css';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const VALUES = [
  {
    title: 'Safety First',
    desc: 'Every job starts with a hazard assessment. We plan every cut before the saw starts — protecting your property, our crew, and everyone nearby.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Clean Job Sites',
    desc: 'We haul out every chip, log, and branch. When we leave, your property is cleaner than when we arrived — every single time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
      </svg>
    ),
  },
  {
    title: 'Fast Response',
    desc: "Storm doesn't wait for morning. We answer calls at night and on weekends — because tree emergencies don't follow a 9-to-5 schedule.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Honest Estimates',
    desc: 'You get a real number before any crew sets foot on your property. No bait-and-switch, no vague quotes that inflate on site.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: 'Respect for Property',
    desc: 'Your yard, garden, fence, and driveway matter. We use equipment and technique to protect your property throughout the entire job.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Heavy-Duty Mindset',
    desc: 'We invest in commercial-grade equipment because Pittsburgh terrain demands it. Hillside lots, tight access, steep grades — we come prepared.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const WHY_ROWS = [
  { label: 'Local crew', detail: 'Based in Finleyville, serving greater Pittsburgh' },
  { label: 'Fast arrival', detail: 'Short response windows, emergency-ready' },
  { label: 'Honest pricing', detail: 'Free estimates, clear quotes, no surprises' },
  { label: 'Full cleanup', detail: 'Logs, chips, debris hauled away standard' },
  { label: 'Fully insured', detail: 'Liability + workers\' comp on every job' },
  { label: 'Heavy equipment', detail: 'Commercial machinery for any job size' },
];

const ABOUT_STATS = [
  { value: '24/7', label: 'Emergency Response' },
  { value: '100%', label: 'Free Estimates' },
  { value: '1.3K+', label: 'Facebook Followers' },
  { value: 'PA', label: 'Local Service' },
];

export default function About() {
  const pageRef = useReveal();
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  return (
    <div className="hts-page abt-page" ref={pageRef}>
      <Navbar />

      <section className="abt-hero">
        <div className="abt-hero-bg" aria-hidden />
        <div className="abt-hero-content section-wrap">
          <div className="abt-hero-text animate-fade-in">
            <div className="abt-hero-badge">
              <span className="hts-hero-badge-dot" />
              Finleyville, PA · Est. Local
            </div>
            <h1 className="abt-hero-title">
              Local Tree Work.<br />
              <span className="abt-hero-title-accent">Heavy-Duty<br />Standards.</span>
            </h1>
            <p className="abt-hero-sub">
              We're the crew Pittsburgh-area homeowners call when the job is real — big trees, storm damage, steep terrain, and properties that need to be respected.
            </p>
          </div>
        </div>
        <div className="abt-hero-scroll">
          <div className="hts-scroll-line" />
        </div>
      </section>

      <section className="hts-section abt-story-section">
        <div className="section-wrap">
          <div className="abt-story-inner">
            <div className="abt-story-text reveal">
              <p className="eyebrow">Our Story</p>
              <h2 className="hts-section-title">Built in<br />Western PA</h2>
              <p className="abt-story-body">
                Heavy Tree Service LLC was built around one idea: do the job right the first time, leave the site clean, and stand behind the work. We serve Finleyville, the South Hills, Washington County, Allegheny County, and the broader Pittsburgh region — the terrain, weather, and homeowners we know best.
              </p>
              <p className="abt-story-body">
                Western Pennsylvania terrain is demanding. Steep hillside lots. Dense hardwoods. Storms that roll in fast off the Ohio Valley. We run commercial-grade equipment because this region requires it — and because the families and homeowners we work for deserve a crew that shows up prepared.
              </p>
              <p className="abt-story-body">
                Every estimate is free. Every job gets cleaned up. And when a storm hits at midnight, our phone is on.
              </p>
            </div>

            <div className="abt-story-visual reveal reveal-delay-2">
              <div className="abt-story-card depth-panel">
                <div className="abt-story-card-accent" />
                <div className="abt-story-card-content">
                  <img src="/logo.png" alt="Heavy Tree Service LLC" className="abt-story-logo" />
                  <p className="abt-story-quote">
                    "We treat every property like it's our own — because our reputation in this community depends on it."
                  </p>
                  <div className="abt-story-sig">
                    <span className="abt-story-sig-name">Heavy Tree Service LLC</span>
                    <span className="abt-story-sig-loc">Finleyville, PA</span>
                  </div>
                </div>
              </div>

              <div className="abt-story-chips">
                {BUSINESS.serviceArea.map((area, i) => (
                  <span key={area} className="hts-area-chip" style={{ animationDelay: `${i * 0.1}s` }}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="abt-stats-section">
        <div className="section-wrap">
          <div className="abt-stats-grid">
            {ABOUT_STATS.map((s, i) => (
              <div key={s.label} className={`abt-stat-item reveal reveal-delay-${i + 1}`}>
                <span className="abt-stat-value">{s.value}</span>
                <span className="abt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hts-section abt-values-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">What We Stand For</p>
            <h2 className="hts-section-title">Six Things We<br />Never Compromise On</h2>
          </div>

          <div className="abt-values-grid">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`abt-value-card depth-panel reveal reveal-delay-${Math.min((i % 3) + 1, 6)}`}>
                <div className="abt-value-icon">{v.icon}</div>
                <h3 className="abt-value-title">{v.title}</h3>
                <p className="abt-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hts-section abt-why-section">
        <div className="section-wrap">
          <div className="abt-why-inner">
            <div className="abt-why-left reveal">
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="hts-section-title">Why Heavy<br />Tree Service LLC</h2>
              <p className="abt-why-sub">
                There are other tree companies in the Pittsburgh area. Here's why customers in Finleyville, the South Hills, and Washington County keep calling us back.
              </p>
              <button className="btn-primary" onClick={scrollToContact}>
                Get a Free Estimate
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <div className="abt-why-list">
              {WHY_ROWS.map((r, i) => (
                <div key={r.label} className={`abt-why-row reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                  <div className="abt-why-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="abt-why-text">
                    <span className="abt-why-label">{r.label}</span>
                    <span className="abt-why-detail">{r.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hts-section abt-area-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">Where We Work</p>
            <h2 className="hts-section-title">Greater Pittsburgh<br />& Surrounding PA</h2>
            <p className="hts-section-sub">
              Based in Finleyville — fast arrival across the South Hills, Washington County, Allegheny County, and surrounding communities.
            </p>
          </div>

          <div className="abt-area-chips-wrap reveal reveal-delay-2">
            {BUSINESS.serviceArea.map((area, i) => (
              <div key={area} className="abt-area-chip-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {area}
              </div>
            ))}
            <div className="abt-area-chip-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              And More — Call to Confirm
            </div>
          </div>
        </div>
      </section>

      <section className="abt-cta-section">
        <div className="section-wrap">
          <div className="abt-cta-inner reveal">
            <div className="abt-cta-bg" aria-hidden />
            <div className="abt-cta-content">
              <p className="eyebrow">Let's Work Together</p>
              <h2 className="hts-section-title" style={{ marginBottom: 16 }}>
                Ready to Talk<br />About Your Job?
              </h2>
              <p className="abt-cta-sub">
                Free estimate. No pressure. Call us, text us, or fill out the form — we'll get back to you fast.
              </p>
              <div className="abt-cta-actions">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                  </svg>
                  Call {BUSINESS.phone}
                </a>
                <button className="btn-secondary" onClick={scrollToContact}>
                  Request Free Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div className="hts-mobile-sticky">
        <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-mobile-sticky-call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
          </svg>
          Call Now
        </a>
        <button className="hts-mobile-sticky-estimate" onClick={scrollToContact}>
          Free Estimate
        </button>
      </div>
    </div>
  );
}
