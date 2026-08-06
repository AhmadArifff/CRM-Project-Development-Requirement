'use client';

import React from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-400" />
            <span>Notifikasi <span className="gradient-text-cyan">Sistem</span></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pemberitahuan aktivitas masuk leads, pergerakan deal, dan reminder deadline task.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white text-xs font-semibold"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Tandai Semua Dibaca</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl p-6 border-slate-800/80 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              n.isRead ? 'bg-slate-950/40 border-slate-900 text-slate-400' : 'bg-slate-900/90 border-blue-500/30 text-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white text-sm">{n.title}</span>
              <span className="text-xs text-slate-500 font-mono">{n.time}</span>
            </div>
            <p className="text-xs text-slate-300">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
