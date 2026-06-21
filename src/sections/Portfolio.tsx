import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations, projectImages } from '@/config/siteConfig';
import type { ProjectCategory } from '@/types';
import { MapPin, Calendar, Ruler, ExternalLink } from 'lucide-react';

const categoryOrder: ProjectCategory[] = ['all', 'urban', 'topo', 'modeling', 'industrial'];

export default function Portfolio() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].portfolio;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filteredProjects = activeFilter === 'all'
    ? t.projects
    : t.projects.filter(p => p.category === activeFilter);

  // Variable heights for masonry visual interest
  const getItemHeight = (index: number) => {
    const pattern = ['h-80', 'h-96', 'h-72', 'h-80', 'h-96', 'h-72', 'h-80', 'h-96'];
    return pattern[index % pattern.length];
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-25" />
      <div className="cad-line-cyan absolute top-0 inset-x-0" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative section-padding">
        <div className="max-w-7xl mx-auto">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${isRTL ? 'text-right' : ''}`}
          >
            <div className="section-label mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              {t.sectionTitle}
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08]">
              {t.headline}
            </h2>
          </motion.div>

          {/* ── Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mb-12 ${isRTL ? 'text-right' : ''}`}
          >
            <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-secondary/30 border border-border/30">
              {categoryOrder.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {activeFilter === category && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_2px_12px_hsl(192_100%_52%/0.35)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t.filters[category]}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Masonry Grid ── */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={`break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden ${getItemHeight(index)}`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={projectImages[project.id]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Base gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_18%_6%)] via-[hsl(222_18%_6%/0.4)] to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Category badge (always visible) + Illustration badge */}
                  <div className="absolute top-4 left-4 flex gap-1.5 items-center z-10">
                    <span className="px-2.5 py-1 text-[11px] font-medium font-mono-premium bg-[hsl(222_18%_6%/0.7)] backdrop-blur-md text-cyan-400 rounded-lg border border-cyan-500/20">
                      {t.filters[project.category as ProjectCategory]}
                    </span>
                    <span className="px-1.5 py-1 text-[9px] font-medium bg-[hsl(222_18%_6%/0.45)] backdrop-blur-md text-white/50 rounded-lg border border-white/5">
                      {language === 'en' ? 'Illustration' : language === 'he' ? 'תמונת המחשה' : 'صورة توضيحية'}
                    </span>
                  </div>

                  {/* External link icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-lg bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white/80" />
                    </div>
                  </div>

                  {/* Blueprint corner accents on hover */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-400" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-400" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-400" />

                  {/* Content overlay */}
                  <div className={`absolute inset-0 p-5 flex flex-col justify-end ${isRTL ? 'text-right' : ''}`}>
                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      <h3 className="text-[1rem] font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Meta info */}
                      <div className={`space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75`}>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-cyan-400/80 font-mono-premium">
                          <Ruler className="w-3.5 h-3.5 shrink-0" />
                          <span>{project.specs}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold
                bg-secondary/50 border border-border/40 text-muted-foreground
                hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/[0.07]
                transition-all duration-300"
            >
              <span>
                {language === 'en' ? 'Discuss Your Project' :
                 language === 'he' ? 'דון בפרויקט שלך' :
                 'ناقش مشروعك'}
              </span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
