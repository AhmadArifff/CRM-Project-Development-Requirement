import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface TestimonialCMSItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  category: 'E-Commerce' | 'SaaS Web App' | 'Mobile App' | 'CRM Platform';
  rating: number;
  quote: string;
  metrics: string;
  date: string;
}

export interface LandingContentState {
  hero: {
    badgeText: string;
    badgeIcon: string;
    headlineLine1: string;
    headlineHighlight: string;
    headlineLine2: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    card1Title: string;
    card1Sub: string;
    card2Title: string;
    card2Sub: string;
    card3Title: string;
    card3Sub: string;
    card4Title: string;
    card4Sub: string;
  };
  consulting: {
    badgeText: string;
    sectionTitle: string;
    sectionSubhead: string;
    mobileWebCardTitle: string;
    mobileWebCardDesc: string;
    serverCardTitle: string;
    serverCardDesc: string;
  };
  rateCalculator: {
    badgeText: string;
    sectionTitle: string;
    sectionSubhead: string;
    guarantee1: string;
    guarantee2: string;
    ctaText: string;
    hourlyRateNotice: string;
  };
  process: {
    badgeText: string;
    sectionTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  testimonials: {
    badgeText: string;
    sectionTitle: string;
    sectionSubhead: string;
    items: TestimonialCMSItem[];
  };
  footer: {
    tagline: string;
    email: string;
    whatsapp: string;
    address: string;
    copyright: string;
    contactEmail?: string;
    contactPhone?: string;
    copyrightText?: string;
  };

  // Actions
  updateHero: (data: Partial<LandingContentState['hero']>) => void;
  updateConsulting: (data: Partial<LandingContentState['consulting']>) => void;
  updateRateCalculator: (data: Partial<LandingContentState['rateCalculator']>) => void;
  updateProcess: (data: Partial<LandingContentState['process']>) => void;
  updateTestimonialsHeader: (data: Partial<Omit<LandingContentState['testimonials'], 'items'>>) => void;
  updateFooter: (data: Partial<LandingContentState['footer']>) => void;
  
  // Testimonial CRUD
  addTestimonial: (item: Omit<TestimonialCMSItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialCMSItem>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Aliases for page compat
  addTestimonialItem: (item: Omit<TestimonialCMSItem, 'id'>) => void;
  updateTestimonialItem: (id: string, item: Partial<TestimonialCMSItem>) => void;
  removeTestimonialItem: (id: string) => void;
  
  // Supabase Live Sync
  fetchContentFromSupabase: () => Promise<void>;
  saveSectionToSupabase: (sectionKey: string, payload: any) => Promise<void>;
  resetToDefault: () => void;
}

const initialDefaultState = {
  hero: {
    badgeText: 'Konsultasi Development & AI PRD Builder #1',
    badgeIcon: 'Zap',
    headlineLine1: 'Rancang Requirement & Buat',
    headlineHighlight: 'PRD.md Otomatis',
    headlineLine2: 'dalam Hitungan Menit',
    subtitle: 'Analisis perilaku pengguna aplikasi Anda (Mobile, Web, Cross-Platform), kalkulasi opsi server cloud vs dedicated, dan dapatkan estimasi rate harga transparan serta dokumen PRD lengkap dalam hitungan menit.',
    primaryCtaText: '✨ Buat PRD Otomatis Sekarang',
    secondaryCtaText: 'Mulai Konsultasi Kebutuhan',
    card1Title: 'Analisis Behavior',
    card1Sub: 'Mobile, Web, PWA',
    card2Title: 'Opsi Server Cloud',
    card2Sub: 'Dedicated vs Sharing',
    card3Title: 'PRD.md Notion-Style',
    card3Sub: 'Otomatis dalam 10 Menit',
    card4Title: 'Estimasi Biaya Transparan',
    card4Sub: 'Berdasarkan Jam Kerja Riil',
  },
  consulting: {
    badgeText: 'Konsultasi Perilaku & Infrastruktur Platform',
    sectionTitle: 'Analisis Perilaku Pengguna & Kebutuhan Server Aplikasi Anda',
    sectionSubhead: 'Tim DevPulse Studio menganalisis karakteristik aplikasi Anda untuk menentukan platform frontend yang tepat serta arsitektur server yang paling efisien.',
    mobileWebCardTitle: 'Platform Perilaku Pengguna (Mobile Native vs PWA Web App)',
    mobileWebCardDesc: 'Kami mengevaluasi apakah pengguna Anda membutuhkan performa tinggi & sensor hardware (iOS/Android Native), akses instan tanpa install (PWA), atau kombinasi keduanya.',
    serverCardTitle: 'Arsitektur Infrastruktur Server (Cloud VPS vs Dedicated Server)',
    serverCardDesc: 'Kami membandingkan estimasi biaya bulanan, kapasitas auto-scaling, dan fleksibilitas antara AWS/GCP Managed Cloud vs Bare-Metal Dedicated Server.',
  },
  rateCalculator: {
    badgeText: 'Kalkulator Estimasi Biaya Transparan',
    sectionTitle: 'Hitung Estimasi Investasi Proyek Aplikasi Anda',
    sectionSubhead: 'Transparansi 100%. Biaya proyek Anda dihitung murni berdasarkan perkiraan jam kerja riil dikalikan rate hourly yang fleksibel.',
    guarantee1: 'Tanpa Biaya Tersembunyi',
    guarantee2: 'Dokumen PRD.md Rinci',
    ctaText: '✨ Rancang PRD & Dapatkan Estimasi Biaya',
    hourlyRateNotice: 'Standard consultancy rate: Rp 250.000 / jam (bisa disesuaikan di Admin Panel).',
  },
  process: {
    badgeText: 'Alur PRD Steps',
    sectionTitle: '4 Langkah Mudah Memulai Proyek',
    step1Title: '1. Isi Kuisioner Kebutuhan',
    step1Desc: 'Jawab pertanyaan seputar ide aplikasi, target platform, dan ekspektasi skala pengguna.',
    step2Title: '2. Analisis AI & Refinement',
    step2Desc: 'AI Engine menganalisis requirement, memberikan opsi tech stack & arsitektur server.',
    step3Title: '3. Pratinjau Dokumen PRD.md',
    step3Desc: 'Dapatkan dokumen PRD lengkap gaya Notion beserta estimasi jam kerja & total biaya.',
    step4Title: '4. Konsultasi & Deal Proyek',
    step4Desc: 'Tim konsultan kami akan menghubungi Anda untuk diskusi teknis dan kickoff proyek.',
  },
  testimonials: {
    badgeText: 'Testimoni Klien Terverifikasi',
    sectionTitle: 'Dipercaya oleh 48+ Founder Startup & Enterprise',
    sectionSubhead: 'Lihat bagaimana DevPulse Studio membantu merancang spesifikasi requirement dan membangun aplikasi berkualitas tinggi.',
    items: [
      {
        id: 't-1',
        author: 'Rian Prasetya',
        role: 'CEO & Founder',
        company: 'NusaCart E-Commerce',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        category: 'E-Commerce' as const,
        rating: 5,
        quote: 'DevPulse Studio membantu kami menentukan arsitektur server AWS Dedicated vs Cloud VPS. Dokumen PRD.md yang dihasilkan sangat detail dan hemat waktu 2 minggu!',
        metrics: '99.9% Server Uptime • MVP Launch 4 Minggu',
        date: '12 Juli 2026',
      },
      {
        id: 't-2',
        author: 'Siti Rahmawati',
        role: 'Head of Product',
        company: 'FleetLogis Mobile App',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        category: 'Mobile App' as const,
        rating: 5,
        quote: 'Proses AI PRD Builder benar-benar transparan. Rincian jam kerja per fitur dipaparkan jelas sehingga tidak ada pembengkakan budget di tengah jalan.',
        metrics: 'Hemat Budget 35% • Flutter Cross-Platform',
        date: '28 Juni 2026',
      },
    ],
  },
  footer: {
    tagline: 'Platform Konsultasi Aplikasi Digital & AI PRD Engine #1 di Indonesia.',
    email: 'consult@devpulsestudio.dev',
    whatsapp: '+62 812-3456-7890',
    address: 'Jakarta, Indonesia (Remote / Hybrid Consultancy)',
    copyright: '© 2026 DevPulse Studio. Developed by Ahmad Arif.',
    contactEmail: 'consult@devpulsestudio.dev',
    contactPhone: '+62 812-3456-7890',
    copyrightText: '© 2026 DevPulse Studio. Developed by Ahmad Arif.',
  },
};

export const useLandingContentStore = create<LandingContentState>((set, get) => ({
  ...initialDefaultState,

  updateHero: (data) => {
    set((state) => {
      const updated = { ...state.hero, ...data };
      get().saveSectionToSupabase('HERO', updated);
      return { hero: updated };
    });
  },

  updateConsulting: (data) => {
    set((state) => {
      const updated = { ...state.consulting, ...data };
      get().saveSectionToSupabase('CONSULTING', updated);
      return { consulting: updated };
    });
  },

  updateRateCalculator: (data) => {
    set((state) => {
      const updated = { ...state.rateCalculator, ...data };
      get().saveSectionToSupabase('CALCULATOR', updated);
      return { rateCalculator: updated };
    });
  },

  updateProcess: (data) => {
    set((state) => {
      const updated = { ...state.process, ...data };
      get().saveSectionToSupabase('PROCESS', updated);
      return { process: updated };
    });
  },

  updateTestimonialsHeader: (data) => {
    set((state) => {
      const updatedHeader = {
        badgeText: data.badgeText ?? state.testimonials.badgeText,
        sectionTitle: data.sectionTitle ?? state.testimonials.sectionTitle,
        sectionSubhead: data.sectionSubhead ?? state.testimonials.sectionSubhead,
        items: state.testimonials.items,
      };
      get().saveSectionToSupabase('TESTIMONIALS_HEADER', updatedHeader);
      return { testimonials: updatedHeader };
    });
  },

  updateFooter: (data) => {
    set((state) => {
      const updated = {
        ...state.footer,
        ...data,
        contactEmail: data.contactEmail || data.email || state.footer.email,
        contactPhone: data.contactPhone || data.whatsapp || state.footer.whatsapp,
        copyrightText: data.copyrightText || data.copyright || state.footer.copyright,
      };
      get().saveSectionToSupabase('FOOTER', updated);
      return { footer: updated };
    });
  },

  addTestimonial: (item) => {
    const newItem: TestimonialCMSItem = {
      ...item,
      id: `testi-${Date.now()}`,
    };
    set((state) => {
      const updatedItems = [newItem, ...state.testimonials.items];
      const updatedTestimonials = { ...state.testimonials, items: updatedItems };
      get().saveSectionToSupabase('TESTIMONIALS', updatedItems);
      return { testimonials: updatedTestimonials };
    });
  },

  updateTestimonial: (id, itemData) => {
    set((state) => {
      const updatedItems = state.testimonials.items.map((it) =>
        it.id === id ? { ...it, ...itemData } : it
      );
      const updatedTestimonials = { ...state.testimonials, items: updatedItems };
      get().saveSectionToSupabase('TESTIMONIALS', updatedItems);
      return { testimonials: updatedTestimonials };
    });
  },

  deleteTestimonial: (id) => {
    set((state) => {
      const updatedItems = state.testimonials.items.filter((it) => it.id !== id);
      const updatedTestimonials = { ...state.testimonials, items: updatedItems };
      get().saveSectionToSupabase('TESTIMONIALS', updatedItems);
      return { testimonials: updatedTestimonials };
    });
  },

  addTestimonialItem: (item) => get().addTestimonial(item),
  updateTestimonialItem: (id, item) => get().updateTestimonial(id, item),
  removeTestimonialItem: (id) => get().deleteTestimonial(id),

  saveSectionToSupabase: async (sectionKey: string, payload: any) => {
    try {
      if (!supabase) return;
      await supabase
        .from('LandingContent')
        .upsert(
          {
            sectionKey,
            contentJson: payload,
            updatedAt: new Date().toISOString(),
          },
          { onConflict: 'sectionKey' }
        );
    } catch (err) {
      console.warn('Supabase save error:', err);
    }
  },

  fetchContentFromSupabase: async () => {
    try {
      if (!supabase) return;
      const { data, error } = await supabase.from('LandingContent').select('*');
      if (error || !data || data.length === 0) return;

      const newHero = data.find((d: any) => d.sectionKey === 'HERO')?.contentJson;
      const newConsulting = data.find((d: any) => d.sectionKey === 'CONSULTING')?.contentJson;
      const newCalculator = data.find((d: any) => d.sectionKey === 'CALCULATOR')?.contentJson;
      const newProcess = data.find((d: any) => d.sectionKey === 'PROCESS')?.contentJson;
      const newTestimonials = data.find((d: any) => d.sectionKey === 'TESTIMONIALS')?.contentJson;
      const newFooter = data.find((d: any) => d.sectionKey === 'FOOTER')?.contentJson;

      set((state) => ({
        hero: newHero ? { ...state.hero, ...newHero } : state.hero,
        consulting: newConsulting ? { ...state.consulting, ...newConsulting } : state.consulting,
        rateCalculator: newCalculator ? { ...state.rateCalculator, ...newCalculator } : state.rateCalculator,
        process: newProcess ? { ...state.process, ...newProcess } : state.process,
        testimonials: newTestimonials
          ? { ...state.testimonials, items: newTestimonials }
          : state.testimonials,
        footer: newFooter ? { ...state.footer, ...newFooter } : state.footer,
      }));
    } catch (err) {
      console.warn('Supabase fetch error:', err);
    }
  },

  resetToDefault: () => set(initialDefaultState),
}));
