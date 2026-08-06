'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Rocket, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                DevPulse<span className="gradient-text-cyan">Studio</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium block">
                AI PRD & App Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#layanan" className="hover:text-cyan-400 transition-colors">
              Analisis Platform
            </a>
            <a href="#server" className="hover:text-cyan-400 transition-colors">
              Opsi Server
            </a>
            <a href="#calculator" className="hover:text-cyan-400 transition-colors">
              Kalkulator Biaya
            </a>
            <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
              Testimoni Klien
            </a>
            <a href="#alur" className="hover:text-cyan-400 transition-colors">
              Alur Kerja
            </a>
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/prd-builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all glow-button"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
              <span>Buat PRD dengan AI</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/prd-builder"
              className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-blue-500/30 text-xs font-semibold"
            >
              AI PRD
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-b border-slate-800 px-4 py-6 space-y-4"
          >
            <a
              href="#layanan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
            >
              <span>Analisis Behavior & Platform</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="#server"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
            >
              <span>Opsi Server & Infrastruktur</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="#calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
            >
              <span>Estimasi Rate & Biaya</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href="#alur"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-slate-200 text-sm font-medium py-2 border-b border-slate-800/60"
            >
              <span>Alur Konsultasi AI</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
            <div className="pt-2">
              <Link
                href="/prd-builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mulai Buat PRD AI</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
