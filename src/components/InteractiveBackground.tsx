import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, radius: 100 };
    let isVisible = true;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = Math.random() * 15 + 5;
        this.color = `rgba(99, 102, 241, ${Math.random() * 0.15 + 0.05})`;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distanceSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        if (distanceSq < radiusSq) {
          const distance = Math.sqrt(distanceSq) || 1;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * this.density;
          const directionY = (dy / distance) * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 20;
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 20;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Dynamic density based on screen size to keep frame budget consistent
      const densityModifier = window.innerWidth < 768 ? 60 : 45;
      const xSpacing = canvasWidth / densityModifier;
      const ySpacing = canvasHeight / (densityModifier / 2);

      for (let y = 0; y < canvasHeight; y += ySpacing) {
        for (let x = 0; x < canvasWidth; x += xSpacing) {
          particles.push(new Particle(x, y));
        }
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-30 will-change-transform" />;
});

InteractiveBackground.displayName = 'InteractiveBackground';

export default InteractiveBackground;
