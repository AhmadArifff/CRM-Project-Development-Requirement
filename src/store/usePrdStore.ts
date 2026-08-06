import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface QuestionnaireData {
  appCategory: string;
  targetAudience: string;
  keyFeatures: string;
  userScale: string;
  referenceApp: string;
  budgetRange: string;
  timeline: string;
}

export interface SubmissionData {
  appTitle: string;
  companyName: string;
  contactPhone: string;
  email: string;
}

interface PrdStore {
  // Rate Settings
  hourlyRate: number; // in IDR / hour
  setHourlyRate: (rate: number) => void;

  // CAPTCHA
  captchaVerified: boolean;
  setCaptchaVerified: (verified: boolean) => void;

  // Questionnaire
  questionnaire: QuestionnaireData;
  setQuestionnaireField: (field: keyof QuestionnaireData, value: string) => void;
  isQuestionnaireComplete: () => boolean;

  // AI Chat & PRD Generation
  chatMessages: ChatMessage[];
  addChatMessage: (sender: 'ai' | 'user', text: string) => void;
  isAiTyping: boolean;
  setIsAiTyping: (typing: boolean) => void;
  
  // PRD Document
  prdMarkdown: string;
  setPrdMarkdown: (markdown: string) => void;
  estimatedHours: number;
  setEstimatedHours: (hours: number) => void;

  // Client Submission
  submission: SubmissionData;
  setSubmissionField: (field: keyof SubmissionData, value: string) => void;

  // Reset Flow
  resetAll: () => void;
}

const initialQuestionnaire: QuestionnaireData = {
  appCategory: '',
  targetAudience: '',
  keyFeatures: '',
  userScale: '',
  referenceApp: '',
  budgetRange: '',
  timeline: '',
};

const initialPrdSample = `# PRD Draft: Aplikasi CRM & Konsultasi

## 1. Ringkasan Eksekutif
Aplikasi platform konsultasi berbasis web dan mobile yang memungkinkan klien membuat PRD otomatis dengan bantuan AI.

## 2. Fitur Utama
- **Landing Page & Consultation Analyzer**: Analisis kebutuhan platform & server
- **AI PRD Builder**: Chat bot interaktif dengan verifikasi CAPTCHA
- **Rate Calculator**: Estimasi biaya otomatis (Total Jam x Rate Per Jam)
- **Client Submission**: Upload PRD dan pendaftaran kontak klien

## 3. Infrastruktur & Server
- **Opsi Server**: Cloud (Supabase / Managed PostgreSQL)
- **Frontend**: Next.js + PWA + Tailwind CSS
- **Backend**: Express JS + Prisma ORM
- **Keamanan**: Better Auth + JWT Token & CAPTCHA Protection

## 4. Estimasi Waktu Development
- **Landing Page & AI Chat**: 40 Jam
- **CRM Admin Panel (Kanban & Tasks)**: 60 Jam
- **Backend API & DB Schema**: 40 Jam
- **Testing & Deployment**: 20 Jam
- **Total Estimasi**: 160 Jam
`;

export const usePrdStore = create<PrdStore>((set, get) => ({
  hourlyRate: 250000, // Rp 250.000 / jam
  setHourlyRate: (rate) => set({ hourlyRate: rate }),

  captchaVerified: false,
  setCaptchaVerified: (verified) => set({ captchaVerified: verified }),

  questionnaire: initialQuestionnaire,
  setQuestionnaireField: (field, value) =>
    set((state) => ({
      questionnaire: { ...state.questionnaire, [field]: value },
    })),
  isQuestionnaireComplete: () => {
    const q = get().questionnaire;
    return Boolean(q.appCategory && q.targetAudience && q.keyFeatures);
  },

  chatMessages: [
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Halo! Saya AI PRD Consultant. Saya siap membantu merancang dokumen PRD lengkap untuk aplikasi impian Anda. Mari mulai dari kebutuhan fitur utama!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ],
  addChatMessage: (sender, text) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        {
          id: `msg-${Date.now()}`,
          sender,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    })),
  isAiTyping: false,
  setIsAiTyping: (typing) => set({ isAiTyping: typing }),

  prdMarkdown: initialPrdSample,
  setPrdMarkdown: (markdown) => set({ prdMarkdown: markdown }),
  estimatedHours: 160,
  setEstimatedHours: (hours) => set({ estimatedHours: hours }),

  submission: {
    appTitle: '',
    companyName: '',
    contactPhone: '',
    email: '',
  },
  setSubmissionField: (field, value) =>
    set((state) => ({
      submission: { ...state.submission, [field]: value },
    })),

  resetAll: () =>
    set({
      captchaVerified: false,
      questionnaire: initialQuestionnaire,
      chatMessages: [
        {
          id: 'msg-1',
          sender: 'ai',
          text: 'Halo! Saya AI PRD Consultant. Saya siap membantu merancang dokumen PRD lengkap untuk aplikasi impian Anda.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
      prdMarkdown: initialPrdSample,
      estimatedHours: 160,
      submission: {
        appTitle: '',
        companyName: '',
        contactPhone: '',
        email: '',
      },
    }),
}));
