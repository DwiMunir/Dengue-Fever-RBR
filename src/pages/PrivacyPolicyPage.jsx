import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AnimatedPage, 
  FadeIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/AnimatedPage';
import {
  Shield,
  Lock,
  Eye,
  Database,
  FileText,
  UserCheck,
  AlertCircle,
  Mail
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Database,
      title: t('privacy.sections.dataCollection.title'),
      content: t('privacy.sections.dataCollection.content'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: t('privacy.sections.dataUsage.title'),
      content: t('privacy.sections.dataUsage.content'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: t('privacy.sections.dataSecurity.title'),
      content: t('privacy.sections.dataSecurity.content'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Eye,
      title: t('privacy.sections.dataSharing.title'),
      content: t('privacy.sections.dataSharing.content'),
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: UserCheck,
      title: t('privacy.sections.userRights.title'),
      content: t('privacy.sections.userRights.content'),
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FileText,
      title: t('privacy.sections.cookies.title'),
      content: t('privacy.sections.cookies.content'),
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
              {t('privacy.badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {t('privacy.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('privacy.subtitle')}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </FadeIn>

        {/* Introduction */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    {t('privacy.intro.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('privacy.intro.content')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Privacy Sections */}
        <FadeIn delay={0.2}>
          <StaggerContainer className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <motion.div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${section.gradient}`}
                            whileHover={{ rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
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
                {t('privacy.contact.title')}
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                {t('privacy.contact.description')}
              </p>
              <p className="mt-4 font-medium text-primary">
                dengueexpert@example.com
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
