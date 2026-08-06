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

export interface AdminUser {
  id?: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio?: string;
  hourlyRate?: number;
  timezone?: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
  user: AdminUser;
  currentUser: AdminUser;

  leads: LeadItem[];
  deals: DealItem[];
  tasks: TaskItem[];
  activities: ActivityItem[];
  masterLabels: TaskLabelItem[];
  aiProviders: AiProviderItem[];
  notifications: NotificationItem[];
  systemPrompt: SystemPromptConfig;

  // Actions
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  setUser: (user: AdminUser) => void;
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

const guestUser: AdminUser = {
  name: 'Guest',
  email: '',
  role: 'GUEST',
  avatar: '',
};

const defaultSystemPromptObj: SystemPromptConfig = {
  systemInstruction: 'Anda adalah AI PRD Consultant dari DevPulse Studio yang membantu merancang spesifikasi requirement aplikasi.',
  scopeRestriction: 'Fokus hanya pada perancangan requirement proyek aplikasi.',
  offTopicMessage: 'Maaf, mari fokus pada perancangan requirement proyek aplikasi Anda.',
  hourlyRate: 250000,
};

// Helper: get token from localStorage (client-side only)
const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('devpulse_token');
};

const getStoredUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('devpulse_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAdminStore = create<AdminState>((set, get) => ({
  // Auth state — default unauthenticated; hydrated from localStorage on client
  isAuthenticated: false,
  token: null,
  user: guestUser,
  currentUser: guestUser,
  systemPrompt: defaultSystemPromptObj,

  // ALL data starts empty — populated from database via fetchFromSupabase()
  activities: [],
  notifications: [],
  leads: [],
  deals: [],
  tasks: [],
  masterLabels: [],
  aiProviders: [],

  // =====================================================================
  // AUTH ACTIONS
  // =====================================================================

  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devpulse_token', token);
      localStorage.setItem('devpulse_user', JSON.stringify(user));
    }
    set({
      isAuthenticated: true,
      token,
      user,
      currentUser: user,
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('devpulse_token');
      localStorage.removeItem('devpulse_user');
    }
    set({
      isAuthenticated: false,
      token: null,
      user: guestUser,
      currentUser: guestUser,
      leads: [],
      deals: [],
      tasks: [],
      activities: [],
      notifications: [],
      masterLabels: [],
      aiProviders: [],
    });
  },

  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devpulse_user', JSON.stringify(user));
    }
    set({ user, currentUser: user });
  },

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

  // =====================================================================
  // LEADS CRUD
  // =====================================================================

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

  // =====================================================================
  // DEALS PIPELINE
  // =====================================================================

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

  // =====================================================================
  // PROJECT TASKS
  // =====================================================================

  addTask: async (taskData) => {
    const currentUser = get().currentUser;
    const newTask: TaskItem = {
      title: taskData.title || 'Task Baru',
      description: taskData.description || '',
      status: taskData.status || 'BACKLOG',
      priority: taskData.priority || 'MEDIUM',
      dueDate: taskData.dueDate || new Date().toISOString().slice(0, 10),
      assignee: taskData.assignee || currentUser.name,
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

  addTaskComment: async (taskId, text, author, avatar) => {
    const currentUser = get().currentUser;
    const newComment: TaskCommentItem = {
      id: `cmt-${Date.now()}`,
      author: author || currentUser.name,
      avatar: avatar || currentUser.avatar || '',
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

  // =====================================================================
  // MASTER LABELS
  // =====================================================================

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

  // =====================================================================
  // ACTIVITIES
  // =====================================================================

  addActivity: async (actData) => {
    const newAct: ActivityItem = {
      ...actData,
      id: `act-${Date.now()}`,
      date: new Date().toLocaleString(),
    };
    set((state) => ({ activities: [newAct, ...state.activities] }));

    try {
      if (!supabase) return;
      const currentUser = get().currentUser;
      await supabase.from('Activity').insert({
        id: newAct.id,
        type: (newAct.type || 'NOTE').toUpperCase(),
        title: newAct.title,
        description: newAct.description || '',
        userId: currentUser.id || 'usr_admin_ahmad_001',
      });
    } catch (err) {
      console.warn('Supabase activity insert warning:', err);
    }
  },

  // =====================================================================
  // AI PROVIDERS
  // =====================================================================

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

  // =====================================================================
  // NOTIFICATIONS
  // =====================================================================

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true, isRead: true } : n
      ),
    }));

    // Sync to database
    try {
      if (supabase) {
        supabase.from('Notification').update({ isRead: true }).eq('id', id).then(() => {});
      }
    } catch {}
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true, isRead: true })),
    }));

    // Sync to database
    try {
      if (supabase) {
        supabase.from('Notification').update({ isRead: true }).neq('isRead', true).then(() => {});
      }
    } catch {}
  },

  // =====================================================================
  // FETCH ALL DATA FROM SUPABASE DATABASE
  // =====================================================================

  fetchFromSupabase: async () => {
    try {
      if (!supabase) return;

      const [leadsRes, dealsRes, tasksRes, labelsRes, aiRes, activitiesRes, notificationsRes] = await Promise.all([
        supabase.from('Lead').select('*').order('createdAt', { ascending: false }),
        supabase.from('Deal').select('*').order('createdAt', { ascending: false }),
        supabase.from('Task').select('*, TaskChecklist(*), TaskComment(*)').order('createdAt', { ascending: false }),
        supabase.from('MasterLabel').select('*').order('name', { ascending: true }),
        supabase.from('AiProvider').select('*').order('providerKey', { ascending: true }),
        supabase.from('Activity').select('*, Lead(name)').order('createdAt', { ascending: false }),
        supabase.from('Notification').select('*').order('createdAt', { ascending: false }),
      ]);

      // Map Leads
      if (leadsRes.data && leadsRes.data.length > 0) {
        const leads: LeadItem[] = leadsRes.data.map((l: any) => ({
          id: l.id,
          name: l.name,
          company: l.company || '',
          email: l.email,
          phone: l.phone || '',
          status: l.status,
          source: l.source || 'LANDING_PAGE',
          notes: l.notes,
          prdFileUrl: l.prdFileUrl,
          appTitle: l.appTitle,
          createdAt: l.createdAt,
        }));
        set({ leads });
      }

      // Map Deals
      if (dealsRes.data && dealsRes.data.length > 0) {
        const deals: DealItem[] = dealsRes.data.map((d: any) => ({
          id: d.id,
          title: d.title,
          clientName: d.clientName || d.title,
          company: d.company || '',
          value: Number(d.value) || 0,
          stage: d.stage,
          expectedClose: d.expectedClose || '',
          notes: d.description,
        }));
        set({ deals });
      }

      // Map Tasks with checklists & comments
      if (tasksRes.data && tasksRes.data.length > 0) {
        const currentUser = get().currentUser;
        const tasks: TaskItem[] = tasksRes.data.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description || '',
          status: t.status,
          priority: t.priority,
          dueDate: t.dueDate || '',
          assignee: t.assigneeName || currentUser.name,
          projectName: t.projectName || 'DevPulse Studio',
          coverGradient: t.coverGradient || 'from-blue-600 to-indigo-600',
          labels: (t.labels || []).map((labelName: string, idx: number) => ({
            id: `lbl-db-${idx}`,
            name: labelName,
            color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          })),
          checklists: (t.TaskChecklist || []).map((c: any) => ({
            id: c.id,
            text: c.text,
            isCompleted: c.completed,
          })),
          comments: (t.TaskComment || []).map((c: any) => ({
            id: c.id,
            author: c.authorName,
            avatar: c.authorAvatar || '',
            text: c.text,
            timestamp: c.createdAt,
          })),
          attachments: [],
        }));
        set({ tasks });
      }

      // Map Master Labels
      if (labelsRes.data && labelsRes.data.length > 0) {
        const masterLabels: TaskLabelItem[] = labelsRes.data.map((l: any) => ({
          id: l.id,
          name: l.name,
          color: l.color,
        }));
        set({ masterLabels });
      }

      // Map AI Providers
      if (aiRes.data && aiRes.data.length > 0) {
        const aiProviders: AiProviderItem[] = aiRes.data.map((p: any) => ({
          id: p.id,
          providerKey: p.providerKey,
          name: p.name,
          apiKey: p.apiKey,
          isActive: p.isActive,
          isDefault: p.isDefault,
          selectedModel: p.selectedModel || '',
          availableModels: p.availableModels || [],
        }));
        set({ aiProviders });
      }

      // Map Activities
      if (activitiesRes.data && activitiesRes.data.length > 0) {
        const activities: ActivityItem[] = activitiesRes.data.map((a: any) => ({
          id: a.id,
          type: a.type,
          title: a.title,
          description: a.description || '',
          date: a.date || a.createdAt,
          leadName: a.Lead?.name || undefined,
        }));
        set({ activities });
      }

      // Map Notifications
      if (notificationsRes.data && notificationsRes.data.length > 0) {
        const notifications: NotificationItem[] = notificationsRes.data.map((n: any) => ({
          id: n.id,
          type: n.type === 'NEW_LEAD' ? 'lead' : n.type === 'DEAL_UPDATE' ? 'deal' : n.type === 'TASK_ASSIGNED' ? 'task' : 'system',
          title: n.title,
          message: n.message,
          time: n.createdAt,
          read: n.isRead,
          isRead: n.isRead,
        }));
        set({ notifications });
      }

      // Fetch AI System Prompt
      try {
        const promptRes = await supabase.from('AiSystemPrompt').select('*').limit(1).single();
        if (promptRes.data) {
          set({
            systemPrompt: {
              systemInstruction: promptRes.data.systemInstruction,
              scopeRestriction: promptRes.data.scopeRestriction,
              offTopicMessage: promptRes.data.offTopicMessage,
              hourlyRate: Number(promptRes.data.hourlyRate) || 250000,
            },
          });
        }
      } catch {}

    } catch (err) {
      console.warn('Supabase store fetch warning:', err);
    }
  },
}));
