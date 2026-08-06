'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, Mail, Phone, Heart } from 'lucide-react';
import { useLandingContentStore } from '@/store/useLandingContentStore';

export const Footer: React.FC = () => {
  const { footer } = useLandingContentStore();
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-slate-950 font-bold">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                DevPulse<span className="gradient-text-cyan">Studio</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              {footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2">
              <li><a href="#layanan" className="hover:text-cyan-400 transition-colors">Analisis Platform</a></li>
              <li><a href="#server" className="hover:text-cyan-400 transition-colors">Opsi Server & Cloud</a></li>
              <li><a href="#calculator" className="hover:text-cyan-400 transition-colors">Kalkulator Rate</a></li>
              <li><a href="#alur" className="hover:text-cyan-400 transition-colors">Alur AI PRD</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Modul Aplikasi</h4>
            <ul className="space-y-2">
              <li><Link href="/prd-builder" className="hover:text-cyan-400 transition-colors">AI PRD Builder</Link></li>
              <li><span className="text-slate-500">Deals Pipeline Kanban (Admin)</span></li>
              <li><span className="text-slate-500">Project Task Board (Admin)</span></li>
              <li><span className="text-slate-500">Leads Management (Admin)</span></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Hubungi Konsultan</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@crm-project.dev</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CRM Management Project. Built with Next.js, Tailwind, & Framer Motion.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Developers & Clients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
