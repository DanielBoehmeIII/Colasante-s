import { useCallback, useEffect, useRef, useState } from 'react';

const STYLES = `
.baf-slider {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border);
  user-select: none;
  cursor: ew-resize;
}

.baf-panel {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.baf-panel--before {
  clip-path: inset(0 50% 0 0);
  z-index: 2;
}

.baf-panel--after {
  z-index: 1;
}

.baf-gradient-before {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0a1f0a 0%, #162e16 30%, #0d2d0d 60%, #080c08 100%);
}

.baf-gradient-after {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a2a0d 0%, #2a4a1a 30%, #1a3a0d 60%, #0d1a08 100%);
}

.baf-label {
  position: absolute;
  bottom: 16px;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 6px 14px;
  border-radius: 99px;
  backdrop-filter: blur(8px);
  z-index: 3;
  pointer-events: none;
}

.baf-label--before {
  left: 16px;
  background: rgba(6,9,6,0.7);
  border: 1px solid rgba(34,197,94,0.3);
  color: var(--green-bright);
}

.baf-label--after {
  right: 16px;
  background: rgba(6,9,6,0.7);
  border: 1px solid rgba(34,197,94,0.3);
  color: var(--green-bright);
}

.baf-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--green);
  z-index: 4;
  transform: translateX(-50%);
  box-shadow: 0 0 12px rgba(34,197,94,0.5);
  pointer-events: none;
}

.baf-handle-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(6,9,6,0.85);
  border: 2px solid var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(34,197,94,0.3);
  pointer-events: none;
}

.baf-handle-knob svg {
  width: 18px;
  height: 18px;
  color: var(--green);
}

.baf-pattern-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(34,197,94,0.015) 4px,
      rgba(34,197,94,0.015) 5px
    );
}

.baf-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 24px;
  pointer-events: none;
}

.baf-content-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  opacity: 0.3;
}

.baf-content-icon svg { width: 100%; height: 100%; }

.baf-content-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(232,240,232,0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.baf-decoration {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.baf-dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(34,197,94,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

@media (max-width: 600px) {
  .baf-handle-knob { width: 32px; height: 32px; }
}
`;

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPos(x * 100);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="baf-slider"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="baf-panel baf-panel--after">
        <div className="baf-gradient-after" />
        <div className="baf-pattern-overlay" />
        <div className="baf-decoration"><div className="baf-dot-grid" /></div>
        <div className="baf-content">
          <div className="baf-content-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div className="baf-content-label">After</div>
        </div>
        <div className="baf-label baf-label--after">After</div>
      </div>

      <div className="baf-panel baf-panel--before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` } as React.CSSProperties}>
        <div className="baf-gradient-before" />
        <div className="baf-pattern-overlay" />
        <div className="baf-decoration"><div className="baf-dot-grid" /></div>
        <div className="baf-content">
          <div className="baf-content-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="baf-content-label">Before</div>
        </div>
        <div className="baf-label baf-label--before">Before</div>
      </div>

      <div className="baf-handle" style={{ left: `${pos}%` }}>
        <div className="baf-handle-knob">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3L3 8l5 5M16 3l5 5-5 5M3 16h18M3 12h18M3 8h18"/>
            <line x1="12" y1="3" x2="12" y2="21"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
