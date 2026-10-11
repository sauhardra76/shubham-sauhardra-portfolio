import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { MessageSquare, Calendar, Code, CheckSquare, Rocket } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

export const Process: React.FC = () => {
  const { processSteps } = PORTFOLIO_DATA;

  const stepIcons = [
    <MessageSquare className="w-5 h-5" key="1" />,
    <Calendar className="w-5 h-5" key="2" />,
    <Code className="w-5 h-5" key="3" />,
    <CheckSquare className="w-5 h-5" key="4" />,
    <Rocket className="w-5 h-5" key="5" />
  ];

  return (
    <section id="process" className="py-24 bg-[#07080D] border-b border-white/[0.08] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-sky-400" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            My 5-Step Working Process
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            A structured, transparent workflow ensuring requirements are fulfilled accurately and projects delivered smoothly.
          </p>
        </ScrollReveal>

        {/* 5-Step Cards Grid with Staggered Cascading Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {processSteps.map((step, index) => (
            <ScrollReveal
              key={step.stepNumber}
              staggerIndex={index}
              direction="up"
              distance={24}
              className="h-full"
            >
              <Card3D
                glowColor="cyan"
                className="h-full bg-[#0D1222]/90 rounded-2xl p-6 border border-white/[0.07] shadow-xl hover:border-sky-500/40 hover:bg-[#11172A] transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all [&>svg]:group-hover:text-white">
                      {stepIcons[index]}
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-500 group-hover:text-sky-400 transition-colors">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progress Indicator line */}
                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <span className="text-sky-400 font-bold">Step {index + 1}</span>
                  <span>of 5</span>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
