# DevPulse Studio — Digital App Consultancy & AI PRD Engine 🚀

![DevPulse Studio Landing Hero](public/screenshots/01_landing_hero.png)

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**DevPulse Studio** adalah platform konsultasi digital dan engine pembuatan dokumen PRD (*Product Requirement Document*) otomatis berbasis kecerdasan buatan (AI) yang dikembangkan oleh **Ahmad Arif (Developer)**. Platform ini membantu klien bisnis, pendiri startup, dan manajer produk dalam menganalisis kebutuhan aplikasi (Mobile, Web, Cross-Platform), merekomendasikan arsitektur server, dan menghitung estimasi biaya secara transparan sebelum masuk ke tahap pengembangan aplikasi.

---

## 📸 Tampilan Antarmuka Aplikasi (Application Showcase)

### 1. 🛡️ Security Gate: Interactive Sliding Jigsaw Puzzle CAPTCHA
Sistem proteksi anti-bot presisi tinggi dengan mekanika potongan puzzle HTML5 Canvas bezier clip-paths sebelum mengakses wizard pembuatan PRD.

![Security Gate Puzzle CAPTCHA](public/screenshots/02_puzzle_captcha.png)

---

### 2. 🤖 AI PRD Builder & Live Document dengan Diagram Mermaid (DevPulse Studio Pro)
Wizard kuesioner cerdas terintegrasi AI yang menghasilkan dokumen PRD.md berstandar **DevPulse Studio Pro** lengkap dengan diagram alur arsitektur sistem, user journey, ERD database, dan user stories.

![AI PRD Builder & Live Document](public/screenshots/03_prd_builder_notion.png)

---

### 3. 🔐 Portal Admin Login (Better Auth + JWT Token)
Antarmuka login administrator yang aman dengan enkripsi password *bcrypt*, *refresh token rotation*, dan autofill kredensial demo.

![Admin Login Portal](public/screenshots/04_admin_login.png)

---

### 4. 📊 Overview CRM Analytics & Control Portal
Pusat statistik data prospek (*leads*), nilai proyek dalam pipeline, aktivitas pengerjaan, dan ringkasan deal klien secara *real-time*.

![CRM Overview Dashboard](public/screenshots/05_crm_dashboard.png)

---

### 5. 🎨 DevPulse Live Canvas Visual CMS (`/admin/landing-content`)
Penyunting konten visual 3 kolom: *Layers Tree Navigator*, *Central Live Viewport Canvas*, dan *Properties Inspector* dengan dukungan upload gambar lokal.

![DevPulse Live Canvas Visual CMS](public/screenshots/06_figma_studio_cms.png)

---

### 6. 📋 Project Task Board (DevPulse Kanban Workspace)
Manajemen kartu tugas proyek interaktif berbasis status (*Backlog, To Do, In Progress, In Review, Completed*) dengan *Rich Markdown Editor* dan *Task Checklist*.

![Project Tasks Kanban Workspace](public/screenshots/07_trello_kanban.png)

---

### 7. 💼 Deals Pipeline Kanban Board (`/admin/deals`)
Pipeline sales CRM untuk memonitor progres negosiasi deal proyek dari tahap *New Lead*, *Contacted*, *Proposal Sent*, *Negotiation*, hingga *Deal Won*.

![Deals Pipeline Kanban](public/screenshots/08_deals_pipeline.png)

---

## 🌟 Fitur Utama (Key Features)

### 1. 🤖 AI PRD Builder & Interactive Questionnaire
- **Interaktif Questionnaire**: Pengisian kebutuhan non-teknis dengan rekomendasi AI otomatis (autofill jawaban esay & highlight pilihan ganda).
- **Interactive AI Chatbot**: Asisten AI **DevPulse Studio Pro** yang memverifikasi kebutuhan dan memperbarui draft PRD secara langsung.
- **Engine Diagram Mermaid**: Render visual dinamis untuk flowchart arsitektur multi-tier, alur logika sequence diagram, dan ERD skema basis data.

### 2. 🧮 Rate Calculator & Estimasi Biaya Transparan
- Hitung estimasi investasi proyek berdasarkan formula transparan: `Total Jam Kerja × Rate Per Jam`.
- Preset alokasi jam kerja modular untuk peluncuran cepat MVP hingga platform enterprise.

