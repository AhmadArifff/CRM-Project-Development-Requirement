'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import {
  Users,
  Kanban,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  CheckSquare,
  Clock,
  Plus,
  FileText,
  Activity,
  Layers,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardOverviewPage() {
  const { leads, deals, tasks, activities, currentUser } = useAdminStore();
  const [chartMetric, setChartMetric] = useState<'revenue' | 'leads'>('revenue');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;
  const activeDeals = deals.filter((d) => d.stage !== 'WON' && d.stage !== 'LOST');
  const wonDeals = deals.filter((d) => d.stage === 'WON');
  
  const totalPipelineValue = deals.reduce((acc, curr) => acc + Number(curr.value), 0);
  const wonRevenue = wonDeals.reduce((acc, curr) => acc + Number(curr.value), 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // 6-Month Trend Data for Area Chart
  const trendData = [
    { month: 'Apr', revenue: 24000000, leads: 12, growth: '+15%' },
    { month: 'Mei', revenue: 38000000, leads: 18, growth: '+28%' },
    { month: 'Jun', revenue: 45000000, leads: 22, growth: '+18%' },
    { month: 'Jul', revenue: 62000000, leads: 31, growth: '+35%' },
    { month: 'Ags', revenue: 78000000, leads: 42, growth: '+25%' },
    { month: 'Sep', revenue: 95000000, leads: 56, growth: '+40%' },
  ];

  // SVG Area Chart Geometry
  const chartWidth = 580;
  const chartHeight = 180;
  const paddingX = 40;
  const paddingY = 25;
  const maxVal = chartMetric === 'revenue' ? 100000000 : 60;

  const points = trendData.map((d, i) => {
    const x = paddingX + (i / (trendData.length - 1)) * (chartWidth - paddingX * 2);
    const val = chartMetric === 'revenue' ? d.revenue : d.leads;
    const y = chartHeight - paddingY - (val / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-700/80 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin CRM Analytics & Control Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Selamat Datang Kembali, <span className="gradient-text-cyan">{currentUser.name || 'Admin'}!</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Ada <strong className="text-emerald-400">{newLeads} leads baru</strong> dari landing page & <strong className="text-cyan-300">{activeDeals.length} active deals</strong> dalam pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/admin/deals"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all glow-button"
          >
            <Kanban className="w-4 h-4" />
            <span>Buka Deals Kanban</span>
          </Link>
          <Link
            href="/admin/ai-assistant"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-card text-purple-300 border-purple-500/30 font-bold text-xs hover:bg-purple-950/40 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Settings</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Leads</span>
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalLeads}</span>
            <span className="text-xs text-emerald-400 font-semibold">+{newLeads} Baru</span>
          </div>
          <p className="text-[11px] text-slate-400">Leads terkumpul dari landing page & referral.</p>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Deals</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
              <Kanban className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{activeDeals.length}</span>
            <span className="text-xs text-cyan-300 font-semibold">Proyek berjalan</span>
          </div>
          <p className="text-[11px] text-slate-400">Tahap Negotiation, Proposal & Contacted.</p>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pipeline Value</span>
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white">{formatRupiah(totalPipelineValue)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Estimasi total nilai proyek dalam pipeline.</p>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Won Revenue</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-400">{formatRupiah(wonRevenue)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Total pendapatan deal yang telah disetujui (WON).</p>
        </div>
      </div>

      {/* Interactive Revenue & Lead Growth Trend Area Chart */}
      <div className="glass-card rounded-2xl p-6 border-slate-700/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Tren Pertumbuhan & Performa Sales (6 Bulan Terakhir)</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">Arahkan kursor pada kurva titik untuk melihat detail metrik per bulan.</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setChartMetric('revenue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartMetric === 'revenue'
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Revenue (Rp)
            </button>
            <button
              onClick={() => setChartMetric('leads')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartMetric === 'leads'
                  ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Leads Inflow
            </button>
          </div>
        </div>

        {/* SVG Area Chart */}
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56 overflow-visible">
            <defs>
              <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              return (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#chartAreaGradient)" />

            {/* Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#chartLineGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]"
            />

            {/* Interactive Points */}
            {points.map((p, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(idx)} onMouseLeave={() => setHoveredPoint(null)}>
                  {/* Outer Pulsing Aura when hovered */}
                  {isHovered && (
                    <circle cx={p.x} cy={p.y} r="10" fill="#00f2fe" opacity="0.3" className="animate-ping" />
                  )}
                  {/* Point circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : 4}
                    fill="#060911"
                    stroke="#00f2fe"
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all duration-150"
                  />
                  {/* X Axis Label */}
                  <text
                    x={p.x}
                    y={chartHeight - 6}
                    textAnchor="middle"
                    fill={isHovered ? '#00f2fe' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                  >
                    {p.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Tooltip */}
          {hoveredPoint !== null && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-2 right-4 p-3 rounded-xl bg-slate-950/95 border border-cyan-500/50 text-xs shadow-2xl backdrop-blur-md pointer-events-none"
            >
              <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bulan {trendData[hoveredPoint].month} 2026</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  {trendData[hoveredPoint].growth}
                </span>
              </div>
              <div className="space-y-0.5 text-slate-300 text-[11px]">
                <div>
                  <span className="text-slate-400">Revenue: </span>
                  <strong className="text-cyan-300 font-mono">{formatRupiah(trendData[hoveredPoint].revenue)}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Leads Masuk: </span>
                  <strong className="text-emerald-400 font-mono">{trendData[hoveredPoint].leads} Leads</strong>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Grid: Pipeline Funnel & Recent Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pipeline Stage Breakdown */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Kanban className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Ringkasan Pipeline Stage</h3>
            </div>
            <Link href="/admin/deals" className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
              <span>Lihat Kanban Full</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { stage: 'New Lead', count: deals.filter((d) => d.stage === 'NEW_LEAD').length, color: 'bg-blue-500' },
              { stage: 'Contacted', count: deals.filter((d) => d.stage === 'CONTACTED').length, color: 'bg-cyan-500' },
              { stage: 'Proposal Sent', count: deals.filter((d) => d.stage === 'PROPOSAL_SENT').length, color: 'bg-indigo-500' },
              { stage: 'Negotiation', count: deals.filter((d) => d.stage === 'NEGOTIATION').length, color: 'bg-purple-500' },
              { stage: 'Won', count: deals.filter((d) => d.stage === 'WON').length, color: 'bg-emerald-500' },
            ].map((stg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{stg.stage}</span>
                  <span className="text-cyan-300 font-mono font-bold">{stg.count} Deals</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${stg.color} rounded-full transition-all`}
                    style={{ width: `${Math.max(stg.count * 20, 10)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Sales Activities */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">Aktivitas Sales Terbaru</h3>
            </div>
            <Link href="/admin/activities" className="text-xs text-purple-300 hover:underline font-semibold">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {activities.slice(0, 4).map((act) => (
              <div key={act.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-white">{act.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{act.date}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{act.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
