# 🚀 Panduan Deployment Vercel & Environment Variables (DevPulse Studio CRM)

Dokumen ini adalah panduan resmi konfigurasi **Deployment Vercel** untuk **DevPulse Studio (CRM & AI PRD Engine)**, dirancang dengan format dan kejelasan yang identik dengan standar project monorepo **NabungID**.

---

## 🏛️ Pilihan Arsitektur Deployment di Vercel

Anda dapat memilih salah satu dari **2 Model Arsitektur Deployment** di bawah ini:

| Model | Deskripsi | Rekomendasi |
| :--- | :--- | :--- |
| **Model 1: Full-Stack All-in-One (Next.js 16)** | Frontend PWA + 19 REST API (`/api/v1/*`) + Prisma ORM berjalan terpadu dalam **1 Project Vercel tunggal**. | ⭐⭐⭐⭐⭐ **(Sangat Direkomendasikan)** — Tanpa kendala CORS, zero latensi antar-domain, dan otomatis hemat resource serverless Vercel. |
| **Model 2: Dual-Project (Seperti NabungID)** | **Project 1 (Backend API Express)** di folder `server/` dan **Project 2 (Frontend Next.js)** di root project. | ⭐⭐⭐⭐ Digunakan jika Anda ingin memisahkan traffic Express API dan Next.js Web secara independen. |

---

## 📋 SALIN CEPAT ENVIRONMENT VARIABLES

### 🔹 Opsi 1: Untuk Deployment Full-Stack Terpadu (1 Project Vercel - Recommended)
> Salin seluruh baris di bawah ini dan paste langsung ke form **Environment Variables** di Vercel Dashboard:

```env
DATABASE_URL=postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://glcmtzzhqparuwdlfqbt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcG11YXVza25kb3dvbnRiZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDY1NzcsImV4cCI6MjEwMTU4MjU3N30.1Hk7XWcOnpXYf0RKWPVqw298tyPcyxLkTXvTAPAkBOo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcG11YXVza25kb3dvbnRiZmh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwNjU3NywiZXhwIjoyMTAxNTgyNTc3fQ.iWfuiGtdDFaTtG7IZ3xbLsoeXc1LAHeU6xF_UDXyuvM
PORT=5000
JWT_SECRET=devpulse_studio_super_secret_jwt_key_2026
OPENROUTER_API_KEY=sk-or-v1-YOUR_OPENROUTER_API_KEY_HERE # (Ambil API key lengkap dari file .env lokal Anda)
SUPABASE_STORAGE_BUCKET_PRD=prd-documents
SUPABASE_STORAGE_BUCKET_ASSETS=landing-assets
SUPABASE_STORAGE_BUCKET_ATTACHMENTS=crm-attachments
```

---

### 🔹 Opsi 2: Untuk Model Dual-Project (Backend `server/` & Frontend `web`)

#### Project 1: Backend Express API (`server/`)
```env
DATABASE_URL=postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
PORT=5000
JWT_SECRET=devpulse_studio_super_secret_jwt_key_2026
OPENROUTER_API_KEY=sk-or-v1-YOUR_OPENROUTER_API_KEY_HERE # (Ambil dari file .env lokal)
CLIENT_URL=*
```

#### Project 2: Frontend Web Next.js (Root)
> Ganti `https://your-crm-api.vercel.app` dengan domain backend yang didapat dari Project 1 Backend!
```env
NEXT_PUBLIC_API_URL=https://your-crm-api.vercel.app
DATABASE_URL=postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.glcmtzzhqparuwdlfqbt:Cr1tbgg1AO6v4420@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://glcmtzzhqparuwdlfqbt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcG11YXVza25kb3dvbnRiZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDY1NzcsImV4cCI6MjEwMTU4MjU3N30.1Hk7XWcOnpXYf0RKWPVqw298tyPcyxLkTXvTAPAkBOo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcG11YXVza25kb3dvbnRiZmh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwNjU3NywiZXhwIjoyMTAxNTgyNTc3fQ.iWfuiGtdDFaTtG7IZ3xbLsoeXc1LAHeU6xF_UDXyuvM
JWT_SECRET=devpulse_studio_super_secret_jwt_key_2026
OPENROUTER_API_KEY=sk-or-v1-YOUR_OPENROUTER_API_KEY_HERE # (Ambil dari file .env lokal)
```

---

## 📊 Tabel Rincian Variabel Environment