### 3. 🎨 DevPulse Live Canvas Visual CMS (`/admin/landing-content`)
- **Workspace 3 Kolom Modern**: Panel Layers Tree Navigator, Central Live Viewport Canvas, dan Properties Inspector.
- **Real-Time Auto-Scroll Focus**: Section yang sedang di-highlight otomatis meluncur halus (*smooth scroll*) ke posisi paling atas viewport.
- **Upload File Gambar Lokal (`ImageUploadPicker`)**: Dukungan upload file gambar dari komputer (Data URL persistent) & link URL.
- **100% Elemen Editable**: Seluruh teks, tombol CTA, grid ikon Lucide, dan foto testimoni klien dapat dikelola tanpa menyentuh codebase.

### 4. 💼 CRM Admin Panel & Master Data Management
- **Lead-to-Deal Conversion (1-Click)**: Konversi data prospek klien dari kuisioner langsung menjadi deal proyek CRM.
- **Workspace Kanban Tasks (`/admin/tasks`)**: Pengelolaan task proyek dengan DevPulse Rich Markdown Editor Toolbar.
- **Dynamic Master Data CRUD**: Kelola label, prioritas, dan kategori data secara dinamis dari antarmuka Admin Panel.

---

## 🛠️ Teknologi & Stack (Tech Stack)

- **Developer**: Ahmad Arif
- **Frontend Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Cyber Dark Glassmorphism
- **State Management**: Zustand
- **Diagramming Engine**: Mermaid.js
- **Icons & Animation**: Lucide React & Framer Motion
- **Database & Auth**: Supabase PostgreSQL & Express.js 5 REST API

---

## 🚀 Panduan Instalasi & Jalankan Lokal (Getting Started)

### Prasyarat
- Node.js versi 18.x atau lebih baru
- npm / yarn / pnpm

### Langkah-Langkah

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/AhmadArifff/CRM-Project-Development-Requirement.git
   cd CRM-Project-Development-Requirement
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Mode Dev Server**:
   Jalankan frontend (Next.js) dan backend (Express) secara bersamaan:
   ```bash
   npm run dev:all
   ```
   Buka browser di `http://localhost:3000`.

4. **Konfigurasi Database (.env)**:
   Buat file `.env` dan konfigurasikan URI Supabase Anda:
   ```env
   DATABASE_URL="postgresql://postgres.xxx:password@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.xxx:password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
   JWT_SECRET="secret_key"
   PORT=5000
   ```

5. **Migrasi Database & Seeding**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

6. **Build & Produksi**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔐 Akses Default Admin Panel

Setelah menjalankan `npm run db:seed`, Anda dapat login ke **Admin Panel** (`http://localhost:3000/admin/login`) menggunakan kredensial default berikut:

| Role | Email Login | Password |
|---|---|---|
| **Primary Admin** | `ahmadarif@devpulsestudio.dev` | `admin123` |
| **Admin Alias** | `admin@devpulsestudio.dev` | `admin123` |
| **Personal Admin** | `ahmadarifff@gmail.com` | `admin123` |

Semua autentikasi divalidasi langsung menggunakan **bcrypt** dan **JWT Token** melalui endpoint `/api/v1/auth/login` menuju live database Supabase.

---

## 🔀 Kebijakan Branching & Git Merge Rule (10 Commits Threshold)

Proyek ini menggunakan 2 branch utama dengan aturan merge milestone yang ketat:

- **`dev`**: Branch pengembangan aktif utama (*active working branch*). Seluruh pengerjaan fitur, bugfix, dan commit harian wajib di-push ke branch `dev`.
- **`main`**: Branch rilis stabil produksi (*stable production branch*). 
- 📌 **Aturan Threshold Merge**: Penggabungan (merge) dari branch `dev` ke branch `main` **HANYA dilakukan apabila commit di branch `dev` sudah mencapai kelipatan 10 kali commit/perubahan fitur** (`git checkout main && git merge dev && git push origin main`).

---

## 📄 Lisensi (License)

Proyek ini dilindungi di bawah [Lisensi MIT](LICENSE). Dikembangkan dan disusun sepenuhnya oleh **Ahmad Arif (Lead Developer & Author)** untuk **DevPulse Studio** ([DevPulseStudio.dev](https://devpulsestudio.dev)).
