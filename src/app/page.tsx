import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ConsultingSection } from '@/components/landing/ConsultingSection';
import { RateCalculatorSection } from '@/components/landing/RateCalculatorSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'DevPulse Studio — AI PRD Builder & Digital App Consultancy',
  description: 'Agency Konsultasi Web & Mobile App Development terlengkap. Analisis behavior pengguna, rekomendasi server cloud, dan susun PRD.md otomatis dalam 5 menit dengan AI.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <ConsultingSection />
        <RateCalculatorSection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
