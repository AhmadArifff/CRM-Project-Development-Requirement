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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border-slate-800/80 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
              >
                {/* Quote Icon Accent */}
                <Quote className="w-16 h-16 text-blue-500/10 absolute -top-2 -right-2 pointer-events-none group-hover:text-cyan-500/20 transition-colors" />

                <div className="space-y-4">
                  {/* Top Bar: Stars & Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 font-mono">
                      {t.category}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Card Footer: Author Profile & Outcome Metric */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{t.author}</span>
                        <span title="Verified Client">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-400">{t.role} • <strong className="text-slate-300">{t.company}</strong></p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded-lg font-bold border border-emerald-500/20 block">
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
