'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import {
  Menu,
  Bell,
  Search,
  CheckCircle,
  User,
  ShieldCheck,
  Check,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Command,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminHeader: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const pathname = usePathname();
  const { currentUser, notifications, markAsRead, markAllAsRead } = useAdminStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const pageTitles: Record<string, string> = {
    '/admin/dashboard': 'Overview Dashboard',
    '/admin/deals': 'Deals Pipeline (Kanban Board)',
    '/admin/tasks': 'Project Task Board (Trello-Style)',
    '/admin/leads': 'Leads & Contact Management',
    '/admin/activities': 'Sales Activity Logs & Schedule',
    '/admin/ai-assistant': 'AI Assistant & API Key Management',
    '/admin/profile': 'Profile & Account Settings',
  };

  const title = pageTitles[pathname] || 'Admin CRM';

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
            {pathname === '/admin/ai-assistant' && (
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-semibold animate-pulse">
                ✨ AI Guardrail Active
              </span>
            )}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Sistem Manajemen Proyek & Pipeline Sales CRM Management
          </p>
        </div>
      </div>

      {/* Right Actions: Quick Search, Public View Link, Notification Bell, User Menu */}
      <div className="flex items-center gap-3">
        {/* Quick Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Cari leads, deals, tasks...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">⌘K</kbd>
        </button>

        {/* View Public Landing Page */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 text-cyan-300 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold transition-all"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 sm:w-96 glass-card rounded-2xl p-4 border-slate-700/80 shadow-2xl z-50 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Notifikasi Sistem</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {unreadCount} Unread
                      </span>
                    )}
                  </div>

                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-cyan-400 hover:underline font-semibold"
                  >
                    Tandai Semua Dibaca
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 text-xs">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        n.isRead
                          ? 'bg-slate-950/40 border-slate-900 text-slate-400'
                          : 'bg-slate-900/90 border-blue-500/30 text-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Avatar */}
        <Link href="/admin/profile" className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-900 transition-colors">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-lg object-cover border border-slate-700"
          />
        </Link>
      </div>

      {/* Quick Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl glass-card rounded-2xl p-4 border-slate-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Search className="w-4 h-4 text-cyan-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Ketik pencarian leads, deals, atau tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-xs text-slate-400 hover:text-white">ESC</button>
              </div>

              <div className="text-xs text-slate-400 space-y-2 max-h-60 overflow-y-auto">
                <span className="text-[10px] uppercase font-bold text-slate-500">Pencarian Cepat</span>
                <Link href="/admin/leads" onClick={() => setIsSearchOpen(false)} className="block p-2 rounded-lg hover:bg-slate-900 text-slate-200">
                  📄 Budi Santoso (PT Retail Bangun) — Leads Baru
                </Link>
                <Link href="/admin/deals" onClick={() => setIsSearchOpen(false)} className="block p-2 rounded-lg hover:bg-slate-900 text-slate-200">
                  💼 Aplikasi E-Commerce SuperApp — Rp 45.000.000
                </Link>
                <Link href="/admin/tasks" onClick={() => setIsSearchOpen(false)} className="block p-2 rounded-lg hover:bg-slate-900 text-slate-200">
                  ✅ Integrasi Supabase Auth & JWT Middleware — In Progress
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
