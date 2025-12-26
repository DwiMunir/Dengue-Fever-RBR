import { useQuery } from '@tanstack/react-query';
import { symptomsApi } from '@/api/symptomsApi';
import { useTranslation } from 'react-i18next';

// Query keys
export const symptomsKeys = {
  all: ['symptoms'],
  lists: () => [...symptomsKeys.all, 'list'],
  list: (language) => [...symptomsKeys.lists(), language],
  categories: (language) => [...symptomsKeys.all, 'categories', language],
  details: () => [...symptomsKeys.all, 'detail'],
  detail: (id) => [...symptomsKeys.details(), id],
  byCategory: (category, language) => [...symptomsKeys.all, 'category', category, language],
};

// Hook for fetching all symptoms
export const useSymptoms = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return useQuery({
    queryKey: symptomsKeys.list(language),
    queryFn: () => symptomsApi.getSymptoms(language),
    staleTime: 1000 * 60 * 30, // 30 minutes - symptoms rarely change
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for fetching symptom categories
export const useSymptomCategories = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return useQuery({
    queryKey: symptomsKeys.categories(language),
    queryFn: () => symptomsApi.getCategories(language),
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for fetching single symptom
export const useSymptom = (symptomId) => {
  return useQuery({
    queryKey: symptomsKeys.detail(symptomId),
    queryFn: () => symptomsApi.getSymptom(symptomId),
    enabled: !!symptomId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for fetching symptoms by category
export const useSymptomsByCategory = (category) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return useQuery({
    queryKey: symptomsKeys.byCategory(category, language),
    queryFn: () => symptomsApi.getSymptomsByCategory(category, language),
    enabled: !!category,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
