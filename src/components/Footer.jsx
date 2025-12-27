import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { CONTACT_INFO, getLocalizedContactInfo } from '@/config/contactInfo';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const localizedInfo = getLocalizedContactInfo(i18n.language);

  const footerLinks = {
    product: [
      { label: 'Diagnosis', href: '/test' },
      { label: 'History', href: '/history' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {/* Brand Section */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Activity className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  {t('common.dengueExpert')}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-primary/70">
                  {t('common.diagnosticSystem')}
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{CONTACT_INFO.supportEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{localizedInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Product Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
              <span>© {currentYear} DengueExpert.</span>
              <span className="flex items-center gap-1">
                {t('common.madeWith')}
                <Heart className="h-4 w-4 fill-red-500 text-red-500" /> 
                {t('common.forBetterHealth')}.
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {t('common.poweredBy')} <span className="font-semibold text-primary">{t('common.ruleBasedExpertSystem')}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
