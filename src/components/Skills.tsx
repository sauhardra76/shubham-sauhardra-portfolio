import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, TechnicalSkill } from '../config/portfolioData';
import {
  Code2,
  Smartphone,
  Database,
  Search,
  Wrench,
  RotateCcw,
  Sparkles,
  Terminal,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  FolderGit2,
  Server,
  Coins,
  Radar as RadarIcon,
  BarChart3,
  LayoutGrid,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Monitor
} from 'lucide-react';

export type SkillCategory = 'All' | 'Frontend & Web' | 'Web3 & Blockchain' | 'Android & Mobile' | 'Backend & CRM' | 'IT Support & SEO';
export type SkillViewMode = 'bars' | 'radar' | 'combined';

interface RadarAxis {
  id: string;
  label: string;
  shortLabel: string;
  category: SkillCategory;
  score: number;
  highlight: string;
  keyTech: string[];
}

export const Skills: React.FC = () => {
  const { skills, toolsAndPlatforms } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<SkillViewMode>('bars');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState<{ [key: string]: number }>({});
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredAxis, setHoveredAxis] = useState<RadarAxis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger animation on viewport entry or manual re-animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Compute Radar Chart Domain Axes dynamically from competencies
  const radarAxes: RadarAxis[] = [
    {
      id: 'frontend',
      label: 'Frontend & UI Engineering',
      shortLabel: 'Frontend & Web',
      category: 'Frontend & Web',
      score: 92,
      highlight: 'Semantic HTML5, React.js, TypeScript, Tailwind CSS & Responsive UX',
      keyTech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next-gen HTML5']
    },
    {
      id: 'android',
      label: 'Android & Mobile Apps',
      shortLabel: 'Android & Mobile',
      category: 'Android & Mobile',
      score: 88,
      highlight: 'Offline-first utilities, Native Android Architecture, PWA & UX',
      keyTech: ['Android SDK', 'Offline Storage', 'PWA', 'Utility Engines']
    },
    {
      id: 'web3',
      label: 'Web3 & Blockchain dApps',
      shortLabel: 'Web3 & dApps',
      category: 'Web3 & Blockchain',
      score: 85,
      highlight: 'Decentralized interfaces, Wallet integration, ABI contracts & IPFS',
      keyTech: ['MetaMask / Web3', 'Ethers.js', 'Smart Contract ABI', 'IPFS']
    },
    {
      id: 'backend',
      label: 'Backend & CRM Systems',
      shortLabel: 'Backend & CRM',
      category: 'Backend & CRM',
      score: 86,
      highlight: 'RESTful API integration, CRM workflows, SQLite & lead management',
      keyTech: ['Node.js APIs', 'SQLite / DB', 'CRM Architecture', 'Workflow Logic']
    },
    {
      id: 'support',
      label: 'IT Support & Systems',
      shortLabel: 'IT Infrastructure',
      category: 'IT Support & SEO',
      score: 93,
      highlight: 'Hardware diagnosis, OS configuration, troubleshooting & office IT',
      keyTech: ['System Setup', 'OS Troubleshooting', 'Diagnostics', 'Hardware Setup']
    },
    {
      id: 'seo',
      label: 'Technical SEO & Performance',
      shortLabel: 'SEO & Performance',
      category: 'IT Support & SEO',
      score: 89,
      highlight: 'Schema.org metadata, Core Web Vitals, speed indexing & on-page SEO',
      keyTech: ['Schema Markup', 'Core Web Vitals', 'Search Console', 'Audit & Speed']
    }
  ];

  // Animate progress numbers counting up smoothly
  useEffect(() => {
    if (!isVisible) {
      setAnimatedPercentages({});
      return;
    }

    let startTime: number | null = null;
    const duration = 1100; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const updated: { [key: string]: number } = {};
      skills.forEach((skill) => {
        updated[skill.name] = Math.round(skill.proficiency * easeOut);
      });

      setAnimatedPercentages(updated);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, animationKey, skills]);

  const handleReplay = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      setAnimationKey((prev) => prev + 1);
    }, 50);
  };

  // Filter skills based on category and search query
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.level && skill.level.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Category counts
  const categoryCounts = {
    All: skills.length,
    'Frontend & Web': skills.filter((s) => s.category === 'Frontend & Web').length,
    'Web3 & Blockchain': skills.filter((s) => s.category === 'Web3 & Blockchain').length,
    'Android & Mobile': skills.filter((s) => s.category === 'Android & Mobile').length,
    'Backend & CRM': skills.filter((s) => s.category === 'Backend & CRM').length,
    'IT Support & SEO': skills.filter((s) => s.category === 'IT Support & SEO').length,
  };

  const categories: { id: SkillCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Technologies', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'Frontend & Web', label: 'Frontend & Web', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'Web3 & Blockchain', label: 'Web3 & Blockchain', icon: <Coins className="w-3.5 h-3.5" /> },
    { id: 'Android & Mobile', label: 'Android & Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'Backend & CRM', label: 'Backend & CRM', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'IT Support & SEO', label: 'IT Support & SEO', icon: <Search className="w-3.5 h-3.5" /> },
  ];

  // Helper for Category badge style
  const getCategoryBadge = (category: TechnicalSkill['category']) => {
    switch (category) {
      case 'Frontend & Web':
        return 'text-sky-300 bg-sky-950/60 border-sky-800/60';
      case 'Web3 & Blockchain':
        return 'text-cyan-300 bg-cyan-950/60 border-cyan-800/60';
      case 'Android & Mobile':
        return 'text-emerald-300 bg-emerald-950/60 border-emerald-800/60';
      case 'Backend & CRM':
        return 'text-indigo-300 bg-indigo-950/60 border-indigo-800/60';
      case 'IT Support & SEO':
        return 'text-amber-300 bg-amber-950/60 border-amber-800/60';
      default:
        return 'text-slate-300 bg-slate-900 border-slate-700';
    }
  };

  // Helper for Level badge
  const getLevelBadge = (level?: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/30';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Proficient':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-white/[0.04] text-slate-300 border-white/[0.08]';
    }
  };

  // Map tool to an appropriate icon
  const getToolIcon = (toolName: string) => {
    const lower = toolName.toLowerCase();
    if (lower.includes('code') || lower.includes('vite')) return <Code2 className="w-3.5 h-3.5 text-sky-400" />;
    if (lower.includes('android')) return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
    if (lower.includes('git')) return <FolderGit2 className="w-3.5 h-3.5 text-orange-400" />;
    if (lower.includes('postman') || lower.includes('api')) return <Server className="w-3.5 h-3.5 text-amber-400" />;
    if (lower.includes('terminal') || lower.includes('shell') || lower.includes('linux')) return <Terminal className="w-3.5 h-3.5 text-slate-400" />;
    if (lower.includes('sqlite') || lower.includes('database')) return <Database className="w-3.5 h-3.5 text-indigo-400" />;
    if (lower.includes('search') || lower.includes('console')) return <Search className="w-3.5 h-3.5 text-blue-400" />;
    if (lower.includes('windows')) return <Monitor className="w-3.5 h-3.5 text-sky-400" />;
    if (lower.includes('web3') || lower.includes('ethers') || lower.includes('wallet') || lower.includes('metamask') || lower.includes('ipfs'))
      return <Coins className="w-3.5 h-3.5 text-cyan-400" />;
    return <Wrench className="w-3.5 h-3.5 text-slate-400" />;
  };

  // Radar Chart geometry calculations
  const cx = 220;
  const cy = 220;
  const maxR = 155;
  const totalAxes = radarAxes.length;
  const rings = [0.25, 0.5, 0.75, 1.0]; // 25%, 50%, 75%, 100%

  // Compute coordinate for an axis at given percentage (0-1)
  const getPoint = (axisIndex: number, factor: number) => {
    const angle = -Math.PI / 2 + (axisIndex * (2 * Math.PI)) / totalAxes;
    const r = maxR * factor;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Generate polygon points string for a ring
  const getRingPolygonPoints = (factor: number) => {
    return radarAxes
      .map((_, i) => {
        const p = getPoint(i, factor);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Generate the active data polygon points
  const activeDataPolygonPoints = radarAxes
    .map((axis, i) => {
      const percentage = isVisible ? axis.score / 100 : 0.05;
      const p = getPoint(i, percentage);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div
      id="skills"
      ref={containerRef}
      className="mt-20 pt-16 border-t border-white/[0.08] scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Technical Competencies</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Skills &amp; Technology Stack
          </h3>
          <p className="text-sm text-slate-400 mt-1.5 max-w-2xl">
            Demonstrated technical proficiency across modern web interfaces, Android applications, custom CRM systems, and IT support operations.
          </p>
        </div>

        {/* View Mode Switcher & Replay Button */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Progress Bars / Radar Chart / Combined Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#080B14] border border-white/[0.1] shadow-inner">
            <button
              onClick={() => setViewMode('bars')}
              title="View as detailed Progress Bars"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Progress Bars</span>
            </button>
            <button
              onClick={() => setViewMode('radar')}
              title="View as Competency Radar Chart"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Radar Chart</span>
            </button>
            <button
              onClick={() => setViewMode('combined')}
              title="View Combined Overview"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'combined'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Both Views</span>
            </button>
          </div>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            title="Replay progress bar and radar animations"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all border border-white/[0.1] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Replay</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        <div className="p-4 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] flex flex-col justify-between hover:border-sky-500/30 transition-all">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            Core Technologies
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{skills.length}+</span>
            <span className="text-xs text-sky-400 font-semibold">Tracked Skills</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            Engineering Domains
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">6</span>
            <span className="text-xs text-emerald-400 font-semibold">Specialized Areas</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] flex flex-col justify-between hover:border-sky-500/30 transition-all">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            Avg. Proficiency
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {Math.round(skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length)}%
            </span>
            <span className="text-xs text-sky-400 font-semibold">High Competence</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] flex flex-col justify-between hover:border-indigo-500/30 transition-all">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            Production Readiness
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</span>
            <span className="text-xs text-indigo-400 font-semibold">Enterprise Grade</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RADAR CHART VIEW (Shown in 'radar' or 'combined' mode) */}
      {/* ============================================================== */}
      {(viewMode === 'radar' || viewMode === 'combined') && (
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0C1122] to-[#080B16] border border-white/[0.1] shadow-2xl relative overflow-hidden">
          {/* Top Title Bar of Radar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                <RadarIcon className="w-5 h-5 text-sky-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Technical Competency Radar Matrix</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 font-semibold">
                    6-AXIS METRIC
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Comprehensive multi-dimensional evaluation across engineering architecture, frontend, mobile, dApps, and IT operations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping inline-block" />
              <span>Interactive Spider Chart (Hover nodes for details)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: SVG Spider/Radar Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
                <svg
                  viewBox="0 0 440 440"
                  className="w-full h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.15)] overflow-visible"
                >
                  <defs>
                    <radialGradient id="radarRadialGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                      <stop offset="70%" stopColor="#0284c7" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="radarFillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.30" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
                    </linearGradient>
                    <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Concentric Grid Polygons */}
                  {rings.map((ringFactor, rIdx) => (
                    <polygon
                      key={rIdx}
                      points={getRingPolygonPoints(ringFactor)}
                      fill="none"
                      stroke="#334155"
                      strokeWidth="1"
                      strokeDasharray={rIdx === rings.length - 1 ? 'none' : '2,3'}
                      opacity={0.6 + rIdx * 0.1}
                    />
                  ))}

                  {/* Radial Axis Spokes */}
                  {radarAxes.map((_, i) => {
                    const outerPoint = getPoint(i, 1.0);
                    return (
                      <line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={outerPoint.x}
                        y2={outerPoint.y}
                        stroke="#334155"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        opacity="0.8"
                      />
                    );
                  })}

                  {/* Ring Value Labels (25%, 50%, 75%, 100%) along top vertical axis */}
                  {rings.map((ringFactor, rIdx) => {
                    const yPos = cy - maxR * ringFactor;
                    return (
                      <text
                        key={rIdx}
                        x={cx + 6}
                        y={yPos + 4}
                        fill="#64748b"
                        fontSize="9"
                        fontFamily="monospace"
                        className="select-none"
                      >
                        {Math.round(ringFactor * 100)}%
                      </text>
                    );
                  })}

                  {/* Active Skill Area Polygon (Filled & Outlined) */}
                  <polygon
                    points={activeDataPolygonPoints}
                    fill="url(#radarFillGradient)"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    filter="url(#radarGlow)"
                    className="transition-all duration-1000 ease-out"
                  />

                  {/* Central Node */}
                  <circle cx={cx} cy={cy} r="3" fill="#38bdf8" />

                  {/* Axis Vertex Points & Interactive Hotspots */}
                  {radarAxes.map((axis, i) => {
                    const percentage = isVisible ? axis.score / 100 : 0.05;
                    const p = getPoint(i, percentage);
                    const labelPoint = getPoint(i, 1.18);
                    const isHovered = hoveredAxis?.id === axis.id;

                    return (
                      <g
                        key={axis.id}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredAxis(axis)}
                        onMouseLeave={() => setHoveredAxis(null)}
                        onClick={() => {
                          setSelectedCategory(axis.category);
                          if (viewMode === 'radar') setViewMode('bars');
                        }}
                      >
                        {/* Outer Glow Circle on Active Node */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered ? 8 : 5}
                          fill="#38bdf8"
                          className="transition-all duration-300 shadow-lg"
                        />
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered ? 13 : 8}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          opacity={isHovered ? 0.9 : 0.3}
                          className="transition-all duration-300"
                        />

                        {/* Text Label on Outer Edge */}
                        <text
                          x={labelPoint.x}
                          y={labelPoint.y + (labelPoint.y > cy ? 8 : -2)}
                          textAnchor={labelPoint.x > cx + 10 ? 'start' : labelPoint.x < cx - 10 ? 'end' : 'middle'}
                          fill={isHovered ? '#38bdf8' : '#cbd5e1'}
                          fontSize="11"
                          fontWeight={isHovered ? 'bold' : '600'}
                          fontFamily="sans-serif"
                          className="transition-colors duration-200 select-none"
                        >
                          {axis.shortLabel}
                        </text>
                        {/* Score Under Label */}
                        <text
                          x={labelPoint.x}
                          y={labelPoint.y + (labelPoint.y > cy ? 20 : 10)}
                          textAnchor={labelPoint.x > cx + 10 ? 'start' : labelPoint.x < cx - 10 ? 'end' : 'middle'}
                          fill="#38bdf8"
                          fontSize="10"
                          fontWeight="bold"
                          fontFamily="monospace"
                          className="select-none"
                        >
                          {axis.score}%
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <span className="text-[11px] text-slate-500 font-mono mt-2">
                Click any node to filter corresponding progress bars
              </span>
            </div>

            {/* Right: Domain Breakdown Metric Cards */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>Domain Mastery Breakdown</span>
                <span className="text-sky-400">Click to filter detailed skills</span>
              </div>

              {radarAxes.map((axis) => {
                const isHovered = hoveredAxis?.id === axis.id;

                return (
                  <div
                    key={axis.id}
                    onMouseEnter={() => setHoveredAxis(axis)}
                    onMouseLeave={() => setHoveredAxis(null)}
                    onClick={() => {
                      setSelectedCategory(axis.category);
                      if (viewMode === 'radar') setViewMode('bars');
                    }}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? 'bg-[#12182E] border-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.2)]'
                        : 'bg-[#090D1A]/90 border-white/[0.07] hover:border-sky-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-sky-300">
                          {axis.label}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold">
                          {axis.score >= 90 ? 'Expert' : 'Advanced'}
                        </span>
                      </div>
                      <span className="text-base font-extrabold font-mono text-sky-400">
                        {axis.score}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                      {axis.highlight}
                    </p>

                    {/* Mini Progress Track */}
                    <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-1000"
                        style={{ width: `${axis.score}%` }}
                      />
                    </div>

                    {/* Micro Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {axis.keyTech.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PROGRESS BARS VIEW (Shown in 'bars' or 'combined' mode) */}
      {/* ============================================================== */}
      {(viewMode === 'bars' || viewMode === 'combined') && (
        <>
          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mb-7">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#090D18] rounded-xl border border-white/[0.08]">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {categoryCounts[cat.id]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technology or tool..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-[#090D18] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 transition-all"
              />
            </div>
          </div>

          {/* Skills Grid with Animated Progress Bars */}
          {filteredSkills.length === 0 ? (
            <div className="py-12 text-center bg-[#0D1222]/60 rounded-2xl border border-dashed border-white/[0.08]">
              <SlidersHorizontal className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No skills match your filter.</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting &quot;All Technologies&quot;.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredSkills.map((skill) => {
                const currentPercentage = animatedPercentages[skill.name] ?? (isVisible ? skill.proficiency : 0);

                return (
                  <div
                    key={skill.name}
                    className="group p-4 sm:p-5 rounded-2xl bg-[#0D1222]/90 border border-white/[0.07] hover:border-sky-500/40 hover:bg-[#11172A] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Header: Skill Name, Category, and Level Badge */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryBadge(
                                skill.category
                              )}`}
                            >
                              {skill.category}
                            </span>
                            {skill.level && (
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getLevelBadge(
                                skill.level
                              )}`}
                              >
                                {skill.level}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                            {skill.name}
                          </h4>
                        </div>

                        {/* Numeric Percentage Counter */}
                        <div className="text-right shrink-0">
                          <div className="text-base sm:text-lg font-extrabold font-mono text-sky-400 tracking-tight">
                            {currentPercentage}%
                          </div>
                        </div>
                      </div>

                      {/* Animated Progress Bar Track */}
                      <div className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-white/[0.08] mb-3">
                        {/* Active Gradient Fill Bar with CSS Transition */}
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 relative transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                          style={{
                            width: isVisible ? `${skill.proficiency}%` : '0%',
                          }}
                        >
                          {/* Subtle Shimmer Overlay */}
                          <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none rounded-full" />
                          {/* Tip Highlight Glow */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                        </div>
                      </div>

                      {/* Highlight Context Description */}
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {skill.highlight}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Tools & Development Environment Badge Wall */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-b from-[#0D1222] to-[#090C16] border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Development Tools &amp; Ecosystem
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Everyday engineering workflows, IDEs, and utilities
          </span>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {toolsAndPlatforms.map((tool) => (
            <div
              key={tool}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-sky-500/40 hover:bg-white/[0.06] transition-all text-xs font-semibold text-slate-200 group cursor-default"
            >
              {getToolIcon(tool)}
              <span className="group-hover:text-white transition-colors">{tool}</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
