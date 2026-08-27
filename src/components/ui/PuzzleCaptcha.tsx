'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Puzzle,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface PuzzleCaptchaProps {
  onSuccess: () => void;
  title?: string;
  description?: string;
}

const PUZZLE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80',
    title: 'AI Microprocessor & Quantum Logic',
    theme: 'cyan',
  },
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=640&q=80',
    title: 'Cybersecurity Matrix Data Stream',
    theme: 'emerald',
  },
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80',
    title: 'Futuristic Neon Fluid Wave',
    theme: 'purple',
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=640&q=80',
    title: 'High-Tech Urban Digital Architecture',
    theme: 'blue',
  },
  {
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=640&q=80',
    title: 'Deep Prism 3D Glass Geometry',
    theme: 'indigo',
  },
];

const CANVAS_WIDTH = 340;
const CANVAS_HEIGHT = 180;
const PIECE_SIZE = 44;
const PIECE_RADIUS = 7;
const TOLERANCE = 6;

// Sound synthesizer using Web Audio API
const playSound = (type: 'success' | 'fail' | 'snap') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.08);
        osc.stop(ctx.currentTime + index * 0.08 + 0.3);
      });
    } else if (type === 'fail') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'snap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch {
    // Audio Context blocked or not supported - silently ignore
  }
};

