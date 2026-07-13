import { useQuery } from '@tanstack/react-query'
import { familiesApi } from '@/lib/api'

export const familyKeys = {
  all: ['family'] as const,
  detail: (name: string) => [...familyKeys.all, name] as const,
  history: (name: string, options?: any) =>
    [...familyKeys.all, name, 'history', options] as const,
  search: (query: string) => [...familyKeys.all, 'search', query] as const,
  compare: (f1: string, f2: string) =>
    [...familyKeys.all, 'compare', f1, f2] as const,
  predict: (f1: string, f2: string) =>
    [...familyKeys.all, 'predict', f1, f2] as const,
  map: () => [...familyKeys.all, 'map'] as const,
}

export function useFamily(name: string) {
  return useQuery({
    queryKey: familyKeys.detail(name),
    queryFn: () => familiesApi.get(name),
    enabled: !!name,
    staleTime: 60 * 1000,
  })
}

export function useFamilyHistory(
  name: string,
  options?: { period?: string; limit?: number },
) {
  return useQuery({
    queryKey: familyKeys.history(name, options),
    queryFn: () => familiesApi.getHistory(name, options),
    enabled: !!name,
    staleTime: 60 * 1000,
  })
}

export function useFamilySearch(query: string) {
  return useQuery({
    queryKey: familyKeys.search(query),
    queryFn: () => familiesApi.search(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  })
}

export function useCompareFamilies(family1: string, family2: string) {
  return useQuery({
    queryKey: familyKeys.compare(family1, family2),
    queryFn: () => familiesApi.compare(family1, family2),
    enabled: !!family1 && !!family2,
    staleTime: 60 * 1000,
  })
}

export function usePredictMatch(family1: string, family2: string) {
  return useQuery({
    queryKey: familyKeys.predict(family1, family2),
    queryFn: () => familiesApi.predict(family1, family2),
    enabled: !!family1 && !!family2,
    staleTime: 60 * 1000,
  })
}

export function useFamilyMap() {
  return useQuery({
    queryKey: familyKeys.map(),
    queryFn: () => familiesApi.getMap(),
    staleTime: 10 * 60 * 1000,
  })
}
