import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  RefreshCw,
  Lock,
  Network,
  KeyRound,
  FileCode2,
  Database,
  Server,
  AlertCircle
} from 'lucide-react';

export interface SecurityTip {
  id: string;
  category: 'Network Defense' | 'Identity & Access' | 'Web Security' | 'Data Encryption' | 'Infrastructure' | 'DevSecOps';
  title: string;
  advice: string;
  keyRule: string;
  iconName: 'network' | 'lock' | 'key' | 'code' | 'database' | 'server';
}

export const SECURITY_TIPS: SecurityTip[] = [
  {
    id: 'tip-zero-trust',
    category: 'Identity & Access',
    title: 'Principle of Least Privilege (PoLP)',
    advice: 'Never grant blanket administrator rights. Assign strictly scoped Role-Based Access Control (RBAC) permissions only for active tasks, and mandate multi-factor authentication (MFA) on all access tiers.',
    keyRule: 'Default to zero access until explicitly authenticated and verified.',
    iconName: 'key',
  },
  {
    id: 'tip-owasp-sqli',
    category: 'Web Security',
    title: 'Neutralize SQL Injection with Parameterized Queries',
    advice: 'Never concatenate user input directly into SQL strings. Always utilize parameterized statements, object-relational mapping (ORM) bindings, or prepared statements with strict input validation.',
    keyRule: 'Treat all external input as untrusted and unvalidated by default.',
    iconName: 'code',
  },
  {
    id: 'tip-secrets-hygiene',
    category: 'DevSecOps',
    title: 'Isolate Secrets from Version Control',
    advice: 'Store API tokens, private signing keys, and credentials exclusively in secure environment variable vaults or Key Management Systems (KMS). Use pre-commit hooks to block accidental credential leaks.',
    keyRule: 'Never commit .env files, private keys, or plain text passwords into Git.',
    iconName: 'lock',
  },
  {
    id: 'tip-network-segmentation',
    category: 'Network Defense',
    title: 'Segment Critical Production Subnets',
    advice: 'Isolate database instances and backend microservices from the public internet. Enforce strict firewall rules (pfSense/IPTables) and route administrative access exclusively through encrypted VPN tunnels.',
    keyRule: 'Keep database ports closed to public interfaces and restrict listening interfaces.',
    iconName: 'network',
  },
  {
    id: 'tip-tls-hardening',
    category: 'Data Encryption',
    title: 'Enforce Modern TLS 1.3 & HSTS Preloading',
    advice: 'Deploy HTTP Strict Transport Security (HSTS) with long max-age headers to prevent SSL-stripping downgrade attacks. Disable obsolete cipher suites like RC4, 3DES, and SSLv3.',
    keyRule: 'Enforce HTTPS everywhere with Strict-Transport-Security: max-age=31536000.',
    iconName: 'lock',
  },
  {
    id: 'tip-xss-csp',
    category: 'Web Security',
    title: 'Deploy Robust Content Security Policy (CSP)',
    advice: 'Implement strict CSP HTTP response headers to restrict where scripts, stylesheets, and fonts can load from. Disallow unsafe-inline scripts to stop cross-site scripting (XSS) at runtime.',
    keyRule: 'Mitigate XSS risks by instructing the browser to execute only trusted script sources.',
    iconName: 'code',
  },
  {
    id: 'tip-rate-limiting',
    category: 'Infrastructure',
    title: 'Protect Authentication Routes with Rate Limiting',
    advice: 'Guard login, password reset, and registration endpoints against credential stuffing and brute-force attacks with IP and account-level token-bucket rate limits and adaptive delays.',
    keyRule: 'Cap repeated failed authorization attempts to prevent brute-force attacks.',
    iconName: 'server',
  },
  {
    id: 'tip-immutable-backups',
    category: 'Infrastructure',
    title: 'Maintain Immutable, Air-Gapped Backups',
    advice: 'Follow the 3-2-1 backup strategy: 3 copies of business data, across 2 distinct media types, with at least 1 copy off-site and write-once immutable to withstand ransomware attacks.',
    keyRule: 'Test disaster recovery and snapshot restorations periodically, not just creation.',
    iconName: 'database',
  },
  {
    id: 'tip-cve-patching',
    category: 'DevSecOps',
    title: 'Automate Vulnerability Scanning & Patch Hygiene',
    advice: 'Most enterprise compromises exploit known vulnerabilities with existing patches. Audit npm dependencies regularly with automated audit tools and keep container base images updated.',
    keyRule: 'Integrate automated vulnerability scanning into your CI/CD delivery pipelines.',
    iconName: 'server',
  },
  {
    id: 'tip-phishing-dns',
    category: 'Network Defense',
    title: 'Harden Email Domains with SPF, DKIM & DMARC',
    advice: 'Prevent cybercriminals from spoofing your business domain in social engineering and phishing emails by publishing strict DMARC reject policies alongside verified DKIM key pairs.',
    keyRule: 'A strict DMARC policy prevents unauthorized actors from impersonating your domain.',
    iconName: 'network',
  },
];

