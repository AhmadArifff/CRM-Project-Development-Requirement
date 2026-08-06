import { create } from 'zustand';

export interface DealItem {
  id: string;
  title: string;
  clientName: string;
  company: string;
  value: number;
  stage: 'NEW_LEAD' | 'CONTACTED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST';
  expectedClose: string;
  prdFileUrl?: string;
  notes?: string;
}

export interface TaskChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface TaskLabelItem {
  id: string;
  name: string;
  color: string; // Tailwind color class e.g. bg-cyan-500/20 text-cyan-300 border-cyan-500/30
}

export interface TaskAttachmentItem {
  id: string;
  name: string;
  url: string;
  size: string;
}

export interface TaskCommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string;
  assignee: string;
  projectName: string;
  coverGradient?: string;
  labels: TaskLabelItem[];
  checklists: TaskChecklistItem[];
  attachments: TaskAttachmentItem[];
  comments: TaskCommentItem[];
}

export interface LeadItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: 'LANDING_PAGE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'DIRECT';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED';
  createdAt: string;
  appTitle?: string;
  prdContent?: string;
}

export interface ActivityItem {
  id: string;
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'FOLLOW_UP';
  title: string;
  description: string;
  leadName?: string;
  date: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'LEAD' | 'DEAL' | 'TASK' | 'SYSTEM';
}

export interface AiProviderConfig {
  id: string;
  providerKey: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  isDefault: boolean;
  selectedModel: string;
  availableModels: string[];
}

interface AdminStore {
  // Auth
  isAuthenticated: boolean;
  currentUser: { name: string; email: string; role: string; avatar: string };
  login: () => void;
  logout: () => void;

  // Master Data Management
  masterLabels: TaskLabelItem[];
  addMasterLabel: (name: string, color: string) => void;
  removeMasterLabel: (id: string) => void;

  // Deals
  deals: DealItem[];
  moveDeal: (id: string, newStage: DealItem['stage']) => void;
  addDeal: (deal: Omit<DealItem, 'id'>) => void;

  // Tasks (Trello Style)
  tasks: TaskItem[];
  moveTask: (id: string, newStatus: TaskItem['status']) => void;
  addTask: (task: Omit<TaskItem, 'id' | 'checklists' | 'attachments' | 'comments'>) => void;
  toggleChecklistItem: (taskId: string, checklistId: string) => void;
  addChecklistItem: (taskId: string, text: string) => void;
  addTaskComment: (taskId: string, author: string, avatar: string, text: string) => void;
  updateTaskDescription: (taskId: string, description: string) => void;

  // Leads
  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  convertLeadToDeal: (leadId: string, dealValue: number) => void;

  // Activities
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;

  // Notifications
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;

  // AI Providers & System Prompt
  aiProviders: AiProviderConfig[];
  toggleAiProvider: (id: string) => void;
  setDefaultAiProvider: (id: string) => void;
  updateAiApiKey: (id: string, key: string) => void;
  updateAiSelectedModel: (id: string, model: string) => void;

  systemPrompt: {
    systemInstruction: string;
    scopeRestriction: string;
    hourlyRate: number;
    offTopicMessage: string;
  };
  setSystemPrompt: (prompt: Partial<AdminStore['systemPrompt']>) => void;
}

