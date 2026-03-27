import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/config/siteConfig';
import { Compass, Scan, Plane, Award, Users, Cpu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  },
];

type Lang = 'en' | 'he' | 'ar';

export default function About() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].about;
  const lang = language as Lang;
  const sectionRef    = useRef<HTMLElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const isInView      = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedTech, setSelectedTech] = useState<number | null>(null);

  const getName = (item: typeof TECH_STACK[0]) =>
    lang === 'he' ? item.nameHe : lang === 'ar' ? item.nameAr : item.nameEn;
  const getDesc = (item: typeof TECH_STACK[0]) =>
    lang === 'he' ? item.descHe : lang === 'ar' ? item.descAr : item.descEn;
  const getTags = (item: typeof TECH_STACK[0]) =>
    lang === 'he' ? item.tagsHe : lang === 'ar' ? item.tagsAr : item.tagsEn;

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-text', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%', end: 'top 30%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.stat-item', { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.tech-icon', { opacity: 0, rotateY: -90 }, {
        opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.tech-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const selected = selectedTech !== null ? TECH_STACK[selectedTech] : null;

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      {/* Soft gradient blending with hero fade-out */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[hsl(220,15%,8%)] to-transparent pointer-events-none" />

      <div ref={contentRef} className="relative section-padding">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-16 ${isRTL ? 'text-right' : ''}`}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              {t.sectionTitle}
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              {t.headline}
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — Text + Tech Stack */}
            <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
              {t.paragraphs.map((paragraph, index) => (
                <p key={index} className="about-text text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* ─ Clickable Tech Stack ─ */}
              <div className="tech-grid pt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {language === 'en' ? 'Our Technology Stack'
                  : language === 'he' ? 'מערך הטכנולוגיות שלנו'
                  : 'حزمة التقنيات لدينا'}
                </h3>

                {/* Icon row */}
                <div className="flex flex-wrap gap-3">
                  {TECH_STACK.map(({ Icon }, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedTech(selectedTech === index ? null : index)}
                      title={getName(TECH_STACK[index])}
                      className={`tech-icon w-14 h-14 rounded-xl border flex items-center justify-center
                        transition-all duration-300 focus:outline-none cursor-pointer
                        ${selectedTech === index
                          ? 'bg-cyan-500/15 border-cyan-500/60 shadow-[0_0_16px_hsl(195_100%_50%/0.25)]'
                          : 'bg-secondary/50 border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/10'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className={`w-6 h-6 transition-colors ${selectedTech === index ? 'text-cyan-400' : 'text-muted-foreground'}`} />
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
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="relative p-5 rounded-2xl bg-secondary/30 border border-cyan-500/25 overflow-hidden">
                        {/* Blueprint corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/40" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/40" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/40" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/40" />

                        {/* Close */}
                        <button
                          onClick={() => setSelectedTech(null)}
                          className="absolute top-3 end-3 z-20 w-6 h-6 flex items-center justify-center rounded-full bg-border/30 hover:bg-border/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className={`relative z-10 ${isRTL ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <selected.Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                            <div className="text-base font-semibold text-cyan-400">{getName(selected)}</div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {getDesc(selected)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {getTags(selected).map((tag) => (
                              <span key={tag} className="px-2.5 py-1 text-xs font-mono text-cyan-300/80 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Ambient glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right — Stats & visual */}
            <div className="space-y-8">
              <div className="stats-grid grid grid-cols-2 gap-4">
                {t.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-item relative p-6 rounded-2xl bg-secondary/30 border border-border/50 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/30" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/30" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/30" />
                    <div className={`relative z-10 ${isRTL ? 'text-right' : ''}`}>
                      <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-border/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-background" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    {Array.from({ length: 20 }, (_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 15} x2="400" y2={i * 15} stroke="rgba(0,212,255,0.1)" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 27 }, (_, i) => (
                      <line key={`v-${i}`} x1={i * 15} y1="0" x2={i * 15} y2="300" stroke="rgba(0,212,255,0.1)" strokeWidth="0.5" />
                    ))}
                    <circle cx="100" cy="200" r="4" fill="#00d4ff" opacity="0.8" />
                    <circle cx="200" cy="150" r="4" fill="#00d4ff" opacity="0.8" />
                    <circle cx="300" cy="180" r="4" fill="#00d4ff" opacity="0.8" />
                    <circle cx="150" cy="100" r="4" fill="#00d4ff" opacity="0.8" />
                    <circle cx="250" cy="220" r="4" fill="#00d4ff" opacity="0.8" />
                    <line x1="100" y1="200" x2="200" y2="150" stroke="#00d4ff" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                    <line x1="200" y1="150" x2="300" y2="180" stroke="#00d4ff" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                    <line x1="150" y1="100" x2="200" y2="150" stroke="#00d4ff" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                    <line x1="250" y1="220" x2="200" y2="150" stroke="#00d4ff" strokeWidth="1" opacity="0.5" strokeDasharray="5,5" />
                    <path d="M 50 250 Q 100 200, 150 220 T 250 180 T 350 200" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.6" />
                    <path d="M 50 220 Q 100 170, 150 190 T 250 150 T 350 170" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
                    <path d="M 50 190 Q 100 140, 150 160 T 250 120 T 350 140" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />
                  </svg>
                </div>
                <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 ${isRTL ? 'text-right' : ''}`}>
                  <div className="text-sm font-medium text-cyan-400 mb-1">
                    {language === 'en' ? 'LiDAR Point Cloud Visualization' : language === 'he' ? 'הדמיית ענן נקודות LiDAR' : 'تصور سحابة نقاط LiDAR'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'en' ? '2.3M data points | ±2mm accuracy' : language === 'he' ? '2.3M נקודות נתונים | דיוק ±2מ"מ' : '2.3M نقطة بيانات | دقة ±2مم'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
