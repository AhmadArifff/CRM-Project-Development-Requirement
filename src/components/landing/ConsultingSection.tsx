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
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
                <span>{consulting.mobileWebCardTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">{consulting.mobileWebCardDesc}</p>
            </div>

            {/* Selector Buttons */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
              {platforms.map((p) => {
                const Icon = p.icon;
                const isActive = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{p.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Platform Card */}
          {platforms.map((p) => {
            if (p.id !== selectedPlatform) return null;
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl p-6 sm:p-8 border-slate-700/60 relative overflow-hidden"
              >
                {p.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold rounded-full">
                    {p.tag}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-blue-500/15 text-cyan-400 border border-blue-500/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white">{p.name}</h4>
                        <p className="text-xs text-slate-400">Target Time to Market: <span className="text-cyan-300 font-semibold">{p.timeToMarket}</span></p>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs sm:text-sm">
                      <p className="text-slate-300">
                        <strong className="text-blue-400 font-semibold">User Behavior:</strong> {p.behavior}
                      </p>
                      <p className="text-slate-300">
                        <strong className="text-emerald-400 font-semibold">Analisis Konsultan:</strong> {p.recommendation}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Efisiensi Biaya Development</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">{p.costScore}</div>
                    <p className="text-xs text-slate-400">
                      Rekomendasi ini di-breakdown otomatis dalam PRD.md AI sesuai fitur yang Anda ajukan.
                    </p>
                    <a
                      href="/prd-builder"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-blue-600/30 text-cyan-300 hover:bg-blue-600/40 border border-blue-500/40 text-xs font-semibold transition-all"
                    >
                      <span>Simulasikan PRD Platform Ini</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Part 2: Dedicated Server vs Dedicated Sharing (Server Comparison) */}
        <div id="server">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
              <span>{consulting.serverCardTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
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
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500/60 ring-2 ring-cyan-500/30 bg-slate-900/90'
                      : 'hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/15 text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                      {s.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{s.name}</h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">{s.description}</p>

                  <div className="space-y-2 text-xs border-t border-b border-slate-800 py-3 my-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimasi Biaya:</span>
                      <span className="font-semibold text-cyan-300">{s.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Maintenance Ops:</span>
                      <span className="font-semibold text-slate-200">{s.maintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tingkat Keamanan:</span>
                      <span className="font-semibold text-emerald-400">{s.security}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300">
                    <strong className="text-slate-200 font-semibold block mb-1">Cocok Untuk:</strong>
                    <span>{s.suitableFor}</span>
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
