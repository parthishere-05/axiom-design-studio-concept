import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Ambient room tone for the dock.
 *
 * The studio has not supplied a track, so `site.ambientAudio` is `null` and
 * this hook reports `available: false` — the dock then renders no sound control
 * at all. When a local file is configured the control becomes real: playback
 * starts muted, the visitor opts in, and a rejected play() rolls the state back
 * instead of leaving a lying toggle on screen.
 */
export function useAmbientAudio(src) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!src) {
      audioRef.current = null;
      return undefined;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.muted = true;
    audio.preload = 'none';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audioRef.current = null;
    };
  }, [src]);

  const toggleMuted = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.muted) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {
        audio.muted = true;
        setIsMuted(true);
      });
      return;
    }

    audio.muted = true;
    setIsMuted(true);
  }, []);

  return { available: Boolean(src), isMuted, toggleMuted };
}