| Nama Key | Nilai Resmi / Format | Fungsi & Lokasi Penggunaan |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.glcmtzzhqparuwdlfqbt:...@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` | **Supabase Transaction Pooler (Port 6543)** — Digunakan Prisma Client untuk query cepat hemat koneksi di Vercel Serverless. |
| `DIRECT_URL` | `postgresql://postgres.glcmtzzhqparuwdlfqbt:...@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` | **Supabase Direct Connection (Port 5432)** — Digunakan Prisma CLI saat eksekusi schema migration / push. |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://glcmtzzhqparuwdlfqbt.supabase.co` | Endpoint REST & Storage Supabase untuk upload file & media. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1Ni...` | Kunci otorisasi publik klien Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1Ni...` | Kunci server rahasia untuk administrasi bucket storage Supabase. *(Jangan diekspos ke klien)* |
| `JWT_SECRET` | `devpulse_studio_super_secret_jwt_key_2026` | Kunci enkripsi token login JWT Admin & Staff CRM. |
| `OPENROUTER_API_KEY` | `sk-or-v1-YOUR_KEY...` | API Key resmi OpenRouter untuk AI PRD Builder & AI Architect Chat. *(Ambil dari .env lokal Anda)* |
| `PORT` | `5000` | Port server lokal Express. |
| `NEXT_PUBLIC_API_URL` | `https://your-domain.vercel.app` | *(Opsional)* Jika menggunakan domain API terpisah. Jika fullstack 1 project, otomatis menggunakan relative path `/api/v1`. |

---

## ⚙️ Langkah-Langkah Deploy di Vercel Dashboard

### 1. Import Repository ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/dashboard) → Klik **Add New...** → **Project**.
2. Pilih repository: `AhmadArifff/CRM-Project-Development-Requirement`.
3. Biarkan **Root Directory** default `./` (jika menggunakan Model 1 Fullstack).

### 2. Konfigurasi Project Settings
- **Framework Preset:** `Next.js`
- **Build Command:** `prisma generate && next build` (Otomatis ditangani oleh `vercel.json` & `package.json`)
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 3. Masukkan Environment Variables
- Buka accordion **Environment Variables** di halaman setup Vercel.
- Salin blok variabel dari bagian **Salin Cepat Environment Variables** di atas.
- Klik **Paste**, lalu simpan.

### 4. Optimalisasi Region Serverless (Singapore - `sin1`)
File `vercel.json` yang sudah disiapkan otomatis mengarahkan serverless functions ke region:
```json
"regions": ["sin1"]
```
> [!TIP]
> **Keuntungan Region `sin1` (Singapore):** Karena database Supabase Anda berada di AWS Singapore (`aws-0-ap-southeast-1`), serverless functions Vercel di Singapore akan mengeksekusi query database dengan latensi ultra rendah (**< 10ms**) dibandingkan region default US (**> 250ms**).

### 5. Klik Deploy!
Tunggu proses build selesai (~1-2 menit). Vercel akan menghasilkan URL domain publik (misal: `https://crm-project-development-requirement.vercel.app`).

---

## 🗄️ Sinkronisasi Database Supabase Pasca Deploy

Jika database Anda baru dibuat ulang, pastikan tabel dan akun default sudah masuk ke database dengan menjalankan perintah berikut dari terminal lokal:

```powershell
# 1. Pastikan skema tabel sinkron dengan Supabase
npx prisma db push

# 2. Masukkan akun admin default dan data awal CRM
npm run db:seed
```

---

## 🔐 Akun Login Pengujian di Vercel Production

Setelah website online di Vercel, Anda dapat langsung login ke Admin Control Panel melalui `/admin/login`:

- **URL Login:** `https://your-project.vercel.app/admin/login`
- **Email:** `admin@devpulse.studio`
- **Password:** `admin123`
- **Fitur Quick Login:** Tersedia tombol ⚡ **Quick Login Admin** di halaman login untuk masuk instan dengan 1 klik!

---

## ✅ Checklist Verifikasi Pasca Deploy

1. **Akses Landing Page:** Buka `https://your-project.vercel.app/` — pastikan Hero, Kalkulator Biaya, dan badge interaktif berjalan mulus.
2. **Uji AI PRD Builder:** Buka `/prd-builder` — selesaikan kuesioner dan uji coba kirim instruksi chat revisi (misal: `Tambahkan payment gateway`). Pastikan respon AI mengalir dengan lancar.
3. **Uji Admin Panel:** Login ke `/admin/dashboard` — pastikan grafik tren pendapatan, daftar leads, dan papan Kanban Deals Pipeline termuat dari database Supabase.
4. **Uji Upload Storage:** Coba unggah avatar atau dokumen PRD untuk memvalidasi integrasi Supabase Storage Bucket.
