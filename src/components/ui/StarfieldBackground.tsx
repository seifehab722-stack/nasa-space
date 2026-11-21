import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  tint: 'ice' | 'cyan';
}

export const StarfieldBackground: React.FC<{ subtle?: boolean }> = ({ subtle = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sparse, small stars across a mostly pure-black sky
      const count = isMobile ? 36 : subtle ? 62 : 76;
      stars = Array.from({ length: count }, (_, idx) => {
        const seed = (idx * 9301 + 49297) % 233280;
        const r1 = seed / 233280;
        const r2 = ((seed * 7 + 13) % 233280) / 233280;
        const r3 = ((seed * 17 + 29) % 233280) / 233280;
        return {
          x: r1 * width,
          y: r2 * height,
          radius: r3 > 0.9 ? 1.15 : r3 > 0.5 ? 0.8 : 0.55,
          alpha: 0.16 + r3 * 0.42,
          phase: r1 * Math.PI * 2,
          speed: 0.25 + r2 * 0.45,
          tint: idx % 11 === 0 ? 'cyan' : 'ice',
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const seconds = time * 0.001;

      for (const s of stars) {
        const twinkle =
          prefersReducedMotion || isMobile
            ? 1
            : 0.78 + 0.22 * Math.sin(seconds * s.speed + s.phase);
        ctx.globalAlpha = s.alpha * twinkle;
        ctx.fillStyle = s.tint === 'cyan' ? '#35D5F2' : '#EAF4FF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    setup();
    draw(0);

    let isVisible = !document.hidden;

    const startLoop = () => {
      if (!prefersReducedMotion && !isMobile && isVisible && !animationFrameId) {
        const loop = (t: number) => {
          draw(t);
          animationFrameId = window.requestAnimationFrame(loop);
        };
        animationFrameId = window.requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    startLoop();

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let resizeTimer = 0;
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        draw(0);
      }, 100);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      stopLoop();
    };
  }, [subtle]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#000000]" aria-hidden="true">
      {/* Very faint edge glows on black — no large navy fills */}
      <div
        className="absolute -left-48 top-1/4 h-[380px] w-[380px] rounded-full opacity-[0.09] blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(22, 119, 255, 0.45) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />
      <div
        className="absolute -right-48 bottom-1/4 h-[360px] w-[360px] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(53, 213, 242, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
};
