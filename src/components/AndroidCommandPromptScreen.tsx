import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Wifi,
  Battery,
  RotateCcw,
  Palette,
  Maximize2,
  ChevronRight,
  CornerDownLeft,
  Sparkles,
  Command,
  Cpu,
  Smartphone
} from 'lucide-react';

interface AndroidCommandPromptScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

type TerminalTheme = 'green' | 'cyan' | 'amber' | 'purple';

interface CommandOutput {
  id: string;
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

export const AndroidCommandPromptScreen: React.FC<AndroidCommandPromptScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  const [theme, setTheme] = useState<TerminalTheme>('green');
  const [inputValue, setInputValue] = useState('');
  const [activeSession, setActiveSession] = useState<'sh' | 'adb'>('sh');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Theme styling configurations
  const themeStyles = {
    green: {
      bg: '#080E09',
      windowBg: '#040705',
      primary: '#22c55e',
      text: 'text-emerald-400',
      textLight: 'text-emerald-300',
      textDim: 'text-emerald-600',
      border: 'border-emerald-500/20',
      badgeBg: 'bg-emerald-950/70',
      prompt: 'text-emerald-400',
      accentGlow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)]',
    },
    cyan: {
      bg: '#080E14',
      windowBg: '#04070B',
      primary: '#38bdf8',
      text: 'text-sky-400',
      textLight: 'text-sky-300',
      textDim: 'text-sky-600',
      border: 'border-sky-500/20',
      badgeBg: 'bg-sky-950/70',
      prompt: 'text-sky-400',
      accentGlow: 'shadow-[0_0_15px_rgba(56,189,248,0.15)]',
    },
    amber: {
      bg: '#140D05',
      windowBg: '#0A0602',
      primary: '#f59e0b',
      text: 'text-amber-400',
      textLight: 'text-amber-300',
      textDim: 'text-amber-600',
      border: 'border-amber-500/20',
      badgeBg: 'bg-amber-950/70',
      prompt: 'text-amber-400',
      accentGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    },
    purple: {
      bg: '#100816',
      windowBg: '#08040B',
      primary: '#c084fc',
      text: 'text-purple-400',
      textLight: 'text-purple-300',
      textDim: 'text-purple-600',
      border: 'border-purple-500/20',
      badgeBg: 'bg-purple-950/70',
      prompt: 'text-purple-400',
      accentGlow: 'shadow-[0_0_15px_rgba(192,132,252,0.15)]',
    },
  }[theme];

  // Pre-seed terminal history so it's instantly visual and looks like a real Android terminal
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'boot',
      command: '',
      timestamp: '13:37:00',
      output: (
        <div className="space-y-1 font-mono text-[10px] leading-tight select-text">
          <div className="text-white/90 font-bold flex items-center gap-1.5">
            <span>[AndroPrompt v2.4.0-arm64 · Android CLI Environment]</span>
          </div>
          <div className="text-slate-400">
            Linux localhost 6.1.45-android14-9-g8a3910 #1 SMP PREEMPT aarch64
          </div>
          <div className="text-slate-400">
            Type <span className="font-bold underline cursor-pointer text-white">help</span> for command list or tap any quick action below.
          </div>
        </div>
      ),
    },
    {
      id: 'initial-neofetch',
      command: 'neofetch',
      timestamp: '13:37:02',
      output: (
        <div className="font-mono text-[9px] sm:text-[10px] leading-tight flex flex-col sm:flex-row gap-3 py-1 select-text">
          {/* ASCII Android Robot */}
          <pre className="text-emerald-400 font-bold shrink-0 leading-[1.1] opacity-90 select-none">
{`   .-''''-.
  | ==  == |
  |________|
   |  ||  |
  [========]`}
          </pre>
          <div className="space-y-0.5">
            <div><span className="text-emerald-400 font-bold">user</span><span className="text-slate-400">@</span><span className="text-sky-400 font-bold">android-host</span></div>
            <div className="text-slate-500">----------------------</div>
            <div><span className="text-slate-400 font-medium">OS:</span> <span className="text-slate-200">Android 14 (UpsideDownCake API 34)</span></div>
            <div><span className="text-slate-400 font-medium">Host:</span> <span className="text-slate-200">Shubham Dev Edition (Snapdragon 8 Gen 3)</span></div>
            <div><span className="text-slate-400 font-medium">Kernel:</span> <span className="text-slate-200">6.1.45-android14-aarch64</span></div>
            <div><span className="text-slate-400 font-medium">Shell:</span> <span className="text-slate-200">sh / mksh (POSIX compliant)</span></div>
            <div><span className="text-slate-400 font-medium">Memory:</span> <span className="text-slate-200">4192MB / 12288MB (34%)</span></div>
            <div><span className="text-slate-400 font-medium">Apps:</span> <span className="text-slate-200">5 Sauhardra Mobile Packages</span></div>
          </div>
        </div>
      ),
    },
  ]);

  // Auto scroll to terminal end
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Execute terminal command
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    let resultOutput: React.ReactNode;

    switch (mainCmd) {
      case 'clear':
      case 'cls':
        setHistory([
          {
            id: `clear-${Date.now()}`,
            command: '',
            timestamp: timeStr,
            output: (
              <div className="font-mono text-[10px] text-slate-400 select-text">
                [Terminal buffer cleared · AndroPrompt CLI Session Active]
              </div>
            ),
          },
        ]);
        setInputValue('');
        setHistoryIndex(-1);
        return;

      case 'help':
        resultOutput = (
          <div className="space-y-1.5 font-mono text-[9px] sm:text-[10px] leading-normal text-slate-300 select-text">
            <div className="text-white font-bold pb-1 border-b border-white/10">
              ANDROPROMPT COMMAND DIRECTORY
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div><span className="text-sky-400 font-bold">neofetch</span> - Device, OS, kernel &amp; hardware specs</div>
              <div><span className="text-sky-400 font-bold">adb devices</span> - Attached debugging devices &amp; status</div>
              <div><span className="text-sky-400 font-bold">pm list</span> - Enumerate installed Android applications</div>
              <div><span className="text-sky-400 font-bold">apps</span> - Showcase Shubham Sauhardra mobile suite</div>
              <div><span className="text-sky-400 font-bold">top / ps</span> - Real-time running system processes</div>
              <div><span className="text-sky-400 font-bold">df -h</span> - Inspect internal storage and partitions</div>
              <div><span className="text-sky-400 font-bold">battery</span> - Android power &amp; thermal diagnostics</div>
              <div><span className="text-sky-400 font-bold">uname -a</span> - Complete Linux kernel architecture string</div>
              <div><span className="text-sky-400 font-bold">ping</span> - Network ICMP latency test simulation</div>
              <div><span className="text-sky-400 font-bold">theme &lt;green|cyan|amber|purple&gt;</span> - Switch palette</div>
              <div><span className="text-sky-400 font-bold">clear</span> - Clear terminal scrollback buffer</div>
            </div>
          </div>
        );
        break;

      case 'neofetch':
      case 'fastfetch':
        resultOutput = (
          <div className="font-mono text-[9px] sm:text-[10px] leading-tight flex flex-col sm:flex-row gap-3 py-1 select-text">
            <pre className="text-emerald-400 font-bold shrink-0 leading-[1.1] select-none">
{`   .-''''-.
  | ==  == |
  |________|
   |  ||  |
  [========]`}
            </pre>
            <div className="space-y-0.5">
              <div><span className="text-emerald-400 font-bold">user</span><span className="text-slate-400">@</span><span className="text-sky-400 font-bold">android-host</span></div>
              <div className="text-slate-500">----------------------</div>
              <div><span className="text-slate-400 font-medium">OS:</span> <span className="text-slate-200">Android 14 (UpsideDownCake)</span></div>
              <div><span className="text-slate-400 font-medium">Host:</span> <span className="text-slate-200">Shubham Dev Edition (Snapdragon 8 Gen 3)</span></div>
              <div><span className="text-slate-400 font-medium">Kernel:</span> <span className="text-slate-200">6.1.45-android14-aarch64</span></div>
              <div><span className="text-slate-400 font-medium">Uptime:</span> <span className="text-slate-200">4 days, 16 hours, 22 mins</span></div>
              <div><span className="text-slate-400 font-medium">Memory:</span> <span className="text-slate-200">4192MB / 12288MB (34%)</span></div>
              <div><span className="text-slate-400 font-medium">Storage:</span> <span className="text-slate-200">42GB / 256GB UFS 4.0</span></div>
            </div>
          </div>
        );
        break;

      case 'adb':
        if (args.includes('devices') || !args) {
          resultOutput = (
            <div className="space-y-1 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
              <div className="text-slate-400">* daemon not running; starting now at tcp:5037</div>
              <div className="text-slate-400">* daemon started successfully</div>
              <div className="text-emerald-400 font-bold mt-1">List of devices attached:</div>
              <div className="flex items-center justify-between text-slate-200">
                <span>emulator-5554</span>
                <span className="text-emerald-400 font-bold">device [Pixel_8_Pro_arm64]</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>192.168.1.104:5555</span>
                <span className="text-sky-400 font-bold">device [Wireless_Debug_Active]</span>
              </div>
            </div>
          );
        } else {
          resultOutput = (
            <div className="font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
              adb: executing [{args}] ... OK [status 0]
            </div>
          );
        }
        break;

      case 'pm':
      case 'packages':
        resultOutput = (
          <div className="space-y-1 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-white font-bold pb-0.5 border-b border-white/10">
              PACKAGE MANAGER: 5 INSTALLED SHUBHAM SAUHRADRA APPS
            </div>
            <div className="text-emerald-400">package:com.sauhardra.calcone [1CalcOne v1.4.2 · Active]</div>
            <div className="text-purple-400">package:com.sauhardra.astroveda [AstroVeda AI v2.1.0 · Active]</div>
            <div className="text-sky-400">package:com.sauhardra.digitalkhata [DigitalKhata v1.0.8 · Active]</div>
            <div className="text-amber-400">package:com.sauhardra.phoneraksha [PhoneRaksha v3.0.1 · Armed]</div>
            <div className="text-emerald-300">package:com.sauhardra.androprompt [AndroPrompt v2.4.0 · Running]</div>
            <div className="text-slate-500 pt-1">+ 138 system core packages (com.android.systemui, etc.)</div>
          </div>
        );
        break;

      case 'apps':
        resultOutput = (
          <div className="space-y-1.5 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-white font-bold">SHUBHAM SAUHRADRA ANDROID PORTFOLIO:</div>
            <div className="p-1.5 rounded bg-white/[0.04] border border-white/10 space-y-0.5">
              <div><strong className="text-amber-400">1. 1CalcOne:</strong> All-in-One Offline Math &amp; Finance Calculator</div>
              <div><strong className="text-purple-400">2. AstroVeda AI:</strong> 3D Planetary Orbit &amp; Kundli Guidance</div>
              <div><strong className="text-sky-400">3. DigitalKhata:</strong> MSME Credit/Debit Ledger &amp; Bookkeeping</div>
              <div><strong className="text-emerald-400">4. PhoneRaksha:</strong> Proactive Anti-Theft Siren &amp; Sensor Protection</div>
              <div><strong className="text-cyan-400">5. AndroPrompt:</strong> Native Command Prompt UI &amp; Shell Tools</div>
            </div>
          </div>
        );
        break;

      case 'top':
      case 'ps':
        resultOutput = (
          <div className="space-y-1 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-white font-bold flex justify-between text-[8px] sm:text-[9px] text-slate-400 border-b border-white/10 pb-0.5">
              <span>PID USER PR CPU% MEM% COMMAND</span>
            </div>
            <div className="text-emerald-400"> 1240 root 20 2.4 1.8 system_server</div>
            <div className="text-sky-400"> 2048 u0_a247 20 1.2 0.9 com.sauhardra.androprompt</div>
            <div className="text-slate-300"> 1590 surface 20 0.8 0.6 surfaceflinger</div>
            <div className="text-amber-400"> 2891 shell 20 0.4 0.2 adbd</div>
            <div className="text-slate-400"> 3102 u0_a112 20 0.1 0.4 com.sauhardra.phoneraksha</div>
            <div className="text-slate-500">Tasks: 182 total, 2 running, 180 sleeping</div>
          </div>
        );
        break;

      case 'df':
      case 'storage':
        resultOutput = (
          <div className="space-y-1 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-white font-bold">FILESYSTEM USAGE SUMMARY:</div>
            <div className="flex justify-between text-slate-400 text-[8px] sm:text-[9px]">
              <span>Filesystem Size Used Avail Use% Mounted</span>
            </div>
            <div className="text-emerald-400">/dev/block/dm-0 256G 42G 214G 17% /data</div>
            <div className="text-slate-300">/dev/block/sda3 4.2G 3.8G 400M 90% /system</div>
            <div className="text-sky-400">/data/media/0 214G 18G 196G 9% /sdcard</div>
          </div>
        );
        break;

      case 'battery':
      case 'dumpsys':
        resultOutput = (
          <div className="space-y-1 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-emerald-400 font-bold">BATTERY POWER DIAGNOSTICS:</div>
            <div>Level: <span className="text-white font-bold">96%</span> (Lithium-Ion 5050mAh)</div>
            <div>Status: <span className="text-emerald-400">Discharging (Optimal Health)</span></div>
            <div>Voltage: <span className="text-slate-200">4180 mV</span> · Temp: <span className="text-slate-200">28.4°C</span></div>
            <div>AC Charger: <span className="text-slate-400">Disconnected</span> · Wireless: <span className="text-slate-400">Idle</span></div>
          </div>
        );
        break;

      case 'uname':
        resultOutput = (
          <div className="font-mono text-[9px] sm:text-[10px] text-emerald-400 select-text">
            Linux localhost 6.1.45-android14-9-g8a3910 #1 SMP PREEMPT aarch64 GNU/Linux
          </div>
        );
        break;

      case 'sysinfo':
        resultOutput = (
          <div className="space-y-1 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-white font-bold">SYSTEM HARDWARE SPECIFICATIONS:</div>
            <div>CPU Architecture: <span className="text-sky-400 font-mono">ARMv9-A (aarch64 64-bit)</span></div>
            <div>SoC: <span className="text-slate-200">Qualcomm Snapdragon 8 Gen 3 (Octa-Core)</span></div>
            <div>ABI: <span className="text-slate-200">arm64-v8a</span></div>
            <div>Security Patch: <span className="text-emerald-400">2026-03-05 Verified</span></div>
            <div>SELinux Policy: <span className="text-emerald-400">Enforcing (Level 34)</span></div>
          </div>
        );
        break;

      case 'ping':
        resultOutput = (
          <div className="space-y-0.5 font-mono text-[9px] sm:text-[10px] text-slate-300 select-text">
            <div className="text-slate-400">PING google.com (8.8.8.8) 56(84) bytes of data.</div>
            <div className="text-emerald-400">64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms</div>
            <div className="text-emerald-400">64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=12.8 ms</div>
            <div className="text-emerald-400">64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=13.6 ms</div>
            <div className="text-sky-300 pt-0.5">--- 3 packets transmitted, 3 received, 0% packet loss ---</div>
          </div>
        );
        break;

      case 'theme':
        if (['green', 'cyan', 'amber', 'purple'].includes(args.toLowerCase())) {
          setTheme(args.toLowerCase() as TerminalTheme);
          resultOutput = (
            <div className="font-mono text-[10px] text-slate-300 select-text">
              Terminal color palette changed to <strong className="text-white uppercase">{args}</strong>.
            </div>
          );
        } else {
          resultOutput = (
            <div className="font-mono text-[10px] text-slate-300 select-text">
              Usage: <code className="text-sky-400">theme green | cyan | amber | purple</code>
            </div>
          );
        }
        break;

      case 'date':
        resultOutput = (
          <div className="font-mono text-[10px] text-slate-200 select-text">
            {new Date().toUTCString()}
          </div>
        );
        break;

      case 'whoami':
        resultOutput = (
          <div className="font-mono text-[10px] text-emerald-400 select-text">
            u0_a247 (uid=10247 gid=10247 groups=inet,sdcard_rw,dev_tools)
          </div>
        );
        break;

      case 'echo':
        resultOutput = (
          <div className="font-mono text-[10px] text-slate-200 select-text">
            {args || ''}
          </div>
        );
        break;

      default:
        resultOutput = (
          <div className="font-mono text-[9px] sm:text-[10px] text-rose-400 select-text">
            sh: command not found: <span className="font-bold">{trimmed}</span>. Type <span className="text-sky-300 underline font-bold cursor-pointer" onClick={() => executeCommand('help')}>help</span> for list of commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        timestamp: timeStr,
        output: resultOutput,
      },
    ]);

    setInputValue('');
    setHistoryIndex(-1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputValue);
  };

  // Quick chips
  const quickActions = [
    { label: 'help', cmd: 'help' },
    { label: 'neofetch', cmd: 'neofetch' },
    { label: 'adb devices', cmd: 'adb devices' },
    { label: 'pm list', cmd: 'pm list' },
    { label: 'apps', cmd: 'apps' },
    { label: 'top', cmd: 'top' },
    { label: 'df -h', cmd: 'df -h' },
    { label: 'battery', cmd: 'battery' },
    { label: 'ping', cmd: 'ping' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <div
      className={`w-full h-full text-white flex flex-col font-mono select-none overflow-hidden relative transition-colors duration-300 ${className}`}
      style={{
        background: themeStyles.bg,
      }}
    >
      {/* Top Android Status Bar */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0 border-b border-white/[0.04]">
        <div className="flex items-center gap-1.5">
          <Terminal className={`w-3.5 h-3.5 ${themeStyles.text}`} />
          <span className="font-bold text-white tracking-tight text-[10px]">13:37</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-white/[0.08] text-slate-300 font-mono">
            5G
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Palette Selector Pill */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTheme('green')}
              className={`w-2 h-2 rounded-full bg-emerald-500 transition-transform ${theme === 'green' ? 'scale-125 ring-1 ring-white' : 'opacity-60'}`}
              title="Green theme"
            />
            <button
              type="button"
              onClick={() => setTheme('cyan')}
              className={`w-2 h-2 rounded-full bg-sky-400 transition-transform ${theme === 'cyan' ? 'scale-125 ring-1 ring-white' : 'opacity-60'}`}
              title="Cyan theme"
            />
            <button
              type="button"
              onClick={() => setTheme('amber')}
              className={`w-2 h-2 rounded-full bg-amber-400 transition-transform ${theme === 'amber' ? 'scale-125 ring-1 ring-white' : 'opacity-60'}`}
              title="Amber theme"
            />
            <button
              type="button"
              onClick={() => setTheme('purple')}
              className={`w-2 h-2 rounded-full bg-purple-400 transition-transform ${theme === 'purple' ? 'scale-125 ring-1 ring-white' : 'opacity-60'}`}
              title="Purple theme"
            />
          </div>

          <div className="flex items-center gap-1 opacity-90 text-[10px]">
            <Wifi className="w-3 h-3 text-slate-300" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Terminal App Navigation Header */}
      <div className="px-3 py-1.5 flex items-center justify-between shrink-0 bg-black/40 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1">
            <span className={themeStyles.prompt}>&gt;_</span>
            <span>AndroPrompt</span>
          </span>
          <div className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono">
            SESSION #1
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
            title="Clear Terminal Buffer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body / Scrollable Area */}
      <div
        className="flex-1 p-3 overflow-y-auto space-y-2 text-left select-text scrollbar-thin scrollbar-thumb-white/10"
        style={{
          background: themeStyles.windowBg,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                <span className={themeStyles.prompt}>u0_a247@android:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}

        {/* Current Active Input Line */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 pt-1 text-[10px] font-mono">
          <span className={`${themeStyles.prompt} shrink-0`}>u0_a247@android:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="type command (help, neofetch, pm list)..."
            className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none text-[10px] font-mono"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button
            type="submit"
            className={`p-1 rounded ${themeStyles.badgeBg} ${themeStyles.text} hover:opacity-80 transition-opacity`}
            title="Execute Command"
          >
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Quick-Action Tap Chips */}
      <div className="px-2 py-1.5 bg-black/60 border-t border-white/[0.06] shrink-0 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest pl-1 shrink-0">
          QUICK:
        </span>
        {quickActions.map((action) => (
          <button
            key={action.cmd}
            type="button"
            onClick={() => executeCommand(action.cmd)}
            className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.08] shrink-0 active:scale-95 transition-all cursor-pointer"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Hacker / Termux Virtual Accessory Keys Row */}
      <div className="px-2 py-1 bg-black/80 border-t border-white/[0.04] shrink-0 flex items-center justify-between text-[8px] text-slate-400 font-mono">
        <button
          type="button"
          onClick={() => {
            if (!inputValue) setInputValue('help');
            inputRef.current?.focus();
          }}
          className="px-1.5 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.08]"
        >
          TAB
        </button>
        <button
          type="button"
          onClick={() => {
            setInputValue('');
            inputRef.current?.focus();
          }}
          className="px-1.5 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.08]"
        >
          ESC
        </button>
        <button
          type="button"
          onClick={() => executeCommand('top')}
          className="px-1.5 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.08]"
        >
          CTRL-C
        </button>
        <button
          type="button"
          onClick={() => executeCommand('neofetch')}
          className="px-1.5 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.08]"
        >
          SYS
        </button>
        <button
          type="button"
          onClick={() => executeCommand('adb devices')}
          className="px-1.5 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.08]"
        >
          ADB
        </button>
        <button
          type="button"
          onClick={() => executeCommand('clear')}
          className="px-1.5 py-0.5 rounded bg-white/[0.03] hover:bg-white/[0.08] text-amber-400"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};
