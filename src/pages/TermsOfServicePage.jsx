import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AnimatedPage, 
  FadeIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/AnimatedPage';
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scale,
  UserX,
  RefreshCw,
  Mail
} from 'lucide-react';
import { CONTACT_INFO } from '@/config/contactInfo';
import useIsMobile from '@/hooks/useIsMobile';

export default function TermsOfServicePage() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  const sections = [
    {
      icon: CheckCircle,
      title: t('terms.sections.acceptance.title'),
      content: t('terms.sections.acceptance.content'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: t('terms.sections.serviceDescription.title'),
      content: t('terms.sections.serviceDescription.content'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: UserX,
      title: t('terms.sections.userResponsibilities.title'),
      content: t('terms.sections.userResponsibilities.content'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: AlertTriangle,
      title: t('terms.sections.medicalDisclaimer.title'),
      content: t('terms.sections.medicalDisclaimer.content'),
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: Scale,
      title: t('terms.sections.intellectualProperty.title'),
      content: t('terms.sections.intellectualProperty.content'),
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: XCircle,
      title: t('terms.sections.limitation.title'),
      content: t('terms.sections.limitation.content'),
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: UserX,
      title: t('terms.sections.termination.title'),
      content: t('terms.sections.termination.content'),
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: RefreshCw,
      title: t('terms.sections.changes.title'),
      content: t('terms.sections.changes.content'),
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
              {t('terms.badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {t('terms.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('terms.subtitle')}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </FadeIn>

        {/* Introduction */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    {t('terms.intro.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('terms.intro.content')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Terms Sections */}
        <FadeIn delay={0.2}>
          <StaggerContainer className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                    transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 300 }}
                  >
                    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <motion.div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${section.gradient}`}
                            whileHover={shouldReduceMotion ? undefined : { rotate: 10 }}
                            transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 300 }}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {section.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </FadeIn>

        {/* Contact Section */}
        <FadeIn delay={0.3}>
          <Card className="mt-8 border-0 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">
                {t('terms.contact.title')}
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                {t('terms.contact.description')}
              </p>
              <p className="mt-4 font-medium text-primary">
                {CONTACT_INFO.policyEmail}
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
