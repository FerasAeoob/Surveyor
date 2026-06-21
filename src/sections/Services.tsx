import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations, serviceIcons } from '@/config/siteConfig';
import { Mountain, MapPin, Scan, Plane, Building2, Box, Circle, ArrowRight, Check, type LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const iconMap: Record<string, LucideIcon> = {
  Mountain,
  MapPin,
  Scan,
  Plane,
  Building2,
  Box,
  Circle,
  ArrowRight,
  Check,
};

// Color palette per service index
const SERVICE_PALETTES = [
  { gradient: 'from-cyan-500/20 to-blue-600/5', border: 'border-cyan-500/30', iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400', glow: 'hsl(192 100% 52% / 0.15)' },
  { gradient: 'from-purple-500/20 to-purple-700/5', border: 'border-purple-500/30', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', glow: 'hsl(270 70% 60% / 0.15)' },
  { gradient: 'from-emerald-500/20 to-teal-600/5', border: 'border-emerald-500/30', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', glow: 'hsl(162 70% 45% / 0.15)' },
  { gradient: 'from-orange-500/20 to-red-600/5', border: 'border-orange-500/30', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', glow: 'hsl(30 90% 55% / 0.15)' },
  { gradient: 'from-yellow-500/20 to-amber-600/5', border: 'border-yellow-500/30', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400', glow: 'hsl(45 100% 55% / 0.15)' },
  { gradient: 'from-blue-500/20 to-indigo-600/5', border: 'border-blue-500/30', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', glow: 'hsl(220 90% 60% / 0.15)' },
];

interface ServiceType {
  id: string;
  title: string;
  description: string;
  features: string[];
}

// Enhanced Spotlight Card Component
function SpotlightCard({
  service,
  index,
  onSelect
}: {
  service: ServiceType;
  index: number;
  onSelect: (service: ServiceType) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const palette = SERVICE_PALETTES[index % SERVICE_PALETTES.length];

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${palette.glow},
      transparent 80%
    )
  `;

  const IconComponent = iconMap[serviceIcons[service.id]] || Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(service)}
      className="group relative cursor-pointer service-card-glow"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{ background }}
      />

      {/* Main card */}
      <div
        className={`relative h-full p-7 lg:p-8 rounded-2xl overflow-hidden transition-all duration-500
          bg-gradient-to-br from-[hsl(222_16%_11%)] to-[hsl(222_20%_8%)]
          border border-border/40 group-hover:${palette.border}`}
      >
        {/* Blueprint corner accents */}
        <div className={`absolute top-0 left-0 w-6 h-6 border-t border-l border-border/30 group-hover:${palette.border}/60 transition-colors duration-300`} />
        <div className={`absolute top-0 right-0 w-6 h-6 border-t border-r border-border/30 group-hover:${palette.border}/60 transition-colors duration-300`} />
        <div className={`absolute bottom-0 left-0 w-6 h-6 border-b border-l border-border/30 group-hover:${palette.border}/60 transition-colors duration-300`} />
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b border-r border-border/30 group-hover:${palette.border}/60 transition-colors duration-300`} />

        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${palette.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Index number — decorative */}
        <div className="absolute top-5 right-6 text-[10px] font-mono-premium text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Icon */}
        <div className={`relative z-10 mb-6 w-14 h-14 rounded-xl ${palette.iconBg} border ${palette.border}/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
          style={{ boxShadow: `0 0 0 0 ${palette.glow}` }}
        >
          <IconComponent className={`w-7 h-7 ${palette.iconColor}`} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className={`text-[1.125rem] font-semibold mb-3 transition-colors duration-300 group-hover:${palette.iconColor}`}>
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-background/50 border border-border/40 text-muted-foreground/70"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full ${palette.iconBg} border ${palette.border}/50 ${palette.iconColor}`}>
                +{service.features.length - 3}
              </span>
            )}
          </div>

          {/* Learn more */}
          <div className={`flex items-center gap-2 text-sm ${palette.iconColor} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}>
            <span className="font-medium text-[13px]">View details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].services;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedService, setSelectedService] = useState<typeof t.items[0] | null>(null);
  const selectedIndex = selectedService ? t.items.findIndex(s => s.id === selectedService.id) : -1;
  const palette = selectedIndex >= 0 ? SERVICE_PALETTES[selectedIndex % SERVICE_PALETTES.length] : SERVICE_PALETTES[0];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-25" />
      <div className="cad-line-cyan absolute top-0 inset-x-0" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />

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
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08] max-w-3xl">
              {t.headline}
            </h2>
          </motion.div>

          {/* ── Services Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.items.map((service, index) => (
              <SpotlightCard
                key={service.id}
                service={service}
                index={index}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Detail Dialog ── */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-[hsl(222_18%_8%/0.98)] backdrop-blur-2xl border-border/30">
          {/* Accent line */}
          <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent`} />

          {selectedService && (
            <>
              <DialogHeader className={isRTL ? 'text-right' : ''}>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-12 h-12 rounded-xl ${palette.iconBg} border ${palette.border}/60 flex items-center justify-center shrink-0`}>
                    {(() => {
                      const IconComponent = iconMap[serviceIcons[selectedService.id]] || Circle;
                      return <IconComponent className={`w-6 h-6 ${palette.iconColor}`} />;
                    })()}
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono-premium tracking-[0.15em] uppercase ${palette.iconColor} mb-1 opacity-70`}>
                      {String(selectedIndex + 1).padStart(2, '0')} / {String(t.items.length).padStart(2, '0')}
                    </div>
                    <DialogTitle className="text-xl font-bold">{selectedService.title}</DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              <div className={`mt-4 ${isRTL ? 'text-right' : ''}`}>
                <div className="text-[10px] font-mono-premium tracking-[0.15em] uppercase text-muted-foreground/50 mb-4">
                  {language === 'en' ? '// Key Features' :
                   language === 'he' ? '// תכונות עיקריות' :
                   '// الميزات الرئيسية'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-xl bg-secondary/30 border border-border/40 hover:border-border/70 transition-colors`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full ${palette.iconBg} border ${palette.border}/40 flex items-center justify-center shrink-0`}>
                        <Check className={`w-3 h-3 ${palette.iconColor}`} />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedService(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm text-background
                    bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400
                    transition-all duration-300 shadow-[0_4px_20px_hsl(192_100%_52%/0.25)]
                    hover:shadow-[0_4px_30px_hsl(192_100%_52%/0.4)]`}
                >
                  {language === 'en' ? 'Request This Service' :
                   language === 'he' ? 'בקש שירות זה' :
                   'اطلب هذه الخدمة'}
                </motion.button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