export const PuzzleCaptcha: React.FC<PuzzleCaptchaProps> = ({
  onSuccess,
  title = 'Verifikasi Keamanan Anti-Bot',
  description = 'Geser slider puzzle untuk melengkapi gambar dan memverifikasi akses.',
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [targetX, setTargetX] = useState(180);
  const [targetY, setTargetY] = useState(60);
  const [sliderValue, setSliderValue] = useState(0); // in px (0 to maxSlider)
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pieceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number>(0);
  const initialSliderRef = useRef<number>(0);

  // Maximum slider travel distance
  const maxTravel = CANVAS_WIDTH - PIECE_SIZE - PIECE_RADIUS * 2;

  // Path helper function for drawing jigsaw puzzle shape
  const drawPuzzleShape = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      r: number,
      isPiece = false
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y);

      // Top edge with protruding tab
      ctx.lineTo(x + size / 2 - r, y);
      ctx.arc(x + size / 2, y - r + 2, r, Math.PI, 0, false);
      ctx.lineTo(x + size, y);

      // Right edge with protruding tab
      ctx.lineTo(x + size, y + size / 2 - r);
      ctx.arc(x + size + r - 2, y + size / 2, r, -Math.PI / 2, Math.PI / 2, false);
      ctx.lineTo(x + size, y + size);

      // Bottom edge with indented slot
      ctx.lineTo(x + size / 2 + r, y + size);
      ctx.arc(x + size / 2, y + size - r + 2, r, 0, Math.PI, true);
      ctx.lineTo(x, y + size);

      // Left edge with indented slot
      ctx.lineTo(x, y + size / 2 + r);
      ctx.arc(x - r + 2, y + size / 2, r, Math.PI / 2, -Math.PI / 2, true);
      ctx.lineTo(x, y);

      ctx.closePath();

      if (isPiece) {
        ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    },
    []
  );

  // Generate procedural cyber fallback pattern on canvas
  const drawFallbackImage = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const grad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#082f49');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw cyber grid
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < CANVAS_WIDTH; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_HEIGHT; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Draw Glowing Circuit Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 90);
      ctx.lineTo(120, 90);
      ctx.lineTo(150, 40);
      ctx.lineTo(260, 40);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.beginPath();
      ctx.moveTo(40, 140);
      ctx.lineTo(180, 140);
      ctx.lineTo(210, 100);
      ctx.lineTo(320, 100);
      ctx.stroke();

      // Futuristic Text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('DEVPULSE QUANTUM AI 2026', 20, 30);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.8)';
      ctx.font = '11px sans-serif';
      ctx.fillText('SECURITY GATEWAY ACTIVE', 20, 165);
    },
    []
  );

  // Initialize and Render Puzzle Canvas
  const initializePuzzle = useCallback(() => {
    setIsImageLoading(true);
    setSliderValue(0);
    setErrorMessage('');

    // Safe random target coordinates
    const minX = Math.floor(CANVAS_WIDTH * 0.45);
    const maxX = Math.floor(CANVAS_WIDTH - PIECE_SIZE - 25);
    const minY = 20;
    const maxY = Math.floor(CANVAS_HEIGHT - PIECE_SIZE - 20);

    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    setTargetX(randomX);
    setTargetY(randomY);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = PUZZLE_IMAGES[imageIndex].url;

    const setupCanvases = (source: CanvasImageSource) => {
      const bgCanvas = bgCanvasRef.current;
      const pieceCanvas = pieceCanvasRef.current;
      if (!bgCanvas || !pieceCanvas) return;

      const bgCtx = bgCanvas.getContext('2d');
      const pieceCtx = pieceCanvas.getContext('2d');
      if (!bgCtx || !pieceCtx) return;

      // 1. Draw main background
      bgCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      bgCtx.drawImage(source, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 2. Extract Piece Canvas (Sized to fit puzzle shape + tabs + border)
      const pieceCanvasSize = PIECE_SIZE + PIECE_RADIUS * 2 + 10;
      pieceCanvas.width = pieceCanvasSize;
      pieceCanvas.height = pieceCanvasSize;

      pieceCtx.clearRect(0, 0, pieceCanvasSize, pieceCanvasSize);
      pieceCtx.save();
      // Clip puzzle path onto piece canvas with tab offsets
      drawPuzzleShape(pieceCtx, PIECE_RADIUS + 5, PIECE_RADIUS + 5, PIECE_SIZE, PIECE_RADIUS, true);
      pieceCtx.clip();

      // Draw source image into piece canvas with inverse offset
      pieceCtx.drawImage(
        source,
        randomX - (PIECE_RADIUS + 5),
        randomY - (PIECE_RADIUS + 5),
        pieceCanvasSize,
        pieceCanvasSize,
        0,
        0,
        pieceCanvasSize,
        pieceCanvasSize
      );
      pieceCtx.restore();

      // 3. Draw Dark Cutout Hole on Background Canvas
      bgCtx.save();
      drawPuzzleShape(bgCtx, randomX, randomY, PIECE_SIZE, PIECE_RADIUS);
      bgCtx.fillStyle = 'rgba(4, 6, 11, 0.78)';
      bgCtx.fill();
      bgCtx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
      bgCtx.lineWidth = 2;
      bgCtx.setLineDash([4, 3]);
      bgCtx.stroke();
      bgCtx.restore();

      setIsImageLoading(false);
    };

    img.onload = () => setupCanvases(img);
    img.onerror = () => {
      // Fallback to generated canvas
      const fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.width = CANVAS_WIDTH;
      fallbackCanvas.height = CANVAS_HEIGHT;
      const fbCtx = fallbackCanvas.getContext('2d');
      if (fbCtx) {
        drawFallbackImage(fbCtx);
        setupCanvases(fallbackCanvas);
      }
    };
  }, [imageIndex, drawPuzzleShape, drawFallbackImage]);

  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle]);

  // Handle Refresh
  const handleRefresh = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isSuccess) return;
    setImageIndex((prev) => (prev + 1) % PUZZLE_IMAGES.length);
    playSound('snap');
  };

  // Drag Handlers
  const handleDragStart = (clientX: number) => {
    // Guard Clause: Prevent drag if already verified or loading
    if (isSuccess || isImageLoading) return;

    setIsDragging(true);
    setErrorMessage('');
    dragStartXRef.current = clientX;
    initialSliderRef.current = sliderValue;
    playSound('snap');
  };

  const handleDragMove = useCallback(
    (clientX: number) => {
      // Guard Clause: Only process if currently dragging
      if (!isDragging || isSuccess) return;

      const deltaX = clientX - dragStartXRef.current;
      let nextValue = initialSliderRef.current + deltaX;

      // Clamp slider bounds
      if (nextValue < 0) nextValue = 0;
      if (nextValue > maxTravel) nextValue = maxTravel;

      setSliderValue(nextValue);
    },
    [isDragging, isSuccess, maxTravel]
  );

  const handleDragEnd = useCallback(() => {
    // Guard Clause: Early return if not dragging
    if (!isDragging || isSuccess) return;
    setIsDragging(false);

    // Calculate actual piece X coordinate based on slider
    const currentPieceX = sliderValue;
    const diff = Math.abs(currentPieceX - targetX);

    if (diff <= TOLERANCE) {
      // Success Match!
      setIsSuccess(true);
      setSliderValue(targetX); // Snap precisely
      playSound('success');

      // Trigger Confetti Celebration
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#00f2fe', '#3b82f6', '#8b5cf6', '#10b981'],
      });

      // Smoothly notify parent after short celebration delay
      setTimeout(() => {
        onSuccess();
      }, 750);
    } else {
      // Verification Failed
      playSound('fail');
      setAttempts((prev) => prev + 1);
      setErrorMessage(
        diff > 30
          ? 'Potongan puzzle masih jauh dari tempatnya. Coba lagi!'
          : 'Sedikit lagi pas! Sejajarkan puzzle dengan presisi.'
      );

      // Spring bounce back to start
      setSliderValue(0);
    }
  }, [isDragging, isSuccess, sliderValue, targetX, onSuccess]);

  // Global mouse / touch listeners for smooth dragging outside bounding box
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSuccess || isImageLoading) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderValue((prev) => Math.min(prev + 5, maxTravel));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderValue((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDragEnd();
    }
  };

  const progressPercent = Math.min(100, Math.max(0, (sliderValue / maxTravel) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[390px] mx-auto glass-card rounded-2xl p-5 sm:p-6 border-slate-700/80 shadow-2xl space-y-4 select-none relative overflow-hidden"
    >
      {/* Header Badge & Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-cyan-400 border border-blue-500/30 flex items-center justify-center shadow-md">
            <Puzzle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white leading-tight">{title}</h3>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>DevPulse Security Shield</span>
            </span>
          </div>
        </div>

        {/* Refresh Challenge Button */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isSuccess || isImageLoading}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-850 hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40"
          title="Ganti gambar challenge"
          aria-label="Refresh gambar puzzle"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isImageLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <p className="text-xs text-slate-300 font-normal leading-relaxed">{description}</p>

      {/* Interactive Puzzle Visual Frame */}
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-700/90 shadow-inner bg-slate-950 flex justify-center items-center">
        {/* Main Background Canvas */}
        <canvas
          ref={bgCanvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-auto block rounded-xl"
        />

        {/* Sliding Puzzle Piece */}
        <div
          style={{
            transform: `translateX(${sliderValue}px)`,
            top: `${targetY - (PIECE_RADIUS + 5)}px`,
            left: 0,
          }}
          className={`absolute pointer-events-none transition-transform ${
            isDragging ? 'duration-0' : 'duration-300 ease-out'
          }`}
        >
          <canvas ref={pieceCanvasRef} className="block drop-shadow-xl" />
        </div>

        {/* Loading Overlay */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center gap-2 text-xs text-cyan-400 font-semibold">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span>Memuat Puzzle...</span>
          </div>
        )}

        {/* Success Overlay Banner */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-emerald-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-emerald-300 space-y-1.5 p-4 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs font-extrabold text-white">Verifikasi Berhasil!</span>
              <span className="text-[10px] text-emerald-300/90 font-mono">
                Akses AI Token Terverifikasi
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Theme Tag */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md border border-slate-800 text-[9px] font-mono text-slate-400 pointer-events-none">
          {PUZZLE_IMAGES[imageIndex].title}
        </div>
      </div>

      {/* Interactive Slider Track */}
      <div className="space-y-2">
        <div
          ref={trackRef}
          role="slider"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Geser puzzle ke posisi yang tepat"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={`relative w-full h-12 rounded-xl bg-slate-900/90 border transition-all flex items-center px-1 overflow-hidden focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
            isSuccess
              ? 'border-emerald-500/50 bg-emerald-950/30'
              : isDragging
              ? 'border-cyan-400/80 bg-slate-850 shadow-md shadow-cyan-500/10'
              : 'border-slate-700/80 hover:border-slate-600'
          }`}
        >
          {/* Track Progress Fill */}
          <div
            style={{ width: `${progressPercent}%` }}
            className={`absolute left-0 top-0 bottom-0 transition-all ${
              isSuccess
                ? 'bg-gradient-to-r from-emerald-600/40 to-teal-500/40'
                : 'bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-cyan-500/40'
            }`}
          />

          {/* Guide Text in Track */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[11px] font-semibold text-slate-400">
            {isSuccess ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terverifikasi Manusia</span>
              </span>
            ) : isDragging ? (
              <span className="text-cyan-300">Lepas pada posisi yang pas...</span>
            ) : (
              <span className="flex items-center gap-1 text-slate-400">
                <span>Geser puzzle ke kanan</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </span>
            )}
          </div>

          {/* Draggable Slider Knob */}
          <motion.div
            style={{
              transform: `translateX(${sliderValue}px)`,
            }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                handleDragStart(e.touches[0].clientX);
              }
            }}
            className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center transition-shadow select-none cursor-grab active:cursor-grabbing min-w-[40px] ${
              isSuccess
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                : isDragging
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/40 scale-105'
                : 'bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-slate-700 shadow-md hover:border-cyan-500/40'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            ) : isDragging ? (
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            ) : (
              <Puzzle className="w-4 h-4 text-cyan-400" />
            )}
          </motion.div>
        </div>

        {/* Error Feedback Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] font-semibold"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Trust Indicators */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 px-1">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Anti-Abuse Protection</span>
          </span>
          <span className="font-mono text-slate-400">
            {attempts > 0 ? `Percobaan: ${attempts}` : 'Toleransi Presisi: ±6px'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
