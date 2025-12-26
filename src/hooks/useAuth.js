import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { saveUser, removeUser, getUser } from '@/utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

// Query keys
export const authKeys = {
  all: ['auth'],
  profile: () => [...authKeys.all, 'profile'],
};

// Hook for login mutation
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const user = response.user;

      if (response.token) {
        localStorage.setItem('dengue_expert_token', response.token);
      }

      saveUser({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      toast.success(t('auth.messages.loginSuccess'), {
        description: t('auth.messages.welcomeBack'),
      });

      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(t('auth.messages.loginFailed'), {
        description: error.response?.data?.message || t('auth.messages.checkCredentials'),
      });
    },
  });
};

// Hook for register mutation
export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      const user = response.user;
      
      // Save token if present
      if (user.token) {
        localStorage.setItem('dengue_expert_token', user.token);
      }
      
      // Save user data
      saveUser({
        id: user.id,
        code: user.code,
        email: user.email,
        name: user.name,
      });

      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      toast.success(t('auth.messages.registerSuccess'), {
        description: t('auth.messages.accountCreated'),
      });

      navigate('/login');
    },
    onError: (error) => {
      toast.error(t('auth.messages.registerFailed'), {
        description: error.response?.data?.message || t('auth.messages.tryAgain'),
      });
    },
  });
};

// Hook for logout mutation
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear local storage
      removeUser();

      // Clear all queries
      queryClient.clear();

      toast.success(t('auth.messages.logoutSuccess'));

      navigate('/');
    },
    onError: () => {
      // Even on error, clear local data and redirect
      removeUser();
      queryClient.clear();
      navigate('/');
    },
  });
};

// Hook for fetching user profile
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    enabled: !!getUser(), // Only fetch if user is logged in
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
