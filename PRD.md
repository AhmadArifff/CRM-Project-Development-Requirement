# PRD: DevPulse Studio — AI PRD Builder & Client Management Portal

**Product:** DevPulse Studio — Digital App Consultancy & AI PRD Engine
**Author:** PM Team (AI-Assisted)
**Date:** 2026-08-06
**Version:** v1.1
**Status:** Approved
**Reviewers:** Owner / Stakeholder, QA Team, Frontend Team, Backend Team

---

## 1. Executive Summary

CRM Management Project adalah platform berbasis web yang terdiri dari **dua modul utama**: (1) **Landing Page publik** yang berfungsi sebagai portal konsultasi dan pembuatan PRD secara otomatis menggunakan AI untuk calon klien yang ingin membangun aplikasi, dan (2) **Admin Panel CRM** yang berfungsi sebagai pusat manajemen proyek, pipeline deals, leads, dan aktivitas sales. Platform ini dirancang untuk mempercepat proses akuisisi klien melalui AI-powered PRD generation dan mengelola seluruh lifecycle proyek dari leads hingga delivery.

---

## 2. Problem Statement

### 2.1 Background

Sebagai developer/konsultan freelance atau software house kecil, proses akuisisi klien baru seringkali memakan waktu yang lama — mulai dari diskusi awal requirement, pembuatan dokumen PRD, estimasi biaya, hingga kesepakatan deal. Di sisi lain, pengelolaan proyek yang sudah berjalan juga membutuhkan tools CRM yang terintegrasi untuk tracking pipeline, tasks, dan komunikasi dengan klien.

### 2.2 Problem

> **Problem:** Proses konsultasi awal dengan calon klien tidak efisien karena dilakukan secara manual (chat/email bolak-balik), pembuatan PRD memakan waktu, dan tidak ada sistem terpusat untuk mengelola pipeline proyek dari leads hingga delivery.
>
> **Who is affected:** Owner/Developer Konsultan dan Calon Klien
>
> **Impact:** Kehilangan potential deals karena lambatnya respons, waktu 3-5 jam per PRD manual, tidak ada visibility terhadap pipeline dan status proyek

### 2.3 Evidence

| Source | Finding |
|--------|---------|
| Pengalaman langsung | Pembuatan PRD manual memakan 3-5 jam per klien |
| Feedback calon klien | Klien ingin proses lebih cepat dan transparan |
| Competitor analysis | Tools seperti Linear, Monday, Trello tidak menyediakan fitur konsultasi + PRD AI |
| Market research | 67% freelancer/agency kehilangan deals karena slow response time |

---

## 3. Target Users

### 3.1 Primary Persona — Calon Klien (Landing Page User)

**Name:** Budi — Business Owner
**Role:** Pemilik bisnis / Startup founder / Manager IT perusahaan
**Demographics:** Usia 25-50 tahun, memahami bisnis tetapi tidak teknis

| Attribute | Detail |
|-----------|--------|
| Goals | Ingin membangun aplikasi (mobile/web/cross-platform) untuk bisnisnya |
| Pain Points | Tidak tahu harus mulai dari mana, bingung menentukan requirement, tidak paham teknis |
| Current Workflow | Chat manual via WhatsApp/email, meeting tatap muka, dokumen tercecer |
| Tech Proficiency | Beginner — memahami bisnis, bukan teknis |

### 3.2 Secondary Persona — Admin/Owner (CRM Panel User)

**Name:** Andi — Developer Konsultan
**Role:** Freelance developer / Software house owner
**Demographics:** Usia 22-40 tahun, tech-savvy, mengelola multiple projects

| Attribute | Detail |
|-----------|--------|
| Goals | Mengelola pipeline deals, tracking proyek, dan mengoptimalkan proses akuisisi klien |
| Pain Points | Data klien tercecer, tidak ada visibility pipeline, estimasi manual |
| Current Workflow | Spreadsheet, Trello, WhatsApp group — tidak terintegrasi |
| Tech Proficiency | Advanced — developer/tech lead |

### 3.3 Anti-Personas (NOT building for)

- **Enterprise besar** dengan kebutuhan CRM kompleks (gunakan Salesforce/HubSpot)
- **End-user aplikasi** yang dibangun — mereka bukan user platform ini
- **Non-tech business** yang tidak membutuhkan pengembangan software

---

## 4. Proposed Solution

### 4.1 Solution Overview

Platform web dengan **dua modul utama** yang saling terhubung:

1. **Landing Page (Public)** — Portal konsultasi publik dengan fitur:
   - Informasi layanan konsultasi (analisis behavior user, rekomendasi platform, server options)
   - AI-powered PRD Builder dengan chat interface + CAPTCHA protection
   - Questionnaire non-teknis untuk requirement gathering
   - Preview & download PRD.md
   - Kalkulasi estimasi biaya berdasarkan hourly rate
   - Form submission PRD + data klien → notifikasi ke owner

2. **Admin Panel CRM (Protected)** — Dashboard manajemen dengan fitur:
   - Authentication (Login/Logout) dengan Better Auth + JWT
   - Dashboard analytics & overview
   - Deals Pipeline (Kanban Board)
   - Project Task Board (Trello-style)
   - Leads & Contact Management
   - Sales Activity Logs & Schedule
   - Notifikasi sistem
   - Profile management

### 4.2 Key Features

| # | Feature | Priority | Module | Description |
|---|---------|----------|--------|-------------|
| 1 | Landing Page — Hero & Service Info | P0 (Must) | Landing | Tampilan hero section + informasi layanan konsultasi |
| 2 | Landing Page — Consulting Analysis Section | P0 (Must) | Landing | Section analisis: mobile vs web vs cross-platform, dedicated vs shared server |
| 3 | Landing Page — AI PRD Builder (Notion AI Chat) | P0 (Must) | Landing | Interface Chat interaktif gaya Notion AI dengan respon rich-block formatting, action toolbar, & context sync |
| 4 | Landing Page — CAPTCHA Protection | P0 (Must) | Landing | CAPTCHA pada AI chat untuk menghemat token |
| 5 | Landing Page — Non-Technical Questionnaire | P0 (Must) | Landing | Form pertanyaan requirement scope (bukan teknis) |
| 6 | Landing Page — Notion PRD Document Preview & Download | P0 (Must) | Landing | Preview hasil PRD.md dengan tampilan Notion Workspace Document (cover banner, icon, metadata grid, Notion callout & syntax table) + tombol export .md |
| 7 | Landing Page — Rate Calculator | P1 (Should) | Landing | Kalkulasi biaya = estimasi jam × hourly rate |
| 8 | Landing Page — PRD Submission Form | P0 (Must) | Landing | Upload PRD + isi data: nama app, perusahaan, kontak, email |
| 9 | Landing Page — Confirmation Page | P0 (Must) | Landing | Halaman konfirmasi bahwa owner akan menghubungi |
| 10 | Admin — Login/Logout | P0 (Must) | CRM | Better Auth + JWT authentication |
| 11 | Admin — Dashboard | P0 (Must) | CRM | Overview analytics: deals count, revenue, recent activities |
| 12 | Admin — Deals Pipeline Kanban | P0 (Must) | CRM | Kanban board: New Lead → Contacted → Proposal → Negotiation → Won/Lost |
| 13 | Admin — Project Task Board (Trello Workspace Style) | P0 (Must) | CRM | Board Trello komprehensif per project (Backlog → To Do → In Progress → Review → Done) dengan Card Detail Modal popup, Rich Markdown Description & Comments (GFM, Callouts, Tables, Code Blocks, LaTeX math), Interactive Sub-task Checklists (`- [x]`), Custom Color Labels (Frontend, Backend, Security, Design), Attachments List, Member Assignment, Due Date Alerts (Overdue/Due Soon), & Filter Search Bar |
| 14 | Admin — Leads Contact Management | P0 (Must) | CRM | CRUD leads/contacts + search + filter + detail view |
| 15 | Admin — Sales Activity Logs & Schedule | P1 (Should) | CRM | Log aktivitas sales + jadwal follow-up/meeting |
| 16 | Admin — Notifikasi | P1 (Should) | CRM | Notifikasi real-time: new lead, deal update, task assignment |
| 17 | Admin — Profile | P1 (Should) | CRM | Profile management + settings |
| 18 | Admin — AI Assistant & API Key Management | P0 (Must) | CRM | Setting API Key provider AI (Gemini, OpenAI, Anthropic, Groq, DeepSeek), auto-load models, active/inactive toggle, Custom System Prompt Injection (rules scope seputar project saja + rejection off-topic), & setting rate harga dinamis untuk respon AI |
| 19 | Landing Page — Questionnaire AI Smart Recommendations | P0 (Must) | Landing | Fitur rekomendasi AI kontekstual pada questionnaire: autofill input esay & highlight pilihan ganda |
| 20 | Landing Page — Client Testimonials & Verified Reviews | P0 (Must) | Landing | Section review & testimoni klien terverifikasi dengan rating 5 bintang, foto avatar, filter kategori proyek, & metrik kepuasan estimasi |
| 21 | Admin — Landing Page Content CMS & Figma Studio Editor | P0 (Must) | CRM | Workspace admin ala Figma untuk mengedit 100% elemen landing page (teks, tombol CTA, grid icon picker, & upload file gambar lokal/URL) dengan preview canvas live split-screen & device viewport toggle |
| 22 | Admin — Dynamic Master Data Management | P0 (Must) | CRM | Pengelolaan Master Data secara dinamis dari UI Admin Panel (Labels, Categories, & Priorities) tanpa hardcoded data di codebase |
| 23 | Admin — 1-Click Lead-to-Deal Conversion System | P0 (Must) | CRM | Konversi data propek klien dari kuisioner langsung menjadi deal proyek CRM dalam 1 klik |
| 24 | Admin — Rich Trello WYSIWYG Editor Toolbar | P0 (Must) | CRM | Editor teks kaya pada detail card Trello dengan toolbar formatting Markdown, checklist interaktif, gambar, & live preview |
| 25 | Admin — Auto-Scroll Smooth Focus Canvas | P0 (Must) | CRM | Canvas preview otomatis meluncur halus ke bagian paling atas viewport saat section dipilih di Layers Tree |

