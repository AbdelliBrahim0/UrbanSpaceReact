import React, { useEffect, useRef } from 'react';

const Background3D = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          hue: Math.random() * 60 + 180 // Blue to cyan range
        });
      }
    };

    const drawParticle = (particle) => {
      ctx?.save();
      ctx.globalAlpha = particle?.opacity;
      ctx.fillStyle = `hsl(${particle?.hue}, 70%, 60%)`;
      ctx?.beginPath();
      ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
      ctx?.fill();
      ctx?.restore();
    };

    const updateParticle = (particle) => {
      particle.x += particle?.speedX;
      particle.y += particle?.speedY;

      // Mouse interaction
      const dx = mouseX - particle?.x;
      const dy = mouseY - particle?.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.x -= dx * force * 0.01;
        particle.y -= dy * force * 0.01;
      }

      // Boundary check
      if (particle?.x < 0 || particle?.x > canvas?.width) particle.speedX *= -1;
      if (particle?.y < 0 || particle?.y > canvas?.height) particle.speedY *= -1;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas?.width, particle?.x));
      particle.y = Math.max(0, Math.min(canvas?.height, particle?.y));
    };

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles?.length; i++) {
        for (let j = i + 1; j < particles?.length; j++) {
          const dx = particles?.[i]?.x - particles?.[j]?.x;
          const dy = particles?.[i]?.y - particles?.[j]?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.globalAlpha = (150 - distance) / 150 * 0.2;
            ctx?.beginPath();
            ctx?.moveTo(particles?.[i]?.x, particles?.[i]?.y);
            ctx?.lineTo(particles?.[j]?.x, particles?.[j]?.y);
            ctx?.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw connections first
      drawConnections();

      // Update and draw particles
      particles?.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e?.clientX;
      mouseY = e?.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #010101ff 0%, #050505ff 100%)' }}
    />
  );
};

export default Background3D;