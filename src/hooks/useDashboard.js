import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboardApi';
import { isAuthenticated } from '@/utils/localStorage';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'],
  overview: () => [...dashboardKeys.all, 'overview'],
};

// Hook for fetching dashboard overview
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: dashboardKeys.overview(),
    queryFn: dashboardApi.getOverview,
    enabled: isAuthenticated(), // Only fetch if user is logged in
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnMount: true,
  });
};
