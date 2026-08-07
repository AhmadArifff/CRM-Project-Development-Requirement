'use client';

import React from 'react';
import Link from 'next/link';
import { usePrdStore } from '@/store/usePrdStore';
import { useLandingContentStore } from '@/store/useLandingContentStore';
import { Calculator, Clock, DollarSign, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const RateCalculatorSection: React.FC = () => {
  const { hourlyRate, setHourlyRate, estimatedHours, setEstimatedHours } = usePrdStore();
  const { rateCalculator } = useLandingContentStore();

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
              <div className="bg-[#0a0f1c] rounded-[22px] p-6 sm:p-10 w-full h-full space-y-8 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

                {/* Hourly Rate Control */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end text-sm font-medium">
                    <label className="text-slate-400">Rate Biaya Per Jam Workrate:</label>
                    <span className="font-mono text-cyan-400 font-extrabold text-xl">{formatRupiah(hourlyRate)} <span className="text-sm font-normal text-slate-500">/ Jam</span></span>
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
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-[0.1em] block">Pilih Preset Estimasi Jam Kerja:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {presets.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEstimatedHours(p.hours)}
                        className={`p-4 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group ${
                          estimatedHours === p.hours
                            ? 'bg-blue-600/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                        }`}
                      >
                        {estimatedHours === p.hours && <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent pointer-events-none" />}
                        <div className={`font-bold text-xs mb-1 transition-colors ${estimatedHours === p.hours ? 'text-white' : 'text-slate-300'}`}>{p.label}</div>
                        <div className={`text-[11px] font-mono transition-colors ${estimatedHours === p.hours ? 'text-cyan-300' : 'text-slate-500'}`}>{p.hours} Jam</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hours Custom Range */}
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-end text-sm font-medium">
                    <label className="text-slate-400">Estimasi Total Jam Kerja:</label>
                    <span className="font-mono text-white font-extrabold text-xl">{estimatedHours} <span className="text-sm font-normal text-slate-500">Jam Kerja</span></span>
                  </div>
                  <div className="relative pt-2 pb-2">
                    <input
                      type="range"
                      min="20"
                      max="300"
                      step="10"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 shadow-inner"
                      style={{ background: `linear-gradient(to right, #3b82f6 ${(estimatedHours - 20) / (300 - 20) * 100}%, #1e293b ${(estimatedHours - 20) / (300 - 20) * 100}%)` }}
                    />
                  </div>
                </div>

                {/* Result Summary Box - 3D Inset Style */}
                <div className="relative mt-8 p-6 sm:p-8 rounded-2xl bg-[#060911] shadow-[inset_0_2px_15px_rgba(0,0,0,0.6)] border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.1em] block mb-1">Total Estimasi Investasi:</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight gradient-text-cyan font-mono drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      {formatRupiah(totalEstimate)}
                    </span>
                  </div>

                  <Link
                    href="/prd-builder"
                    className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black font-extrabold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-slate-200 hover:scale-105 transition-all duration-300 shrink-0"
                  >
                    <span>{rateCalculator.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-[11px] text-slate-500 text-center italic mt-4">
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
