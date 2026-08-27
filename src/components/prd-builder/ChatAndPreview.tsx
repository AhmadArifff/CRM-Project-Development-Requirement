'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePrdStore } from '@/store/usePrdStore';
import { MermaidRenderer } from '@/components/ui/MermaidRenderer';
import {
  Sparkles,
  Send,
  Download,
  Copy,
  Check,
  Bot,
  User,
  Calculator,
  FileText,
  MessageSquare,
  Eye,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Maximize2,
  Minimize2,
  ChevronRight,
  Zap,
  Info,
  CheckSquare,
  CornerDownRight,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Notion-Style Custom Markdown Components
const NotionComponents = {
  h1: ({ children }: any) => (
    <div className="border-b-2 border-blue-600/40 pb-3 mb-6 mt-4">
      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
        <span className="text-xl">📄</span>
        <span className="gradient-text-cyan">{children}</span>
      </h1>
    </div>
  ),
  h2: ({ children }: any) => (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-l-4 border-cyan-400 border border-slate-800/80 px-4 py-2.5 my-6 rounded-r-xl shadow-md">
      <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
          <span>{children}</span>
        </span>
        <span className="text-[10px] font-mono font-normal text-slate-500 uppercase tracking-widest">
          SECTION
        </span>
      </h2>
    </div>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-sm font-bold text-cyan-300 mt-5 mb-2.5 flex items-center gap-2 border-b border-slate-800/60 pb-1.5">
      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
      <span>{children}</span>
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-2 font-normal">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-1.5 my-2.5 pl-2">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="space-y-1.5 my-2.5 pl-4 list-decimal text-xs sm:text-sm text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-2">
      <span className="text-cyan-400 font-bold select-none">•</span>
      <div className="flex-1">{children}</div>
    </li>
  ),
  blockquote: ({ children }: any) => (
    <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-500/40 rounded-2xl p-4 my-4 shadow-xl text-xs text-cyan-200 flex items-start gap-3 backdrop-blur-md relative overflow-hidden">
      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-blue-500/30">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
      </div>
      <div className="flex-1 leading-relaxed text-slate-200 font-medium space-y-1">
        {children}
      </div>
    </div>
  ),
  strong: ({ children }: any) => (
    <strong className="text-cyan-300 font-bold bg-blue-500/15 px-1.5 py-0.5 rounded border border-blue-500/25">
      {children}
    </strong>
  ),
  code: ({ inline, className, children }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match && match[1] === 'mermaid') {
      return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />;
    }
    if (!inline && match) {
      return (
        <pre className="p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto border border-slate-800 my-3">
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code className="px-2 py-0.5 rounded-md bg-slate-950 text-cyan-300 border border-slate-800 font-mono text-[11px] shadow-inner">
        {children}
      </code>
    );
  },
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-slate-800 bg-slate-950/80 shadow-md">
      <table className="w-full text-xs text-left text-slate-300">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-slate-900 text-white font-bold border-b border-slate-800 uppercase tracking-wider text-[10px]">
      {children}
    </thead>
  ),
  th: ({ children }: any) => (
    <th className="p-3 border-r border-slate-800 last:border-0">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="p-3 border-b border-slate-800/80 last:border-0 border-r last:border-r-0">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="my-6 border-t border-slate-800" />
  ),
};

