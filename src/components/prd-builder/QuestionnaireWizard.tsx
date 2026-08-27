'use client';

import React, { useState } from 'react';
import { usePrdStore, QuestionnaireData } from '@/store/usePrdStore';
import { HelpCircle, ChevronRight, ChevronLeft, Check, Sparkles, Send, Zap, Bot, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuestionnaireWizard: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { questionnaire, setQuestionnaireField, buildPrdFromQuestionnaire } = usePrdStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiAppliedNotification, setAiAppliedNotification] = useState<string | null>(null);

  const questions = [
    {
      key: 'appCategory' as keyof QuestionnaireData,
      title: 'Aplikasi jenis apa yang ingin Anda bangun?',
      subtitle: 'Pilih kategori utama yang paling mendekati ide bisnis Anda.',
      type: 'options',
      options: [
        'CRM & Management Dashboard',
        'E-Commerce & Toko Online',
        'SaaS (Software as a Service) Web App',
        'Mobile Application (Android & iOS)',
        'Marketplace & Booking System',
        'Custom Web Application',
      ],
      aiRecommendOption: 'CRM & Management Dashboard', // Default smart pick
    },
    {
      key: 'targetAudience' as keyof QuestionnaireData,
      title: 'Siapa target pengguna utama aplikasi ini?',
      subtitle: 'Pahami calon pengguna akhir agar desain UX tepat sasaran.',
      type: 'options',
      options: [
        'Pelanggan Umum / Publik (B2C)',
        'Perusahaan & Klien Bisnis (B2B)',
        'Tim & Karyawan Internal Staff',
        'Kombinasi Publik & Admin Internal',
      ],
      aiRecommendOption: 'Kombinasi Publik & Admin Internal',
    },
    {
      key: 'keyFeatures' as keyof QuestionnaireData,
      title: 'Fitur utama apa saja yang wajib ada?',
      subtitle: 'Tuliskan poin fitur utama dalam bahasa umum (tanpa perlu istilah teknis).',
      type: 'text',
      placeholder: 'Contoh: Login user, katalog produk, keranjang belanja, integrasi payment gateway, dan dashboard laporan penjualan.',
    },
    {
      key: 'userScale' as keyof QuestionnaireData,
      title: 'Berapa perkiraan skala jumlah pengguna awal?',
      subtitle: 'Membantu konsultan merekomendasikan kapasitas server yang pas.',
      type: 'options',
      options: [
        'Scale Kecil (10 - 500 User Aktif)',
        'Scale Menengah (500 - 5.000 User Aktif)',
        'Scale Besar (5.000 - 50.000+ User Aktif)',
      ],
      aiRecommendOption: 'Scale Menengah (500 - 5.000 User Aktif)',
    },
    {
      key: 'referenceApp' as keyof QuestionnaireData,
      title: 'Apakah ada referensi aplikasi yang Anda sukai?',
      subtitle: 'Sebutkan nama aplikasi sebagai gambaran alur & tampilan.',
      type: 'text',
      placeholder: 'Contoh: Mirip perpaduan Trello untuk tugas dan Notion untuk catatan, warna dark mode.',
    },
    {
      key: 'budgetRange' as keyof QuestionnaireData,
      title: 'Berapa perkiraan alokasi budget project Anda?',
      subtitle: 'Membantu AI menyusun scope MVP yang realistis sesuai anggaran.',
      type: 'options',
      options: [
        'Rp 5.000.000 - Rp 15.000.000 (MVP Dasar)',
        'Rp 15.000.000 - Rp 35.000.000 (Standard Commercial)',
        'Rp 35.000.000 - Rp 75.000.000 (Full Platform)',
        'Rp 75.000.000+ (Custom Enterprise)',
      ],
      aiRecommendOption: 'Rp 15.000.000 - Rp 35.000.000 (Standard Commercial)',
    },
    {
      key: 'timeline' as keyof QuestionnaireData,
      title: 'Kapan target rilis aplikasi Anda?',
      subtitle: 'Tentukan ekspektasi waktu penyelesaian yang diinginkan.',
      type: 'options',
      options: [
        'Urgent (< 1 Bulan / Sprint Cepat)',
        'Standard (1 - 2 Bulan)',
        'Flexibel (2 - 4 Bulan)',
      ],
      aiRecommendOption: 'Standard (1 - 2 Bulan)',
    },
  ];

  const q = questions[currentStep];

  // AI Recommendation Engine Logic per step based on previous answers
  const handleGetAiRecommendation = () => {
    setIsAiGenerating(true);
    setAiAppliedNotification(null);

    setTimeout(() => {
      if (q.type === 'options') {
        let recommendedChoice = q.aiRecommendOption || q.options![0];

        // Context alignment based on previous choices
        if (q.key === 'userScale' && questionnaire.appCategory?.includes('E-Commerce')) {
          recommendedChoice = 'Scale Besar (5.000 - 50.000+ User Aktif)';
        } else if (q.key === 'budgetRange' && questionnaire.userScale?.includes('Besar')) {
          recommendedChoice = 'Rp 35.000.000 - Rp 75.000.000 (Full Platform)';
        }

        setQuestionnaireField(q.key, recommendedChoice);
        setAiAppliedNotification(`AI merekomendasikan & memilih "${recommendedChoice}"`);
      } else if (q.type === 'text') {
        let essaySuggestion = '';

        if (q.key === 'keyFeatures') {
          const category = questionnaire.appCategory || 'Aplikasi CRM';
          const target = questionnaire.targetAudience || 'B2B & Admin';
          
          if (category.includes('E-Commerce')) {
            essaySuggestion = 'System login user & profile, katalog produk dengan filter & pencarian, keranjang belanja, integrasi payment gateway Midtrans/Xendit, tracking order real-time, dan dashboard laporan penjualan.';
          } else if (category.includes('CRM')) {
            essaySuggestion = 'Dashboard analytics KPI, Kanban pipeline deals, Trello task board per project, manajemen kontak lead, activity log sales, dan notifikasi real-time.';
          } else if (category.includes('SaaS')) {
            essaySuggestion = 'Authentication Better Auth + JWT, subscription plan management, user workspace dashboard, role-based access control (RBAC), dan export report PDF/Excel.';
          } else {
            essaySuggestion = `Fitur utama mencakup autentikasi user, dashboard manajemen data ${category}, sistem notifikasi, role-based permission, dan integrasi API.`;
          }
        } else if (q.key === 'referenceApp') {
          const category = questionnaire.appCategory || 'CRM';
          if (category.includes('CRM') || category.includes('Task')) {
            essaySuggestion = 'Perpaduan Trello untuk manajemen task, Linear untuk UI dark-mode modern, dan Notion untuk dokumentasi proyek.';
          } else if (category.includes('E-Commerce')) {
            essaySuggestion = 'Tampilan katalog clean ala Tokopedia dengan checkout flow cepat seperti Shopify.';
          } else {
            essaySuggestion = 'Antarmuka modern khas SaaS global seperti Linear.app dan Notion dengan tema dark mode.';
          }
        }

        setQuestionnaireField(q.key, essaySuggestion);
        setAiAppliedNotification('AI telah menyusun & mengisikan rekomendasi deskripsi di kolom input!');
      }

      setIsAiGenerating(false);
      setTimeout(() => setAiAppliedNotification(null), 3500);
    }, 800);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      buildPrdFromQuestionnaire();
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentValue = questionnaire[q.key];

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border-slate-700/80 shadow-2xl relative">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
          <span>Pertanyaan Requirement {currentStep + 1} dari {questions.length}</span>
          <span className="text-cyan-400 font-mono font-bold">{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Title & AI Smart Trigger Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">{q.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400">{q.subtitle}</p>
            </div>

            {/* AI Recommendation Trigger Button */}
            <button
              type="button"
              onClick={handleGetAiRecommendation}
              disabled={isAiGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 text-cyan-300 border border-purple-500/40 text-xs font-bold shrink-0 transition-all shadow-md shadow-purple-900/20 active:scale-95 glow-button"
            >
              <Sparkles className={`w-3.5 h-3.5 text-amber-400 ${isAiGenerating ? 'animate-spin' : 'animate-pulse'}`} />
              <span>{isAiGenerating ? 'AI Menganalisis...' : '✨ Rekomendasi AI'}</span>
            </button>
          </div>

          {/* AI Applied Toast Banner */}
          {aiAppliedNotification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-950/80 to-blue-950/80 border border-purple-500/50 text-xs text-purple-200 flex items-center gap-2 shadow-lg"
            >
              <ThumbsUp className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{aiAppliedNotification}</span>
            </motion.div>
          )}

          {/* Input Type: Options */}
          {q.type === 'options' && (
            <div className="space-y-3">
              {q.options?.map((opt, idx) => {
                const isSelected = currentValue === opt;
                const isAiRecommended = q.aiRecommendOption === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuestionnaireField(q.key, opt)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border relative overflow-hidden ${
                      isSelected
                        ? 'bg-blue-600/25 border-cyan-500 text-white ring-1 ring-cyan-500/50 shadow-md'
                        : isAiRecommended
                        ? 'bg-purple-950/30 border-purple-500/50 text-slate-200 hover:border-purple-400 hover:bg-purple-900/40'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{opt}</span>
                      {isAiRecommended && !isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold border border-purple-500/40 animate-pulse">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Rekomendasi AI</span>
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Input Type: Text (Essay Input Field) */}
          {q.type === 'text' && (
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  rows={4}
                  placeholder={q.placeholder}
                  value={currentValue}
                  onChange={(e) => setQuestionnaireField(q.key, e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                />
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Klik tombol <strong className="text-cyan-300 font-semibold">"✨ Rekomendasi AI"</strong> di atas jika Anda ingin AI menyusun teks uraian ini otomatis!</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                currentStep === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentValue.trim()}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all ${
                !currentValue.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] glow-button'
              }`}
            >
              <span>{currentStep === questions.length - 1 ? 'Mulai AI Chat PRD' : 'Lanjut'}</span>
              {currentStep === questions.length - 1 ? <Sparkles className="w-4 h-4 text-cyan-200" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
