'use client';

import React from 'react';
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
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardOverviewPage() {
  const { leads, deals, tasks, activities } = useAdminStore();

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
            Selamat Datang Kembali, <span className="gradient-text-cyan">Andi!</span>
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