export const SecurityTipOfTheDay: React.FC = () => {
  // Calculate daily index based on day of year so it rotates naturally every 24 hours
  const getDayOfYearIndex = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % SECURITY_TIPS.length;
  };

  const [currentIndex, setCurrentIndex] = useState<number>(getDayOfYearIndex);
  const [copied, setCopied] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const currentTip = SECURITY_TIPS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SECURITY_TIPS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SECURITY_TIPS.length) % SECURITY_TIPS.length);
  };

  const handleRandom = () => {
    let nextIdx = Math.floor(Math.random() * SECURITY_TIPS.length);
    if (nextIdx === currentIndex) {
      nextIdx = (currentIndex + 1) % SECURITY_TIPS.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleCopy = () => {
    const textToCopy = `Cybersecurity Tip of the Day [${currentTip.category}]: ${currentTip.title}\nAdvice: ${currentTip.advice}\nKey Rule: ${currentTip.keyRule}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (category: SecurityTip['category']) => {
    switch (category) {
      case 'Identity & Access':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/30';
      case 'Web Security':
        return 'text-sky-300 bg-sky-500/10 border-sky-500/30';
      case 'Network Defense':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
      case 'Data Encryption':
        return 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30';
      case 'DevSecOps':
        return 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30';
      case 'Infrastructure':
        return 'text-purple-300 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-slate-300 bg-slate-500/10 border-slate-500/30';
    }
  };

  const renderIcon = (iconName: SecurityTip['iconName']) => {
    switch (iconName) {
      case 'key':
        return <KeyRound className="w-4 h-4 text-amber-400" />;
      case 'code':
        return <FileCode2 className="w-4 h-4 text-sky-400" />;
      case 'network':
        return <Network className="w-4 h-4 text-emerald-400" />;
      case 'lock':
        return <Lock className="w-4 h-4 text-indigo-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'server':
        return <Server className="w-4 h-4 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#0A1020]/95 via-[#080D1A]/95 to-[#0B1224]/95 border border-emerald-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md overflow-hidden transition-all duration-300 font-sans">
      {/* Top Banner Bar */}
      <div className="px-4 sm:px-6 py-3 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-[#060A14]/70">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white truncate">
              Security Tip of the Day
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
              Cyber Defense Brief #{currentIndex + 1}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleRandom}
            title="Shuffle tip"
            aria-label="Shuffle security tip"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy tip to clipboard'}
            aria-label="Copy security tip"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer relative"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="h-3 w-[1px] bg-white/[0.1] mx-0.5" />

          <button
            type="button"
            onClick={handlePrev}
            title="Previous tip"
            aria-label="Previous security tip"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 px-1">
            {currentIndex + 1}/{SECURITY_TIPS.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            title="Next tip"
            aria-label="Next security tip"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            className="ml-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] cursor-pointer"
          >
            {isMinimized ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </div>

      {/* Main Body */}
      {!isMinimized && (
        <div className="p-4 sm:p-6 space-y-3.5 animate-fadeIn">
          {/* Header Row: Category Badge + Title */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${getCategoryColor(
                currentTip.category
              )}`}
            >
              {renderIcon(currentTip.iconName)}
              <span>{currentTip.category}</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {currentTip.title}
            </h4>
          </div>

          {/* Advice Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {currentTip.advice}
          </p>

          {/* Golden Rule / Takeaway Highlight Box */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/20 text-xs">
            <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-semibold text-emerald-300">Actionable Rule: </span>
              <span className="text-slate-300 font-mono text-[11px]">{currentTip.keyRule}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
