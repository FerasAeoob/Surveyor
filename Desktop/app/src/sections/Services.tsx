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

interface ServiceType {
  id: string;
  title: string;
  description: string;
  features: string[];
}

// Spotlight Card Component
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
  
  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      hsl(195 100% 50% / 0.15),
      transparent 80%
    )
  `;

  const IconComponent = iconMap[serviceIcons[service.id]] || Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(service)}
      className="group relative cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      
      <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-border/50 overflow-hidden transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-secondary/50">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
        
        {/* Icon */}
        <div className="mb-6 w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
          <IconComponent className="w-7 h-7 text-cyan-400" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        
        {/* Features preview */}
        <div className="flex flex-wrap gap-2">
          {service.features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-xs rounded-full bg-background/50 border border-border/50 text-muted-foreground"
            >
              {feature}
            </span>
          ))}
          {service.features.length > 2 && (
            <span className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              +{service.features.length - 2}
            </span>
          )}
        </div>
        
        {/* Learn more indicator */}
        <div className="mt-6 flex items-center text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].services;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<typeof t.items[0] | null>(null);

  return (
    <section
      ref={sectionRef}
      id="services"
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
            className={`mb-16 ${isRTL ? 'text-right' : ''}`}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              {t.sectionTitle}
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight max-w-3xl">
              {t.headline}
            </h2>
          </motion.div>

          {/* Services Grid — 2 columns, 3 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {t.items.map((service, index) => (
              <div key={service.id}>
                <SpotlightCard
                  service={service}
                  index={index}
                  onSelect={setSelectedService}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-border/50">
          {selectedService && (
            <>
              <DialogHeader className={isRTL ? 'text-right' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[serviceIcons[selectedService.id]] || Circle;
                      return <IconComponent className="w-6 h-6 text-cyan-400" />;
                    })()}
                  </div>
                  <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
                </div>
                <DialogDescription className="text-base text-muted-foreground">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className={`mt-6 ${isRTL ? 'text-right' : ''}`}>
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {language === 'en' ? 'Key Features' : 
                   language === 'he' ? 'תכונות עיקריות' : 
                   'الميزات الرئيسية'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50"
                    >
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-background font-medium rounded-lg transition-colors"
                >
                  {language === 'en' ? 'Request This Service' : 
                   language === 'he' ? 'בקש שירות זה' : 
                   'اطلب هذه الخدمة'}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
