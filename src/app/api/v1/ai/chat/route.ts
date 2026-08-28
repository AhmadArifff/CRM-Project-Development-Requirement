import { NextRequest } from 'next/server';

interface ChatRequestPayload {
  messages: Array<{ sender: 'ai' | 'user'; text: string }>;
  model?: string;
  hourlyRate?: number;
  currentPrd?: string;
}

const CHATGPT_TPM_SYSTEM_PROMPT = `Anda adalah Lead Technical Product Manager (TPM) & Senior Solution Architect kelas dunia di DevPulse Studio.
Jawablah layaknya ChatGPT / Claude 3.5: cerdas, ramah, natural, fasih berbahasa Indonesia, sangat solutif, dan terstruktur rapi dengan markdown (heading, list, bold, tables).

PANDUAN INTERAKSI:
1. Jawab setiap pertanyaan, sapaan, konsultasi arsitektur, audit PRD, atau diskusi secara natural, mendalam, dan santun. JANGAN PERNAH menggunakan template kaku atau mengulang pertanyaan user sebagai nama fitur!
2. Jika pengguna meminta secara EKSPLISIT untuk menambahkan/merancang modul baru ke PRD (misal: "tolong buatkan modul payment gateway", "tambahkan modul auth 2FA"), jelaskan nilai bisnis & arsitekturnya, lalu sertakan marker di baris paling akhir:
   <<<ACTION:ADD:Nama Modul Bersih>>>
3. Jika pengguna meminta secara EKSPLISIT untuk menghapus modul dari PRD (misal: "hapus modul payment gateway", "hilangkan fitur chat realtime"), jelaskan konsekuensi scope & durasinya, lalu sertakan marker di baris paling akhir:
   <<<ACTION:REMOVE:Nama Modul Bersih>>>
4. Jika pengguna HANYA bertanya, menyapa, atau berkonsultasi (misal: "apakah bisa remove content perancangan dari PRD?", "apa yang kurang dari PRD ini?", "halo", "apa saranmu?"), JAWAB DENGAN PENJELASAN LENGKAP TANPA MENYERTAKAN ACTION MARKER!`;

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestPayload = await req.json();
    const {
      messages = [],
      model = 'minimax/minimax-m3:free',
      hourlyRate = 250000,
      currentPrd = '',
    } = body;

    const apiKey = process.env.OPENROUTER_API_KEY || '';
    const targetModel = model && model.includes(':free') ? model : 'minimax/minimax-m3:free';

    // Format chat history for LLM
    const formattedMessages = [
      {
        role: 'system',
        content: `${CHATGPT_TPM_SYSTEM_PROMPT}\n\n[Konteks Proyek]:\nWorkrate: Rp ${hourlyRate.toLocaleString('id-ID')}/jam.\nDokumen PRD saat ini:\n${currentPrd.slice(0, 3000)}...`,
      },
      ...messages.map((m) => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text,
      })),
    ];

    // Try OpenRouter Streaming API
    if (apiKey && apiKey.startsWith('sk-or-')) {
      try {
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
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 1800,
            stream: true,
          }),
        });

        if (openRouterRes.ok && openRouterRes.body) {
          // Transform SSE stream to plain text stream
          const encoder = new TextEncoder();
          const decoder = new TextDecoder();

          const customStream = new ReadableStream({
            async start(controller) {
              const reader = openRouterRes.body!.getReader();
              let buffer = '';

              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;

                  buffer += decoder.decode(value, { stream: true });
                  const lines = buffer.split('\n');
                  buffer = lines.pop() || '';

                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed === 'data: [DONE]') continue;
                    if (trimmed.startsWith('data: ')) {
                      try {
                        const json = JSON.parse(trimmed.slice(6));
                        const content = json.choices?.[0]?.delta?.content || '';
                        if (content) {
                          controller.enqueue(encoder.encode(content));
                        }
                      } catch {
                        // ignore malformed JSON chunk
                      }
                    }
                  }
                }
              } catch (err) {
                console.error('Stream read error:', err);
              } finally {
                controller.close();
              }
            },
          });

          return new Response(customStream, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Transfer-Encoding': 'chunked',
              'Cache-Control': 'no-cache',
            },
          });
        }
      } catch (orErr) {
        console.warn('OpenRouter Streaming failed, using fallback:', orErr);
      }
    }

    // Fallback if OpenRouter is unreachable
    const latestMsg = messages[messages.length - 1]?.text || '';
    const fallbackText = getIntelligentFallback(latestMsg, hourlyRate);

    return new Response(fallbackText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    return new Response(`⚠️ Maaf, terjadi kesalahan pada server AI: ${error.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

function getIntelligentFallback(message: string, hourlyRate: number): string {
  const lower = message.toLowerCase();

  if (lower.includes('remove') || lower.includes('hapus') || lower.includes('hilangkan')) {
    return `Tentu bisa! Anda dapat menghapus atau memangkas bagian modul tertentu dari dokumen **PRD.md** kapan saja.

Jika Anda ingin memangkas modul tertentu (misalnya modul Payment, WebSockets, atau Auth), cukup ketik:
- *"Hapus modul payment gateway"*
- *"Hilangkan modul realtime chat"*

Sistem akan memunculkan pop-up konfirmasi dan secara otomatis mengkalkulasi pengurangan durasi proyek (\`-15 Jam Kerja\`). Modul mana yang ingin Anda pangkas?

<<<ACTION:REMOVE:Modul Terpilih>>>`;
  }

  if (lower.includes('advance') || lower.includes('kurang') || lower.includes('saran') || lower.includes('rekomendasi')) {
    return `Berikut adalah beberapa rekomendasi fitur **Enterprise 2025/2026** yang dapat meningkatkan kapabilitas sistem Anda:

1. **AI Copilot & Smart Doc Parser:** Otomasi onboarding & ekstraksi kebutuhan instan.
2. **Real-time Live Sync & WebSockets:** Sinkronisasi multi-user tanpa perlu refresh halaman.
3. **Payment Gateway Midtrans/Xendit:** Transaksi QRIS instan & auto-generate invoice PDF.
4. **Audit Trail & Role-Based Access Control:** Keamanan enterprise dan log kepatuhan ISO/SOC2.

Apakah ada modul di atas yang ingin kita rancang spesifikasinya?`;
  }

  return `Halo! 👋 Saya adalah **Lead Technical Product Manager (TPM)** dari DevPulse Studio.

Saya siap mendampingi Anda merancang, mengaudit, atau menyesuaikan spesifikasi dokumen **PRD.md** serta arsitektur teknis sistem secara interaktif.

Apa yang ingin kita diskusikan atau formulasikan hari ini?`;
}
