import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations, navLinks, companyInfo } from '@/config/siteConfig';
import { Linkedin, Instagram, Mail, ChevronUp } from 'lucide-react';

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const footerT = t.footer;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { href: companyInfo.social.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400' },
    { href: companyInfo.social.instagram, icon: Instagram, label: 'Instagram', color: 'hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-400' },
    { href: `mailto:${companyInfo.contact.email}`, icon: Mail, label: 'Email', color: 'hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400' },
  ];

  return (
    <>
      <footer className="relative pt-16 pb-10 lg:pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 blueprint-grid opacity-15" />
        <div className="cad-line-cyan absolute top-0 inset-x-0" />

        {/* Top ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/[0.025] blur-[80px] pointer-events-none" />

        <div className="relative section-padding">
          <div className="max-w-7xl mx-auto">

            {/* ── Main Footer Grid ── */}
            <div className={`grid md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14 ${isRTL ? 'text-right' : ''}`}>

              {/* Brand — spans 5 cols */}
              <div className="lg:col-span-5">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative w-11 h-11 shrink-0">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/10 blur-md" />
                    <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_hsl(192_100%_52%/0.3)]">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" strokeOpacity="0.6" />
                        <path d="M2 12l10 5 10-5" strokeOpacity="0.4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{companyInfo.name}</div>
                    <div className="text-[10px] text-cyan-500/60 tracking-[0.18em] uppercase font-mono-premium">
                      {language === 'en' ? 'Surveying & Architecture' :
                       language === 'he' ? 'מדידות ואדריכלות' :
                       'مساحة وهندسة معمارية'}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xs mb-6">
                  {language === 'en'
                    ? "Tel Aviv's premier surveying and architectural firm, delivering millimeter-accurate geospatial data and visionary design solutions."
                    : language === 'he'
                    ? 'חברת המדידות והאדריכלות המובילה בתל אביב, מספקת נתוני מרחב מדויקים לרמת המילימטר ופתרונות עיצוב חזוניים.'
                    : 'شركة المساحة والهندسة المعمارية الرائدة في تل أبيب، تقدم بيانات جغرافية مكانية دقيقة للمليمتر وحلول تصميمية رؤيوية.'}
                </p>

                {/* Social links */}
                <div className="flex gap-3">
                  {socials.map(({ href, icon: Icon, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-10 h-10 rounded-xl bg-secondary/40 border border-border/40 flex items-center justify-center text-muted-foreground transition-all duration-300 ${color}`}
                    >
                      <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links — spans 3 cols */}
              <div className="lg:col-span-3">
                <h4 className="text-[11px] font-mono-premium tracking-[0.2em] uppercase text-muted-foreground/50 mb-5">
                  {language === 'en' ? 'Navigation' :
                   language === 'he' ? 'ניווט' :
                   'التنقل'}
                </h4>
                <ul className="space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-muted-foreground/70 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-3 h-px bg-border/50 group-hover:bg-cyan-500/60 group-hover:w-5 transition-all duration-200" />
                        {t.nav[link.key as keyof typeof t.nav]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications — spans 4 cols */}
              <div className="lg:col-span-4">
                <h4 className="text-[11px] font-mono-premium tracking-[0.2em] uppercase text-muted-foreground/50 mb-5">
                  {language === 'en' ? 'Certifications' :
                   language === 'he' ? 'הסמכות' :
                   'الشهادات'}
                </h4>
                <ul className="space-y-2.5">
                  {companyInfo.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 shrink-0" />
                      <span className="text-sm text-muted-foreground/60 leading-relaxed">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="pt-8 border-t border-border/25 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground/40 font-mono-premium">
                {footerT.rights}
              </p>

              {/* Center — coordinates */}
              <div className="text-[11px] font-mono-premium text-muted-foreground/25 hidden md:block">
                32.0853° N · 34.7818° E · IL
              </div>

              <p className="text-xs text-cyan-400/60 font-mono-premium">
                {footerT.tagline}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Scroll to Top — Floating ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-xl
              bg-gradient-to-br from-cyan-400 to-cyan-500
              text-background flex items-center justify-center
              shadow-[0_4px_20px_hsl(192_100%_52%/0.4)]
              hover:shadow-[0_8px_30px_hsl(192_100%_52%/0.5)]
              transition-shadow duration-300 z-40"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
