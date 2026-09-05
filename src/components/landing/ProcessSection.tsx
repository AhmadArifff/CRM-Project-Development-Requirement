'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Bot, Calculator, PhoneCall, Sparkles, ArrowRight } from 'lucide-react';
import { useLandingContentStore } from '@/store/useLandingContentStore';
import Link from 'next/link';

export const ProcessSection: React.FC = () => {
  const { process } = useLandingContentStore();
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const steps = [
    {
      step: '01',
      title: process.step1Title,
      desc: process.step1Desc,
      icon: HelpCircle,
      color: 'from-blue-500 to-indigo-500',
      badge: 'Step 1: Onboarding',
    },
    {
      step: '02',
      title: process.step2Title,
      desc: process.step2Desc,
      icon: Bot,
      color: 'from-indigo-500 to-purple-500',
      badge: 'Step 2: Scoping AI',
    },
    {
      step: '03',
      title: process.step3Title,
      desc: process.step3Desc,
      icon: Calculator,
      color: 'from-purple-500 to-cyan-500',
      badge: 'Step 3: Kalkulasi',
    },
    {
      step: '04',
      title: process.step4Title,
      desc: process.step4Desc,
      icon: PhoneCall,
      color: 'from-cyan-500 to-emerald-500',
      badge: 'Step 4: Kickoff Proyek',
    },
  ];

  return (
    <section id="alur" className="py-20 bg-slate-950/40 relative border-t border-b border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{process.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {process.sectionTitle}
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            Metode transparansi 4 langkah dari perumusan spesifikasi hingga penyerahan source code production.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated Connecting Line (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-slate-800/80 -z-10" />
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 origin-left -z-10 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          />

          {steps.map((item, idx) => {
            const isHovered = activeHover === idx;
            const ItemIcon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                onMouseEnter={() => setActiveHover(idx)}
                onMouseLeave={() => setActiveHover(null)}
                className={`group relative p-6 rounded-3xl bg-[#0a0f1c]/90 border transition-all duration-300 backdrop-blur-md overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.15)] -translate-y-2'
                    : 'border-slate-800/80 shadow-lg hover:border-slate-700'
                }`}
              >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
                
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-3xl font-black font-mono transition-colors duration-300 ${
                    isHovered ? 'text-cyan-400' : 'text-slate-800'
                  }`}>
                    {item.step}
                  </span>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} p-[1px] shadow-lg transition-all duration-300 ${
                    isHovered ? 'shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-110' : ''
                  }`}>
                    <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                      <ItemIcon className={`w-5 h-5 text-white transition-transform duration-300 ${
                        isHovered ? 'scale-110' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-cyan-400/80 font-bold tracking-wider uppercase block mb-1">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Micro Action link on step 1 */}
                {idx === 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <Link
                      href="/prd-builder"
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                    >
                      <span>Mulai Alur Sekarang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
