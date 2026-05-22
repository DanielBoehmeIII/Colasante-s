import { useState } from 'react';

const STYLES = `
.hts-audio-toggle {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hts-audio-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(6,9,6,0.8);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-3);
  backdrop-filter: blur(8px);
  position: relative;
}

.hts-audio-btn:hover {
  border-color: var(--border-2);
  color: var(--text-2);
}

.hts-audio-btn svg {
  width: 18px;
  height: 18px;
}

.hts-audio-tooltip {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  background: rgba(6,9,6,0.9);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 6px 12px;
  font-size: 0.72rem;
  color: var(--text-3);
  font-family: var(--font-sans);
  backdrop-filter: blur(8px);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.hts-audio-btn:hover .hts-audio-tooltip {
  opacity: 1;
}

@media (max-width: 600px) {
  .hts-audio-toggle {
    bottom: 80px;
    right: 12px;
  }
}
`;

export default function AudioToggle() {
  const [styleInjected, setStyleInjected] = useState(false);

  if (!styleInjected) {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
    setStyleInjected(true);
  }

  return (
    <div className="hts-audio-toggle">
      <button className="hts-audio-btn" aria-label="Ambient audio (coming soon)" disabled>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <span className="hts-audio-tooltip">Ambient audio coming soon</span>
      </button>
    </div>
  );
}
