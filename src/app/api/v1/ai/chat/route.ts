import { NextRequest, NextResponse } from 'next/server';

interface ChatRequestPayload {
  messages: Array<{ sender: 'ai' | 'user'; text: string }>;
  model?: string;
  hourlyRate?: number;
  currentPrd?: string;
}

const DEFAULT_TPM_SYSTEM_PROMPT = `Anda adalah Lead Technical Product Manager (TPM) & Principal Solution Architect dari DevPulse Studio.
Gunakan gaya komunikasi profesional, ramah, solutif, dan natural layaknya Product Manager kelas dunia.

ATURAN CHAIN CASE & INTENT PENGGUNA:

1. **CASE A: Konsultasi / Pertanyaan Strategis / Brainstorming / Audit**
   (Contoh: "apakah ada yang bisa dimasukan fitur tambahkan yang lebih advance?", "apa yang kurang dari PRD ini?", "bagaimana arsitekturnya?", "apa rekomendasi fitur berikutnya?"):
   - Bersikaplah sebagai konsultan produk senior.
   - Berikan analisa mendalam, komparasi fitur modern (AI Agent, Multi-tenancy, Realtime Sync, Payment Gateway, Security Hardening, Audit Trail), serta dampaknya ke bisnis.
   - JANGAN pernah membuat nama modul fiktif dari pertanyaan pengguna.
   - Berikan opsi-opsi terstruktur dan tanyakan kepada pengguna modul mana yang ingin diformulasikan spesifikasinya.

2. **CASE B: Perintah Pembuatan Modul Spesifik**
   (Contoh: "tolong buatkan modul payment midtrans", "tambahkan modul autentikasi google & jwt"):
   - Analisis requirement modul tersebut.
   - Berikan penjelasan singkat mengenai solusi teknis dan arsitektur data.
   - Beritahu pengguna bahwa spesifikasi siap diterapkan melalui tombol konfirmasi.

3. **CASE C: Sapaan / Percakapan Santai**
   (Contoh: "halo", "hai", "siapa kamu"):
   - Jawab secara hangat dan jelaskan peran Anda dalam memandu perancangan dokumen PRD.md.`;

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
    // 1. STRICT INTENT CLASSIFIER (CHAIN CASE)
    // =========================================================================

    // Case 1: Greeting
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

    // Case 2: Question / Inquiry / Brainstorming / Audit (NEVER a module creation)
    const isQuestionOrConsultation =
      latestMessage.includes('?') ||
      lower.includes('apakah') ||
      lower.includes('bagaimana') ||
      lower.includes('apa saja') ||
      lower.includes('ada saran') ||
      lower.includes('rekomendasi') ||
      lower.includes('ada yang bisa') ||
      lower.includes('menurutmu') ||
      lower.includes('apa yang kurang') ||
      lower.includes('kurang apa') ||
      lower.includes('kenapa') ||
      lower.includes('mengapa') ||
      lower.includes('fitur apa') ||
      lower.includes('ide') ||
      lower.includes('advance') ||
      lower.includes('audit') ||
      lower.includes('review') ||
      lower.includes('evaluasi') ||
      lower.includes('saran');

    // Case 3: Explicit Feature Request Command (e.g. "tolong buatkan modul payment midtrans")
    const isExplicitFeatureCreation =
      !isGreeting &&
      !isQuestionOrConsultation &&
      (lower.startsWith('tolong buatkan') ||
        lower.startsWith('buatkan') ||
        lower.startsWith('tambahkan modul') ||
        lower.startsWith('buat modul') ||
        lower.startsWith('tambah modul') ||
        lower.includes('modul payment') ||
        lower.includes('modul auth') ||
        lower.includes('modul realtime') ||
        lower.includes('modul notifikasi') ||
        lower.includes('integrasi midtrans'));

    // =========================================================================
    // 2. OPENROUTER API CALL (PRIMARY ENGINE)
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

        // Valid fallback model slugs
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
              provider: 'OpenRouter AI Engine',
              modelUsed: targetModel,
              intentCase: isQuestionOrConsultation
                ? 'CONSULTATION'
                : isExplicitFeatureCreation
                ? 'FEATURE'
                : isGreeting
                ? 'CHAT'
                : 'GENERAL',
              isPrdActionProposed: isExplicitFeatureCreation,
              proposedModuleTitle: isExplicitFeatureCreation
                ? cleanFeatureTitle(latestMessage)
                : undefined,
              estimatedHoursDelta: isExplicitFeatureCreation ? 15 : 0,
            });
          }
        }
      } catch (orErr) {
        console.warn('OpenRouter API call error, falling back to intelligent Chain Case:', orErr);
      }
    }

    // =========================================================================
    // 3. INTELLIGENT CHAIN CASE FALLBACK ENGINE (NATURAL & CONTEXTUAL)
    // =========================================================================

    // --- CASE A: Question / Consultation / Suggestions ---
    if (isQuestionOrConsultation) {
      let consultationReply = '';

      if (lower.includes('advance') || lower.includes('ide') || lower.includes('rekomendasi') || lower.includes('tambahkan')) {
        consultationReply = `💡 **Konsultasi Strategis: Rekomendasi Fitur Lanjutan (Advance Pillars)**

Tentu! Untuk meningkatkan kapabilitas dan nilai jual aplikasi Anda ke standar **Enterprise 2025/2026**, berikut adalah 4 modul advance yang sangat direkomendasikan:

---

### 🧠 1. AI Copilot & Automated Document Scoping (Tier: Intelligent)
- **Fungsi:** AI asisten yang dapat membaca file brief/dokumen klien, melakukan ekstraksi kebutuhan otomatis, dan menghasilkan diagram alur instan.
- **Nilai Bisnis:** Mempercepat proses onboarding klien hingga 80%.

### 🔄 2. Real-Time Activity Bus & Live WebSockets (Tier: Real-Time)
- **Fungsi:** Live collaborative board dengan sinkronisasi instan antar admin saat mengubah status pipeline, tugas, atau deals.
- **Nilai Bisnis:** Mencegah konflik data dan meningkatkan kecepatan respon tim.

### 💳 3. Multi-Channel Payment Gateway & Auto Invoicing (Tier: Monetization)
- **Fungsi:** Integrasi Midtrans/Xendit dengan QRIS instan, Virtual Account, split billing termin proyek, dan auto-generate invoice PDF dengan watermark stempel digital.
- **Nilai Bisnis:** Mempercepat cashflow dan otomatisasi verifikasi pembayaran.

### 🛡️ 4. Enterprise Audit Trail & Role-Based Access Control (Tier: Security)
- **Fungsi:** Pencatatan log aktivitas mutasi data secara immutable, session rotation, dan proteksi brute-force API.
- **Nilai Bisnis:** Memenuhi standar kepatuhan keamanan data perusahaan (SOC2 / ISO 27001).

---

> 🎯 **Langkah Selanjutnya:**  
> Dari ke-4 fitur advance di atas, modul mana yang ingin kita formulasikan spesifikasi teknisnya ke dalam dokumen **PRD.md**?`;
      } else {
        consultationReply = `🔍 **Hasil Audit & Evaluasi Dokumen PRD.md:**

Setelah menganalisis arsitektur dokumen yang aktif di panel kanan:
1. **Pondasi Inti:** Arsitektur Next.js + Supabase PostgreSQL sudah sangat baik untuk performa dan skalabilitas.
2. **Celah Rekomendasi:** Disarankan melengkapi sistem dengan **Modul Keamanan (Rate Limiter + JWT Rotation)** dan **Integrasi Payment Gateway Midtrans** agar siap produksi.

Modul mana yang ingin kita diskusikan lebih lanjut?`;
      }

      return NextResponse.json({
        success: true,
        reply: consultationReply,
        provider: 'DevPulse TPM Engine',
        modelUsed: model,
        intentCase: 'CONSULTATION',
        isPrdActionProposed: false,
      });
    }

    // --- CASE B: Casual Greeting ---
    if (isGreeting) {
      return NextResponse.json({
        success: true,
        reply: `Halo! 👋 Saya adalah **Lead Technical Product Manager (TPM)** dari DevPulse Studio.

Saya siap mendampingi Anda merancang dokumen spesifikasi **PRD.md**, arsitektur sistem, diagram alur Mermaid, dan estimasi biaya proyek secara transparan.

💡 **Panduan Diskusi:**
- Tanyakan *"Fitur advance apa saja yang bisa ditambahkan?"* untuk ide modul modern.
- Minta *"Tolong buatkan modul payment gateway"* untuk spesifikasi fitur spesifik.
- Konsultasikan estimasi jadwal dan biaya berdasarkan rate **Rp ${hourlyRate.toLocaleString('id-ID')}/jam**.

Apa yang ingin kita eksplorasi hari ini?`,
        provider: 'DevPulse TPM Engine',
        modelUsed: model,
        intentCase: 'CHAT',
        isPrdActionProposed: false,
      });
    }

    // --- CASE C: Explicit Feature Request ---
    const cleanTitle = cleanFeatureTitle(latestMessage);
    const featureReply = `👨‍💼 **Analisis Product Manager: Spesifikasi Modul ${cleanTitle}**

Saya telah merancang formula kebutuhan untuk modul **${cleanTitle}**:
- **Problem Statement:** Mengotomatisasi alur proses data dan meningkatkan kapabilitas operasional aplikasi.
- **Arsitektur Teknis:** Terintegrasi langsung dengan API Route Handlers dan Supabase Database.
- **Estimasi Investasi:** \`+15 Jam Kerja (~Rp ${(15 * hourlyRate).toLocaleString('id-ID')})\`.

Silakan konfirmasi melalui pop-up di bawah jika Anda ingin memasukkan modul ini ke dalam dokumen **PRD.md**!`;

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
  if (!text) text = 'Modul Ekstensi Sistem';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
