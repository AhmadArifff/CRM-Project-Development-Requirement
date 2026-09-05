'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import {
  Search,
  Kanban,
  CheckSquare,
  Users,
  Activity,
  Sparkles,
  User,
  ExternalLink,
  Layers,
  ArrowRight,
  Command,
  CornerDownLeft,
  X,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  category: 'Halaman Admin' | 'Deals Pipeline' | 'Leads Prospek' | 'Project Tasks';
  title: string;
  subtitle?: string;
  badge?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { leads, deals, tasks } = useAdminStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build searchable items
  const allItems: CommandItem[] = [
    // Pages
    {
      id: 'page-dashboard',
      category: 'Halaman Admin',
      title: 'Overview Dashboard & Analytics',
      subtitle: 'Ringkasan KPI, revenue chart, pipeline stage',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => { router.push('/admin/dashboard'); onClose(); },
    },
    {
      id: 'page-deals',
      category: 'Halaman Admin',
      title: 'Deals Pipeline Kanban Board',
      subtitle: 'Kelola alur kesepakatan proyek New Lead -> Won',
      icon: <Kanban className="w-4 h-4 text-purple-400" />,
      action: () => { router.push('/admin/deals'); onClose(); },
    },
    {
      id: 'page-tasks',
      category: 'Halaman Admin',
      title: 'Project Tasks Board',
      subtitle: 'Sprint kanban Todo, In Progress, Review & Done',
      icon: <CheckSquare className="w-4 h-4 text-emerald-400" />,
      action: () => { router.push('/admin/tasks'); onClose(); },
    },
    {
      id: 'page-leads',
      category: 'Halaman Admin',
      title: 'Leads & Contact Management',
      subtitle: 'Daftar prospek masuk & submission form',
      icon: <Users className="w-4 h-4 text-blue-400" />,
      action: () => { router.push('/admin/leads'); onClose(); },
    },
    {
      id: 'page-activities',
      category: 'Halaman Admin',
      title: 'Sales Activity Logs & Schedule',
      subtitle: 'Riwayat interaksi klien & jadwal follow-up',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
      action: () => { router.push('/admin/activities'); onClose(); },
    },
    {
      id: 'page-ai',
      category: 'Halaman Admin',
      title: 'AI Assistant & Guardrail Settings',
      subtitle: 'Konfigurasi provider OpenRouter & token limits',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => { router.push('/admin/ai-assistant'); onClose(); },
    },
    {
      id: 'page-prd',
      category: 'Halaman Admin',
      title: 'Buka PRD Builder Studio',
      subtitle: 'Wizard kuesioner AI generator & Mermaid editor',
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
      action: () => { router.push('/prd-builder'); onClose(); },
    },
    {
      id: 'page-landing',
      category: 'Halaman Admin',
      title: 'Lihat Public Landing Page',
      subtitle: 'Website utama DevPulse Studio',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      action: () => { window.open('/', '_blank'); onClose(); },
    },

    // Active Deals
    ...deals.map((d) => ({
      id: `deal-${d.id}`,
      category: 'Deals Pipeline' as const,
      title: d.title,
      subtitle: `${d.company} • ${d.clientName}`,
      badge: `Rp ${(Number(d.value) / 1000000).toFixed(0)} Jt (${d.stage})`,
      icon: <Kanban className="w-4 h-4 text-purple-400" />,
      action: () => { router.push('/admin/deals'); onClose(); },
    })),

    // Active Leads
    ...leads.map((l) => ({
      id: `lead-${l.id}`,
      category: 'Leads Prospek' as const,
      title: l.name,
      subtitle: `${l.company || 'Personal'} • ${l.email}`,
      badge: l.status,
      icon: <Users className="w-4 h-4 text-blue-400" />,
      action: () => { router.push('/admin/leads'); onClose(); },
    })),

    // Active Tasks
    ...tasks.map((t) => ({
      id: `task-${t.id}`,
      category: 'Project Tasks' as const,
      title: t.title,
      subtitle: `Assignee: ${t.assignee || 'Dev Team'} • Priority: ${t.priority}`,
      badge: t.status,
      icon: <CheckSquare className="w-4 h-4 text-emerald-400" />,
      action: () => { router.push('/admin/tasks'); onClose(); },
    })),
  ];

  // Filter items by query
  const filteredItems = query.trim()
    ? allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 10); // Show top default actions when query is empty

  // Keyboard navigation inside command palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredItems, selectedIndex, onClose]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl glass-card rounded-2xl border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input Bar */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Ketik nama halaman, deals, leads, atau tugas..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <Search className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs">Tidak ada hasil yang cocok dengan "{query}"</p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 text-white border border-cyan-500/40 shadow-inner'
                        : 'text-slate-300 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 ${isSelected ? 'border-cyan-500/50' : ''}`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold truncate text-white">
                            {item.title}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60 font-mono">
                            {item.category}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.badge && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {item.badge}
                        </span>
                      )}
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Help */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">↑↓</kbd>
                <span>Navigasi</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono">Enter ↵</kbd>
                <span>Buka</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-cyan-400">DevPulse Quick Command Palette</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
