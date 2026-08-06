'use client';

import React, { useState } from 'react';
import { usePrdStore } from '@/store/usePrdStore';
import { ShieldCheck, Lock, CheckCircle, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const CaptchaGate: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { setCaptchaVerified } = usePrdStore();
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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer.trim(), 10) === num1 * num2) {
      setCaptchaVerified(true);
      onSuccess();
    } else {
      setErrorMsg('Jawaban verifikasi salah. Silakan coba lagi.');
      generateNewMath();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto glass-card rounded-2xl p-6 sm:p-8 border-slate-700/80 shadow-2xl text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-cyan-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
        <ShieldCheck className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Verifikasi Security Anti-Bot</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        Sistem menggunakan verifikasi CAPTCHA sederhana untuk melindungi penggunaan token AI dari spam bot otomatis.
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <span className="text-sm font-mono text-slate-300 font-bold">
            Berapa hasil dari <span className="text-cyan-400 text-base">{num1} x {num2}</span> ?
          </span>
          <button
            type="button"
            onClick={generateNewMath}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Refresh pertanyaan"
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
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 glow-button"
        >
          <Lock className="w-4 h-4" />
          <span>Verifikasi & Mulai Sesi AI</span>
        </button>
      </form>
    </motion.div>
  );
};
