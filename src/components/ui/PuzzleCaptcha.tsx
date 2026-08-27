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
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=640&q=80',
    title: 'Cybersecurity Matrix Data Stream',
    theme: 'emerald',
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80',
    title: 'AI Microprocessor & Quantum Logic',
    theme: 'cyan',
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
const TAB_OFFSET = PIECE_RADIUS + 5; // 12px padding for tabs
const PIECE_CANVAS_SIZE = PIECE_SIZE + TAB_OFFSET * 2; // 68px
const TOLERANCE = 10; // Precision tolerance in px (human-friendly and secure)

// Web Audio API Sound Synthesizer
const playSound = (type: 'success' | 'fail' | 'snap') => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // Harmonic C5-E5-G5-C6 chord
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.07);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.07);
        osc.stop(ctx.currentTime + index * 0.07 + 0.3);
      });
    } else if (type === 'fail') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'snap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    }
  } catch {
    // Audio Context not allowed or blocked — gracefully ignore
  }
};

export const PuzzleCaptcha: React.FC<PuzzleCaptchaProps> = ({
  onSuccess,
  title = 'Security Check: Puzzle Verification',
  description = 'Geser slider di bawah hingga potongan puzzle tepat mengisi lubang gambar untuk memverifikasi Anda adalah manusia.',
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [targetX, setTargetX] = useState(200);
  const [targetY, setTargetY] = useState(65);
  const [sliderRatio, setSliderRatio] = useState(0); // 0.0 to 1.0 normalized progress
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pieceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number>(0);
  const initialRatioRef = useRef<number>(0);

  // Min and Max horizontal position for the puzzle piece on the canvas
  const MIN_PIECE_X = 12;
  const MAX_PIECE_X = CANVAS_WIDTH - PIECE_SIZE - 12;

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
        ctx.shadowColor = 'rgba(0, 242, 254, 0.75)';
        ctx.shadowBlur = 12;
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    },
    []
  );

  // Generate procedural cyber fallback pattern on canvas
  const drawFallbackImage = useCallback((ctx: CanvasRenderingContext2D) => {
    const grad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    grad.addColorStop(0, '#040d1a');
    grad.addColorStop(0.5, '#0c1e3d');
    grad.addColorStop(1, '#031b2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Matrix cyber grid
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.18)';
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

    // Glowing Neon Circuit Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, 90);
    ctx.lineTo(110, 90);
    ctx.lineTo(140, 45);
    ctx.lineTo(260, 45);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
    ctx.beginPath();
    ctx.moveTo(35, 140);
    ctx.lineTo(170, 140);
    ctx.lineTo(200, 105);
    ctx.lineTo(325, 105);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('DEVPULSE CYBER SECURITY', 20, 28);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.85)';
    ctx.font = '10px sans-serif';
    ctx.fillText('VERIFICATION GATEWAY ACTIVE', 20, 165);
  }, []);

  // Initialize and Render Puzzle Canvas
  const initializePuzzle = useCallback(() => {
    setIsImageLoading(true);
    setSliderRatio(0);
    setErrorMessage('');

    // Safe random target coordinates (placed between 48% and 82% of width)
    const minX = Math.floor(CANVAS_WIDTH * 0.48);
    const maxX = Math.floor(CANVAS_WIDTH - PIECE_SIZE - 20);
    const minY = 25;
    const maxY = Math.floor(CANVAS_HEIGHT - PIECE_SIZE - 25);

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

      // 1. Draw main background image
      bgCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      bgCtx.drawImage(source, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 2. Extract Piece Canvas (Sized to fit puzzle shape + tabs + border)
      pieceCanvas.width = PIECE_CANVAS_SIZE;
      pieceCanvas.height = PIECE_CANVAS_SIZE;

      pieceCtx.clearRect(0, 0, PIECE_CANVAS_SIZE, PIECE_CANVAS_SIZE);
      pieceCtx.save();

      // Clip puzzle path onto piece canvas with TAB_OFFSET
      drawPuzzleShape(pieceCtx, TAB_OFFSET, TAB_OFFSET, PIECE_SIZE, PIECE_RADIUS, true);
      pieceCtx.clip();

      // Draw source image into piece canvas with inverse offset
      pieceCtx.drawImage(
        source,
        randomX - TAB_OFFSET,
        randomY - TAB_OFFSET,
        PIECE_CANVAS_SIZE,
        PIECE_CANVAS_SIZE,
        0,
        0,
        PIECE_CANVAS_SIZE,
        PIECE_CANVAS_SIZE
      );
      pieceCtx.restore();

      // 3. Draw Dark Cutout Hole on Background Canvas
      bgCtx.save();
      drawPuzzleShape(bgCtx, randomX, randomY, PIECE_SIZE, PIECE_RADIUS);
      bgCtx.fillStyle = 'rgba(4, 6, 11, 0.82)';
      bgCtx.fill();
      bgCtx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
      bgCtx.lineWidth = 2;
      bgCtx.setLineDash([5, 3]);
      bgCtx.stroke();
      bgCtx.restore();

      setIsImageLoading(false);
    };

    img.onload = () => setupCanvases(img);
    img.onerror = () => {
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

  // Handle Refresh Challenge
  const handleRefresh = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isSuccess) return;
    setImageIndex((prev) => (prev + 1) % PUZZLE_IMAGES.length);
    playSound('snap');
  };

  // Calculate current piece horizontal position based on slider ratio
  const currentPieceX = MIN_PIECE_X + sliderRatio * (MAX_PIECE_X - MIN_PIECE_X);

  // Exact target ratio required for 100% perfect match
  const targetRatio = (targetX - MIN_PIECE_X) / (MAX_PIECE_X - MIN_PIECE_X);

  // Drag Handlers
  const handleDragStart = (clientX: number) => {
    // Guard Clause: Prevent dragging if already verified or image is loading
    if (isSuccess || isImageLoading) return;

    setIsDragging(true);
    setErrorMessage('');
    dragStartXRef.current = clientX;
    initialRatioRef.current = sliderRatio;
    playSound('snap');
  };

  const handleDragMove = useCallback(
    (clientX: number) => {
      // Guard Clause: Only process while dragging
      if (!isDragging || isSuccess) return;

      const track = trackRef.current;
      if (!track) return;

      const trackWidth = track.clientWidth;
      const knobWidth = 44;
      const maxKnobTravel = Math.max(1, trackWidth - knobWidth - 8); // 8px internal padding

      const deltaX = clientX - dragStartXRef.current;
      const deltaRatio = deltaX / maxKnobTravel;
      let nextRatio = initialRatioRef.current + deltaRatio;

      // Clamp ratio bounds between 0 and 1
      if (nextRatio < 0) nextRatio = 0;
      if (nextRatio > 1) nextRatio = 1;

      setSliderRatio(nextRatio);
    },
    [isDragging, isSuccess]
  );

  const handleDragEnd = useCallback(() => {
    // Guard Clause: Early return if not dragging
    if (!isDragging || isSuccess) return;
    setIsDragging(false);

    // Calculate actual pixel difference between piece position and target hole
    const piecePosition = MIN_PIECE_X + sliderRatio * (MAX_PIECE_X - MIN_PIECE_X);
    const diff = Math.abs(piecePosition - targetX);

    if (diff <= TOLERANCE) {
      // Success Match!
      setIsSuccess(true);
      setSliderRatio(targetRatio); // Snap exactly to target
      playSound('success');

      // Trigger Confetti Celebration
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00f2fe', '#3b82f6', '#8b5cf6', '#10b981'],
      });

      // Smoothly invoke callback after celebration
      setTimeout(() => {
        onSuccess();
      }, 700);
    } else {
      // Verification Failed
      playSound('fail');
      setAttempts((prev) => prev + 1);
      setErrorMessage(
        diff > 35
          ? 'Potongan puzzle masih jauh dari tempatnya. Coba lagi!'
          : 'Sedikit lagi pas! Sejajarkan puzzle tepat di atas lubang.'
      );

      // Spring bounce back to initial state
      setSliderRatio(0);
    }
  }, [isDragging, isSuccess, sliderRatio, targetX, targetRatio, onSuccess]);

  // Global mouse & touch event listeners for smooth drag outside bounding box
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

  // Keyboard accessibility handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSuccess || isImageLoading) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderRatio((prev) => Math.min(prev + 0.03, 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderRatio((prev) => Math.max(prev - 0.03, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDragEnd();
    }
  };

  const progressPercent = Math.min(100, Math.max(0, sliderRatio * 100));

  // Determine if the piece is close enough to show proximity glow
  const isNearTarget = Math.abs(currentPieceX - targetX) <= TOLERANCE;

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
            // Percentage-based horizontal and vertical translation ensures 100% parity across resolutions
            left: `${(currentPieceX / CANVAS_WIDTH) * 100}%`,
            top: `${(targetY / CANVAS_HEIGHT) * 100}%`,
            transform: 'translate(-17.65%, -17.65%)', // Inverse offset for TAB_OFFSET (12px / 68px = ~17.65%)
            width: `${(PIECE_CANVAS_SIZE / CANVAS_WIDTH) * 100}%`,
          }}
          className={`absolute pointer-events-none transition-transform ${
            isDragging ? 'duration-0' : 'duration-300 ease-out'
          } ${isNearTarget && !isSuccess ? 'filter drop-shadow-[0_0_12px_rgba(0,242,254,0.9)]' : ''}`}
        >
          <canvas ref={pieceCanvasRef} className="w-full h-auto block drop-shadow-xl" />
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
          onMouseDown={(e) => {
            // Allow clicking track directly to position knob
            if (isSuccess || isImageLoading) return;
            handleDragStart(e.clientX);
          }}
          onTouchStart={(e) => {
            if (isSuccess || isImageLoading) return;
            if (e.touches.length > 0) {
              handleDragStart(e.touches[0].clientX);
            }
          }}
          className={`relative w-full h-12 rounded-xl bg-slate-900/90 border transition-all flex items-center px-1 overflow-hidden focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer ${
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
            className={`absolute left-0 top-0 bottom-0 transition-all pointer-events-none ${
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
              <span className="text-cyan-300 font-medium">Lepas pada posisi yang pas...</span>
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
              left: `${sliderRatio * 100}%`,
              transform: `translateX(-${sliderRatio * 44}px)`,
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleDragStart(e.clientX);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              if (e.touches.length > 0) {
                handleDragStart(e.touches[0].clientX);
              }
            }}
            className={`relative z-10 w-11 h-10 rounded-lg flex items-center justify-center transition-shadow select-none cursor-grab active:cursor-grabbing min-w-[44px] ${
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
              className="flex items-center gap-1.5 p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] font-semibold"
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
            {attempts > 0 ? `Percobaan: ${attempts}` : 'Toleransi Presisi: ±10px'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
