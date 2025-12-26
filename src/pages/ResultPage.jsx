import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Download,
  Home,
  ClipboardList,
  AlertTriangle,
  Brain,
  Sparkles,
  Shield,
  Calendar,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem, cardHoverVariants } from '@/components/AnimatedPage';
import { useTest, useTests } from '@/hooks/useTest';
import dayjs from 'dayjs';

export default function ResultPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: testData, isLoading, error } = useTests();

  const test = testData?.find((t) => t.id === parseInt(testId));

  useEffect(() => {
    if (error) {
      toast.error(t('result.messages.testNotFound'));
      navigate('/dashboard');
    }
  }, [error, navigate, t]);

  if (isLoading || !test) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </motion.div>
      </div>
    );
  }

  const getSeverityIcon = () => {
    const diagnosis = test.diagnosed_disease;
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return <AlertCircle className="h-16 w-16 text-white" />;
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return <AlertTriangle className="h-16 w-16 text-white" />;
    } else {
      return <CheckCircle2 className="h-16 w-16 text-white" />;
    }
  };

  const getSeverityGradient = () => {
    const diagnosis = test.diagnosed_disease;
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return 'from-red-500 to-rose-600';
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return 'from-orange-500 to-amber-500';
    } else {
      return 'from-emerald-500 to-teal-500';
    }
  };

  const getSeverityBg = () => {
    const diagnosis = test.diagnosed_disease;
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return 'from-red-500/10 to-rose-500/10';
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return 'from-orange-500/10 to-amber-500/10';
    } else {
      return 'from-emerald-500/10 to-teal-500/10';
    }
  };

  const getSeverityBadge = () => {
    const diagnosis = test.diagnosed_disease;
    if (diagnosis?.includes('Demam Berdarah Dengue') || diagnosis?.includes('DBD')) {
      return 'Tinggi';
    } else if (diagnosis?.includes('Demam Dengue') || diagnosis?.includes('DD')) {
      return 'Sedang';
    } else {
      return 'Rendah';
    }
  };

  const getSeverityLevel = () => {
    const diagnosis = test.diagnosed_disease || '';
    // P1-P4 untuk DBD, F untuk tidak terindikasi
    if (diagnosis.includes('P4')) return 'P4';
    if (diagnosis.includes('P3')) return 'P3';
    if (diagnosis.includes('P2')) return 'P2';
    if (diagnosis.includes('P1')) return 'P1';
    if (diagnosis.includes('DD')) return 'DD';
    return 'F';
  };

  const getGeneralAdvice = () => {
    const level = getSeverityLevel();
    
    const adviceMap = {
      'P4': [
        'Segera rawat inap di ICU untuk monitoring ketat',
        'Transfusi darah atau komponen darah sesuai indikasi',
        'Monitoring tekanan darah dan tanda vital setiap 15-30 menit',
        'Pemberian cairan intravena secara agresif',
        'Hindari pemberian obat antikoagulan atau NSAID',
        'Pastikan keluarga siaga 24 jam mendampingi pasien'
      ],
      'P3': [
        'Rawat inap segera untuk monitoring intensif',
        'Cek laboratorium berkala (trombosit, hematokrit)',
        'Pemberian cairan infus sesuai protokol DSS',
        'Monitor tanda perdarahan dan syok',
        'Batasi aktivitas fisik, istirahat total',
        'Konsumsi makanan bergizi tinggi protein'
      ],
      'P2': [
        'Rawat inap atau rawat jalan dengan kontrol ketat',
        'Cek darah rutin setiap hari',
        'Minum air putih minimal 2-3 liter per hari',
        'Istirahat total, hindari aktivitas berat',
        'Konsumsi makanan bergizi seimbang',
        'Monitor suhu tubuh setiap 4 jam'
      ],
      'P1': [
        'Rawat jalan dengan kontrol rutin ke dokter',
        'Istirahat yang cukup di rumah',
        'Minum air putih minimal 2 liter per hari',
        'Konsumsi makanan bergizi dan mudah dicerna',
        'Kompres hangat jika demam tinggi',
        'Hindari obat pereda nyeri seperti aspirin atau ibuprofen',
        'Gunakan obat penurun panas yang aman (paracetamol)'
      ],
      'DD': [
        'Istirahat yang cukup di rumah',
        'Minum air putih atau cairan elektrolit minimal 2 liter per hari',
        'Konsumsi makanan bergizi seimbang',
        'Gunakan lotion anti nyamuk',
        'Pastikan lingkungan bebas genangan air',
        'Monitor gejala, segera ke dokter jika memburuk'
      ],
      'F': [
        'Jaga pola hidup sehat dan istirahat cukup',
        'Minum air putih yang cukup setiap hari',
        'Lakukan 3M Plus (Menguras, Menutup, Mengubur)',
        'Gunakan kelambu atau obat anti nyamuk',
        'Jaga kebersihan lingkungan rumah',
        'Konsultasi dokter jika muncul gejala baru'
      ]
    };

    return adviceMap[level] || adviceMap['F'];
  };

  const handleDownload = () => {
    toast.info(t('result.messages.downloadReport'), {
      description: t('result.messages.downloadMocked')
    });
  };

  return (
    <AnimatedPage className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className={`absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br ${getSeverityBg()} blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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
              <Sparkles className="h-5 w-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                {t('common.medicalExpertSystem')}
              </Badge>
            </motion.div>
            <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">{t('result.title')}</h1>
            <p className="text-muted-foreground">
              {t('result.completedOn', { date: dayjs(test.checkup_at).format('DD MMMM YYYY, HH:mm') })}
            </p>
          </div>
        </FadeIn>

        {/* Patient Info Card */}
        <FadeIn delay={0.05}>
          <Card className="mb-6 border-0 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nama Pasien</p>
                    <p className="font-semibold text-foreground">{test.patient_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Usia</p>
                    <p className="font-semibold text-foreground">{test.patient_age} tahun</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kode Pasien</p>
                    <p className="font-semibold text-foreground">{test.patient_code}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Main Result Card */}
        <FadeIn delay={0.1}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card className={`mb-8 overflow-hidden border-0 bg-gradient-to-br ${getSeverityBg()} shadow-2xl backdrop-blur-xl`}>
              <CardContent className="p-8 text-center sm:p-10">
                <motion.div
                  className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${getSeverityGradient()} shadow-xl`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  {getSeverityIcon()}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className={`mb-4 bg-gradient-to-r ${getSeverityGradient()} px-4 py-1 text-sm font-semibold text-white`}>
                    {getSeverityBadge()} Risiko
                  </Badge>
                  <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                    {test.diagnosed_disease}
                  </h2>
                  <p className="mx-auto max-w-2xl text-muted-foreground">
                    Silakan konsultasikan hasil ini dengan tenaga medis profesional untuk diagnosis dan penanganan yang lebih akurat.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </FadeIn>

        {/* Analysis Cards */}
        <StaggerContainer className="mb-8 grid gap-6 sm:grid-cols-2">
          <StaggerItem >
            <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" whileTap="tap" className='h-full'>
              <Card className="h-full border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg"
                      whileHover={{ rotate: 10 }}
                    >
                      <Activity className="h-6 w-6 text-white" />
                    </motion.div>
                    <span>Jumlah Gejala</span>
                  </CardTitle>
                  <CardDescription>Total gejala yang teridentifikasi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">{test.symptoms?.length || 0}</span>
                      <span className="text-lg text-muted-foreground">gejala</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sistem telah mengidentifikasi {test.symptoms?.length || 0} gejala berdasarkan jawaban Anda.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>

          <StaggerItem >
            <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" whileTap="tap" className='h-full'>
              <Card className="h-full border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg"
                      whileHover={{ rotate: -10 }}
                    >
                      <Calendar className="h-6 w-6 text-white" />
                    </motion.div>
                    <span>Waktu Pemeriksaan</span>
                  </CardTitle>
                  <CardDescription>Tanggal dan waktu diagnosis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex items-baseline gap-4 justify-between">
                    <div className="mb-2 text-2xl font-bold text-foreground">
                      {dayjs(test.checkup_at).format('DD MMM YYYY')}
                    </div>
                    <div className="text-xl font-semibold text-muted-foreground">
                      {dayjs(test.checkup_at).format('HH:mm')}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Waktu pemeriksaan dicatat untuk referensi medis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        {/* Detailed Recommendations */}
        <FadeIn delay={0.3}>
          <Card className="mb-8 border-0 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <Shield className="h-6 w-6 text-white" />
                </motion.div>
                <span>Rekomendasi</span>
              </CardTitle>
              <CardDescription>Langkah-langkah yang disarankan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {test.diagnosed_disease?.includes('DBD') || test.diagnosed_disease?.includes('Demam Berdarah') ? (
                <motion.div
                  className="flex gap-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 p-5"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-semibold text-red-600">Segera Konsultasi Medis</h4>
                    <p className="text-muted-foreground">
                      Segera hubungi dokter atau pergi ke rumah sakit untuk pemeriksaan lebih lanjut dan penanganan yang tepat.
                    </p>
                  </div>
                </motion.div>
              ) : test.diagnosed_disease?.includes('DD') || test.diagnosed_disease?.includes('Demam Dengue') ? (
                <motion.div
                  className="flex gap-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-5"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-semibold text-orange-600">Konsultasi dengan Dokter</h4>
                    <p className="text-muted-foreground">
                      Disarankan untuk berkonsultasi dengan dokter untuk diagnosis dan penanganan yang lebih akurat.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex gap-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-5"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-semibold text-emerald-600">Monitor Kondisi</h4>
                    <p className="text-muted-foreground">
                      Tetap monitor kondisi kesehatan Anda. Jika gejala memburuk, segera konsultasi dengan dokter.
                    </p>
                  </div>
                </motion.div>
              )}

              <Separator className="my-6" />

              <div>
                <h4 className="mb-4 font-semibold text-foreground">Saran Umum:</h4>
                <ul className="space-y-3">
                  {getGeneralAdvice().map((advice, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-muted/30 p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{advice}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Symptom Summary */}
        <FadeIn delay={0.4}>
          <Card className="mb-8 border-0 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-primary shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <ClipboardList className="h-6 w-6 text-white" />
                </motion.div>
                <span>Ringkasan Gejala</span>
              </CardTitle>
              <CardDescription>Daftar gejala yang teridentifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="space-y-3">
                {test.symptoms?.map((symptom, index) => {
                  return (
                    <StaggerItem key={index}>
                      <motion.div
                        className="flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:bg-muted/30"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{symptom}</p>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Action Buttons */}
        <FadeIn delay={0.5}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="h-12 w-full border-2 text-base font-medium transition-all duration-300"
              >
                <Home className="mr-2 h-5 w-5" />
                {t('result.actions.backToDashboard')}
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => navigate('/test')}
                variant="outline"
                className="h-12 w-full border-2 text-base font-medium transition-all duration-300"
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                {t('result.actions.takeNewTest')}
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleDownload}
                className="h-12 w-full bg-gradient-to-r from-primary to-accent text-base font-semibold shadow-lg shadow-primary/25"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('result.actions.downloadReport')}
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        {/* Disclaimer */}
        <FadeIn delay={0.6}>
          <Card className="mt-8 overflow-hidden border-0 bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-sm">
            <CardContent className="flex items-start gap-4 p-6">
              <motion.div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <AlertCircle className="h-6 w-6 text-accent" />
              </motion.div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t('result.disclaimer.important')}</span>{' '}
                {t('result.disclaimer.text')}
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
}
