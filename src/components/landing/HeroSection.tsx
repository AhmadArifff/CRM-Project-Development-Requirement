'use client';

import React from 'react';
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

  const BadgeIconComponent = iconMap[hero.badgeIcon] || Zap;

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
    <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Advanced Mesh Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-1000 delay-500" />

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
