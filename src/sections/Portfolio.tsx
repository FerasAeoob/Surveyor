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
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const filteredProjects = activeFilter === 'all'
    ? t.projects
    : t.projects.filter(p => p.category === activeFilter);

  // Masonry layout - different heights for visual interest
  const getItemHeight = (index: number) => {
    const pattern = [ 'h-80', 'h-96', 'h-72', 'h-80', 'h-96', 'h-72', 'h-80', 'h-96' ];
    return pattern[index % pattern.length];
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="relative section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${isRTL ? 'text-right' : ''}`}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              {t.sectionTitle}
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              {t.headline}
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mb-12 ${isRTL ? 'text-right' : ''}`}
          >
            <div className="flex flex-wrap gap-2">
              {categoryOrder.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-cyan-500 text-background'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50'
                  }`}
                >
                  {t.filters[category]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden ${getItemHeight(index)}`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={projectImages[project.id]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Content Overlay */}
                  <div className={`absolute inset-0 p-5 flex flex-col justify-end ${isRTL ? 'text-right' : ''}`}>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1 text-xs font-medium bg-cyan-500/20 backdrop-blur-sm text-cyan-400 rounded-full border border-cyan-500/30">
                        {t.filters[project.category as ProjectCategory]}
                      </span>
                      <ExternalLink className="w-5 h-5 text-white/70" />
                    </div>

                    {/* Project Info */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      {/* Meta info - visible on hover */}
                      <div className={`space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 ${isRTL ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-cyan-400">
                          <Ruler className="w-4 h-4" />
                          <span>{project.specs}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blueprint corner accents on hover */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <span>
                {language === 'en' ? 'Discuss Your Project' : 
                 language === 'he' ? 'דון בפרויקט שלך' : 
                 'ناقش مشروعك'}
              </span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
