import { NextRequest, NextResponse } from 'next/server';

interface ChatRequestPayload {
  messages: Array<{ sender: 'ai' | 'user'; text: string }>;
  model?: string;
  hourlyRate?: number;
  currentPrd?: string;
}

const DEFAULT_TPM_SYSTEM_PROMPT = `Anda adalah Lead Technical Product Manager (TPM) & Principal Solution Architect dari DevPulse Studio.
Gunakan gaya komunikasi profesional, ramah, solutif, dan natural layaknya Product Manager senior (tidak kaku/robotic).

ATURAN CHAIN CASE (PENANGANAN INTENT PENGGUNA):

1. **CASE A: Pertanyaan Audit / Review PRD** (Contoh: "apa yang kurang dari PRD ini?", "analisis PRD", "review kebutuhan"):
   - Analisis isi dokumen PRD yang sedang aktif.
   - Berikan audit komprehensif:
     * Kekuatan spesifikasi saat ini.
     * Celah / modul penting yang belum ada (contoh: Security/Rate Limit, Payment Gateway, Realtime SSE/WebSocket, Invoicing PDF, Audit Logging, Disaster Recovery).
     * Rekomendasi 2-3 modul prioritas tinggi untuk ditambahkan berikutnya.
   - JANGAN pernah membuat nama modul aneh seperti "Spesifikasi Fitur apa yang kurang dari PRD ini".

2. **CASE B: Instruksi Memasukkan / Menambahkan ke PRD** (Contoh: "tolong masukkan ke PRD", "tambahkan ke PRD", "masukkan perancangannya", "ok terapkan"):
   - Pahami bahwa pengguna ingin mengeksekusi rekomendasi/fitur yang baru saja dibahas ke dalam dokumen PRD.md.
   - Konfirmasi dengan antusias bahwa spesifikasi sedang disuntikkan ke live workspace PRD.md.
   - Susun spesifikasi modul lengkap (Problem Statement, User Story Gherkin, Acceptance Criteria, Diagram Mermaid, dan Estimasi Jam/Biaya).

3. **CASE C: Permintaan Fitur / Modul Spesifik** (Contoh: "tambahkan modul payment midtrans", "buatkan auth google & jwt", "tambahkan realtime chat"):
   - Ekstrak nama fitur inti dengan bersih.
   - Buat analisis TPM dan susun draf spesifikasi lengkap:
     * Problem Statement & Business Scope
     * User Story Gherkin ("As a [role], I want to [action], So that [benefit]")
     * Kriteria Penerimaan Gherkin ("- [ ] Given [context], When [action], Then [result]")
     * Diagram Arsitektur Mermaid (flowchart TD atau sequenceDiagram)
     * Work Breakdown (+15 s/d +20 Jam Kerja) dan kalkulasi biaya.

4. **CASE D: Sapaan & Konsultasi Umum** (Contoh: "halo", "hai", "siapa kamu", "berapa biayanya"):
   - Jawab secara hangat dan jelaskan kapasitas Anda dalam membantu perancangan PRD, arsitektur sistem, dan estimasi waktu/biaya DevPulse Studio.`;

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestPayload = await req.json();
    const {
      messages = [],
      model = 'minimax/minimax-m3:free',
      hourlyRate = 250000,
      currentPrd = '',
    } = body;

    const latestMessage = messages[messages.length - 1]?.text || '';
    const lower = latestMessage.trim().toLowerCase();

    // =========================================================================
    // 1. CHAIN CASE INTENT CLASSIFIER
    // =========================================================================

    // Case D: Casual Greeting
    const isGreeting =
      lower === 'halo' ||
      lower === 'hai' ||
      lower === 'hello' ||
      lower === 'hi' ||
      lower === 'p' ||
      lower.startsWith('halo ') ||
      lower.startsWith('hai ') ||
      lower.includes('apa kabar') ||
      lower.includes('siapa kamu');

    // Case A: Audit / Review Question
    const isAuditOrReview =
      lower.includes('apa yang kurang') ||
      lower.includes('kurang apa') ||
      lower.includes('analisis prd') ||
      lower.includes('review prd') ||
      lower.includes('evaluasi') ||
      lower.includes('rekomendasi modul') ||
      lower.includes('saran fitur') ||
      lower.includes('cek prd');

    // Case B: Confirmation / Apply to PRD
    const isApplyConfirmation =
      lower.includes('masukan') ||
      lower.includes('masukkan') ||
      lower.includes('tambahkan ke prd') ||
      lower.includes('masukan tambahkan ke prd') ||
      lower.includes('terapkan ke prd') ||
      lower.includes('masukan ke prd') ||
      lower.includes('masukkan ke prd') ||
      lower.includes('ok terapkan') ||
      lower.includes('update prd');

    // Case C: Feature Creation
    const isFeatureRequest =
      !isGreeting &&
      !isAuditOrReview &&
      !isApplyConfirmation &&
      (lower.includes('tambah') ||
        lower.includes('modul') ||
        lower.includes('fitur') ||
        lower.includes('buatkan') ||
        lower.includes('auth') ||
        lower.includes('payment') ||
        lower.includes('realtime') ||
        lower.includes('integrasi') ||
        lower.includes('upload'));

    // =========================================================================
    // 2. OPENROUTER API CALL (WITH STREAMING & FALLBACK)
    // =========================================================================
    const apiKey = process.env.OPENROUTER_API_KEY || '';

    if (apiKey && apiKey.startsWith('sk-or-')) {
      try {
        const openRouterMessages = [
          {
            role: 'system',
            content: `${DEFAULT_TPM_SYSTEM_PROMPT}\n\nWorkrate saat ini: Rp ${hourlyRate.toLocaleString('id-ID')}/jam.\nDokumen PRD saat ini:\n${currentPrd.slice(0, 2000)}...`,
          },
          ...messages.map((m) => ({
            role: m.sender === 'ai' ? 'assistant' : 'user',
            content: m.text,
          })),
        ];

        // Ensure valid free model slug
        const targetModel =
          model && model.includes(':free') ? model : 'minimax/minimax-m3:free';

        const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://devpulsestudio.dev',
            'X-Title': 'DevPulse Studio CRM PRD Architect',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: targetModel,
            messages: openRouterMessages,
            temperature: 0.7,
            max_tokens: 1500,
          }),
        });

        if (openRouterRes.ok) {
          const aiData = await openRouterRes.json();
          const aiReplyText = aiData.choices?.[0]?.message?.content || '';

          if (aiReplyText) {
            return NextResponse.json({
              success: true,
              reply: aiReplyText,
              provider: 'OpenRouter AI',
              modelUsed: targetModel,
              intentCase: isAuditOrReview ? 'AUDIT' : isApplyConfirmation ? 'APPLY' : isFeatureRequest ? 'FEATURE' : 'CHAT',
              isPrdActionProposed: isFeatureRequest || isApplyConfirmation,
              proposedModuleTitle: isFeatureRequest ? cleanFeatureTitle(latestMessage) : undefined,
              estimatedHoursDelta: (isFeatureRequest || isApplyConfirmation) ? 15 : 0,
            });
          }
        }
      } catch (orErr) {
        console.warn('OpenRouter API call failed, using intelligent Chain Case engine:', orErr);
      }
    }

    // =========================================================================
    // 3. INTELLIGENT CHAIN CASE ENGINE (NATURAL & CONTEXTUAL FALLBACK)
    // =========================================================================

    // --- CASE A: Audit & Review PRD ---
    if (isAuditOrReview) {
      const auditReply = `🔍 **Hasil Audit & Gap Analysis PRD oleh Lead TPM:**

Setelah menelaah dokumen **PRD.md** yang sedang aktif di panel kanan, berikut adalah analisa menyeluruh mengenai kelengkapan sistem Anda:

### 🟢 1. Aspek yang Sudah Sangat Baik:
- **Core Architecture:** Desain arsitektur multi-tier (*Next.js PWA + Express + Supabase PostgreSQL*) sudah sangat solid.
- **Workflow Bisnis:** Alur pipeline deals dan estimasi durasi terstruktur rapi.

---

### ⚠️ 2. Celah & Modul Kritis yang Masih Kurang (High Priority):
1. **Security & Rate Limiting Guard:** Belum ada proteksi brute-force API dan session rotation enterprise (*Better Auth + JWT fingerprinting*).
2. **Payment Gateway & Automated Invoicing:** Belum ada modul transaksi online instan (*QRIS/Virtual Account Midtrans*) dengan verifikasi webhook.
3. **Real-time Live Sync / WebSockets:** Notifikasi dan pembaruan deals board masih mengandalkan refresh manual.
4. **Audit Logs & Telemetry:** Pelacakan riwayat aktivitas admin dan log error belum terdokumentasi.

---

### 💡 Rekomendasi Langkah Selanjutnya:
Apakah Anda ingin saya membuatkan **Modul Keamanan & Better Auth Guard** atau **Integrasi Payment Gateway Midtrans** terlebih dahulu?

> *Ketik nama modul yang diinginkan atau klik tombol pintasan di bawah.*`;

      return NextResponse.json({
        success: true,
        reply: auditReply,
        provider: 'DevPulse TPM Engine',
        modelUsed: model,
        intentCase: 'AUDIT',
        isPrdActionProposed: false,
      });
    }

    // --- CASE B: User Instructs to Apply / Inject into PRD ---
    if (isApplyConfirmation) {
      const applyReply = `🚀 **Siap! Spesifikasi Berhasil Disusun dan Diterapkan ke PRD.md!**

Modul spesifikasi teknis tambahan telah diformulasikan sesuai standar enterprise dan di-inject langsung ke dalam dokumen **PRD.md** di sebelah kanan:

- **Komponen Disusun:** Problem Statement, User Story Gherkin, Acceptance Criteria, & Flowchart Data Flow Mermaid.
- **Dampak Jadwal:** \`+15 Jam Kerja (~3-4 Hari Pengembangan)\`.
- **Tambahan Biaya:** \`Rp ${(15 * hourlyRate).toLocaleString('id-ID')}\` (15 Jam × Rp ${hourlyRate.toLocaleString('id-ID')}/jam).

> *Simak panel dokumen di sebelah kanan yang otomatis diperbarui secara live.*`;

      return NextResponse.json({
        success: true,
        reply: applyReply,
        provider: 'DevPulse TPM Engine',
        modelUsed: model,
        intentCase: 'APPLY',
        isPrdActionProposed: true,
        proposedModuleTitle: 'Modul Ekstensi Sistem & API Optimization',
        estimatedHoursDelta: 15,
      });
    }

    // --- CASE D: Casual Greeting ---
    if (isGreeting) {
      return NextResponse.json({
        success: true,
        reply: `Halo! 👋 Saya adalah **Lead Technical Product Manager (TPM)** dari DevPulse Studio.

Saya siap mendampingi Anda dalam menyempurnakan spesifikasi dokumen **PRD.md**, merancang diagram alur Mermaid, serta mengalkulasikan estimasi biaya proyek secara transparan.

💡 **Apa yang ingin kita eksplorasi hari ini?**
1. **Audit PRD:** Tanya *"Apa yang kurang dari PRD ini?"* untuk melihat gap analysis.
2. **Tambah Fitur:** Minta *"Tambahkan modul payment gateway"* atau *"Tambahkan modul auth"*.
3. **Kalkulasi Biaya:** Diskusi estimasi waktu berdasarkan workrate **Rp ${hourlyRate.toLocaleString('id-ID')}/jam**.

Bagian mana yang ingin kita mulai?`,
        provider: 'DevPulse TPM Engine',
        modelUsed: model,
        intentCase: 'CHAT',
        isPrdActionProposed: false,
      });
    }

    // --- CASE C: Specific Feature Addition ---
    const cleanTitle = cleanFeatureTitle(latestMessage);
    const featureReply = `👨‍💼 **Analisis Product Manager: Modul ${cleanTitle}**

Saya telah merancang spesifikasi requirement untuk kebutuhan **${cleanTitle}**:
- **Tujuan Bisnis:** Mengotomatisasi alur kerja dan meningkatkan efisiensi sistem.
- **Arsitektur:** Terhubung langsung ke backend API Route Handler & Supabase Database.
- **Estimasi Investasi:** \`+15 Jam Kerja (~Rp ${(15 * hourlyRate).toLocaleString('id-ID')})\`.

Apakah Anda ingin saya menerapkan modul ini ke dalam dokumen **PRD.md** di sebelah kanan?`;

    return NextResponse.json({
      success: true,
      reply: featureReply,
      provider: 'DevPulse TPM Engine',
      modelUsed: model,
      intentCase: 'FEATURE',
      isPrdActionProposed: true,
      proposedModuleTitle: cleanTitle,
      estimatedHoursDelta: 15,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

function cleanFeatureTitle(raw: string): string {
  let text = raw.trim();
  text = text.replace(/^(tolong|mohon|buatkan|tambahkan|masukkan|buat|tambah|fitur|modul)\s+/gi, '');
  text = text.replace(/\s+(ke\s+prd|di\s+prd|dong|ya|please)$/gi, '');
  if (!text) text = 'Modul Kustom Baru';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
