/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
}

interface NetworkConnectorBackgroundProps {
  className?: string;
  intensity?: number; // 0 to 1
  interactive?: boolean;
}

export default function NetworkConnectorBackground({
  className,
  intensity = 1,
  interactive = true,
}: NetworkConnectorBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let nodes: Node[] = [];
    const dpr = window.devicePixelRatio || 1;
    
    // Config
    const nodeColors = ['#06b6d4', '#0f172a', '#94a3b8'];
    const connectionDistance = 150;
    const dashSpeed = 0.02;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initNodes(width, height);
    };

    const initNodes = (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? 30 : 60;
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: 2 + Math.random() * 4,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const draw = (time: number) => {
      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const t = time / 1000;

      // Update and draw nodes
      nodes.forEach((node) => {
        // Drifting motion
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Interaction
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const interactionZone = 150;
        
        let currentRadius = node.radius;
        let currentOpacity = 0.5 + Math.sin(t * 2 + node.phase) * 0.3;

        if (distToMouse < interactionZone) {
          const factor = 1 - distToMouse / interactionZone;
          currentRadius += factor * 4;
          currentOpacity = Math.min(1, currentOpacity + factor * 0.5);
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = currentOpacity * intensity;
        
        // Glow effect
        if (currentOpacity > 0.7) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = node.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const mdx = (n1.x + n2.x) / 2 - mouseRef.current.x;
            const mdy = (n1.y + n2.y) / 2 - mouseRef.current.y;
            const distToMouse = Math.sqrt(mdx * mdx + mdy * mdy);
            
            let lineOpacity = (1 - dist / connectionDistance) * 0.4;
            let lineColor = '#94a3b8';

            if (distToMouse < 150) {
              const factor = 1 - distToMouse / 150;
              lineOpacity = Math.min(0.8, lineOpacity + factor * 0.4);
              lineColor = '#06b6d4';
            }

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = lineOpacity * intensity;
            ctx.stroke();

            // Animated dash / data flow
            const dashOffset = (t * dashSpeed * 100) % 1;
            ctx.beginPath();
            const dashX = n1.x + (n2.x - n1.x) * dashOffset;
            const dashY = n1.y + (n2.y - n1.y) * dashOffset;
            ctx.arc(dashX, dashY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4';
            ctx.globalAlpha = lineOpacity * intensity * 2;
            ctx.fill();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [intensity, interactive]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
