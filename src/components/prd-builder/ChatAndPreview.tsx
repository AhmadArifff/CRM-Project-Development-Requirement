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
  Printer,
  List,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// OpenRouter Free Models (Active & Verified)
const OPENROUTER_MODELS = [
  { id: 'minimax/minimax-m3:free', name: 'MiniMax M3 (Free - 1M Context)', provider: 'MiniMax' },
  { id: 'poolside/laguna-s-2.1:free', name: 'Poolside Laguna S-2.1 (Free)', provider: 'Poolside' },
  { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', name: 'NVIDIA Nemotron 3 Ultra (Free)', provider: 'NVIDIA' },
  { id: 'google/gemma-4-31b-it:free', name: 'Google Gemma 4 31B (Free)', provider: 'Google' },
  { id: 'z-ai/glm-5.2:free', name: 'Z.ai GLM 5.2 (Free)', provider: 'Z.ai' },
  { id: 'openrouter/free', name: 'Auto Best Free Router (Free)', provider: 'OpenRouter' },
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
  h2: ({ children }: any) => {
    const textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : String(children || '');
    const match = textContent.match(/^(\d+)\./);
    const secId = match ? `section-${match[1]}` : `sec-${textContent.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    return (
      <div id={secId} className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-l-4 border-cyan-400 border border-slate-800/80 px-4 py-2.5 my-6 rounded-r-xl shadow-md scroll-mt-6 print-break-inside-avoid">
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
    );
  },
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
  actionType: 'ADD' | 'REMOVE';
  title: string;
  prdAppend?: string;
  hours: number;
}

export const ChatAndPreview: React.FC<{ onOpenSubmission: () => void }> = ({ onOpenSubmission }) => {
  const {
    chatMessages,
    addChatMessage,
    addChatMessageWithId,
    updateChatMessage,
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
  const [isTocOpen, setIsTocOpen] = useState(false);

  // TOC standard sections
  const TOC_SECTIONS = [
    { id: 'section-1', title: '1. Ringkasan' },
    { id: 'section-2', title: '2. Arsitektur' },
    { id: 'section-3', title: '3. User Journey' },
    { id: 'section-4', title: '4. Database' },
    { id: 'section-5', title: '5. User Stories' },
    { id: 'section-6', title: '6. Tech Stack' },
    { id: 'section-7', title: '7. Biaya' },
    { id: 'section-8', title: '8. Standar NFR' },
  ];

  const scrollToSection = (secId: string) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // OpenRouter Model Selector State
  const [selectedModel, setSelectedModel] = useState<string>('minimax/minimax-m3:free');
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

> Anda dapat mengetik instruksi penambahan modul, meminta penghapusan modul, berdiskusi mengenai arsitektur, atau memilih pintasan fitur di bawah. Dokumen PRD.md di panel kanan hanya akan diperbarui saat Anda menyetujuinya!`;
      addChatMessage('ai', summaryText);
    }
  }, [questionnaire]);

  // Intelligent Section 5 Inserter & PRD Structure Normalizer
  const insertFeatureIntoPrd = (
    currentPrd: string,
    moduleName: string,
    hoursDelta: number,
    rate: number,
    currentTotalHours: number,
    rawCustomContent?: string
  ): { updatedPrd: string; subSecTitle: string } => {
    let prd = currentPrd;

    // 1. Calculate dynamic 5.x numbering
    const matches = prd.match(/###\s+5\.(\d+)/g) || [];
    let maxSubNum = 2;
    for (const m of matches) {
      const num = parseInt(m.replace(/###\s+5\./, ''), 10);
      if (!isNaN(num) && num > maxSubNum) maxSubNum = num;
    }
    const nextSubNum = maxSubNum + 1;
    const subSecTitle = `5.${nextSubNum} User Story & Spesifikasi: ${moduleName}`;

    let snippet = '';

    if (rawCustomContent && rawCustomContent.trim().length > 60) {
      // Clean and normalize rich AI markdown to fit nicely into Section 5.x
      let cleanContent = rawCustomContent
        // Remove markdown title if it starts with #
        .replace(/^#\s+[^\n]+\n/i, '')
        .replace(/^##\s+[^\n]+\n/i, '')
        // Downgrade sub-headings to ####
        .replace(/^###\s+/gm, '#### ')
        .replace(/^##\s+/gm, '#### ')
        .trim();

      snippet = `\n\n### ${subSecTitle}\n\n${cleanContent}\n`;
    } else {
      // Fallback: Structured User Story + Mermaid Flow
      snippet = `\n\n### ${subSecTitle}
- **As a** Pengguna / Admin,
- **I want to** menggunakan modul ${moduleName},
- **So that** alur transaksi dan operasional aplikasi menjadi terotomatisasi, transparan, dan terukur.

**Kriteria Penerimaan (Acceptance Criteria):**
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
`;
    }

    // 3. Insert cleanly right before Section 6 (so Section 5 stays strictly sequential)
    const sec6Regex = /(\n*---\n*##\s+6\.)/i;
    const sec7Regex = /(\n*---\n*##\s+7\.)/i;

    if (sec6Regex.test(prd)) {
      prd = prd.replace(sec6Regex, `${snippet}\n\n--- \n\n## 6.`);
    } else if (sec7Regex.test(prd)) {
      prd = prd.replace(sec7Regex, `${snippet}\n\n--- \n\n## 7.`);
    } else {
      prd = `${prd}${snippet}`;
    }

    // 4. Update Section 7 Sprint Table & Total Formula if present
    const newTotalHours = currentTotalHours + hoursDelta;
    const newTotalCost = newTotalHours * rate;

    // Update total hours in table row
    prd = prd.replace(
      /\|\s*\*\*TOTAL\*\*\s*\|\s*\*\*Total Estimasi Jam Kerja\*\*\s*\|\s*[^|]+\|\s*\*\*\d+\s*Jam\*\*\s*\|/gi,
      `| **TOTAL** | **Total Estimasi Jam Kerja** | **Garansi Rate 100% Transparan** | **${newTotalHours} Jam** |`
    );

    // Update cost formula
    const formattedCost = new Intl.NumberFormat('id-ID').format(newTotalCost);
    prd = prd.replace(
      /\$\$\\text\{Total Biaya\}\s*=\s*\d+\\text\{\s*Jam\}\s*\\times\s*\\text\{Rp\s*\}\s*[\d.]+\s*=\s*\\mathbf\{\\text\{Rp\s*\}[\d.]+\}\$\$/gi,
      `$$\\text{Total Biaya} = ${newTotalHours}\\text{ Jam} \\times \\text{Rp } ${new Intl.NumberFormat('id-ID').format(rate)} = \\mathbf{\\text{Rp } ${formattedCost}}$$`
    );

    return { updatedPrd: prd, subSecTitle };
  };

  // Execute PRD Module Mutation upon User Confirmation
  const handleApplyProposalToPrd = (msgId: string) => {
    const prop = messageProposals[msgId];
    if (!prop || isPrdStreaming) return;

    if (prop.actionType === 'REMOVE') {
      let updated = prdMarkdown;
      const cleanTarget = prop.title.replace(/^["'\s]+|["'\s]+$/g, '');
      let sectionRemoved = false;

      // 1. Check if it starts with a section number like "8." or "5.3"
      const numMatch = cleanTarget.match(/^(\d+(\.\d+)?)/);
      if (numMatch) {
        const secNum = numMatch[1].replace('.', '\\.');
        const numRegex = new RegExp(`(\\n*---)?\\n*##+\\s+${secNum}[^\\n]*[\\s\\S]*?(?=\\n*---?\\n*##+|$)`, 'i');
        if (numRegex.test(updated)) {
          updated = updated.replace(numRegex, '');
          sectionRemoved = true;
        }
      }

      // 2. Try matching exact title in heading
      if (!sectionRemoved) {
        const escaped = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const titleRegex = new RegExp(`(\\n*---)?\\n*##+[^\\n]*${escaped}[\\s\\S]*?(?=\\n*---?\\n*##+|$)`, 'i');
        if (titleRegex.test(updated)) {
          updated = updated.replace(titleRegex, '');
          sectionRemoved = true;
        }
      }

      // 3. Fallback: Split by sections and filter out matching heading
      if (!sectionRemoved) {
        const keywords = cleanTarget.split(/[\s,.-]+/).filter((w) => w.length > 3);
        const sections = updated.split(/(?=\n\n##+)/g);
        const filteredSections = sections.filter((sec) => {
          const headingLine = (sec.split('\n')[0] || '').toLowerCase();
          return !keywords.some((kw) => headingLine.includes(kw.toLowerCase()));
        });

        if (filteredSections.length < sections.length) {
          updated = filteredSections.join('');
          sectionRemoved = true;
        }
      }

      // 4. Line level fallback
      if (!sectionRemoved) {
        const lines = updated.split('\n');
        const filteredLines = lines.filter((line) => !line.toLowerCase().includes(cleanTarget.toLowerCase()));
        updated = filteredLines.join('\n');
      }

      const newHours = Math.max(40, estimatedHours - 15);
      setEstimatedHours(newHours);
      setPrdMarkdown(updated);
      setDisplayPrdMarkdown(updated);
      setAppliedShortcuts(checkModulesInPrd(updated));
      playSuccessChime();

      setMessageProposals((prev) => {
        const copy = { ...prev };
        delete copy[msgId];
        return copy;
      });

      addChatMessage(
        'ai',
        `🗑️ **Section / Modul "${prop.title}" Berhasil Dihapus dari Dokumen PRD.md!**\n\nPenyesuaian jadwal: \`-15 Jam Kerja\`. Dokumen panel kanan dan kalkulasi biaya telah diperbarui secara otomatis.`
      );
      return;
    }

    // Standard ADD Action with Structured Insertion
    const { updatedPrd, subSecTitle } = insertFeatureIntoPrd(
      prdMarkdown,
      prop.title,
      prop.hours,
      hourlyRate,
      estimatedHours,
      prop.prdAppend
    );
    const newHours = estimatedHours + prop.hours;
    const previousLength = prdMarkdown.length;
    setEstimatedHours(newHours);

    startTypewriterPrd(updatedPrd, previousLength, `AI sedang menyusun modul "${subSecTitle}"...`);

    // Remove proposal after application
    setMessageProposals((prev) => {
      const copy = { ...prev };
      delete copy[msgId];
      return copy;
    });

    addChatMessage(
      'ai',
      `✅ **Modul "${subSecTitle}" Berhasil Disusun & Disisipkan ke Section 5 PRD.md!**\n\nPenambahan durasi: \`+${prop.hours} Jam Kerja\`. Dokumen live di panel kanan dan nomor urut poin telah disinkronkan secara rapi.`
    );
  };

  // Dismiss Proposal
  const handleDismissProposal = (msgId: string) => {
    setMessageProposals((prev) => {
      const copy = { ...prev };
      delete copy[msgId];
      return copy;
    });
  };

  const handleSendMessage = async (textToSend?: string, isShortcutClick?: boolean) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isAiTyping || isPrdStreaming) return;

    addChatMessage('user', text);
    if (!textToSend) setInputMessage('');
    setIsAiTyping(true);

    const tempAiMsgId = `ai-msg-${Date.now()}`;
    // Add empty placeholder message for live streaming
    addChatMessageWithId(tempAiMsgId, 'ai', '');

    // Check if user input is an explicit removal command (Client-Side Safety Guarantee)
    const cleanUserInput = text.trim();
    const lowerUserInput = cleanUserInput.toLowerCase();
    const isExplicitRemoveCommand =
      (lowerUserInput.includes('remove') ||
        lowerUserInput.includes('hapus') ||
        lowerUserInput.includes('hilangkan') ||
        lowerUserInput.includes('delete') ||
        lowerUserInput.includes('buang') ||
        lowerUserInput.includes('pangkas')) &&
      !lowerUserInput.startsWith('apakah') &&
      !cleanUserInput.includes('?');

    let clientInferredRemoveTitle = '';
    if (isExplicitRemoveCommand) {
      const quoteMatch = cleanUserInput.match(/["'“]([^"'”]+)["'”]/);
      if (quoteMatch) {
        clientInferredRemoveTitle = quoteMatch[1].trim();
      } else {
        clientInferredRemoveTitle = cleanUserInput
          .replace(/^(saya ingin|tolong|mohon)?\s*(remove|hapus|hilangkan|delete|buang|pangkas)\s*(content point|modul|fitur|section|bagian)?\s*/gi, '')
          .replace(/["'!]/g, '')
          .trim();
      }
    }

    // Check if user input is an explicit addition command
    const isExplicitAddCommand =
      (lowerUserInput.includes('tambah') ||
        lowerUserInput.includes('buatkan') ||
        lowerUserInput.includes('add') ||
        lowerUserInput.includes('integrasi') ||
        lowerUserInput.includes('integrasikan')) &&
      !lowerUserInput.startsWith('apakah') &&
      !cleanUserInput.includes('?');

    let clientInferredAddTitle = '';
    if (isExplicitAddCommand) {
      const quoteMatch = cleanUserInput.match(/["'“]([^"'”]+)["'”]/);
      if (quoteMatch) {
        clientInferredAddTitle = quoteMatch[1].trim();
      } else {
        clientInferredAddTitle = cleanUserInput
          .replace(/^(saya ingin|tolong|mohon)?\s*(tambahkan|tambah|buatkan|buat|add|integrasikan|integrasi)\s*(modul|fitur|section|bagian)?\s*/gi, '')
          .replace(/["'!]/g, '')
          .trim();
        if (!clientInferredAddTitle) clientInferredAddTitle = 'Modul Ekstensi Baru';
      }
    }

    try {
      // 1. Call real OpenRouter AI Chat streaming endpoint
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

      if (!response.ok || !response.body) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullAccumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullAccumulatedText += chunk;

        // Clean out action marker from display during streaming
        const cleanDisplayText = fullAccumulatedText
          .replace(/<<<ACTION:(ADD|REMOVE):[^>]+>>>/g, '')
          .trimStart();

        // Update the AI message in real time
        updateChatMessage(tempAiMsgId, cleanDisplayText);
      }

      setIsAiTyping(false);

      // 2. Check if the final AI response has an action marker OR user requested addition/removal
      const addMatch = fullAccumulatedText.match(/<<<ACTION:ADD:([^>]+)>>>/);
      const removeMatch = fullAccumulatedText.match(/<<<ACTION:REMOVE:([^>]+)>>>/);

      if (removeMatch || isExplicitRemoveCommand) {
        const targetTitle = (removeMatch ? removeMatch[1] : clientInferredRemoveTitle).trim();
        setMessageProposals((prev) => ({
          ...prev,
          [tempAiMsgId]: {
            actionType: 'REMOVE',
            title: targetTitle,
            hours: -15,
          },
        }));
      } else if (addMatch || isExplicitAddCommand) {
        const moduleName = (addMatch ? addMatch[1] : clientInferredAddTitle).trim();

        // Extract rich AI content (strip conversational intro greetings & footer text)
        let richAiContent = fullAccumulatedText
          .replace(/<<<ACTION:(ADD|REMOVE):[^>]+>>>/g, '')
          .replace(/^(\s*Baik[^\n]*\n|\s*Tentu[^\n]*\n|\s*Permintaan Anda[^\n]*\n|\s*Berikut rancangan[^\n]*\n)+/i, '')
          .replace(/(\n\s*Memperbarui dokumen[^\n]*|\n\s*✨\s*Section[^\n]*|\n\s*Penambahan jadwal[^\n]*|\n\s*Silakan beri instruksi[^\n]*|\n\s*Bagaimana keputusan Anda[^\n]*)+$/i, '')
          .trim();

        // Extract hours if present in response text (e.g. 24 Jam or 15 Jam)
        const hoursMatch = fullAccumulatedText.match(/Total\s*(?:Estimasi)?\s*[:|]?\s*(\d+)\s*Jam/i) ||
                           fullAccumulatedText.match(/\+(\d+)\s*Jam\s*Kerja/i);
        const extractedHours = hoursMatch ? parseInt(hoursMatch[1], 10) : 15;

        setMessageProposals((prev) => ({
          ...prev,
          [tempAiMsgId]: {
            actionType: 'ADD',
            title: moduleName,
            prdAppend: richAiContent,
            hours: extractedHours > 0 ? extractedHours : 15,
          },
        }));
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setIsAiTyping(false);
      updateChatMessage(tempAiMsgId, `⚠️ Maaf, terjadi kesalahan koneksi AI: ${err.message}. Silakan coba lagi.`);
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
          className={`md:col-span-5 flex flex-col glass-card rounded-2xl border-slate-700/80 overflow-hidden shadow-2xl print-hide ${
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

                    {/* Interactive Proposal Confirmation Pop-up Card */}
                    {isAi && proposal && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`p-3.5 rounded-2xl space-y-3 shadow-2xl backdrop-blur-md border-2 ${
                          proposal.actionType === 'REMOVE'
                            ? 'bg-gradient-to-br from-slate-900 via-rose-950/70 to-slate-950 border-rose-500/60 shadow-rose-500/10'
                            : 'bg-gradient-to-br from-slate-900 via-indigo-950/80 to-purple-950/90 border-cyan-500/50 shadow-cyan-500/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-extrabold text-xs flex items-center gap-1.5">
                            {proposal.actionType === 'REMOVE' ? (
                              <>
                                <span className="text-rose-400">🗑️</span>
                                <span className="text-rose-200">Konfirmasi Penghapusan Modul PRD</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                                <span>Konfirmasi Perancangan Modul PRD</span>
                              </>
                            )}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${
                              proposal.actionType === 'REMOVE'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            }`}
                          >
                            {proposal.actionType === 'REMOVE'
                              ? '-15 Jam Kerja'
                              : `+${proposal.hours} Jam (~${formatRupiah(proposal.hours * hourlyRate)})`}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-200">
                          <div
                            className={`font-bold mb-1 ${
                              proposal.actionType === 'REMOVE' ? 'text-rose-400' : 'text-cyan-300'
                            }`}
                          >
                            {proposal.actionType === 'REMOVE' ? '🗑️ Hapus: ' : '⚡ '}
                            {proposal.title}
                          </div>
                          <p className="text-slate-400 text-[10px] leading-relaxed">
                            {proposal.actionType === 'REMOVE'
                              ? 'Modul ini beserta User Story, Acceptance Criteria, dan Diagram alurnya akan dihapus dari dokumen PRD.md di panel kanan.'
                              : 'Spesifikasi siap di-inject ke dokumen live: mencakup Problem Statement, User Stories Gherkin, Kriteria Penerimaan, dan Diagram Alur Data Flow Mermaid.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleApplyProposalToPrd(msg.id)}
                            disabled={isPrdStreaming}
                            className={`flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                              proposal.actionType === 'REMOVE'
                                ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:shadow-rose-500/30'
                                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:shadow-cyan-500/30'
                            }`}
                          >
                            {proposal.actionType === 'REMOVE' ? (
                              <span>🗑️ Konfirmasi Hapus dari PRD.md</span>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                <span>✨ Terapkan & Inject ke PRD.md</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDismissProposal(msg.id)}
                            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                          >
                            Batalkan
                          </button>
                        </div>
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
          <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between print-hide">
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

            <div className="flex items-center gap-1.5 sm:gap-2">
              {isPrdStreaming && (
                <button
                  type="button"
                  onClick={handleSkipStreaming}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Lewati animasi ketikan"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lewati</span>
                </button>
              )}

              {/* TOC Toggle Button */}
              <button
                type="button"
                onClick={() => setIsTocOpen(!isTocOpen)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isTocOpen
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title="Daftar Isi PRD (Quick Jump)"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Daftar Isi</span>
              </button>

              {/* Print / PDF Export Button */}
              <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors cursor-pointer"
                title="Cetak atau Simpan sebagai PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF</span>
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                title="Copy Markdown"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadMd}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/20 text-cyan-300 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export .md</span>
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

          {/* Quick-Jump Table of Contents Bar */}
          <AnimatePresence>
            {isTocOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 py-2.5 bg-slate-950/90 border-b border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto text-[11px] print-hide"
              >
                <span className="text-slate-500 shrink-0 font-medium flex items-center gap-1 mr-1">
                  <List className="w-3 h-3 text-cyan-400" />
                  <span>Lompat ke:</span>
                </span>
                {TOC_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950/60 hover:text-cyan-300 hover:border-cyan-500/40 text-slate-300 border border-slate-800 shrink-0 transition-all font-medium cursor-pointer"
                  >
                    {sec.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Streaming Live Alert Banner */}
          <AnimatePresence>
            {isPrdStreaming && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-950 via-cyan-950 to-indigo-950 border-b border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between print-hide"
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
          <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print-hide">
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
