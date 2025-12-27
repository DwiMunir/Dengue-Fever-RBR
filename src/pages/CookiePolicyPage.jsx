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
  Cookie,
  Settings,
  BarChart3,
  Shield,
  Globe,
  SlidersHorizontal,
  Mail
} from 'lucide-react';
import { CONTACT_INFO } from '@/config/contactInfo';
import useIsMobile from '@/hooks/useIsMobile';

export default function CookiePolicyPage() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  const sections = [
    {
      icon: Cookie,
      title: t('cookies.sections.essential.title'),
      content: t('cookies.sections.essential.content'),
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Settings,
      title: t('cookies.sections.preferences.title'),
      content: t('cookies.sections.preferences.content'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: t('cookies.sections.analytics.title'),
      content: t('cookies.sections.analytics.content'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: t('cookies.sections.functionality.title'),
      content: t('cookies.sections.functionality.content'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Globe,
      title: t('cookies.sections.thirdParty.title'),
      content: t('cookies.sections.thirdParty.content'),
      gradient: 'from-indigo-500 to-violet-500'
    },
    {
      icon: SlidersHorizontal,
      title: t('cookies.sections.manage.title'),
      content: t('cookies.sections.manage.content'),
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
              {t('cookies.badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {t('cookies.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('cookies.subtitle')}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('cookies.lastUpdated')}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </FadeIn>

        {/* Introduction */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Cookie className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    {t('cookies.intro.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('cookies.intro.content')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Cookie Sections */}
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
                    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm transition-colors hover:border-primary/50">
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
                        <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
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
                {t('cookies.contact.title')}
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                {t('cookies.contact.description')}
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
