import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Mail, Lock, Chrome, Sparkles } from 'lucide-react';
import { useLogin } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { AnimatedPage, FadeIn, itemVariants } from '@/components/AnimatedPage';

export default function LoginPage() {
  const { t } = useTranslation();
  const loginMutation = useLogin();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error(t('auth.messages.fillAllFields'));
      return;
    }

    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
      device_name: 'webapp'
    });
  };

  const handleGoogleLogin = () => {
    toast.info(t('auth.messages.googleAuth'), {
      description: t('auth.messages.googleAuthMocked')
    });
    
    // Mock Google login with React Query
    loginMutation.mutate({
      email: 'demo@google.com',
      password: 'google-oauth-mock',
    });
  };

  return (
    <AnimatedPage className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-secondary/15 to-primary/15 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0]
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
                  whileHover={{ scale: 1.1, rotate: 5 }}
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
                  <CardTitle className="text-2xl font-bold">{t('auth.login.title')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('auth.login.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label htmlFor="email" className="text-sm font-medium">{t('auth.login.email')}</Label>
                      <div className="relative">
                        <Mail className={`absolute left-3.5 top-3.5 h-5 w-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="h-12 border-2 bg-background/50 pl-11 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          data-testid="login-email"
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="password" className="text-sm font-medium">{t('auth.login.password')}</Label>
                      <div className="relative">
                        <Lock className={`absolute left-3.5 top-3.5 h-5 w-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          className="h-12 border-2 bg-background/50 pl-11 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          data-testid="login-password"
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-sm font-medium text-primary hover:text-primary/80"
                        onClick={() => toast.info(t('auth.messages.passwordReset'), { description: t('auth.messages.passwordResetMocked') })}
                      >
                        {t('auth.login.forgotPassword')}
                      </Button>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="h-12 w-full bg-gradient-to-r from-primary to-accent text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
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
                            {t('auth.login.signingIn')}
                          </motion.div>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            {t('auth.login.signIn')}
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
                      <span className="bg-card px-3 text-muted-foreground">{t('auth.login.orContinue')}</span>
                    </div>
                  </div>

                  {/* Google Sign In */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full border-2 text-base font-medium transition-all duration-300 hover:bg-muted/50"
                      onClick={handleGoogleLogin}
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      {t('auth.login.google')}
                    </Button>
                  </motion.div>

                  {/* Sign Up Link */}
                  <p className="text-center text-sm">
                    <span className="text-muted-foreground">{t('auth.login.noAccount')} </span>
                    <Link to="/register" className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline">
                      {t('auth.login.signUp')}
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
