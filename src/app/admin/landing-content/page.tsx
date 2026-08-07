'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLandingContentStore, TestimonialCMSItem } from '@/store/useLandingContentStore';
import { useAdminStore } from '@/store/useAdminStore';
import { HeroSection } from '@/components/landing/HeroSection';
import { ConsultingSection } from '@/components/landing/ConsultingSection';
import { RateCalculatorSection } from '@/components/landing/RateCalculatorSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { Footer } from '@/components/layout/Footer';

import {
  LayoutTemplate,
  Edit3,
  Eye,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Sliders,
  Type,
  FileText,
  MessageSquare,
  Globe,
  Layers,
  ArrowRight,
  Shield,
  Star,
  Quote,
  Laptop,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Save,
  Zap,
  Rocket,
  Bot,
  Code,
  Server,
  Heart,
  ThumbsUp,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Upload,
  Link as LinkIcon,
  Check,
  Pin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon Picker Library
const availableIcons = [
  { name: 'Zap', icon: Zap },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Shield', icon: Shield },
  { name: 'Rocket', icon: Rocket },
  { name: 'Bot', icon: Bot },
  { name: 'Code', icon: Code },
  { name: 'Server', icon: Server },
  { name: 'Globe', icon: Globe },
  { name: 'Star', icon: Star },
  { name: 'CheckCircle2', icon: CheckCircle2 },
  { name: 'ThumbsUp', icon: ThumbsUp },
  { name: 'Heart', icon: Heart },
];

// Reusable Image Upload & URL Picker Component
const ImageUploadPicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
  label: string;
}> = ({ value, onChange, label }) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile } = useAdminStore();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (error) {
      console.error(error);
      alert('Gagal mengunggah gambar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <label className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{label}</span>
        </label>
        
        {/* Toggle Upload File vs Paste URL */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded font-bold transition-all ${
              mode === 'upload' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📷 Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded font-bold transition-all ${
              mode === 'url' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔗 URL Link
          </button>
        </div>
      </div>

      {/* Image Thumbnail Preview & Actions */}
      <div className="flex items-center gap-3 pt-1">
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center relative group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-600" />
          )}
        </div>

        <div className="flex-1 space-y-1.5">
          {mode === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 hover:border-cyan-400 transition-all disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="w-3.5 h-3.5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                <span>{isUploading ? 'Mengunggah...' : 'Pilih File Gambar Komputer'}</span>
              </button>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Tempel URL gambar (https://...)"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function FigmaVisualCMSPage() {
  const {
    hero,
    consulting,
    rateCalculator,
    process,
    testimonials,
    footer,
    updateHero,
    updateConsulting,
    updateRateCalculator,
    updateProcess,
    updateTestimonialsHeader,
    updateTestimonialItem,
    addTestimonialItem,
    removeTestimonialItem,
    updateFooter,
    resetToDefault,
  } = useLandingContentStore();

  const [selectedSection, setSelectedSection] = useState<'HERO' | 'CONSULTING' | 'CALCULATOR' | 'PROCESS' | 'TESTIMONIALS' | 'FOOTER'>('HERO');
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Section Refs Map for Auto-Scrolling Canvas Viewport to Top
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (selectedSection && sectionRefs.current[selectedSection]) {
      sectionRefs.current[selectedSection]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedSection]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const viewportWidthClass = {
    desktop: 'max-w-7xl w-full',
    tablet: 'max-w-[768px] w-full',
    mobile: 'max-w-[375px] w-full',
  }[deviceViewport];

  return (
    <div className="space-y-4 -m-4 sm:-m-6 p-4 sm:p-6 bg-[#04060b] min-h-[calc(100vh-80px)] text-slate-100 font-sans">
      
      {/* FIGMA TOP STUDIO HEADER BAR */}
      <div className="glass-card p-3 rounded-2xl border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>Figma Visual CMS</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                ✨ Auto-Scroll Focus Active Section
              </span>
            </h2>
            <span className="text-[10px] text-slate-400 block">Section yang diedit otomatis terfokus di bagian paling atas canvas preview!</span>
          </div>
        </div>

        {/* Device Frame Viewport Selectors */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setDeviceViewport('desktop')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'desktop' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'tablet' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'mobile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            <button onClick={() => setZoomScale(Math.max(50, zoomScale - 25))} className="hover:text-cyan-400">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-bold">{zoomScale}%</span>
            <button onClick={() => setZoomScale(Math.min(100, zoomScale + 25))} className="hover:text-cyan-400">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              resetToDefault();
              triggerToast('Konten Landing Page berhasil direset ke Default!');
            }}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs"
            title="Reset Default"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={() => triggerToast('Perubahan konten berhasil dipublikasikan ke Landing Page Utama!')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIGMA 3-COLUMN STUDIO WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT COLUMN: FIGMA LAYERS TREE NAVIGATOR */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-3 border-slate-800 space-y-3 text-xs">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-wider block px-1">
            ❖ Layers Tree Navigator
          </span>

          <div className="space-y-1">
            {[
              { id: 'HERO', label: 'Hero Banner', icon: Zap, color: 'text-cyan-400' },
              { id: 'CONSULTING', label: 'Consulting Analyzer', icon: Layers, color: 'text-indigo-400' },
              { id: 'CALCULATOR', label: 'Rate Calculator', icon: Sliders, color: 'text-purple-400' },
              { id: 'PROCESS', label: 'Alur PRD Steps', icon: CheckCircle2, color: 'text-emerald-400' },
              { id: 'TESTIMONIALS', label: 'Testimoni Klien', icon: Star, color: 'text-amber-400' },
              { id: 'FOOTER', label: 'Footer Contact', icon: Globe, color: 'text-blue-400' },
            ].map((layer) => {
              const isSelected = selectedSection === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedSection(layer.id as any)}
                  className={`w-full p-2.5 rounded-xl font-bold flex items-center justify-between text-left transition-all border ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border-blue-500/50 shadow-md ring-1 ring-blue-400'
                      : 'bg-slate-950/60 text-slate-400 border-slate-900 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <layer.icon className={`w-3.5 h-3.5 ${layer.color}`} />
                    <span className="truncate">{layer.label}</span>
                  </div>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER COLUMN: AUTHENTIC PIXEL-PERFECT LANDING CANVAS WITH AUTO-SCROLL */}
        <div className="lg:col-span-6 flex flex-col items-center justify-start max-h-[85vh] overflow-y-auto scroll-smooth p-4 bg-slate-950/90 rounded-2xl border border-slate-900 shadow-inner">
          <div
            className={`${viewportWidthClass} transition-all duration-300 space-y-8 transform origin-top`}
            style={{ transform: `scale(${zoomScale / 100})` }}
          >
            
            {/* CANVAS ITEM: HERO BANNER */}
            <div
              ref={(el) => { sectionRefs.current['HERO'] = el; }}
              onClick={() => setSelectedSection('HERO')}
              className={`relative rounded-2xl transition-all cursor-pointer group ${
                selectedSection === 'HERO'
                  ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-slate-950 bg-blue-950/20 shadow-2xl shadow-blue-500/20'
                  : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2 hover:ring-offset-slate-950 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="absolute -top-3.5 left-4 z-20 px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-cyan-300" />
                <span>❖ Section: Hero Banner</span>
                {selectedSection === 'HERO' && <span className="text-cyan-300 font-extrabold">(Focused Top)</span>}
              </div>
              <HeroSection />
            </div>

            {/* CANVAS ITEM: CONSULTING ANALYZER */}
            <div
              ref={(el) => { sectionRefs.current['CONSULTING'] = el; }}
              onClick={() => setSelectedSection('CONSULTING')}
              className={`relative rounded-2xl transition-all cursor-pointer group ${
                selectedSection === 'CONSULTING'
                  ? 'ring-4 ring-indigo-500 ring-offset-4 ring-offset-slate-950 bg-indigo-950/20 shadow-2xl shadow-indigo-500/20'
                  : 'hover:ring-2 hover:ring-indigo-500/50 hover:ring-offset-2 hover:ring-offset-slate-950 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="absolute -top-3.5 left-4 z-20 px-3 py-1 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-cyan-300" />
                <span>❖ Section: Consulting Analyzer</span>
                {selectedSection === 'CONSULTING' && <span className="text-cyan-300 font-extrabold">(Focused Top)</span>}
              </div>
              <ConsultingSection />
            </div>

            {/* CANVAS ITEM: RATE CALCULATOR */}
            <div
              ref={(el) => { sectionRefs.current['CALCULATOR'] = el; }}
              onClick={() => setSelectedSection('CALCULATOR')}
              className={`relative rounded-2xl transition-all cursor-pointer group ${
                selectedSection === 'CALCULATOR'
                  ? 'ring-4 ring-purple-500 ring-offset-4 ring-offset-slate-950 bg-purple-950/20 shadow-2xl shadow-purple-500/20'
                  : 'hover:ring-2 hover:ring-purple-500/50 hover:ring-offset-2 hover:ring-offset-slate-950 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="absolute -top-3.5 left-4 z-20 px-3 py-1 rounded-full bg-purple-600 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-cyan-300" />
                <span>❖ Section: Rate Calculator</span>
                {selectedSection === 'CALCULATOR' && <span className="text-cyan-300 font-extrabold">(Focused Top)</span>}
              </div>
              <RateCalculatorSection />
            </div>

            {/* CANVAS ITEM: PROCESS STEPS */}
            <div
              ref={(el) => { sectionRefs.current['PROCESS'] = el; }}
              onClick={() => setSelectedSection('PROCESS')}
              className={`relative rounded-2xl transition-all cursor-pointer group ${
                selectedSection === 'PROCESS'
                  ? 'ring-4 ring-emerald-500 ring-offset-4 ring-offset-slate-950 bg-emerald-950/20 shadow-2xl shadow-emerald-500/20'
                  : 'hover:ring-2 hover:ring-emerald-500/50 hover:ring-offset-2 hover:ring-offset-slate-950 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="absolute -top-3.5 left-4 z-20 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-cyan-300" />
                <span>❖ Section: Alur PRD Steps</span>
                {selectedSection === 'PROCESS' && <span className="text-cyan-300 font-extrabold">(Focused Top)</span>}
              </div>
              <ProcessSection />
            </div>

            {/* CANVAS ITEM: TESTIMONIALS */}
            <div
              ref={(el) => { sectionRefs.current['TESTIMONIALS'] = el; }}
              onClick={() => setSelectedSection('TESTIMONIALS')}
              className={`relative rounded-2xl transition-all cursor-pointer group ${
                selectedSection === 'TESTIMONIALS'
                  ? 'ring-4 ring-amber-500 ring-offset-4 ring-offset-slate-950 bg-amber-950/20 shadow-2xl shadow-amber-500/20'
                  : 'hover:ring-2 hover:ring-amber-500/50 hover:ring-offset-2 hover:ring-offset-slate-950 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="absolute -top-3.5 left-4 z-20 px-3 py-1 rounded-full bg-amber-600 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-cyan-300" />
                <span>❖ Section: Testimoni Klien</span>
                {selectedSection === 'TESTIMONIALS' && <span className="text-cyan-300 font-extrabold">(Focused Top)</span>}
              </div>
              <TestimonialsSection />
            </div>

            {/* CANVAS ITEM: FOOTER */}
            <div
              ref={(el) => { sectionRefs.current['FOOTER'] = el; }}
              onClick={() => setSelectedSection('FOOTER')}
              className={`relative rounded-2xl transition-all cursor-pointer group ${
                selectedSection === 'FOOTER'
                  ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-slate-950 bg-blue-950/20 shadow-2xl shadow-blue-500/20'
                  : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2 hover:ring-offset-slate-950 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="absolute -top-3.5 left-4 z-20 px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-cyan-300" />
                <span>❖ Section: Footer Contact</span>
                {selectedSection === 'FOOTER' && <span className="text-cyan-300 font-extrabold">(Focused Top)</span>}
              </div>
              <Footer />
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: FIGMA PROPERTIES INSPECTOR */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-4 border-slate-800 space-y-4 text-xs sticky top-24 max-h-[85vh] overflow-y-auto">
          <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Inspector Properties</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-bold">
              {selectedSection}
            </span>
          </div>

          {/* INSPECTOR PANEL: HERO */}
          {selectedSection === 'HERO' && (
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Badge Text Top</label>
                <input
                  type="text"
                  value={hero.badgeText}
                  onChange={(e) => updateHero({ badgeText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Pilih Badge Icon (Lucide Grid)</label>
                <div className="grid grid-cols-6 gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {availableIcons.map((ic) => (
                    <button
                      key={ic.name}
                      type="button"
                      onClick={() => {
                        updateHero({ badgeIcon: ic.name });
                        triggerToast(`Icon diubah ke ${ic.name}`);
                      }}
                      className={`p-2 rounded-lg flex items-center justify-center border transition-all ${
                        hero.badgeIcon === ic.name
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ic.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold block">Headline Teks (3 Baris)</label>
                <input
                  type="text"
                  value={hero.headlineLine1}
                  onChange={(e) => updateHero({ headlineLine1: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  placeholder="Line 1 (e.g. Rancang Requirement & Buat)"
                />
                <input
                  type="text"
                  value={hero.headlineHighlight}
                  onChange={(e) => updateHero({ headlineHighlight: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-bold text-xs"
                  placeholder="Highlight Cyan (e.g. PRD.md Otomatis)"
                />
                <input
                  type="text"
                  value={hero.headlineLine2}
                  onChange={(e) => updateHero({ headlineLine2: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  placeholder="Line 2 (e.g. Sebelum Mulai Pengerjaan Proyek)"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Sub-headline Deskripsi</label>
                <textarea
                  rows={4}
                  value={hero.subtitle}
                  onChange={(e) => updateHero({ subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tombol CTA Primary</label>
                  <input
                    type="text"
                    value={hero.primaryCtaText}
                    onChange={(e) => updateHero({ primaryCtaText: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tombol CTA Sekunder</label>
                  <input
                    type="text"
                    value={hero.secondaryCtaText}
                    onChange={(e) => updateHero({ secondaryCtaText: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* 4 Feature Cards Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">4 Feature Cards Hero</span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-400">Card 1</span>
                    <input
                      type="text"
                      value={hero.card1Title}
                      onChange={(e) => updateHero({ card1Title: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={hero.card1Sub}
                      onChange={(e) => updateHero({ card1Sub: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    />
                  </div>

                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-400">Card 2</span>
                    <input
                      type="text"
                      value={hero.card2Title}
                      onChange={(e) => updateHero({ card2Title: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={hero.card2Sub}
                      onChange={(e) => updateHero({ card2Sub: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    />
                  </div>

                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-400">Card 3</span>
                    <input
                      type="text"
                      value={hero.card3Title}
                      onChange={(e) => updateHero({ card3Title: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={hero.card3Sub}
                      onChange={(e) => updateHero({ card3Sub: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    />
                  </div>

                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-400">Card 4</span>
                    <input
                      type="text"
                      value={hero.card4Title}
                      onChange={(e) => updateHero({ card4Title: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={hero.card4Sub}
                      onChange={(e) => updateHero({ card4Sub: e.target.value })}
                      className="w-full p-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INSPECTOR PANEL: CONSULTING */}
          {selectedSection === 'CONSULTING' && (
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Badge Text Top</label>
                <input
                  type="text"
                  value={consulting.badgeText}
                  onChange={(e) => updateConsulting({ badgeText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judul Section</label>
                <input
                  type="text"
                  value={consulting.sectionTitle}
                  onChange={(e) => updateConsulting({ sectionTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Penjelasan Section</label>
                <textarea
                  rows={3}
                  value={consulting.sectionSubhead}
                  onChange={(e) => updateConsulting({ sectionSubhead: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-blue-400 font-bold uppercase block">Part 1: Judul Sub-section Platform</span>
                <input
                  type="text"
                  value={consulting.mobileWebCardTitle}
                  onChange={(e) => updateConsulting({ mobileWebCardTitle: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={consulting.mobileWebCardDesc}
                  onChange={(e) => updateConsulting({ mobileWebCardDesc: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">Part 2: Judul Sub-section Server</span>
                <input
                  type="text"
                  value={consulting.serverCardTitle}
                  onChange={(e) => updateConsulting({ serverCardTitle: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={consulting.serverCardDesc}
                  onChange={(e) => updateConsulting({ serverCardDesc: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                />
              </div>
            </div>
          )}

          {/* INSPECTOR PANEL: RATE CALCULATOR */}
          {selectedSection === 'CALCULATOR' && (
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Badge Text Top</label>
                <input
                  type="text"
                  value={rateCalculator.badgeText}
                  onChange={(e) => updateRateCalculator({ badgeText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judul Section Kalkulator Rate</label>
                <input
                  type="text"
                  value={rateCalculator.sectionTitle}
                  onChange={(e) => updateRateCalculator({ sectionTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Sub-headline Penjelasan Rate</label>
                <textarea
                  rows={3}
                  value={rateCalculator.sectionSubhead}
                  onChange={(e) => updateRateCalculator({ sectionSubhead: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold block">Item Garansi Poin</label>
                <input
                  type="text"
                  value={rateCalculator.guarantee1}
                  onChange={(e) => updateRateCalculator({ guarantee1: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs"
                />
                <input
                  type="text"
                  value={rateCalculator.guarantee2}
                  onChange={(e) => updateRateCalculator({ guarantee2: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tombol CTA Kalkulator</label>
                <input
                  type="text"
                  value={rateCalculator.ctaText}
                  onChange={(e) => updateRateCalculator({ ctaText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Catatan Keterangan Biaya (Notice)</label>
                <textarea
                  rows={2}
                  value={rateCalculator.hourlyRateNotice}
                  onChange={(e) => updateRateCalculator({ hourlyRateNotice: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* INSPECTOR PANEL: PROCESS STEPS */}
          {selectedSection === 'PROCESS' && (
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Badge Text Top</label>
                <input
                  type="text"
                  value={process.badgeText}
                  onChange={(e) => updateProcess({ badgeText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judul Section Alur Kerja</label>
                <input
                  type="text"
                  value={process.sectionTitle}
                  onChange={(e) => updateProcess({ sectionTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">Langkah 1: Kuisioner</span>
                <input
                  type="text"
                  value={process.step1Title}
                  onChange={(e) => updateProcess({ step1Title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={process.step1Desc}
                  onChange={(e) => updateProcess({ step1Desc: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-indigo-400 font-bold uppercase block">Langkah 2: AI Scoping</span>
                <input
                  type="text"
                  value={process.step2Title}
                  onChange={(e) => updateProcess({ step2Title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={process.step2Desc}
                  onChange={(e) => updateProcess({ step2Desc: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-purple-400 font-bold uppercase block">Langkah 3: Review PRD</span>
                <input
                  type="text"
                  value={process.step3Title}
                  onChange={(e) => updateProcess({ step3Title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={process.step3Desc}
                  onChange={(e) => updateProcess({ step3Desc: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Langkah 4: Deal & Kickoff</span>
                <input
                  type="text"
                  value={process.step4Title}
                  onChange={(e) => updateProcess({ step4Title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={process.step4Desc}
                  onChange={(e) => updateProcess({ step4Desc: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                />
              </div>
            </div>
          )}

          {/* INSPECTOR PANEL: TESTIMONIALS & LOCAL IMAGE FILE UPLOAD */}
          {selectedSection === 'TESTIMONIALS' && (
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Badge Text Top</label>
                <input
                  type="text"
                  value={testimonials.badgeText}
                  onChange={(e) => updateTestimonialsHeader({ badgeText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Judul Section Testimoni</label>
                <input
                  type="text"
                  value={testimonials.sectionTitle}
                  onChange={(e) => updateTestimonialsHeader({ sectionTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Sub-headline Testimoni</label>
                <textarea
                  rows={2}
                  value={testimonials.sectionSubhead}
                  onChange={(e) => updateTestimonialsHeader({ sectionSubhead: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>

              {/* Testimonials List Manager with Local File Upload */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Daftar Review Klien ({testimonials.items.length})</span>
                  <button
                    onClick={() => {
                      addTestimonialItem({
                        author: 'Klien Baru',
                        role: 'Managing Director',
                        company: 'PT Digital Indonesia',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                        category: 'E-Commerce',
                        rating: 5,
                        quote: 'Hasil PRD dan estimasi biaya sangat memuaskan!',
                        metrics: 'Rilis On Time 100%',
                        date: 'Agustus 2026',
                      });
                      triggerToast('Kartu testimoni baru berhasil ditambahkan!');
                    }}
                    className="text-[10px] text-cyan-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Review Baru</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {testimonials.items.map((t) => (
                    <div key={t.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={t.avatar} alt={t.author} className="w-7 h-7 rounded-full object-cover border border-slate-700" />
                          <span className="font-bold text-white">{t.author}</span>
                        </div>
                        <button
                          onClick={() => removeTestimonialItem(t.id)}
                          className="text-slate-500 hover:text-red-400 p-1"
                          title="Hapus Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Image Upload Dropzone Component */}
                      <ImageUploadPicker
                        label="Foto Avatar Klien (Upload File / URL)"
                        value={t.avatar}
                        onChange={(newAvatar) => {
                          updateTestimonialItem(t.id, { avatar: newAvatar });
                          triggerToast(`Foto avatar ${t.author} berhasil diperbarui!`);
                        }}
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] text-slate-400 block mb-0.5">Nama Klien</label>
                          <input
                            type="text"
                            value={t.author}
                            onChange={(e) => updateTestimonialItem(t.id, { author: e.target.value })}
                            className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-white font-bold text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-400 block mb-0.5">Jabatan / Company</label>
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) => updateTestimonialItem(t.id, { role: e.target.value })}
                            className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-slate-400 block mb-0.5">Kutipan Review Quote</label>
                        <textarea
                          rows={2}
                          value={t.quote}
                          onChange={(e) => updateTestimonialItem(t.id, { quote: e.target.value })}
                          className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INSPECTOR PANEL: FOOTER */}
          {selectedSection === 'FOOTER' && (
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tagline Deskripsi Footer</label>
                <textarea
                  rows={3}
                  value={footer.tagline}
                  onChange={(e) => updateFooter({ tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email Kontak</label>
                <input
                  type="text"
                  value={footer.contactEmail}
                  onChange={(e) => updateFooter({ contactEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nomor WhatsApp / Telepon</label>
                <input
                  type="text"
                  value={footer.contactPhone}
                  onChange={(e) => updateFooter({ contactPhone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Teks Hak Cipta (Copyright)</label>
                <input
                  type="text"
                  value={footer.copyrightText}
                  onChange={(e) => updateFooter({ copyrightText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-400 font-mono text-xs"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
