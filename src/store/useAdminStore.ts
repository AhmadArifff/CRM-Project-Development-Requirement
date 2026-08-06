import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

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
  color: string;
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
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED';
  source: string;
  notes?: string;
  prdFileUrl?: string;
  prdContent?: string;
  appTitle?: string;
  createdAt: string;
}

export interface AiProviderItem {
  id: string;
  providerKey: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  isDefault: boolean;
  selectedModel: string;
  availableModels: string[];
}

export type AiProviderConfig = AiProviderItem;

export interface ActivityItem {
  id: string;
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'FOLLOW_UP' | 'call' | 'email' | 'meeting' | 'note';
  title: string;
  date: string;
  description: string;
  leadName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  isRead?: boolean;
  type: 'lead' | 'deal' | 'task' | 'system';
}

export interface SystemPromptConfig {
  systemInstruction: string;
  scopeRestriction: string;
  offTopicMessage: string;
  hourlyRate: number;
}

export interface AdminState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    bio?: string;
    hourlyRate?: number;
  };
  currentUser: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    bio?: string;
    hourlyRate?: number;
  };

  leads: LeadItem[];
  deals: DealItem[];
  tasks: TaskItem[];
  activities: ActivityItem[];
  masterLabels: TaskLabelItem[];
  aiProviders: AiProviderItem[];
  notifications: NotificationItem[];
  systemPrompt: SystemPromptConfig;

  // Actions
  login: () => void;
  logout: () => void;
  setSystemPrompt: (prompt: Partial<SystemPromptConfig> | string | any) => void;

  // Leads CRUD & 1-Click Convert
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => Promise<void>;
  updateLeadStatus: (id: string, status?: any, notes?: any) => Promise<void>;
  convertLeadToDeal: (leadId: string, dealValue?: number) => Promise<void>;

  // Deals Pipeline
  addDeal: (deal: any) => Promise<void>;
  updateDealStage: (dealId: string, stage: DealItem['stage']) => Promise<void>;
  moveDeal: (dealId: string, stage: DealItem['stage']) => Promise<void>;

  // Project Tasks
  addTask: (task: any) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskItem['status']) => Promise<void>;
  moveTask: (taskId: string, targetStatus: TaskItem['status']) => Promise<void>;
  toggleChecklistItem: (taskId: string, checklistId: string) => Promise<void>;
  addChecklistItem: (taskId: string, text: string) => Promise<void>;
  addTaskComment: (taskId: string, text: string, author?: any, avatar?: any) => Promise<void>;
  updateTaskDescription: (taskId: string, description: string) => Promise<void>;

  // Master Labels
  addMasterLabel: (label: any, color?: string) => Promise<void>;
  deleteMasterLabel: (id: string) => Promise<void>;
  removeMasterLabel: (id: string) => Promise<void>;

  // Activities
  addActivity: (act: any) => Promise<void>;

  // AI Providers Toggle
  toggleAiProvider: (id: string) => Promise<void>;
  setDefaultAiProvider: (id: string) => Promise<void>;
  updateAiApiKey: (id: string, key: string) => Promise<void>;
  updateAiSelectedModel: (id: string, model: string) => Promise<void>;

  // Notifications
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;

  // Supabase Fetch
  fetchFromSupabase: () => Promise<void>;
}

const defaultAdminUser = {
  name: 'Ahmad Arif',
  email: 'ahmadarif@devpulsestudio.dev',
  role: 'ADMIN',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  bio: 'Lead Developer & Founder at DevPulse Studio.',
  hourlyRate: 250000,
};

