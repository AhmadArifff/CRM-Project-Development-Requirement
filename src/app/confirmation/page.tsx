'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { usePrdStore } from '@/store/usePrdStore';
import { CheckCircle2, MessageCircle, FileText, ArrowRight, Home, Sparkles, PhoneCall, Building, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfirmationPage() {
  const { submission, questionnaire, estimatedHours, hourlyRate } = usePrdStore();

  useEffect(() => {
    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignore if confetti canvas fails
    }
  }, []);

  const totalCost = estimatedHours * hourlyRate;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const waMessage = encodeURIComponent(
    `Halo Konsultan CRM Project! Saya telah submit PRD untuk aplikasi *${submission.appTitle || 'Aplikasi Baru'}* (${submission.companyName || 'Perusahaan'}). Mohon infokan kesepakatan jadwal meeting & kelanjutan project. Terima kasih!`
  );

  const waUrl = `https://wa.me/6281234567890?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 sm:p-10 border-slate-700/80 shadow-2xl text-center space-y-6"
        >
          {/* Success Animated Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10 animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pengiriman PRD Berhasil!</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Terima Kasih! PRD.md <span className="gradient-text-cyan">Telah Terikirim</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-2 leading-relaxed">
              Tim konsultan kami telah menerima dokumen PRD & data proyek Anda. Kami akan segera menghubungi kontak Anda dalam waktu maksimal <strong className="text-white">1x24 Jam</strong>.
            </p>
          </div>

          {/* Submission Summary Card */}
          <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 text-left text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Ringkasan Pengajuan Project</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
                STATUS: PENDING REVIEW
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Judul Aplikasi:</span>
                <span className="font-semibold text-white">{submission.appTitle || 'Aplikasi CRM Management'}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Nama Perusahaan / Personal:</span>
                <span className="font-semibold text-white">{submission.companyName || 'PT Client Digital'}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Nomor Kontak / WA:</span>
                <span className="font-semibold text-cyan-300">{submission.contactPhone || '+62 812-3456-7890'}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Email User:</span>
                <span className="font-semibold text-cyan-300">{submission.email || 'client@company.com'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Estimasi: <strong>{estimatedHours} Jam Kerja</strong></span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider mr-2">Estimasi Biaya:</span>
                <span className="text-sm font-extrabold text-emerald-400">{formatRupiah(totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 hover:shadow-teal-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 glow-button"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Hubungi Konsultan via WhatsApp Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-center gap-4 text-xs pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Landing Page</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
