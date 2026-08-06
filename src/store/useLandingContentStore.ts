import { create } from 'zustand';

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
    ratingSummaryText: string;
    items: TestimonialCMSItem[];
  };
  footer: {
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    addressText: string;
    copyrightText: string;
  };

  // Actions
  updateHero: (data: Partial<LandingContentState['hero']>) => void;
  updateConsulting: (data: Partial<LandingContentState['consulting']>) => void;
  updateRateCalculator: (data: Partial<LandingContentState['rateCalculator']>) => void;
  updateProcess: (data: Partial<LandingContentState['process']>) => void;
  updateTestimonialsHeader: (data: Partial<Omit<LandingContentState['testimonials'], 'items'>>) => void;
  updateTestimonialItem: (id: string, data: Partial<TestimonialCMSItem>) => void;
  addTestimonialItem: (item: Omit<TestimonialCMSItem, 'id'>) => void;
  removeTestimonialItem: (id: string) => void;
  updateFooter: (data: Partial<LandingContentState['footer']>) => void;
  resetToDefault: () => void;
}

const defaultTestimonialsList: TestimonialCMSItem[] = [
  {
    id: 't-1',
    author: 'Budi Santoso',
    role: 'Chief Executive Officer',
    company: 'PT Retail Bangun Nusantara',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'E-Commerce',
    rating: 5,
    quote: 'Fitur AI PRD Builder dari DevPulse Studio luar biasa presisi! Dalam waktu 10 menit, spesifikasi teknis dan estimasi jam kerja aplikasi toko online kami langsung tersusun rapi. Tim konsultannya sangat solutif!',
    metrics: 'Estimasi Biaya Acc 100% Sesuai MVP',
    date: 'Agustus 2026',
  },
  {
    id: 't-2',
    author: 'Siti Rahmawati',
    role: 'Head of Product Operations',
    company: 'CV Logistik Maju Express',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'CRM Platform',
    rating: 5,
    quote: 'Sebelumnya kami kesulitan menghitung durasi pengerjaan platform internal CRM. Lewat konsultasi DevPulse Studio, arsitektur Supabase & Next.js di-breakdown dengan jelas dari hari pertama.',
    metrics: 'Rilis 2 Minggu Lebih Cepat',
    date: 'Juli 2026',
  },
  {
    id: 't-3',
    author: 'Hendra Gunawan',
    role: 'Chief Technology Officer',
    company: 'FinTech Digital Indonesia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'SaaS Web App',
    rating: 5,
    quote: 'Integrasi AI Assistant pada portal konsultasi ini sangat membantu tim kami menyelaraskan alur kerja B2B. Dokumen PRD yang dihasilkan langsung siap dieksekusi oleh tim developer.',
    metrics: 'Efisiensi Time-to-Market +40%',
    date: 'Juli 2026',
  },
  {
    id: 't-4',
    author: 'Dewi Lestari',
    role: 'Founder & Managing Director',
    company: 'Travelku Interactive',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Mobile App',
    rating: 5,
    quote: 'Kalkulator biaya transparan dan rekomendasi arsitektur mobile native vs Flutter dari DevPulse Studio sangat objektif. Sangat direkomendasikan untuk pendiri startup yang butuh kejelasan anggaran!',
    metrics: 'Budget MVP Terkendali',
    date: 'Juni 2026',
  },
];

