/**
 * TEMPORARY BRAND LOCKUP
 * ----------------------
 * The studio's production identity is a geometric AXIOM mark paired with an
 * AXIOM wordmark. That artwork has not been supplied to this repository, so the
 * lockup below is a deliberate stand-in built from the same primitives (an
 * apex-led 'A' with a hairline crossbar) and set in the display typeface.
 *
 * To drop in the real artwork, swap the <svg> inside <AxiomMark /> for
 * <img src="/images/axiom-mark.svg" alt="" /> and adjust only the width/height
 * custom properties in navigation.css. Nothing else in the layout reads the
 * internals of this file.
 */
export function AxiomMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 26"
      width="26"
      height="26"
      role="img"
      aria-label="AXIOM"
      focusable="false"
    >
      <path
        d="M1.4 24.6 13 1.4l11.6 23.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path d="M7.4 18.6h11.2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}

export function AxiomWordmark({ className }) {
  return (
    <span className={className}>
      <AxiomMark className="brand__mark" />
      <span className="brand__word">Axiom</span>
    </span>
  );
}