export const ChatAndPreview: React.FC<{ onOpenSubmission: () => void }> = ({ onOpenSubmission }) => {
  const {
    chatMessages,
    addChatMessage,
    isAiTyping,
    setIsAiTyping,
    prdMarkdown,
    setPrdMarkdown,
    hourlyRate,
    estimatedHours,
    setEstimatedHours,
    questionnaire,
  } = usePrdStore();

  const [inputMessage, setInputMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('chat');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  // Initial prompt generation based on questionnaire
  useEffect(() => {
    if (chatMessages.length === 1 && questionnaire.appCategory) {
      const summaryText = `💡 **Notion AI Architect Analysis**

Saya telah menyusun dokumen PRD lengkap berstandar *Enterprise Notion* dengan **Diagram Arsitektur Multi-Tier & Flowchart Mermaid** di panel kanan:
- **Kategori Aplikasi:** \`${questionnaire.appCategory}\`
- **Target Pengguna:** \`${questionnaire.targetAudience}\`
- **Fitur Terpilih:** \`${questionnaire.keyFeatures}\`
- **Skala Sistem:** \`${questionnaire.userScale}\`
- **Estimasi Total:** \`${estimatedHours} Jam Kerja (${timelineFormat(estimatedHours)})\`

> Anda dapat mengetik instruksi tambahan untuk merevisi modul, menambah diagram alur logika baru, atau menyesuaikan budget!`;
      addChatMessage('ai', summaryText);
    }
  }, [questionnaire]);

  const timelineFormat = (hrs: number) => `${hrs} Jam (~${Math.ceil(hrs / 40)} Minggu)`;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isAiTyping) return;

    addChatMessage('user', text);
    if (!textToSend) setInputMessage('');
    setIsAiTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let hoursAdd = 0;
      let prdAppend = '';

      const lower = text.toLowerCase();

      if (lower.includes('auth') || lower.includes('login') || lower.includes('security')) {
        aiReply = `🔒 **Modul Keamanan & Auth Diperbarui**

- **Teknologi Ditambahkan:** \`Better Auth + JWT Token Rotation & Session Fingerprinting\`
- **Fitur Baru:** Rate Limiter, CSRF Protection, & RLS Supabase Policies.
- **Estimasi Tambahan:** +15 Jam Kerja.

> Dokumen **PRD.md** dan diagram arsitektur telah diperbarui secara otomatis.`;
        hoursAdd = 15;
        prdAppend = `\n\n### 5.3 Modul Keamanan Tambahan (Security Hardening)
- **Token Security:** Enkripsi JWT dengan Refresh Token Rotation & HttpOnly Cookies.
- **Bot Defense:** Integrasi CAPTCHA Puzzle Gate pada seluruh formulir publik.
`;
      } else if (lower.includes('payment') || lower.includes('bayar') || lower.includes('midtrans')) {
        aiReply = `💳 **Integrasi Payment Gateway Otomatis**

- **Gateway Terpilih:** \`Midtrans / Xendit Integration\`
- **Fitur:** Snap Popup, Webhook Auto-Verification, QRIS, & Virtual Account.
- **Estimasi Tambahan:** +20 Jam Kerja.

> Dokumen **PRD.md** telah dilengkapi spesifikasi Payment Gateway.`;
        hoursAdd = 20;
        prdAppend = `\n\n### 5.4 Modul Payment Gateway & Invoicing
\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as Klien
    participant App as Frontend
    participant Server as Express Backend
    participant Gateway as Midtrans / Xendit

    Client->>App: Klik Bayar Proyek / DP
    App->>Server: Request Payment Token
    Server->>Gateway: Buat Transaksi Snap Token
    Gateway-->>Server: Token Snap Diterima
    Server-->>App: Tampilkan Snap Modal Popup
    Client->>Gateway: Pembayaran Selesai (QRIS / VA)
    Gateway->>Server: Webhook Notifikasi Sukses
    Server->>Server: Update Status Invoice 'PAID'
    Server-->>App: Notifikasi Realtime Pembayaran Berhasil
\`\`\`
`;
      } else if (lower.includes('mvp') || lower.includes('sederhana')) {
        aiReply = `⚡ **Scope Proyek Dioptimasi ke Fast-Track MVP**

- **Fokus Utama:** Fitur Inti (Auth, PRD Builder, Deals Kanban Dasar).
- **Estimasi Disesuaikan:** Total durasi dipangkas menjadi **100 Jam Kerja**.

> Dokumen PRD telah disesuaikan ke versi peluncuran cepat (MVP Launch).`;
        setEstimatedHours(100);
      } else {
        aiReply = `📝 **Permintaan Teknis Diterapkan**

Permintaan \`${text}\` telah berhasil dianalisis dan disinkronkan ke dalam dokumen **PRD.md**.

- Status Sinkronisasi: 🟢 **Active (Notion Document Live Synced)**
- Diagram & spesifikasi siap diekspor menjadi berkas \`.md\`.`;
        hoursAdd = 10;
        prdAppend = `\n\n> 💡 **Revisi AI Architect (${new Date().toLocaleTimeString()}):**
> - **Permintaan Klien:** ${text}
> - **Status Integrasi:** Disetujui & Diimplementasikan ke Scope PRD.
`;
      }

      addChatMessage('ai', aiReply);
      if (hoursAdd > 0) setEstimatedHours(estimatedHours + hoursAdd);

      setPrdMarkdown(`${prdMarkdown}${prdAppend}`);
      setIsAiTyping(false);
    }, 1000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(prdMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const element = document.createElement('a');
    const file = new Blob([prdMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `PRD_${questionnaire.appCategory ? questionnaire.appCategory.replace(/\s+/g, '_') : 'Project'}_${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const totalCost = estimatedHours * hourlyRate;

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-[#060911] h-screen overflow-hidden' : ''}`}>
      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden items-center p-1 bg-slate-900 rounded-xl border border-slate-800">
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
            mobileTab === 'chat' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Notion AI Chat</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
            mobileTab === 'preview' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Live PRD Document</span>
        </button>
      </div>

      {/* Main Dual Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${isFullscreen ? 'h-[calc(100vh-2rem)]' : 'h-[780px]'}`}>
        
        {/* LEFT COLUMN: Notion AI Chat Window */}
        <div
          className={`md:col-span-5 flex flex-col glass-card rounded-2xl border-slate-700/80 overflow-hidden shadow-2xl ${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Notion AI Chat Header */}
          <div className="p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">AI PRD Architect</h4>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md font-semibold border border-purple-500/30">
                    Notion Pro
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Mermaid Diagrams Enabled</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => addChatMessage('ai', 'Silakan ketik instruksi atau revisi fitur untuk PRD Anda.')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset Chat History"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-950/60">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-7 h-7 rounded-xl bg-purple-600/25 text-cyan-300 flex items-center justify-center shrink-0 border border-purple-500/40 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="max-w-[88%] space-y-2">
                    <div
                      className={`p-4 rounded-2xl text-slate-200 leading-relaxed shadow-sm ${
                        isAi
                          ? 'bg-slate-900/90 border border-slate-800 rounded-tl-none space-y-2'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md font-medium'
                      }`}
                    >
                      {isAi ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={NotionComponents}>
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>

                    {isAi && (
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 pl-1">
                        <button
                          onClick={() => handleSendMessage('Terapkan rekomendasi ini ke PRD')}
                          className="flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <CornerDownRight className="w-3 h-3 text-cyan-400" />
                          <span>Terapkan ke PRD</span>
                        </button>
                        <span>•</span>
                        <span className="font-mono text-[9px]">{msg.timestamp}</span>
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/40 shadow-sm">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {isAiTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-xl bg-purple-600/25 text-cyan-300 flex items-center justify-center shrink-0 border border-purple-500/40">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none text-slate-400 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300">
                    Menyusun diagram Mermaid & PRD...
                  </span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggest Chips */}
          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Pintasan:</span>
            </span>
            <button
              onClick={() => handleSendMessage('Tambahkan modul Better Auth + JWT Token')}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 shrink-0 transition-colors font-medium cursor-pointer"
            >
              + Auth & Security
            </button>
            <button
              onClick={() => handleSendMessage('Tambahkan integrasi Payment Gateway Midtrans')}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 shrink-0 transition-colors font-medium cursor-pointer"
            >
              + Payment Gateway
            </button>
            <button
              onClick={() => handleSendMessage('Sederhanakan scope ke versi MVP saja')}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 shrink-0 transition-colors font-medium cursor-pointer"
            >
              ⚡ Fast MVP
            </button>
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-slate-900/95 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ketik masukan revisi fitur atau tambah modul..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isAiTyping}
                className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  !inputMessage.trim() || isAiTyping ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-lg'
                }`}
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Notion Workspace Document Editor View */}
        <div
          className={`md:col-span-7 flex flex-col glass-card rounded-2xl border-slate-700/80 overflow-hidden shadow-2xl ${
            mobileTab === 'chat' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Notion Header Bar */}
          <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">Workspace /</span>
              <span className="text-white font-bold">PRD Document</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                🟢 Live Notion Format
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                title="Copy Markdown"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadMd}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/20 text-cyan-300 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .md</span>
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block cursor-pointer"
                title="Fullscreen Toggle"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Notion Document Body Container */}
          <div ref={previewScrollRef} className="flex-1 overflow-y-auto bg-[#0a0e1a] text-slate-200">
            {/* Notion Cover Gradient Banner */}
            <div className="h-28 bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-900 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute bottom-2 right-4 text-[10px] text-slate-400/80 font-mono" suppressHydrationWarning>
                Notion Doc ID: prd-{Date.now().toString().slice(-6)}
              </div>
            </div>

            {/* Document Header Metadata Section */}
            <div className="px-6 sm:px-10 -mt-8 relative mb-6 space-y-4">
              {/* Document Floating Icon */}
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-xl flex items-center justify-center text-3xl">
                🚀
              </div>

              {/* Title & Metadata Grid */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {questionnaire.appCategory || 'Aplikasi SaaS & CRM Enterprise'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Dokumen spesifikasi teknis lengkap dengan diagram alur logika Mermaid & breakdown biaya transparan.
                </p>
              </div>

              {/* Notion Properties Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase tracking-wider">Author</span>
                  <span className="font-semibold text-slate-200">DevPulse AI Architect</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase tracking-wider">Status</span>
                  <span className="font-semibold text-emerald-400">🟢 v1.0.0-PROD</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase tracking-wider">Estimasi Jam</span>
                  <span className="font-semibold text-cyan-300">{estimatedHours} Jam Kerja</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase tracking-wider">Hourly Rate</span>
                  <span className="font-semibold text-amber-300">{formatRupiah(hourlyRate)}/jam</span>
                </div>
              </div>
            </div>

            {/* Rendered Markdown Viewer with Mermaid Renderer */}
            <div className="px-6 sm:px-10 pb-12 text-xs leading-relaxed space-y-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={NotionComponents}>
                {prdMarkdown}
              </ReactMarkdown>
            </div>
          </div>

          {/* Action Footer Bar */}
          <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px]">Total Estimasi Biaya Project:</span>
              <span className="text-lg font-extrabold text-cyan-400">{formatRupiah(totalCost)}</span>
            </div>

            <button
              onClick={onOpenSubmission}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 glow-button cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Setujui PRD & Submit Kontak</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
