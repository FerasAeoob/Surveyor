import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/config/siteConfig';
import type { ContactFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Create schema based on language
const createSchema = (language: string) => {
  const messages = {
    en: {
      nameRequired: 'Full name is required',
      nameMin: 'Name must be at least 2 characters',
      emailInvalid: 'Invalid email address',
      emailRequired: 'Email is required',
      phoneInvalid: 'Invalid phone number',
      phoneRequired: 'Phone number is required',
      messageMin: 'Message must be at least 10 characters',
      messageRequired: 'Please describe your project',
    },
    he: {
      nameRequired: 'שם מלא נדרש',
      nameMin: 'השם חייב להכיל לפחות 2 תווים',
      emailInvalid: 'כתובת אימייל לא תקינה',
      emailRequired: 'אימייל נדרש',
      phoneInvalid: 'מספר טלפון לא תקין',
      phoneRequired: 'מספר טלפון נדרש',
      messageMin: 'ההודעה חייבת להכיל לפחות 10 תווים',
      messageRequired: 'אנא תאר את הפרויקט שלך',
    },
    ar: {
      nameRequired: 'الاسم الكامل مطلوب',
      nameMin: 'يجب أن يحتوي الاسم على حرفين على الأقل',
      emailInvalid: 'عنوان البريد الإلكتروني غير صالح',
      emailRequired: 'البريد الإلكتروني مطلوب',
      phoneInvalid: 'رقم الهاتف غير صالح',
      phoneRequired: 'رقم الهاتف مطلوب',
      messageMin: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل',
      messageRequired: 'يرجى وصف مشروعك',
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

export default function Contact() {
  const { language, isRTL } = useLanguage();
  const t = translations[language].contact;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
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
    defaultValues: {
      name: '',
      company: '',
      scope: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success (in production, this would be an actual API call)
    console.log('Form submitted:', data);
    setSubmitStatus('success');
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const contactInfo = [
    { icon: MapPin, label: t.info.address },
    { icon: Phone, label: t.info.phone },
    { icon: Mail, label: t.info.email },
    { icon: Clock, label: t.info.hours },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
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
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              {t.headline}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`lg:col-span-2 space-y-8 ${isRTL ? 'text-right' : ''}`}
            >
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 bg-secondary/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">
                      {language === 'en' ? 'Tel Aviv, Israel' : 
                       language === 'he' ? 'תל אביב, ישראל' : 
                       'تل أبيب، إسرائيل'}
                    </p>
                  </div>
                </div>
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className={`space-y-6 p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-border/50 ${isRTL ? 'text-right' : ''}`}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className={errors.name ? 'text-destructive' : ''}>
                      {t.form.name}
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={`bg-background/50 border-border/50 focus:border-cyan-500/50 ${errors.name ? 'border-destructive' : ''}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.form.company}</Label>
                    <Input
                      id="company"
                      {...register('company')}
                      className="bg-background/50 border-border/50 focus:border-cyan-500/50"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Project Scope */}
                  <div className="space-y-2">
                    <Label htmlFor="scope" className={errors.scope ? 'text-destructive' : ''}>
                      {t.form.scope}
                    </Label>
                    <Select onValueChange={(value) => setValue('scope', value)}>
                      <SelectTrigger className={`bg-background/50 border-border/50 ${errors.scope ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder={t.form.scope} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="survey">{t.form.scopeOptions.survey}</SelectItem>
                        <SelectItem value="planning">{t.form.scopeOptions.planning}</SelectItem>
                        <SelectItem value="modeling">{t.form.scopeOptions.modeling}</SelectItem>
                        <SelectItem value="consultation">{t.form.scopeOptions.consultation}</SelectItem>
                        <SelectItem value="other">{t.form.scopeOptions.other}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.scope && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.scope.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className={errors.phone ? 'text-destructive' : ''}>
                      {t.form.phone}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className={`bg-background/50 border-border/50 focus:border-cyan-500/50 ${errors.phone ? 'border-destructive' : ''}`}
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? 'text-destructive' : ''}>
                    {t.form.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`bg-background/50 border-border/50 focus:border-cyan-500/50 ${errors.email ? 'border-destructive' : ''}`}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className={errors.message ? 'text-destructive' : ''}>
                    {t.form.message}
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    rows={5}
                    className={`bg-background/50 border-border/50 focus:border-cyan-500/50 resize-none ${errors.message ? 'border-destructive' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                  className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
                    submitStatus === 'success'
                      ? 'bg-green-500 hover:bg-green-500'
                      : submitStatus === 'error'
                      ? 'bg-destructive hover:bg-destructive'
                      : 'bg-cyan-500 hover:bg-cyan-400'
                  } text-background`}
                >
                  {submitStatus === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.form.submitting}
                    </span>
                  ) : submitStatus === 'success' ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {t.form.success}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {t.form.submit}
                    </span>
                  )}
                </Button>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-destructive flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    {t.form.error}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
