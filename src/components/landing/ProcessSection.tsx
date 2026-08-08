'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated Connecting Line (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-slate-800/80 -z-10" />
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 origin-left -z-10"
          />

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              className="group relative p-6 rounded-3xl bg-[#0a0f1c]/80 border border-slate-800/80 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black font-mono text-slate-800 group-hover:text-cyan-900 transition-colors duration-300">
                  {item.step}
                </span>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} p-[1px] shadow-lg group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 group-hover:-translate-y-1`}>
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
