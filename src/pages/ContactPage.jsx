import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  AnimatedPage, 
  FadeIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/AnimatedPage';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast.success(t('contact.form.successMessage'));
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      value: 'support@dengue-fever.umby.dev',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      value: '+62 895-3840-46096',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: t('contact.info.location.title'),
      value: t('contact.info.location.value'),
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white">
              {t('contact.badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-foreground">
                {t('contact.info.title')}
              </h2>
              <StaggerContainer className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <StaggerItem key={index}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <motion.div
                                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${info.gradient}`}
                                whileHover={{ rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Icon className="h-6 w-6 text-white" />
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <h3 className="mb-1 font-semibold text-foreground">
                                  {info.title}
                                </h3>
                                <p className="text-sm text-muted-foreground break-words">
                                  {info.value}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* Additional Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        {t('contact.quickResponse.title')}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.quickResponse.description')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div>
              <Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-semibold text-foreground">
                    {t('contact.form.title')}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.form.name')}</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t('contact.form.namePlaceholder')}
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.form.email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('contact.form.emailPlaceholder')}
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={t('contact.form.subjectPlaceholder')}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contact.form.message')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t('contact.form.messagePlaceholder')}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-background resize-none"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                        size="lg"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {t('contact.form.submit')}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </AnimatedPage>
  );
}
