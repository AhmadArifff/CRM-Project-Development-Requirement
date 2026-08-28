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
  FastForward,
  Activity,
  CheckCircle2,
  Lock,
  Cpu,
  PlusCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// OpenRouter Free Models
const OPENROUTER_MODELS = [
  { id: 'poolside/laguna-s-2.1:free', name: 'Poolside Laguna S-2.1 (Free)', provider: 'Poolside' },
  { id: 'minimax/minimax-m3:free', name: 'MiniMax M3 (Free)', provider: 'MiniMax' },
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash (Free)', provider: 'Google' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Free)', provider: 'Meta' },
  { id: 'deepseek/deepseek-chat:free', name: 'DeepSeek Chat (Free)', provider: 'DeepSeek' },
  { id: 'qwen/qwen-2.5-coder-32b-instruct:free', name: 'Qwen 2.5 Coder (Free)', provider: 'Alibaba' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)', provider: 'Mistral' },
];

// DevPulse Studio Pro Custom Markdown Components
const DevPulseMarkdownComponents = {
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

interface ShortcutItem {
  id: 'auth' | 'payment' | 'websockets' | 'mvp';
  label: string;
  appliedLabel: string;
  prompt: string;
}

const SHORTCUT_ITEMS: ShortcutItem[] = [
  {
    id: 'auth',
    label: '+ Auth & Security',
    appliedLabel: '✓ Auth Terpasang',
    prompt: 'Tambahkan modul Better Auth + JWT Token',
  },
  {
    id: 'payment',
    label: '+ Payment Gateway',
    appliedLabel: '✓ Payment Terpasang',
    prompt: 'Tambahkan integrasi Payment Gateway Midtrans',
  },
  {
    id: 'websockets',
    label: '+ WebSockets',
    appliedLabel: '✓ WebSockets Terpasang',
    prompt: 'Tambahkan sistem Realtime Chat & WebSockets',
  },
  {
    id: 'mvp',
    label: '⚡ Fast MVP',
    appliedLabel: '✓ Fast MVP Aktif',
    prompt: 'Sederhanakan scope ke versi MVP saja',
  },
];

interface ProposalData {
  title: string;
  prdAppend: string;
  hours: number;
}

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

  // OpenRouter Model Selector State
  const [selectedModel, setSelectedModel] = useState<string>('poolside/laguna-s-2.1:free');
  const [messageProposals, setMessageProposals] = useState<Record<string, ProposalData>>({});

  // Dynamic helper to check if a module is currently present in PRD markdown
  const checkModulesInPrd = (markdown: string): string[] => {
    const detected: string[] = [];
    if (!markdown) return detected;
    if (markdown.includes('### 5.3 Modul Keamanan & Better Auth Guard') || markdown.includes('Modul Keamanan & Better Auth Guard')) {
      detected.push('auth');
    }
    if (markdown.includes('### 5.4 Modul Payment Gateway & Invoicing Otomatis') || markdown.includes('Modul Payment Gateway & Invoicing Otomatis')) {
      detected.push('payment');
    }
    if (markdown.includes('### 5.5 Modul Real-Time Communication & WebSockets') || markdown.includes('Modul Real-Time Communication & WebSockets')) {
      detected.push('websockets');
    }
    if (markdown.includes('Pembaruan Scope: Fast-Track MVP Edition')) {
      detected.push('mvp');
    }
    return detected;
  };

  // Applied shortcuts tracking to prevent double-clicks & duplicates
  const [appliedShortcuts, setAppliedShortcuts] = useState<string[]>(() => checkModulesInPrd(prdMarkdown));

  // Typewriter Streaming State
  const [displayPrdMarkdown, setDisplayPrdMarkdown] = useState(prdMarkdown);
  const [isPrdStreaming, setIsPrdStreaming] = useState(false);
  const [streamStatusText, setStreamStatusText] = useState<string>('');
  
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const targetFullPrdRef = useRef<string>(prdMarkdown);

  // Sync display & reactive shortcuts with store whenever prdMarkdown changes (from wizard regenerate or reset)
  useEffect(() => {
    if (!isPrdStreaming) {
      setDisplayPrdMarkdown(prdMarkdown);
      setAppliedShortcuts(checkModulesInPrd(prdMarkdown));
    }
  }, [prdMarkdown, isPrdStreaming]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) {
        clearInterval(streamingTimerRef.current);
      }
    };
  }, []);

  const playSuccessChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      // Ignore audio failure
    }
  };

  // Progressive Typewriter Streaming Engine
  const startTypewriterPrd = (fullText: string, startIndex: number, statusMsg: string) => {
    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current);
    }

    targetFullPrdRef.current = fullText;
    setIsPrdStreaming(true);
    setStreamStatusText(statusMsg);

    let currentIndex = startIndex;
    setDisplayPrdMarkdown(fullText.slice(0, currentIndex));

    const chunkSize = 14; 
    const intervalMs = 20;

    streamingTimerRef.current = setInterval(() => {
      currentIndex = Math.min(currentIndex + chunkSize, fullText.length);
      setDisplayPrdMarkdown(fullText.slice(0, currentIndex));

      if (previewScrollRef.current) {
        previewScrollRef.current.scrollTop = previewScrollRef.current.scrollHeight;
      }

      if (currentIndex >= fullText.length) {
        if (streamingTimerRef.current) {
          clearInterval(streamingTimerRef.current);
          streamingTimerRef.current = null;
        }
        setIsPrdStreaming(false);
        setPrdMarkdown(fullText);
        playSuccessChime();
      }
    }, intervalMs);
  };

  const handleSkipStreaming = () => {
    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current);
      streamingTimerRef.current = null;
    }
    setDisplayPrdMarkdown(targetFullPrdRef.current);
    setPrdMarkdown(targetFullPrdRef.current);
    setIsPrdStreaming(false);
    playSuccessChime();
  };

  const timelineFormat = (hrs: number) => `${hrs} Jam (~${Math.ceil(hrs / 40)} Minggu)`;

  // Initial welcome analysis
  useEffect(() => {
    if (chatMessages.length === 1 && questionnaire.appCategory) {
      const summaryText = `💡 **DevPulse AI Product Manager (/pm) Analysis**

Saya telah menganalisis kebutuhan aplikasi dan menyusun dokumen PRD lengkap berstandar **DevPulse Studio Pro** dengan **Diagram Arsitektur Multi-Tier & Flowchart Mermaid** di panel kanan:
- **Kategori Aplikasi:** \`${questionnaire.appCategory}\`
- **Target Pengguna:** \`${questionnaire.targetAudience}\`
- **Fitur Terpilih:** \`${questionnaire.keyFeatures}\`
- **Skala Sistem:** \`${questionnaire.userScale}\`
- **Estimasi Total:** \`${estimatedHours} Jam Kerja (${timelineFormat(estimatedHours)})\`

> Anda dapat mengetik instruksi penambahan modul, berdiskusi mengenai arsitektur, atau memilih pintasan fitur di bawah. Dokumen PRD.md di panel kanan hanya akan diperbarui saat Anda menyetujuinya!`;
      addChatMessage('ai', summaryText);
    }
  }, [questionnaire]);

  // Execute PRD Module Injection upon User Confirmation
  const handleApplyProposalToPrd = (msgId: string) => {
    const prop = messageProposals[msgId];
    if (!prop || isPrdStreaming) return;

    const previousLength = prdMarkdown.length;
    const updatedFullPrd = `${prdMarkdown}${prop.prdAppend}`;
    setEstimatedHours(estimatedHours + prop.hours);

    startTypewriterPrd(updatedFullPrd, previousLength, `AI sedang mengetik modul "${prop.title}"...`);

    // Remove proposal after application
    setMessageProposals((prev) => {
      const copy = { ...prev };
      delete copy[msgId];
      return copy;
    });

    addChatMessage('ai', `✅ **Spesifikasi Modul "${prop.title}" Berhasil Diterapkan ke PRD.md!**\n\nPenambahan durasi: \`+${prop.hours} Jam Kerja\`. Dokumen live di panel kanan telah diperbarui.`);
  };

  const handleSendMessage = async (textToSend?: string, isShortcutClick?: boolean) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isAiTyping || isPrdStreaming) return;

    addChatMessage('user', text);
    if (!textToSend) setInputMessage('');
    setIsAiTyping(true);

    try {
      // 1. Call real OpenRouter AI Chat endpoint
      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, { sender: 'user', text }],
          model: selectedModel,
          hourlyRate,
          currentPrd: prdMarkdown,
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || 'Maaf, terjadi kendala saat memproses jawaban AI.';
      const newMsgId = `msg-${Date.now()}`;

      addChatMessage('ai', aiReply);
      setIsAiTyping(false);

      // 2. If PRD Action is proposed (e.g. shortcut clicked or feature requested)
      if (data.isPrdActionProposed) {
        const lower = text.toLowerCase();
        const existingSections = (prdMarkdown.match(/### 5\.\d+/g) || []).length;
        const nextSubSec = `5.${Math.max(6, existingSections + 1)}`;
        const moduleName = data.proposedModuleTitle || text;

        const prdSnippet = `\n\n### ${nextSubSec} Modul Spesifikasi: ${moduleName}

> **Problem Statement & Business Context:**
> Pengguna memerlukan modul \`${moduleName}\` guna meningkatkan efisiensi operasional dan kapabilitas aplikasi.

#### User Story:
**As a** Pengguna / Admin,  
**I want to** menggunakan modul ${moduleName},  
**So that** alur kerja bisnis menjadi terotomatisasi, transparan, dan terukur.

#### Kriteria Penerimaan (Acceptance Criteria):
- [ ] **Given** pengguna mengakses modul '${moduleName}', **When** aksi atau data diinputkan, **Then** sistem melakukan validasi & memproses data secara real-time.
- [ ] **Given** data berhasil diproses, **When** transaksi selesai, **Then** database memperbarui state & memberikan notifikasi feedback visual.
- [ ] **Given** terjadi kegagalan server, **When** API mengembalikan HTTP error, **Then** sistem menampilkan pesan kesalahan user-friendly tanpa crash.

#### Rekomendasi Arsitektur Teknikal & Data Flow:

\`\`\`mermaid
flowchart TD
    subgraph Client ["🖥️ Frontend Layer"]
        UI["User Interface (${moduleName})"]
    end

    subgraph Server ["⚙️ Backend API Controller"]
        API["Next.js Route Handler / API Server"]
        Val["Validation & Auth Security Guard"]
    end

    subgraph Storage ["🗄️ Database & Event Layer"]
        DB[("Supabase PostgreSQL DB")]
        Event["Realtime Dispatcher"]
    end

    UI -- "1. Request Action" --> API
    API --> Val
    Val -- "2. Query Data" --> DB
    DB -- "3. Persist Record" --> Event
    Event -- "4. Push Response" --> UI
\`\`\`

**Work Breakdown & Cost Estimate:**
- **Estimasi Durasi:** +15 Jam Kerja
- **Investasi Tambahan:** Rp ${new Intl.NumberFormat('id-ID').format(15 * hourlyRate)} (15 Jam × Rp ${new Intl.NumberFormat('id-ID').format(hourlyRate)}/jam)
`;

        if (isShortcutClick) {
          // Direct shortcut click: Apply directly
          const previousLength = prdMarkdown.length;
          const updatedFullPrd = `${prdMarkdown}${prdSnippet}`;
          setEstimatedHours(estimatedHours + 15);
          startTypewriterPrd(updatedFullPrd, previousLength, `AI sedang mengetik modul "${moduleName}"...`);
        } else {
          // Chat prompt: Store proposal and require User Confirmation
          setMessageProposals((prev) => ({
            ...prev,
            [newMsgId]: {
              title: moduleName,
              prdAppend: prdSnippet,
              hours: 15,
            },
          }));
        }
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      addChatMessage('ai', `⚠️ Maaf, terjadi kesalahan koneksi AI: ${err.message}. Silakan coba lagi.`);
      setIsAiTyping(false);
    }
  };

  const handleResetChat = () => {
    addChatMessage('ai', 'Riwayat chat telah di-reset. Anda dapat mengetik instruksi atau memilih modul baru.');
    setAppliedShortcuts([]);
    setMessageProposals({});
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
          <span>DevPulse AI Chat</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
            mobileTab === 'preview' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Live PRD Document</span>
          {isPrdStreaming && (
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          )}
        </button>
      </div>

      {/* Main Dual Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${isFullscreen ? 'h-[calc(100vh-2rem)]' : 'h-[780px]'}`}>
        
        {/* LEFT COLUMN: DevPulse AI Chat Window */}
        <div
          className={`md:col-span-5 flex flex-col glass-card rounded-2xl border-slate-700/80 overflow-hidden shadow-2xl ${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* DevPulse AI Chat Header with OpenRouter Model Selector */}
          <div className="p-3.5 bg-slate-900/95 border-b border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white tracking-tight">AI PRD Architect</h4>
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-semibold border border-purple-500/30">
                      TPM (/pm)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>OpenRouter AI Engine Active</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset Chat & Pintasan"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Model Selector Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px]">
              <div className="flex items-center gap-1 text-slate-400 pl-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span className="font-semibold text-[10px] text-slate-300">Model:</span>
              </div>

              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isAiTyping || isPrdStreaming}
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-cyan-300 text-[11px] font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {OPENROUTER_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <span className="text-[9px] bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-500/20 shrink-0">
                100% Free
              </span>
            </div>
          </div>

          {/* Chat Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-950/60">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';
              const proposal = messageProposals[msg.id];

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
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={DevPulseMarkdownComponents}>
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>

                    {/* Interactive Proposal Confirmation Button */}
                    {isAi && proposal && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border border-purple-500/40 rounded-xl space-y-2 shadow-lg"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-purple-200 font-bold flex items-center gap-1.5">
                            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Terapkan Modul ke PRD.md?</span>
                          </span>
                          <span className="text-[10px] text-cyan-300 font-mono">+{proposal.hours} Jam Kerja</span>
                        </div>
                        <p className="text-[10px] text-slate-300">
                          Spesifikasi untuk modul <strong className="text-white font-semibold">{proposal.title}</strong> siap di-inject ke dokumen panel kanan.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleApplyProposalToPrd(msg.id)}
                          disabled={isPrdStreaming}
                          className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-[11px] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>✨ Konfirmasi & Terapkan ke PRD.md</span>
                        </button>
                      </motion.div>
                    )}

                    {isAi && (
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 pl-1">
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
                    OpenRouter AI sedang memproses analisa TPM...
                  </span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggest Chips with Deduplication & Disabled State */}
          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Pintasan:</span>
            </span>

            {SHORTCUT_ITEMS.map((sc) => {
              const isApplied = appliedShortcuts.includes(sc.id);
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSendMessage(sc.prompt, true)}
                  disabled={isApplied || isPrdStreaming || isAiTyping}
                  className={`px-3 py-1.5 rounded-full shrink-0 transition-all text-[11px] font-semibold flex items-center gap-1.5 ${
                    isApplied
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 opacity-80 cursor-not-allowed shadow-inner'
                      : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 cursor-pointer disabled:opacity-50'
                  }`}
                  title={isApplied ? 'Pintasan ini sudah diterapkan ke PRD' : `Klik untuk menerapkan ${sc.label}`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{sc.appliedLabel}</span>
                    </>
                  ) : (
                    <span>{sc.label}</span>
                  )}
                </button>
              );
            })}
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
                placeholder="Ketik pesan atau instruksi revisi fitur (misal: 'Halo', 'Tambahkan payment gateway')..."
                value={inputMessage}
                disabled={isPrdStreaming || isAiTyping}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isAiTyping || isPrdStreaming}
                className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  !inputMessage.trim() || isAiTyping || isPrdStreaming
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105 active:scale-95 shadow-lg'
                }`}
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: DevPulse Workspace Document Editor View */}
        <div
          className={`md:col-span-7 flex flex-col glass-card rounded-2xl border-slate-700/80 overflow-hidden shadow-2xl relative ${
            mobileTab === 'chat' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* DevPulse Header Bar */}
          <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">Workspace /</span>
              <span className="text-white font-bold">PRD Document</span>
              
              {isPrdStreaming ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/40 animate-pulse shadow-sm">
                  <Activity className="w-3 h-3 text-cyan-400 animate-spin" />
                  <span>AI Typing Live...</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  🟢 Live DevPulse Doc
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isPrdStreaming && (
                <button
                  type="button"
                  onClick={handleSkipStreaming}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Lewati animasi ketikan"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Lewati Animasi</span>
                </button>
              )}

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

          {/* Streaming Live Alert Banner */}
          <AnimatePresence>
            {isPrdStreaming && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-950 via-cyan-950 to-indigo-950 border-b border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                  <span className="font-semibold text-[11px]">{streamStatusText || 'AI sedang memperbarui dokumen PRD...'}</span>
                </div>
                <span className="font-mono text-[10px] text-cyan-400 animate-pulse">Typing Stream Active ⚡</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DevPulse Document Body Container */}
          <div
            ref={previewScrollRef}
            className={`flex-1 overflow-y-auto bg-[#0a0e1a] text-slate-200 scroll-smooth ${
              isPrdStreaming ? 'ring-1 ring-cyan-500/40 shadow-inner' : ''
            }`}
          >
            {/* DevPulse Cover Gradient Banner */}
            <div className="h-28 bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-900 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute bottom-2 right-4 text-[10px] text-slate-400/80 font-mono" suppressHydrationWarning>
                DevPulse Doc ID: prd-{Date.now().toString().slice(-6)}
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

              {/* DevPulse Properties Grid */}
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

            {/* Rendered Markdown Viewer with Progressive Typewriter & Mermaid Renderer */}
            <div className="px-6 sm:px-10 pb-12 text-xs leading-relaxed space-y-4 relative">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={DevPulseMarkdownComponents}>
                {displayPrdMarkdown}
              </ReactMarkdown>

              {/* Streaming Blinking Cursor */}
              {isPrdStreaming && (
                <span className="inline-block w-2.5 h-4 bg-cyan-400 ml-1 rounded-xs animate-pulse align-middle shadow-md shadow-cyan-400/80" />
              )}
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
              disabled={isPrdStreaming}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 glow-button cursor-pointer min-h-[44px] disabled:opacity-50"
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