### 4.3 User Flow

#### Flow A: Calon Klien (Landing Page)

```
Step 1: User mengunjungi Landing Page
  └→ Step 2: User membaca informasi layanan konsultasi
       ├→ Analisis: Mobile App / Website / Cross-platform
       ├→ Server: Dedicated / Shared / Cloud
       └→ Step 3: User tertarik → klik "Buat PRD dengan AI"
            └→ Step 4: User mengisi CAPTCHA verification
                 └→ Step 5: User menjawab questionnaire non-teknis
                      ├→ Jenis aplikasi yang diinginkan
                      ├→ Target pengguna
                      ├→ Fitur utama yang dibutuhkan
                      ├→ Budget range
                      └→ Timeline preference
                           └→ Step 6: AI Chat Session dimulai
                                ├→ Chat kiri: Percakapan AI
                                └→ Sidebar kanan: Live preview PRD.md
                                     └→ Step 7: User review PRD + download jika OK
                                          └→ Step 8: Sistem menampilkan estimasi biaya
                                               └→ Step 9: User setuju → Upload PRD + isi form
                                                    ├→ Title nama aplikasi
                                                    ├→ Nama perusahaan
                                                    ├→ Nomor kontak
                                                    └→ Email
                                                         └→ Step 10: Tampilan konfirmasi
                                                              └→ "Terima kasih! Kami akan menghubungi Anda."
```

#### Flow B: Admin/Owner (CRM Panel)

```
Step 1: Admin navigasi ke /admin/login
  └→ Step 2: Login dengan email + password (Better Auth)
       └→ Step 3: Redirect ke Dashboard
            ├→ Overview: total leads, active deals, revenue
            ├→ Recent activities
            └→ Quick actions
                 ├→ Step 4a: Kelola Deals Pipeline (Kanban)
                 │    └→ Drag & drop cards antar stage
                 ├→ Step 4b: Kelola Project Tasks (Trello Board)
                 │    └→ Create/move/assign tasks per project
                 ├→ Step 4c: Kelola Leads & Contacts
                 │    └→ View/Add/Edit/Delete leads
                 ├→ Step 4d: Sales Activity & Schedule
                 │    └→ Log calls, meetings, follow-ups
                 ├→ Step 4e: Cek Notifikasi
                 │    └→ New leads, deal updates, reminders
                 ├→ Step 4f: Edit Profile & Settings
                 └→ Step 4g: AI Assistant Settings
                      ├→ Setting API Key per provider (Gemini, OpenAI, Anthropic, Groq, DeepSeek)
                      ├→ Auto-load list model dari provider terhubung
                      ├→ Toggle status Active/Inactive provider & default model
                      ├→ System Prompt Injection (Rules scope pembatasan hanya seputar project)
                      └→ Setting Rate Harga Dinamis (Hourly Rate & Rules Estimasi Biaya)
```

### 4.4 Wireframes / Mockups

**Screen 1: Landing Page — Hero Section**
- Full-width hero with gradient background + animated text
- Headline: tagline konsultasi
- CTA button: "Konsultasi Gratis" / "Buat PRD dengan AI"
- Statistik: jumlah project selesai, klien puas, tahun pengalaman

**Screen 2: Landing Page — Services/Consulting Section**
- Grid cards: Mobile Development, Web Development, Cross-Platform
- Comparison table: Dedicated Server vs Shared Server vs Cloud
- Interactive elements dengan hover animations

**Screen 3: Landing Page — AI PRD Builder**
- Split layout: Chat area (kiri 60%) | PRD Preview (kanan 40%)
- Chat area: message bubbles, input field, CAPTCHA badge
- PRD Preview: Markdown renderer, syntax-highlighted, scrollable
- Bottom bar: Download button, Submit button, estimasi biaya

**Screen 4: Landing Page — Submission Form**
- Clean form: Title Aplikasi, Nama Perusahaan, Nomor Kontak, Email
- File upload area (PRD.md attachment)
- Submit button dengan loading state

**Screen 5: Landing Page — Confirmation**
- Success icon + animation
- Pesan: "Terima kasih! Tim kami akan menghubungi Anda dalam 1x24 jam."
- Contact info owner ditampilkan

**Screen 6: Admin — Login**
- Centered login card dengan glassmorphism effect
- Email + Password fields
- Better Auth integration

**Screen 7: Admin — Dashboard**
- Top bar: stats cards (Total Leads, Active Deals, Revenue, Tasks)
- Chart: deals trend, revenue chart
- Recent activities list
- Quick action buttons

**Screen 8: Admin — Deals Pipeline (Kanban)**
- Horizontal scrollable Kanban board
- Columns: New Lead → Contacted → Proposal Sent → Negotiation → Won / Lost
- Draggable deal cards with: nama klien, nilai deal, tanggal, status

**Screen 9: Admin — Project Task Board (Trello)**
- Horizontal Trello-style board per project
- Columns: Backlog → To Do → In Progress → Review → Done
- Task cards: title, assignee, priority, due date, labels

**Screen 10: Admin — Leads Contact Management**
- Table/List view dengan search + filter
- Detail view per lead: nama, perusahaan, email, phone, notes, history
- Add/Edit modal

**Screen 11: Admin — Sales Activity Logs**
- Timeline view: activity log (calls, emails, meetings)
- Calendar view: scheduled follow-ups dan meetings
- Add activity form

**Screen 12: Admin — Notifikasi**
- Notification panel/dropdown
- Categories: New Lead, Deal Update, Task Assignment, Reminder
- Mark as read/unread

**Screen 13: Admin — Profile**
- Profile info: nama, email, avatar, bio
- Settings: hourly rate, notification preferences, timezone
- Change password

---

## 5. Scope

### 5.1 In Scope (This Release — v1.0)

- ✅ Landing Page dengan semua section (Hero, Services, Consulting Info)
- ✅ AI PRD Builder dengan chat interface + CAPTCHA
- ✅ Non-technical questionnaire untuk requirement gathering
- ✅ PRD preview (markdown rendered) + download sebagai .md
- ✅ Rate calculator (estimasi jam × hourly rate)
- ✅ PRD Submission form + data klien (nama app, perusahaan, kontak, email)
- ✅ Confirmation page setelah submission
- ✅ Admin Login/Logout dengan Better Auth + JWT
- ✅ Admin Dashboard dengan overview analytics
- ✅ Deals Pipeline Kanban Board (drag & drop)
- ✅ Project Task Board Trello-style (drag & drop)
- ✅ Leads & Contact Management (CRUD + search + filter)
- ✅ Sales Activity Logs & Schedule
- ✅ Notifikasi sistem
- ✅ Profile & Settings management
- ✅ PWA support (installable, offline-capable for admin)
- ✅ Responsive design (Mobile → Tablet → Desktop)
- ✅ Dark mode support

### 5.2 Out of Scope (Future Releases)

- ❌ Multi-user admin (hanya single admin/owner untuk v1.0)
- ❌ Invoice generation & payment gateway integration
- ❌ Email marketing automation
- ❌ Client portal (login untuk klien melihat progress proyek)
- ❌ Mobile native app (cukup PWA untuk v1.0)
- ❌ Advanced AI features (code generation, design generation)
- ❌ Team collaboration features (multiple admin roles)
- ❌ Integration dengan tools eksternal (Slack, Discord, Jira)

### 5.3 Future Considerations

- 🔮 **v2.0:** Multi-user admin dengan RBAC (Super Admin, Sales, Project Manager)
- 🔮 **v2.0:** Client portal untuk klien melihat progress dan berkomunikasi
- 🔮 **v2.0:** Invoice generation + payment integration (Midtrans/Stripe)
- 🔮 **v3.0:** Email marketing automation + drip campaigns
- 🔮 **v3.0:** AI code generation dari PRD yang sudah di-approve
- 🔮 **v3.0:** Integration hub (Slack, Discord, Google Calendar, GitHub)

---

## 6. User Stories & Acceptance Criteria

### Epic 1: Landing Page — Informasi & Konsultasi

#### Story 1.1: Melihat Informasi Layanan Konsultasi
**As a** calon klien,
**I want to** melihat informasi lengkap tentang layanan konsultasi pembuatan aplikasi,
**So that** saya memahami apa yang ditawarkan dan bisa memutuskan apakah layanan ini sesuai kebutuhan saya.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya mengunjungi landing page, **When** halaman dimuat, **Then** saya melihat hero section dengan tagline dan CTA button
- [ ] **Given** saya scroll ke bawah, **When** saya mencapai section layanan, **Then** saya melihat penjelasan tentang pilihan: Mobile App, Website, Cross-Platform
- [ ] **Given** saya melihat section server, **When** saya membaca informasi, **Then** saya memahami perbedaan Dedicated Server, Shared Server, dan Cloud
- [ ] **Given** halaman dimuat di mobile, **When** saya mengakses dari HP, **Then** tampilan responsive dan mudah dibaca

