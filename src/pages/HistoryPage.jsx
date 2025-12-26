import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  History, 
  ClipboardList, 
  Trash2, 
  Eye, 
  Search,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Activity,
  Loader2
} from 'lucide-react';
import { useTests, useDeleteTest } from '@/hooks/useTest';
import { clearAllTests } from '@/utils/localStorage';
import { getSeverityInfo } from '@/utils/ruleBasedReasoning';
import { toast } from 'sonner';
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem, cardHoverVariants } from '@/components/AnimatedPage';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: testsData, isLoading, error, refetch } = useTests();
  const deleteTestMutation = useDeleteTest();
  
  const tests = testsData || [];

  const filteredTests = useMemo(() => {
    if (!searchTerm) return tests;
    
    const filtered = tests.filter(test => {
      const diagnosis = test.diagnosed_disease || '';
      const patientName = test.patient_name || '';
      const patientCode = test.patient_code || '';
      const searchLower = searchTerm.toLowerCase();
      return (
        diagnosis.toLowerCase().includes(searchLower) ||
        patientName.toLowerCase().includes(searchLower) ||
        patientCode.toLowerCase().includes(searchLower) ||
        dayjs(test.checkup_at).format('DD/MM/YYYY').includes(searchLower)
      );
    });
    return filtered;
  }, [searchTerm, tests]);

  const handleDelete = (id) => {
    deleteTestMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      }
    });
  };

  const handleClearAll = () => {
    clearAllTests();
    toast.success(t('history.messages.clearSuccess'));
    refetch();
  };

  const getSeverityGradient = (diagnosis) => {
    // Determine severity based on diagnosis
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return 'from-red-500 to-rose-500';
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return 'from-orange-500 to-amber-500';
    } else {
      return 'from-emerald-500 to-teal-500';
    }
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
      <AnimatedPage className="min-h-[calc(100vh-4rem)] py-8">
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
      <AnimatedPage className="min-h-[calc(100vh-4rem)] py-8">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[50vh] items-center justify-center">
            <Card className="max-w-md">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
                <h3 className="mb-2 text-lg font-semibold">Error Loading History</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {error.message || 'Failed to load test history'}
                </p>
                <Button onClick={() => refetch()}>Try Again</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <motion.div
                  className="mb-2 inline-flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <History className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                    {t('common.medicalExpertSystem')}
                  </Badge>
                </motion.div>
                <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">{t('history.title')}</h1>
                <p className="text-muted-foreground">
                  {t('history.subtitle')}
                </p>
              </div>
              {tests.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="destructive" className="shadow-lg shadow-destructive/25">
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('history.clearAll')}
                      </Button>
                    </motion.div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-0 bg-card/95 backdrop-blur-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('history.dialog.deleteAll')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('history.dialog.deleteAllDesc')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-2">{t('common.cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground">
                        {t('history.dialog.deleteAllButton')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Search and Stats */}
        {tests.length > 0 && (
          <FadeIn delay={0.1}>
            <div className="mb-8 grid gap-6 sm:grid-cols-3">
              {/* Search */}
              <Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm sm:col-span-2">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder={t('history.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 border-2 bg-background/50 pl-12 text-base transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Total Tests Stat */}
              <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover">
                <Card className="h-full border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('history.totalTests')}</p>
                      <p className="text-3xl font-bold text-foreground">{tests.length}</p>
                    </div>
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg"
                      whileHover={{ rotate: 10 }}
                    >
                      <History className="h-7 w-7 text-white" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </FadeIn>
        )}

        {/* Tests List */}
        {filteredTests.length === 0 ? (
          <FadeIn delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-dashed border-2 bg-card/50">
                <CardContent className="flex flex-col items-center justify-center py-20">
                  <motion.div
                    className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ClipboardList className="h-12 w-12 text-muted-foreground" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-semibold text-foreground">
                    {tests.length === 0 ? t('history.noHistory') : t('history.noResults')}
                  </h3>
                  <p className="mb-8 max-w-md text-center text-muted-foreground">
                    {tests.length === 0
                      ? t('history.noHistoryDesc')
                      : t('history.noResultsDesc')}
                  </p>
                  {tests.length === 0 && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => navigate('/test')} className="bg-gradient-to-r from-primary to-accent px-8 py-6 text-lg shadow-lg shadow-primary/25">
                        <Sparkles className="mr-2 h-5 w-5" />
                        {t('history.startAssessment')}
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>
        ) : (
          <StaggerContainer className="space-y-4">
            <AnimatePresence>
              {filteredTests.map((test) => {
                return (
                  <StaggerItem key={test.id}>
                    <motion.div
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      layout
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
                                  onClick={() => navigate(`/result/${test.id}`)}
                                  className="border-2 transition-all duration-300 hover:border-primary hover:bg-primary/5"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t('history.viewDetails')}
                                </Button>
                              </motion.div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10">
                                      <Trash2 className="h-5 w-5 text-destructive" />
                                    </Button>
                                  </motion.div>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="border-0 bg-card/95 backdrop-blur-xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>{t('history.dialog.deleteOne')}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {t('history.dialog.deleteOneDesc')}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="border-2">{t('common.cancel')}</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDelete(test.id)}
                                      className="bg-destructive text-destructive-foreground"
                                    >
                                      {t('history.dialog.deleteButton')}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </AnimatePresence>
          </StaggerContainer>
        )}
      </div>
    </AnimatedPage>
  );
}
