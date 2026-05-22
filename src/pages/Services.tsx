import { useState, useEffect, useRef, type ReactElement } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Services.css';

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

type IconId = 'tree' | 'scissors' | 'zap' | 'disc' | 'mountain' | 'sprout';

const ICONS: Record<IconId, ReactElement> = {
  tree: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12M12 12L8 8M12 12L16 8M8 8L4 4M16 8L20 4M4 4h16"/>
      <path d="M7 12H5l7-8 7 8h-2"/>
    </svg>
  ),
  scissors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  disc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 20 9 4 15 14 19 8 21 20 3 20"/>
    </svg>
  ),
  sprout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10M10 20c5.5-2.5 7-5.5 7-11V2c-4 0-6.5 1.5-7.5 4C8 2 5 2 2 2v7c0 5.5 1.5 8.5 8 11z"/>
    </svg>
  ),
};

const SERVICE_URLS: Record<string, string> = {
  'tree-removal': '/tree-removal',
  'pruning': '/tree-pruning',
  'emergency': '/storm-cleanup',
  'stump': '/stump-grinding',
  'land-clearing': '/land-clearing',
  'landscaping': '/landscaping',
};

const SERVICES_EXT = [
  {
    id: 'tree-removal',
    title: 'Tree Removal',
    eyebrow: 'Any Size. Any Terrain.',
    icon: 'tree' as IconId,
    desc: 'Safe, efficient removal of trees of any size — from backyard maples to multi-story oaks. We use commercial-grade rigging and equipment built for Pittsburgh\'s hillside terrain, protecting your property through every stage.',
    useCases: [
      'Dead or dying trees posing an immediate fall risk',
      'Trees crowding structures, fences, or utility lines',
      'Storm-split trunks and hazard trees needing urgent removal',
      'Lot clearing for development or landscaping projects',
    ],
    safetyNote: 'Fully insured with complete liability and workers\' comp — every job is protected from start to cleanup.',
  },
  {
    id: 'pruning',
    title: 'Tree Pruning',
    eyebrow: 'Precision Over Brute Force.',
    icon: 'scissors' as IconId,
    desc: 'Expert crown shaping, deadwood removal, and limb reduction that improves tree health, reduces storm risk, and enhances the look of your property. Done with proper technique — no stub cuts, no bark stripping.',
    useCases: [
      'Branches overhanging rooflines, fences, or roadways',
      'Crown thinning to reduce wind load and storm damage risk',
      'Deadwood removal before major weather events',
      'Seasonal health pruning for ornamental and fruit trees',
    ],
    safetyNote: 'ISA-standard pruning practices — cuts made at the correct collar for clean healing and long-term health.',
  },
  {
    id: 'emergency',
    title: 'Emergency Storm Cleanup',
    eyebrow: '24/7. Night or Day.',
    icon: 'zap' as IconId,
    desc: 'When a storm hits, every minute counts. We respond around the clock to downed trees, hanging widow makers, storm-split trunks, and debris blocking access — fast arrival, safe removal, full cleanup.',
    useCases: [
      'Trees down on roofs, vehicles, or structures',
      'Limbs blocking driveways, roads, or emergency access',
      'Hanging limbs (widow makers) posing immediate danger',
      'Weekend, holiday, and overnight emergency response',
    ],
    safetyNote: 'Available 24 hours, 365 days — call (412) 805-2662 and we respond. No emergency surcharge on most calls.',
  },
  {
    id: 'stump',
    title: 'Stump Grinding',
    eyebrow: 'Below Grade. No Trace.',
    icon: 'disc' as IconId,
    desc: 'Complete stump elimination using commercial grinding equipment. We grind below grade so there\'s no regrowth, no tripping hazard, and no eyesore — just clean, usable ground ready for whatever comes next.',
    useCases: [
      'Stumps left from previous tree removal',
      'Reclaiming lawn and planting space',
      'Eliminating pest habitat and tripping hazards',
      'Preparing sites for construction, sod, or landscaping',
    ],
    safetyNote: 'Ground below grade — no regrowth guaranteed. Chips can be left for mulch or hauled away at your choice.',
  },
  {
    id: 'land-clearing',
    title: 'Land Clearing',
    eyebrow: 'Full-Site. Heavy Equipment.',
    icon: 'mountain' as IconId,
    desc: 'Full property clearing for construction, development, or reclamation. Brush, trees, stumps, and debris handled completely — from single lots to multi-acre sites across Western PA.',
    useCases: [
      'Building lots being prepped for construction',
      'Overgrown acreage being returned to use',
      'Agricultural land clearing and fence line cleanup',
      'Commercial development site prep',
    ],
    safetyNote: 'Commercial machinery capable of handling the heaviest clearing work — acreage jobs welcome.',
  },
  {
    id: 'landscaping',
    title: 'Landscaping Cleanup',
    eyebrow: 'Cleaner Than We Found It.',
    icon: 'sprout' as IconId,
    desc: 'Beyond removal — we help shape and finish your outdoor space. Grading, brush clearing, debris hauling, and site finishing so your property looks great when we leave.',
    useCases: [
      'Post-removal site grading and finishing',
      'Brush removal and property boundary cleanup',
      'Seasonal debris hauling and yard cleanup',
      'Finishing work following land clearing or construction',
    ],
    safetyNote: 'We haul out everything — chips, logs, brush. Site left clean and ready.',
  },
];

