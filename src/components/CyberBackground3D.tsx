import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CyberBackground3D: React.FC = () => {
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let polyhedra: { mesh: THREE.Mesh; rotX: number; rotY: number; floatSpeed: number; initialY: number }[] = [];
    let geomTypes: THREE.BufferGeometry[] = [];

    let mouseNormX = 0;
    let mouseNormY = 0;

    // ========================================================
    // THREE.JS 3D DEEP CYBER BACKGROUND (WIREFRAME POLYHEDRA)
    // ========================================================
    const threeContainer = threeContainerRef.current;
    if (threeContainer) {
      try {
        const testCanvas = document.createElement('canvas');
        const hasWebgl = !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
        );
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
        console.warn('WebGL context creation failed in CyberBackground3D:', err);
      }
    }

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (camera && renderer) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseNormX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseNormY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseNormX = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouseNormY = (touch.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

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

      if (renderer && scene && camera) {
        try {
          targetCameraX = mouseNormX * 24;
          targetCameraY = -mouseNormY * 24;
          camera.position.x += (targetCameraX - camera.position.x) * 0.04;
          camera.position.y += (targetCameraY - camera.position.y) * 0.04;
          camera.lookAt(scene.position);

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

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);

      if (
        threeContainer &&
        renderer &&
        renderer.domElement &&
        threeContainer.contains(renderer.domElement)
      ) {
        threeContainer.removeChild(renderer.domElement);
      }

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
    <div
      ref={threeContainerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
