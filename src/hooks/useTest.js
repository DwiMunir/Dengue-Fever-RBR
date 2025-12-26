import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testApi } from '@/api/testApi';
import { isAuthenticated } from '@/utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

// Query keys
export const testKeys = {
  all: ['tests'],
  lists: () => [...testKeys.all, 'list'],
  list: (filters) => [...testKeys.lists(), { filters }],
  details: () => [...testKeys.all, 'detail'],
  detail: (id) => [...testKeys.details(), id],
  statistics: () => [...testKeys.all, 'statistics'],
};

// Hook for fetching all tests
export const useTests = (filters) => {
  return useQuery({
    queryKey: testKeys.list(filters),
    queryFn: testApi.getAllTests,
    enabled: isAuthenticated(), // Only fetch if user is logged in
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Hook for fetching single test
export const useTest = (testId) => {
  return useQuery({
    queryKey: testKeys.detail(testId),
    queryFn: () => testApi.getTest(testId),
    enabled: !!testId && isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for creating test
export const useCreateTest = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: testApi.createTest,
    onSuccess: (response) => {
      // Response structure: { message, record: { id, patient_code, patient_name, ... } }
      const newRecord = response.record;
      
      // Invalidate tests list and dashboard
      queryClient.invalidateQueries({ queryKey: testKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });

      toast.success(t('test.messages.completed'), {
        description: t('test.messages.calculatingResults'),
      });

      // Navigate to result page
      setTimeout(() => {
        navigate(`/result/${newRecord.id}`);
      }, 1000);
    },
    onError: (error) => {
      toast.error('Failed to save test', {
        description: error.message || 'Please try again',
      });
    },
  });
};

// Hook for deleting test
export const useDeleteTest = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: testApi.deleteTest,
    onSuccess: (_, testId) => {
      // Invalidate and refetch tests
      queryClient.invalidateQueries({ queryKey: testKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      
      // Remove specific test from cache
      queryClient.removeQueries({ queryKey: testKeys.detail(testId) });

      toast.success(t('history.messages.deleteSuccess'));
    },
    onError: (error) => {
      toast.error(t('history.messages.deleteFailed'), {
        description: error.message || 'Please try again',
      });
    },
  });
};

// Hook for test statistics
export const useTestStatistics = () => {
  return useQuery({
    queryKey: testKeys.statistics(),
    queryFn: testApi.getTestStatistics,
    enabled: isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
