import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 144;

const framePaths = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated crosshair */}
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" />
            <circle
              cx="50" cy="50" r="44" fill="none" stroke="#00d4ff" strokeWidth="1.5"
              strokeDasharray={`${progress * 276.46} 276.46`}
              strokeLinecap="round" transform="rotate(-90 50 50)"
              className="transition-all duration-150 ease-out"
            />
            <line x1="50" y1="15" x2="50" y2="35" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6" />
            <line x1="50" y1="65" x2="50" y2="85" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6" />
            <line x1="15" y1="50" x2="35" y2="50" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6" />
            <line x1="65" y1="50" x2="85" y2="50" stroke="#00d4ff" strokeWidth="0.5" opacity="0.6" />
            <circle cx="50" cy="50" r="2" fill="#00d4ff" />
          </svg>
          <div className="absolute inset-2 border border-cyan-500/10 rounded-full animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-5 border border-cyan-500/5 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        </div>
        <div className="text-center space-y-3">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-500/70">
            Precision Calibration
          </div>
          <div className="text-4xl font-mono font-bold text-white tabular-nums tracking-tight">
            {pct}<span className="text-cyan-400">%</span>
          </div>
          <div className="text-[10px] font-mono tracking-widest uppercase text-white/20">
            Loading {TOTAL_FRAMES} frames
          </div>
        </div>
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-150 ease-out"
            style={{ width: `${pct}%` }}
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
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 pointer-events-none ${alignClass}`}
        >
          <div
            className="max-w-3xl space-y-5 px-8 py-10 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] whitespace-pre-line text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0px 6px rgba(0,0,0,0.6)' }}
            >
              {headline}
            </h2>
            {sub && (
              <p
                className="text-sm sm:text-base lg:text-lg text-white/80 max-w-lg leading-relaxed whitespace-pre-line"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
              >
                {sub}
              </p>
            )}
            {slide.isCTA && (
              <div className="pt-4 pointer-events-auto flex flex-wrap gap-4" style={{ justifyContent: slide.align === 'center' ? 'center' : 'flex-start' }}>
                <Button
                  size="lg"
                  onClick={onCTAClick}
                  className="bg-cyan-500/90 hover:bg-cyan-400 text-black font-bold px-10 py-7 text-lg rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.35)] hover:shadow-[0_0_60px_rgba(0,212,255,0.5)] transition-all duration-500 group"
                >
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
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // ── Preload all frames ──
  useEffect(() => {
    let loaded = 0;
    framePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / TOTAL_FRAMES);
        if (loaded === TOTAL_FRAMES) {
          setTimeout(() => setImagesReady(true), 300);
        }
      };
    });
  }, []);

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(p);
      setCurrentFrame(Math.min(Math.floor(p * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Which story slide is active?
  const activeSlideIndex = STORY.findIndex(
    (s) => scrollProgress >= s.from && scrollProgress <= s.to
  );

  return (
    <>
      {/* ── Loader ── */}
      <AnimatePresence>
        {!imagesReady && <CalibrationLoader progress={loadProgress} />}
      </AnimatePresence>

      {/* ── Progress bar ── */}
      {imagesReady && scrollProgress > 0.01 && scrollProgress < 0.99 && (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
            style={{ width: `${scrollProgress * 100}%`, transition: 'width 50ms linear' }}
          />
        </div>
      )}

      <section
        ref={sectionRef}
        id="hero"
        className="relative w-full"
        style={{ height: '600vh' }}
      >
        {/* ── Sticky viewport ── */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]"
          style={{
            opacity: scrollProgress > 0.88 ? 1 - ((scrollProgress - 0.88) / 0.12) * 0.6 : 1,
            transition: 'opacity 0.15s ease-out',
          }}
        >

          {/* ── Frame image (simple img swap — no canvas bugs) ── */}
          {imagesReady && (
            <img
              src={framePaths[currentFrame]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ willChange: 'auto' }}
              draggable={false}
            />
          )}

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
          <div className="absolute bottom-4 right-4 z-30 pointer-events-none select-none">
            <span className="text-[10px] font-mono text-white/15 tabular-nums tracking-wider">
              {String(currentFrame + 1).padStart(3, '0')}/{TOTAL_FRAMES}
            </span>
          </div>

          {/* ── Scroll indicator ── */}
          <AnimatePresence>
            {scrollProgress < 0.03 && imagesReady && (
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
            className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, transparent 0%, hsl(220 15% 8%) 100%)',
              opacity: scrollProgress > 0.75 ? Math.min(1, (scrollProgress - 0.75) / 0.2) : 0,
              transition: 'opacity 0.2s ease-out',
            }}
          />
        </div>
      </section>
    </>
  );
}
