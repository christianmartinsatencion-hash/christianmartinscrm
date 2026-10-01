import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  alpha: number;
  speedFactor: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  pulseAngle: number;
}

export const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Scroll state tracking with smooth lerp
    let lastScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initParticles = (w: number, h: number) => {
      // Light density: ~35 to 55 particles depending on screen size
      const count = Math.min(Math.max(Math.floor((w * h) / 22000), 28), 50);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 2.2 + 1.2; // 1.2px to 3.4px
        const alpha = Math.random() * 0.28 + 0.12; // 0.12 to 0.40 (bem leve)
        const speedFactor = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : 0.8); // Parallax depth

        newParticles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius,
          alpha,
          speedFactor,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulseAngle: Math.random() * Math.PI * 2,
        });
      }
      particles = newParticles;
    };

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const onScroll = () => {
      const newY = window.scrollY;
      scrollVelocity = (newY - lastScrollY) * 0.35;
      currentScrollY = newY;
      lastScrollY = newY;

      // Check if hero is still in viewport (with a margin)
      if (container) {
        const rect = container.getBoundingClientRect();
        isVisible = rect.bottom > -50 && rect.top < window.innerHeight + 50;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2.5); // normalized frame delta
      lastTime = time;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity smoothly
      scrollVelocity *= 0.92;

      // Draw faint connections between close particles (refined studio network)
      const maxDist = 95;
      const particleLen = particles.length;

      for (let i = 0; i < particleLen; i++) {
        const p1 = particles[i];

        // Move with ambient gentle float
        if (!prefersReducedMotion) {
          p1.x += p1.vx * dt;
          p1.pulseAngle += p1.pulseSpeed * dt;

          // Parallax scroll reaction: particles shift based on scroll movement & speedFactor
          p1.y += (p1.vy - scrollVelocity * p1.speedFactor * 1.2) * dt;

          // Wrap horizontally
          if (p1.x < -10) p1.x = width + 10;
          else if (p1.x > width + 10) p1.x = -10;

          // Wrap vertically with generous padding
          if (p1.y < -20) p1.y = height + 20;
          else if (p1.y > height + 20) p1.y = -20;
        }

        // Draw connections
        for (let j = i + 1; j < particleLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.08; // very faint line

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle dot
        const dynamicAlpha = p1.alpha * (0.8 + 0.2 * Math.sin(p1.pulseAngle));

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 41, 59, ${dynamicAlpha})`;
        ctx.fill();

        // Subtle soft halo on slightly larger particles
        if (p1.radius > 2.2) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, ${dynamicAlpha * 0.22})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
};
