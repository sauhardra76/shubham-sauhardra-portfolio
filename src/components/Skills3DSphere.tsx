import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, TechnicalSkill } from '../config/portfolioData';
import { Globe2, Layers, Sparkles, CheckCircle2, Rotate3d, LayoutGrid } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  skill: TechnicalSkill;
}

export const Skills3DSphere: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<TechnicalSkill>(skills[0]);
  const [viewMode, setViewMode] = useState<'sphere3d' | 'matrix'>('sphere3d');

  // Filter skills based on Domain / Category
  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : activeCategory === 'Web Development'
      ? skills.filter(
          (s) =>
            s.category === 'Frontend & Web' ||
            s.category === 'Backend & CRM' ||
            s.category === 'Web3 & Blockchain'
        )
      : activeCategory === 'Android'
      ? skills.filter((s) => s.category === 'Android & Mobile')
      : activeCategory === 'Cybersecurity'
      ? skills.filter((s) => s.category === 'Cyber Security & Network')
      : activeCategory === 'IT & Systems'
      ? skills.filter((s) => s.category === 'IT Support & SEO')
      : skills.filter((s) => s.category === activeCategory);

  // Keep selectedSkill valid when active category changes
  useEffect(() => {
    if (filteredSkills.length > 0 && !filteredSkills.some((s) => s.name === selectedSkill.name)) {
      setSelectedSkill(filteredSkills[0]);
    }
  }, [activeCategory, filteredSkills, selectedSkill]);

  // 3D rotation state
  const [rotation, setRotation] = useState({ pitch: 0.15, yaw: 0.25 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ pitch: 0.002, yaw: 0.003 });

  // Compute 3D Fibonacci sphere distribution
  const points: Point3D[] = filteredSkills.map((skill, index) => {
    const total = filteredSkills.length;
    const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const theta = 2 * Math.PI * (index / goldenRatio);

    const radius = 150; // Sphere radius in pixels
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return { x, y, z, skill };
  });

  // Animation frame for auto-spin and momentum
  useEffect(() => {
    if (viewMode !== 'sphere3d') return;

    let animId: number;

    const loop = () => {
      if (!isDraggingRef.current) {
        setRotation((prev) => ({
          pitch: prev.pitch + velocityRef.current.pitch,
          yaw: prev.yaw + velocityRef.current.yaw,
        }));
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [viewMode]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    setRotation((prev) => ({
      pitch: prev.pitch - deltaY * 0.006,
      yaw: prev.yaw + deltaX * 0.006,
    }));

    velocityRef.current = {
      pitch: -deltaY * 0.0015,
      yaw: deltaX * 0.0015,
    };

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Distinct categories / domains
  const categories = ['All', 'Web Development', 'Android', 'Cybersecurity', 'IT & Systems'];

  return (
    <div className="w-full bg-[#090C16] rounded-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-8 flex flex-col gap-6">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-1">
            <Rotate3d className="w-4 h-4 text-sky-400" />
            <span>Interactive 3D Skill Architecture</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
            Technical Proficiency Cloud
          </h3>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.08] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('sphere3d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'sphere3d'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>3D Sphere</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'matrix'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Matrix Grid</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.04]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {viewMode === 'sphere3d' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
          {/* 3D Sphere Interactive Canvas */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="lg:col-span-7 relative h-[360px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-2xl bg-black/40 border border-white/[0.05]"
          >
            {/* Ambient Background Sphere Glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />

            {/* Orbiting Points in 3D Space */}
            <div className="relative w-0 h-0 flex items-center justify-center preserve-3d">
              {points.map((pt, idx) => {
                // 3D Rotation Math
                const cosY = Math.cos(rotation.yaw);
                const sinY = Math.sin(rotation.yaw);
                const x1 = pt.x * cosY - pt.z * sinY;
                const z1 = pt.x * sinY + pt.z * cosY;

                const cosP = Math.cos(rotation.pitch);
                const sinP = Math.sin(rotation.pitch);
                const y2 = pt.y * cosP - z1 * sinP;
                const z2 = pt.y * sinP + z1 * cosP;

                // Perspective Projection
                const f = 340;
                const scale = (f / (f - z2)) * 0.9;
                const alpha = Math.max(0.2, (z2 + 150) / 300);
                const isSelected = selectedSkill.name === pt.skill.name;

                return (
                  <button
                    key={`${pt.skill.name}-${idx}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSkill(pt.skill);
                    }}
                    className={`absolute px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-transform duration-75 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/40 ring-2 ring-white/50 z-40'
                        : 'bg-[#10172A]/90 text-slate-200 hover:text-white hover:bg-sky-950 border border-white/10'
                    }`}
                    style={{
                      transform: `translate3d(${x1 * scale}px, ${y2 * scale}px, 0) scale(${scale})`,
                      opacity: alpha,
                      zIndex: Math.round(z2 + 200),
                    }}
                  >
                    {pt.skill.name}
                  </button>
                );
              })}
            </div>

            {/* Drag hint badge */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/10 pointer-events-none">
              Drag to spin 3D Sphere · Click skill to inspect
            </div>
          </div>

          {/* Right: Selected Skill Holographic Inspection Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded-2xl p-6 border border-white/[0.08] shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span className="uppercase text-sky-400 tracking-wider">
                  [{selectedSkill.category}]
                </span>
                <span className="text-emerald-400 font-bold">
                  {selectedSkill.level || 'Advanced'}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-white mb-2 font-display">
                {selectedSkill.name}
              </h4>

              {/* Proficiency Gauge */}
              <div className="space-y-1.5 my-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Mastery Index:</span>
                  <span className="text-white font-bold">{selectedSkill.proficiency}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500 shadow-sm shadow-sky-500/50"
                    style={{ width: `${selectedSkill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* Technical Highlight */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                <span className="text-sky-400 font-semibold block mb-1">Practical Application:</span>
                {selectedSkill.highlight}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Verified Experience</span>
              <span className="text-sky-300">Active Production Stack</span>
            </div>
          </div>
        </div>
      ) : (
        /* Matrix Grid View Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((sk) => (
            <div
              key={sk.name}
              onClick={() => setSelectedSkill(sk)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedSkill.name === sk.name
                  ? 'bg-sky-950/40 border-sky-400/50 shadow-lg shadow-sky-500/10'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-sky-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-white">{sk.name}</h4>
                <span className="text-xs font-mono font-bold text-sky-400">{sk.proficiency}%</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {sk.highlight}
              </p>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-400"
                  style={{ width: `${sk.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
