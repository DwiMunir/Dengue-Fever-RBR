import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { 
  AnimatedPage, 
  FadeIn, 
  StaggerContainer, 
  StaggerItem,
  cardHoverVariants 
} from '@/components/AnimatedPage';
import {
  Activity,
  Target,
  Users,
  Award,
  BookOpen,
  GitBranch,
  Lightbulb,
  Heart,
  Shield,
  Zap,
  User,
  Mail,
  Github,
  Linkedin
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const teamMembers = [
    {
      name: t('about.team.member1.name'),
      role: t('about.team.member1.role'),
      avatar: 'MF',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/50 hover:border-blue-500',
      bgColor: 'from-blue-200 to-cyan-200'
    },
    {
      name: t('about.team.member2.name'),
      role: t('about.team.member2.role'),
      avatar: 'MA',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/50 hover:border-purple-500',
      bgColor: 'from-purple-100 to-pink-100'
    },
    {
      name: t('about.team.member3.name'),
      role: t('about.team.member3.role'),
      avatar: 'DM',
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/50 hover:border-emerald-500',
      bgColor: 'from-emerald-100 to-teal-100'
    },
    {
      name: t('about.team.member4.name'),
      role: t('about.team.member4.role'),
      avatar: 'JS',
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/50 hover:border-orange-500',
      bgColor: 'from-orange-100 to-amber-100'
    },
    {
      name: t('about.team.member5.name'),
      role: t('about.team.member5.role'),
      avatar: 'DM',
      color: 'from-indigo-500 to-purple-500',
      borderColor: 'border-indigo-500/50 hover:border-indigo-500',
      bgColor: 'from-indigo-100 to-purple-100'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: t('about.features.ruleBased.title'),
      description: t('about.features.ruleBased.desc'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: GitBranch,
      title: t('about.features.forwardChaining.title'),
      description: t('about.features.forwardChaining.desc'),
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Shield,
      title: t('about.features.evidenceBased.title'),
      description: t('about.features.evidenceBased.desc'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Zap,
      title: t('about.features.efficient.title'),
      description: t('about.features.efficient.desc'),
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  const stats = [
    { value: '15+', label: t('about.stats.symptoms'), icon: Activity },
    { value: '20+', label: t('about.stats.rules'), icon: GitBranch },
    { value: '3', label: t('about.stats.diagnoses'), icon: Target },
    { value: '100%', label: t('about.stats.privacy'), icon: Shield }
  ];

  return (
    <AnimatedPage className="min-h-[calc(100vh-4rem)] py-12 sm:py-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center">
            <Badge className="mb-4 gap-2 bg-primary/10 text-primary" variant="outline">
              <Users className="h-4 w-4" />
              {t('about.badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              {t('about.title')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              {t('about.subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* Mission & Vision */}
        <FadeIn delay={0.1}>
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Card className="h-full border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{t('about.mission.title')}</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {t('about.mission.content')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Card className="h-full border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{t('about.vision.title')}</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {t('about.vision.content')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.2}>
          <div className="mb-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <Icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                      <div className="mb-1 text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>

        {/* Key Features */}
        <FadeIn delay={0.3}>
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
              {t('about.keyFeatures.title')}
            </h2>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Card className="h-full border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                        <CardContent className="p-6">
                          <motion.div
                            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
                            whileHover={{ rotate: 10, scale: 1.1 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <h3 className="mb-2 text-xl font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Team Section */}
        <FadeIn delay={0.4}>
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
              {t('about.team.title')}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              {t('about.team.subtitle')}
            </p>
            <div className="mx-auto max-w-6xl overflow-hidden">
              <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
              >
                <CarouselContent className="-ml-4">
                  {teamMembers.map((member, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        // whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="h-full"
                      >
                        <Card className={`h-full border-2 ${member.borderColor} bg-card/80 backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-br ${member.bgColor}`}>
                          <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[280px]">
                            <motion.div
                              className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${member.color} text-2xl font-bold text-white`}
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {member.avatar}
                          </motion.div>
                          <motion.h3 
                            className="mb-2 text-lg font-semibold text-foreground"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {member.name}
                          </motion.h3>
                          <motion.p 
                            className="text-sm text-muted-foreground"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {member.role}
                          </motion.p>
                        </CardContent>
                      </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </FadeIn>        {/* Commitment */}
        <FadeIn delay={0.5}>
          <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 shadow-xl backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <motion.div
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                {t('about.commitment.title')}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {t('about.commitment.content')}
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
