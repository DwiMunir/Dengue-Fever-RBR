import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Activity, LogOut, User, History, Sparkles, Menu, X, Home, ClipboardList, Mail, Users } from 'lucide-react';
import { isAuthenticated, getUser } from '@/utils/localStorage';
import { useLogout } from '@/hooks/useAuth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logoutMutation = useLogout();
  const authenticated = isAuthenticated();
  const user = getUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/about', label: t('nav.about'), icon: Users },
    { path: '/contact', label: t('nav.contact'), icon: Mail },
    { path: '/dashboard', label: t('nav.dashboard'), icon: User, authRequired: true },
    { path: '/test', label: t('nav.startTest'), icon: ClipboardList, authRequired: true },
    { path: '/history', label: t('nav.testHistory'), icon: History, authRequired: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'border-b border-border/50 bg-background/95 shadow-lg shadow-primary/5 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 transition-all duration-300 hover:opacity-80">
              <motion.div
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none tracking-tight text-foreground lg:text-xl">
                  {t('common.dengueExpert')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-primary/70 lg:text-xs">
                  {t('common.diagnosticSystem')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                if (link.authRequired && !authenticated) return null;
                const Icon = link.icon;
                return (
                  <motion.div key={link.path} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(link.path)}
                      className={`relative gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                        isActive(link.path)
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-accent"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              
              {authenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" className="relative h-11 w-11 rounded-full p-0">
                        <Avatar className="h-11 w-11 border-2 border-primary/30 transition-all duration-300 hover:border-primary">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                            {user?.name ? getInitials(user.name) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 border-0 bg-card/98 p-2 shadow-2xl backdrop-blur-xl" align="end" sideOffset={8}>
                    <div className="mb-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-3">
                      <p className="font-semibold text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-primary/10">
                      <User className="mr-3 h-4 w-4 text-primary" />
                      {t('nav.dashboard')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/test')} className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-primary/10">
                      <ClipboardList className="mr-3 h-4 w-4 text-primary" />
                      {t('nav.startTest')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/history')} className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-primary/10">
                      <History className="mr-3 h-4 w-4 text-primary" />
                      {t('nav.testHistory')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-lg p-3 text-destructive transition-colors hover:bg-destructive/10">
                      <LogOut className="mr-3 h-4 w-4" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate('/login')} 
                      className="font-medium transition-all duration-300"
                    >
                      {t('nav.login')}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => navigate('/register')} 
                      className="bg-gradient-to-r from-primary to-accent px-5 font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">{t('nav.getStarted')}</span>
                      <span className="sm:hidden">Start</span>
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 lg:hidden"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border/50 bg-background/98 backdrop-blur-xl lg:hidden"
            >
              <div className="container mx-auto space-y-2 px-4 py-4">
                {navLinks.map((link) => {
                  if (link.authRequired && !authenticated) return null;
                  const Icon = link.icon;
                  return (
                    <motion.button
                      key={link.path}
                      onClick={() => {
                        navigate(link.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                        isActive(link.path)
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </motion.button>
                  );
                })}
                {!authenticated && (
                  <motion.button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">{t('nav.login')}</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
