'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAdminStore, LeadItem } from '@/store/useAdminStore';
import {
  Users,
  Search,
  Filter,
  Plus,
  FileText,
  Mail,
  Phone,
  Building,
  Calendar,
  X,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadsManagementPage() {
  const { leads, addLead, updateLeadStatus, convertLeadToDeal } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'LANDING_PAGE' as LeadItem['source'],
    status: 'NEW' as LeadItem['status'],
    appTitle: '',
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;

    addLead(newLead);
    setIsAddModalOpen(false);
    setNewLead({ name: '', company: '', email: '', phone: '', source: 'LANDING_PAGE', status: 'NEW', appTitle: '' });
  };

  const statusBadges: Record<LeadItem['status'], { label: string; color: string }> = {
    NEW: { label: 'New Lead', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    CONTACTED: { label: 'Contacted', color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
    QUALIFIED: { label: 'Qualified', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
    UNQUALIFIED: { label: 'Unqualified', color: 'bg-slate-800 text-slate-400 border-slate-700' },
    CONVERTED: { label: 'Converted to Deal', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Leads & Contact <span className="gradient-text-cyan">Management</span></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Daftar kontak prospek klien yang dikirimkan dari Landing Page & PRD Builder.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all glow-button"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Lead Manual</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, perusahaan, atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-cyan-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Semua Status</option>
            <option value="NEW">New Lead</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="CONVERTED">Converted</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-2xl border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Nama Prospek & Perusahaan</th>
                <th className="p-4">Kontak (Email / Telp)</th>
                <th className="p-4">Sumber Lead</th>
                <th className="p-4">Status Lead</th>
                <th className="p-4">Tanggal Input</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {filteredLeads.map((lead) => {
                const stg = statusBadges[lead.status];
                return (
                  <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-white block">{lead.name}</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-500" />
                        <span>{lead.company}</span>
                      </span>
                    </td>

                    <td className="p-4 space-y-0.5 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{lead.phone}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 font-semibold font-mono">
                        {lead.source}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold focus:outline-none bg-slate-950 ${stg.color}`}
                      >
                        <option value="NEW">New Lead</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="UNQUALIFIED">Unqualified</option>
                        <option value="CONVERTED">Converted</option>
                      </select>
                    </td>

                    <td className="p-4 text-slate-400 font-mono text-[11px]">{lead.createdAt}</td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 text-cyan-300 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Detail & PRD</span>
                      </button>

                      {lead.status !== 'CONVERTED' && (
                        <button
                          onClick={() => convertLeadToDeal(lead.id, 35000000)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold transition-colors"
                          title="Konversi Lead ke Deals Pipeline"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Convert to Deal</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl glass-card rounded-2xl p-6 border-slate-700 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedLead.name} — {selectedLead.company}</h3>
                  <p className="text-xs text-slate-400">Detail prospek & PRD.md yang terlampir dari landing page</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lead Info Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold">Email</span>
                  <span className="text-cyan-300 font-mono">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold">No. HP</span>
                  <span className="text-slate-200 font-mono">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold">Status Lead</span>
                  <span className="text-emerald-400 font-semibold">{selectedLead.status}</span>
                </div>
              </div>

              {/* Attached PRD Viewer */}
              {selectedLead.prdContent ? (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Lampiran Dokumen PRD.md</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono overflow-x-auto max-h-60">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedLead.prdContent}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
                  Klien belum melampirkan dokumen PRD.md
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
