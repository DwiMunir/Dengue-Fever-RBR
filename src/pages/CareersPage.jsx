import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AnimatedPage, 
  FadeIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/AnimatedPage';
import {
  Users,
  Heart,
  TrendingUp,
  Award,
  Coffee,
  Lightbulb,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CareersPage() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Heart,
      title: t('careers.benefits.workLifeBalance.title'),
      description: t('careers.benefits.workLifeBalance.desc'),
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: t('careers.benefits.growth.title'),
      description: t('careers.benefits.growth.desc'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: t('careers.benefits.recognition.title'),
      description: t('careers.benefits.recognition.desc'),
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Coffee,
      title: t('careers.benefits.environment.title'),
      description: t('careers.benefits.environment.desc'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Lightbulb,
      title: t('careers.benefits.innovation.title'),
      description: t('careers.benefits.innovation.desc'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: t('careers.benefits.team.title'),
      description: t('careers.benefits.team.desc'),
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
              {t('careers.badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {t('careers.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('careers.subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* No Open Positions Notice */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-foreground">
                  {t('careers.noOpenings.title')}
                </h2>
                <p className="mx-auto max-w-xl text-muted-foreground">
                  {t('careers.noOpenings.description')}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Why Join Us */}
        <FadeIn delay={0.2}>
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
              {t('careers.whyJoinUs.title')}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              {t('careers.whyJoinUs.subtitle')}
            </p>
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="h-full border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <motion.div
                            className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${benefit.gradient}`}
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <h3 className="mb-2 text-lg font-semibold text-foreground">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Stay Connected */}
        <FadeIn delay={0.3}>
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">
                {t('careers.stayConnected.title')}
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                {t('careers.stayConnected.description')}
              </p>
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                  >
                    {t('careers.stayConnected.button')}
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
