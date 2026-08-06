'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePrdStore } from '@/store/usePrdStore';
import { X, Send, FileText, CheckCircle, Building, User, Phone, Mail, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SubmissionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { submission, setSubmissionField, questionnaire, estimatedHours, hourlyRate } = usePrdStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      router.push('/confirmation');
    }, 1000);
  };

  const totalCost = estimatedHours * hourlyRate;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg glass-card rounded-2xl p-6 sm:p-8 border-slate-700/80 shadow-2xl space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-cyan-400 flex items-center justify-center mx-auto border border-blue-500/30">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Upload PRD.md & Data Kontak</h3>
            <p className="text-xs text-slate-400">
              Isi data lengkap Anda untuk mengirimkan dokumen PRD & menjadwalkan konsultasi dengan konsultan kami.
            </p>
          </div>

          {/* Attachment Summary Badge */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <FileText className="w-4 h-4" />
                <span>PRD.md Attachment Auto-Created</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                Ready to Send
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between pt-1">
              <span>Estimasi Durasi: <strong>{estimatedHours} Jam</strong></span>
              <span>Total Estimasi: <strong className="text-emerald-400">{formatRupiah(totalCost)}</strong></span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Title / Nama Aplikasi <span className="text-red-400">*</span></span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Aplikasi CRM Sales Management"
                value={submission.appTitle}
                onChange={(e) => setSubmissionField('appTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nama Perusahaan / Startup <span className="text-red-400">*</span></span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: PT Teknologi Bangun Bangsa"
                value={submission.companyName}
                onChange={(e) => setSubmissionField('companyName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nomor Kontak / WhatsApp <span className="text-red-400">*</span></span>
              </label>
              <input
                type="tel"
                required
                placeholder="Contoh: +62 812-3456-7890"
                value={submission.contactPhone}
                onChange={(e) => setSubmissionField('contactPhone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Official / Perusahaan <span className="text-red-400">*</span></span>
              </label>
              <input
                type="email"
                required
                placeholder="Contoh: budi@ptteknologi.co.id"
                value={submission.email}
                onChange={(e) => setSubmissionField('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 glow-button mt-4"
            >
              {isSubmitting ? (
                <span>Mengirimkan PRD.md...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirimkan PRD & Kirim Notifikasi Kontak</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
