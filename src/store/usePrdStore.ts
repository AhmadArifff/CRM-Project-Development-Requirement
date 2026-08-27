import { create } from 'zustand';
import { generateProfessionalPrd } from '@/lib/prdGenerator';

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
  buildPrdFromQuestionnaire: () => void;

  // Client Submission
  submission: SubmissionData;
  setSubmissionField: (field: keyof SubmissionData, value: string) => void;

  // Reset Flow
  resetAll: () => void;
}

const initialQuestionnaire: QuestionnaireData = {
  appCategory: 'Aplikasi CRM & Konsultasi AI Scoping',
  targetAudience: 'Pengembang, Konsultan Digital, & Pemilik Bisnis',
  keyFeatures: 'AI PRD Scoping Otomatis, DevPulse Live Canvas Visual CMS, Deals Pipeline, Kanban Board',
  userScale: '10.000 - 50.000 Pengguna Aktif Bulanan',
  referenceApp: 'DevPulse Studio Pro Suite (CRM + Kanban Workspace + AI PRD)',
  budgetRange: 'Rp 30.000.000 - Rp 60.000.000',
  timeline: '4 - 6 Minggu',
};

const initialGenerated = generateProfessionalPrd(initialQuestionnaire);

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
      text: 'Halo! Saya AI PRD Consultant dari DevPulse Studio Pro. Saya siap membantu merancang dokumen PRD lengkap dengan arsitektur & diagram alur Mermaid untuk aplikasi impian Anda. Mari mulai dari kebutuhan fitur utama!',
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

  prdMarkdown: initialGenerated.markdown,
  setPrdMarkdown: (markdown) => set({ prdMarkdown: markdown }),
  estimatedHours: initialGenerated.estimatedHours,
  setEstimatedHours: (hours) => set({ estimatedHours: hours }),

  buildPrdFromQuestionnaire: () => {
    const q = get().questionnaire;
    const generated = generateProfessionalPrd(q);
    set({
      prdMarkdown: generated.markdown,
      estimatedHours: generated.estimatedHours,
      submission: {
        ...get().submission,
        appTitle: q.appCategory || 'Proyek Aplikasi Digital',
      },
    });
  },

  submission: {
    appTitle: 'Aplikasi CRM & Konsultasi AI Scoping',
    companyName: '',
    contactPhone: '',
    email: '',
  },
  setSubmissionField: (field, value) =>
    set((state) => ({
      submission: { ...state.submission, [field]: value },
    })),

  resetAll: () => {
    const resetPrd = generateProfessionalPrd(initialQuestionnaire);
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
      prdMarkdown: resetPrd.markdown,
      estimatedHours: resetPrd.estimatedHours,
      submission: {
        appTitle: 'Aplikasi CRM & Konsultasi AI Scoping',
        companyName: '',
        contactPhone: '',
        email: '',
      },
    });
  },
}));
