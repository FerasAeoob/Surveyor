import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations, navLinks, companyInfo } from '@/config/siteConfig';
import { Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const footerT = t.footer;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="relative section-padding">
        <div className="max-w-7xl mx-auto">
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 ${isRTL ? 'text-right' : ''}`}>
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-background font-bold text-xl">G</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xl">{companyInfo.name}</div>
                  <div className="text-xs text-muted-foreground tracking-wider">
                    {language === 'en' ? 'SURVEYING & ARCHITECTURE' : 
                     language === 'he' ? 'מדידות ואדריכלות' : 
                     'مساحة وهندسة معمارية'}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-md mb-6">
                {language === 'en' 
                  ? 'Tel Aviv\'s premier surveying and architectural firm, delivering millimeter-accurate geospatial data and visionary design solutions.'
                  : language === 'he'
                  ? 'חברת המדידות והאדריכלות המובילה בתל אביב, מספקת נתוני מרחב מדויקים לרמת המילימטר ופתרונות עיצוב חזוניים.'
                  : 'شركة المساحة والهندسة المعمارية الرائدة في تل أبيب، تقدم بيانات جغرافية مكانية دقيقة للمليمتر وحلول تصميمية رؤيوية.'}
              </p>
              <div className="flex gap-4">
                <a
                  href={companyInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-cyan-400" />
                </a>
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-muted-foreground hover:text-cyan-400" />
                </a>
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'en' ? 'Quick Links' : 
                 language === 'he' ? 'קישורים מהירים' : 
                 'روابط سريعة'}
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-cyan-400 transition-colors"
                    >
                      {t.nav[link.key as keyof typeof t.nav]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'en' ? 'Certifications' : 
                 language === 'he' ? 'תעודות הסמכה' : 
                 'الشهادات'}
              </h4>
              <ul className="space-y-3">
                {companyInfo.certifications.map((cert, index) => (
                  <li key={index} className="text-muted-foreground text-sm">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {footerT.rights}
            </p>
            <p className="text-sm text-cyan-400 font-medium">
              {footerT.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-cyan-500 text-background flex items-center justify-center shadow-lg hover:bg-cyan-400 transition-colors z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
