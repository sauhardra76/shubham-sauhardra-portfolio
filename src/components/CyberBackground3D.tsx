import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  life: number;
  decay: number;
  coreColor: string;
  glowColor: string;
  sparklePhase: number;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface ClickRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

export const CyberBackground3D: React.FC = () => {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let starParticles: THREE.Points | null = null;
    let polyhedra: { mesh: THREE.Mesh; rotX: number; rotY: number; floatSpeed: number; initialY: number }[] = [];
    let starGeometry: THREE.BufferGeometry | null = null;
    let starMaterial: THREE.PointsMaterial | null = null;
    let geomTypes: THREE.BufferGeometry[] = [];

    let mouseNormX = 0;
    let mouseNormY = 0;

    // ========================================================
    // LAYER 1: THREE.JS 3D DEEP CYBER BACKGROUND (WITH TRY-CATCH)
    // ========================================================
    const threeContainer = threeContainerRef.current;
    if (threeContainer) {
      try {
        const testCanvas = document.createElement('canvas');
        const hasWebgl = !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
        if (!hasWebgl) throw new Error('WebGL not supported or blocked');

        scene = new THREE.Scene();
        const activeScene = scene;
        scene.fog = new THREE.FogExp2(0x05070d, 0.0016);

        camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.z = 240;

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        threeContainer.appendChild(renderer.domElement);

        // Star / Particle Cyber Field (750 points)
        const particleCount = 750;
        starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(particleCount * 3);
        const starColors = new Float32Array(particleCount * 3);

        const colorA = new THREE.Color(0x38bdf8); // Sky blue
        const colorB = new THREE.Color(0x818cf8); // Indigo
        const colorC = new THREE.Color(0x34d399); // Emerald

        for (let i = 0; i < particleCount; i++) {
          starPositions[i * 3] = (Math.random() - 0.5) * 600;
          starPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
          starPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;

          const mixedColor = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
          starColors[i * 3] = mixedColor.r;
          starColors[i * 3 + 1] = mixedColor.g;
          starColors[i * 3 + 2] = mixedColor.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        starMaterial = new THREE.PointsMaterial({
          size: 2.2,
          vertexColors: true,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
        });

        starParticles = new THREE.Points(starGeometry, starMaterial);
        activeScene.add(starParticles);

        // Floating 3D Geometric Wireframe Polyhedra
        geomTypes = [
          new THREE.IcosahedronGeometry(18, 1),
          new THREE.OctahedronGeometry(14, 0),
          new THREE.TorusGeometry(16, 4, 12, 32),
          new THREE.IcosahedronGeometry(12, 0),
        ];

        const polyColors = [0x38bdf8, 0x818cf8, 0x10b981, 0x0ea5e9];

        geomTypes.forEach((geom, idx) => {
          const mat = new THREE.MeshBasicMaterial({
            color: polyColors[idx % polyColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.22,
          });

          const mesh = new THREE.Mesh(geom, mat);
          const posX = idx === 0 ? -120 : idx === 1 ? 130 : idx === 2 ? -80 : 100;
          const posY = idx === 0 ? 50 : idx === 1 ? -40 : idx === 2 ? -70 : 80;
          const posZ = idx === 0 ? -40 : idx === 1 ? -60 : idx === 2 ? 20 : -30;

          mesh.position.set(posX, posY, posZ);
          activeScene.add(mesh);

          polyhedra.push({
            mesh,
            rotX: (Math.random() - 0.5) * 0.008,
            rotY: (Math.random() - 0.5) * 0.008,
            floatSpeed: 0.0015 + idx * 0.0005,
            initialY: posY,
          });
        });
      } catch (err) {
        console.warn('WebGL context creation failed in CyberBackground3D, falling back to 2D trail overlay:', err);
      }
    }

    if (scene) {
      // scene is ready
    }

    // ========================================================
    // LAYER 2: INTERACTIVE 3D MOUSE PARTICLE TRAIL & STREAMER
    // ========================================================
    const trailCanvas = trailCanvasRef.current;
    if (!trailCanvas) return;
    const ctx = trailCanvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (camera && renderer) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }

      trailCanvas.width = width * dpr;
      trailCanvas.height = height * dpr;
      trailCanvas.style.width = `${width}px`;
      trailCanvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const MAX_PARTICLES = 300;
    const particlePool: TrailParticle[] = [];
    const trailPoints: TrailPoint[] = [];
    const clickRings: ClickRing[] = [];

    const PARTICLE_COLOR_PALETTE = [
      { core: '#ffffff', glow: 'rgba(56, 189, 248, 0.9)' },
      { core: '#e0f2fe', glow: 'rgba(14, 165, 233, 0.85)' },
      { core: '#ede9fe', glow: 'rgba(129, 140, 248, 0.85)' },
      { core: '#ecfdf5', glow: 'rgba(52, 211, 153, 0.85)' },
      { core: '#fae8ff', glow: 'rgba(192, 132, 252, 0.85)' },
    ];

    let lastMousePos: { x: number; y: number } | null = null;
    let currentMousePos: { x: number; y: number } | null = null;
    let isMouseOnScreen = false;
    let lastEmitTime = performance.now();

    const spawnParticle = (
      x: number,
      y: number,
      extraVx = 0,
      extraVy = 0,
      overrideBaseSize?: number
    ) => {
      if (particlePool.length >= MAX_PARTICLES) {
        particlePool.shift();
      }

      const colorData =
        PARTICLE_COLOR_PALETTE[Math.floor(Math.random() * PARTICLE_COLOR_PALETTE.length)];
      const baseSize = overrideBaseSize ?? (2.4 + Math.random() * 3.6);

      particlePool.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.6 + extraVx,
        vy: (Math.random() - 0.5) * 1.6 + extraVy - 0.25,
        size: baseSize,
        baseSize,
        life: 1.0,
        decay: 0.016 + Math.random() * 0.022,
        coreColor: colorData.core,
        glowColor: colorData.glow,
        sparklePhase: Math.random() * Math.PI * 2,
      });
    };

    const triggerClickBurst = (x: number, y: number) => {
      const burstCount = 28;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = 2.2 + Math.random() * 4.2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        spawnParticle(x, y, vx, vy, 3.2 + Math.random() * 3.2);
      }

      clickRings.push({
        x,
        y,
        radius: 4,
        maxRadius: 55 + Math.random() * 25,
        opacity: 0.85,
        color: 'rgba(56, 189, 248, 0.8)',
      });
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      isMouseOnScreen = true;
      currentMousePos = { x: clientX, y: clientY };

      mouseNormX = (clientX / width - 0.5) * 2;
      mouseNormY = (clientY / height - 0.5) * 2;

      const now = performance.now();

      trailPoints.push({ x: clientX, y: clientY, time: now });
      if (trailPoints.length > 22) {
        trailPoints.shift();
      }

      if (!lastMousePos) {
        lastMousePos = { x: clientX, y: clientY };
        spawnParticle(clientX, clientY);
        return;
      }

      const dx = clientX - lastMousePos.x;
      const dy = clientY - lastMousePos.y;
      const distance = Math.hypot(dx, dy);

      const stepSize = 10;
      const steps = Math.max(1, Math.floor(distance / stepSize));

      for (let i = 1; i <= steps; i++) {
        const ratio = i / steps;
        const ix = lastMousePos.x + dx * ratio;
        const iy = lastMousePos.y + dy * ratio;

        const extraVx = dx * 0.04;
        const extraVy = dy * 0.04;
        spawnParticle(ix, iy, extraVx, extraVy);
      }

      lastMousePos = { x: clientX, y: clientY };
      lastEmitTime = now;
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      triggerClickBurst(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
        triggerClickBurst(touch.clientX, touch.clientY);
      }
    };

    const onMouseLeave = () => {
      isMouseOnScreen = false;
      lastMousePos = null;
      currentMousePos = null;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId: number;
    const clock = new THREE.Clock();
    let targetCameraX = 0;
    let targetCameraY = 0;

    const animate = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = clock.getElapsedTime();
      const now = performance.now();

      // --- 1. Three.js Background Rendering (if active) ---
      if (renderer && scene && camera && starParticles) {
        try {
          targetCameraX = mouseNormX * 24;
          targetCameraY = -mouseNormY * 24;
          camera.position.x += (targetCameraX - camera.position.x) * 0.04;
          camera.position.y += (targetCameraY - camera.position.y) * 0.04;
          camera.lookAt(scene.position);

          starParticles.rotation.y = elapsedTime * 0.025;
          starParticles.rotation.x = elapsedTime * 0.015;

          polyhedra.forEach((p, i) => {
            p.mesh.rotation.x += p.rotX;
            p.mesh.rotation.y += p.rotY;
            p.mesh.position.y = p.initialY + Math.sin(elapsedTime * 0.8 + i) * 6;
          });

          renderer.render(scene, camera);
        } catch (e) {
          // suppress render loop errors if context lost
        }
      }

      // --- 2. 2D Particle Trail & Streamer Rendering ---
      ctx.clearRect(0, 0, width, height);

      if (isMouseOnScreen && currentMousePos && now - lastEmitTime > 90) {
        spawnParticle(
          currentMousePos.x + (Math.random() - 0.5) * 6,
          currentMousePos.y + (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 0.6,
          -0.5,
          2.0
        );
        lastEmitTime = now;
      }

      while (trailPoints.length > 0 && now - trailPoints[0].time > 280) {
        trailPoints.shift();
      }

      if (trailPoints.length >= 2) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < trailPoints.length - 1; i++) {
          const p1 = trailPoints[i];
          const p2 = trailPoints[i + 1];
          const ageRatio = i / (trailPoints.length - 1);
          const alpha = ageRatio * 0.6;
          const strokeWidth = 0.8 + ageRatio * 3.5;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (ageRatio > 0.7) {
            ctx.strokeStyle = `rgba(224, 242, 254, ${alpha})`;
          } else if (ageRatio > 0.35) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 0.7})`;
          }

          ctx.lineWidth = strokeWidth;
          ctx.stroke();
        }
        ctx.restore();
      }

      if (isMouseOnScreen && currentMousePos) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const haloGrad = ctx.createRadialGradient(
          currentMousePos.x,
          currentMousePos.y,
          0,
          currentMousePos.x,
          currentMousePos.y,
          22
        );
        haloGrad.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
        haloGrad.addColorStop(0.45, 'rgba(14, 165, 233, 0.12)');
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(currentMousePos.x, currentMousePos.y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particlePool.length - 1; i >= 0; i--) {
        const p = particlePool[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy = p.vy * 0.95 - 0.035;
        p.life -= p.decay;

        if (p.life <= 0) {
          particlePool.splice(i, 1);
          continue;
        }

        const smoothLife = Math.sin(p.life * Math.PI);
        const currentSize = p.baseSize * smoothLife;

        if (currentSize <= 0.2) continue;

        const glowRadius = currentSize * 2.8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, p.coreColor);
        grad.addColorStop(0.35, p.glowColor);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.coreColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentSize * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (clickRings.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = clickRings.length - 1; i >= 0; i--) {
          const ring = clickRings[i];
          ring.radius += (ring.maxRadius - ring.radius) * 0.16;
          ring.opacity *= 0.91;

          if (ring.opacity <= 0.02 || ring.radius >= ring.maxRadius - 1) {
            clickRings.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${ring.opacity * 0.75})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mouseleave', onMouseLeave);

      if (threeContainer && renderer && renderer.domElement && threeContainer.contains(renderer.domElement)) {
        threeContainer.removeChild(renderer.domElement);
      }

      if (starGeometry) starGeometry.dispose();
      if (starMaterial) starMaterial.dispose();
      geomTypes.forEach((g) => g.dispose());
      polyhedra.forEach((p) => {
        if (p.mesh.material && typeof (p.mesh.material as THREE.Material).dispose === 'function') {
          (p.mesh.material as THREE.Material).dispose();
        }
      });
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={threeContainerRef}
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      />
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
        aria-hidden="true"
      />
    </>
  );
};
