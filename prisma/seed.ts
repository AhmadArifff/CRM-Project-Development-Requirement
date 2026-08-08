import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { initialDefaultState } from '../src/store/useLandingContentStore';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding complete database for DevPulse Studio CRM...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // ===========================================================================
  // 1. USER ACCOUNTS (Ahmad Arif — 3 email aliases)
  // ===========================================================================
  const adminUser = await prisma.user.upsert({
    where: { email: 'ahmadarif@devpulsestudio.dev' },
    update: {
      name: 'Ahmad Arif',
      role: 'ADMIN',
      password: hashedPassword,
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Lead Developer & Founder at DevPulse Studio.',
    },
    create: {
      id: 'usr_admin_ahmad_001',
      name: 'Ahmad Arif',
      email: 'ahmadarif@devpulsestudio.dev',
      password: hashedPassword,
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Lead Developer & Founder at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@devpulsestudio.dev' },
    update: { name: 'Ahmad Arif (Admin)', role: 'ADMIN', password: hashedPassword },
    create: {
      id: 'usr_admin_devpulse_002',
      name: 'Ahmad Arif (Admin)',
      email: 'admin@devpulsestudio.dev',
      password: hashedPassword,
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Founder at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  await prisma.user.upsert({
    where: { email: 'ahmadarifff@gmail.com' },
    update: { name: 'Ahmad Arif', role: 'ADMIN', password: hashedPassword },
    create: {
      id: 'usr_admin_ahmad_003',
      name: 'Ahmad Arif',
      email: 'ahmadarifff@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      hourlyRate: 250000.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bio: 'Developer & Founder at DevPulse Studio.',
      timezone: 'Asia/Jakarta',
    },
  });

  console.log('✅ Users seeded');

  // ===========================================================================
  // 2. LEADS & CONTACTS
  // ===========================================================================
  const lead1 = await prisma.lead.upsert({
    where: { id: 'lead_seed_001' },
    update: {},
    create: {
      id: 'lead_seed_001',
      name: 'Budi Santoso',
      company: 'TokoMajuloka Startup',
      email: 'budi@tokomajuloka.com',
      phone: '+62 812-9988-7766',
      status: 'NEW',
      source: 'LANDING_PAGE',
      appTitle: 'TokoMajuloka Mobile App E-Commerce',
      notes: 'Membutuhkan aplikasi mobile Android/iOS Flutter dengan backend Supabase.',
    },
  });

  const lead2 = await prisma.lead.upsert({
    where: { id: 'lead_seed_002' },
    update: {},
    create: {
      id: 'lead_seed_002',
      name: 'Dewi Lestari',
      company: 'LogisX Express',
      email: 'dewi@logisx.co.id',
      phone: '+62 815-4433-2211',
      status: 'QUALIFIED',
      source: 'DIRECT',
      appTitle: 'LogisX Fleet Management Platform',
      notes: 'Sudah diskusi requirement server dedicated vs cloud VPS.',
    },
  });

  const lead3 = await prisma.lead.upsert({
    where: { id: 'lead_seed_003' },
    update: {},
    create: {
      id: 'lead_seed_003',
      name: 'Rini Oktavia',
      company: 'MediCare Plus',
      email: 'rini@medicareplus.co.id',
      phone: '+62 821-5566-7788',
      status: 'CONTACTED',
      source: 'REFERRAL',
      appTitle: 'MediCare Patient Management System',
      notes: 'Butuh integrasi BPJS API dan appointment scheduling.',
    },
  });

  console.log('✅ Leads seeded');

  // ===========================================================================
  // 3. DEALS PIPELINE
  // ===========================================================================
  await prisma.deal.upsert({
    where: { id: 'deal_seed_001' },
    update: {},
    create: {
      id: 'deal_seed_001',
      title: 'Deal — TokoMajuloka E-Commerce App',
      value: 25000000,
      stage: 'NEW_LEAD',
      description: 'Integrasi payment gateway DOKU & Midtrans.',
      expectedClose: new Date('2026-08-25'),
      leadId: lead1.id,
      ownerId: adminUser.id,
    },
  });

  await prisma.deal.upsert({
    where: { id: 'deal_seed_002' },
    update: {},
    create: {
      id: 'deal_seed_002',
      title: 'Deal — LogisX Fleet Tracker Web App',
      value: 45000000,
      stage: 'PROPOSAL_SENT',
      description: 'Proposal arsitektur server & pengerjaan 6 minggu.',
      expectedClose: new Date('2026-09-01'),
      leadId: lead2.id,
      ownerId: adminUser.id,
    },
  });

  await prisma.deal.upsert({
    where: { id: 'deal_seed_003' },
    update: {},
    create: {
      id: 'deal_seed_003',
      title: 'Deal — MediCare Patient System',
      value: 35000000,
      stage: 'CONTACTED',
      description: 'Sistem rekam medis dan penjadwalan pasien.',
      expectedClose: new Date('2026-09-15'),
      leadId: lead3.id,
      ownerId: adminUser.id,
    },
  });

  console.log('✅ Deals seeded');

  // ===========================================================================
  // 4. PROJECTS & TASKS
  // ===========================================================================
  const project = await prisma.project.upsert({
    where: { id: 'proj_default_001' },
    update: {},
    create: {
      id: 'proj_default_001',
      name: 'DevPulse Core CRM',
      description: 'Main CRM development project for DevPulse Studio.',
      status: 'ACTIVE',
    },
  });

  const task1 = await prisma.task.upsert({
    where: { id: 'task_seed_001' },
    update: {},
    create: {
      id: 'task_seed_001',
      title: 'Setup Database Supabase & Prisma ORM Schema',
      description: 'Menyusun tabel User, Lead, Deal, Task, MasterLabel, dan AiProvider pada Supabase PostgreSQL.',
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      dueDate: new Date('2026-08-10'),
      projectId: project.id,
      assigneeId: adminUser.id,
      labels: ['Backend', 'Database'],
    },
  });

  const task2 = await prisma.task.upsert({
    where: { id: 'task_seed_002' },
    update: {},
    create: {
      id: 'task_seed_002',
      title: 'Sempurnakan Layout Figma Visual CMS Live Editor',
      description: 'Menambahkan auto-scroll focus ke top canvas dan dual-mode ImageUploadPicker.',
      status: 'DONE',
      priority: 'HIGH',
      dueDate: new Date('2026-08-06'),
      projectId: project.id,
      assigneeId: adminUser.id,
      labels: ['Frontend', 'UI/UX'],
    },
  });

  const task3 = await prisma.task.upsert({
    where: { id: 'task_seed_003' },
    update: {},
    create: {
      id: 'task_seed_003',
      title: 'Implement Real-time Auth & Protected Routes',
      description: 'Integrasi JWT login flow dengan Supabase database dan auth guard pada admin panel.',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date('2026-08-12'),
      projectId: project.id,
      assigneeId: adminUser.id,
      labels: ['Backend', 'Security'],
    },
  });

  // Task Checklists
  await prisma.taskChecklist.upsert({
    where: { id: 'chk_seed_001' },
    update: {},
    create: {
      id: 'chk_seed_001',
      taskId: task1.id,
      text: 'Konfigurasi schema.prisma',
      completed: true,
      order: 0,
    },
  });

  await prisma.taskChecklist.upsert({
    where: { id: 'chk_seed_002' },
    update: {},
    create: {
      id: 'chk_seed_002',
      taskId: task1.id,
      text: 'Push migration ke Supabase',
      completed: true,
      order: 1,
    },
  });

  await prisma.taskChecklist.upsert({
    where: { id: 'chk_seed_003' },
    update: {},
    create: {
      id: 'chk_seed_003',
      taskId: task1.id,
      text: 'Seed data awal ke database',
      completed: false,
      order: 2,
    },
  });

  // Task Comments
  await prisma.taskComment.upsert({
    where: { id: 'cmt_seed_001' },
    update: {},
    create: {
      id: 'cmt_seed_001',
      taskId: task1.id,
      authorName: 'Ahmad Arif',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: 'Database Supabase berhasil di-connect!',
    },
  });

  console.log('✅ Projects & Tasks seeded');

  // ===========================================================================
  // 5. MASTER LABELS
  // ===========================================================================
  const labelData = [
    { id: 'lbl_seed_001', name: 'Frontend', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', bgClass: 'bg-purple-500/20', textClass: 'text-purple-300', borderClass: 'border-purple-500/30' },
    { id: 'lbl_seed_002', name: 'Backend', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', bgClass: 'bg-blue-500/20', textClass: 'text-blue-300', borderClass: 'border-blue-500/30' },
    { id: 'lbl_seed_003', name: 'Database', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', bgClass: 'bg-emerald-500/20', textClass: 'text-emerald-300', borderClass: 'border-emerald-500/30' },
    { id: 'lbl_seed_004', name: 'UI/UX', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30', bgClass: 'bg-pink-500/20', textClass: 'text-pink-300', borderClass: 'border-pink-500/30' },
    { id: 'lbl_seed_005', name: 'AI / ML', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', bgClass: 'bg-cyan-500/20', textClass: 'text-cyan-300', borderClass: 'border-cyan-500/30' },
    { id: 'lbl_seed_006', name: 'Security', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', bgClass: 'bg-amber-500/20', textClass: 'text-amber-300', borderClass: 'border-amber-500/30' },
  ];

  for (const lbl of labelData) {
    await prisma.masterLabel.upsert({
      where: { id: lbl.id },
      update: {},
      create: lbl,
    });
  }

  console.log('✅ Master Labels seeded');

  // ===========================================================================
  // 6. AI PROVIDERS
  // ===========================================================================
  const aiProviders = [
    {
      id: 'ai_seed_001',
      providerKey: 'GEMINI',
      name: 'Google Gemini AI Engine',
      apiKey: 'AIzaSyD-****-12345',
      isActive: true,
      isDefault: true,
      selectedModel: 'gemini-1.5-flash',
      availableModels: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'],
    },
    {
      id: 'ai_seed_002',
      providerKey: 'OPENAI',
      name: 'OpenAI GPT-4o Engine',
      apiKey: 'sk-proj-****-67890',
      isActive: true,
      isDefault: false,
      selectedModel: 'gpt-4o-mini',
      availableModels: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo'],
    },
    {
      id: 'ai_seed_003',
      providerKey: 'ANTHROPIC',
      name: 'Anthropic Claude Engine',
      apiKey: 'sk-ant-****-99887',
      isActive: false,
      isDefault: false,
      selectedModel: 'claude-3-5-sonnet',
      availableModels: ['claude-3-5-sonnet', 'claude-3-haiku'],
    },
    {
      id: 'ai_seed_004',
      providerKey: 'OPENROUTER',
      name: 'OpenRouter Unified AI',
      apiKey: 'sk-or-v1-****',
      isActive: false,
      isDefault: false,
      selectedModel: 'google/gemini-2.0-flash-exp:free',
      availableModels: ['google/gemini-2.0-flash-exp:free', 'meta-llama/llama-3.3-70b-instruct:free', 'deepseek/deepseek-chat:free'],
    },
  ];

  for (const provider of aiProviders) {
    await prisma.aiProvider.upsert({
      where: { id: provider.id },
      update: {},
      create: provider,
    });
  }

  console.log('✅ AI Providers seeded');

  // ===========================================================================
  // 7. AI SYSTEM PROMPT
  // ===========================================================================
  await prisma.aiSystemPrompt.upsert({
    where: { id: 'prompt_seed_001' },
    update: {},
    create: {
      id: 'prompt_seed_001',
      systemInstruction: 'Anda adalah AI PRD Consultant dari DevPulse Studio yang membantu merancang spesifikasi requirement aplikasi.',
      scopeRestriction: 'Fokus hanya pada perancangan requirement proyek aplikasi.',
      offTopicMessage: 'Maaf, mari fokus pada perancangan requirement proyek aplikasi Anda.',
      hourlyRate: 250000,
    },
  });

  console.log('✅ AI System Prompt seeded');

  // ===========================================================================
  // 8. ACTIVITIES (SALES LOG)
  // ===========================================================================
  await prisma.activity.upsert({
    where: { id: 'act_seed_001' },
    update: {},
    create: {
      id: 'act_seed_001',
      type: 'CALL',
      title: 'Konsultasi Perdana Requirement App',
      description: 'Diskusi arsitektur server cloud vs dedicated dengan Budi Santoso.',
      userId: adminUser.id,
      leadId: lead1.id,
    },
  });

  await prisma.activity.upsert({
    where: { id: 'act_seed_002' },
    update: {},
    create: {
      id: 'act_seed_002',
      type: 'EMAIL',
      title: 'Pengiriman Proposal & PRD.md',
      description: 'Dokumen PRD.md dikirim ke tim LogisX Express.',
      userId: adminUser.id,
      leadId: lead2.id,
    },
  });

  await prisma.activity.upsert({
    where: { id: 'act_seed_003' },
    update: {},
    create: {
      id: 'act_seed_003',
      type: 'MEETING',
      title: 'Demo Prototype MediCare System',
      description: 'Presentasi wireframe & flow appointment scheduling ke Rini Oktavia.',
      userId: adminUser.id,
      leadId: lead3.id,
    },
  });

  console.log('✅ Activities seeded');

  // ===========================================================================
  // 9. NOTIFICATIONS
  // ===========================================================================
  await prisma.notification.upsert({
    where: { id: 'notif_seed_001' },
    update: {},
    create: {
      id: 'notif_seed_001',
      type: 'NEW_LEAD',
      title: 'Prospect Lead Baru',
      message: 'Budi Santoso telah mengisi kuisioner AI PRD Builder untuk TokoMajuloka E-Commerce App.',
      isRead: false,
      userId: adminUser.id,
    },
  });

  await prisma.notification.upsert({
    where: { id: 'notif_seed_002' },
    update: {},
    create: {
      id: 'notif_seed_002',
      type: 'DEAL_UPDATE',
      title: 'Stage Deal Diperbarui',
      message: 'Deal LogisX Fleet Management berpindah ke stage Proposal Sent.',
      isRead: false,
      userId: adminUser.id,
    },
  });

  await prisma.notification.upsert({
    where: { id: 'notif_seed_003' },
    update: {},
    create: {
      id: 'notif_seed_003',
      type: 'TASK_ASSIGNED',
      title: 'Task Baru Ditugaskan',
      message: 'Task "Implement Real-time Auth" telah ditugaskan kepada Anda.',
      isRead: false,
      userId: adminUser.id,
    },
  });

  console.log('✅ Notifications seeded');

  // ===========================================================================
  // 10. LANDING CONTENT CMS SEED
  // ===========================================================================
  console.log('🌱 Seeding Landing Page CMS contents...');
  
  const landingSections = [
    { key: 'HERO', data: initialDefaultState.hero },
    { key: 'CONSULTING', data: initialDefaultState.consulting },
    { key: 'CALCULATOR', data: initialDefaultState.rateCalculator },
    { key: 'PROCESS', data: initialDefaultState.process },
    { key: 'TESTIMONIALS_HEADER', data: { badgeText: initialDefaultState.testimonials.badgeText, sectionTitle: initialDefaultState.testimonials.sectionTitle, sectionSubhead: initialDefaultState.testimonials.sectionSubhead } },
    { key: 'TESTIMONIALS', data: initialDefaultState.testimonials.items },
    { key: 'FOOTER', data: initialDefaultState.footer },
  ];

  for (const section of landingSections) {
    await prisma.landingContent.upsert({
      where: { sectionKey: section.key },
      update: {},
      create: {
        sectionKey: section.key,
        contentJson: section.data,
      },
    });
  }

  console.log('✅ Landing Page CMS contents seeded');

  console.log('\n🎉 All database tables seeded successfully!');
  console.log('📧 Login: ahmadarif@devpulsestudio.dev');
  console.log('🔑 Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
