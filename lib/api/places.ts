import { api } from '../api-client';
import type {
  Place,
  PlaceDetail,
  CreatePlacePayload,
  PlaceSearchParams,
  NearbyParams,
  GoogleSearchParams,
  GoogleSearchResponse,
  PaginatedResponse,
  PaginationParams,
  Matcha,
} from '../types';

export function getPlaces(params?: PlaceSearchParams): Promise<PaginatedResponse<Place>> {
  return api.get('/places', params);
}

export function getPlaceById(placeId: string): Promise<PlaceDetail> {
  return api.get(`/places/${placeId}`);
}

export function getPlaceMatchas(
  placeId: string,
  params?: PaginationParams,
): Promise<PaginatedResponse<Matcha>> {
  return api.get(`/places/${placeId}/matchas`, params);
}

export function createPlace(payload: CreatePlacePayload): Promise<Place> {
  return api.post('/places', payload);
}

export function getNearby(params: NearbyParams): Promise<PaginatedResponse<Place>> {
  return api.get('/places/nearby', params);
}

export function searchGoogle(params: GoogleSearchParams): Promise<GoogleSearchResponse> {
  return api.get('/places/search-google', params);
}

export function getGooglePlaceDetail(googlePlaceId: string): Promise<PlaceDetail> {
  return api.get(`/places/google/${googlePlaceId}`);
}

export function getGooglePhoto(photoRef: string, maxWidth?: number): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const params = new URLSearchParams({ photo_ref: photoRef });
  if (maxWidth) params.set('max_width', String(maxWidth));
  return `${baseUrl}/places/google-photo?${params.toString()}`;
}
