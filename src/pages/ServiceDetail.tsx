import { useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getServiceContent, getAllServiceSlugs } from '../data/serviceContent';
import { BUSINESS } from '../data/business';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './ServiceDetail.css';

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

const RELATED_LABELS: Record<string, string> = {
  'tree-removal': 'Tree Removal',
  'storm-cleanup': 'Emergency Storm Cleanup',
  'stump-grinding': 'Stump Grinding',
  'tree-pruning': 'Tree Pruning',
  'land-clearing': 'Land Clearing',
  'landscaping': 'Landscaping',
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pageRef = useReveal();
  const content = slug ? getServiceContent(slug) : undefined;

  useEffect(() => {
    if (!content && slug && getAllServiceSlugs().length > 0) {
      navigate('/', { replace: true });
    }
  }, [content, slug, navigate]);

  if (!content) return null;

  return (
    <div className="hts-page srv-page" ref={pageRef}>
      <Navbar />

      <section className="srv-hero">
        <div className="srv-hero-bg" aria-hidden />
        <div className="srv-hero-rings" aria-hidden>
          <div className="srv-ring srv-ring-1" />
          <div className="srv-ring srv-ring-2" />
          <div className="srv-ring srv-ring-3" />
        </div>
        <div className="srv-hero-content section-wrap">
          <div className="srv-hero-text animate-fade-in">
            <div className="srv-hero-badge">
              <span className="hts-hero-badge-dot" />
              Fully Insured · Pittsburgh, PA
            </div>
            <h1 className="srv-hero-title">
              {content.title.split(' ')[0]}<br />
              <span className="srv-hero-title-accent">
                {content.title.split(' ').slice(1).join(' ') || content.title}
              </span>
            </h1>
            <p className="srv-hero-sub">{content.heroDesc}</p>
            <div className="srv-hero-ctas">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                </svg>
                Call {BUSINESS.phone}
              </a>
              <button className="btn-secondary" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                Request Free Estimate
              </button>
            </div>
          </div>
          <div className="srv-hero-badge-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {[
              { v: '24/7', l: 'Emergency Response' },
              { v: '100%', l: 'Free Estimates' },
              { v: 'Insured', l: 'Liability + Comp' },
              { v: 'PA', l: 'Local Crew' },
            ].map(s => (
              <div key={s.l} className="srv-hero-stat">
                <span className="srv-hero-stat-val">{s.v}</span>
                <span className="srv-hero-stat-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hts-section srv-overview-section">
        <div className="section-wrap">
          <div className="srv-overview-inner">
            <div className="srv-overview-text reveal">
              <p className="eyebrow">Overview</p>
              <h2 className="hts-section-title">{content.title}</h2>
              <p className="srv-overview-sub">{content.subtitle}</p>
              <p className="srv-overview-body">{content.overview}</p>
            </div>
            <div className="srv-overview-cta reveal reveal-delay-2">
              <div className="srv-overview-card depth-panel">
                <p className="srv-overview-card-label">Need help now?</p>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Call {BUSINESS.phone}
                </a>
                <p className="srv-overview-card-sub">24/7 emergency response available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hts-section srv-when-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">When to Call Us</p>
            <h2 className="hts-section-title">Common Reasons<br />to Call Heavy</h2>
          </div>
          <div className="srv-when-grid">
            {content.whenToCall.map((reason, i) => (
              <div key={reason} className={`srv-when-item reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                <div className="srv-when-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hts-section srv-process-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">How the Job Works</p>
            <h2 className="hts-section-title">Four Steps to<br />a Clean Site</h2>
          </div>
          <div className="srv-process-track">
            {content.howItWorks.map((step, i) => (
              <div key={step.step} className={`srv-process-step reveal reveal-delay-${i + 1}`}>
                <div className="srv-process-connector" aria-hidden={i === 0} />
                <div className="srv-process-node">
                  <span className="srv-process-num">{step.step}</span>
                </div>
                <h3 className="srv-process-title">{step.title}</h3>
                <p className="srv-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hts-section srv-safety-section">
        <div className="section-wrap">
          <div className="srv-safety-inner reveal">
            <div className="srv-safety-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="srv-safety-text">
              <h3>Safety & Cleanup Promise</h3>
              <p>{content.safetyPromise}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hts-section srv-related-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">Related Services</p>
            <h2 className="hts-section-title">More Ways<br />We Can Help</h2>
          </div>
          <div className="srv-related-grid">
            {content.relatedSlugs.map((rslug, i) => (
              <Link
                key={rslug}
                to={`/${rslug}`}
                className={`srv-related-card depth-panel reveal reveal-delay-${Math.min(i + 1, 3)}`}
              >
                <h3 className="srv-related-title">{RELATED_LABELS[rslug] || rslug}</h3>
                <span className="srv-related-arrow">
                  View Service
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="srv-cta-section">
        <div className="section-wrap">
          <div className="srv-cta-inner reveal">
            <div className="srv-cta-bg" aria-hidden />
            <div className="srv-cta-content">
              <p className="eyebrow">Ready to Get Started?</p>
              <h2 className="hts-section-title" style={{ marginBottom: 12 }}>
                Get Your Free<br />Estimate Today
              </h2>
              <p className="srv-cta-sub">
                Call, text, or fill out the form. Fast response — and if it's an emergency, we're available right now.
              </p>
              <div className="srv-cta-actions">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                  </svg>
                  Call {BUSINESS.phone}
                </a>
                <button className="btn-secondary" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                  Request Online Estimate
                </button>
              </div>
              <div className="srv-cta-emergency">
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
        <button className="hts-mobile-sticky-estimate" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
          Free Estimate
        </button>
      </div>
    </div>
  );
}
