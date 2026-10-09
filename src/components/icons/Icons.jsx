/**
 * Small interface icons, drawn as SVG so they stay crisp and inherit colour.
 * Each carries its own accessibility contract: decorative icons are hidden from
 * assistive tech, and any icon that carries meaning takes a <title>.
 */

export function ChevronDownIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
      <path d="M1 3.6 6 8.4 11 3.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
      <path d="M8.4 1 3.6 6 8.4 11" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ChevronRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
      <path d="M3.6 1 8.4 6 3.6 11" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
      <path d="M3 9 9 3M4.2 3H9v4.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" focusable="false">
      <rect x="1.2" y="1.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="7" cy="7" r="2.9" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10.5" cy="3.6" r="0.85" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 10" width="14" height="10" aria-hidden="true" focusable="false">
      <path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function SoundIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 12" width="14" height="12" aria-hidden="true" focusable="false">
      <path d="M1 4.2h2.4L7 1v10L3.4 7.8H1z" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M9.6 3.6a4.6 4.6 0 0 1 0 4.8" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function MuteIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 12" width="14" height="12" aria-hidden="true" focusable="false">
      <path d="M1 4.2h2.4L7 1v10L3.4 7.8H1z" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M9.4 4.4l3.2 3.2M12.6 4.4L9.4 7.6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
