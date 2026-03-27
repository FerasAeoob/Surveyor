import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Track position with refs to avoid re-renders
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const animate = useCallback(() => {
    // Dot follows instantly
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }

    // Ring follows with smooth lag
    const dx = pos.current.x - ringPos.current.x;
    const dy = pos.current.y - ringPos.current.y;
    ringPos.current.x += dx * 0.15;
    ringPos.current.y += dy * 0.15;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const onHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]')) {
        setIsHovering(true);
      }
    };
    const onHoverOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    // Use event delegation instead of per-element listeners
    document.addEventListener('mouseover', onHoverIn, { passive: true });
    document.addEventListener('mouseout', onHoverOut, { passive: true });

    // Start the animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onHoverIn);
      document.removeEventListener('mouseout', onHoverOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice, isVisible, animate]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          borderRadius: '50%',
          background: '#00d4ff',
          opacity: isVisible ? 0.9 : 0,
          boxShadow: '0 0 8px rgba(0,212,255,0.5)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: `1.5px solid rgba(0,212,255,${isHovering ? 0.6 : 0.3})`,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.25s ease-out, height 0.25s ease-out, border-color 0.25s, opacity 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
