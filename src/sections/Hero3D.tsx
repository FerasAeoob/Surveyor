import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 144;

const framePaths = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `${import.meta.env.BASE_URL}frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

// ─── Storytelling slides keyed to scroll progress ─────────────────────────────
interface StorySlide {
  from: number;
  to: number;
  align: 'center' | 'end' | 'start';
  headlineEn: string;
  headlineHe: string;
  headlineAr: string;
  subEn?: string;
  subHe?: string;
  subAr?: string;
  isCTA?: boolean;
}

const STORY: StorySlide[] = [
  {
    from: 0,
    to: 0.15,
    align: 'center',
    headlineEn: 'Precision That Builds the Future',
    headlineHe: 'דיוק שבונה עתיד',
    headlineAr: 'دقة تبني المستقبل',
    subEn: 'From raw terrain data to architectural reality — watch the transformation.',
    subHe: 'מנתוני שטח גולמיים למציאות אדריכלית — צפו בהפיכה.',
    subAr: 'من بيانات التضاريس الخام إلى الواقع المعماري — شاهدوا التحول.',
  },
  {
    from: 0.25,
    to: 0.45,
    align: 'end',
    headlineEn: 'Advanced LiDAR\nLaser Surveying',
    headlineHe: 'מדידות לייזר\nLiDAR מתקדמות',
    headlineAr: 'مسح ليزر\nLiDAR متقدم',
    subEn: '2 million points per second.\n±2mm accuracy. Sub-centimeter precision.',
    subHe: '2 מיליון נקודות בשנייה.\nדיוק ±2 מ"מ. רזולוציה תת-סנטימטרית.',
    subAr: '2 مليون نقطة في الثانية.\nدقة ±2مم. دقة دون السنتيمتر.',
  },
  {
    from: 0.55,
    to: 0.75,
    align: 'start',
    headlineEn: 'From Horizon\nto Reality',
    headlineHe: 'מאופק\nלמציאות',
    headlineAr: 'من الأفق\nإلى الواقع',
    subEn: 'Architectural design and BIM modeling.\nDigital twins for real-time monitoring.',
    subHe: 'תכנון אדריכלי ומידול BIM.\nתאום דיגיטלי לניטור בזמן אמת.',
    subAr: 'تصميم معماري ونمذجة BIM.\nتوأم رقمي للمراقبة.',
  },
  {
    from: 0.85,
    to: 1.0,
    align: 'center',
    headlineEn: 'Elevate\nYour Vision',
    headlineHe: 'שדרגו את\nהחזון שלכם',
    headlineAr: 'ارتقوا\nبرؤيتكم',
    isCTA: true,
  },
];

// ─── Precision Calibration Loader ─────────────────────────────────────────────
function CalibrationLoader({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'hsl(222 18% 5%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 blueprint-grid-dense opacity-30" />
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center gap-10">
        {/* Crosshair ring */}
        <div className="relative w-28 h-28">
          {/* Outer ring pulse */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-ping" style={{ animationDuration: '2s' }} />

          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background circle */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="1" />
            {/* Progress arc */}
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke="url(#loaderGrad)"
              strokeWidth="2"
              strokeDasharray={`${progress * 276.46} 276.46`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-200 ease-out"
            />
            <defs>
              <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#60efff" />
              </linearGradient>
            </defs>
            {/* Tick marks */}
            {Array.from({ length: 36 }, (_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const r1 = i % 3 === 0 ? 38 : 40;
              const r2 = 44;
              return (
                <line key={i}
                  x1={50 + r1 * Math.cos(angle - Math.PI / 2)}
                  y1={50 + r1 * Math.sin(angle - Math.PI / 2)}
                  x2={50 + r2 * Math.cos(angle - Math.PI / 2)}
                  y2={50 + r2 * Math.sin(angle - Math.PI / 2)}
                  stroke="rgba(0,212,255,0.15)" strokeWidth="0.5"
                />
              );
            })}
            {/* Crosshair lines */}
            <line x1="50" y1="14" x2="50" y2="32" stroke="#00d4ff" strokeWidth="0.75" opacity="0.5" />
            <line x1="50" y1="68" x2="50" y2="86" stroke="#00d4ff" strokeWidth="0.75" opacity="0.5" />
            <line x1="14" y1="50" x2="32" y2="50" stroke="#00d4ff" strokeWidth="0.75" opacity="0.5" />
            <line x1="68" y1="50" x2="86" y2="50" stroke="#00d4ff" strokeWidth="0.75" opacity="0.5" />
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="rgba(0,212,255,0.2)" />
            <circle cx="50" cy="50" r="1.5" fill="#00d4ff" />
          </svg>

          {/* Spinning rings */}
          <div className="absolute inset-3 border border-cyan-500/10 rounded-full" style={{ animation: 'spin 8s linear infinite' }} />
          <div className="absolute inset-6 border border-cyan-500/05 rounded-full" style={{ animation: 'spin 12s linear infinite reverse' }} />
        </div>

        <div className="text-center space-y-3">
          <div className="text-[10px] font-mono-premium tracking-[0.35em] uppercase text-cyan-500/50">
            Precision Calibration
          </div>
          <div className="text-5xl font-black text-white tabular-nums tracking-tighter font-mono-premium">
            {pct}<span className="text-cyan-400 text-3xl">%</span>
          </div>
          <div className="text-[10px] font-mono-premium tracking-[0.2em] uppercase text-white/15">
            Loading {TOTAL_FRAMES} frames
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-56 h-[2px] bg-white/[0.05] relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, hsl(192 100% 40%), hsl(192 100% 65%))',
              boxShadow: '0 0 8px hsl(192 100% 52% / 0.6)'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Story Overlay ────────────────────────────────────────────────────────────
function StoryOverlay({
  slide, visible, language, isRTL, onCTAClick,
}: {
  slide: StorySlide; visible: boolean; language: string; isRTL: boolean; onCTAClick: () => void;
}) {
  const headline = language === 'he' ? slide.headlineHe : language === 'ar' ? slide.headlineAr : slide.headlineEn;
  const sub = language === 'he' ? slide.subHe : language === 'ar' ? slide.subAr : slide.subEn;

  const alignClass =
    slide.align === 'center' ? 'items-center text-center'
      : slide.align === 'end' ? `${isRTL ? 'items-start' : 'items-end'} text-start`
        : `${isRTL ? 'items-end' : 'items-start'} text-start`;

  return (
    <AnimatePresence>
      {visible && (
         <motion.div
          key={headline}
          dir={isRTL ? 'rtl' : 'ltr'}
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 pointer-events-none ${alignClass}`}
        >
          <div
            className="max-w-2xl space-y-5"
            style={{
              padding: '2.5rem 2.5rem',
              background: 'linear-gradient(135deg, rgba(10,12,20,0.72) 0%, rgba(10,12,20,0.52) 100%)',
              backdropFilter: 'blur(20px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.5rem',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Accent line top */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)', marginBottom: '1.5rem' }} />

            <h2
              className="font-black tracking-tight leading-[1.06] whitespace-pre-line text-white"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                textShadow: '0 2px 30px rgba(0,0,0,0.9)',
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </h2>
            {sub && (
              <p
                className="text-white/75 leading-relaxed whitespace-pre-line"
                style={{
                  fontSize: 'clamp(0.875rem, 1.5vw, 1.0625rem)',
                  textShadow: '0 1px 12px rgba(0,0,0,0.7)',
                  maxWidth: '36rem',
                }}
              >
                {sub}
              </p>
            )}
            {slide.isCTA && (
              <div className="pt-3 pointer-events-auto flex flex-wrap gap-4" style={{ justifyContent: slide.align === 'center' ? 'center' : 'flex-start' }}>
                <Button
                  size="lg"
                  onClick={onCTAClick}
                  className="relative overflow-hidden font-bold px-10 py-7 text-[1.0625rem] rounded-2xl text-background transition-all duration-500 group"
                  style={{
                    background: 'linear-gradient(135deg, hsl(192 100% 52%), hsl(192 100% 40%))',
                    boxShadow: '0 0 40px hsl(192 100% 52% / 0.35), 0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {language === 'en' ? 'Start Your Project' : language === 'he' ? 'התחילו את הפרויקט' : 'ابدأ مشروعك'}
                  <ArrowRight className={`ml-3 w-5 h-5 transition-transform group-hover:translate-x-1.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Hero / ScrollyCanvas ────────────────────────────────────────────────
export default function Hero3D() {
  const { language, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);
  const progressBarWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(-1);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastActiveSlideIndexRef = useRef(-1);
  const lastShowScrollIndicatorRef = useRef(true);

  // ── Preload all frames ──
  useEffect(() => {
    let loaded = 0;
    let failed = 0;
    const loadedImages: HTMLImageElement[] = [];

    framePaths.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      const handleLoad = () => {
        loaded++;
        loadedImages[idx] = img;
        setLoadProgress((loaded + failed) / TOTAL_FRAMES);
        if (loaded + failed === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setTimeout(() => setImagesReady(true), 300);
        }
      };
      const handleError = () => {
        failed++;
        console.error(`Failed to load frame: ${src}`);
        setLoadProgress((loaded + failed) / TOTAL_FRAMES);
        if (loaded + failed === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setTimeout(() => setImagesReady(true), 300);
        }
      };
      img.onload = handleLoad;
      img.onerror = handleError;
    });
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const iw = img.width;
    const ih = img.height;
    const r = Math.max(w / iw, h / ih);
    const nw = iw * r;
    const nh = ih * r;
    const cx = (w - nw) / 2;
    const cy = (h - nh) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    if (imagesReady) {
      drawFrame(Math.round(currentFrameRef.current));
    }
  }, [imagesReady, drawFrame]);

  // Resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // ── Render loop (interpolated frame updates) ──
  useEffect(() => {
    if (!imagesReady) return;

    let animId: number;
    let lastDrawnFrame = -1;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      if (Math.abs(diff) < 0.01) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * 0.15;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      
      if (frameToDraw !== lastDrawnFrame) {
        drawFrame(frameToDraw);
        lastDrawnFrame = frameToDraw;
        
        if (counterRef.current) {
          counterRef.current.textContent = `${String(frameToDraw + 1).padStart(3, '0')}/${TOTAL_FRAMES}`;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [imagesReady, drawFrame]);

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      
      // Update target frame for interpolation loop
      targetFrameRef.current = p * (TOTAL_FRAMES - 1);

      // 1. Show/hide progress bar wrapper directly in DOM
      if (progressBarWrapperRef.current) {
        if (p > 0.01 && p < 0.99) {
          progressBarWrapperRef.current.style.opacity = '1';
        } else {
          progressBarWrapperRef.current.style.opacity = '0';
        }
      }

      // 2. Update progress bar width directly in DOM
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p * 100}%`;
      }

      // 3. Update sticky viewport opacity directly in DOM
      if (viewportRef.current) {
        if (p > 0.88) {
          viewportRef.current.style.opacity = String(1 - ((p - 0.88) / 0.12) * 0.6);
        } else {
          viewportRef.current.style.opacity = '1';
        }
      }

      // 4. Update bottom fade opacity directly in DOM
      if (bottomFadeRef.current) {
        if (p > 0.75) {
          bottomFadeRef.current.style.opacity = String(Math.min(1, (p - 0.75) / 0.2));
        } else {
          bottomFadeRef.current.style.opacity = '0';
        }
      }

      // 5. Update React states only when boundaries are crossed
      const nextIdx = STORY.findIndex(
        (s) => p >= s.from && p <= s.to
      );
      if (nextIdx !== lastActiveSlideIndexRef.current) {
        lastActiveSlideIndexRef.current = nextIdx;
        setActiveSlideIndex(nextIdx);
      }

      const nextShow = p < 0.03;
      if (nextShow !== lastShowScrollIndicatorRef.current) {
        lastShowScrollIndicatorRef.current = nextShow;
        setShowScrollIndicator(nextShow);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Loader ── */}
      <AnimatePresence>
        {!imagesReady && <CalibrationLoader progress={loadProgress} />}
      </AnimatePresence>

      {/* ── Progress bar (controlled directly via ref for maximum performance) ── */}
      <div 
        ref={progressBarWrapperRef}
        className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
          style={{ width: '0%', transition: 'width 50ms linear' }}
        />
      </div>

      <section
        ref={sectionRef}
        id="hero"
        className="relative w-full"
        style={{ height: '600vh' }}
      >
        {/* ── Sticky viewport ── */}
        <div
          ref={viewportRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]"
          style={{
            transition: 'opacity 0.15s ease-out',
          }}
        >
          {/* ── Frame canvas (drawn from memory cache — ultra high performance) ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{
              opacity: imagesReady ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />

          {/* ── Grading overlays ── */}
          <div className="absolute inset-0 z-[1] pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 25%, transparent 65%, rgba(10,10,10,0.6) 100%)',
          }} />
          <div className="absolute inset-0 z-[1] pointer-events-none" style={{
            background: 'linear-gradient(to right, rgba(10,10,10,0.35) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.35) 100%)',
          }} />
          {/* Subtle vignette */}
          <div className="absolute inset-0 z-[1] pointer-events-none" style={{
            background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 50%, rgba(10,10,10,0.5) 100%)',
          }} />

          {/* ── Story overlays ── */}
          {STORY.map((slide, i) => (
            <StoryOverlay
              key={i}
              slide={slide}
              visible={activeSlideIndex === i}
              language={language}
              isRTL={isRTL}
              onCTAClick={() => scrollToSection('contact')}
            />
          ))}

          {/* ── Frame counter ── */}
          <div className="absolute bottom-4 left-4 sm:left-6 lg:left-8 z-30 pointer-events-none select-none">
            <span 
              ref={counterRef}
              className="text-[10px] font-mono text-white/15 tabular-nums tracking-wider"
            >
              001/{TOTAL_FRAMES}
            </span>
          </div>

          {/* ── Scroll indicator ── */}
          <AnimatePresence>
            {showScrollIndicator && imagesReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
                    {language === 'en' ? 'Scroll to explore' : language === 'he' ? 'גלול לחקירה' : 'مرر للاستكشاف'}
                  </span>
                  <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1 h-1 rounded-full bg-white/40"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom fade into next section ── */}
          <div
            ref={bottomFadeRef}
            className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, transparent 0%, hsl(220 15% 8%) 100%)',
              opacity: 0,
              transition: 'opacity 0.2s ease-out',
            }}
          />
        </div>
      </section>
    </>
  );
}
