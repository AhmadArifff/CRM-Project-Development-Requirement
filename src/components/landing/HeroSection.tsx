'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

const iconMap: Record<string, React.FC<{ className?: string }>> = {
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

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Glow Effects Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Dynamic Badge Icon */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-blue-500/30 text-xs font-semibold text-cyan-300 mb-6 shadow-inner"
          >
            <BadgeIconComponent className="w-3.5 h-3.5 text-amber-400" />
            <span>{hero.badgeText}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
          >
            {hero.headlineLine1} <br className="hidden sm:inline" />
            <span className="gradient-text-cyan">{hero.headlineHighlight}</span> {hero.headlineLine2}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/prd-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 group"
            >
              <span>{hero.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass-card border-slate-700/80 text-slate-200 font-semibold text-sm hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-300"
            >
              <span>{hero.secondaryCtaText}</span>
            </a>
          </motion.div>

          {/* Feature Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="glass-card p-4 rounded-xl border-slate-800/80">
              <Code className="w-5 h-5 text-cyan-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-0.5">{hero.card1Title}</h4>
              <p className="text-[11px] text-slate-400">{hero.card1Sub}</p>
            </div>
            <div className="glass-card p-4 rounded-xl border-slate-800/80">
              <Server className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-0.5">{hero.card2Title}</h4>
              <p className="text-[11px] text-slate-400">{hero.card2Sub}</p>
            </div>
            <div className="glass-card p-4 rounded-xl border-slate-800/80">
              <FileText className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-0.5">{hero.card3Title}</h4>
              <p className="text-[11px] text-slate-400">{hero.card3Sub}</p>
            </div>
            <div className="glass-card p-4 rounded-xl border-slate-800/80">
              <Shield className="w-5 h-5 text-purple-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-0.5">{hero.card4Title}</h4>
              <p className="text-[11px] text-slate-400">{hero.card4Sub}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
