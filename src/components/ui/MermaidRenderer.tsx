'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, Eye, Code2, AlertCircle, Sparkles, Loader2, Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MermaidRendererProps {
  chart: string;
}

const VALID_DIAGRAM_PREFIXES = [
  'flowchart',
  'graph',
  'sequencediagram',
  'classdiagram',
  'statediagram',
  'erdiagram',
  'journey',
  'gantt',
  'pie',
  'gitgraph',
  'mindmap',
  'timeline',
  'c4',
  'sankey',
  'block',
];

const isValidDiagramHeader = (code: string): boolean => {
  if (!code || typeof code !== 'string') return false;
  const trimmed = code.trim().toLowerCase();
  const firstLine = trimmed.split('\n')[0].replace(/\s+/g, '').toLowerCase();
  return VALID_DIAGRAM_PREFIXES.some((prefix) => firstLine.startsWith(prefix));
};

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'diagram' | 'code'>('diagram');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const cleanChart = (chart || '').trim();

    if (!cleanChart || !isValidDiagramHeader(cleanChart)) {
      setIsCompiling(true);
      setHasError(false);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: 'dark',
          themeVariables: {
            darkMode: true,
            background: '#04060b',
            primaryColor: '#1e293b',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#00f2fe',
            lineColor: '#38bdf8',
            secondaryColor: '#0f172a',
            tertiaryColor: '#1e1b4b',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
          securityLevel: 'loose',
        });

        const isValid = await mermaid.parse(cleanChart, { suppressErrors: true });
        if (!isValid && isValid !== undefined) {
          if (isMounted) {
            setIsCompiling(true);
          }
          return;
        }

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, cleanChart);

        if (isMounted) {
          setSvgHtml(svg);
          setHasError(false);
          setIsCompiling(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsCompiling(true);
        }
      }
    }, 120);

    return () => {
      isMounted = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    if (!svgHtml) return;
    const blob = new Blob([svgHtml], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devpulse-diagram-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="my-6 rounded-2xl border border-cyan-500/30 bg-slate-950/95 overflow-hidden shadow-2xl transition-all">
        {/* Diagram Header Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isCompiling ? 'bg-amber-400 animate-ping' : 'bg-cyan-400 animate-pulse'} shadow-sm shadow-cyan-400`} />
            <span className="font-mono font-bold text-cyan-300 tracking-wider text-[11px]">
              {isCompiling ? 'DIAGRAM COMPILING...' : 'MERMAID DIAGRAM ENGINE'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('diagram')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'diagram'
                    ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Diagram Visual</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('code')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'code'
                    ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Source Code</span>
              </button>
            </div>

            {svgHtml && viewMode === 'diagram' && (
              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setIsModalOpen(true);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="Perbesar & Pan Diagram (Fullscreen)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Salin source diagram"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Diagram Canvas Body */}
        <div className="p-4 sm:p-6 overflow-x-auto min-h-[140px] flex items-center justify-center bg-[#04060b]">
          {viewMode === 'diagram' ? (
            isCompiling || !svgHtml ? (
              <div className="flex flex-col items-center justify-center p-6 space-y-3 text-center">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10">
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                </div>
                <p className="text-xs text-cyan-300/80 font-medium">
                  AI sedang menyusun struktur diagram Mermaid...
                </p>
                <pre className="text-[10px] font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded-lg max-w-sm overflow-hidden text-ellipsis whitespace-nowrap border border-slate-800">
                  {chart.slice(0, 80)}...
                </pre>
              </div>
            ) : hasError ? (
              <div className="text-center p-4 space-y-2">
                <div className="inline-flex p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Diagram format: Raw Mermaid syntax preview
                </p>
                <pre className="text-[11px] font-mono text-cyan-300 bg-slate-900/90 p-3 rounded-xl text-left overflow-x-auto border border-slate-800">
                  {chart}
                </pre>
              </div>
            ) : (
              <div
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: svgHtml }}
                className="w-full flex justify-center items-center [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:drop-shadow-lg animate-fade-in"
              />
            )
          ) : (
            <pre className="w-full text-xs font-mono text-cyan-300 bg-slate-900/90 p-4 rounded-xl text-left overflow-x-auto border border-slate-800 leading-relaxed">
              {chart}
            </pre>
          )}
        </div>
      </div>

      {/* Fullscreen Interactive Zoom/Pan Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Mermaid Architecture Inspector</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </span>
              </div>

              {/* Control Toolbar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3))}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadSvg}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-cyan-300 border border-blue-500/40 text-xs font-semibold cursor-pointer"
                  title="Download SVG"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export SVG</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-500/40 cursor-pointer ml-2"
                  title="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Zoom Canvas */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-[#04060b] rounded-2xl border border-slate-800/80 my-4 cursor-grab active:cursor-grabbing">
              <div
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.15s ease-out' }}
                dangerouslySetInnerHTML={{ __html: svgHtml }}
                className="w-full max-w-5xl flex justify-center items-center [&>svg]:w-full [&>svg]:h-auto drop-shadow-2xl"
              />
            </div>

            <div className="text-center text-xs text-slate-500 font-mono">
              Gunakan tombol Zoom In / Out di atas untuk membaca diagram secara lebih detail.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
