import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/config/siteConfig';
import type { ContactFormData } from '@/types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const createSchema = (language: string) => {
  const messages = {
    en: {
      nameMin: 'Name must be at least 2 characters',
      emailInvalid: 'Invalid email address',
      phoneInvalid: 'Invalid phone number',
      messageMin: 'Message must be at least 10 characters',
    },
    he: {
      nameMin: 'השם חייב להכיל לפחות 2 תווים',
      emailInvalid: 'כתובת אימייל לא תקינה',
      phoneInvalid: 'מספר טלפון לא תקין',
      messageMin: 'ההודעה חייבת להכיל לפחות 10 תווים',
    },
    ar: {
      nameMin: 'يجب أن يحتوي الاسم على حرفين على الأقل',
      emailInvalid: 'عنوان البريد الإلكتروني غير صالح',
      phoneInvalid: 'رقم الهاتف غير صالح',
      messageMin: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل',
    },
  };

  const m = messages[language as keyof typeof messages] || messages.en;

  return z.object({
    name: z.string().min(2, m.nameMin),
    company: z.string().optional(),
    scope: z.string().min(1, 'Required'),
    phone: z.string().min(8, m.phoneInvalid),
    email: z.string().email(m.emailInvalid),
    message: z.string().min(10, m.messageMin),
  });
};

// Premium Input wrapper
function FieldWrapper({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1.5">
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].contact;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const schema = createSchema(language);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', company: '', scope: '', phone: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setSubmitStatus('success');
    reset();
    setTimeout(() => setSubmitStatus('idle'), 6000);
  };

  const contactInfo = [
    { icon: MapPin, label: t.info.address, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { icon: Phone, label: t.info.phone, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { icon: Mail, label: t.info.email, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { icon: Clock, label: t.info.hours, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  ];

  const inputClass = (hasError: boolean) =>
    `w-full bg-[hsl(222_16%_9%)] border text-sm text-foreground placeholder:text-muted-foreground/40 rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-0
    ${hasError
      ? 'border-red-500/50 focus:border-red-500/80'
      : 'border-border/40 hover:border-border/70 focus:border-cyan-500/50 focus:shadow-[0_0_0_3px_hsl(192_100%_52%/0.08)]'}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-25" />
      <div className="cad-line-cyan absolute top-0 inset-x-0" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[100px] pointer-events-none" />

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

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ── Left — Contact Info + Map ── */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:col-span-2 space-y-4 ${isRTL ? 'text-right' : ''}`}
            >
              {/* Contact info cards */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-[hsl(222_16%_10%)] border border-border/35 hover:border-border/60 transition-all duration-300 group`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.bg} border ${item.border}/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors leading-relaxed">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map embed */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-border/35 group"
              >
                <iframe
                  src="https://maps.google.com/maps?q=32.0853,34.7818&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ 
                    filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
                    border: 0 
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GeoPrecision Location Map"
                />
              </motion.div>
            </motion.div>

            {/* ── Right — Form ── */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <div className="relative p-7 lg:p-9 rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, hsl(222 16% 10% / 0.95) 0%, hsl(222 20% 8%) 100%)', border: '1px solid hsl(222 12% 20% / 0.7)' }}
              >
                {/* Corner accents */}
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />

                {/* Top accent line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/[0.04] blur-3xl pointer-events-none" />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={`relative z-10 space-y-5 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <FieldWrapper error={errors.name?.message}>
                      <Label htmlFor="name" className={`text-xs font-mono-premium tracking-[0.1em] uppercase text-muted-foreground/60 ${errors.name ? 'text-red-400/80' : ''}`}>
                        {t.form.name} <span className="text-cyan-500/60">*</span>
                      </Label>
                      <input
                        id="name"
                        {...register('name')}
                        className={inputClass(!!errors.name)}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </FieldWrapper>

                    {/* Company */}
                    <FieldWrapper>
                      <Label htmlFor="company" className="text-xs font-mono-premium tracking-[0.1em] uppercase text-muted-foreground/60">
                        {t.form.company}
                      </Label>
                      <input
                        id="company"
                        {...register('company')}
                        className={inputClass(false)}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Project Scope */}
                    <FieldWrapper error={errors.scope?.message}>
                      <Label htmlFor="scope" className={`text-xs font-mono-premium tracking-[0.1em] uppercase text-muted-foreground/60 ${errors.scope ? 'text-red-400/80' : ''}`}>
                        {t.form.scope} <span className="text-cyan-500/60">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue('scope', value)}>
                        <SelectTrigger
                          className={`${inputClass(!!errors.scope)} !h-auto border-[1px]`}
                        >
                          <SelectValue placeholder={`— ${t.form.scope} —`} />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(222_16%_10%/0.98)] backdrop-blur-2xl border-border/40">
                          <SelectItem value="survey">{t.form.scopeOptions.survey}</SelectItem>
                          <SelectItem value="planning">{t.form.scopeOptions.planning}</SelectItem>
                          <SelectItem value="modeling">{t.form.scopeOptions.modeling}</SelectItem>
                          <SelectItem value="consultation">{t.form.scopeOptions.consultation}</SelectItem>
                          <SelectItem value="other">{t.form.scopeOptions.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldWrapper>

                    {/* Phone */}
                    <FieldWrapper error={errors.phone?.message}>
                      <Label htmlFor="phone" className={`text-xs font-mono-premium tracking-[0.1em] uppercase text-muted-foreground/60 ${errors.phone ? 'text-red-400/80' : ''}`}>
                        {t.form.phone} <span className="text-cyan-500/60">*</span>
                      </Label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className={inputClass(!!errors.phone)}
                        dir="ltr"
                      />
                    </FieldWrapper>
                  </div>

                  {/* Email */}
                  <FieldWrapper error={errors.email?.message}>
                    <Label htmlFor="email" className={`text-xs font-mono-premium tracking-[0.1em] uppercase text-muted-foreground/60 ${errors.email ? 'text-red-400/80' : ''}`}>
                      {t.form.email} <span className="text-cyan-500/60">*</span>
                    </Label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={inputClass(!!errors.email)}
                      dir="ltr"
                    />
                  </FieldWrapper>

                  {/* Message */}
                  <FieldWrapper error={errors.message?.message}>
                    <Label htmlFor="message" className={`text-xs font-mono-premium tracking-[0.1em] uppercase text-muted-foreground/60 ${errors.message ? 'text-red-400/80' : ''}`}>
                      {t.form.message} <span className="text-cyan-500/60">*</span>
                    </Label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className={`${inputClass(!!errors.message)} resize-none`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </FieldWrapper>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitStatus === 'loading' || submitStatus === 'success'}
                    whileHover={submitStatus === 'idle' ? { scale: 1.01, y: -1 } : {}}
                    whileTap={submitStatus === 'idle' ? { scale: 0.99 } : {}}
                    className={`relative w-full py-4 px-8 rounded-xl text-[0.9375rem] font-semibold transition-all duration-500 overflow-hidden
                      ${submitStatus === 'success'
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                        : submitStatus === 'error'
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400 cursor-default'
                        : 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-background shadow-[0_4px_24px_hsl(192_100%_52%/0.3)] hover:shadow-[0_8px_32px_hsl(192_100%_52%/0.45)] disabled:opacity-70'
                      }`}
                  >
                    {/* Shimmer */}
                    {submitStatus === 'idle' && (
                      <div className="absolute inset-0 animate-shimmer opacity-50" />
                    )}

                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t.form.submitting}
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          {t.form.success}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.form.submit}
                          <ArrowRight className="w-4 h-4 opacity-60" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {submitStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm text-red-400 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {t.form.error}
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
