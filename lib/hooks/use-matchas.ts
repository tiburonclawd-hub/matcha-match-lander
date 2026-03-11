import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMatchas,
  getTrending,
  getTopRated,
  getRecommended,
  getMatchaById,
  createMatcha,
  deleteMatcha,
} from '../api/matchas';
import type { MatchaFilters, PaginationParams, CreateMatchaPayload } from '../types';

export function useMatchas(params?: MatchaFilters) {
  return useQuery({
    queryKey: ['matchas', params],
    queryFn: () => getMatchas(params),
  });
}

export function useTrendingMatchas(params?: PaginationParams) {
  return useQuery({
    queryKey: ['matchas', 'trending', params],
    queryFn: () => getTrending(params),
  });
}

export function useTopRatedMatchas(params?: PaginationParams) {
  return useQuery({
    queryKey: ['matchas', 'top-rated', params],
    queryFn: () => getTopRated(params),
  });
}

export function useRecommendedMatchas(params?: PaginationParams) {
  return useQuery({
    queryKey: ['matchas', 'recommended', params],
    queryFn: () => getRecommended(params),
  });
}

export function useMatcha(matchaId: string) {
  return useQuery({
    queryKey: ['matchas', matchaId],
    queryFn: () => getMatchaById(matchaId),
    enabled: !!matchaId,
  });
}

export function useCreateMatcha() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMatchaPayload) => createMatcha(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['matchas'] }),
  });
}

export function useDeleteMatcha() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (matchaId: string) => deleteMatcha(matchaId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['matchas'] }),
  });
}
