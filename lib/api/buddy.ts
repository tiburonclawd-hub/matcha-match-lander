import { api } from '../api-client';
import type {
  BuddyProfile,
  UpdateBuddyProfilePayload,
  BuddyDiscoverParams,
  SwipePayload,
  SwipeResult,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getBuddyProfile(): Promise<BuddyProfile> {
  return api.get('/buddy/profile');
}

export function updateBuddyProfile(payload: UpdateBuddyProfilePayload): Promise<BuddyProfile> {
  return api.put('/buddy/profile', payload);
}

export function discoverBuddies(
  params?: BuddyDiscoverParams,
): Promise<PaginatedResponse<BuddyProfile>> {
  return api.get('/buddy/discover', params);
}

export function swipe(payload: SwipePayload): Promise<SwipeResult> {
  return api.post('/buddy/swipe', payload);
}

export function getMatches(params?: PaginationParams): Promise<PaginatedResponse<BuddyProfile>> {
  return api.get('/buddy/matches', params);
}
