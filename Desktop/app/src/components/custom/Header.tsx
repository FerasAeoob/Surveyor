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
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-background font-bold text-lg">G</span>
                </div>
                {/* Blueprint grid overlay */}
                <div className="absolute inset-0 rounded-lg overflow-hidden opacity-30">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }} />
                </div>
              </div>
              <div className={`hidden sm:block ${isRTL ? 'text-right' : ''}`}>
                <div className="font-bold text-lg leading-tight">GeoPrecision</div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  {language === 'en' ? 'SURVEYING & ARCH' : 
                   language === 'he' ? 'מדידות ואדריכלות' : 
                   'مساحة وهندسة'}
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.key}
                  variant="ghost"
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-foreground hover:bg-white/5 px-4"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </Button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{languageNames[language]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`cursor-pointer ${language === lang ? 'bg-cyan-500/10 text-cyan-400' : ''}`}
                    >
                      {languageNames[lang]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA Button - Desktop */}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex bg-cyan-500 hover:bg-cyan-400 text-background font-medium"
              >
                {language === 'en' ? 'Get Quote' : 
                 language === 'he' ? 'קבל הצעת מחיר' : 
                 'احصل على عرض'}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="section-padding py-4 bg-background/95 backdrop-blur-xl border-b border-border/50">
              <nav className={`flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(link.href)}
                      className="w-full justify-start text-lg py-4"
                    >
                      {t.nav[link.key as keyof typeof t.nav]}
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="w-full pt-4"
                >
                  <Button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-background font-medium py-6"
                  >
                    {language === 'en' ? 'Get a Quote' : 
                     language === 'he' ? 'קבל הצעת מחיר' : 
                     'احصل على عرض'}
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
