import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Mail, Lock, User, Chrome, UserPlus, Calendar } from 'lucide-react';
import { useRegister } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { AnimatedPage, FadeIn, itemVariants } from '@/components/AnimatedPage';

export default function RegisterPage() {
  const { t } = useTranslation();
  const registerMutation = useRegister();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.dateOfBirth || !formData.password || !formData.confirmPassword) {
      toast.error(t('auth.messages.fillAllFields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('auth.messages.passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t('auth.messages.passwordTooShort'));
      return;
    }

    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      date_of_birth: formData.dateOfBirth,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    });
  };

  const handleGoogleSignup = () => {
    toast.info(t('auth.messages.googleAuth'), {
      description: t('auth.messages.googleAuthMocked')
    });
    
    // Mock Google signup with React Query
    registerMutation.mutate({
      name: 'Demo User',
      email: 'demo@google.com',
      password: 'google-oauth-mock',
    });
  };

  const inputFields = [
    { name: 'name', type: 'text', icon: User, placeholder: 'John Doe', label: t('auth.register.fullName') },
    { name: 'email', type: 'email', icon: Mail, placeholder: 'you@example.com', label: t('auth.register.email') },
    { name: 'dateOfBirth', type: 'date', icon: Calendar, placeholder: '', label: t('auth.register.dateOfBirth') },
    { name: 'password', type: 'password', icon: Lock, placeholder: '••••••••', label: t('auth.register.password') },
    { name: 'confirmPassword', type: 'password', icon: Lock, placeholder: '••••••••', label: t('auth.register.confirmPassword') }
  ];

  return (
    <AnimatedPage className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-accent/15 to-primary/15 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <FadeIn delay={0.1}>
            <div className="mb-8 text-center">
              <Link to="/" className="inline-flex items-center gap-3 transition-all duration-300 hover:opacity-80">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Activity className="h-8 w-8 text-white" />
                </motion.div>
                <div className="flex flex-col items-start">
                  <span className="text-xl font-bold leading-none text-foreground">{t('common.dengueExpert')}</span>
                  <span className="text-sm text-muted-foreground">{t('common.diagnosticSystem')}</span>
                </div>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="text-2xl font-bold">{t('auth.register.title')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('auth.register.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {inputFields.map((field, index) => {
                      const Icon = field.icon;
                      return (
                        <motion.div
                          key={field.name}
                          className="space-y-2"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.05 }}
                        >
                          <Label htmlFor={field.name} className="text-sm font-medium">{field.label}</Label>
                          <div className="relative">
                            <Icon className={`absolute left-3.5 top-3.5 h-5 w-5 transition-colors duration-300 ${focusedField === field.name ? 'text-primary' : 'text-muted-foreground'}`} />
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleChange}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              className="h-12 border-2 bg-background/50 pl-11 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                              required
                            />
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        className="h-12 w-full bg-gradient-to-r from-primary to-accent text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            {t('auth.register.creatingAccount')}
                          </motion.div>
                        ) : (
                          <span className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            {t('auth.register.createAccount')}
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t-2 border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-3 text-muted-foreground">{t('auth.register.orContinue')}</span>
                    </div>
                  </div>

                  {/* Google Sign Up */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full border-2 text-base font-medium transition-all duration-300 hover:bg-muted/50"
                      onClick={handleGoogleSignup}
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      {t('auth.register.google')}
                    </Button>
                  </motion.div>

                  {/* Sign In Link */}
                  <p className="text-center text-sm">
                    <span className="text-muted-foreground">{t('auth.register.haveAccount')} </span>
                    <Link to="/login" className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline">
                      {t('auth.register.signIn')}
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </AnimatedPage>
  );
}
