'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const PARTICLE_COUNT     = 38;  // reduced from 55 — lowers O(n²) ops from 1485→703
const CONNECTION_DISTANCE = 110; // reduced from 130 — fewer connections drawn
const SPEED = 0.3;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

/**
 * Lightweight canvas particle field.
 * Green-tinted nodes connected by thin lines — AI / data-flow aesthetic.
 * Uses a single RAF loop; pauses automatically when tab is hidden.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect user's motion accessibility preference — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const ACCENT_RGB = '0, 166, 118';   // #00A676
    const WHITE_RGB  = '255, 255, 255'; // subtle white nodes

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x:       randomBetween(0, canvas!.width),
        y:       randomBetween(0, canvas!.height),
        vx:      randomBetween(-SPEED, SPEED),
        vy:      randomBetween(-SPEED, SPEED),
        radius:  randomBetween(1, 2.5),
        opacity: randomBetween(0.25, 0.65),
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move + bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            // Alternate between accent-green and white connections
            const isAccent = (i + j) % 3 === 0;
            ctx.strokeStyle = `rgba(${isAccent ? ACCENT_RGB : WHITE_RGB}, ${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        const isAccent = p.radius > 1.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isAccent ? ACCENT_RGB : WHITE_RGB}, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    // Pause when tab hidden — saves CPU
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
