import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── WebGL Renderer ─────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ─── Scene & Perspective Camera ────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    // ─── Physical Lights ───────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 2.5, 60); // Indigo
    pointLight1.position.set(15, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0ea5e9, 2.2, 60); // Cyan
    pointLight2.position.set(-15, -10, 12);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa855f7, 1.8, 50); // Purple
    pointLight3.position.set(0, -14, 8);
    scene.add(pointLight3);

    // ─── 1. Luxury Floating 3D Sculptural Geometry (Jordan Breton style) ───
    const group = new THREE.Group();
    scene.add(group);

    const objects = [];

    // Smooth reflective Glass/Chrome Materials
    const materialGlass1 = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.15,
      roughness: 0.15,
      transmission: 0.85,
      ior: 1.4,
      transparent: true,
      opacity: 0.65,
      reflectivity: 0.8,
    });

    const materialChrome = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });

    const materialWireframe = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // 1. Central Torus Knot (Architectural hero shape)
    const torusKnotGeo = new THREE.TorusKnotGeometry(4.2, 0.9, 120, 24, 2, 3);
    const torusKnot = new THREE.Mesh(torusKnotGeo, materialGlass1);
    torusKnot.position.set(14, 4, -8);
    group.add(torusKnot);
    objects.push({ mesh: torusKnot, rx: 0.003, ry: 0.005, rz: 0.002, speedY: 0.002, initY: 4 });

    // 2. Smooth Floating Icosahedron Sphere
    const icoGeo = new THREE.IcosahedronGeometry(3.5, 3);
    const icoMesh = new THREE.Mesh(icoGeo, materialChrome);
    icoMesh.position.set(-15, -6, -6);
    group.add(icoMesh);
    objects.push({ mesh: icoMesh, rx: -0.004, ry: 0.003, rz: 0.001, speedY: 0.0025, initY: -6 });

    // 3. Orbiting Holographic Rings
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.06, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, materialWireframe);
    ring1.position.set(-12, 10, -12);
    ring1.rotation.x = 1.1;
    group.add(ring1);
    objects.push({ mesh: ring1, rx: 0.002, ry: 0.006, rz: 0.001, speedY: 0.0015, initY: 10 });

    const ringGeo2 = new THREE.TorusGeometry(3.8, 0.05, 16, 80);
    const ring2 = new THREE.Mesh(ringGeo2, materialWireframe);
    ring2.position.set(12, -10, -10);
    ring2.rotation.y = 0.8;
    group.add(ring2);
    objects.push({ mesh: ring2, rx: -0.003, ry: 0.004, rz: 0.002, speedY: 0.002, initY: -10 });

    // 4. Subtle Floating Glass Orbs
    const orbGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const orb1 = new THREE.Mesh(orbGeo, materialGlass1);
    orb1.position.set(-4, -12, -4);
    group.add(orb1);
    objects.push({ mesh: orb1, rx: 0.005, ry: 0.003, rz: 0, speedY: 0.003, initY: -12 });

    const orb2 = new THREE.Mesh(orbGeo, materialGlass1);
    orb2.position.set(6, 12, -8);
    group.add(orb2);
    objects.push({ mesh: orb2, rx: -0.003, ry: 0.005, rz: 0, speedY: 0.0028, initY: 12 });

    // ─── 2. Luminous Ambient Star Dust Particles ───────────────
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x6366f1);
    const c2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 55;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const mixed = c1.clone().lerp(c2, Math.random());
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Interactive Mouse Easing ──────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ─── Resize Handler ────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── Animation Loop (High-Performance 60FPS) ───────────────
    let frameId;
    let clock = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      clock += 0.012;

      // Cursor spring dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x = mouse.x * 3.5;
      camera.position.y = mouse.y * 2.5;
      camera.lookAt(0, 0, 0);

      // Rotate group slightly with mouse
      group.rotation.y = mouse.x * 0.15;
      group.rotation.x = -mouse.y * 0.15;

      // Animate dynamic 3D shapes
      objects.forEach(({ mesh, rx, ry, rz, speedY, initY }, idx) => {
        mesh.rotation.x += rx;
        mesh.rotation.y += ry;
        mesh.rotation.z += rz;
        mesh.position.y = initY + Math.sin(clock + idx * 1.5) * 1.2;
      });

      // Gently rotate ambient stardust
      particles.rotation.y = clock * 0.03;
      particles.rotation.x = clock * 0.015;

      // Animate light orbits for rich specular reflections
      pointLight1.position.x = Math.sin(clock * 0.6) * 20;
      pointLight1.position.y = Math.cos(clock * 0.4) * 15;

      pointLight2.position.x = Math.cos(clock * 0.5) * -18;
      pointLight2.position.y = Math.sin(clock * 0.7) * -12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      materialGlass1.dispose();
      materialChrome.dispose();
      materialWireframe.dispose();
      torusKnotGeo.dispose();
      icoGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      orbGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
