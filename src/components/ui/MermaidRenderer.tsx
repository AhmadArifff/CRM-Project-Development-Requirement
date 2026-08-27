'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, Eye, Code2, AlertCircle } from 'lucide-react';

interface MermaidRendererProps {
  chart: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'diagram' | 'code'>('diagram');

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      try {
        setHasError(false);
        mermaid.initialize({
          startOnLoad: false,
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

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const cleanChart = chart.trim();
        const { svg } = await mermaid.render(id, cleanChart);
        
        if (isMounted) {
          setSvgHtml(svg);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setHasError(true);
        }
      }
    };

    if (chart) {
      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-cyan-500/30 bg-slate-950/95 overflow-hidden shadow-2xl">
      {/* Diagram Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
          <span className="font-mono font-bold text-cyan-300 tracking-wider text-[11px]">
            MERMAID DIAGRAM ENGINE
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

          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Salin source diagram"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Diagram Canvas Body */}
      <div className="p-4 sm:p-6 overflow-x-auto min-h-[140px] flex items-center justify-center bg-[#04060b]">
        {viewMode === 'diagram' ? (
          hasError ? (
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
              className="w-full flex justify-center items-center [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:drop-shadow-lg"
            />
          )
        ) : (
          <pre className="w-full text-xs font-mono text-cyan-300 bg-slate-900/90 p-4 rounded-xl text-left overflow-x-auto border border-slate-800 leading-relaxed">
            {chart}
          </pre>
        )}
      </div>
    </div>
  );
};
