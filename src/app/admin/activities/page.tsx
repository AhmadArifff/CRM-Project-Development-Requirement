'use client';

import React, { useState } from 'react';
import { useAdminStore, ActivityItem } from '@/store/useAdminStore';
import { Calendar, Phone, Mail, MessageSquare, Plus, Clock, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesActivitiesPage() {
  const { activities, addActivity } = useAdminStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newActivity, setNewActivity] = useState({
    type: 'CALL' as ActivityItem['type'],
    title: '',
    description: '',
    leadName: '',
    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
  });

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.title) return;

    addActivity(newActivity);
    setIsAddModalOpen(false);
    setNewActivity({ type: 'CALL', title: '', description: '', leadName: '', date: new Date().toISOString().replace('T', ' ').slice(0, 16) });
  };

  const activityIcons: Record<ActivityItem['type'], { icon: any; color: string }> = {
    CALL: { icon: Phone, color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    EMAIL: { icon: Mail, color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
    MEETING: { icon: Calendar, color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
    NOTE: { icon: MessageSquare, color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    FOLLOW_UP: { icon: Clock, color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-cyan-400" />
            <span>Sales Activity Logs & <span className="gradient-text-cyan">Schedule</span></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Catatan historis interaksi meeting, telepon, email, & follow-up dengan klien.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all glow-button"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Aktivitas</span>
        </button>
      </div>

      {/* Activity Timeline Stream */}
      <div className="glass-card rounded-2xl p-6 border-slate-800/80 space-y-4">
        {activities.map((act) => {
          const Config = activityIcons[act.type];
          const Icon = Config.icon;

          return (
            <div key={act.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className={`p-3 rounded-xl border ${Config.color}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="font-bold text-white">{act.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{act.date}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{act.description}</p>
                {act.leadName && (
                  <span className="text-[10px] text-cyan-300 font-semibold inline-block pt-1">
                    Klien: {act.leadName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
