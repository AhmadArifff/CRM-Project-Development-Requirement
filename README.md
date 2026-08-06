# DevPulse Studio — Digital App Consultancy & AI PRD Engine 🚀

![DevPulse Studio Banner](https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80)

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**DevPulse Studio** adalah platform konsultasi digital dan engine pembuatan dokumen PRD (*Product Requirement Document*) otomatis berbasis kecerdasan buatan (AI) yang dikembangkan oleh **Ahmad Arif (Developer)**. Platform ini membantu klien bisnis, pendiri startup, dan manajer produk dalam menganalisis kebutuhan aplikasi (Mobile, Web, Cross-Platform), merekomendasikan arsitektur server, dan menghitung estimasi biaya secara transparan sebelum masuk ke tahap pengembangan aplikasi.

---

## 🌟 Fitur Utama (Key Features)

### 1. 🤖 AI PRD Builder & Interactive Questionnaire
- **Interaktif Questionnaire**: Pengisian kebutuhan non-teknis dengan rekomendasi AI otomatis (autofill jawaban esay & highlight pilihan ganda).
- **Interactive AI Chatbot**: Asisten AI bergaya Notion yang memverifikasi kebutuhan dan memperbarui draft PRD secara langsung.
- **Preview PRD Notion Style**: Tampilan dokumen PRD.md yang terstruktur rapi dengan poin ringkasan, arsitektur sistem, pilihan tech stack, dan alokasi waktu.

### 2. 🧮 Rate Calculator & Estimasi Biaya Transparan
- Hitung estimasi investasi proyek berdasarkan jumlah jam kerja riil dikalikan rate hourly yang fleksibel.
- Preset jam pengerjaan (Small MVP, Medium App, Full Enterprise Platform).

### 3. 🎨 Figma Studio Visual Landing CMS (`/admin/landing-content`)
- **Workspace 3 Kolom ala Figma Studio**: Panel Layers Tree Navigator, Central Live Viewport Canvas, dan Properties Inspector.
- **Real-Time Auto-Scroll Focus**: Section yang sedang di-highlight otomatis meluncur halus (*smooth scroll*) ke posisi paling atas viewport.
- **Upload File Gambar Lokal (`ImageUploadPicker`)**: Dukungan upload file gambar dari komputer (Data URL persistent) & link URL.
- **100% Elemen Editable**: Seluruh teks, tombol CTA, grid ikon Lucide, dan foto testimoni klien dapat dikelola tanpa menyentuh codebase.

### 4. 💼 CRM Admin Panel & Master Data Management
- **Lead-to-Deal Conversion (1-Click)**: Konversi data propek klien dari kuisioner langsung menjadi deal proyek CRM.
- **Workspace Trello Kanban (`/admin/tasks`)**: Pengelolaan task proyek dengan Rich WYSIWYG Markdown Editor Toolbar.
- **Dynamic Master Data CRUD**: Kelola label, prioritas, dan kategori data secara dinamis dari antarmuka Admin Panel.

---

## 🛠️ Teknologi & Stack (Tech Stack)

- **Developer**: Ahmad Arif
- **Frontend Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Glassmorphism Aesthetics
- **State Management**: Zustand
- **Icons & Animation**: Lucide React & Framer Motion
- **CMS Canvas Engine**: Figma Studio Live Canvas Viewport

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
   ```bash
   npm run dev
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

Proyek ini dilindungi di bawah [Lisensi MIT](LICENSE). Dibuat dengan ❤️ oleh **Ahmad Arif (Developer)** untuk **DevPulse Studio**.
