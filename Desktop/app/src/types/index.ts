import type { Language } from '@/config/siteConfig';

export interface NavLink {
  href: string;
  key: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  specs: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

export interface ContactFormData {
  name: string;
  company?: string;
  scope: string;
  phone: string;
  email: string;
  message: string;
}

export type ProjectCategory = 'all' | 'urban' | 'topo' | 'modeling' | 'industrial';
