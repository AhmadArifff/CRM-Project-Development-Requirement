# DevPulse Studio — Digital App Consultancy & AI PRD Architecture Engine 🚀

![DevPulse Studio Hero Banner](public/screenshots/01_landing_hero.png)

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**DevPulse Studio** adalah ekosistem konsultasi teknologi dan platform perancangan dokumen PRD (*Product Requirement Document*) otomatis berbasis kecerdasan buatan (AI) yang dikembangkan oleh **Ahmad Arif (Full-Stack AI Engineer & System Architect)**.

Platform ini mengintegrasikan **AI Product Manager (/pm)**, diagram arsitektur visual **Mermaid.js**, **Visual CMS Canvas Studio**, dan **Enterprise CRM Control Panel** untuk membantu klien bisnis dan pendiri startup merancang, mengestimasi, dan memonitor pengembangan aplikasi digital secara transparan.

---

## 📸 Tampilan Antarmuka Aplikasi (Showcase Galeri)

### 1. 🛡️ Security Gate: Interactive Sliding Jigsaw Puzzle CAPTCHA
Proteksi anti-bot presisi tinggi dengan mekanika potongan puzzle HTML5 Canvas bezier clip-paths sebelum mengakses wizard pembuatan PRD.
![Security Gate Puzzle CAPTCHA](public/screenshots/02_puzzle_captcha.png)

---

### 2. 🤖 AI PRD Builder & Live Document dengan Diagram Mermaid (DevPulse Studio Pro)
Wizard kuesioner cerdas terintegrasi OpenRouter AI yang menghasilkan dokumen PRD.md berstandar **DevPulse Studio Pro** lengkap dengan diagram arsitektur multi-tier, alur logika sequence diagram, ERD database, dan user stories.
![AI PRD Builder & Live Document](public/screenshots/03_prd_builder_notion.png)

---

### 3. 🔐 Portal Admin Login & Quick Testing Access
Antarmuka login administrator yang aman dengan enkripsi password *bcrypt*, JWT Token, dan tombol **⚡ 1-Click Quick Login** untuk testing instan.
![Admin Login Portal](public/screenshots/04_admin_login.png)

---

### 4. 📊 Overview CRM Analytics & Control Portal
Pusat statistik data prospek (*leads*), grafik area tren performa penjualan 6 bulan, nilai proyek dalam pipeline, dan aktivitas pengerjaan.
![CRM Overview Dashboard](public/screenshots/05_crm_dashboard.png)

---

### 5. 🎨 DevPulse Live Canvas Visual CMS (`/admin/landing-content`)
Penyunting konten visual 3 kolom: *Layers Tree Navigator*, *Central Live Viewport Canvas*, dan *Properties Inspector* dengan auto-scroll focus dan upload gambar.
![DevPulse Live Canvas Visual CMS](public/screenshots/06_figma_studio_cms.png)

---

### 6. 📋 Project Task Board (DevPulse Kanban Workspace)
Manajemen kartu tugas proyek interaktif berbasis status (*Backlog, To Do, In Progress, In Review, Done*) dengan *Rich Markdown Editor* dan *Task Checklist*.
![Project Tasks Kanban Workspace](public/screenshots/07_trello_kanban.png)

---

### 7. 💼 Deals Pipeline Kanban Board (`/admin/deals`)
Pipeline sales CRM untuk memonitor progres negosiasi deal proyek dari *New Lead* hingga *Deal Won* dengan efek animasi konfeti 60fps.
![Deals Pipeline Kanban](public/screenshots/08_deals_pipeline.png)

---

## 🌟 Fitur Utama & Inovasi Terbaru (Key Features)

### 1. 🤖 AI PRD Builder Studio (/pm)
- **Multi-Model OpenRouter Engine**: Pilihan model AI gratis (*MiniMax M3 1M Context*, *Poolside Laguna*, *NVIDIA Nemotron 3 Ultra*, *Google Gemma 4*, *Z.ai GLM 5.2*).
- **Live Token Typewriter Streaming**: Animasi pengetikan karakter secara *real-time* ke dalam dokumen PRD.md dengan opsi *Lewati Animasi*.
- **Interactive Mermaid Zoom & Pan Modal**: Inspeksi diagram arsitektur dengan modal fullscreen, kontrol zoom in/out, reset, serta ekspor format SVG.
- **Full Keyboard Navigation**: Pemilihan opsi kuisioner menggunakan tombol angka `1` - `6`, `Enter ↵` untuk melanjutkan, dan `Backspace` / `←` untuk kembali.
- **Table of Contents (TOC) & Clean PDF Export**: Navigasi cepat ke 8 bab dokumen PRD dan tombol ekspor PDF siap cetak dengan stylesheet `@media print` kontras tinggi.

### 2. 🧮 Dynamic Rate Calculator & Add-On Chips
- **Rolling Counter 60fps**: Perhitungan estimasi biaya (`Total Jam × Rate Per Jam`) berputar mulus dengan kurva *cubic ease-out*.
- **Interactive Add-On Chips**: Toggle instan fitur *Auth & 2FA*, *Payment Gateway Midtrans*, *Realtime WebSockets*, dan *Enterprise RBAC*.

### 3. 💼 Enterprise Admin CRM Control Panel
- **Tren Pertumbuhan Revenue & Leads Area Chart**: Grafik area SVG interaktif 6 bulan dengan kurva Bezier halus, metrik switcher, dan floating tooltip detail.
- **Won-Deal Confetti Celebration**: Semprotan partikel konfeti canvas dinamis saat deal proyek digeser ke tahap `Deal Won`.
- **Global Spotlight Command Palette (`Ctrl + K` / `Cmd + K`)**: Navigasi cepat ke seluruh halaman admin, deals aktif, leads, dan tugas proyek.
- **⚡ 1-Click Quick Testing Login**: Masuk ke Admin Panel seketika tanpa perlu mengetik manual email dan password.

