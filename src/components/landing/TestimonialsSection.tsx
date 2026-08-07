'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, ThumbsUp, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingContentStore } from '@/store/useLandingContentStore';

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  category: 'E-Commerce' | 'SaaS Web App' | 'Mobile App' | 'CRM Platform';
  rating: number;
  quote: string;
  metrics: string;
  date: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 't-1',
    author: 'Budi Santoso',
    role: 'Chief Executive Officer',
    company: 'PT Retail Bangun Nusantara',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'E-Commerce',
    rating: 5,
    quote: 'Fitur AI PRD Builder dari DevPulse Studio luar biasa presisi! Dalam waktu 10 menit, spesifikasi teknis dan estimasi jam kerja aplikasi toko online kami langsung tersusun rapi. Tim konsultannya sangat solutif!',
    metrics: 'Estimasi Biaya Acc 100% Sesuai MVP',
    date: 'Agustus 2026',
  },
  {
    id: 't-2',
    author: 'Siti Rahmawati',
    role: 'Head of Product Operations',
    company: 'CV Logistik Maju Express',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'CRM Platform',
    rating: 5,
    quote: 'Sebelumnya kami kesulitan menghitung durasi pengerjaan platform internal CRM. Lewat konsultasi DevPulse Studio, arsitektur Supabase & Next.js di-breakdown dengan jelas dari hari pertama.',
    metrics: 'Rilis 2 Minggu Lebih Cepat',
    date: 'Juli 2026',
  },
  {
    id: 't-3',
    author: 'Hendra Gunawan',
    role: 'Chief Technology Officer',
    company: 'FinTech Digital Indonesia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'SaaS Web App',
    rating: 5,
    quote: 'Integrasi AI Assistant pada portal konsultasi ini sangat membantu tim kami menyelaraskan alur kerja B2B. Dokumen PRD yang dihasilkan langsung siap dieksekusi oleh tim developer.',
    metrics: 'Efisiensi Time-to-Market +40%',
    date: 'Juli 2026',
  },
  {
    id: 't-4',
    author: 'Dewi Lestari',
    role: 'Founder & Managing Director',
    company: 'Travelku Interactive',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Mobile App',
    rating: 5,
    quote: 'Kalkulator biaya transparan dan rekomendasi arsitektur mobile native vs Flutter dari DevPulse Studio sangat objektif. Sangat direkomendasikan untuk pendiri startup yang butuh kejelasan anggaran!',
    metrics: 'Budget MVP Terkendali',
    date: 'Juni 2026',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const { testimonials: cmsTestimonials } = useLandingContentStore();

  const filteredTestimonials = (cmsTestimonials.items || []).filter(
    (t) => activeCategory === 'ALL' || t.category === activeCategory
  );

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-slate-950/60">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{cmsTestimonials.badgeText}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {cmsTestimonials.sectionTitle}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {cmsTestimonials.sectionSubhead}
          </p>

          {/* Rating Summary Pill */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span><strong>4.9 / 5.0 Rating</strong> dari 48+ Proyek Aplikasi Selesai</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
          {['ALL', 'E-Commerce', 'SaaS Web App', 'Mobile App', 'CRM Platform'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold transition-all border shrink-0 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              {cat === 'ALL' ? 'Semua Review' : cat}
            </button>
          ))}
        </div>

        {/* Testimonials Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-lg flex flex-col justify-between space-y-6 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(34,211,238,0.1)]"
              >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                
                {/* Glow on hover */}
                <div className="absolute -inset-x-20 -top-20 h-40 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Quote Icon Accent */}
                <Quote className="w-16 h-16 text-blue-500/5 absolute -top-2 -right-2 pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-500 group-hover:scale-110 group-hover:-rotate-6" />

                <div className="space-y-5 relative z-10">
                  {/* Top Bar: Stars & Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 border border-white/5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono tracking-wide shadow-inner">
                      {t.category}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium italic group-hover:text-white transition-colors duration-300">
                    "{t.quote}"
                  </p>
                </div>

                {/* Card Footer: Author Profile & Outcome Metric */}
                <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md group-hover:border-cyan-500/50 transition-colors duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-[#060911] rounded-full p-0.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {t.author}
                      </h4>
                      <p className="text-[11px] text-slate-400">{t.role} • <strong className="text-slate-300">{t.company}</strong></p>
                    </div>
                  </div>

                  <div className="self-start sm:self-center">
                    <span className="text-[10px] bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-300 px-3 py-1.5 rounded-lg font-bold border border-emerald-500/20 block shadow-sm whitespace-nowrap">
                      ✓ {t.metrics}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
