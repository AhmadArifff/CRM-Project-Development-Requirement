'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Layers, Server, HardDrive, Cloud, CheckCircle, Info, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useLandingContentStore } from '@/store/useLandingContentStore';

export const ConsultingSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'mobile' | 'web' | 'cross'>('cross');
  const [selectedServer, setSelectedServer] = useState<'dedicated' | 'shared' | 'cloud'>('cloud');

  const platforms = [
    {
      id: 'cross',
      name: 'Cross-Platform (Flutter / React Native)',
      icon: Layers,
      popular: true,
      tag: 'Paling Direkomendasikan',
      behavior: 'Pengguna aktif di Android & iOS, membutuhkan performa tinggi dengan 1 codebase.',
      timeToMarket: '3-6 Minggu',
      costScore: 'Hemat 40%',
      recommendation: 'Cocok untuk MVP Startup, E-Commerce, CRM Mobile, & Aplikasi Layanan Publik.',
      features: ['1 Codebase untuk iOS & Android', 'Performa mendekati Native (60 FPS)', 'Biaya maintenance jauh lebih efisien'],
    },
    {
      id: 'web',
      name: 'Web Application (Next.js + PWA)',
      icon: Globe,
      popular: false,
      tag: 'Akses Cepat & SEO Friendly',
      behavior: 'Pengguna mengakses via Browser Laptop/HP tanpa wajib install dari PlayStore/AppStore.',
      timeToMarket: '2-4 Minggu',
      costScore: 'Sangat Hemat',
      recommendation: 'Sangat cocok untuk Admin CRM, Dashboard Analytics, B2B SaaS, & Landing Page.',
      features: ['Dapat diakses langsung via URL link', 'Dapat diinstall sebagai PWA di HP', 'Sangat mudah terindeks Google (SEO)'],
    },
    {
      id: 'mobile',
      name: 'Native Mobile (Kotlin / Swift)',
      icon: Smartphone,
      popular: false,
      tag: 'Performa Maksimum & Hardware',
      behavior: 'Pengguna membutuhkan akses hardware spesifik (Bluetooth khusus, sensor IoT, kamera berat).',
      timeToMarket: '8-12 Minggu',
      costScore: 'Biaya Tinggi',
      recommendation: 'Cocok untuk Game berat, Aplikasi FinTech Bank, atau IoT Industri Khusus.',
      features: ['Akses penuh fitur hardware HP', 'Performa 100% tanpa overhead', 'Codebase terpisah Android & iOS'],
    },
  ];

  const servers = [
    {
      id: 'cloud',
      name: 'Managed Cloud / Supabase Serverless',
      icon: Cloud,
      badge: 'Rekomendasi Efisiensi',
      cost: 'Rp 0 - 350rb / bln (Pay-as-you-grow)',
      maintenance: 'Otomatis (Zero Ops)',
      security: 'Sangat Tinggi (RLS + Encryption)',
      scalability: 'Otomatis Scaling',
      description: 'Serverless database PostgreSQL dengan storage bucket & Auth bawaan. Tidak perlu pusing maintenance OS/Server.',
      suitableFor: 'Aplikasi baru, CRM, SaaS, & MVP bisnis yang butuh rilis cepat.',
    },
    {
      id: 'shared',
      name: 'Dedicated Sharing (Shared / VPS Hosting)',
      icon: HardDrive,
      badge: 'Hemat Biaya Dasar',
      cost: 'Rp 150rb - 500rb / bln',
      maintenance: 'Sedang (Manual Config)',
      security: 'Menengah',
      scalability: 'Terbatas (Manual Upgrade)',
      description: 'Menyewa resource VPS bersama dalam satu server fisik. Hemat untuk traffic sedang.',
      suitableFor: 'Web company profile, katalog produk, & sistem internal terbatas.',
    },
    {
      id: 'dedicated',
      name: 'Dedicated Server (Beli / Sewa Server Sendiri)',
      icon: Server,
      badge: 'Full Control & Privacy',
      cost: 'Rp 2.5jt - 10jt+ / bln',
      maintenance: 'Tinggi (Perlu SysAdmin)',
      security: 'Kustom (Sesuai Tim Dev)',
      scalability: 'Manual Hardware Upgrade',
      description: 'Seluruh mesin server fisik dedicated hanya untuk aplikasi Anda. Data 100% di tangan Anda.',
      suitableFor: 'Perusahaan perbankan, rumah sakit, instansi pemerintah dengan regulasi privat ketat.',
    },
  ];

  const { consulting } = useLandingContentStore();

  return (
    <section id="layanan" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{consulting.badgeText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {consulting.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {consulting.sectionSubhead}
          </p>
        </div>

        {/* Part 1: Behavior & Platform Selector */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20">1</span>
                <span>{consulting.mobileWebCardTitle}</span>
              </h3>
              <p className="text-sm text-slate-400 mt-2">{consulting.mobileWebCardDesc}</p>
            </div>

            {/* Selector Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0a0f1c] border border-slate-800/80 shadow-inner">
              {platforms.map((p) => {
                const Icon = p.icon;
                const isActive = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id as any)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{p.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Platform Card - Bento Style */}
          {platforms.map((p) => {
            if (p.id !== selectedPlatform) return null;
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4"
              >
                {/* Main Bento Info */}
                <div className="lg:col-span-8 group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-colors backdrop-blur-xl">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                  
                  {p.popular && (
                    <div className="absolute top-6 right-6 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold rounded-full shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      {p.tag}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-cyan-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white tracking-tight">{p.name}</h4>
                      <p className="text-sm text-slate-400 mt-1">Target Rilis: <span className="text-cyan-400 font-bold">{p.timeToMarket}</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#060911]/60 p-5 rounded-2xl border border-white/5">
                      <h5 className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">User Behavior</h5>
                      <p className="text-slate-300 text-sm leading-relaxed">{p.behavior}</p>
                    </div>
                    <div className="bg-[#060911]/60 p-5 rounded-2xl border border-white/5">
                      <h5 className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">Analisis AI</h5>
                      <p className="text-slate-300 text-sm leading-relaxed">{p.recommendation}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Bento Cost Score */}
                <div className="lg:col-span-4 relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-blue-900/20 to-slate-900 border border-blue-500/20 flex flex-col justify-center text-center overflow-hidden group hover:border-cyan-500/40 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[50px] -z-10 group-hover:bg-cyan-500/30 transition-colors" />
                  
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-3">Efisiensi Biaya</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-sm mb-4">
                    {p.costScore}
                  </div>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                    Estimasi dirinci transparan dalam PRD.md AI sesuai fitur.
                  </p>
                  <a
                    href="/prd-builder"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/10 text-sm font-bold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <span>Simulasikan Platform Ini</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Part 2: Dedicated Server vs Dedicated Sharing (Server Comparison) */}
        <div id="server">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/20">2</span>
              <span>{consulting.serverCardTitle}</span>
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl">
              {consulting.serverCardDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servers.map((s) => {
              const Icon = s.icon;
              const isSelected = selectedServer === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedServer(s.id as any)}
                  className={`group relative p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-900/30 to-slate-900 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/20'
                      : 'bg-[#0a0f1c]/80 border-slate-800/80 hover:bg-[#0c1322] hover:border-slate-700'
                  } border backdrop-blur-md`}
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-2xl transition-colors duration-300 ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-colors ${isSelected ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-inner' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}>
                      {s.badge}
                    </span>
                  </div>

                  <h4 className={`text-xl font-bold mb-3 transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{s.name}</h4>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed min-h-[60px]">{s.description}</p>

                  <div className="space-y-3 text-sm p-4 rounded-2xl bg-black/20 border border-white/5 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Biaya Dasar:</span>
                      <span className={`font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>{s.cost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Maintenance:</span>
                      <span className="font-semibold text-slate-300">{s.maintenance}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Keamanan:</span>
                      <span className="font-semibold text-emerald-400">{s.security}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 p-4 rounded-xl border border-white/5 bg-white/5">
                    <strong className="text-white font-bold block mb-1">Paling Pas Untuk:</strong>
                    <span className="leading-relaxed">{s.suitableFor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
