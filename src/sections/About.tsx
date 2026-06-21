import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/config/siteConfig';
import { Compass, Scan, Plane, Award, Users, Cpu, X } from 'lucide-react';

// Tech stack data with rich info — one entry per icon
const TECH_STACK = [
  {
    Icon: Compass,
    nameEn: 'GNSS RTK', nameHe: 'GNSS RTK', nameAr: 'GNSS RTK',
    descEn: 'Real-Time Kinematic GNSS systems providing centimeter-accurate positioning across any terrain. Essential for topographic surveys, cadastral mapping, and infrastructure control networks.',
    descHe: 'מערכות GNSS קינמטיות בזמן אמת שמספקות מיקום מדויק של סנטימטרים על כל שטח. חיוני לסקרים טופוגרפיים, מיפוי קדסטרלי ורשתות בקרת תשתיות.',
    descAr: 'أنظمة GNSS الحركية في الوقت الفعلي توفر تحديد موقع بدقة سنتيمتر عبر أي تضاريس. ضرورية للمسوحات الطبوغرافية والرسم المساحي وشبكات السيطرة.',
    tagsEn: ['Sub-cm accuracy', 'RTK & PPK', 'Multi-constellation'],
    tagsHe: ['דיוק תת-סנטימטרי', 'RTK & PPK', 'רב-קבוצתי'],
    tagsAr: ['دقة أقل من سم', 'RTK وPPK', 'متعدد المجموعات'],
    color: 'from-cyan-500/20 to-blue-600/10',
    accentColor: 'text-cyan-400',
    bgAccent: 'bg-cyan-500/10',
    borderAccent: 'border-cyan-500/30',
  },
  {
    Icon: Scan,
    nameEn: '3D Laser Scanning', nameHe: 'סריקת לייזר תלת-ממדית', nameAr: 'المسح الضوئي ثلاثي الأبعاد',
    descEn: 'High-density LiDAR scanners capture up to 2 million points per second with ±2 mm accuracy. Used for as-built documentation, heritage preservation, structural monitoring, and BIM integration.',
    descHe: 'סורקי LiDAR בצפיפות גבוהה לוכדים עד 2 מיליון נקודות בשנייה בדיוק של ±2 מ"מ. משמש לתיעוד, שימור מורשת, ניטור מבנים ושילוב BIM.',
    descAr: 'تلتقط ماسحات LiDAR عالية الكثافة ما يصل إلى مليوني نقطة في الثانية بدقة ±2مم للتوثيق والحفاظ على التراث وتكامل BIM.',
    tagsEn: ['±2mm accuracy', '2M pts/sec', 'BIM-ready'],
    tagsHe: ['דיוק ±2מ"מ', '2M נקודות/שניה', 'מוכן ל-BIM'],
    tagsAr: ['دقة ±2مم', '2M نقطة/ثانية', 'جاهز لـ BIM'],
    color: 'from-purple-500/20 to-purple-700/10',
    accentColor: 'text-purple-400',
    bgAccent: 'bg-purple-500/10',
    borderAccent: 'border-purple-500/30',
  },
  {
    Icon: Plane,
    nameEn: 'Drone Photogrammetry', nameHe: 'צילום-גאומטריה בלט"מ', nameAr: 'المسح الجوي بالطائرات',
    descEn: 'Fixed-wing and multi-rotor UAVs equipped with high-resolution cameras, multispectral sensors and thermal imagers. Delivers orthophotos, 3D models and point clouds over hundreds of hectares per flight.',
    descHe: 'מל"טים עם כנפיים קבועות ורב-רוטור עם מצלמות ברזולוציה גבוהה, חיישנים רב-ספקטרליים ומצלמות תרמיות. מספק אורתופוטואים ומודלים תלת-ממדיים.',
    descAr: 'طائرات بجناح ثابت ومتعددة الدوارات بكاميرات عالية الدقة ومستشعرات متعددة الأطياف. توفر صوراً جوية ونماذج ثلاثية الأبعاد.',
    tagsEn: ['GSD < 2cm', '4K Multispectral', 'Thermal Imaging'],
    tagsHe: ['GSD < 2 ס"מ', 'רב-ספקטרלי 4K', 'תרמי'],
    tagsAr: ['GSD < 2سم', 'متعدد أطياف 4K', 'تصوير حراري'],
    color: 'from-emerald-500/20 to-teal-600/10',
    accentColor: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/30',
  },
  {
    Icon: Cpu,
    nameEn: 'BIM & Digital Twins', nameHe: 'BIM ותאומים דיגיטליים', nameAr: 'BIM والتوائم الرقمية',
    descEn: 'Building Information Modeling from LOD 100 to LOD 500, integrated with digital twin platforms for real-time asset monitoring, facility management and lifecycle analysis.',
    descHe: 'מודל BIM מ-LOD 100 עד LOD 500, משולב עם פלטפורמות תאום דיגיטלי לניטור נכסים בזמן אמת וניהול מתקנים.',
    descAr: 'نمذجة معلومات البناء من LOD 100 إلى LOD 500، متكاملة مع منصات التوأم الرقمي لمراقبة الأصول وإدارة المرافق.',
    tagsEn: ['LOD 100–500', 'Revit / IFC', 'Digital Twin'],
    tagsHe: ['LOD 100–500', 'Revit / IFC', 'תאום דיגיטלי'],
    tagsAr: ['LOD 100–500', 'Revit / IFC', 'توأم رقمي'],
    color: 'from-orange-500/20 to-red-600/10',
    accentColor: 'text-orange-400',
    bgAccent: 'bg-orange-500/10',
    borderAccent: 'border-orange-500/30',
  },
  {
    Icon: Award,
    nameEn: 'Quality Standards', nameHe: 'תקני איכות', nameAr: 'معايير الجودة',
    descEn: 'ISO 9001:2015 certified quality management system. Every deliverable is independently verified against ISO, Israeli Land Registry, and client specifications through our in-house QA team.',
    descHe: 'מערכת ניהול איכות מוסמכת ISO 9001:2015. כל תוצר מאומת באופן עצמאי מול ISO, רשם המקרקעין ומפרטי הלקוח.',
    descAr: 'نظام إدارة الجودة المعتمد ISO 9001:2015. كل منتج يتم التحقق منه بشكل مستقل.',
    tagsEn: ['ISO 9001:2015', 'ISO 14001', 'Land Registry Cert.'],
    tagsHe: ['ISO 9001:2015', 'ISO 14001', 'רישום מקרקעין'],
    tagsAr: ['ISO 9001:2015', 'ISO 14001', 'شهادة الأراضي'],
    color: 'from-yellow-500/20 to-amber-600/10',
    accentColor: 'text-yellow-400',
    bgAccent: 'bg-yellow-500/10',
    borderAccent: 'border-yellow-500/30',
  },
  {
    Icon: Users,
    nameEn: 'Expert Team', nameHe: 'צוות מומחים', nameAr: 'فريق الخبراء',
    descEn: '45 certified surveyors, architects, and geospatial engineers with an average of 15 years of field experience. Fluent in Hebrew, Arabic and English — serving the full spectrum of Israeli development.',
    descHe: '45 מודדים, אדריכלים ומהנדסי מרחב מוסמכים עם ממוצע של 15 שנות ניסיון שטח. שולטים בעברית, ערבית ואנגלית.',
    descAr: '45 مساحاً ومهندساً معمارياً معتمداً بمتوسط 15 سنة خبرة ميدانية.',
    tagsEn: ['45 Specialists', '15yr avg. exp.', 'Trilingual'],
    tagsHe: ['45 מומחים', '15 שנה ניסיון', 'טריינגלי'],
    tagsAr: ['45 متخصصاً', '15 سنة خبرة', 'ثلاثي اللغات'],
    color: 'from-blue-500/20 to-indigo-600/10',
    accentColor: 'text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/30',
  },
];

