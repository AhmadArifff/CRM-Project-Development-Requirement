'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CaptchaGate } from '@/components/prd-builder/CaptchaGate';
import { QuestionnaireWizard } from '@/components/prd-builder/QuestionnaireWizard';
import { ChatAndPreview } from '@/components/prd-builder/ChatAndPreview';
import { SubmissionModal } from '@/components/prd-builder/SubmissionModal';
import { usePrdStore } from '@/store/usePrdStore';
import { ShieldCheck, HelpCircle, Bot, Sparkles, RefreshCw } from 'lucide-react';

export default function PrdBuilderPage() {
  const { captchaVerified, isQuestionnaireComplete, resetAll } = usePrdStore();
  const [stepOverride, setStepOverride] = useState<'captcha' | 'wizard' | 'chat' | null>(null);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);

  const isWizardDone = isQuestionnaireComplete();

  let activeStep: 'captcha' | 'wizard' | 'chat' = 'captcha';
  if (stepOverride) {
    activeStep = stepOverride;
  } else if (!captchaVerified) {
    activeStep = 'captcha';
  } else if (!isWizardDone) {
    activeStep = 'wizard';
  } else {
    activeStep = 'chat';
  }

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI PRD Generation Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sistem Pembuatan PRD.md <span className="gradient-text-cyan">Berbasis AI</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <div
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeStep === 'captcha' ? 'bg-blue-600 text-white shadow' : 'text-slate-500'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>1. CAPTCHA</span>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeStep === 'wizard' ? 'bg-blue-600 text-white shadow' : 'text-slate-500'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>2. Scope</span>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeStep === 'chat' ? 'bg-blue-600 text-white shadow' : 'text-slate-500'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>3. AI Chat & PRD</span>
              </div>
            </div>

            <button
              onClick={() => {
                resetAll();
                setStepOverride('captcha');
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset Semua Flow"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Views */}
        {activeStep === 'captcha' && (
          <div className="py-12">
            <CaptchaGate onSuccess={() => setStepOverride('wizard')} />
          </div>
        )}

        {activeStep === 'wizard' && (
          <div className="py-8">
            <QuestionnaireWizard onComplete={() => setStepOverride('chat')} />
          </div>
        )}

        {activeStep === 'chat' && (
          <ChatAndPreview onOpenSubmission={() => setIsSubmissionOpen(true)} />
        )}
      </main>

      <SubmissionModal isOpen={isSubmissionOpen} onClose={() => setIsSubmissionOpen(false)} />
      <Footer />
    </div>
  );
}