const defaultLandingContent = {
  hero: {
    badgeText: 'Konsultasi Development & AI PRD Builder #1',
    badgeIcon: 'Zap',
    headlineLine1: 'Rancang Requirement & Buat',
    headlineHighlight: 'PRD.md Otomatis',
    headlineLine2: 'Sebelum Mulai Pengerjaan Proyek',
    subtitle: 'Analisis perilaku pengguna aplikasi Anda (Mobile, Web, Cross-Platform), kalkulasi opsi server cloud vs dedicated, dan dapatkan estimasi rate harga transparan serta dokumen PRD lengkap dalam hitungan menit.',
    primaryCtaText: '✨ Buat PRD Otomatis Sekarang',
    secondaryCtaText: 'Mulai Konsultasi Kebutuhan',
    card1Title: 'Analisis Behavior',
    card1Sub: 'Mobile, Web, PWA',
    card2Title: 'Opsi Server Cloud',
    card2Sub: 'Dedicated vs Sharing',
    card3Title: 'Notion AI Style',
    card3Sub: 'Draft PRD.md Live',
    card4Title: 'Rate Transparan',
    card4Sub: 'Hitung Jam Kerja',
  },
  consulting: {
    badgeText: 'Konsultasi Perilaku & Infrastruktur Platform',
    sectionTitle: 'Analisis Perilaku Pengguna & Kebutuhan Server',
    sectionSubhead: 'Sebelum masuk ke tahap deal harga dan development, kami membantu Anda menentukan jenis platform dan arsitektur server terbaik sesuai target pasar.',
    mobileWebCardTitle: 'Mobile Native vs Web App vs Cross Platform',
    mobileWebCardDesc: 'Analisis mendalam mengenai ekosistem pengguna aplikasi Anda. Apakah memerlukan akses offline native (iOS/Android), performa web PWA, atau fleksibilitas Flutter/React Native.',
    serverCardTitle: 'Server Dedicated Sharing vs Cloud Infrastructure',
    serverCardDesc: 'Rekomendasi spesifikasi server yang efisien. Pilih antara Cloud (Supabase, Firebase, Managed DB) untuk skalabilitas otomatis, atau Dedicated VPS untuk kontrol keamanan total.',
  },
  rateCalculator: {
    badgeText: 'Estimasi Biaya Pengerjaan Transparan',
    sectionTitle: 'Kalkulator Rate Biaya Development',
    sectionSubhead: 'Hitung estimasi total investasi proyek berdasarkan estimasi total jam kerja dikali rate per jam yang fleksibel.',
    guarantee1: 'Garansi tidak ada pembengkakan biaya tersembunyi',
    guarantee2: 'Payment milestone sesuai progress kanban board',
    ctaText: 'Mulai AI Scoping PRD',
    hourlyRateNotice: '* Estimasi akhir akan otomatis terintegrasi ke dalam PRD.md setelah menyelesaikan kuisioner & interaksi AI Consultant.',
  },
  process: {
    badgeText: 'Alur Kerja Otomatis berbasis AI',
    sectionTitle: '4 Langkah Mudah Menuju Deal Proyek',
    step1Title: 'Kuisioner Kebutuhan Non-Teknis',
    step1Desc: 'Jawab pertanyaan sederhana mengenai scope fitur, kategori aplikasi, target pengguna, dan preferensi server tanpa kebingungan istilah teknis.',
    step2Title: 'Interaksi & Scope Scoping AI',
    step2Desc: 'Diskusikan detail fitur aplikasi dengan AI Consultant kami yang siap membantu menyelaraskan alur bisnis & arsitektur proyek Anda.',
    step3Title: 'Review & Download PRD.md',
    step3Desc: 'Dapatkan preview dokumen PRD.md bergaya Notion dengan rincian fitur, arsitektur, tech stack, dan estimasi waktu development.',
    step4Title: 'Deal Rate & Kickoff Project',
    step4Desc: 'Setelah dokumen PRD sesuai, tim developer kami akan langsung memproses deal rate dan siap memulai pengerjaan aplikasi.',
  },
  testimonials: {
    badgeText: 'Testimoni Klien Terverifikasi & Case Studies',
    sectionTitle: 'Dipercaya oleh Founders & Product Leaders',
    sectionSubhead: 'Lihat pengalaman langsung para pendiri bisnis dan tim produk yang telah menggunakan portal konsultasi dan AI PRD Builder dari DevPulse Studio.',
    ratingSummaryText: '4.9 / 5.0 Rating dari 48+ Proyek Aplikasi Selesai',
    items: defaultTestimonialsList,
  },
  footer: {
    tagline: 'Agency Digital App Consultancy & AI-Powered PRD Engine terlengkap untuk merancang & membangun aplikasi Web, Mobile, dan SaaS custom.',
    contactEmail: 'consulting@devpulsestudio.dev',
    contactPhone: '+62 812-3456-7890',
    addressText: 'Jakarta Tech Tower Level 18, SCBD, Jakarta Selatan',
    copyrightText: '© 2026 DevPulse Studio. All rights reserved.',
  },
};

export const useLandingContentStore = create<LandingContentState>((set) => ({
  ...defaultLandingContent,

  updateHero: (data) => set((state) => ({ hero: { ...state.hero, ...data } })),
  updateConsulting: (data) => set((state) => ({ consulting: { ...state.consulting, ...data } })),
  updateRateCalculator: (data) => set((state) => ({ rateCalculator: { ...state.rateCalculator, ...data } })),
  updateProcess: (data) => set((state) => ({ process: { ...state.process, ...data } })),
  updateTestimonialsHeader: (data) =>
    set((state) => ({ testimonials: { ...state.testimonials, ...data } })),
  updateTestimonialItem: (id, data) =>
    set((state) => ({
      testimonials: {
        ...state.testimonials,
        items: state.testimonials.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      },
    })),
  addTestimonialItem: (item) =>
    set((state) => ({
      testimonials: {
        ...state.testimonials,
        items: [...state.testimonials.items, { ...item, id: `t-${Date.now()}` }],
      },
    })),
  removeTestimonialItem: (id) =>
    set((state) => ({
      testimonials: {
        ...state.testimonials,
        items: state.testimonials.items.filter((item) => item.id !== id),
      },
    })),
  updateFooter: (data) => set((state) => ({ footer: { ...state.footer, ...data } })),
  resetToDefault: () => set(defaultLandingContent),
}));
