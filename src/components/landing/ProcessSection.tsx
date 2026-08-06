'use client';

import React from 'react';
import { ShieldCheck, HelpCircle, Bot, Calculator, Send, PhoneCall } from 'lucide-react';
import { useLandingContentStore } from '@/store/useLandingContentStore';

export const ProcessSection: React.FC = () => {
  const { process } = useLandingContentStore();

  const steps = [
    {
      step: '01',
      title: process.step1Title,
      desc: process.step1Desc,
      icon: HelpCircle,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      step: '02',
      title: process.step2Title,
      desc: process.step2Desc,
      icon: Bot,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      step: '03',
      title: process.step3Title,
      desc: process.step3Desc,
      icon: Calculator,
      color: 'from-purple-500 to-cyan-500',
    },
    {
      step: '04',
      title: process.step4Title,
      desc: process.step4Desc,
      icon: PhoneCall,
      color: 'from-cyan-500 to-emerald-500',
    },
  ];

  return (
    <section id="alur" className="py-20 bg-slate-950/40 relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono block mb-2">
            {process.badgeText}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {process.sectionTitle}
          </h2>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-6 border-slate-800/80 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-cyan-400 transition-colors">
                  {item.step}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} p-0.5 shadow-lg`}>
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
