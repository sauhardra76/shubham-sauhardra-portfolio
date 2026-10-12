import React from 'react';
import { PORTFOLIO_DATA, ServiceItem } from '../config/portfolioData';
import { Globe, Database, Search, Headphones, Smartphone, Cpu, Coins, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const { services } = PORTFOLIO_DATA;

  const getIcon = (iconName: ServiceItem['iconName']) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-sky-500" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-sky-500" />;
      case 'Coins':
      case 'Blocks':
      case 'Wallet':
        return <Coins className="w-6 h-6 text-sky-500" />;
      case 'Database':
        return <Database className="w-6 h-6 text-sky-500" />;
      case 'Search':
        return <Search className="w-6 h-6 text-sky-500" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-sky-500" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-sky-500" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-sky-500" />;
      default:
        return <Globe className="w-6 h-6 text-sky-500" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#07080D] border-b border-white/[0.08] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-sky-400" />
            <span>What I Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            My Services
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Practical IT, Web3, and software engineering services tailored for small businesses, educational institutions, startups, and private clients.
          </p>
        </ScrollReveal>

        {/* Service Cards Grid with Staggered Cascading Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.id}
              staggerIndex={index}
              direction="up"
              distance={24}
              className="h-full"
            >
              <Card3D
                glowColor={service.id === 'web3-blockchain' ? 'cyan' : 'emerald'}
                className={`h-full rounded-2xl p-7 border transition-all flex flex-col justify-between group ${
                  service.id === 'web3-blockchain'
                    ? 'bg-gradient-to-b from-[#10172D] to-[#0B0F1E] border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.12)]'
                    : 'bg-[#0D1222]/90 border-white/[0.07] hover:border-sky-500/40 hover:bg-[#11172A]'
                }`}
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all [&>svg]:group-hover:text-white">
                      {getIcon(service.iconName)}
                    </div>
                    <div className="flex items-center gap-2">
                      {service.id === 'web3-blockchain' && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          Web3 / dApps
                        </span>
                      )}
                      <span className="font-mono text-xs font-bold text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Highlights */}
                  <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-6 mt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForInquiry(service.title)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-sky-500/15 text-slate-300 hover:text-sky-300 border border-white/[0.08] hover:border-sky-400/40 transition-all group/btn cursor-pointer"
                  >
                    <span>Inquire for {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}

          {/* Complementary Architecture & Hybrid Project Consultation Banner */}
          <ScrollReveal
            staggerIndex={services.length}
            direction="up"
            distance={24}
            className="lg:col-span-2 h-full"
          >
            <Card3D
              glowColor="purple"
              className="h-full bg-gradient-to-br from-[#0E1528] via-[#0B1020] to-[#070A14] text-white rounded-2xl p-7 border border-white/[0.1] shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle architectural background texture */}
              <div className="absolute inset-0 bg-grid-mesh opacity-40 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-mono font-semibold border border-sky-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    Custom Engineering &amp; Hybrid Projects
                  </span>
                  <span className="font-mono text-xs text-sky-400/90">MILESTONE-BASED</span>
                </div>

              <h3 className="text-xl font-bold text-white tracking-tight font-display">
                Have a specialized requirement combining Web, Web3, or Mobile?
              </h3>

              <p className="text-sm text-slate-300 mt-2.5 max-w-xl leading-relaxed">
                Whether you need a custom full-stack dApp frontend with smart contract integration, a secure Android utility, a bespoke CRM workflow dashboard, or technical infrastructure setup, I provide direct developer communication and reliable execution.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]">✓ Direct developer contact</span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]">✓ Milestone-based delivery</span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]">✓ Transparent technical scope</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/[0.08] relative z-10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                Ready to review technical specifications or discuss a contract?
              </span>
              <button
                type="button"
                onClick={() => onSelectServiceForInquiry('Web3 & Blockchain Development')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white transition-all shadow-lg shadow-sky-500/25 cursor-pointer"
              >
                <span>Request Custom Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card3D>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
