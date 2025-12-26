import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { 
  AnimatedPage, 
  StaggerContainer, 
  StaggerItem, 
  FadeIn, 
  AnimatedSection,
  cardHoverVariants 
} from '@/components/AnimatedPage';
import { 
  Activity, 
  Brain, 
  ClipboardCheck, 
  Shield, 
  Clock, 
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowDown
} from 'lucide-react';
import { isAuthenticated } from '@/utils/localStorage';

// Golden Ratio: 1.618
// Spacing scale based on golden ratio: 8, 13, 21, 34, 55, 89, 144

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authenticated = isAuthenticated();

  const handleGetStarted = () => {
    if (authenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: Brain,
      title: t('landing.features.aiPowered'),
      description: t('landing.features.aiPoweredDesc'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ClipboardCheck,
      title: t('landing.features.comprehensive'),
      description: t('landing.features.comprehensiveDesc'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: t('landing.features.confidence'),
      description: t('landing.features.confidenceDesc'),
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Clock,
      title: t('landing.features.quickResults'),
      description: t('landing.features.quickResultsDesc'),
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Shield,
      title: t('landing.features.privacyFirst'),
      description: t('landing.features.privacyFirstDesc'),
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Activity,
      title: t('landing.features.trackHistory'),
      description: t('landing.features.trackHistoryDesc'),
      gradient: 'from-indigo-500 to-blue-500'
    }
  ];

  const stats = [
    { value: t('landing.stats.questions'), label: t('landing.stats.questionsLabel'), icon: ClipboardCheck },
    { value: t('landing.stats.accuracy'), label: t('landing.stats.accuracyLabel'), icon: Zap },
    { value: t('landing.stats.time'), label: t('landing.stats.timeLabel'), icon: Clock }
  ];

  const steps = [
    { number: 1, title: t('landing.howItWorks.step1'), desc: t('landing.howItWorks.step1Desc') },
    { number: 2, title: t('landing.howItWorks.step2'), desc: t('landing.howItWorks.step2Desc') },
    { number: 3, title: t('landing.howItWorks.step3'), desc: t('landing.howItWorks.step3Desc') },
  ];

  return (
    <AnimatedPage className="overflow-hidden">
      {/* Hero Section - Full Height */}
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge - mb-8 (13px * 2) */}
            <FadeIn delay={0.1}>
              <motion.div
                className="mb-8 inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  className="gap-2 border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm" 
                  variant="outline"
                >
                  <Sparkles className="h-4 w-4" />
                  {t('common.medicalExpertSystem')}
                </Badge>
              </motion.div>
            </FadeIn>

            {/* Main Heading - mb-8 */}
            <FadeIn delay={0.2}>
              <h1 className="mb-8 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {t('landing.hero.title')}
                <span className="relative mt-2 inline-block w-full">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    {t('landing.hero.titleHighlight')}
                  </span>
                  <motion.span
                    className="absolute -bottom-3 left-0 right-0 mx-auto h-1.5 w-48 rounded-full bg-gradient-to-r from-primary via-accent to-secondary sm:w-64 md:w-72 lg:w-80"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                  />
                </span>
              </h1>
            </FadeIn>

            {/* Subheading - mb-13 (21px * 2) */}
            <FadeIn delay={0.3}>
              <p className="mx-auto mb-13 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl" style={{ marginBottom: '42px' }}>
                {t('landing.hero.subtitle')}
              </p>
            </FadeIn>

            {/* CTA Buttons - mb-21 (34px * 2) */}
            <FadeIn delay={0.4}>
              <div className="mb-16 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    onClick={handleGetStarted}
                    className="group relative h-14 overflow-hidden bg-gradient-to-r from-primary to-accent px-10 text-base font-semibold shadow-xl shadow-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 sm:h-16 sm:px-12 sm:text-lg"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {t('landing.hero.startDiagnosis')}
                      <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="h-14 border-2 px-10 text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-primary/5 sm:h-16 sm:px-12 sm:text-lg"
                  >
                    {t('landing.hero.signIn')}
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            {/* Stats - Golden ratio spacing */}
            <FadeIn delay={0.6}>
              <div className="grid grid-cols-3 gap-5 sm:gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="group relative rounded-2xl bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-8"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <Icon className="mx-auto mb-3 h-7 w-7 text-primary sm:mb-4 sm:h-9 sm:w-9" />
                      <div className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/30 p-1">
            <motion.div
              className="h-2 w-1 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Golden ratio: py-34 (55px) */}
      <AnimatedSection className="py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 text-center lg:mb-20">
              <Badge className="mb-5 gap-2 bg-secondary/10 text-secondary" variant="outline">
                <Zap className="h-4 w-4" />
                Features
              </Badge>
              <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {t('landing.features.title')}
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                {t('landing.features.subtitle')}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="h-full"
                  >
                    <Card className="group relative flex h-full flex-col overflow-hidden border-0 bg-card/60 backdrop-blur-sm transition-all duration-500">
                      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
                      <CardContent className="relative flex flex-1 flex-col p-6 sm:p-8">
                        <motion.div
                          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </motion.div>
                        <h3 className="mb-3 text-xl font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="flex-1 text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* How It Works Section - Improved with horizontal line */}
      <AnimatedSection className="relative py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 to-background" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 text-center lg:mb-20">
              <Badge className="mb-5 gap-2 bg-accent/10 text-accent" variant="outline">
                <Activity className="h-4 w-4" />
                How It Works
              </Badge>
              <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {t('landing.howItWorks.title')}
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                {t('landing.howItWorks.subtitle')}
              </p>
            </div>
          </FadeIn>

          <div className="relative mx-auto max-w-5xl">
            {/* Horizontal Connection Line - Only visible on lg screens */}
            <div className="absolute left-0 right-0 top-[60px] hidden lg:block">
              <div className="mx-auto h-0.5 max-w-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            <StaggerContainer className="grid gap-10 md:grid-cols-3 lg:gap-12" delay={0.2}>
              {steps.map((step, index) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    className="relative flex flex-col items-center text-center"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step Number Circle */}
                    <motion.div
                      className="relative z-10 mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-2xl shadow-primary/30"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                        <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
                          {step.number}
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className="mb-3 text-xl font-semibold text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="max-w-xs text-muted-foreground">
                      {step.desc}
                    </p>

                    {/* Arrow for mobile */}
                    {index < steps.length - 1 && (
                      <motion.div 
                        className="my-6 md:hidden"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowDown className="h-6 w-6 text-primary/50" />
                      </motion.div>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* Important Notice Section */}
      <AnimatedSection className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5 backdrop-blur-sm">
              <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:p-10">
                <motion.div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <AlertCircle className="h-8 w-8 text-accent" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
                    {t('landing.disclaimer.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('landing.disclaimer.content')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {t('landing.cta.title')}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t('landing.cta.subtitle')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="group relative h-14 overflow-hidden bg-gradient-to-r from-primary to-accent px-10 text-base font-semibold shadow-2xl shadow-primary/30 transition-all duration-300 sm:h-16 sm:px-14 sm:text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('landing.cta.button')}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
}
