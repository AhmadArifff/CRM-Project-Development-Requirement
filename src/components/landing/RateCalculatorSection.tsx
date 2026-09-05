'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePrdStore } from '@/store/usePrdStore';
import { useLandingContentStore } from '@/store/useLandingContentStore';
import { Calculator, Sparkles, ArrowRight, Check, Plus, ShieldCheck, Zap, Lock, CreditCard, MessageSquare, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Smooth Animated Number Counter Component
const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string; isCurrency?: boolean }> = ({
  value,
  prefix = '',
  suffix = '',
  isCurrency = false,
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const duration = 400; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(startValue + (value - startValue) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  const formatted = isCurrency
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(displayValue)
    : displayValue.toLocaleString('id-ID');

  return (
    <span className="font-mono tabular-nums tracking-tight">
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const RateCalculatorSection: React.FC = () => {
  const { hourlyRate, setHourlyRate, estimatedHours, setEstimatedHours } = usePrdStore();
  const { rateCalculator } = useLandingContentStore();

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsList = [
    { id: 'auth2fa', label: 'Auth & 2FA Security', hours: 15, icon: Lock },
    { id: 'payment', label: 'Payment Gateway (Midtrans)', hours: 20, icon: CreditCard },
    { id: 'websockets', label: 'Realtime WebSockets Chat', hours: 25, icon: MessageSquare },
    { id: 'rbac', label: 'Enterprise Multi-role RBAC', hours: 15, icon: Users },
  ];

  const toggleAddon = (id: string, hours: number) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
      setEstimatedHours(Math.max(20, estimatedHours - hours));
    } else {
      setSelectedAddons([...selectedAddons, id]);
      setEstimatedHours(estimatedHours + hours);
    }
  };

  const totalEstimate = estimatedHours * hourlyRate;

  const presets = [
    { label: 'Small MVP / Landing', hours: 40, desc: '1-2 Minggu (Core Fitur & Auth)' },
    { label: 'Medium App + CRM', hours: 120, desc: '3-5 Minggu (Kanban, Tasks, PRD AI)' },
    { label: 'Full Enterprise Platform', hours: 240, desc: '6-10 Minggu (Scale & Multi-role)' },
  ];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-20 relative bg-slate-950/60 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-blue-500/30 text-xs font-semibold text-cyan-300">
              <Calculator className="w-3.5 h-3.5" />
              <span>{rateCalculator.badgeText}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {rateCalculator.sectionTitle}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {rateCalculator.sectionSubhead}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Check className="w-4 h-4" />
                </div>
                <span>{rateCalculator.guarantee1}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Check className="w-4 h-4" />
                </div>
                <span>{rateCalculator.guarantee2}</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-blue-500/20 via-slate-800/50 to-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
              <div className="bg-[#0a0f1c] rounded-[22px] p-6 sm:p-10 w-full h-full space-y-7 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

                {/* Hourly Rate Control */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end text-sm font-medium">
                    <label className="text-slate-400">Rate Biaya Per Jam Workrate:</label>
                    <span className="text-cyan-400 font-extrabold text-xl">
                      <AnimatedNumber value={hourlyRate} isCurrency={true} /> <span className="text-sm font-normal text-slate-500">/ Jam</span>
                    </span>
                  </div>
                  <div className="relative pt-2 pb-2">
                    <input
                      type="range"
                      min="100000"
                      max="500000"
                      step="25000"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 shadow-inner"
                      style={{ background: `linear-gradient(to right, #22d3ee ${(hourlyRate - 100000) / (500000 - 100000) * 100}%, #1e293b ${(hourlyRate - 100000) / (500000 - 100000) * 100}%)` }}
                    />
                  </div>
                </div>

                {/* Preset Selector */}
                <div className="space-y-3">
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-[0.1em] block">Pilih Preset Estimasi Jam Kerja:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {presets.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setEstimatedHours(p.hours);
                          setSelectedAddons([]);
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                          estimatedHours === p.hours
                            ? 'bg-blue-600/25 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                            : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-500 hover:bg-slate-800/80'
                        }`}
                      >
                        {estimatedHours === p.hours && <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent pointer-events-none" />}
                        <div className={`font-bold text-xs mb-1 transition-colors ${estimatedHours === p.hours ? 'text-white' : 'text-slate-200'}`}>{p.label}</div>
                        <div className={`text-xs font-mono font-semibold transition-colors ${estimatedHours === p.hours ? 'text-cyan-300' : 'text-cyan-400/90'}`}>{p.hours} Jam</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Add-on Feature Chips */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kustomisasi Modul Fitur Tambahan (Add-ons):</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Klik untuk tambah/kurang</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {addonsList.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      const AddonIcon = addon.icon;
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id, addon.hours)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer text-left ${
                            isSelected
                              ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <AddonIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                            <span className="text-[11px] font-semibold">{addon.label}</span>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                            +{addon.hours}h
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hours Custom Range */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-end text-sm font-medium">
                    <label className="text-slate-300">Estimasi Total Jam Kerja:</label>
                    <span className="text-white font-extrabold text-xl">
                      <AnimatedNumber value={estimatedHours} /> <span className="text-sm font-normal text-slate-400">Jam Kerja</span>
                    </span>
                  </div>
                  <div className="relative pt-1 pb-1">
                    <input
                      type="range"
                      min="20"
                      max="350"
                      step="5"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 shadow-inner"
                      style={{ background: `linear-gradient(to right, #3b82f6 ${(estimatedHours - 20) / (350 - 20) * 100}%, #1e293b ${(estimatedHours - 20) / (350 - 20) * 100}%)` }}
                    />
                  </div>
                </div>

                {/* Result Summary Box - 3D Inset Style */}
                <div className="relative mt-8 p-5 sm:p-6 rounded-2xl bg-[#060911] shadow-[inset_0_2px_15px_rgba(0,0,0,0.6)] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10 shrink-0">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.1em] block mb-1">Total Estimasi Investasi:</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight gradient-text-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      <AnimatedNumber value={totalEstimate} isCurrency={true} />
                    </span>
                  </div>

                  <Link
                    href="/prd-builder"
                    className="relative z-10 w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Rancang PRD & Estimasi Biaya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-[11px] text-slate-500 text-center italic mt-3">
                  {rateCalculator.hourlyRateNotice}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
