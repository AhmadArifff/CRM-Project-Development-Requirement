'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { User, Mail, Shield, Key, Save, DollarSign } from 'lucide-react';

export default function AdminProfilePage() {
  const { currentUser, systemPrompt, setSystemPrompt } = useAdminStore();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [rate, setRate] = useState(systemPrompt.hourlyRate);
  const [saved, setSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const { uploadFile } = useAdminStore();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      try {
        const url = await uploadFile(e.target.files[0]);
        setAvatar(url);
      } catch (error) {
        console.error(error);
        alert('Gagal mengunggah gambar');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem('devpulse_token');
      const res = await fetch('/api/v1/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          avatar,
          hourlyRate: Number(rate)
        })
      });

      if (res.ok) {
        setSystemPrompt({ hourlyRate: Number(rate) });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        alert('Gagal menyimpan profile');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan koneksi');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" />
          <span>Profile & Account <span className="gradient-text-cyan">Settings</span></span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Pengaturan akun admin, perubah password, dan hourly rate global kalkulator.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 border-slate-800/80 space-y-6 text-xs">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
            ✓ Pengaturan berhasil disimpan!
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative group w-16 h-16">
            <img src={avatar || 'https://api.dicebear.com/7.x/avataaars/svg'} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 shadow-xl" />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-slate-800 p-1 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={isUploading} />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{name}</h3>
            <span className="text-xs text-cyan-400 font-semibold">{currentUser.role}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 font-semibold block mb-1">Hourly Rate Kalkulator Biaya (IDR / Jam)</label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold focus:outline-none focus:border-cyan-500"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Rate ini secara otomatis di-inject ke kalkulator Landing Page dan instruksi AI PRD.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