const initialMasterLabels: TaskLabelItem[] = [
  { id: 'lbl-1', name: 'Backend', color: 'bg-blue-500/20 text-cyan-300 border-blue-500/30' },
  { id: 'lbl-2', name: 'Security', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { id: 'lbl-3', name: 'Frontend', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { id: 'lbl-4', name: 'UI/UX', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'lbl-5', name: 'QA & Testing', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
];

const initialDeals: DealItem[] = [
  { id: 'deal-1', title: 'Aplikasi E-Commerce SuperApp', clientName: 'Budi Santoso', company: 'PT Retail Bangun', value: 45000000, stage: 'NEW_LEAD', expectedClose: '2026-08-25', prdFileUrl: '/prd-sample.md' },
  { id: 'deal-2', title: 'Portal CRM Management System', clientName: 'Siti Rahma', company: 'CV Logistik Maju', value: 35000000, stage: 'CONTACTED', expectedClose: '2026-08-30' },
  { id: 'deal-3', title: 'SaaS Analytics Dashboard', clientName: 'Hendra Gunawan', company: 'FinTech Digital', value: 75000000, stage: 'PROPOSAL_SENT', expectedClose: '2026-09-05' },
  { id: 'deal-4', title: 'Mobile Booking App (Flutter)', clientName: 'Dewi Lestari', company: 'Travelku Corp', value: 50000000, stage: 'NEGOTIATION', expectedClose: '2026-08-20' },
  { id: 'deal-5', title: 'Custom Inventory Web App', clientName: 'Rudi Wijaya', company: 'Gudang Jaya', value: 30000000, stage: 'WON', expectedClose: '2026-08-10' },
];

const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Integrasi Supabase Auth & JWT Middleware',
    description: `## Task Requirement & Security Guide

> [!IMPORTANT]
> Pastikan refresh token rotation dienkripsi dengan **AES-256-GCM** sebelum disimpan di cookie.

- [x] Konfigurasi Supabase Client SDK
- [x] Middleware JWT Cookie Handler
- [ ] Session Lock & Fingerprint Verification
- [ ] Unit Test Authentication Flow

\`\`\`typescript
// Sample JWT Refresh Rotation Handler
export const rotateRefreshToken = async (token: string) => {
  return await supabase.auth.refreshSession({ refresh_token: token });
};
\`\`\`

$$ E_{security} = \sum_{i=1}^{n} (Auth_i + Enkripsi_i) $$`,
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-08-12',
    assignee: 'Andi Konsultan',
    projectName: 'CRM Management',
    coverGradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    labels: [
      { id: 'lbl-1', name: 'Backend', color: 'bg-blue-500/20 text-cyan-300 border-blue-500/30' },
      { id: 'lbl-2', name: 'Security', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    ],
    checklists: [
      { id: 'chk-1', text: 'Konfigurasi Supabase Client SDK', isCompleted: true },
      { id: 'chk-2', text: 'Middleware JWT Cookie Handler', isCompleted: true },
      { id: 'chk-3', text: 'Session Lock & Fingerprint Verification', isCompleted: false },
      { id: 'chk-4', text: 'Unit Test Authentication Flow', isCompleted: false },
    ],
    attachments: [
      { id: 'att-1', name: 'PRD_Auth_Specification.md', url: '/PRD.md', size: '64 KB' },
    ],
    comments: [
      { id: 'cmt-1', author: 'Andi Konsultan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', text: 'Sesi middleware Cookie HttpOnly sudah terpasang. Tinggal verifikasi unit test.', timestamp: '10:15 AM' },
    ],
  },
  {
    id: 'task-2',
    title: 'Desain Kanban Board & Trello Workspace UI',
    description: `## UI/UX Requirement Document

- [x] Layout Columns Drag & Drop
- [x] Markdown Rich Renderer Component
- [ ] Interactive Checklist Card Bar
- [ ] Filter & Search Workspace Bar`,
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-08-15',
    assignee: 'Frontend Dev',
    projectName: 'CRM Management',
    coverGradient: 'from-purple-600 via-indigo-600 to-cyan-400',
    labels: [
      { id: 'lbl-3', name: 'Frontend', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      { id: 'lbl-4', name: 'UI/UX', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    ],
    checklists: [
      { id: 'chk-5', text: 'Layout Columns Drag & Drop', isCompleted: true },
      { id: 'chk-6', text: 'Markdown Rich Renderer Component', isCompleted: true },
      { id: 'chk-7', text: 'Interactive Checklist Card Bar', isCompleted: false },
      { id: 'chk-8', text: 'Filter & Search Workspace Bar', isCompleted: false },
    ],
    attachments: [],
    comments: [],
  },
  {
    id: 'task-3',
    title: 'Setup Database Prisma Schema & Migration',
    description: 'Schema database PostgreSQL disiapkan untuk model User, Session, Lead, Deal, Task, Activity, dan AiProvider.',
    status: 'DONE',
    priority: 'URGENT',
    dueDate: '2026-08-08',
    assignee: 'Andi Konsultan',
    projectName: 'CRM Management',
    coverGradient: 'from-emerald-600 to-teal-500',
    labels: [
      { id: 'lbl-1', name: 'Backend', color: 'bg-blue-500/20 text-cyan-300 border-blue-500/30' },
    ],
    checklists: [
      { id: 'chk-9', text: 'Database Migration Script', isCompleted: true },
    ],
    attachments: [],
    comments: [],
  },
  {
    id: 'task-4',
    title: 'Testing Guardrail Simulator AI (Strict Scope)',
    description: 'Memastikan prompt injection menolak pertanyaan off-topic seperti resep atau cuaca.',
    status: 'REVIEW',
    priority: 'HIGH',
    dueDate: '2026-08-14',
    assignee: 'QA Team',
    projectName: 'CRM Management',
    coverGradient: 'from-amber-600 to-red-600',
    labels: [
      { id: 'lbl-5', name: 'QA & Testing', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    ],
    checklists: [
      { id: 'chk-10', text: 'Test Off-Topic Rejection', isCompleted: true },
      { id: 'chk-11', text: 'Test Dynamic Rate Injection', isCompleted: true },
    ],
    attachments: [],
    comments: [],
  },
  {
    id: 'task-5',
    title: 'Optimasi Responsive Mobile & Tablet View',
    description: 'Memastikan antarmuka CRM berjalan lancar pada perangkat mobile.',
    status: 'BACKLOG',
    priority: 'LOW',
    dueDate: '2026-08-18',
    assignee: 'Frontend Dev',
    projectName: 'CRM Management',
    labels: [
      { id: 'lbl-3', name: 'Frontend', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    ],
    checklists: [],
    attachments: [],
    comments: [],
  },
];

const initialLeads: LeadItem[] = [
  { id: 'lead-1', name: 'Budi Santoso', company: 'PT Retail Bangun', email: 'budi@retailbangun.co.id', phone: '+62 812-3456-7890', source: 'LANDING_PAGE', status: 'NEW', createdAt: '2026-08-06 09:30', appTitle: 'Aplikasi E-Commerce SuperApp', prdContent: '# PRD E-Commerce SuperApp\n\n## 1. Scope Fitur\n- Auth User\n- Payment Gateway Midtrans' },
  { id: 'lead-2', name: 'Siti Rahma', company: 'CV Logistik Maju', email: 'siti@logistikmaju.id', phone: '+62 813-9876-5432', source: 'LANDING_PAGE', status: 'CONTACTED', createdAt: '2026-08-05 14:15', appTitle: 'Portal CRM Management System' },
  { id: 'lead-3', name: 'Hendra Gunawan', company: 'FinTech Digital', email: 'hendra@fintechdigital.com', phone: '+62 811-2233-4455', source: 'REFERRAL', status: 'QUALIFIED', createdAt: '2026-08-04 11:00' },
];

const initialActivities: ActivityItem[] = [
  { id: 'act-1', type: 'MEETING', title: 'Konsultasi Requirement PRD dengan Budi', description: 'Membahas scope MVP dan integrasi payment gateway Midtrans.', leadName: 'Budi Santoso', date: '2026-08-06 10:00' },
  { id: 'act-2', type: 'CALL', title: 'Follow-up Penawaran Proposal CRM', description: 'Klien menanyakan rincian durasi 120 jam kerja.', leadName: 'Siti Rahma', date: '2026-08-05 16:30' },
  { id: 'act-3', type: 'NOTE', title: 'Catatan Teknis API Key Security', description: 'Memastikan API Key dienkripsi dengan AES-256-GCM.', date: '2026-08-04 13:00' },
];

const initialNotifications: NotificationItem[] = [
  { id: 'notif-1', title: 'Leads Baru dari Landing Page', message: 'Budi Santoso (PT Retail Bangun) telah submit PRD.', time: '5m lalu', isRead: false, type: 'LEAD' },
  { id: 'notif-2', title: 'Deal Berpindah Stage', message: 'Custom Inventory Web App berpindah ke stage WON.', time: '1j lalu', isRead: false, type: 'DEAL' },
  { id: 'notif-3', title: 'Reminder Deadline Task', message: 'Task "Testing Guardrail Simulator AI" mendekati deadline.', time: '3j lalu', isRead: true, type: 'TASK' },
];

const initialAiProviders: AiProviderConfig[] = [
  { id: 'p-1', providerKey: 'GEMINI', name: 'Google Gemini AI', apiKey: 'sk-gemini-****8921', isActive: true, isDefault: true, selectedModel: 'gemini-1.5-flash', availableModels: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-ultra'] },
  { id: 'p-2', providerKey: 'OPENAI', name: 'OpenAI GPT', apiKey: 'sk-proj-****4102', isActive: true, isDefault: false, selectedModel: 'gpt-4o-mini', availableModels: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'] },
  { id: 'p-3', providerKey: 'ANTHROPIC', name: 'Anthropic Claude', apiKey: 'sk-ant-****9912', isActive: false, isDefault: false, selectedModel: 'claude-3-5-sonnet', availableModels: ['claude-3-5-sonnet', 'claude-3-haiku'] },
  { id: 'p-4', providerKey: 'GROQ', name: 'Groq Llama-3', apiKey: 'gsk_****7712', isActive: false, isDefault: false, selectedModel: 'llama-3.1-70b-versatile', availableModels: ['llama-3.1-70b-versatile', 'mixtral-8x7b'] },
  { id: 'p-5', providerKey: 'DEEPSEEK', name: 'DeepSeek AI', apiKey: 'sk-ds-****3311', isActive: false, isDefault: false, selectedModel: 'deepseek-chat', availableModels: ['deepseek-chat', 'deepseek-coder'] },
];

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAuthenticated: true,
  currentUser: {
    name: 'Andi Konsultan',
    email: 'andi@crm-project.dev',
    role: 'Super Admin / Owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  // Dynamic Master Labels
  masterLabels: initialMasterLabels,
  addMasterLabel: (name, color) =>
    set((state) => ({
      masterLabels: [...state.masterLabels, { id: `lbl-${Date.now()}`, name, color }],
    })),
  removeMasterLabel: (id) =>
    set((state) => ({
      masterLabels: state.masterLabels.filter((l) => l.id !== id),
    })),

  deals: initialDeals,
  moveDeal: (id, newStage) =>
    set((state) => ({
      deals: state.deals.map((d) => (d.id === id ? { ...d, stage: newStage } : d)),
    })),
  addDeal: (deal) =>
    set((state) => ({
      deals: [...state.deals, { ...deal, id: `deal-${Date.now()}` }],
    })),

  tasks: initialTasks,
  moveTask: (id, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: `task-${Date.now()}`,
          checklists: [],
          attachments: [],
          comments: [],
        },
      ],
    })),
  toggleChecklistItem: (taskId, checklistId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          checklists: t.checklists.map((c) => (c.id === checklistId ? { ...c, isCompleted: !c.isCompleted } : c)),
        };
      }),
    })),
  addChecklistItem: (taskId, text) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          checklists: [...t.checklists, { id: `chk-${Date.now()}`, text, isCompleted: false }],
        };
      }),
    })),
  addTaskComment: (taskId, author, avatar, text) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          comments: [
            ...t.comments,
            {
              id: `cmt-${Date.now()}`,
              author,
              avatar,
              text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      }),
    })),
  updateTaskDescription: (taskId, description) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, description } : t)),
    })),

  leads: initialLeads,
  addLead: (lead) =>
    set((state) => ({
      leads: [
        { ...lead, id: `lead-${Date.now()}`, createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16) },
        ...state.leads,
      ],
    })),
  updateLeadStatus: (id, status) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    })),

  convertLeadToDeal: (leadId, dealValue) =>
    set((state) => {
      const targetLead = state.leads.find((l) => l.id === leadId);
      if (!targetLead) return state;

      const newDealItem: DealItem = {
        id: `deal-${Date.now()}`,
        title: targetLead.appTitle || `Deal Proyek — ${targetLead.company}`,
        clientName: targetLead.name,
        company: targetLead.company,
        value: dealValue,
        stage: 'NEW_LEAD',
        expectedClose: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        prdFileUrl: targetLead.prdContent ? '/PRD.md' : undefined,
      };

      return {
        leads: state.leads.map((l) => (l.id === leadId ? { ...l, status: 'CONVERTED' } : l)),
        deals: [newDealItem, ...state.deals],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Lead Berhasil Dikonversi!',
            message: `Lead ${targetLead.name} (${targetLead.company}) telah dikonversi menjadi Deal Baru di Pipeline.`,
            time: 'Baru saja',
            isRead: false,
            type: 'DEAL',
          },
          ...state.notifications,
        ],
      };
    }),

  activities: initialActivities,
  addActivity: (activity) =>
    set((state) => ({
      activities: [{ ...activity, id: `act-${Date.now()}` }, ...state.activities],
    })),

  notifications: initialNotifications,
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  aiProviders: initialAiProviders,
  toggleAiProvider: (id) =>
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
    })),
  setDefaultAiProvider: (id) =>
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => ({ ...p, isDefault: p.id === id })),
    })),
  updateAiApiKey: (id, key) =>
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => (p.id === id ? { ...p, apiKey: key } : p)),
    })),
  updateAiSelectedModel: (id, model) =>
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => (p.id === id ? { ...p, selectedModel: model } : p)),
    })),

  systemPrompt: {
    systemInstruction: 'Anda adalah AI PRD Consultant profesional. Tugas Anda adalah membantu calon klien merancang spesifikasi requirement aplikasi (PRD.md) secara terstruktur.',
    scopeRestriction: 'Strict Project Guardrail: HANYA jawab percakapan seputar requirement software, scope fitur, platform, server, dan PRD. Tolak percakapan di luar topik proyek aplikasi.',
    hourlyRate: 250000,
    offTopicMessage: 'Maaf, saya adalah AI PRD Consultant yang khusus membantu perancangan requirement proyek aplikasi. Mari fokus pada pembahasan fitur dan kebutuhan aplikasi Anda.',
  },
  setSystemPrompt: (prompt) =>
    set((state) => ({
      systemPrompt: { ...state.systemPrompt, ...prompt },
    })),
}));
