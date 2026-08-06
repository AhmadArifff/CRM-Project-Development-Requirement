'use client';

import React, { useState } from 'react';
import { useAdminStore, DealItem } from '@/store/useAdminStore';
import {
  Kanban,
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  FileText,
  Building,
  User,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DealsPipelinePage() {
  const { deals, moveDeal, addDeal } = useAdminStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPrd, setSelectedPrd] = useState<DealItem | null>(null);

  const [newDeal, setNewDeal] = useState({
    title: '',
    clientName: '',
    company: '',
    value: 25000000,
    stage: 'NEW_LEAD' as DealItem['stage'],
    expectedClose: '2026-09-01',
  });

  const stages: { key: DealItem['stage']; label: string; color: string }[] = [
    { key: 'NEW_LEAD', label: 'New Lead', color: 'border-blue-500/50 text-blue-400 bg-blue-500/10' },
    { key: 'CONTACTED', label: 'Contacted', color: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10' },
    { key: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10' },
    { key: 'NEGOTIATION', label: 'Negotiation', color: 'border-purple-500/50 text-purple-400 bg-purple-500/10' },
    { key: 'WON', label: 'Deal Won', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' },
  ];

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.title || !newDeal.clientName) return;

    addDeal({
      title: newDeal.title,
      clientName: newDeal.clientName,
      company: newDeal.company || 'Perusahaan Klien',
      value: Number(newDeal.value),
      stage: newDeal.stage,
      expectedClose: newDeal.expectedClose,
    });

    setIsAddModalOpen(false);
    setNewDeal({ title: '', clientName: '', company: '', value: 25000000, stage: 'NEW_LEAD', expectedClose: '2026-09-01' });
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Kanban className="w-6 h-6 text-cyan-400" />
            <span>Deals Pipeline <span className="gradient-text-cyan">Kanban Board</span></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola tahapan negosiasi deal proyek dari New Lead hingga Deal Won.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all glow-button"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Deal Baru</span>
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stg) => {
          const stageDeals = deals.filter((d) => d.stage === stg.key);
          const stageTotal = stageDeals.reduce((acc, curr) => acc + Number(curr.value), 0);

          return (
            <div key={stg.key} className="glass-card rounded-2xl p-4 border-slate-800/80 flex flex-col min-h-[500px]">
              {/* Column Header */}
              <div className="pb-3 border-b border-slate-800 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${stg.color}`}>
                    {stg.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">({stageDeals.length})</span>
                </div>
              </div>

              {/* Total Value Bar */}
              <div className="text-[11px] text-slate-400 mb-3 flex items-center justify-between font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                <span>Total:</span>
                <span className="font-bold text-cyan-300">{formatRupiah(stageTotal)}</span>
              </div>

              {/* Deal Cards Stream */}
              <div className="flex-1 space-y-3">
                {stageDeals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug">{deal.title}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <Building className="w-3 h-3 text-slate-500" />
                        <span>{deal.company}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
                      <span className="font-extrabold text-cyan-400">{formatRupiah(deal.value)}</span>
                      {deal.prdFileUrl && (
                        <button
                          onClick={() => setSelectedPrd(deal)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/15 text-cyan-300 text-[10px] font-bold border border-blue-500/30"
                        >
                          <FileText className="w-3 h-3" />
                          <span>PRD.md</span>
                        </button>
                      )}
                    </div>

                    {/* Stage Shifting Controls */}
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <button
                        onClick={() => {
                          const idx = stages.findIndex((s) => s.key === deal.stage);
                          if (idx > 0) moveDeal(deal.id, stages[idx - 1].key);
                        }}
                        disabled={deal.stage === 'NEW_LEAD'}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                        title="Geser ke Stage Sebelumnya"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-slate-500 font-mono text-[9px]">{deal.expectedClose}</span>

                      <button
                        onClick={() => {
                          const idx = stages.findIndex((s) => s.key === deal.stage);
                          if (idx < stages.length - 1) moveDeal(deal.id, stages[idx + 1].key);
                        }}
                        disabled={deal.stage === 'WON'}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                        title="Geser ke Stage Selanjutnya"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card rounded-2xl p-6 border-slate-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Kanban className="w-5 h-5 text-cyan-400" />
                  <span>Tambah Deal Proyek Baru</span>
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateDeal} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Judul Deal / Proyek</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Marketplace Travel & Booking System"
                    value={newDeal.title}
                    onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Klien</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Kontak Klien"
                      value={newDeal.clientName}
                      onChange={(e) => setNewDeal({ ...newDeal, clientName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Perusahaan Klien</label>
                    <input
                      type="text"
                      placeholder="PT / CV Klien"
                      value={newDeal.company}
                      onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nilai Deal (IDR)</label>
                    <input
                      type="number"
                      required
                      value={newDeal.value}
                      onChange={(e) => setNewDeal({ ...newDeal, value: Number(e.target.value) })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Stage Awal</label>
                    <select
                      value={newDeal.stage}
                      onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value as DealItem['stage'] })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      {stages.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                  >
                    Simpan Deal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
