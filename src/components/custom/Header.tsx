import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations, languageNames, navLinks } from '@/config/siteConfig';
import type { Language } from '@/config/siteConfig';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Detect active section
      const sections = ['hero', 'about', 'services', 'portfolio', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[hsl(222_18%_6%/0.88)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_hsl(222_20%_4%/0.8)]'
            : 'bg-transparent'
        }`}
      >
        {/* Subtle top accent line */}
        {isScrolled && (
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        )}

        <div className="section-padding">
          <nav className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* ── Logo ── */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Logo mark */}
              <div className="relative w-9 h-9 lg:w-10 lg:h-10 shrink-0">
                {/* Outer glow ring */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Main icon */}
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_16px_hsl(192_100%_52%/0.3)] group-hover:shadow-[0_0_24px_hsl(192_100%_52%/0.5)] transition-shadow duration-300">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" strokeOpacity="0.6" />
                    <path d="M2 12l10 5 10-5" strokeOpacity="0.4" />
                  </svg>
                </div>
              </div>

              <div className={`hidden sm:block ${isRTL ? 'text-right' : ''}`}>
                <div className="font-bold text-[15px] leading-tight tracking-[-0.01em]">GeoPrecision</div>
                <div className="text-[10px] text-cyan-500/70 tracking-[0.18em] uppercase font-mono-premium mt-0.5">
                  {language === 'en' ? 'Surveying & Arch' :
                   language === 'he' ? 'מדידות ואדריכלות' :
                   'مساحة وهندسة'}
                </div>
              </div>
            </motion.a>

            {/* ── Desktop Navigation ── */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.key}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {t.nav[link.key as keyof typeof t.nav]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Right Side Actions ── */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground hover:bg-white/[0.05] text-sm"
                  >
                    <Globe className="w-4 h-4 text-cyan-500/70" />
                    <span className="hidden sm:inline font-medium">{languageNames[language]}</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[140px] bg-[hsl(222_16%_10%/0.95)] backdrop-blur-2xl border-border/40"
                >
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`cursor-pointer text-sm ${language === lang ? 'bg-cyan-500/10 text-cyan-400' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {languageNames[lang]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA Button - Desktop */}
              <motion.button
                onClick={() => scrollToSection('#contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-background bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_20px_hsl(192_100%_52%/0.3)] hover:shadow-[0_0_30px_hsl(192_100%_52%/0.5)]"
              >
                {language === 'en' ? 'Get Quote' :
                 language === 'he' ? 'קבל הצעה' :
                 'احصل على عرض'}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden overflow-hidden"
          >
            <div className="section-padding py-5 bg-[hsl(222_18%_7%/0.97)] backdrop-blur-2xl border-b border-white/[0.06]">
              {/* Accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

              <nav className={`flex flex-col gap-1 ${isRTL ? 'items-end' : 'items-start'}`}>
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.3, ease: 'easeOut' }}
                      className="w-full"
                    >
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/15'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                        } ${isRTL ? 'text-right' : ''}`}
                      >
                        {t.nav[link.key as keyof typeof t.nav]}
                      </button>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.3, ease: 'easeOut' }}
                  className="w-full pt-3 mt-2 border-t border-border/30"
                >
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full py-3.5 rounded-xl font-semibold text-background bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_20px_hsl(192_100%_52%/0.3)]"
                  >
                    {language === 'en' ? 'Get a Quote' :
                     language === 'he' ? 'קבל הצעת מחיר' :
                     'احصل على عرض'}
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
