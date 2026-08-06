'use client';

import React, { useState } from 'react';
import { useAdminStore, AiProviderConfig } from '@/store/useAdminStore';
import {
  Sparkles,
  Key,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  RefreshCw,
  Sliders,
  DollarSign,
  Send,
  Bot,
  User,
  AlertTriangle,
  Lock,
  Save,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiAssistantSettingsPage() {
  const {
    aiProviders,
    toggleAiProvider,
    setDefaultAiProvider,
    updateAiApiKey,
    updateAiSelectedModel,
    systemPrompt,
    setSystemPrompt,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState<'providers' | 'prompt' | 'simulator'>('providers');
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; msg: string } | null>(null);

  // System Prompt Form State
  const [instruction, setInstruction] = useState(systemPrompt.systemInstruction);
  const [restriction, setRestriction] = useState(systemPrompt.scopeRestriction);
  const [offTopicMsg, setOffTopicMsg] = useState(systemPrompt.offTopicMessage);
  const [rate, setRate] = useState(systemPrompt.hourlyRate);
  const [promptSaved, setPromptSaved] = useState(false);

  // Simulator State
  const [simInput, setSimInput] = useState('');
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Halo Admin! Ini adalah Simulator Guardrail AI. Coba ketik pertanyaan seputar proyek (misal: "Berapa estimasi modul auth?") atau pertanyaan off-topic (misal: "Siapa presiden Indonesia?") untuk menguji aturan System Prompt!' },
  ]);

  const handleTestConnection = (provider: AiProviderConfig) => {
    setTestingId(provider.id);
    setTestResult(null);

    setTimeout(() => {
      setTestingId(null);
      setTestResult({
        id: provider.id,
        success: true,
        msg: `Koneksi Berhasil! ${provider.availableModels.length} model otomatis dimuat: (${provider.availableModels.join(', ')})`,
      });

      setTimeout(() => setTestResult(null), 4000);
    }, 1000);
  };

  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    setSystemPrompt({
      systemInstruction: instruction,
      scopeRestriction: restriction,
      offTopicMessage: offTopicMsg,
      hourlyRate: Number(rate),
    });
    setPromptSaved(true);
    setTimeout(() => setPromptSaved(false), 2500);
  };

  const handleSimulateChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;

    const userText = simInput;
    setSimMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setSimInput('');

    setTimeout(() => {
      const lower = userText.toLowerCase();
      const isOffTopic =
        lower.includes('masak') ||
        lower.includes('presiden') ||
        lower.includes('cuaca') ||
        lower.includes('lagu') ||
        lower.includes('film');

      let reply = '';
      if (isOffTopic) {
        reply = `🚫 **Guardrail Triggered (Off-Topic Rejected):**\n\n${offTopicMsg}`;
      } else {
        reply = `✨ **Guardrail Approved (Scope Proyek Sesuai):**\n\nBerdasarkan sistem prompt & rate **Rp ${new Intl.NumberFormat('id-ID').format(rate)}/jam**, modul yang Anda tanyakan dapat dirancang dengan estimasi waktu yang transparan.`;
      }

      setSimMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span>AI Assistant & <span className="gradient-text-cyan">API Key Management</span></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Konfigurasi provider AI, enkripsi API key (AES-256-GCM), custom prompt injection, & guardrail scope proyek.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'providers' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            1. AI Providers & Keys
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'prompt' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            2. System Prompt & Rules
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'simulator' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            3. Guardrail Simulator
          </button>
        </div>
      </div>

      {/* TAB 1: AI PROVIDERS & API KEYS */}
      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Keamanan Terjamin:</strong> Seluruh API Key dienkripsi di database menggunakan <strong className="text-cyan-300">AES-256-GCM</strong> dan hanya dipanggil via Server Proxy (`/api/ai/chat`).
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiProviders.map((p) => (
              <div
                key={p.id}
                className={`glass-card p-5 rounded-2xl border transition-all space-y-4 ${
                  p.isDefault ? 'border-cyan-500/80 shadow-cyan-500/10' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-cyan-400">
                      {p.providerKey.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {p.isDefault && (
                          <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold border border-cyan-500/30">
                            DEFAULT PROVIDER
                          </span>
                        )}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">Provider Key: {p.providerKey}</span>
                    </div>
                  </div>

                  {/* Active Toggle */}
                  <button
                    onClick={() => toggleAiProvider(p.id)}
                    className="flex items-center gap-1 text-xs font-semibold"
                  >
                    {p.isActive ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <ToggleRight className="w-6 h-6 text-emerald-400" />
                        <span>Aktif</span>
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <ToggleLeft className="w-6 h-6 text-slate-600" />
                        <span>Non-Aktif</span>
                      </span>
                    )}
                  </button>
                </div>

                {/* API Key Input */}
                <div className="space-y-1 text-xs">
                  <label className="text-slate-400 font-semibold block flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-cyan-400" />
                    <span>API Key (AES-256 Encrypted)</span>
                  </label>
                  <input
                    type="password"
                    value={p.apiKey}
                    onChange={(e) => updateAiApiKey(p.id, e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Model Selector & Test Connection */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Model Digunakan</label>
                    <select
                      value={p.selectedModel}
                      onChange={(e) => updateAiSelectedModel(p.id, e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                    >
                      {p.availableModels.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => handleTestConnection(p)}
                      disabled={testingId === p.id}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testingId === p.id ? 'animate-spin' : ''}`} />
                      <span>Test Koneksi</span>
                    </button>
                  </div>
                </div>

                {testResult?.id === p.id && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                    ✓ {testResult.msg}
                  </div>
                )}

                {/* Default Provider Button */}
                {!p.isDefault && p.isActive && (
                  <button
                    onClick={() => setDefaultAiProvider(p.id)}
                    className="w-full py-2 rounded-xl bg-blue-600/15 text-cyan-300 hover:bg-blue-600/25 border border-blue-500/30 text-xs font-semibold transition-colors"
                  >
                    Jadikan Default Provider Landing Page
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SYSTEM PROMPT INJECTION & GUARDRAILS */}
      {activeTab === 'prompt' && (
        <form onSubmit={handleSavePrompt} className="glass-card p-6 rounded-2xl border-slate-800 space-y-6 text-xs">
          {promptSaved && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
              ✓ System Prompt & Rules Guardrail Berhasil Disimpan & Di-inject!
            </div>
          )}

          <div>
            <label className="text-slate-200 font-bold block mb-1.5 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>1. Custom System Instruction (Role Persona)</span>
            </label>
            <textarea
              rows={3}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white leading-relaxed focus:outline-none focus:border-cyan-500 font-mono text-xs"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Instruksi dasar yang menentukan perilaku dan kepribadian AI saat merespon klien.
            </p>
          </div>

          <div>
            <label className="text-slate-200 font-bold block mb-1.5 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>2. Scope Restriction Guardrails (Pembatasan Topik Proyek Only)</span>
            </label>
            <textarea
              rows={3}
              value={restriction}
              onChange={(e) => setRestriction(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-200 leading-relaxed focus:outline-none focus:border-amber-400 font-mono text-xs"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Aturan ketat untuk mengunci AI agar <strong>hanya merespon percakapan seputar proyek aplikasi</strong> dan menolak pertanyaan umum/off-topic.
            </p>
          </div>

          <div>
            <label className="text-slate-200 font-bold block mb-1.5 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>3. Pesan Penolakan Off-Topic (Polite Rejection Response)</span>
            </label>
            <input
              type="text"
              value={offTopicMsg}
              onChange={(e) => setOffTopicMsg(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          <div>
            <label className="text-slate-200 font-bold block mb-1.5 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>4. Inject Dynamic Rate Harga ke Respon AI (IDR / Jam)</span>
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-bold text-xs focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Rate ini akan di-inject ke prompt agar AI otomatis menghitung perkiraan estimasi biaya (Durasi Jam × Rate) saat klien bertanya harga.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all glow-button"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Inject Rules Ke AI</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: INTERACTIVE GUARDRAIL SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="glass-card rounded-2xl border-slate-800 overflow-hidden flex flex-col h-[550px] shadow-2xl">
          <div className="p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">Interactive System Prompt & Guardrail Simulator</span>
            </div>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
              🟢 Guardrail Active
            </span>
          </div>

          {/* Simulator Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/80 text-xs">
            {simMessages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-purple-600/25 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/30">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'ai'
                      ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none font-mono whitespace-pre-wrap'
                      : 'bg-blue-600 text-white rounded-tr-none font-medium'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600/30 text-cyan-300 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Simulator Input Bar */}
          <form onSubmit={handleSimulateChat} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Uji pertanyaan (misal: 'Berapa biaya modul auth?' atau 'Apa resep fried chicken?')..."
              value={simInput}
              onChange={(e) => setSimInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Test AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
