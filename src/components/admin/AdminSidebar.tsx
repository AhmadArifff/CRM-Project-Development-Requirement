'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import {
  LayoutDashboard,
  Kanban,
  CheckSquare,
  Users,
  Calendar,
  Sparkles,
  User,
  LogOut,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Bell,
  LayoutTemplate,
} from 'lucide-react';

export const AdminSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { currentUser, logout, notifications, leads } = useAdminStore();

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Deals Pipeline', href: '/admin/deals', icon: Kanban, badge: 'Kanban' },
    { label: 'Project Tasks', href: '/admin/tasks', icon: CheckSquare, badge: 'Tasks' },
    { label: 'Leads & Contacts', href: '/admin/leads', icon: Users, badgeCount: newLeadsCount },
    { label: 'Sales Activities', href: '/admin/activities', icon: Calendar },
    { label: 'Landing CMS', href: '/admin/landing-content', icon: LayoutTemplate, badge: 'CMS' },
    { label: 'AI Assistant Settings', href: '/admin/ai-assistant', icon: Sparkles, highlight: true },
    { label: 'Profile & Settings', href: '/admin/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight flex items-center gap-1">
                DevPulse<span className="gradient-text-cyan">Admin</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono block">
                Studio Agency Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs font-semibold">
          <div className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
            Main Navigation
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                    : item.highlight
                    ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-cyan-400 border border-blue-500/20'}`}>
                    {item.badge}
                  </span>
                )}

                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500 text-slate-950 font-mono animate-pulse">
                    {item.badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Footer Profile & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-xl object-cover border border-slate-700 shadow-md"
            />
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">{currentUser.name}</span>
              <span className="text-[10px] text-slate-400 block truncate">{currentUser.role}</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 hover:bg-red-500/10 hover:text-red-400 border border-slate-800 text-slate-400 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
};