---

## 🗄️ Arsitektur Basis Data & Status Live Data

Sistem menggunakan **Supabase PostgreSQL** dengan pooler connection berkecepatan tinggi dan Prisma ORM.

### Status Data Saat Ini (Live Records Check):
| No | Tabel / Model Database | Jumlah Data (Records) | Keterangan |
|---|---|---|---|
| 1 | `User` | **3** | Akun Super Admin & Developer |
| 2 | `Lead` | **3** | Prospek masuk dari form kuesioner |
| 3 | `Deal` | **3** | Deals aktif dalam sales pipeline |
| 4 | `Project` | **1** | Proyek aktif terhubung |
| 5 | `Task` | **3** | Kartu tugas sprint developer |
| 6 | `TaskChecklist` | **3** | Sub-tugas checklist kanban |
| 7 | `TaskComment` | **1** | Diskusi komentar tugas |
| 8 | `MasterLabel` | **6** | Label warna master task |
| 9 | `Activity` | **3** | Log riwayat aktivitas tim sales |
| 10 | `Notification` | **3** | Notifikasi sistem admin |
| 11 | `LandingContent` | **7** | Seksi CMS landing page editable |
| 12 | `AiProvider` | **4** | Konfigurasi provider AI |
| 13 | `AiSystemPrompt` | **1** | Guardrail instruksi sistem AI PM |
| 14 | `Session` | **0** | Sesi dinamis saat login aktif |
| 15 | `PrdSubmission` | **0** | Arsip submission form PRD |
| 16 | `TestimonialItem` | **0** | Ulasan klien |
| **Total** | **Semua Tabel** | **41 Records** | **Tersinkronisasi Penuh di Supabase** |

### Storage Buckets (Supabase Storage):
- `prd-documents`: Menyimpan file hasil generate PRD Markdown & PDF.
- `landing-assets`: Menyimpan aset gambar upload CMS Studio.
- `crm-attachments`: Menyimpan lampiran task dan deals CRM.
- `devpulse-storage`: Bucket publik umum.

---

## 🔐 Kredensial Quick Login (Testing Access)

Halaman login (`http://localhost:3000/admin/login`) telah dilengkapi dengan tombol **⚡ 1-Click Quick Login** untuk testing cepat:

| Akun | Email Login | Password Default | Role |
|---|---|---|---|
| **Super Admin (Ahmad Arif)** | `ahmadarif@devpulsestudio.dev` | `admin123` | `ADMIN` (Full Access) |
| **DevPulse Admin Alias** | `admin@devpulsestudio.dev` | `admin123` | `ADMIN` |
| **Personal Admin** | `ahmadarifff@gmail.com` | `admin123` | `ADMIN` |

> **Tips:** Cukup klik tombol **"Ahmad Arif (Super Admin) - Masuk ↵"** pada kotak Quick Testing di halaman login untuk langsung masuk ke dashboard dalam 1 klik!

---

## 🛠️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat
- Node.js versi 18.x atau lebih baru
- npm / yarn / pnpm

### 2. Klon Repositori
```bash
git clone https://github.com/AhmadArifff/CRM-Project-Development-Requirement.git
cd CRM-Project-Development-Requirement
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Lingkungan (`.env` dan `.env.local`)
Buat file `.env` di root direktori proyek:
```env
DATABASE_URL="postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="devpulse_studio_super_secret_jwt_key_2026"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://glcmtzzhqparuwdlfqbt.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
PORT=5000
```

### 5. Sinkronisasi Database & Seeding
```bash
npx prisma db push
npm run db:seed
```

### 6. Jalankan Server Pengembangan
```bash
npm run dev
```
Akses aplikasi melalui browser:
- **Landing Page & PRD Builder:** `http://localhost:3000`
- **Admin CRM Login:** `http://localhost:3000/admin/login`

### 7. Verifikasi Build Produksi
```bash
npm run build
```

---

## 🚀 Panduan Deployment Vercel

Aplikasi ini siap dideploy ke **Vercel** dengan arsitektur Fullstack Next.js 16 + Supabase PostgreSQL di region Singapore (`sin1`) untuk latensi ultra-rendah (<10ms).

Silakan baca panduan lengkap dan salin cepat variabel lingkungan di:
👉 **[VERCEL_ENV_SETUP.md](file:///c:/Users/ASUS/Documents/Web%20Dev/improving/CRM-Management-Project/VERCEL_ENV_SETUP.md)**

---

## 🔀 Kebijakan Branching & Git Merge Rule (10-Commit Threshold)

1. **Active Working Branch (`dev`)**: Seluruh penambahan fitur, bugfix, peningkatan UI/UX, dan pekerjaan harian **WAJIB** di-commit dan di-push ke branch `dev` (`git push origin dev`).
2. **10-Commit Threshold ke `main`**: Penggabungan (*merge*) dari branch `dev` ke branch `main` (`git checkout main && git merge dev && git push origin main`) **HANYA boleh dilakukan setelah terakumulasi kelipatan 10 commit di branch `dev`** sejak milestone merge terakhir.
3. **Branch `main`**: Dikhususkan sebagai branch rilis stabil produksi.

---

## 📄 Lisensi (License)

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE). Dikonsep, dirancang, dan dikembangkan oleh **Ahmad Arif** untuk **DevPulse Studio**.
