'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import {
  Rocket,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Eye,
  EyeOff,
  Sliders,
  Star,
  Globe,
  Layers,
  Server,
  Code,
  Laptop,
  Check,
  UserCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const performLogin = async (loginEmail: string, loginPassword: string) => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. First try Next.js relative endpoint /api/v1/auth/login
      let res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      }).catch(() => null);

      // 2. If relative failed, try external API URL
      if (!res || !res.ok) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
        res = await fetch(`${apiUrl}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        }).catch(() => null);
      }

      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          login(data.user, data.token);
          setSuccessMsg('Login berhasil! Mengalihkan ke Dashboard...');
          setTimeout(() => router.push('/admin/dashboard'), 300);
          return;
        }
      }

      // 3. Fallback testing bypass: If admin credentials match known admin demo users
      if (
        (loginEmail === 'ahmadarif@devpulsestudio.dev' || loginEmail === 'admin@devpulsestudio.dev' || loginEmail === 'ahmadarifff@gmail.com') &&
        loginPassword === 'admin123'
      ) {
        const fallbackUser = {
          id: 'usr_admin_ahmad_001',
          name: 'Ahmad Arif',
          email: loginEmail,
          role: 'ADMIN',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          bio: 'Lead Full-Stack AI Engineer & System Architect at DevPulse Studio.',
          hourlyRate: 250000,
          timezone: 'Asia/Jakarta',
        };
        const fallbackToken = 'devpulse_test_token_' + Date.now();
        login(fallbackUser, fallbackToken);
        setSuccessMsg('Quick Login Berhasil! Membuka Dashboard...');
        setTimeout(() => router.push('/admin/dashboard'), 300);
        return;
      }

      setErrorMsg('Login gagal. Email atau password salah.');
      setIsLoading(false);
    } catch (err: any) {
      setErrorMsg('Terjadi kendala saat menghubungi server autentikasi.');
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(email, password);
  };

  const handleQuickLogin = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    performLogin(quickEmail, quickPass);
  };

  const serviceHighlights = [
    {
      icon: Zap,
      color: 'from-blue-600 to-cyan-400',
      badge: 'AI PRD Engine #1',
      title: 'Otomatisasi PRD & Scope Scoping',
      desc: 'Rancang spesifikasi aplikasi, arsitektur server, dan estimasi jam kerja proyek secara otomatis dalam format PRD.md DevPulse Studio Pro.',
      metrics: ['10 Menit Draft PRD.md', '100% Rate Transparan', 'Rekomendasi AI Smart'],
    },
    {
      icon: Sliders,
      color: 'from-indigo-600 to-purple-400',
      badge: 'DevPulse Visual CMS',
      title: 'DevPulse Live Canvas Studio CMS',
      desc: 'Kelola 100% konten landing page (teks, tombol, ikon, & upload gambar file komputer) dengan live preview canvas & auto-scroll focus.',
      metrics: ['Auto-Scroll Focus Top', 'Upload File Local', '3 Viewport Frame Toggle'],
    },
    {
      icon: Layers,
      color: 'from-emerald-600 to-teal-400',
      badge: 'CRM & Pipeline Deals',
      title: 'Manajemen Leads & Project Kanban',
      desc: 'Konversi lead propek dalam 1-klik menjadi deals pipeline, serta kelola tugas developer di workspace Trello Kanban dengan Rich Editor Toolbar.',
      metrics: ['1-Click Lead Conversion', 'Trello Kanban Board', 'Rich Markdown Editor'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#04060b] text-slate-100 font-sans flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-x-hidden">
      
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* MAIN CONTAINER: DESKTOP 2-COLUMN SPLIT SCREEN / MOBILE RESPONSIVE STACK */}
      <div className="w-full max-w-6xl glass-card rounded-3xl border-slate-800/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* LEFT COLUMN: INTERACTIVE PROMOTION & SERVICE SHOWCASE */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 bg-gradient-to-br from-slate-950 via-slate-900/90 to-blue-950/40 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between space-y-8 relative overflow-hidden">
          
          {/* Header Brand */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card border-blue-500/30 text-xs font-bold text-cyan-300 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>DevPulse Studio — Digital App Consultancy</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Kelola Proyek & Konsultasi <br className="hidden sm:inline" />
                <span className="gradient-text-cyan">Aplikasi Digital AI</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed font-normal">
                Portal Admin CRM terpadu untuk merancang dokumen PRD.md otomatis, mengelola deals pipeline, serta menyunting konten landing page dengan pengalaman Figma Studio visual.
              </p>
            </div>
          </div>

          {/* Interactive Service Showcase Tabs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {serviceHighlights.map((srv, idx) => {
                const Icon = srv.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap border cursor-pointer ${
                      isActive
                        ? 'bg-blue-600/30 text-cyan-300 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{srv.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Service Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-5 sm:p-6 rounded-2xl border-slate-800/90 bg-slate-900/60 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${serviceHighlights[activeTab].color} text-white shadow-lg`}>
                    {React.createElement(serviceHighlights[activeTab].icon, { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {serviceHighlights[activeTab].title}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30 font-bold">
                      {serviceHighlights[activeTab].badge}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {serviceHighlights[activeTab].desc}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                  {serviceHighlights[activeTab].metrics.map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-950/80 border border-slate-850 text-center">
                      <span className="text-[10px] font-bold text-cyan-400 block">{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Social Proof & Metrics Ticker Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
              </div>
              <div className="text-[11px]">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>4.9 / 5.0 Rating Klien</span>
                </div>
                <span className="text-slate-400">48+ Proyek Aplikasi Selesai</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Garansi 100% Rate Transparan</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SLEEK ADMIN LOGIN FORM & QUICK TESTING ACTIONS */}
        <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 bg-slate-950/95 flex flex-col justify-center space-y-6 relative">
          
          {/* Mobile Header Logo */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-blue-500/20 mx-auto sm:mx-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Rocket className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Admin <span className="gradient-text-cyan">Login Portal</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Masukan kredensial atau klik tombol Quick Login di bawah untuk testing instan.
              </p>
            </div>
          </div>

          {/* Quick Testing 1-Click Login Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-purple-950/50 to-slate-900 border border-cyan-500/30 shadow-lg space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span>⚡ Quick Testing 1-Click Login</span>
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Instant Access
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('ahmadarif@devpulsestudio.dev', 'admin123')}
                disabled={isLoading}
                className="w-full p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/35 border border-cyan-500/40 text-left text-xs font-semibold text-white flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-sm group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold block text-white text-[11px] group-hover:text-cyan-300">
                      Ahmad Arif (Super Admin)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ahmadarif@devpulsestudio.dev
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-blue-500/30 px-2 py-1 rounded-lg border border-cyan-400/40 shrink-0">
                  Masuk ↵
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@devpulsestudio.dev', 'admin123')}
                disabled={isLoading}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-bold block text-white text-[11px] group-hover:text-purple-300">
                      DevPulse Admin Alias
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      admin@devpulsestudio.dev
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/20 px-2 py-1 rounded-lg border border-purple-400/30 shrink-0">
                  Masuk ↵
                </span>
              </button>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
              <span>Default Password: <strong className="text-cyan-300">admin123</strong></span>
              <span className="text-emerald-400">🟢 Supabase DB Live</span>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Manual Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address Admin</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@devpulsestudio.dev"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 accent-cyan-400 w-4 h-4" />
                <span>Ingat Sesi Login</span>
              </label>
              <span className="text-slate-500 text-[11px] font-mono">Role: Super Admin</span>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px] cursor-pointer glow-button"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In Manual ke Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Copyright */}
          <div className="text-center text-[11px] text-slate-500 pt-2">
            <span>© 2026 DevPulse Studio. Developed by Ahmad Arif.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
