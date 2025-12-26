import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, CheckCircle2, Sparkles, Brain, Loader2 } from 'lucide-react';
import { evaluateRules, calculateSymptomScore } from '@/utils/ruleBasedReasoning';
import { useCreateTest } from '@/hooks/useTest';
import { useSymptoms } from '@/hooks/useSymptoms';
import { toast } from 'sonner';
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem } from '@/components/AnimatedPage';

export default function TestPage() {
  const { t } = useTranslation();
  const createTestMutation = useCreateTest();
  const { data: symptomsData, isLoading: symptomsLoading } = useSymptoms();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);

  const symptoms = symptomsData || [];
  const totalQuestions = symptoms.length;
  const question = symptoms[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const handleAnswer = (value) => {
    const updatedAnswers = {
      ...answers,
      [question.code]: value
    };
    setAnswers(updatedAnswers);

    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Submit with updated answers
        const symptom_ids = symptoms
          .filter(symptom => updatedAnswers[symptom.code] === 'Ya')
          .map(symptom => symptom.id);

        createTestMutation.mutate({
          symptom_ids
        });
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Get symptom IDs where answer is "Ya"
    const symptom_ids = symptoms
      .filter(symptom => answers[symptom.code] === 'Ya')
      .map(symptom => symptom.id);

    createTestMutation.mutate({
      symptom_ids
    });
  };

  const questionVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  // Loading state
  if (symptomsLoading) {
    return (
      <AnimatedPage className="min-h-[calc(100vh-4rem)] py-8">
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">{t('common.loading')}</p>
          </motion.div>
        </div>
      </AnimatedPage>
    );
  }

  if (!question) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatedPage className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <FadeIn>
          <div className="mb-8 text-center">
            <motion.div
              className="mb-3 inline-flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Brain className="h-5 w-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                {t('common.medicalExpertSystem')}
              </Badge>
            </motion.div>
            <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">{t('test.title')}</h1>
            <p className="text-muted-foreground">
              {t('test.subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* Progress Bar */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">
                {t('test.progress.question', { current: currentQuestion + 1, total: totalQuestions })}
              </span>
              <span className="font-medium text-primary">{t('test.progress.complete', { percent: Math.round(progress) })}</span>
            </div>
            <div className="relative">
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <motion.div
                className="absolute -top-1 h-5 w-5 rounded-full border-4 border-primary bg-white shadow-lg"
                initial={{ left: 0 }}
                animate={{ left: `calc(${progress}% - 10px)` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Question Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={questionVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Card className="border-0 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    className="rounded-xl bg-gradient-to-br from-primary to-accent px-4 py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm font-medium text-white">{question.code}</span>
                  </motion.div>
                  <Badge variant="outline" className="bg-muted/50">
                    {currentQuestion + 1}/{totalQuestions}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed sm:text-2xl">
                  Apakah Anda mengalami {question.name.toLowerCase()}?
                </CardTitle>
                <CardDescription className="text-base">
                  Pilih jawaban yang sesuai dengan kondisi Anda saat ini
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[question.code] || ''}
                  onValueChange={handleAnswer}
                  data-testid="question-radio-group"
                  className="space-y-3"
                >
                  {['Ya', 'Tidak'].map((option, index) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <label
                        htmlFor={option}
                        className={`flex cursor-pointer items-start space-x-4 rounded-xl border-2 p-5 transition-all duration-300 ${
                          answers[question.code] === option
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                            : 'border-border bg-background/50 hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <RadioGroupItem 
                          value={option} 
                          id={option} 
                          className="mt-1 h-5 w-5"
                          data-testid={`answer-${option}`}
                        />
                        <div className="flex-1">
                          <span className="text-base leading-relaxed text-foreground">
                            {option}
                          </span>
                        </div>
                        {answers[question.code] === option && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                          </motion.div>
                        )}
                      </label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <FadeIn delay={0.2}>
          <div className="mt-8 flex items-center justify-start gap-4">
            <motion.div whileHover={{ scale: 1.03, x: -3 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="h-12 border-2 px-6 text-base font-medium transition-all duration-300 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                {t('test.navigation.previous')}
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        {/* Progress Indicator Dots */}
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const symptom = symptoms[index];
              const isAnswered = symptom && answers[symptom.code];
              const isCurrent = index === currentQuestion;
              return (
                <motion.div
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-8 bg-gradient-to-r from-primary to-accent'
                      : isAnswered
                      ? 'w-2.5 bg-emerald-500'
                      : 'w-2.5 bg-muted'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                />
              );
            })}
          </div>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
