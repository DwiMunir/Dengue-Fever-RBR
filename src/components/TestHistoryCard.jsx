import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Calendar,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle2,
  Eye,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { cardHoverVariants } from '@/components/AnimatedPage';

export default function TestHistoryCard({ test, onDelete, showDeleteButton = false, actionButtonType = 'view' }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getSeverityGradient = (diagnosis) => {
    if (diagnosis?.includes('P3 -') || diagnosis?.includes('P4 -')) {
      return 'from-red-500 to-rose-500';
    } else if (diagnosis?.includes('P1 -') || diagnosis?.includes('P2 -')) {
      return 'from-orange-500 to-amber-500';
    } else {
      return 'from-emerald-500 to-teal-500';
    }
  };

  const getSeverityIcon = (diagnosis) => {
    if (diagnosis?.includes('P3 -') || diagnosis?.includes('P4 -')) {
      return <AlertCircle className="h-5 w-5 text-white" />;
    } else if (diagnosis?.includes('P1 -') || diagnosis?.includes('P2 -')) {
      return <Activity className="h-5 w-5 text-white" />;
    } else {
      return <CheckCircle2 className="h-5 w-5 text-white" />;
    }
  };

  const getSeverityBadge = (diagnosis) => {
    if (diagnosis?.includes('P3 -') || diagnosis?.includes('P4 -')) {
      return 'destructive';
    } else if (diagnosis?.includes('P1 -') || diagnosis?.includes('P2 -')) {
      return 'secondary';
    } else {
      return 'outline';
    }
  };

  return (
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
                {actionButtonType === 'details' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/result/${test.id}`)}
                    className="h-10 border-2 px-4 transition-all duration-300 hover:border-primary hover:bg-primary/5"
                  >
                    {t('dashboard.recentAssessments.viewDetails')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/result/${test.id}`)}
                    className="border-2 transition-all duration-300 hover:border-primary hover:bg-primary/5"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {t('history.viewDetails')}
                  </Button>
                )}
              </motion.div>
              {showDeleteButton && onDelete && (
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
                        onClick={() => onDelete(test.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        {t('history.dialog.deleteButton')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
