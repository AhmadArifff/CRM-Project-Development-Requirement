'use client';

import React, { useState } from 'react';
import { usePrdStore } from '@/store/usePrdStore';
import { PuzzleCaptcha } from '@/components/ui/PuzzleCaptcha';
import { ShieldCheck, Lock, RefreshCw, AlertCircle, Puzzle, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CaptchaGate: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { setCaptchaVerified } = usePrdStore();
  const [mode, setMode] = useState<'puzzle' | 'math'>('puzzle');

  // Math Fallback State
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(8);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const generateNewMath = () => {
    setNum1(Math.floor(Math.random() * 9) + 2);
    setNum2(Math.floor(Math.random() * 9) + 2);
    setUserAnswer('');
    setErrorMsg('');
  };

  const handleMathVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer.trim(), 10) === num1 * num2) {
      setCaptchaVerified(true);
      onSuccess();
    } else {
      setErrorMsg('Jawaban verifikasi salah. Silakan coba lagi.');
      generateNewMath();
    }
  };

  const handleSuccess = () => {
    setCaptchaVerified(true);
    onSuccess();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      {/* Mode Switcher Pill */}
      <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setMode('puzzle')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
            mode === 'puzzle'
              ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Puzzle className="w-3.5 h-3.5" />
          <span>Puzzle Slider (Utama)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMode('math');
            generateNewMath();
          }}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
            mode === 'math'
              ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Math Challenge</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'puzzle' ? (
          <motion.div
            key="puzzle-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            <PuzzleCaptcha
              onSuccess={handleSuccess}
              title="Security Check: Puzzle Verification"
              description="Geser slider di bawah hingga potongan puzzle tepat mengisi lubang gambar untuk memverifikasi Anda adalah manusia."
            />
          </motion.div>
        ) : (
          <motion.div
            key="math-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[390px] mx-auto glass-card rounded-2xl p-6 sm:p-7 border-slate-700/80 shadow-2xl text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-cyan-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white">Verifikasi Alternatif: Math Question</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Jawab perhitungan sederhana di bawah untuk melanjutkan akses AI PRD Builder.
              </p>
            </div>

            <form onSubmit={handleMathVerify} className="space-y-4">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-sm font-mono text-slate-300 font-bold">
                  Berapa <span className="text-cyan-400 text-base">{num1} × {num2}</span> ?
                </span>
                <button
                  type="button"
                  onClick={generateNewMath}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Ganti angka"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <input
                type="number"
                required
                placeholder="Masukkan jawaban..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-center font-bold tracking-wider"
              />

              {errorMsg && (
                <div className="flex items-center justify-center gap-1.5 text-red-400 text-xs font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Lock className="w-4 h-4" />
                <span>Verifikasi Jawaban</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
