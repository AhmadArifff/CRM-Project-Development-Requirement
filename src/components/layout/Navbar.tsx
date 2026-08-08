'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Rocket, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#060911]/60 backdrop-blur-2xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-500">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Rocket className="w-5 h-5 text-cyan-400 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 group-hover:text-cyan-50 transition-colors">
                DevPulse<span className="text-cyan-400">Studio</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-medium block opacity-80 group-hover:opacity-100 transition-opacity">
                AI PRD & App Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['Analisis Platform', 'Opsi Server', 'Kalkulator Biaya', 'Testimoni Klien', 'Alur Kerja'].map((item, idx) => {
              const hrefs = ['#layanan', '#server', '#calculator', '#testimonials', '#alur'];
              return (
                <a key={idx} href={hrefs[idx]} className="relative group text-slate-300 hover:text-white transition-colors py-2">
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
                </a>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/prd-builder"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-transform duration-500 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-500" />
              <Sparkles className="w-4 h-4 text-cyan-200 relative z-10 animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Buat PRD dengan AI</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/prd-builder"
              className="px-3 py-1.5 rounded-lg bg-blue-600/10 text-cyan-400 border border-blue-500/20 text-xs font-semibold backdrop-blur-md"
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