const FEATURE_ROWS = [
  { label: 'Emergency Response', sub: 'Available 24/7 year-round' },
  { label: 'Residential Jobs', sub: 'Backyards to full property lots' },
  { label: 'Large Tree Removal', sub: 'Commercial-grade rigging' },
  { label: 'Cleanup Included', sub: 'Full debris haul-out standard' },
  { label: 'Free Estimates', sub: 'No obligation, no pressure' },
  { label: 'Fully Insured', sub: 'Liability + workers\' comp' },
];

const FAQ_ITEMS = [
  {
    q: 'Do you offer emergency tree service?',
    a: 'Yes — Heavy Tree Service is available 24/7 for emergency situations. Storm damage, downed trees on structures, hanging widow makers — call us any time at (412) 805-2662 and we respond fast. No emergency surcharge on most calls.',
  },
  {
    q: 'Do you remove stumps?',
    a: 'Absolutely. We offer professional stump grinding that eliminates stumps below grade level using commercial grinding equipment. No regrowth, no trace — just clean, usable ground ready for lawn, planting, or whatever you have planned.',
  },
  {
    q: 'Are estimates free?',
    a: "Yes — every estimate we give is 100% free with zero obligation. We'll assess your property, give you an honest price, and let you decide. No high-pressure sales tactics, no surprise fees.",
  },
  {
    q: 'What areas do you serve?',
    a: "We're based in Finleyville, PA and serve the greater Pittsburgh region — South Hills, Washington County, Allegheny County, and surrounding PA communities. Most jobs have no distance surcharge. Call to confirm your location.",
  },
  {
    q: 'Can you handle storm damage?',
    a: 'Storm response is one of our core specialties. We handle downed trees, split trunks, widow makers, and full debris cleanup — available nights, weekends, and holidays. If it\'s a hazard, we can get there.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`svc-faq-item ${open ? 'svc-faq-item--open' : ''}`}>
      <button className="svc-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <svg className="svc-faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className="svc-faq-a">
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const pageRef = useReveal();
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150);
  };

  return (
    <div className="hts-page svc-page" ref={pageRef}>
      <Navbar />

      <section className="svc-hero">
        <div className="svc-hero-bg" aria-hidden />
        <div className="svc-hero-rings" aria-hidden>
          <div className="svc-ring svc-ring-1" />
          <div className="svc-ring svc-ring-2" />
          <div className="svc-ring svc-ring-3" />
        </div>

        <div className="svc-hero-content section-wrap">
          <div className="svc-hero-text animate-fade-in">
            <div className="svc-hero-badge">
              <span className="hts-hero-badge-dot" />
              Fully Insured · Pittsburgh, PA
            </div>
            <h1 className="svc-hero-title">
              Tree Care<br />
              <span className="svc-hero-title-accent">Built for<br />Heavy Jobs</span>
            </h1>
            <p className="svc-hero-sub">
              Safe removals, storm response, precision pruning, stump grinding, land clearing, and complete site cleanup — built for South Hills terrain.
            </p>
            <div className="svc-hero-ctas">
              <button className="btn-primary" onClick={scrollToContact}>
                Request Free Estimate
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                </svg>
                {BUSINESS.phone}
              </a>
            </div>
          </div>

          <div className="svc-hero-badge-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {[
              { v: '24/7', l: 'Emergency Response' },
              { v: '100%', l: 'Free Estimates' },
              { v: '6+', l: 'Core Services' },
              { v: 'PA', l: 'Local Crew' },
            ].map(s => (
              <div key={s.l} className="svc-hero-stat">
                <span className="svc-hero-stat-val">{s.v}</span>
                <span className="svc-hero-stat-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hts-section svc-services-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">What We Do</p>
            <h2 className="hts-section-title">Every Service,<br />Done Right</h2>
            <p className="hts-section-sub">
              Six core services handled by a local crew that treats every job — big or small — with the same equipment and standard of care.
            </p>
          </div>

          <div className="svc-cards-grid">
            {SERVICES_EXT.map((s, i) => (
              <div
                key={s.id}
                className={`svc-card depth-panel reveal reveal-delay-${Math.min((i % 3) + 1, 6)}`}
              >
                <div className="svc-card-header">
                  <div className="svc-card-icon">{ICONS[s.icon]}</div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 4 }}>{s.eyebrow}</p>
                    <h3 className="svc-card-title">{s.title}</h3>
                  </div>
                </div>
                <p className="svc-card-desc">{s.desc}</p>

                <div className="svc-card-uses">
                  <p className="svc-card-uses-label">Ideal For</p>
                  <ul className="svc-card-uses-list">
                    {s.useCases.map(uc => (
                      <li key={uc}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="svc-card-trust">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>{s.safetyNote}</span>
                </div>

                <Link to={SERVICE_URLS[s.id] || '#'} className="btn-primary svc-card-cta">
                  View Service Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-features-section">
        <div className="section-wrap">
          <div className="svc-features-inner">
            <div className="svc-features-label reveal">
              <p className="eyebrow">Our Standard</p>
              <h2 className="hts-section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: 0 }}>
                What Every Job<br />Includes
              </h2>
            </div>
            <div className="svc-features-grid">
              {FEATURE_ROWS.map((f, i) => (
                <div key={f.label} className={`svc-feature-row reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                  <div className="svc-feature-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="svc-feature-text">
                    <span className="svc-feature-label">{f.label}</span>
                    <span className="svc-feature-sub">{f.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hts-section svc-faq-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">Common Questions</p>
            <h2 className="hts-section-title">Before You Call</h2>
          </div>

          <div className="svc-faq-list">
            {FAQ_ITEMS.map(item => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="svc-cta-section">
        <div className="section-wrap">
          <div className="svc-cta-inner reveal">
            <div className="svc-cta-bg" aria-hidden />
            <div className="svc-cta-content">
              <p className="eyebrow">Ready to Start?</p>
              <h2 className="hts-section-title" style={{ marginBottom: 12 }}>
                Get Your Free<br />Estimate Today
              </h2>
              <p className="svc-cta-sub">
                Call, text, or fill out the form. Fast response — and if it's an emergency, we're available right now.
              </p>
              <div className="svc-cta-actions">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                  </svg>
                  Call {BUSINESS.phone}
                </a>
                <button className="btn-secondary" onClick={scrollToContact}>
                  Request Online Estimate
                </button>
              </div>
              <div className="svc-cta-emergency">
                <span className="hts-emergency-dot" />
                <span>Storm damage? We respond 24/7 — call any time</span>
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
