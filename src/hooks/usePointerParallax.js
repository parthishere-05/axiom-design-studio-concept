import { useEffect, useRef } from 'react';

/**
 * A very small, heavily damped offset applied to the hero backdrop.
 *
 * Motion is written straight to CSS custom properties, so the pointer never
 * triggers a React render. The frame loop is only alive while the value is
 * still travelling toward its target — it stops itself once settled — and it
 * refuses to run at all for touch input or when motion is reduced.
 */
const MAX_OFFSET = 14; // px — deliberately slight
const EASING = 0.075; // per frame, toward the target
const SETTLE = 0.05; // px — below this the loop stops

export function usePointerParallax(enabled) {
  const targetRef = useRef(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return undefined;

    const write = (x, y) => {
      node.style.setProperty('--parallax-x', `${x}px`);
      node.style.setProperty('--parallax-y', `${y}px`);
    };

    if (!enabled) {
      write(0, 0);
      return undefined;
    }

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let goalX = 0;
    let goalY = 0;

    const tick = () => {
      currentX += (goalX - currentX) * EASING;
      currentY += (goalY - currentY) * EASING;

      const settled =
        Math.abs(goalX - currentX) < SETTLE && Math.abs(goalY - currentY) < SETTLE;

      if (settled) {
        write(goalX, goalY);
        frame = 0;
        return;
      }

      write(Number(currentX.toFixed(2)), Number(currentY.toFixed(2)));
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;

      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;

      goalX = -nx * MAX_OFFSET;
      goalY = -ny * MAX_OFFSET;
      start();
    };

    // Only a true exit from the document recentres the backdrop; moving between
    // children must not interrupt the current travel.
    const onPointerOut = (event) => {
      if (event.pointerType !== 'mouse' || event.relatedTarget) return;
      goalX = 0;
      goalY = 0;
      start();
    };

    const onBlur = () => {
      goalX = 0;
      goalY = 0;
      start();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', onBlur);
      if (frame) window.cancelAnimationFrame(frame);
      write(0, 0);
    };
  }, [enabled]);

  return targetRef;
}
