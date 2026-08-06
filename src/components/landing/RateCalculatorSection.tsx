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
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800/80 shadow-2xl space-y-6">
              
              {/* Hourly Rate Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                  <label className="text-slate-300">Rate Biaya Per Jam Workrate:</label>
                  <span className="font-mono text-cyan-400 font-bold text-base">{formatRupiah(hourlyRate)} / Jam</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="500000"
                  step="25000"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
                />
              </div>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Pilih Preset Estimasi Jam Kerja:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setEstimatedHours(p.hours)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        estimatedHours === p.hours
                          ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs">{p.label}</div>
                      <div className="text-[11px] font-mono text-cyan-300 mt-0.5">{p.hours} Jam</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours Custom Range */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                  <label className="text-slate-300">Estimasi Total Jam Kerja:</label>
                  <span className="font-mono text-white font-bold">{estimatedHours} Jam Kerja</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-slate-800"
                />
              </div>

              {/* Result Summary Box */}
              <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Total Estimasi Investasi Proyek:</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight gradient-text-cyan font-mono">
                    {formatRupiah(totalEstimate)}
                  </span>
                </div>

                <Link
                  href="/prd-builder"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-cyan-400 transition-all shrink-0"
                >
                  <span>{rateCalculator.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 text-center italic">
                {rateCalculator.hourlyRateNotice}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
