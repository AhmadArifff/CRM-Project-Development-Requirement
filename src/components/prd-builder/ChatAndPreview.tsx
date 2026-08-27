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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Applied shortcuts tracking to prevent double-clicks & duplicates
  const [appliedShortcuts, setAppliedShortcuts] = useState<string[]>(() => {
    const initial: string[] = [];
    if (prdMarkdown.includes('Better Auth') || prdMarkdown.includes('Modul Keamanan')) initial.push('auth');
    if (prdMarkdown.includes('Midtrans') || prdMarkdown.includes('Payment Gateway')) initial.push('payment');
    if (prdMarkdown.includes('WebSockets') || prdMarkdown.includes('Real-Time Communication')) initial.push('websockets');
    if (prdMarkdown.includes('Fast-Track MVP')) initial.push('mvp');
    return initial;
  });

  // Typewriter Streaming State
  const [displayPrdMarkdown, setDisplayPrdMarkdown] = useState(prdMarkdown);
  const [isPrdStreaming, setIsPrdStreaming] = useState(false);
  const [streamStatusText, setStreamStatusText] = useState<string>('');
  
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const targetFullPrdRef = useRef<string>(prdMarkdown);

  // Sync display with store on mount or when not streaming
  useEffect(() => {
    if (!isPrdStreaming) {
      setDisplayPrdMarkdown(prdMarkdown);
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

    // Chunk size and speed for smooth organic typing
    const chunkSize = 14; 
    const intervalMs = 20;

    streamingTimerRef.current = setInterval(() => {
      currentIndex = Math.min(currentIndex + chunkSize, fullText.length);
      setDisplayPrdMarkdown(fullText.slice(0, currentIndex));

      // Auto scroll right preview pane following typewriter
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
      const summaryText = `💡 **DevPulse AI Architect Analysis**

Saya telah menganalisis kebutuhan aplikasi dan menyusun dokumen PRD lengkap berstandar **DevPulse Studio Pro** dengan **Diagram Arsitektur Multi-Tier & Flowchart Mermaid** di panel kanan:
- **Kategori Aplikasi:** \`${questionnaire.appCategory}\`
- **Target Pengguna:** \`${questionnaire.targetAudience}\`
- **Fitur Terpilih:** \`${questionnaire.keyFeatures}\`
- **Skala Sistem:** \`${questionnaire.userScale}\`
- **Estimasi Total:** \`${estimatedHours} Jam Kerja (${timelineFormat(estimatedHours)})\`

> Anda dapat mengetik instruksi penambahan modul, revisi alur, atau fitur spesifik di chat ini. Dokumen PRD.md di panel kanan akan otomatis diperbarui dengan **animasi live typewriter**!`;
      addChatMessage('ai', summaryText);
    }
  }, [questionnaire]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isAiTyping || isPrdStreaming) return;

    addChatMessage('user', text);
    if (!textToSend) setInputMessage('');
    setIsAiTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let hoursAdd = 0;
      let prdAppend = '';
      const lower = text.toLowerCase();

      const isAuth = lower.includes('auth') || lower.includes('login') || lower.includes('security');
      const isPayment = lower.includes('payment') || lower.includes('bayar') || lower.includes('midtrans') || lower.includes('xendit');
      const isRealtime = lower.includes('realtime') || lower.includes('chat') || lower.includes('notifikasi') || lower.includes('websocket');
      const isMvp = lower.includes('mvp') || lower.includes('sederhana') || lower.includes('fast');

      // 1. Auth & Security Check
      if (isAuth) {
        if (prdMarkdown.includes('Modul Keamanan & Better Auth Guard') || appliedShortcuts.includes('auth')) {
          aiReply = `🔒 **Modul Keamanan & Auth Sudah Terpasang**

Modul otentikasi enterprise **Better Auth + JWT Token Rotation & Session Fingerprinting** sudah aktif di dalam dokumen **PRD.md** (Bagian 5.3). Tidak perlu diduplikasi.`;
          addChatMessage('ai', aiReply);
          setIsAiTyping(false);
          return;
        }

        setAppliedShortcuts((prev) => Array.from(new Set([...prev, 'auth'])));
        aiReply = `🔒 **Modul Keamanan & Auth Berhasil Ditambahkan ke PRD**

- **Teknologi Ditambahkan:** \`Better Auth + JWT Token Rotation & Session Fingerprinting\`
- **Fitur Keamanan:** Rate Limiting Express, CSRF Guard, HttpOnly Cookie, & RLS Supabase Policies.
- **Diagram Disertakan:** Alur Otentikasi & Refresh Token Sequence.
- **Estimasi Tambahan:** +15 Jam Kerja.

> Modul telah di-inject ke dokumen **PRD.md** dengan simulasi pengetikan AI.`;
        hoursAdd = 15;
        prdAppend = `\n\n### 5.3 Modul Keamanan & Better Auth Guard
Modul otentikasi enterprise dengan proteksi anti-tampering dan token rotation:

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as User / Web Client
    participant API as Express API Server
    participant Auth as Better Auth Guard
    participant DB as Supabase PostgreSQL

    Client->>API: POST /api/v1/auth/login (Kredensial)
    API->>Auth: Validasi Password (Bcrypt Hash)
    Auth->>DB: Query User & Role RBAC
    DB-->>Auth: User Record Valid
    Auth->>API: Generate Access Token (15m) + Refresh Token (7d)
    API-->>Client: Set HttpOnly Cookie & Return User Profile
\`\`\`

**Kriteria Penerimaan (Security Acceptance Criteria):**
- [ ] **Given** kredensial login valid, **When** pengguna login, **Then** server menerbitkan JWT terenkripsi dengan masa berlaku 15 menit dan HttpOnly cookie.
- [ ] **Given** token kadaluarsa, **When** request endpoint berikutnya masuk, **Then** middleware otomatis melakukan refresh token tanpa logout paksa.
`;
      } 
      // 2. Payment Gateway Check
      else if (isPayment) {
        if (prdMarkdown.includes('Modul Payment Gateway & Invoicing Otomatis') || appliedShortcuts.includes('payment')) {
          aiReply = `💳 **Modul Payment Gateway Sudah Terpasang**

Integrasi **Midtrans / Xendit Payment Gateway & Auto Invoicing** sudah aktif di dalam dokumen **PRD.md** (Bagian 5.4). Tidak perlu diduplikasi.`;
          addChatMessage('ai', aiReply);
          setIsAiTyping(false);
          return;
        }

        setAppliedShortcuts((prev) => Array.from(new Set([...prev, 'payment'])));
        aiReply = `💳 **Integrasi Payment Gateway & Auto Invoicing Ditambahkan**

- **Gateway Terpilih:** \`Midtrans / Xendit Integration\`
- **Metode Pembayaran:** QRIS, Virtual Account (BCA, Mandiri, BRI, BNI), & Kartu Kredit.
- **Fitur Otomatis:** Webhook Callback Auto-Verification & Auto Invoice Generator.
- **Estimasi Tambahan:** +20 Jam Kerja.

> Dokumen **PRD.md** di sebelah kanan telah diperbarui dengan diagram alur pembayaran online.`;
        hoursAdd = 20;
        prdAppend = `\n\n### 5.4 Modul Payment Gateway & Invoicing Otomatis
Sistem pembayaran online instan dengan verifikasi webhook otomatis:

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as Klien Pembeli
    participant Frontend as Web PWA Client
    participant Server as Express Backend
    participant Gateway as Midtrans / Xendit Gateway

    Client->>Frontend: Klik Bayar Invoice / Deposit Proyek
    Frontend->>Server: POST /api/v1/payments/create-transaction
    Server->>Gateway: Request Snap Payment Token
    Gateway-->>Server: Kembalikan Snap Token & Redirect URL
    Server-->>Frontend: Buka Modal Pembayaran (QRIS / VA)
    Client->>Gateway: Selesaikan Pembayaran
    Gateway->>Server: Webhook POST /api/v1/payments/webhook
    Server->>Server: Verifikasi Signature Key & Update Status 'PAID'
    Server-->>Frontend: Realtime Broadcast Event 'Payment Confirmed'
\`\`\`

**Spesifikasi Teknis Payment:**
- **Signature Security:** SHA-512 Hash Checksum verification pada setiap webhook callback.
- **Reconciliation:** Cron job otomatis setiap 1 jam untuk memeriksa transaksi pending.
`;
      } 
      // 3. Real-Time WebSockets Check
      else if (isRealtime) {
        if (prdMarkdown.includes('Modul Real-Time Communication & WebSockets') || appliedShortcuts.includes('websockets')) {
          aiReply = `⚡ **Modul Real-Time WebSockets Sudah Terpasang**

Sistem **Real-Time Communication & WebSockets** sudah aktif di dalam dokumen **PRD.md** (Bagian 5.5).`;
          addChatMessage('ai', aiReply);
          setIsAiTyping(false);
          return;
        }

        setAppliedShortcuts((prev) => Array.from(new Set([...prev, 'websockets'])));
        aiReply = `⚡ **Modul Real-Time Communication & WebSockets Ditambahkan**

- **Teknologi:** \`WebSockets / Server-Sent Events (SSE) Engine\`
- **Fitur:** Real-time push notification, live team activity feed, dan instant sync deals board.
- **Estimasi Tambahan:** +15 Jam Kerja.

> Dokumen PRD telah dilengkapi arsitektur real-time data streaming.`;
        hoursAdd = 15;
        prdAppend = `\n\n### 5.5 Modul Real-Time Communication & WebSockets
Arsitektur broadcast event instan untuk sinkronisasi aktivitas tim secara live:

\`\`\`mermaid
flowchart LR
    subgraph Client ["🖥️ Web Client"]
        WS_Client["WebSocket Client Listener"]
    end
    subgraph Backend ["⚙️ Realtime Dispatcher"]
        Server["Express WebSocket Server"]
        PubSub["Event Bus / Redis PubSub"]
    end
    subgraph Storage ["🗄️ Database"]
        DB[("Supabase Realtime")]
    end

    Client -- "Subscribe Event" --> Server
    Server --> PubSub
    PubSub --> DB
    DB -- "Trigger Notification" --> Server
    Server -- "Push Update" --> WS_Client
\`\`\`
`;
      } 
      // 4. Fast MVP Scope Optimization Check
      else if (isMvp) {
        if (prdMarkdown.includes('Fast-Track MVP Edition') || appliedShortcuts.includes('mvp')) {
          aiReply = `⚡ **Scope Sudah Berstatus Fast-Track MVP**

Scope proyek sudah dioptimasi ke standar peluncuran cepat 100 Jam Kerja.`;
          addChatMessage('ai', aiReply);
          setIsAiTyping(false);
          return;
        }

        setAppliedShortcuts((prev) => Array.from(new Set([...prev, 'mvp'])));
        aiReply = `⚡ **Scope Proyek Disederhanakan ke Fast-Track MVP**

- **Fokus Utama:** Fitur Inti (Auth Security, AI PRD Engine, Kanban Workspace).
- **Optimasi Biaya:** Estimasi total durasi dipangkas menjadi **100 Jam Kerja**.
- **Target Rilis:** 2 - 3 Minggu.

> Dokumen PRD telah disesuaikan ke versi Fast-Track MVP.`;
        setEstimatedHours(100);
        prdAppend = `\n\n> ⚡ **Pembaruan Scope: Fast-Track MVP Edition**
> - **Fokus Utama:** Peluncuran cepat fitur inti dengan estimasi waktu dipadatkan menjadi **100 Jam Kerja**.
> - **Total Investasi Disesuaikan:** Rp 25.000.000 (100 Jam × Rp 250.000/jam).
`;
      } 
      // 5. Custom User Prompts (with Deduplication and Dynamic Sub-section numbering)
      else {
        const cleanSnippet = text.trim().slice(0, 30);
        if (prdMarkdown.toLowerCase().includes(cleanSnippet.toLowerCase())) {
          aiReply = `📝 **Permintaan Teknis Sudah Tercatat**

Spesifikasi mengenai \`${text}\` sudah tercatat di dalam dokumen **PRD.md**. Tidak perlu penambahan ganda.`;
          addChatMessage('ai', aiReply);
          setIsAiTyping(false);
          return;
        }

        // Calculate dynamic sub-section number (e.g. 5.6, 5.7, ...)
        const existingSections = (prdMarkdown.match(/### 5\.\d+/g) || []).length;
        const nextSubSec = `5.${Math.max(6, existingSections + 1)}`;

        aiReply = `📝 **Fitur Khusus Berhasil Ditambahkan ke PRD (Bagian ${nextSubSec})**

Permintaan: \`${text}\` telah dianalisis dan diformulasikan menjadi spesifikasi teknis lengkap dalam dokumen **PRD.md**.

- **Status Integrasi:** 🟢 **Approved & Synced to DevPulse Studio Pro**
- **Estimasi Tambahan:** +15 Jam Kerja.

> Simak simulasi pengetikan AI pada panel dokumen di sebelah kanan!`;
        hoursAdd = 15;
        prdAppend = `\n\n### ${nextSubSec} Modul Kustom: ${text}
Modul spesifikasi teknis tambahan sesuai kebutuhan bisnis klien:

\`\`\`mermaid
flowchart TD
    Req["Permintaan Klien: ${text}"] --> Process["Pemrosesan Logic & Controller"]
    Process --> Val["Validasi Input & Security Guard"]
    Val --> DB[("Penyimpanan Supabase DB")]
    DB --> Out["Output Realtime & Konfirmasi"]
\`\`\`

**Kriteria Penerimaan (Acceptance Criteria):**
- [ ] **Given** pengguna menjalankan fungsi '${text}', **When** sistem memproses data, **Then** hasil tersimpan aman dan memberikan feedback instan.
- [ ] **Given** terjadi kegagalan koneksi, **When** API menerima error, **Then** sistem menampilkan pesan kesalahan user-friendly.
`;
      }

      addChatMessage('ai', aiReply);
      if (hoursAdd > 0) setEstimatedHours(estimatedHours + hoursAdd);

      setIsAiTyping(false);

      // Start Progressive Typewriter Streaming in PRD Pane
      const previousLength = prdMarkdown.length;
      const updatedFullPrd = `${prdMarkdown}${prdAppend}`;
      startTypewriterPrd(updatedFullPrd, previousLength, `AI sedang mengetik pembaruan modul "${text.slice(0, 30)}..."`);
    }, 850);
  };

  const handleResetChat = () => {
    addChatMessage('ai', 'Riwayat chat telah di-reset. Anda dapat mengetik instruksi atau memilih modul baru.');
    setAppliedShortcuts([]);
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
          {/* DevPulse AI Chat Header */}
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
                    DevPulse Studio Pro
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Mermaid Diagrams Enabled</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset Chat & Pintasan"
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={DevPulseMarkdownComponents}>
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
                          disabled={isPrdStreaming || isAiTyping}
                          className="flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer disabled:opacity-50"
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
                    Menyusun diagram Mermaid & modul PRD...
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
                  onClick={() => handleSendMessage(sc.prompt)}
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
                placeholder="Ketik masukan revisi fitur atau modul yang ingin ditambahkan..."
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
