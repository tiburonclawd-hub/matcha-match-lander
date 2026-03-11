import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPlaces,
  getPlaceById,
  getPlaceMatchas,
  createPlace,
  getNearby,
  searchGoogle,
} from '../api/places';
import type {
  PlaceSearchParams,
  NearbyParams,
  GoogleSearchParams,
  CreatePlacePayload,
  PaginationParams,
} from '../types';

export function usePlaces(params?: PlaceSearchParams) {
  return useQuery({
    queryKey: ['places', params],
    queryFn: () => getPlaces(params),
  });
}

export function usePlace(placeId: string) {
  return useQuery({
    queryKey: ['places', placeId],
    queryFn: () => getPlaceById(placeId),
    enabled: !!placeId,
  });
}

export function usePlaceMatchas(placeId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: ['places', placeId, 'matchas', params],
    queryFn: () => getPlaceMatchas(placeId, params),
    enabled: !!placeId,
  });
}

export function useCreatePlace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePlacePayload) => createPlace(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['places'] }),
  });
}

export function useNearbyPlaces(params: NearbyParams) {
  return useQuery({
    queryKey: ['places', 'nearby', params],
    queryFn: () => getNearby(params),
    enabled: !!params.lat && !!params.lng,
  });
}

export function useGooglePlaceSearch(params: GoogleSearchParams) {
  return useQuery({
    queryKey: ['places', 'google-search', params],
    queryFn: () => searchGoogle(params),
    enabled: !!params.lat && !!params.lng,
  });
}
