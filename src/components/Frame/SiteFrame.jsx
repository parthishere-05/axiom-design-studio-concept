/**
 * The thin inset frame that turns the viewport into a composed architectural
 * drawing. Four hairlines meet four chamfered corners; the corner paths are
 * normalised to pathLength="1" so the entrance sequence can draw them by
 * animating stroke-dashoffset alone.
 */
const CORNERS = [
  { key: 'tl', path: 'M0.5 24 V12 L12 0.5 H24' },
  { key: 'tr', path: 'M0 0.5 H12 L23.5 12 V24' },
  { key: 'br', path: 'M23.5 0 V12 L12 23.5 H0' },
  { key: 'bl', path: 'M24 23.5 H12 L0.5 12 V0' },
];

export function SiteFrame() {
  return (
    <div className="frame" aria-hidden="true">
      <span className="frame__edge frame__edge--top" />
      <span className="frame__edge frame__edge--right" />
      <span className="frame__edge frame__edge--bottom" />
      <span className="frame__edge frame__edge--left" />

      {CORNERS.map((corner) => (
        <svg
          key={corner.key}
          className={`frame__corner frame__corner--${corner.key}`}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          focusable="false"
        >
          <path
            className="frame__cornerPath"
            d={corner.path}
            pathLength="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}
    </div>
  );
}
