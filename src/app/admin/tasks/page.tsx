'use client';

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAdminStore, TaskItem, TaskLabelItem } from '@/store/useAdminStore';
import {
  CheckSquare,
  Plus,
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  AlertTriangle,
  X,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Paperclip,
  MessageSquare,
  Tag,
  Edit3,
  Eye,
  CornerDownRight,
  Send,
  Clock,
  ExternalLink,
  ChevronRight,
  Sliders,
  Trash2,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Heading,
  Link as LinkIcon,
  Image as ImageIcon,
  HelpCircle,
  MoreHorizontal,
  ChevronDown,
  Table as TableIcon,
  Circle,
  FileCode,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Markdown Components for Trello Card Detail Modal
const NotionComponents = {
  h1: ({ children }: any) => (
    <div className="border-b-2 border-blue-600/40 pb-2 mb-3 mt-3">
      <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
        <span className="text-lg">📄</span>
        <span className="gradient-text-cyan">{children}</span>
      </h1>
    </div>
  ),
  h2: ({ children }: any) => (
    <div className="bg-slate-900 border-l-4 border-cyan-400 border border-slate-800 px-3.5 py-2 my-3 rounded-r-xl shadow-md">
      <h2 className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-between">
        <span>{children}</span>
        <span className="text-[9px] font-mono text-slate-500 uppercase">SECTION</span>
      </h2>
    </div>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xs font-bold text-cyan-300 mt-3 mb-1.5 flex items-center gap-1.5 border-b border-slate-800 pb-1">
      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span>{children}</span>
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-xs text-slate-300 leading-relaxed my-2 font-normal">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-1.5 my-2 pl-1">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="space-y-1.5 my-2 pl-1">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-2 text-xs text-slate-200 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
      <div className="flex-1 leading-relaxed">{children}</div>
    </li>
  ),
  blockquote: ({ children }: any) => (
    <div className="bg-blue-950/80 border border-blue-500/40 rounded-xl p-3 my-3 text-xs text-cyan-200 flex items-start gap-2.5">
      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      <div className="flex-1 leading-relaxed text-slate-200 font-medium">{children}</div>
    </div>
  ),
  strong: ({ children }: any) => (
    <strong className="text-white font-bold bg-blue-500/15 text-cyan-300 px-1 py-0.5 rounded border border-blue-500/20">
      {children}
    </strong>
  ),
  code: ({ children }: any) => (
    <code className="px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono text-[11px]">
      {children}
    </code>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-3 rounded-xl border border-slate-800 bg-slate-950/80">
      <table className="w-full text-xs text-left text-slate-300">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-slate-900 text-white font-bold border-b border-slate-800 uppercase tracking-wider text-[9px]">{children}</thead>
  ),
  th: ({ children }: any) => (
    <th className="p-2 border-r border-slate-800 last:border-0">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="p-2 border-b border-slate-800/80 last:border-0 border-r last:border-r-0">{children}</td>
  ),
  img: ({ src, alt }: any) => (
    <div className="my-2 rounded-xl overflow-hidden border border-slate-800 shadow-md">
      <img src={src} alt={alt || 'Image Preview'} className="w-full max-h-60 object-cover" />
    </div>
  ),
};

// Rich Trello WYSIWYG Editor Toolbar Component
const TrelloEditorToolbar: React.FC<{
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (val: string) => void;
  onTogglePreview?: () => void;
  showPreviewToggle?: boolean;
}> = ({ textareaRef, value, onChange, onTogglePreview, showPreviewToggle }) => {
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  return (
    <div className="flex items-center gap-1 p-1.5 bg-slate-900 border border-slate-700/80 rounded-t-xl overflow-x-auto text-slate-300 text-xs">
      {/* Headings Dropdown */}
      <button
        type="button"
        onClick={() => insertFormatting('## ')}
        className="px-2 py-1 rounded hover:bg-slate-800 hover:text-white font-bold flex items-center gap-1 border border-slate-800"
        title="Heading 2 (##)"
      >
        <span>Tt</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      <div className="h-4 w-px bg-slate-800 mx-1" />

      {/* Bold */}
      <button
        type="button"
        onClick={() => insertFormatting('**', '**')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white font-bold"
        title="Bold (**text**)"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => insertFormatting('*', '*')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white font-bold"
        title="Italic (*text*)"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>

      {/* Strikethrough */}
      <button
        type="button"
        onClick={() => insertFormatting('~~', '~~')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white"
        title="Strikethrough (~~text~~)"
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </button>

      {/* Inline Code */}
      <button
        type="button"
        onClick={() => insertFormatting('`', '`')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-cyan-300 font-mono"
        title="Inline Code (`code`)"
      >
        <Code className="w-3.5 h-3.5" />
      </button>

      <div className="h-4 w-px bg-slate-800 mx-1" />

      {/* Bullet List */}
      <button
        type="button"
        onClick={() => insertFormatting('- ')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-white"
        title="Bullet List (- )"
      >
        <List className="w-3.5 h-3.5" />
      </button>

      {/* Task List */}
      <button
        type="button"
        onClick={() => insertFormatting('- [ ] ')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-emerald-300 font-bold"
        title="Task Checklist (- [ ])"
      >
        <CheckSquare className="w-3.5 h-3.5" />
      </button>

      {/* Link */}
      <button
        type="button"
        onClick={() => insertFormatting('[', '](https://example.com)')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-cyan-300"
        title="Insert Link ([text](url))"
      >
        <LinkIcon className="w-3.5 h-3.5" />
      </button>

      {/* Image */}
      <button
        type="button"
        onClick={() => insertFormatting('![Image Alt](', ')')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-purple-300"
        title="Insert Image (![alt](url))"
      >
        <ImageIcon className="w-3.5 h-3.5" />
      </button>

      {/* Callout Box */}
      <button
        type="button"
        onClick={() => insertFormatting('> [!NOTE]\n> ')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-amber-300"
        title="Insert Callout Note (> [!NOTE])"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      {/* Table */}
      <button
        type="button"
        onClick={() => insertFormatting('| Kolom 1 | Kolom 2 |\n| :--- | :--- |\n| Data 1 | Data 2 |\n')}
        className="p-1.5 rounded hover:bg-slate-800 hover:text-cyan-300"
        title="Insert Markdown Table"
      >
        <TableIcon className="w-3.5 h-3.5" />
      </button>

      <div className="flex-1" />

      {/* Live Preview Toggle */}
      {showPreviewToggle && (
        <button
          type="button"
          onClick={onTogglePreview}
          className="px-2 py-1 rounded bg-blue-600/20 text-cyan-300 hover:bg-blue-600/30 font-bold flex items-center gap-1 border border-blue-500/30 text-[10px]"
        >
          <Eye className="w-3 h-3" />
          <span>M↓ Preview</span>
        </button>
      )}

      {/* Help Icon */}
      <a
        href="https://www.markdownguide.org"
        target="_blank"
        rel="noreferrer"
        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
        title="Markdown Help Guide"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

export default function ProjectTasksPage() {
  const {
    tasks,
    moveTask,
    addTask,
    toggleChecklistItem,
    addChecklistItem,
    addTaskComment,
    updateTaskDescription,
    masterLabels,
    addMasterLabel,
    removeMasterLabel,
    currentUser,
  } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageLabelsOpen, setIsManageLabelsOpen] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('bg-blue-500/20 text-cyan-300 border-blue-500/30');

  const [newChecklistInput, setNewChecklistInput] = useState('');
  const [newCommentInput, setNewCommentInput] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');

  const descTextareaRef = useRef<HTMLTextAreaElement>(null);
  const commentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Add Task Form with Label Multi-Select
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    status: 'TODO' as TaskItem['status'],
    priority: 'HIGH' as TaskItem['priority'],
    dueDate: '2026-08-20',
    assignee: currentUser.name,
    projectName: 'CRM Management',
    coverGradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    selectedLabelIds: [] as string[],
  });

  const columns: { key: TaskItem['status']; label: string; color: string }[] = [
    { key: 'BACKLOG', label: 'Backlog', color: 'border-slate-600 text-slate-400 bg-slate-800/40' },
    { key: 'TODO', label: 'To Do', color: 'border-blue-500/50 text-blue-400 bg-blue-500/10' },
    { key: 'IN_PROGRESS', label: 'In Progress', color: 'border-amber-500/50 text-amber-400 bg-amber-500/10' },
    { key: 'REVIEW', label: 'In Review', color: 'border-purple-500/50 text-purple-400 bg-purple-500/10' },
    { key: 'DONE', label: 'Completed', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' },
  ];

  const priorityBadges: Record<TaskItem['priority'], { label: string; color: string }> = {
    LOW: { label: 'Low', color: 'bg-slate-800 text-slate-400 border-slate-700' },
    MEDIUM: { label: 'Medium', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    HIGH: { label: 'High', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    URGENT: { label: 'Urgent', color: 'bg-red-500/15 text-red-400 border-red-500/30 font-extrabold' },
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesLabel = false;
    if (selectedLabel === 'ALL') {
      matchesLabel = true;
    } else if (selectedLabel === 'UNASSIGNED') {
      matchesLabel = t.labels.length === 0;
    } else {
      matchesLabel = t.labels.some((l) => l.name.toLowerCase() === selectedLabel.toLowerCase());
    }

    const matchesPriority = selectedPriority === 'ALL' || t.priority === selectedPriority;
    return matchesSearch && matchesLabel && matchesPriority;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskForm.title) return;

    const chosenLabels = masterLabels.filter((l) => newTaskForm.selectedLabelIds.includes(l.id));

    addTask({
      title: newTaskForm.title,
      description: newTaskForm.description,
      status: newTaskForm.status,
      priority: newTaskForm.priority,
      dueDate: newTaskForm.dueDate,
      assignee: newTaskForm.assignee,
      projectName: newTaskForm.projectName,
      coverGradient: newTaskForm.coverGradient,
      labels: chosenLabels.length > 0 ? chosenLabels : [masterLabels[0]],
    });

    setIsAddModalOpen(false);
    setNewTaskForm({
      title: '',
      description: '',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: '2026-08-20',
      assignee: currentUser.name,
      projectName: 'CRM Management',
      coverGradient: 'from-blue-600 via-indigo-600 to-cyan-500',
      selectedLabelIds: [],
    });
  };

  const handleCreateMasterLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabelName.trim()) return;
    addMasterLabel(newLabelName, newLabelColor);
    setNewLabelName('');
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !newChecklistInput.trim()) return;

    addChecklistItem(selectedTask.id, newChecklistInput);
    setNewChecklistInput('');
    const updated = useAdminStore.getState().tasks.find((t) => t.id === selectedTask.id);
    if (updated) setSelectedTask(updated);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !newCommentInput.trim()) return;

    addTaskComment(selectedTask.id, currentUser.name, currentUser.avatar, newCommentInput);
    setNewCommentInput('');
    const updated = useAdminStore.getState().tasks.find((t) => t.id === selectedTask.id);
    if (updated) setSelectedTask(updated);
  };

  const handleSaveDescription = () => {
    if (!selectedTask) return;
    updateTaskDescription(selectedTask.id, descriptionInput);
    setIsEditingDescription(false);
    const updated = useAdminStore.getState().tasks.find((t) => t.id === selectedTask.id);
    if (updated) setSelectedTask(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-cyan-400" />
            <span>Project Tasks <span className="gradient-text-cyan">Trello Workspace</span></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manajemen pengerjaan tugas proyek CRM dengan Rich Trello Markdown Editor, Checklist, & Comments.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsManageLabelsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 font-bold text-xs transition-all shadow-md"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Kelola Master Label</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all glow-button"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Task Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari task, deskripsi, atau fitur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="ALL">Semua Label ({masterLabels.length})</option>
              <option value="UNASSIGNED">Tanpa Label (Unassigned)</option>
              {masterLabels.map((lbl) => (
                <option key={lbl.id} value={lbl.name}>{lbl.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="ALL">Semua Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.key);

          return (
            <div key={col.key} className="glass-card rounded-2xl p-4 border-slate-800/80 flex flex-col min-h-[520px]">
              {/* Column Header */}
              <div className="pb-3 border-b border-slate-800 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${col.color}`}>
                    {col.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">({colTasks.length})</span>
                </div>
              </div>

              {/* Tasks Stream */}
              <div className="flex-1 space-y-3">
                {colTasks.map((task) => {
                  const prio = priorityBadges[task.priority];
                  const completedChecklists = task.checklists.filter((c) => c.isCompleted).length;
                  const totalChecklists = task.checklists.length;
                  const checklistPercent = totalChecklists > 0 ? Math.round((completedChecklists / totalChecklists) * 100) : 0;

                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        setSelectedTask(task);
                        setDescriptionInput(task.description);
                        setIsEditingDescription(false);
                      }}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-md space-y-3 cursor-pointer group relative overflow-hidden"
                    >
                      {/* Card Cover Banner Strip */}
                      {task.coverGradient && (
                        <div className={`h-2.5 -mx-3.5 -mt-3.5 mb-2.5 bg-gradient-to-r ${task.coverGradient}`} />
                      )}

                      {/* Labels Row */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {task.labels.length > 0 ? (
                          task.labels.map((lbl) => (
                            <span key={lbl.id} className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${lbl.color}`}>
                              {lbl.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-slate-800 text-slate-500 border border-slate-700">
                            Tanpa Label
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                          {task.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                          {task.projectName}
                        </span>
                      </div>

                      {/* Checklist Progress Bar */}
                      {totalChecklists > 0 && (
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                              <span>Checklist ({completedChecklists}/{totalChecklists})</span>
                            </span>
                            <span className="font-mono text-cyan-300 font-bold">{checklistPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className={`h-full rounded-full transition-all ${checklistPercent === 100 ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                              style={{ width: `${checklistPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Footer Info */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${prio.color}`}>
                            {prio.label}
                          </span>

                          {task.comments.length > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-400">
                              <MessageSquare className="w-3 h-3 text-slate-500" />
                              <span>{task.comments.length}</span>
                            </span>
                          )}

                          {task.attachments.length > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-400">
                              <Paperclip className="w-3 h-3 text-slate-500" />
                              <span>{task.attachments.length}</span>
                            </span>
                          )}
                        </div>

                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-500" />
                          <span className="truncate max-w-[80px]">{task.assignee}</span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* DYNAMIC MASTER LABELS MANAGEMENT MODAL */}
      <AnimatePresence>
        {isManageLabelsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card rounded-2xl p-6 border-slate-700 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-400" />
                  <span>Kelola Master Data Label (Runtime CRUD)</span>
                </h3>
                <button onClick={() => setIsManageLabelsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Daftar Label Aktif</span>
                {masterLabels.map((lbl) => (
                  <div key={lbl.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border ${lbl.color}`}>
                      {lbl.name}
                    </span>
                    <button
                      onClick={() => removeMasterLabel(lbl.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                      title="Hapus Label Master"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCreateMasterLabel} className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <h4 className="font-bold text-white">Tambah Master Label Baru</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nama Label (misal: DevOps)"
                    value={newLabelName}
                    onChange={(e) => setNewLabelName(e.target.value)}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <select
                    value={newLabelColor}
                    onChange={(e) => setNewLabelColor(e.target.value)}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Cyan Preset</option>
                    <option value="bg-purple-500/20 text-purple-300 border-purple-500/30">Purple Preset</option>
                    <option value="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Emerald Preset</option>
                    <option value="bg-amber-500/20 text-amber-300 border-amber-500/30">Amber Preset</option>
                    <option value="bg-red-500/20 text-red-300 border-red-500/30">Red Preset</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md"
                >
                  + Tambah Label ke Master Data
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL AUTHENTIC TRELLO CARD DETAIL MODAL */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl glass-card rounded-2xl border-slate-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Top Banner & Action Tools Bar */}
              <div className={`h-24 bg-gradient-to-r ${selectedTask.coverGradient || 'from-blue-900 via-indigo-950 to-purple-900'} relative p-4 flex items-start justify-between`}>
                <div className="flex items-center gap-2">
                  {/* Column Status Selector Pill */}
                  <select
                    value={selectedTask.status}
                    onChange={(e) => {
                      moveTask(selectedTask.id, e.target.value as TaskItem['status']);
                      const updated = useAdminStore.getState().tasks.find((t) => t.id === selectedTask.id);
                      if (updated) setSelectedTask(updated);
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-950/80 text-cyan-300 border border-slate-700 text-xs font-bold focus:outline-none"
                  >
                    <option value="BACKLOG">Backlog ⌄</option>
                    <option value="TODO">To Do ⌄</option>
                    <option value="IN_PROGRESS">In Progress ⌄</option>
                    <option value="REVIEW">In Review ⌄</option>
                    <option value="DONE">Completed ⌄</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white" title="Cover Image Options">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white" title="Watch Card">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white" title="More Options">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="p-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Trello Quick Actions Bar */}
              <div className="px-6 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Add</span>
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dates: {selectedTask.dueDate}</span>
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Checklist ({selectedTask.checklists.filter((c) => c.isCompleted).length}/{selectedTask.checklists.length})</span>
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-purple-400" />
                  <span>Attachment ({selectedTask.attachments.length})</span>
                </button>
              </div>

              {/* Modal Body Grid */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* Title & Members / Labels Grid */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Circle className="w-5 h-5 text-slate-500 mt-1 shrink-0" />
                    <h3 className="text-xl font-black text-white leading-snug">{selectedTask.title}</h3>
                  </div>

                  <div className="flex items-center gap-8 pl-8 flex-wrap">
                    {/* Members Pill Group */}
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Members</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center border border-blue-400 shadow-md">
                          IS
                        </div>
                        <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-bold text-[10px] flex items-center justify-center border border-cyan-400 shadow-md">
                          AA
                        </div>
                        <button className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 text-xs font-bold">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Labels Pill Group */}
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Labels</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {selectedTask.labels.map((lbl) => (
                          <span key={lbl.id} className={`text-xs px-3 py-1 rounded-lg font-extrabold border ${lbl.color}`}>
                            {lbl.name}
                          </span>
                        ))}
                        <button
                          onClick={() => setIsManageLabelsOpen(true)}
                          className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Split Grid: Left Description & Checklists vs Right Comments Feed */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  
                  {/* LEFT PANE: Description with Rich Trello Markdown Editor Toolbar */}
                  <div className="md:col-span-7 space-y-6">
                    
                    {/* Description Editor Box */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-cyan-400" />
                          <span>Description</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsEditingDescription(!isEditingDescription)}
                          className="text-[11px] text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          {isEditingDescription ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                          <span>{isEditingDescription ? 'Pratinjau Markdown' : 'Edit Description'}</span>
                        </button>
                      </div>

                      {isEditingDescription ? (
                        <div className="space-y-2 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                          {/* Rich Trello Editor Toolbar */}
                          <TrelloEditorToolbar
                            textareaRef={descTextareaRef}
                            value={descriptionInput}
                            onChange={setDescriptionInput}
                            showPreviewToggle
                            onTogglePreview={() => setIsEditingDescription(false)}
                          />

                          <textarea
                            ref={descTextareaRef}
                            rows={7}
                            placeholder="Need formatting help? Type /help..."
                            value={descriptionInput}
                            onChange={(e) => setDescriptionInput(e.target.value)}
                            className="w-full p-4 bg-slate-950 text-white font-mono text-xs focus:outline-none leading-relaxed"
                          />

                          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={handleSaveDescription}
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsEditingDescription(false)}
                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500">Formatting help? Type /help</span>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsEditingDescription(true)}
                          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs space-y-2 min-h-[100px]"
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={NotionComponents}>
                            {selectedTask.description || 'Need formatting help? Type /help.'}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {/* Interactive Sub-task Checklists */}
                    <div className="space-y-3 bg-slate-900/80 p-4.5 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Checklist</span>
                        </h4>
                        {selectedTask.checklists.length > 0 && (
                          <span className="text-xs font-mono font-bold text-cyan-300">
                            {Math.round(
                              (selectedTask.checklists.filter((c) => c.isCompleted).length /
                                selectedTask.checklists.length) *
                                100
                            )}
                            %
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {selectedTask.checklists.map((chk) => (
                          <div
                            key={chk.id}
                            onClick={() => {
                              toggleChecklistItem(selectedTask.id, chk.id);
                              const updated = useAdminStore
                                .getState()
                                .tasks.find((t) => t.id === selectedTask.id);
                              if (updated) setSelectedTask(updated);
                            }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              chk.isCompleted
                                ? 'bg-slate-950/60 border-slate-800 text-slate-400 line-through'
                                : 'bg-slate-950 border border-slate-700 text-slate-200 hover:border-cyan-500'
                            }`}
                          >
                            <span className="text-xs">{chk.text}</span>
                            <input
                              type="checkbox"
                              checked={chk.isCompleted}
                              readOnly
                              className="rounded border-slate-700 bg-slate-900 accent-cyan-400"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Add Checklist Form */}
                      <form onSubmit={handleAddChecklist} className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Add an item..."
                          value={newChecklistInput}
                          onChange={(e) => setNewChecklistInput(e.target.value)}
                          className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 transition-colors"
                        >
                          Add
                        </button>
                      </form>
                    </div>

                  </div>

                  {/* RIGHT PANE: Comments and Activity Feed */}
                  <div className="md:col-span-5 space-y-4">
                    
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                        <span>Comments and activity</span>
                      </h4>
                      <button className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold">
                        Show details
                      </button>
                    </div>

                    {/* Write a comment box with Toolbar */}
                    <form onSubmit={handleAddComment} className="space-y-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
                      <textarea
                        ref={commentTextareaRef}
                        rows={3}
                        placeholder="Write a comment..."
                        value={newCommentInput}
                        onChange={(e) => setNewCommentInput(e.target.value)}
                        className="w-full p-2 bg-transparent text-white font-sans text-xs focus:outline-none leading-relaxed"
                      />

                      <TrelloEditorToolbar
                        textareaRef={commentTextareaRef}
                        value={newCommentInput}
                        onChange={setNewCommentInput}
                      />

                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          disabled={!newCommentInput.trim()}
                          className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 disabled:opacity-40 transition-colors"
                        >
                          Save Comment
                        </button>
                      </div>
                    </form>

                    {/* Comments Feed Stream */}
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
                      {selectedTask.comments.map((cmt) => (
                        <div key={cmt.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                          <div className="flex items-center gap-2">
                            <img src={cmt.avatar} alt={cmt.author} className="w-6 h-6 rounded-full border border-slate-700 object-cover" />
                            <span className="font-bold text-white">{cmt.author}</span>
                            <span className="text-[10px] text-cyan-400 hover:underline font-mono">{cmt.timestamp}</span>
                          </div>

                          <div className="prose prose-invert max-w-none text-xs text-slate-200">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={NotionComponents}>
                              {cmt.text}
                            </ReactMarkdown>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                            <button className="hover:text-cyan-300">Edit</button>
                            <span>•</span>
                            <button className="hover:text-red-400">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD TASK MODAL WITH COMPLETE MASTER DATA SELECTORS */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card rounded-2xl p-6 border-slate-700 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-cyan-400" />
                  <span>Buat Task Trello Baru</span>
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Judul Task</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Integrasi API Payment Gateway"
                    value={newTaskForm.title}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Deskripsi Pengerjaan (Markdown Supported)</label>
                  <textarea
                    rows={3}
                    placeholder="Rincian poin tugas..."
                    value={newTaskForm.description}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Master Label Selection */}
                <div>
                  <label className="text-slate-300 font-semibold block mb-1.5 flex items-center justify-between">
                    <span>Pilih Master Labels (Terikat Data Master)</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setIsManageLabelsOpen(true);
                      }}
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      + Tambah Label Master Baru
                    </button>
                  </label>
                  <div className="flex flex-wrap gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    {masterLabels.map((lbl) => {
                      const isSelected = newTaskForm.selectedLabelIds.includes(lbl.id);
                      return (
                        <button
                          key={lbl.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setNewTaskForm({
                                ...newTaskForm,
                                selectedLabelIds: newTaskForm.selectedLabelIds.filter((id) => id !== lbl.id),
                              });
                            } else {
                              setNewTaskForm({
                                ...newTaskForm,
                                selectedLabelIds: [...newTaskForm.selectedLabelIds, lbl.id],
                              });
                            }
                          }}
                          className={`text-xs px-3 py-1 rounded-full font-bold transition-all border ${
                            isSelected
                              ? `${lbl.color} ring-2 ring-cyan-400`
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {lbl.name} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Priority</label>
                    <select
                      value={newTaskForm.priority}
                      onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value as TaskItem['priority'] })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newTaskForm.dueDate}
                      onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                  >
                    Simpan Task Trello
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
