import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, 
  History, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  Activity,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  Loader2
} from 'lucide-react';
import { useDashboardOverview } from '@/hooks/useDashboard';
import { getSeverityInfo } from '@/utils/ruleBasedReasoning';
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem, cardHoverVariants } from '@/components/AnimatedPage';
import { getUser } from '@/utils/localStorage';
import { useTests } from '@/hooks/useTest';
import dayjs from 'dayjs';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: overview, isLoading, error, refetch } = useDashboardOverview();
  const { data: testsData, isLoading: testsLoading, error: testsError, refetch: testsRefetch } = useTests();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.greeting.morning');
    if (hour < 18) return t('dashboard.greeting.afternoon');
    return t('dashboard.greeting.evening');
  };

  const getSeverityIcon = (diagnosis) => {
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return <AlertCircle className="h-5 w-5 text-white" />;
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return <Activity className="h-5 w-5 text-white" />;
    } else {
      return <CheckCircle2 className="h-5 w-5 text-white" />;
    }
  };

  const getSeverityGradient = (diagnosis) => {
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return 'from-red-500 to-rose-500';
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return 'from-orange-500 to-amber-500';
    } else {
      return 'from-emerald-500 to-teal-500';
    }
  };

  const getSeverityBadge = (diagnosis) => {
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return 'destructive';
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return 'secondary';
    } else {
      return 'outline';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <AnimatedPage className="min-h-[calc(100vh-4rem)] py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[50vh] items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">{t('common.loading')}</p>
            </motion.div>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  // Error state
  if (error) {
    return (
      <AnimatedPage className="min-h-[calc(100vh-4rem)] py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[50vh] items-center justify-center">
            <Card className="max-w-md">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
                <h3 className="mb-2 text-lg font-semibold">Error Loading Dashboard</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {error.message || 'Failed to load dashboard data'}
                </p>
                <Button onClick={() => refetch()}>Try Again</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  const user = getUser();
  const statistics = overview?.data?.statistics;
  const recentTests = testsData || [];
  const totalTests = overview.my_medical_records || 0;

  const statsData = [
    {
      title: t('dashboard.stats.totalTests'),
      value: totalTests,
      description: t('dashboard.stats.totalTestsDesc'),
      icon: ClipboardList,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: t('dashboard.stats.lastAssessment'),
      value: dayjs(recentTests[0].checkup_at).format('DD MMM YYYY') || t('dashboard.stats.na'),
      description: recentTests[0].checkup_at ? t('dashboard.stats.lastAssessmentDesc') : t('dashboard.stats.noTests'),
      icon: Calendar,
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      title: t('dashboard.stats.averageCF'),
      value: statistics?.averageConfidence || '0.00',
      description: 'Average confidence score',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <AnimatedPage className="min-h-[calc(100vh-4rem)] py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <motion.div
              className="mb-2 inline-flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{t('dashboard.welcome')}</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {getGreeting()}, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{user?.name}</span>!
            </h1>
          </div>
        </FadeIn>

        {/* Stats Cards */}
        <StaggerContainer className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Card className="relative overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <motion.div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient}`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Quick Actions */}
        <FadeIn delay={0.3}>
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">{t('dashboard.quickActions.title')}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate('/test')}
                className="cursor-pointer"
              >
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm transition-all duration-300">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg"
                            whileHover={{ rotate: -10 }}
                          >
                            <ClipboardList className="h-6 w-6 text-white" />
                          </motion.div>
                          <span>{t('dashboard.quickActions.startNew')}</span>
                        </CardTitle>
                        <CardDescription className="ml-15 mt-2">
                          {t('dashboard.quickActions.startNewDesc')}
                        </CardDescription>
                      </div>
                      <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:text-primary" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate('/history')}
                className="cursor-pointer"
              >
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm transition-all duration-300">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-primary shadow-lg"
                            whileHover={{ rotate: 10 }}
                          >
                            <History className="h-6 w-6 text-white" />
                          </motion.div>
                          <span>{t('dashboard.quickActions.viewHistory')}</span>
                        </CardTitle>
                        <CardDescription className="ml-15 mt-2">
                          {t('dashboard.quickActions.viewHistoryDesc')}
                        </CardDescription>
                      </div>
                      <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:text-primary" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* Recent Tests */}
        <FadeIn delay={0.4}>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">{t('dashboard.recentAssessments.title')}</h2>
              </div>
              {recentTests.length > 0 && (
                <motion.div whileHover={{ x: 5 }}>
                  <Button variant="ghost" onClick={() => navigate('/history')} className="group">
                    {t('dashboard.recentAssessments.viewAll')}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              )}
            </div>

            {recentTests.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-dashed border-2 bg-card/50">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <motion.div
                      className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ClipboardList className="h-10 w-10 text-muted-foreground" />
                    </motion.div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">{t('dashboard.recentAssessments.noAssessments')}</h3>
                    <p className="mb-6 max-w-sm text-center text-muted-foreground">
                      {t('dashboard.recentAssessments.noAssessmentsDesc')}
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => navigate('/test')} className="bg-gradient-to-r from-primary to-accent shadow-lg">
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t('dashboard.recentAssessments.startAssessment')}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <StaggerContainer className="space-y-4">
                {recentTests.slice(0, 5).map((test) => {
                  return (
                    <StaggerItem key={test.id}>
                      <motion.div
                        variants={cardHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              {/* Test Info */}
                              <div className="flex flex-1 items-start gap-4">
                                <motion.div
                                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getSeverityGradient(test.diagnosed_disease)} shadow-lg`}
                                  whileHover={{ rotate: 10, scale: 1.1 }}
                                >
                                  {getSeverityIcon(test.diagnosed_disease)}
                                </motion.div>
                                <div className="flex-1">
                                  <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                      {test.diagnosed_disease || 'Unknown'}
                                    </h3>
                                    <Badge variant={getSeverityBadge(test.diagnosed_disease)}>
                                      {test.patient_code}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      <span>{dayjs(test.checkup_at).format('DD MMM YYYY, HH:mm')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="h-4 w-4" />
                                      <span>
                                        {test.patient_name} ({test.patient_age} tahun)
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Activity className="h-4 w-4" />
                                      <span>
                                        Gejala: <span className="font-semibold text-foreground">{test.symptoms?.length || 0}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-3">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/result/${test.id}`)}
                                    className="h-10 border-2 px-4 transition-all duration-300 hover:border-primary hover:bg-primary/5"
                                  >
                                    {t('dashboard.recentAssessments.viewDetails')}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
