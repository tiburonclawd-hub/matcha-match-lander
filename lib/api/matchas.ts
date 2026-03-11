import { api } from '../api-client';
import type {
  Matcha,
  CreateMatchaPayload,
  MatchaFilters,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getMatchas(params?: MatchaFilters): Promise<PaginatedResponse<Matcha>> {
  return api.get('/matchas', params);
}

export function getTrending(params?: PaginationParams): Promise<PaginatedResponse<Matcha>> {
  return api.get('/matchas/trending', params);
}

export function getTopRated(params?: PaginationParams): Promise<PaginatedResponse<Matcha>> {
  return api.get('/matchas/top-rated', params);
}

export function getRecommended(params?: PaginationParams): Promise<PaginatedResponse<Matcha>> {
  return api.get('/matchas/recommended', params);
}

export function getMatchaById(matchaId: string): Promise<Matcha> {
  return api.get(`/matchas/${matchaId}`);
}

export function createMatcha(payload: CreateMatchaPayload): Promise<Matcha> {
  return api.post('/matchas', payload);
}

export function deleteMatcha(matchaId: string): Promise<void> {
  return api.delete(`/matchas/${matchaId}`);
}