type Lang = 'en' | 'he' | 'ar';

// Animated number counter component
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || started) return;
    setStarted(true);

    // Extract numeric part
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const decimals = value.includes('.') ? value.split('.')[1]?.length || 0 : 0;

    if (isNaN(num)) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(prefix + current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, duration, started]);

  return <div ref={ref}>{display}</div>;
}

export default function About() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].about;
  const lang = language as Lang;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedTech, setSelectedTech] = useState<number | null>(null);

  const getName = (item: typeof TECH_STACK[0]) =>
    lang === 'he' ? item.nameHe : lang === 'ar' ? item.nameAr : item.nameEn;
  const getDesc = (item: typeof TECH_STACK[0]) =>
    lang === 'he' ? item.descHe : lang === 'ar' ? item.descAr : item.descEn;
  const getTags = (item: typeof TECH_STACK[0]) =>
    lang === 'he' ? item.tagsHe : lang === 'ar' ? item.tagsAr : item.tagsEn;

  const selected = selectedTech !== null ? TECH_STACK[selectedTech] : null;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <section ref={sectionRef} id="about" className="relative py-28 lg:py-36 overflow-hidden">
      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 blueprint-grid-dense opacity-40" />
      {/* Top blend from hero */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[hsl(222,18%,6%)] to-transparent pointer-events-none" />
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative section-padding">
        <div className="max-w-7xl mx-auto">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-16 ${isRTL ? 'text-right' : ''}`}
          >
            <div className="section-label mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              {t.sectionTitle}
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08]">
              {t.headline}
            </h2>
          </motion.div>

          {/* ── Content Grid ── */}
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* ── Left — Text + Tech Stack ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className={`space-y-5 ${isRTL ? 'text-right' : ''}`}
            >
              {t.paragraphs.map((paragraph, index) => (
                <motion.p key={index} variants={itemVariants} className="text-[1.0625rem] text-muted-foreground leading-[1.75]">
                  {paragraph}
                </motion.p>
              ))}

              {/* ─ Clickable Tech Stack ─ */}
              <motion.div variants={itemVariants} className="pt-6">
                <div className={`text-[11px] font-mono-premium tracking-[0.2em] uppercase text-muted-foreground/60 mb-4 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'en' ? '// Technology Stack'
                   : language === 'he' ? '// מערך הטכנולוגיות'
                   : '// حزمة التقنيات'}
                </div>

                {/* Icon row — 6 colored tech icons */}
                <div className="flex flex-wrap gap-2.5">
                  {TECH_STACK.map(({ Icon, accentColor, bgAccent, borderAccent }, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedTech(selectedTech === index ? null : index)}
                      title={getName(TECH_STACK[index])}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-13 h-13 w-[52px] h-[52px] rounded-xl border flex items-center justify-center
                        transition-all duration-300 focus:outline-none cursor-pointer overflow-hidden
                        ${selectedTech === index
                          ? `${bgAccent} ${borderAccent} shadow-[0_0_20px_hsl(192_100%_52%/0.2)]`
                          : 'bg-secondary/40 border-border/40 hover:border-border/80 hover:bg-secondary/70'}`}
                    >
                      {selectedTech === index && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${TECH_STACK[index].color} opacity-80`} />
                      )}
                      <Icon className={`relative z-10 w-5 h-5 transition-colors ${selectedTech === index ? accentColor : 'text-muted-foreground'}`} />
                    </motion.button>
                  ))}
                </div>

                {/* Animated info panel */}
                <AnimatePresence>
                  {selected && (
                    <motion.div
                      key={selectedTech}
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden mt-3"
                    >
                      <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${selected.color} border ${selected.borderAccent}/40 overflow-hidden`}
                        style={{ background: 'linear-gradient(135deg, hsl(222 16% 11% / 0.95) 0%, hsl(222 20% 8% / 1) 100%)' }}
                      >
                        {/* Corner accents */}
                        <div className={`absolute top-0 left-0 w-5 h-5 border-t border-l ${selected.borderAccent}`} />
                        <div className={`absolute top-0 right-0 w-5 h-5 border-t border-r ${selected.borderAccent}`} />
                        <div className={`absolute bottom-0 left-0 w-5 h-5 border-b border-l ${selected.borderAccent}`} />
                        <div className={`absolute bottom-0 right-0 w-5 h-5 border-b border-r ${selected.borderAccent}`} />

                        {/* Close */}
                        <button
                          onClick={() => setSelectedTech(null)}
                          className="absolute top-3 end-3 z-20 w-6 h-6 flex items-center justify-center rounded-full bg-border/20 hover:bg-border/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className={`relative z-10 ${isRTL ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className={`w-8 h-8 rounded-lg ${selected.bgAccent} border ${selected.borderAccent}/60 flex items-center justify-center`}>
                              <selected.Icon className={`w-4 h-4 ${selected.accentColor}`} />
                            </div>
                            <div className={`text-sm font-semibold ${selected.accentColor}`}>{getName(selected)}</div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {getDesc(selected)}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {getTags(selected).map((tag) => (
                              <span key={tag} className="tag-pill">{tag}</span>
                            ))}
                          </div>
                        </div>

                        {/* Ambient gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-30 pointer-events-none`} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* ── Right — Stats & Visual ── */}
            <div className="space-y-6">
              {/* Stats grid — premium animated counters */}
              <div className="grid grid-cols-2 gap-4">
                {t.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="stat-card-premium group"
                  >
                    {/* Corner accents */}
                    <div className="corner-tl" />
                    <div className="corner-tr" />
                    <div className="corner-bl" />
                    <div className="corner-br" />

                    <div className={`relative z-10 ${isRTL ? 'text-right' : ''}`}>
                      <div className="text-3xl lg:text-4xl font-black text-gradient mb-1.5 font-mono-premium tabular-nums">
                        <AnimatedCounter value={stat.value} duration={1800} />
                      </div>
                      <div className="text-xs text-muted-foreground/70 leading-relaxed">{stat.label}</div>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>

              {/* Visual — Animated point cloud */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/40"
                style={{
                  background: 'linear-gradient(135deg, hsl(222 16% 10%) 0%, hsl(222 20% 7%) 100%)',
                }}
              >
                {/* Grid overlay */}
                <div className="absolute inset-0 blueprint-grid opacity-60" />

                {/* Animated SVG visualization */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <svg viewBox="0 0 400 240" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    {/* Grid lines */}
                    {Array.from({ length: 16 }, (_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 16} x2="400" y2={i * 16} stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 26 }, (_, i) => (
                      <line key={`v-${i}`} x1={i * 16} y1="0" x2={i * 16} y2="240" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" />
                    ))}

                    {/* Terrain contour lines */}
                    <path d="M 10 200 Q 60 175, 100 185 T 180 160 T 260 140 T 340 155 T 390 150" fill="none" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5" />
                    <path d="M 10 180 Q 60 155, 100 165 T 180 140 T 260 118 T 340 133 T 390 128" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
                    <path d="M 10 160 Q 60 132, 100 144 T 180 118 T 260 94 T 340 110 T 390 105" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="0.75" />
                    <path d="M 40 148 Q 90 118, 130 128 T 210 100 T 285 78 T 360 90" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="0.5" />

                    {/* Survey control points */}
                    {[
                      [80, 165], [160, 138], [240, 112], [320, 130], [180, 100], [260, 78], [100, 185]
                    ].map(([x, y], i) => (
                      <g key={i}>
                        <circle cx={x} cy={y} r="5" fill="rgba(0,212,255,0.12)" />
                        <circle cx={x} cy={y} r="3" fill="rgba(0,212,255,0.5)" />
                        <circle cx={x} cy={y} r="1.5" fill="#00d4ff" />
                        {/* Crosshair */}
                        <line x1={x - 7} y1={y} x2={x - 4} y2={y} stroke="#00d4ff" strokeWidth="0.75" opacity="0.6" />
                        <line x1={x + 4} y1={y} x2={x + 7} y2={y} stroke="#00d4ff" strokeWidth="0.75" opacity="0.6" />
                        <line x1={x} y1={y - 7} x2={x} y2={y - 4} stroke="#00d4ff" strokeWidth="0.75" opacity="0.6" />
                        <line x1={x} y1={y + 4} x2={x} y2={y + 7} stroke="#00d4ff" strokeWidth="0.75" opacity="0.6" />
                      </g>
                    ))}

                    {/* Connection lines */}
                    <line x1="80" y1="165" x2="160" y2="138" stroke="rgba(0,212,255,0.25)" strokeWidth="0.75" strokeDasharray="4,3" />
                    <line x1="160" y1="138" x2="240" y2="112" stroke="rgba(0,212,255,0.25)" strokeWidth="0.75" strokeDasharray="4,3" />
                    <line x1="240" y1="112" x2="320" y2="130" stroke="rgba(0,212,255,0.25)" strokeWidth="0.75" strokeDasharray="4,3" />
                    <line x1="160" y1="138" x2="180" y2="100" stroke="rgba(0,212,255,0.2)" strokeWidth="0.75" strokeDasharray="3,3" />

                    {/* Scan line animation */}
                    <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(0,212,255,0.5)" strokeWidth="1">
                      <animateMotion path="M 0,0 V 240" dur="3s" repeatCount="indefinite" />
                    </line>
                  </svg>
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_18%_7%)] via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_18%_7%/0.4)] via-transparent to-[hsl(222_18%_7%/0.4)]" />

                {/* Label */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 ${isRTL ? 'text-right' : ''}`}>
                  <div className="text-xs font-mono-premium text-cyan-400 mb-0.5">
                    {language === 'en' ? 'LiDAR Point Cloud' : language === 'he' ? 'ענן נקודות LiDAR' : 'سحابة نقاط LiDAR'}
                  </div>
                  <div className="text-[11px] text-muted-foreground/50 font-mono-premium">
                    {language === 'en' ? '2.3M pts · ±2mm · LOD 500' : language === 'he' ? '2.3M נקודות · ±2מ"מ · LOD 500' : '2.3M نقطة · ±2مم · LOD 500'}
                  </div>
                </div>

                {/* Top-right indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono-premium text-cyan-400/60">LIVE</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