**Edge Cases:**
- [ ] Apa yang terjadi jika gambar tidak dimuat? → Tampilkan placeholder/skeleton
- [ ] Apa yang terjadi jika koneksi lambat? → Progressive loading dengan skeleton screen

---

#### Story 1.2: Menganalisis Kebutuhan Aplikasi
**As a** calon klien,
**I want to** memahami pilihan platform dan infrastruktur yang tepat untuk aplikasi saya,
**So that** saya bisa membuat keputusan yang informed tentang jenis aplikasi yang akan dibangun.

**Priority:** P0 | **Estimate:** S

**Acceptance Criteria:**
- [ ] **Given** saya berada di section konsultasi, **When** saya melihat comparison, **Then** ada perbandingan jelas antara Mobile vs Web vs Cross-Platform dengan pro/cons
- [ ] **Given** saya melihat opsi server, **When** saya membandingkan, **Then** ada perbandingan Dedicated vs Shared dengan estimasi biaya dan rekomendasi use case
- [ ] **Given** saya mengklik salah satu opsi, **When** hover/click, **Then** ada animasi interaktif yang menunjukkan detail lebih lanjut

---

### Epic 2: Landing Page — AI PRD Builder

#### Story 2.1: Verifikasi CAPTCHA sebelum AI Chat
**As a** calon klien,
**I want to** melewati verifikasi CAPTCHA sebelum menggunakan AI chat,
**So that** sistem terlindungi dari bot dan token AI tidak cepat habis.

**Priority:** P0 | **Estimate:** S

**Acceptance Criteria:**
- [ ] **Given** saya klik "Buat PRD dengan AI", **When** modal/page terbuka, **Then** saya melihat CAPTCHA challenge yang harus diselesaikan
- [ ] **Given** saya menyelesaikan CAPTCHA, **When** verifikasi berhasil, **Then** saya bisa mulai sesi chat AI
- [ ] **Given** saya gagal CAPTCHA 3 kali, **When** percobaan ke-4, **Then** ada cooldown 5 menit
- [ ] **Given** sesi chat sudah aktif, **When** idle selama 30 menit, **Then** sesi expire dan perlu CAPTCHA ulang

**Edge Cases:**
- [ ] Apa yang terjadi jika CAPTCHA service down? → Tampilkan fallback CAPTCHA sederhana (math question)
- [ ] Apa yang terjadi jika user disable JavaScript? → Tampilkan pesan untuk enable JS

---

#### Story 2.2: Menjawab Questionnaire Non-Teknis
**As a** calon klien,
**I want to** menjawab pertanyaan-pertanyaan sederhana tentang kebutuhan aplikasi saya,
**So that** AI bisa memahami requirement saya tanpa saya harus mengerti istilah teknis.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya lolos CAPTCHA, **When** questionnaire dimulai, **Then** pertanyaan yang muncul bersifat non-teknis dan mudah dipahami
- [ ] **Given** pertanyaan ditampilkan, **When** saya baca, **Then** pertanyaan fokus pada: jenis aplikasi, target pengguna, fitur utama, skala pengguna, budget range, timeline
- [ ] **Given** saya mengisi semua pertanyaan, **When** submit, **Then** jawaban dikirim ke AI sebagai context untuk chat PRD

**Contoh Pertanyaan (Non-Teknis):**
1. Aplikasi apa yang ingin Anda buat? (Deskripsi singkat)
2. Siapa target pengguna aplikasi ini?
3. Fitur utama apa yang harus ada di aplikasi?
4. Berapa perkiraan jumlah pengguna awal?
5. Apakah ada referensi aplikasi yang mirip?
6. Berapa budget yang dialokasikan? (range)
7. Kapan target aplikasi selesai?

---

#### Story 2.3: Chat dengan AI untuk Membuat PRD
**As a** calon klien,
**I want to** berdiskusi dengan AI melalui chat untuk menyusun PRD,
**So that** saya mendapatkan dokumen PRD yang lengkap tanpa harus menulis sendiri.

**Priority:** P0 | **Estimate:** L

**Acceptance Criteria:**
- [ ] **Given** questionnaire selesai, **When** chat dimulai, **Then** AI memberikan ringkasan dari jawaban questionnaire dan mulai breakdown requirement
- [ ] **Given** saya mengirim pesan, **When** AI memproses, **Then** response muncul dalam ≤ 5 detik dengan typing indicator
- [ ] **Given** AI merespons, **When** ada informasi PRD baru, **Then** sidebar PRD preview otomatis ter-update secara real-time
- [ ] **Given** saya ingin mengubah requirement, **When** saya minta revisi via chat, **Then** AI memperbarui section terkait di PRD
- [ ] **Given** saya puas dengan PRD, **When** saya klik "Selesai", **Then** PRD final siap di-download

**Edge Cases:**
- [ ] Apa yang terjadi jika AI response terlalu lama (>30s)? → Tampilkan timeout message + retry button
- [ ] Apa yang terjadi jika token habis? → Tampilkan pesan limit tercapai + opsi contact manual
- [ ] Apa yang terjadi jika user mengirim konten tidak pantas? → Content filter + warning

---

#### Story 2.4: Preview & Download PRD
**As a** calon klien,
**I want to** melihat preview PRD yang dihasilkan AI dan mendownloadnya,
**So that** saya bisa review hasil PRD sebelum submit.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** chat AI menghasilkan PRD, **When** saya melihat sidebar, **Then** PRD ditampilkan dalam format markdown yang ter-render dengan baik (headings, lists, tables)
- [ ] **Given** PRD sudah selesai, **When** saya klik "Download", **Then** file PRD.md terdownload ke device saya
- [ ] **Given** saya sedang chat, **When** AI memperbarui PRD section, **Then** sidebar auto-scroll ke section yang berubah dengan highlight animation
- [ ] **Given** PRD preview, **When** saya melihat di mobile, **Then** preview bisa di-toggle (show/hide) karena layar kecil

---

#### Story 2.5: Melihat Estimasi Biaya
**As a** calon klien,
**I want to** melihat estimasi biaya pengembangan berdasarkan PRD,
**So that** saya bisa mempertimbangkan budget sebelum memutuskan.

**Priority:** P1 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** PRD sudah selesai, **When** estimasi dikalkulasi, **Then** saya melihat: estimasi total jam kerja × hourly rate owner
- [ ] **Given** estimasi ditampilkan, **When** saya melihat breakdown, **Then** ada detail per-fitur: fitur A = X jam, fitur B = Y jam, dst.
- [ ] **Given** hourly rate diset oleh admin, **When** rate berubah, **Then** estimasi otomatis ter-update

---

#### Story 2.6: Submit PRD & Data Klien
**As a** calon klien,
**I want to** mengirimkan PRD beserta informasi kontak saya,
**So that** owner bisa menghubungi saya untuk diskusi lebih lanjut.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya setuju dengan PRD & estimasi, **When** saya klik "Kirim PRD", **Then** form submission terbuka
- [ ] **Given** form terbuka, **When** saya mengisi, **Then** ada field: Title Nama Aplikasi, Nama Perusahaan, Nomor Kontak, Email
- [ ] **Given** PRD sudah di-generate, **When** form terbuka, **Then** file PRD.md otomatis ter-attach (auto-upload)
- [ ] **Given** semua field terisi valid, **When** submit, **Then** data tersimpan di database + file di Supabase Storage
- [ ] **Given** submit berhasil, **When** redirect, **Then** tampil halaman konfirmasi: "Terima kasih! Kami akan menghubungi Anda."
- [ ] **Given** submission berhasil, **When** data masuk, **Then** notifikasi terkirim ke admin (di CRM panel)

**Validation Rules:**
- Title Nama Aplikasi: Required, min 3 characters
- Nama Perusahaan: Required, min 2 characters
- Nomor Kontak: Required, valid phone format (Indonesia: +62 / 08xx)
- Email: Required, valid email format

**Edge Cases:**
- [ ] Apa yang terjadi jika upload file gagal? → Retry mechanism + error message
- [ ] Apa yang terjadi jika email sudah pernah submit sebelumnya? → Tetap terima, tandai sebagai returning lead

---

### Epic 3: Admin Panel — Authentication

#### Story 3.1: Login ke Admin Panel
**As a** admin/owner,
**I want to** login ke admin panel dengan aman,
**So that** saya bisa mengakses fitur CRM.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya navigasi ke /admin/login, **When** halaman dimuat, **Then** saya melihat form login (email + password)
- [ ] **Given** saya memasukkan credentials yang valid, **When** submit, **Then** saya ter-redirect ke /admin/dashboard
- [ ] **Given** saya memasukkan credentials yang salah, **When** submit, **Then** tampil error message yang jelas tapi tidak spesifik ("Email atau password salah")
- [ ] **Given** saya gagal login 5 kali berturut-turut, **When** percobaan ke-6, **Then** akun terkunci selama 15 menit
- [ ] **Given** saya sudah login, **When** JWT access token expire, **Then** refresh token otomatis memperbarui session (token rotation)
- [ ] **Given** saya klik logout, **When** logout berhasil, **Then** JWT token di-revoke dan redirect ke login page

