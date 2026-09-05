'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  Sparkles,
  Shield,
  Rocket,
  Bot,
  Code,
  Server,
  Globe,
  Star,
  CheckCircle2,
  ThumbsUp,
  Heart,
  Zap,
  ArrowRight,
  FileText,
  Database,
  Cpu,
} from 'lucide-react';
import { useLandingContentStore } from '@/store/useLandingContentStore';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Sparkles,
  Shield,
  Rocket,
  Bot,
  Code,
  Server,
  Globe,
  Star,
  CheckCircle2,
  ThumbsUp,
  Heart,
};

export const HeroSection: React.FC = () => {
  const { hero } = useLandingContentStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const BadgeIconComponent = iconMap[hero.badgeIcon] || Zap;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  // Stagger variants for feature cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden"
    >
      {/* Advanced Interactive Mouse-reactive Parallax Glow Background */}
      <motion.div
        animate={{
          x: mousePos.x * 40,
          y: mousePos.y * 40,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: mousePos.x * -50,
          y: mousePos.y * -50,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />

      {/* Floating Interactive Tech Badges (Hidden on mobile) */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: mousePos.x * 20,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex items-center gap-2 absolute top-28 left-8 px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.15)] text-xs font-mono text-cyan-300 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <Code className="w-3.5 h-3.5 text-cyan-400" />
        <span>Next.js 16 + React 19</span>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          x: mousePos.x * -25,
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:flex items-center gap-2 absolute top-32 right-8 px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] text-xs font-mono text-purple-300 pointer-events-none"
      >
        <Database className="w-3.5 h-3.5 text-purple-400" />
        <span>Supabase PostgreSQL + RLS</span>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -8, 0],
          x: mousePos.x * 15,
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="hidden xl:flex items-center gap-2 absolute bottom-24 left-16 px-3.5 py-2 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] text-xs font-mono text-emerald-300 pointer-events-none"
      >
        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
        <span>OpenRouter AI Architecture</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Dynamic Badge Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-cyan-300 mb-8 shadow-inner shadow-cyan-500/10"
          >
            <BadgeIconComponent className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="tracking-wide">{hero.badgeText}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-[5rem] font-extrabold text-white tracking-tighter leading-[1.05] mb-8 drop-shadow-2xl"
          >
            {hero.headlineLine1} <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-blue-500 filter drop-shadow-lg">
              {hero.headlineHighlight}
            </span> {hero.headlineLine2}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal tracking-wide"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/prd-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#060911] font-bold text-sm hover:bg-slate-200 transition-all duration-300 group hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] relative overflow-hidden"
            >
              <span className="relative z-10">{hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>

            <a
              href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-slate-700/80 bg-slate-800/30 backdrop-blur-md text-slate-200 font-semibold text-sm hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300"
            >
              <span>{hero.secondaryCtaText}</span>
            </a>
          </motion.div>

          {/* Feature Highlights Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <motion.div variants={itemVariants} className="group relative p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-colors backdrop-blur-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
              <Code className="w-5 h-5 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-[13px] font-bold text-slate-200 mb-1">{hero.card1Title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{hero.card1Sub}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="group relative p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-indigo-500/30 transition-colors backdrop-blur-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
              <Server className="w-5 h-5 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-[13px] font-bold text-slate-200 mb-1">{hero.card2Title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{hero.card2Sub}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="group relative p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-emerald-500/30 transition-colors backdrop-blur-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
              <FileText className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-[13px] font-bold text-slate-200 mb-1">{hero.card3Title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{hero.card3Sub}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="group relative p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-colors backdrop-blur-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
              <Shield className="w-5 h-5 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-[13px] font-bold text-slate-200 mb-1">{hero.card4Title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{hero.card4Sub}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