const defaultSystemPromptObj: SystemPromptConfig = {
  systemInstruction: 'Anda adalah AI PRD Consultant dari DevPulse Studio yang membantu merancang spesifikasi requirement aplikasi.',
  scopeRestriction: 'Fokus hanya pada perancangan requirement proyek aplikasi.',
  offTopicMessage: 'Maaf, mari fokus pada perancangan requirement proyek aplikasi Anda.',
  hourlyRate: 250000,
};

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthenticated: true,
  user: defaultAdminUser,
  currentUser: defaultAdminUser,
  systemPrompt: defaultSystemPromptObj,

  activities: [
    {
      id: 'act-1',
      type: 'call',
      title: 'Konsultasi Perdana Requirement App',
      date: '2026-08-06 14:00',
      description: 'Diskusi arsitektur server cloud vs dedicated dengan Budi Santoso.',
      leadName: 'Budi Santoso',
    },
    {
      id: 'act-2',
      type: 'email',
      title: 'Pengiriman Proposal & PRD.md',
      date: '2026-08-05 11:30',
      description: 'Dokumen PRD.md dikirim ke tim LogisX Express.',
      leadName: 'Dewi Lestari',
    },
  ],

  notifications: [
    {
      id: 'n-1',
      title: 'Prospect Lead Baru',
      message: 'Budi Santoso telah mengisi kuisioner AI PRD Builder untuk TokoMajuloka E-Commerce App.',
      time: '10 menit lalu',
      read: false,
      isRead: false,
      type: 'lead',
    },
    {
      id: 'n-2',
      title: 'Stage Deal Diperbarui',
      message: 'Deal LogisX Fleet Management berpindah ke stage Proposal Sent.',
      time: '1 jam lalu',
      read: false,
      isRead: false,
      type: 'deal',
    },
  ],

  leads: [
    {
      id: 'lead-1',
      name: 'Budi Santoso',
      company: 'TokoMajuloka Startup',
      email: 'budi@tokomajuloka.com',
      phone: '+62 812-9988-7766',
      status: 'NEW',
      source: 'AI PRD Builder Landing Page',
      appTitle: 'TokoMajuloka Mobile App E-Commerce',
      prdContent: '# PRD Document — TokoMajuloka E-Commerce\n\n## 1. Overview\nAplikasi mobile e-commerce Flutter dengan backend Supabase.',
      notes: 'Membutuhkan aplikasi mobile Android/iOS Flutter dengan backend Supabase.',
      createdAt: '2026-08-06 14:20',
    },
    {
      id: 'lead-2',
      name: 'Dewi Lestari',
      company: 'LogisX Express',
      email: 'dewi@logisx.co.id',
      phone: '+62 815-4433-2211',
      status: 'QUALIFIED',
      source: 'Direct Contact',
      appTitle: 'LogisX Fleet Management Platform',
      notes: 'Sudah diskusi requirement server dedicated vs cloud VPS.',
      createdAt: '2026-08-05 10:15',
    },
  ],

  deals: [
    {
      id: 'deal-1',
      title: 'Deal — TokoMajuloka E-Commerce App',
      clientName: 'Budi Santoso',
      company: 'TokoMajuloka Startup',
      value: 25000000,
      stage: 'NEW_LEAD',
      expectedClose: '2026-08-25',
      notes: 'Integrasi payment gateway DOKU & Midtrans.',
    },
    {
      id: 'deal-2',
      title: 'Deal — LogisX Fleet Tracker Web App',
      clientName: 'Dewi Lestari',
      company: 'LogisX Express',
      value: 45000000,
      stage: 'PROPOSAL_SENT',
      expectedClose: '2026-09-01',
      notes: 'Proposal arsitektur server & pengerjaan 6 minggu.',
    },
  ],

  tasks: [
    {
      id: 'task-1',
      title: 'Setup Database Supabase & Prisma ORM Schema',
      description: 'Menyusun tabel User, Lead, Deal, Task, MasterLabel, dan AiProvider pada Supabase PostgreSQL.',
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      dueDate: '2026-08-10',
      assignee: 'Andi (Lead Dev)',
      projectName: 'DevPulse Core CRM',
      coverGradient: 'from-blue-600 to-indigo-600',
      labels: [
        { id: 'lbl-1', name: 'Backend', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
        { id: 'lbl-2', name: 'Database', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      ],
      checklists: [
        { id: 'chk-1', text: 'Konfigurasi schema.prisma', isCompleted: true },
        { id: 'chk-2', text: 'Push migration ke Supabase', isCompleted: true },
      ],
      attachments: [],
      comments: [
        {
          id: 'cmt-1',
          author: 'Andi',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          text: 'Database Supabase berhasil di-connect!',
          timestamp: '15:30',
        },
      ],
    },
    {
      id: 'task-2',
      title: 'Sempurnakan Layout Figma Visual CMS Live Editor',
      description: 'Menambahkan auto-scroll focus ke top canvas dan dual-mode ImageUploadPicker.',
      status: 'DONE',
      priority: 'HIGH',
      dueDate: '2026-08-06',
      assignee: 'Andi (Frontend)',
      projectName: 'Figma CMS Module',
      coverGradient: 'from-indigo-600 to-purple-600',
      labels: [
        { id: 'lbl-3', name: 'Frontend', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { id: 'lbl-4', name: 'UI/UX', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
      ],
      checklists: [],
      attachments: [],
      comments: [],
    },
  ],

  masterLabels: [
    { id: 'lbl-1', name: 'Frontend', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'lbl-2', name: 'Backend', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'lbl-3', name: 'Database', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'lbl-4', name: 'UI/UX', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { id: 'lbl-5', name: 'AI / ML', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    { id: 'lbl-6', name: 'Security', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  ],

  aiProviders: [
    {
      id: 'p-1',
      providerKey: 'GEMINI',
      name: 'Google Gemini AI Engine',
      apiKey: 'AIzaSyD-****-12345',
      isActive: true,
      isDefault: true,
      selectedModel: 'gemini-1.5-flash',
      availableModels: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'],
    },
    {
      id: 'p-2',
      providerKey: 'OPENAI',
      name: 'OpenAI GPT-4o Engine',
      apiKey: 'sk-proj-****-67890',
      isActive: true,
      isDefault: false,
      selectedModel: 'gpt-4o-mini',
      availableModels: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo'],
    },
    {
      id: 'p-3',
      providerKey: 'ANTHROPIC',
      name: 'Anthropic Claude Engine',
      apiKey: 'sk-ant-****-99887',
      isActive: false,
      isDefault: false,
      selectedModel: 'claude-3-5-sonnet',
      availableModels: ['claude-3-5-sonnet', 'claude-3-haiku'],
    },
  ],

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setSystemPrompt: (prompt) => {
    if (typeof prompt === 'string') {
      set((state) => ({
        systemPrompt: { ...state.systemPrompt, systemInstruction: prompt },
      }));
    } else {
      set((state) => ({
        systemPrompt: { ...state.systemPrompt, ...prompt },
      }));
    }
  },

  addLead: async (leadData) => {
    const newLead: LeadItem = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
    };
    set((state) => ({ leads: [newLead, ...state.leads] }));

    try {
      if (!supabase) return;
      await supabase.from('Lead').insert({
        id: newLead.id,
        name: newLead.name,
        company: newLead.company,
        email: newLead.email,
        phone: newLead.phone,
        status: newLead.status,
        source: newLead.source,
        notes: newLead.notes,
        appTitle: newLead.appTitle,
      });
    } catch (err) {
      console.warn('Supabase lead save warning:', err);
    }
  },

  updateLeadStatus: async (id, status = 'CONTACTED') => {
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    }));

    try {
      if (!supabase) return;
      await supabase.from('Lead').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Supabase lead status update warning:', err);
    }
  },

  convertLeadToDeal: async (leadId, dealValue = 15000000) => {
    const lead = get().leads.find((l) => l.id === leadId);
    if (!lead) return;

    const newDeal: DealItem = {
      id: `deal-${Date.now()}`,
      title: `Deal — ${lead.appTitle || lead.company || lead.name}`,
      clientName: lead.name,
      company: lead.company || 'N/A',
      value: dealValue,
      stage: 'NEW_LEAD',
      expectedClose: '2026-09-15',
      notes: `Konversi otomatis dari Prospect Lead (${lead.email}). Notes: ${lead.notes || 'N/A'}`,
    };

    set((state) => ({
      deals: [newDeal, ...state.deals],
      leads: state.leads.map((l) => (l.id === leadId ? { ...l, status: 'CONVERTED' } : l)),
    }));

    try {
      if (!supabase) return;
      await supabase.from('Lead').update({ status: 'CONVERTED' }).eq('id', leadId);
      await supabase.from('Deal').insert({
        id: newDeal.id,
        title: newDeal.title,
        value: newDeal.value,
        stage: newDeal.stage,
        leadId: leadId,
        description: newDeal.notes,
      });
    } catch (err) {
      console.warn('Supabase deal convert warning:', err);
    }
  },

  addDeal: async (dealData) => {
    const newDeal: DealItem = {
      ...dealData,
      id: `deal-${Date.now()}`,
    };
    set((state) => ({ deals: [newDeal, ...state.deals] }));

    try {
      if (!supabase) return;
      await supabase.from('Deal').insert({
        id: newDeal.id,
        title: newDeal.title,
        value: newDeal.value,
        stage: newDeal.stage,
        description: newDeal.notes,
      });
    } catch (err) {
      console.warn('Supabase deal insert warning:', err);
    }
  },

  updateDealStage: async (dealId, stage) => {
    set((state) => ({
      deals: state.deals.map((d) => (d.id === dealId ? { ...d, stage } : d)),
    }));

    try {
      if (!supabase) return;
      await supabase.from('Deal').update({ stage }).eq('id', dealId);
    } catch (err) {
      console.warn('Supabase deal stage update warning:', err);
    }
  },

  moveDeal: async (dealId, stage) => get().updateDealStage(dealId, stage),

  addTask: async (taskData) => {
    const newTask: TaskItem = {
      title: taskData.title || 'Task Baru',
      description: taskData.description || '',
      status: taskData.status || 'BACKLOG',
      priority: taskData.priority || 'MEDIUM',
      dueDate: taskData.dueDate || new Date().toISOString().slice(0, 10),
      assignee: taskData.assignee || 'Andi',
      projectName: taskData.projectName || 'DevPulse Studio',
      coverGradient: taskData.coverGradient || 'from-blue-600 to-indigo-600',
      labels: taskData.labels || [],
      checklists: taskData.checklists || [],
      comments: taskData.comments || [],
      attachments: taskData.attachments || [],
      id: `task-${Date.now()}`,
    };
    set((state) => ({ tasks: [newTask, ...state.tasks] }));

    try {
      if (!supabase) return;
      await supabase.from('Task').insert({
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        projectId: 'proj_default_001',
      });
    } catch (err) {
      console.warn('Supabase task insert warning:', err);
    }
  },

  updateTaskStatus: async (taskId, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    }));

    try {
      if (!supabase) return;
      await supabase.from('Task').update({ status }).eq('id', taskId);
    } catch (err) {
      console.warn('Supabase task status update warning:', err);
    }
  },

  moveTask: async (taskId, targetStatus) => get().updateTaskStatus(taskId, targetStatus),

  toggleChecklistItem: async (taskId, checklistId) => {
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          checklists: t.checklists.map((c) =>
            c.id === checklistId ? { ...c, isCompleted: !c.isCompleted } : c
          ),
        };
      }),
    }));
  },

  addChecklistItem: async (taskId, text) => {
    const newChecklist: TaskChecklistItem = {
      id: `chk-${Date.now()}`,
      text,
      isCompleted: false,
    };

    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return { ...t, checklists: [...t.checklists, newChecklist] };
      }),
    }));
  },

  addTaskComment: async (taskId, text, author = 'Andi', avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150') => {
    const newComment: TaskCommentItem = {
      id: `cmt-${Date.now()}`,
      author,
      avatar,
      text,
      timestamp: 'Sekarang',
    };

    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return { ...t, comments: [...t.comments, newComment] };
      }),
    }));
  },

  updateTaskDescription: async (taskId, description) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, description } : t)),
    }));

    try {
      if (!supabase) return;
      await supabase.from('Task').update({ description }).eq('id', taskId);
    } catch (err) {
      console.warn('Supabase task description update warning:', err);
    }
  },

  addMasterLabel: async (labelData, colorArg = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30') => {
    const name = typeof labelData === 'string' ? labelData : labelData.name;
    const color = typeof labelData === 'string' ? colorArg : (labelData.color || colorArg);

    const newLabel: TaskLabelItem = {
      id: `lbl-${Date.now()}`,
      name,
      color,
    };
    set((state) => ({ masterLabels: [...state.masterLabels, newLabel] }));

    try {
      if (!supabase) return;
      await supabase.from('MasterLabel').insert({
        id: newLabel.id,
        name: newLabel.name,
        color: newLabel.color,
        bgClass: 'bg-cyan-500/20',
        textClass: 'text-cyan-300',
        borderClass: 'border-cyan-500/30',
      });
    } catch (err) {
      console.warn('Supabase label insert warning:', err);
    }
  },

  deleteMasterLabel: async (id) => {
    set((state) => ({
      masterLabels: state.masterLabels.filter((l) => l.id !== id),
    }));

    try {
      if (!supabase) return;
      await supabase.from('MasterLabel').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase label delete warning:', err);
    }
  },

  removeMasterLabel: async (id) => get().deleteMasterLabel(id),

  addActivity: async (actData) => {
    const newAct: ActivityItem = {
      ...actData,
      id: `act-${Date.now()}`,
      date: new Date().toLocaleString(),
    };
    set((state) => ({ activities: [newAct, ...state.activities] }));
  },

  toggleAiProvider: async (id) => {
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
    }));

    try {
      if (!supabase) return;
      const target = get().aiProviders.find((p) => p.id === id);
      if (target) {
        await supabase.from('AiProvider').update({ isActive: target.isActive }).eq('id', id);
      }
    } catch (err) {
      console.warn('Supabase provider toggle warning:', err);
    }
  },

  setDefaultAiProvider: async (id) => {
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => ({ ...p, isDefault: p.id === id })),
    }));
  },

  updateAiApiKey: async (id, apiKey) => {
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => (p.id === id ? { ...p, apiKey } : p)),
    }));
  },

  updateAiSelectedModel: async (id, selectedModel) => {
    set((state) => ({
      aiProviders: state.aiProviders.map((p) => (p.id === id ? { ...p, selectedModel } : p)),
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true, isRead: true } : n
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true, isRead: true })),
    }));
  },

  fetchFromSupabase: async () => {
    try {
      if (!supabase) return;
      const [leadsRes, dealsRes, tasksRes, labelsRes] = await Promise.all([
        supabase.from('Lead').select('*'),
        supabase.from('Deal').select('*'),
        supabase.from('Task').select('*'),
        supabase.from('MasterLabel').select('*'),
      ]);

      if (leadsRes.data && leadsRes.data.length > 0) {
        set({ leads: leadsRes.data });
      }
      if (dealsRes.data && dealsRes.data.length > 0) {
        set({ deals: dealsRes.data });
      }
      if (tasksRes.data && tasksRes.data.length > 0) {
        set({ tasks: tasksRes.data });
      }
      if (labelsRes.data && labelsRes.data.length > 0) {
        set({ masterLabels: labelsRes.data });
      }
    } catch (err) {
      console.warn('Supabase store fetch warning:', err);
    }
  },
}));