**Edge Cases:**
- [ ] Apa yang terjadi jika user mengakses /admin/* tanpa login? → Redirect ke /admin/login
- [ ] Apa yang terjadi jika refresh token juga expire? → Force logout + redirect login

---

### Epic 4: Admin Panel — Dashboard

#### Story 4.1: Melihat Dashboard Overview
**As a** admin/owner,
**I want to** melihat ringkasan bisnis di dashboard,
**So that** saya bisa memantau performance bisnis secara keseluruhan.

**Priority:** P0 | **Estimate:** L

**Acceptance Criteria:**
- [ ] **Given** saya login, **When** dashboard dimuat, **Then** saya melihat stat cards: Total Leads, Active Deals, Total Revenue, Pending Tasks
- [ ] **Given** dashboard dimuat, **When** saya scroll, **Then** saya melihat chart: Deals trend (line chart), Revenue by month (bar chart)
- [ ] **Given** dashboard dimuat, **When** saya lihat bagian bawah, **Then** ada Recent Activities list (5 terbaru)
- [ ] **Given** data berubah, **When** saya refresh/real-time update, **Then** dashboard menampilkan data terbaru

---

### Epic 5: Admin Panel — Deals Pipeline

#### Story 5.1: Mengelola Deals Pipeline (Kanban Board)
**As a** admin/owner,
**I want to** melihat dan mengelola pipeline deals dalam format Kanban,
**So that** saya bisa tracking progress setiap deal dari awal sampai closing.

**Priority:** P0 | **Estimate:** L

**Acceptance Criteria:**
- [ ] **Given** saya navigasi ke Deals, **When** halaman dimuat, **Then** saya melihat Kanban board dengan kolom: New Lead → Contacted → Proposal Sent → Negotiation → Won / Lost
- [ ] **Given** ada deal card, **When** saya drag card ke kolom lain, **Then** status deal ter-update di database
- [ ] **Given** saya klik deal card, **When** modal terbuka, **Then** saya melihat detail: nama klien, nilai deal, tanggal, catatan, file PRD terlampir
- [ ] **Given** saya ingin tambah deal baru, **When** klik "Add Deal", **Then** form muncul: nama klien, nilai deal, deskripsi, stage awal
- [ ] **Given** saya edit deal, **When** klik edit, **Then** bisa update semua field deal
- [ ] **Given** deal berpindah stage, **When** drop berhasil, **Then** ada animasi smooth dan timestamp tercatat

**Edge Cases:**
- [ ] Apa yang terjadi jika drag gagal (network error)? → Rollback ke posisi semula + error toast
- [ ] Apa yang terjadi jika banyak deal (>50 per kolom)? → Virtualized scrolling per kolom

---

### Epic 6: Admin Panel — Project Task Board

#### Story 6.1: Mengelola Project Tasks (Trello Board)
**As a** admin/owner,
**I want to** mengelola tasks per proyek dalam format Trello board,
**So that** saya bisa tracking progress development setiap proyek.

**Priority:** P0 | **Estimate:** L

**Acceptance Criteria:**
- [ ] **Given** saya navigasi ke Projects, **When** halaman dimuat, **Then** saya bisa memilih proyek dan melihat task board
- [ ] **Given** task board dimuat, **When** kolom tampil, **Then** ada kolom: Backlog → To Do → In Progress → Review → Done
- [ ] **Given** saya ingin tambah task, **When** klik "Add Task", **Then** form: title, description, priority (Low/Medium/High/Urgent), due date, labels
- [ ] **Given** ada task card, **When** saya drag ke kolom lain, **Then** status task ter-update
- [ ] **Given** saya klik task card, **When** detail terbuka, **Then** saya bisa lihat/edit: description, checklist, due date, labels, activity log
- [ ] **Given** task memiliki due date, **When** mendekati/lewat deadline, **Then** card ditandai dengan warna warning/danger

---

### Epic 7: Admin Panel — Leads Contact Management

#### Story 7.1: Mengelola Leads & Contacts
**As a** admin/owner,
**I want to** mengelola data leads dan kontak klien,
**So that** saya bisa follow-up dan track semua potential klien.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya navigasi ke Leads, **When** halaman dimuat, **Then** saya melihat list/table leads dengan: Nama, Perusahaan, Email, Phone, Status, Tanggal Created
- [ ] **Given** list leads, **When** saya search, **Then** bisa filter berdasarkan nama/perusahaan/email
- [ ] **Given** list leads, **When** saya klik filter, **Then** bisa filter berdasarkan status: New, Contacted, Qualified, Unqualified
- [ ] **Given** saya klik lead, **When** detail terbuka, **Then** saya melihat: info lengkap, history interaksi, file PRD terlampir (jika dari landing page)
- [ ] **Given** lead masuk dari landing page, **When** user submit PRD, **Then** lead otomatis ter-create dengan data yang diisi + file PRD
- [ ] **Given** saya ingin tambah lead manual, **When** klik "Add Lead", **Then** form: nama, perusahaan, email, phone, notes, source

---

### Epic 8: Admin Panel — Sales Activity & Schedule

#### Story 8.1: Mencatat Aktivitas Sales
**As a** admin/owner,
**I want to** mencatat dan melihat semua aktivitas sales (calls, emails, meetings),
**So that** saya bisa track follow-up dan tidak melewatkan appointment.

**Priority:** P1 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya navigasi ke Activities, **When** halaman dimuat, **Then** saya melihat timeline aktivitas terbaru
- [ ] **Given** saya ingin tambah aktivitas, **When** klik "Add Activity", **Then** form: tipe (Call/Email/Meeting/Note), lead terkait, tanggal/waktu, deskripsi
- [ ] **Given** saya melihat jadwal, **When** switch ke calendar view, **Then** saya melihat jadwal meeting/follow-up dalam format kalender
- [ ] **Given** ada jadwal mendatang, **When** H-1 atau H-hari, **Then** notifikasi reminder muncul

---

### Epic 9: Admin Panel — Notifikasi

#### Story 9.1: Menerima Notifikasi Sistem
**As a** admin/owner,
**I want to** menerima notifikasi ketika ada event penting (new lead, deal update),
**So that** saya tidak melewatkan informasi penting.

**Priority:** P1 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya login, **When** ada new lead dari landing page, **Then** notifikasi muncul di notification bell + badge count
- [ ] **Given** saya klik notification bell, **When** dropdown terbuka, **Then** saya melihat list notifikasi terbaru dengan: icon, judul, waktu, status (read/unread)
- [ ] **Given** notifikasi unread, **When** saya klik, **Then** redirect ke halaman terkait + mark as read
- [ ] **Given** banyak notifikasi, **When** saya klik "Mark All as Read", **Then** semua notifikasi ditandai sudah dibaca

---

### Epic 10: Admin Panel — Profile

#### Story 10.1: Mengelola Profile & Settings
**As a** admin/owner,
**I want to** mengelola profile dan settings akun saya,
**So that** informasi saya up-to-date dan preferensi sesuai kebutuhan.

**Priority:** P1 | **Estimate:** S

**Acceptance Criteria:**
- [ ] **Given** saya klik avatar/menu profile, **When** profile page terbuka, **Then** saya melihat: nama, email, avatar, bio
- [ ] **Given** saya edit profile, **When** klik edit, **Then** bisa update: nama, avatar (upload ke Supabase Storage), bio
- [ ] **Given** saya buka settings, **When** settings tampil, **Then** bisa set: hourly rate (untuk kalkulasi landing page), timezone, notification preferences
- [ ] **Given** saya ingin ganti password, **When** klik Change Password, **Then** form: current password, new password, confirm password

---

### Epic 11: Admin Panel — AI Assistant & API Key Management

#### Story 11.1: Mengelola Provider AI & API Key
**As a** admin/owner,
**I want to** mengelola API Key dan pengaktifan provider AI (Google Gemini, OpenAI, Anthropic, Groq, DeepSeek) dari admin panel,
**So that** saya bisa memilih provider mana yang aktif digunakan oleh AI PRD Builder pada Landing Page secara dinamis.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [ ] **Given** saya navigasi ke menu /admin/ai-assistant, **When** halaman dimuat, **Then** saya melihat daftar card provider AI: Google Gemini, OpenAI, Anthropic Claude, Groq, DeepSeek
- [ ] **Given** saya ingin memasukkan API Key, **When** saya isi input API Key dan simpan, **Then** API Key tersimpan aman dengan enkripsi AES-256-GCM di database
- [ ] **Given** API Key sudah tersimpan, **When** halaman dimuat ulang, **Then** API Key ditampilkan ter-masking (`sk-proj-****1234`) demi keamanan
- [ ] **Given** saya klik "Test Connection", **When** API berhasil terhubung, **Then** sistem otomatis memuat (auto-load) daftar model yang tersedia dari provider tersebut (contoh: `gemini-1.5-pro`, `gemini-1.5-flash`, `gpt-4o`, `gpt-4o-mini`, `claude-3-5-sonnet`, `deepseek-chat`)
- [ ] **Given** daftar model termuat, **When** saya pilih model, **Then** model terpilih diset sebagai model aktif provider tersebut
- [ ] **Given** ada switch toggle Active/Inactive, **When** saya toggle ke Active, **Then** provider diaktifkan. Jika saya set sebagai Default, **Then** landing page AI PRD Builder akan menggunakan provider & model ini
- [ ] **Given** tidak ada provider yang aktif, **When** user mengakses AI chat di landing page, **Then** sistem menampilkan warning ramah bahwa AI sedang pemeliharaan

**Security & Validation:**
- API Key WAJIB dienkripsi server-side sebelum masuk database
- Endpoint GET `/api/admin/ai-providers` WAJIB mengembalikan masked key, bukan plain-text API Key
- Pengaturan provider HANYA bisa diakses oleh admin authenticated (JWT protected)

#### Story 11.2: System Prompt Injection & Setting Rate Harga Dinamis
**As a** admin/owner,
**I want to** mengatur System Prompt / System Instructions, pembatasan scope topik (guardrails), dan rate harga pengembangan di admin panel,
**So that** AI pada Landing Page hanya memproses percakapan seputar proyek aplikasi, menolak topik di luar proyek secara sopan, serta menjawab estimasi biaya sesuai aturan rate harga yang saya tentukan.
- [ ] **Given** saya berada di menu /admin/ai-assistant, **When** saya berpindah ke tab "System Prompt & Rules", **Then** saya melihat editor System Prompt, Scope Guardrails, dan Setting Rate Harga
- [ ] **Given** admin mengisi rate per jam, **When** disimpan, **Then** rate ini digunakan untuk mengkalkulasi estimasi biaya di AI chat dan Rate Calculator landing page

---

### Epic 12: Admin Panel — Figma Studio Visual Landing CMS

#### Story 12.1: Workspace 3 Kolom ala Figma Studio & Viewport Selectors
**As a** admin/owner,
**I want to** mengedit isian konten landing page melalui workspace 3 kolom ala Figma Studio (`/admin/landing-content`),
**So that** saya memiliki fleksibilitas penuh mengelola teks, tombol CTA, ikon, dan media secara visual.

**Priority:** P0 | **Estimate:** L

**Acceptance Criteria:**
- [x] **Given** admin di `/admin/landing-content`, **When** dimuat, **Then** tampil layout 3 kolom: Left Layers Tree, Center Live Canvas, & Right Properties Inspector
- [x] **Given** bar header atas, **When** admin memilih device toggle (`Laptop Desktop`, `Tablet`, `Mobile`), **Then** viewport canvas menyesuaikan lebar frame secara akurat
- [x] **Given** tombol zoom, **When** diubah (`50%`, `75%`, `100%`), **Then** skala canvas menyesuaikan secara proporsional

#### Story 12.2: Live Canvas Auto-Scroll Focus to Top
**As a** admin/owner,
**I want to** canvas preview otomatis meluncur halus (*smooth scroll*) membawa section aktif ke bagian paling atas viewport,
**So that** saya langsung melihat hasil perubahan real-time tanpa perlu scroll manual.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [x] **Given** admin memilih layer pada Layers Tree (misal `Rate Calculator`), **When** diklik, **Then** canvas otomatis scroll meluncur ke bagian paling atas viewport
- [x] **Given** section aktif di canvas, **When** disorot, **Then** terdapat badge `📌 Section (Focused Top)` dan ring glow border tebal

#### Story 12.3: Upload File Gambar Lokal & Manager Avatar (`ImageUploadPicker`)
**As a** admin/owner,
**I want to** meng-upload file gambar dari komputer atau menempelkan URL gambar untuk foto testimoni klien dan elemen media lainnya,
**So that** saya dapat memperbarui gambar secara mandiri.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [x] **Given** inspector properti gambar, **When** admin menekan `📷 Upload File Gambar`, **Then** dialog pemilih file komputer lokal terbuka
- [x] **Given** file gambar (PNG/JPG/WebP) dipilih, **When** diproses, **Then** `FileReader` mengonversi gambar menjadi Data URL persistent dan langsung di-render di canvas
- [x] **Given** opsi URL Link, **When** admin menempelkan URL (`https://...`), **Then** gambar ter-update secara instan

---

### Epic 13: Admin Panel — Dynamic Master Data Management

#### Story 13.1: Pengelolaan Master Data Dinamis via UI
**As a** admin/owner,
**I want to** mengelola Master Data Labels, Categories, dan Priorities langsung dari UI Admin Panel,
**So that** tidak ada data yang ter-hardcode di codebase dan mencegah miskonsepsi data kategori.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [x] **Given** modal "+ Kelola Master Label", **When** admin menambah label baru beserta warna preset, **Then** label baru tersimpan di master state dan langsung dapat dipilih di semua form task
- [x] **Given** admin menghapus label, **When** dikonfirmasi, **Then** label terhapus dari master list tanpa merusak integritas task yang sudah ada

---

### Epic 14: Admin Panel — 1-Click Lead-to-Deal Conversion System

#### Story 14.1: Konversi Prospect Lead menjadi Deal Pipeline
**As a** admin/owner,
**I want to** mengonversi data lead hasil kuisioner klien menjadi deal proyek CRM hanya dalam 1 klik,
**So that** alur follow-up sales menjadi seamless.

**Priority:** P0 | **Estimate:** S

**Acceptance Criteria:**
- [x] **Given** tabel data di `/admin/leads`, **When** admin menekan tombol "Convert to Deal", **Then** data lead otomatis dipindahkan ke Deals Pipeline Kanban dengan stage awal `New Lead`

---

### Epic 15: Admin Panel — Rich Trello WYSIWYG Editor Toolbar

#### Story 15.1: Editor Formatting Deskripsi Task Modal
**As a** admin/owner,
**I want to** menggunakan toolbar formatting WYSIWYG lengkap pada deskripsi task board Trello,
**So that** dokumen spesifikasi tugas tim developer tersusun rapi dengan heading, bold, italic, code block, tabel, dan checklist.

**Priority:** P0 | **Estimate:** M

**Acceptance Criteria:**
- [x] **Given** modal detail task di `/admin/tasks`, **When** admin mengedit deskripsi, **Then** tersedia toolbar formatting (`Tt`, `B`, `I`, `~`, `` ` ``, `-`, `- [ ]`, `Link`, `Image`, `Note`, `Table`, `M↓ Preview`)
- [x] **Given** mode preview `M↓`, **When** diaktifkan, **Then** hasil formatting markdown ter-render dengan rapi ala Notion

---

### Epic 16: Developer Guidelines — Git Merge Threshold Policy (10 Commits)

#### Story 16.1: Kebijakan Merge Threshold Dev ke Main
**As a** team developer & agent AI,
**I want to** mematuhi aturan merge 10 commits dari branch `dev` ke branch `main`,
**So that** branch rilis produksi `main` selalu stabil dan hanya di-update pada milestone tertentu.

**Priority:** P0 | **Estimate:** S

**Acceptance Criteria:**
- [x] **Active Development**: Seluruh pekerjaan harian wajib di-commit dan di-push ke branch `dev` (`git push origin dev`)
- [x] **10-Commit Threshold**: Merging ke branch `main` (`git checkout main && git merge dev && git push origin main`) HANYA dilakukan setiap kali terkumpul 10 commit di branch `dev`

---
- [ ] **Given** rule pembatasan scope diaktifkan, **When** user mencoba bertanya topik di luar proyek aplikasi (contoh: pertanyaan umum, resep, matematika dasar, dll), **Then** AI menolak secara sopan: *"Maaf, saya adalah AI PRD Consultant yang khusus membantu perancangan requirement proyek aplikasi. Mari kembali fokus ke pembahasan fitur dan kebutuhan aplikasi Anda."*
- [ ] **Given** saya mengatur Rate Harga (contoh: Rp 250.000 / jam), **When** user meminta estimasi biaya di AI chat landing page, **Then** AI menggunakan rate harga tersebut secara konsisten dalam jawabannya
- [ ] **Given** ada fitur "Test Guardrail Simulator", **When** admin mengetikkan sample chat user, **Then** simulator menampilkan hasil respon AI untuk menguji efektivitas prompt injection sebelum dipublish ke landing page

**Security & Validation:**
- System prompt diinjeksi di tingkat server (server-side system message), tidak dapat di-override oleh user prompt (Prompt Injection Defense / Jailbreak Prevention)
- Variabel rate harga (`{{HOURLY_RATE}}`, `{{CURRENCY}}`) diganti secara otomatis di backend sebelum dikirim ke API provider AI

---

## 7. Non-Functional Requirements

### 7.1 Performance

| Metric | Target | Maximum |
|--------|--------|---------|
| Landing page load time (LCP) | < 2.5s | < 4s |
| Admin panel load time | < 3s | < 5s |
| API response time (p95) | < 200ms | < 500ms |
| AI Chat response time | < 5s | < 15s |
| Kanban drag-drop latency | < 100ms | < 300ms |
| Concurrent users (landing) | 100 | 500 |
| Concurrent users (admin) | 5 | 20 |
| Database query time | < 50ms | < 200ms |
| Bundle size (JS, gzipped) | < 200KB | < 350KB |

### 7.2 Security & Authentication Policy

> 🔒 **MANDATORY POLICY:** Admin Panel CRM WAJIB memiliki fitur Autentikasi Login (Auth) & Authorization yang sangat ketat. Landing Page AI Chat WAJIB dilindungi CAPTCHA untuk mencegah abuse token AI.

- [x] Authentication: Better Auth + JWT Token (Access + Refresh Token Rotation)
- [x] Authorization: Single admin role (v1.0), RBAC-ready for v2.0
- [x] Protected Routes: Semua `/admin/*` endpoint dilindungi auth middleware
- [x] CAPTCHA: Google reCAPTCHA v3 / hCaptcha pada AI Chat entry point
- [x] Data encryption: HTTPS in transit, Supabase encryption at rest
- [x] Input validation: Zod schema validation pada semua user inputs
- [x] SQL injection prevention: Prisma ORM parameterized queries
- [x] XSS prevention: React auto-escaping + CSP headers
- [x] CSRF protection: SameSite cookie + CSRF token
- [x] Rate limiting: API rate limiting per IP (Express middleware)
- [x] File upload validation: Type check, size limit (max 5MB), sanitize filename
- [x] JWT security: HttpOnly cookies, Secure flag, short-lived access tokens (15min), refresh token rotation
- [x] AI API Key Security: Enkripsi AES-256-GCM at rest di database, masked display (`sk-***`), dan server-side proxy API (landing page frontend tidak pernah memegang API Key langsung)
- [x] AI Prompt Injection Defense: System prompt lock server-side, Off-topic scope classifier / rejection guardrails, & prompt sanitization

### 7.3 Accessibility

- [x] WCAG 2.1 AA compliance (landing page terutama)
- [x] Keyboard navigation support pada semua interactive elements
- [x] Screen reader compatibility (ARIA labels, roles)
- [x] Color contrast ratios ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- [x] Focus indicators visible pada semua focusable elements
- [x] Respect `prefers-reduced-motion` untuk animasi

### 7.4 Scalability

- Expected growth: 10-50 leads/bulan (awal), scalable ke 200+
- Data volume: ~100 records/bulan (leads, deals, tasks, activities)
- Scaling strategy: Vercel auto-scaling (serverless), Supabase managed PostgreSQL
- File storage: Supabase Bucket Storage (scalable)

### 7.5 Compatibility

- Browsers: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ (last 2 versions)
- Devices: Desktop (1024px+), Tablet (768-1023px), Mobile (320-767px)
- OS: iOS 15+, Android 10+, Windows 10+, macOS 12+
- PWA: Installable on mobile & desktop, offline mode untuk admin panel (cached data)

---

## 8. Tech Stack & Architecture

### 8.1 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js (App Router) | SSR/SSG, routing, API routes |
| **PWA** | next-pwa / serwist | Offline capability, installable |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **UI Components** | Shadcn UI (`npx shadcn@latest init`) | Base component library |
| **UI Components** | Untitled UI (`npx untitledui@latest init --nextjs`) | Additional UI components |
| **Animations** | Framer Motion | Layout animations, transitions |
| **Animations** | AnimeJS (`npm install animejs`) | Timeline/imperative animations |
| **Animations** | Animate UI (`npx shadcn@latest add @animate-ui/...`) | Pre-built animated components |
| **State Management** | Zustand | Client-side global state |
| **Backend** | Express JS (TypeScript) | API server, business logic |
| **Database** | Supabase PostgreSQL | Relational data storage |
| **File Storage** | Supabase Bucket Storage | PRD files, avatar uploads |
| **ORM** | Prisma | Database schema, migrations, queries |
| **Auth** | Better Auth + JWT | Authentication & session management |
| **CAPTCHA** | hCaptcha / reCAPTCHA v3 | Bot protection untuk AI chat |
| **AI** | Gemini API / OpenAI API | PRD generation via chat |
| **Deployment** | Vercel | Frontend + API deployment |
| **Version Control** | GitHub | `dev` branch + `main` branch |

### 8.2 Project Structure (Proposed)

```
CRM-Management-Project/
├── .github/
│   └── workflows/         # CI/CD pipelines
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── public/
│   ├── icons/             # PWA icons
│   └── manifest.json      # PWA manifest
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (landing)/     # Landing page routes (public)
│   │   │   ├── page.tsx           # Landing page utama
│   │   │   ├── prd-builder/       # AI PRD Builder page
│   │   │   ├── submit/            # PRD submission page
│   │   │   └── confirmation/      # Confirmation page
│   │   ├── admin/         # Admin panel routes (protected)
│   │   │   ├── login/             # Login page
│   │   │   ├── dashboard/         # Dashboard
│   │   │   ├── deals/             # Deals Pipeline Kanban
│   │   │   ├── projects/          # Project Task Board
│   │   │   ├── leads/             # Leads Management
│   │   │   ├── activities/        # Sales Activities
│   │   │   ├── notifications/     # Notifications
│   │   │   └── profile/           # Profile & Settings
│   │   ├── api/           # API Routes (Next.js)
│   │   │   ├── auth/              # Better Auth API
│   │   │   ├── leads/             # Leads CRUD API
│   │   │   ├── deals/             # Deals CRUD API
│   │   │   ├── projects/          # Projects API
│   │   │   ├── tasks/             # Tasks CRUD API
│   │   │   ├── activities/        # Activities API
│   │   │   ├── notifications/     # Notifications API
│   │   │   ├── ai/                # AI Chat API (PRD Builder)
│   │   │   ├── captcha/           # CAPTCHA verification API
│   │   │   └── upload/            # File upload API
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── ui/            # Shadcn UI components
│   │   ├── animate-ui/    # Animate UI components
│   │   ├── landing/       # Landing page components
│   │   ├── admin/         # Admin panel components
│   │   │   ├── kanban/            # Kanban board components
│   │   │   ├── trello/            # Trello board components
│   │   │   ├── leads/             # Leads components
│   │   │   └── dashboard/         # Dashboard components
│   │   └── shared/        # Shared components
│   ├── lib/
│   │   ├── auth.ts        # Better Auth configuration
│   │   ├── prisma.ts      # Prisma client instance
│   │   ├── supabase.ts    # Supabase client
│   │   ├── ai.ts          # AI service (Gemini/OpenAI)
│   │   └── utils.ts       # Utility functions
│   ├── store/
│   │   ├── useAuthStore.ts        # Auth state
│   │   ├── useDealsStore.ts       # Deals state
│   │   ├── useTasksStore.ts       # Tasks state
│   │   ├── useLeadsStore.ts       # Leads state
│   │   └── useNotificationStore.ts # Notification state
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types/interfaces
│   └── middleware.ts      # Auth middleware (protected routes)
├── server/                # Express JS backend (if separate)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   └── index.ts
├── .env.local             # Environment variables
├── .env.example           # Environment template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
├── package.json
├── PRD.md                 # This document
└── README.md              # Project documentation
```

### 8.3 Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Auth & User ──────────────────────────
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String    // hashed
  avatar        String?   // Supabase Storage URL
  bio           String?
  hourlyRate    Decimal?  @default(0) @db.Decimal(10, 2)
  timezone      String?   @default("Asia/Jakarta")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  deals         Deal[]
  tasks         Task[]
  activities    Activity[]
  notifications Notification[]
  sessions      Session[]
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  refreshToken String?  @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ─── Leads ────────────────────────────────
model Lead {
  id            String     @id @default(cuid())
  name          String
  company       String?
  email         String
  phone         String?
  source        LeadSource @default(LANDING_PAGE)
  status        LeadStatus @default(NEW)
  notes         String?    @db.Text
  prdFileUrl    String?    // Supabase Storage URL
  appTitle      String?    // Nama aplikasi dari form
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  deals         Deal[]
  activities    Activity[]
}

enum LeadSource {
  LANDING_PAGE
  REFERRAL
  SOCIAL_MEDIA
  DIRECT
  OTHER
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  UNQUALIFIED
  CONVERTED
}

// ─── Deals Pipeline ───────────────────────
model Deal {
  id            String    @id @default(cuid())
  title         String
  value         Decimal?  @db.Decimal(15, 2)
  currency      String    @default("IDR")
  stage         DealStage @default(NEW_LEAD)
  description   String?   @db.Text
  expectedClose DateTime?
  order         Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  leadId        String?
  lead          Lead?     @relation(fields: [leadId], references: [id], onDelete: SetNull)

  ownerId       String?
  owner         User?     @relation(fields: [ownerId], references: [id], onDelete: SetNull)

  project       Project?
}

enum DealStage {
  NEW_LEAD
  CONTACTED
  PROPOSAL_SENT
  NEGOTIATION
  WON
  LOST
}

// ─── Projects & Tasks ─────────────────────
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?  @db.Text
  status      ProjectStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  dealId      String?  @unique
  deal        Deal?    @relation(fields: [dealId], references: [id], onDelete: SetNull)

  tasks       Task[]
}

enum ProjectStatus {
  ACTIVE
  ON_HOLD
  COMPLETED
  CANCELLED
}

model Task {
  id          String       @id @default(cuid())
  title       String
  description String?      @db.Text
  status      TaskStatus   @default(BACKLOG)
  priority    TaskPriority @default(MEDIUM)
  dueDate     DateTime?
  order       Int          @default(0)
  labels      String[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  projectId   String
  project     Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)

  assigneeId  String?
  assignee    User?        @relation(fields: [assigneeId], references: [id], onDelete: SetNull)
}

enum TaskStatus {
  BACKLOG
  TODO
  IN_PROGRESS
  REVIEW
  DONE
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

// ─── Activities ───────────────────────────
model Activity {
  id          String       @id @default(cuid())
  type        ActivityType
  title       String
  description String?      @db.Text
  date        DateTime     @default(now())
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  leadId      String?
  lead        Lead?        @relation(fields: [leadId], references: [id], onDelete: SetNull)
}

enum ActivityType {
  CALL
  EMAIL
  MEETING
  NOTE
  FOLLOW_UP
}

// ─── Notifications ────────────────────────
model Notification {
  id        String           @id @default(cuid())
  type      NotificationType
  title     String
  message   String
  isRead    Boolean          @default(false)
  link      String?
  createdAt DateTime         @default(now())

  userId    String
  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum NotificationType {
  NEW_LEAD
  DEAL_UPDATE
  TASK_ASSIGNED
  REMINDER
  SYSTEM
}

// ─── PRD Submissions ──────────────────────
model PrdSubmission {
  id            String   @id @default(cuid())
  appTitle      String
  companyName   String
  contactPhone  String
  email         String
  prdFileUrl    String
  prdContent    String?  @db.Text
  estimatedHours Decimal? @db.Decimal(10, 2)
  estimatedCost  Decimal? @db.Decimal(15, 2)
  status        SubmissionStatus @default(PENDING)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum SubmissionStatus {
  PENDING
  REVIEWED
  CONTACTED
  CONVERTED
  REJECTED
}

// ─── AI Provider Settings ──────────────────
model AiProvider {
  id              String   @id @default(cuid())
  providerKey     String   @unique // e.g. "GEMINI", "OPENAI", "ANTHROPIC", "GROQ", "DEEPSEEK"
  name            String   // e.g. "Google Gemini", "OpenAI"
  apiKey          String   // encrypted with AES-256-GCM
  isActive        Boolean  @default(false)
  isDefault       Boolean  @default(false)
  selectedModel   String?  // e.g. "gemini-1.5-flash", "gpt-4o"
  availableModels String[] // Array of auto-loaded models from provider API
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model AiSystemPrompt {
  id                String   @id @default(cuid())
  systemInstruction String   @db.Text // Custom System Prompt Rules
  scopeRestriction  String   @db.Text // Guardrails to restrict strictly to project scope
  hourlyRate        Decimal  @default(250000) @db.Decimal(10, 2)
  currency          String   @default("IDR")
  offTopicMessage   String   @default("Maaf, saya adalah AI PRD Consultant yang khusus membantu perancangan requirement proyek aplikasi. Mari fokus pada pembahasan fitur dan kebutuhan aplikasi Anda.")
  updatedAt         DateTime @updatedAt
}

// ─── Master Data Management ─────────────────
model MasterLabel {
  id        String   @id @default(cuid())
  name      String   @unique // e.g. "Frontend", "Backend", "UI/UX", "Security", "AI/ML"
  color     String   // Color hex e.g. "#3b82f6"
  bgClass   String   // Tailwind class e.g. "bg-blue-500/20"
  textClass String   // Tailwind class e.g. "text-blue-300"
  borderClass String // Tailwind class e.g. "border-blue-500/30"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ─── Landing Page Content CMS ───────────────
model LandingContent {
  id          String   @id @default(cuid())
  sectionKey  String   @unique // "HERO", "CONSULTING", "CALCULATOR", "PROCESS", "TESTIMONIALS", "FOOTER"
  contentJson Json     // Full JSON state for section elements (text, icons, buttons, cards)
  updatedAt   DateTime @updatedAt
}

model TestimonialItem {
  id        String   @id @default(cuid())
  author    String
  role      String
  company   String
  avatarUrl String   @db.Text // Data URL or Image URL
  category  String   // "E-Commerce", "SaaS Web App", "Mobile App", "CRM Platform"
  rating    Int      @default(5)
  quote     String   @db.Text
  metrics   String?
  date      String?
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ─── Task Sub-Checklists & Comments ─────────
model TaskChecklist {
  id        String   @id @default(cuid())
  taskId    String
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  text      String
  completed Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
}

model TaskComment {
  id           String   @id @default(cuid())
  taskId       String
  task         Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  authorName   String
  authorAvatar String?
  text         String   @db.Text
  createdAt    DateTime @default(now())
}
```

### 8.4 API Endpoints Design

#### Public API (Landing Page)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/captcha/verify` | Verify CAPTCHA token | No |
| POST | `/api/ai/chat` | Send message to AI PRD builder | CAPTCHA verified |
| POST | `/api/ai/generate-prd` | Generate/update PRD from chat context | CAPTCHA verified |
| POST | `/api/upload/prd` | Upload PRD file to Supabase Storage | No (rate limited) |
| POST | `/api/submissions` | Submit PRD + client data | No (rate limited) |

#### Admin API (Protected — JWT Required)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/logout` | Logout (revoke token) | JWT |
| POST | `/api/auth/refresh` | Refresh access token | Refresh Token |
| GET | `/api/auth/me` | Get current user | JWT |
| GET | `/api/leads` | List all leads (paginated + filterable) | JWT |
| GET | `/api/leads/:id` | Get lead detail | JWT |
| POST | `/api/leads` | Create lead | JWT |
| PATCH | `/api/leads/:id` | Update lead | JWT |
| DELETE | `/api/leads/:id` | Delete lead | JWT |
| GET | `/api/deals` | List all deals (grouped by stage) | JWT |
| GET | `/api/deals/:id` | Get deal detail | JWT |
| POST | `/api/deals` | Create deal | JWT |
| PATCH | `/api/deals/:id` | Update deal (including stage change) | JWT |
| DELETE | `/api/deals/:id` | Delete deal | JWT |
| PATCH | `/api/deals/reorder` | Reorder deals within/across stages | JWT |
| GET | `/api/projects` | List all projects | JWT |
| GET | `/api/projects/:id` | Get project with tasks | JWT |
| POST | `/api/projects` | Create project | JWT |
| PATCH | `/api/projects/:id` | Update project | JWT |
| DELETE | `/api/projects/:id` | Delete project | JWT |
| GET | `/api/tasks` | List tasks (by project, filterable) | JWT |
| POST | `/api/tasks` | Create task | JWT |
| PATCH | `/api/tasks/:id` | Update task (status, priority, etc.) | JWT |
| DELETE | `/api/tasks/:id` | Delete task | JWT |
| PATCH | `/api/tasks/reorder` | Reorder tasks within/across columns | JWT |
| GET | `/api/activities` | List activities (paginated) | JWT |
| POST | `/api/activities` | Create activity | JWT |
| PATCH | `/api/activities/:id` | Update activity | JWT |
| DELETE | `/api/activities/:id` | Delete activity | JWT |
| GET | `/api/notifications` | List notifications | JWT |
| PATCH | `/api/notifications/:id/read` | Mark notification as read | JWT |
| PATCH | `/api/notifications/read-all` | Mark all as read | JWT |
| GET | `/api/profile` | Get admin profile | JWT |
| PATCH | `/api/profile` | Update profile | JWT |
| PATCH | `/api/profile/password` | Change password | JWT |
| POST | `/api/profile/avatar` | Upload avatar | JWT |
| GET | `/api/dashboard/stats` | Get dashboard statistics | JWT |
| GET | `/api/dashboard/charts` | Get chart data (deals trend, revenue) | JWT |
| GET | `/api/dashboard/recent` | Get recent activities | JWT |
| GET | `/api/submissions` | List PRD submissions | JWT |
| PATCH | `/api/submissions/:id` | Update submission status | JWT |
| GET | `/api/admin/ai-providers` | List all AI provider settings & masked keys | JWT |
| POST | `/api/admin/ai-providers` | Save or update AI provider API key & setting | JWT |
| PATCH | `/api/admin/ai-providers/:id/toggle` | Toggle Active/Inactive status | JWT |
| POST | `/api/admin/ai-providers/:id/test` | Test connection & auto-load models list | JWT |
| PATCH | `/api/admin/ai-providers/:id/set-default` | Set provider as default for Landing Page AI Chat | JWT |
| GET | `/api/admin/ai-prompts` | Get current system prompt, scope guardrails & pricing rules | JWT |
| PATCH | `/api/admin/ai-prompts` | Save/Update system prompt injection & pricing rules | JWT |
| POST | `/api/admin/ai-prompts/simulate` | Test guardrails against sample user inputs | JWT |
| POST | `/api/leads/:id/convert` | 1-Click convert lead to deal pipeline | JWT |
| GET | `/api/admin/master-labels` | Get dynamic master labels list | JWT |
| POST | `/api/admin/master-labels` | Create new master label with color preset | JWT |
| DELETE | `/api/admin/master-labels/:id` | Delete master label | JWT |
| GET | `/api/admin/landing-content` | Get landing page CMS section content JSON | JWT |
| PATCH | `/api/admin/landing-content` | Update landing page CMS section content JSON | JWT |

### 8.5 Git Branching Strategy

```
main (production)
  └── dev (development)
       ├── feature/landing-page
       ├── feature/ai-prd-builder
       ├── feature/admin-auth
       ├── feature/dashboard
       ├── feature/deals-kanban
       ├── feature/project-tasks
       ├── feature/leads-management
       ├── feature/activities
       ├── feature/notifications
       └── feature/profile
```

**Workflow:**
1. Buat feature branch dari `dev`
2. Develop & commit di feature branch
3. PR → `dev` (review + CI checks)
4. Merge ke `dev` (staging/testing)
5. Setelah stable → PR `dev` → `main` (production release)
6. Deploy `main` ke Vercel (auto-deploy)

---

## 9. Dependencies & Risks

### 9.1 Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|-----------|-------|--------|-------------------|
| Supabase account & project setup | Owner | To Setup | High — no database |
| AI API key (Gemini/OpenAI) | Owner | To Setup | High — no PRD builder |
| CAPTCHA service account | Owner | To Setup | Medium — bisa pakai simple fallback |
| Vercel account & project setup | Owner | To Setup | Medium — bisa deploy manual |
| Domain name (optional) | Owner | To Setup | Low — bisa pakai .vercel.app |
| Better Auth library compatibility | Open Source | Available | Medium — bisa fallback ke NextAuth |

### 9.2 Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| AI token cost terlalu tinggi | Medium | High | CAPTCHA + rate limiting + session limits + token budget cap |
| CAPTCHA UX mengganggu user | Low | Medium | Gunakan reCAPTCHA v3 (invisible) + fallback ke v2 jika suspicious |
| Kanban drag-drop buggy di mobile | Medium | Medium | Gunakan library mature (dnd-kit/react-beautiful-dnd) + testing intensif |
| Better Auth breaking changes | Low | Medium | Lock dependency version + fallback plan |
| Supabase downtime | Low | High | Implement client-side cache + graceful degradation |
| AI menghasilkan PRD tidak akurat | Medium | Medium | Prompt engineering + user review step wajib + edit capability |
| Performance issue pada banyak deals/tasks | Low | Medium | Virtualized lists + pagination + lazy loading |

### 9.3 Assumptions

- Owner hanya satu orang (single admin) untuk v1.0
- AI API (Gemini/OpenAI) tersedia dan bisa diakses dari Vercel
- Calon klien tidak memerlukan login untuk menggunakan landing page
- Supabase free tier cukup untuk awal (bisa upgrade nanti)
- Vercel free/pro tier cukup untuk deployment awal

### 9.4 Constraints

- **Budget:** Minimal — menggunakan free tier sebanyak mungkin (Supabase, Vercel)
- **Timeline:** Target 8-12 sprint (16-24 minggu) untuk v1.0 complete
- **Technical:** Browser support hanya modern browsers (no IE11)
- **Team:** Single developer (owner) — semua development sendiri
- **AI Token:** Budget token AI terbatas — perlu rate limiting yang ketat

---

## 10. Timeline & Milestones

| Phase | Sprint | Milestone | Target | Owner |
|-------|--------|-----------|--------|-------|
| Foundation | Sprint 1-2 | Project setup: Next.js + Prisma + Supabase + Auth + Tailwind + Shadcn + Untitled UI | Week 1-4 | Dev |
| Landing Page | Sprint 3-4 | Landing page complete: Hero, Services, Consulting sections | Week 5-8 | Dev |
| AI PRD Builder | Sprint 5-6 | AI PRD Builder: CAPTCHA, Questionnaire, Chat, Preview, Download | Week 9-12 | Dev |
| PRD Submission | Sprint 7 | PRD submission flow: Form, Upload, Confirmation | Week 13-14 | Dev |
| Admin Auth | Sprint 7 | Admin Login/Logout dengan Better Auth + JWT | Week 13-14 | Dev |
| Dashboard | Sprint 8 | Admin Dashboard: Stats, Charts, Recent Activities | Week 15-16 | Dev |
| Deals Pipeline | Sprint 9 | Deals Pipeline Kanban Board (drag & drop) | Week 17-18 | Dev |
| Project Tasks | Sprint 10 | Project Task Board Trello-style | Week 19-20 | Dev |
| Leads & CRM | Sprint 11 | Leads Management + Activities + Notifications | Week 21-22 | Dev |
| Polish & QA | Sprint 12 | Profile, Polish, PWA setup, Testing, Bug fixes | Week 23-24 | Dev |
| Launch | Post Sprint 12 | Production deployment to Vercel | Week 25 | Dev |

### Roadmap Phases (Berdasarkan PM Skill)

1. **Foundation** (Sprint 1-2): TypeScript strict, Next.js + Tailwind + Shadcn + Untitled UI setup, Prisma + Supabase schema, Better Auth, CI/CD pipeline, design tokens
2. **MVP — Landing Page** (Sprint 3-7): Landing page, AI PRD Builder, Submission flow, Admin Auth
3. **MVP — CRM Admin** (Sprint 8-11): Dashboard, Deals Kanban, Task Board, Leads, Activities, Notifications
4. **Polish & Launch** (Sprint 12+): PWA, Performance optimization, Testing, Bug fixes, Production deployment

---

## 11. Success Metrics

### 11.1 Key Metrics

| Metric | Current | Target (3 bulan) | Measurement Method |
|--------|---------|-------------------|--------------------|
| Leads per bulan | 0 | 10-20 | Database count (PrdSubmission) |
| PRD completion rate | N/A | > 60% | Chat sessions completed vs started |
| Deal conversion rate | N/A | > 30% | Won deals / Total leads |
| Admin panel usage | N/A | Daily active | Login frequency tracking |
| Landing page bounce rate | N/A | < 40% | Analytics (Vercel Analytics) |
| AI Chat satisfaction | N/A | > 4/5 | Post-chat rating (optional) |

### 11.2 OKRs

**Objective:** Membangun platform yang mempercepat akuisisi klien dan mengelola proyek secara efisien

| Key Result | Target | Deadline |
|-----------|--------|----------|
| KR1: Landing page live dan menerima leads | 100% complete | Sprint 7 |
| KR2: Admin CRM fully functional | 100% complete | Sprint 12 |
| KR3: Mendapatkan 5 leads pertama melalui platform | 5 leads | Month 1 post-launch |

### 11.3 Success Criteria for Launch

- [ ] Landing page loads dalam < 2.5s (LCP)
- [ ] AI PRD Builder bisa generate PRD dalam < 10 menit chat session
- [ ] CAPTCHA berhasil memblokir 99% bot requests
- [ ] Admin panel accessible hanya setelah login
- [ ] Kanban drag-drop smooth tanpa lag
- [ ] Semua form validation berjalan dengan benar
- [ ] PWA installable di mobile
- [ ] Lighthouse score ≥ 90 (landing page)
- [ ] Zero critical security vulnerabilities

---

## 12. QA Collaboration Notes

> 🤝 **PM-QA Early Collaboration:** Dokumen ini telah di-review bersama QA untuk memastikan test strategy siap sejak awal.

### QA Focus Areas

1. **Security Testing (🔴 Critical):**
   - Admin auth flow: login, JWT rotation, protected routes, session expiry
   - CAPTCHA effectiveness: bot prevention, rate limiting
   - Input validation: XSS, SQL injection, file upload malware
   - API authorization: semua admin endpoints memerlukan valid JWT

2. **Functional Testing (🟠 High):**
   - AI Chat: response accuracy, session management, error handling
   - Kanban Board: drag-drop across columns, data persistence, concurrent access
   - Task Board: CRUD operations, ordering, status transitions
   - Leads Management: CRUD, search, filter, auto-create from landing page
   - File upload: PRD.md upload, download, storage

3. **Performance Testing (🟡 Medium):**
   - Landing page load time (Core Web Vitals)
   - AI chat response time
   - Kanban rendering with many cards (50+ per column)
   - API response time under load

4. **UI/UX Testing (🟡 Medium):**
   - Responsive design: Mobile (P1) → Tablet (P2) → Desktop (P3)
   - Dark mode consistency
   - Animation performance (60fps, no jank)
   - Accessibility (keyboard nav, screen reader, contrast)

### Testing Strategy (Per QA Skill)

- **Unit Tests**: Vitest — utility functions, hooks, services
- **Component Tests**: React Testing Library — UI components
- **API Tests**: Supertest — Express endpoints
- **E2E Tests**: Playwright — critical flows (landing → PRD → submit, admin login → dashboard → kanban)
- **Visual Regression**: Manual review (automated via Chromatic if budget allows)
- **Load Testing**: k6 — API endpoints under simulated load

---

## 13. Appendix

### A. Glossary

| Term | Definition |
|------|-----------|
| PRD | Product Requirements Document — dokumen requirement produk |
| CRM | Customer Relationship Management — sistem manajemen hubungan pelanggan |
| Kanban | Metode visual project management dengan board dan cards |
| JWT | JSON Web Token — standar token untuk autentikasi |
| CAPTCHA | Completely Automated Public Turing test — verifikasi anti-bot |
| PWA | Progressive Web App — web app yang bisa diinstall seperti native app |
| RBAC | Role-Based Access Control — kontrol akses berbasis role |
| CRUD | Create, Read, Update, Delete — operasi dasar data |
| ORM | Object-Relational Mapping — abstraksi database |
| LCP | Largest Contentful Paint — metrik performa halaman web |

### B. References

- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- [Untitled UI Components](https://untitledui.com)
- [Animate UI Installation](https://animate-ui.com/docs/installation)
- [Better Auth Documentation](https://better-auth.com)
- [Prisma Documentation](https://prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Framer Motion](https://motion.dev)
- [AnimeJS](https://animejs.com)
- [Zustand](https://zustand-demo.pmnd.rs)

### C. Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1.0 | 2026-08-06 | PM Team (AI-Assisted) | Initial draft — complete PRD |
