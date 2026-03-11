import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getBuddyProfile,
  updateBuddyProfile,
  discoverBuddies,
  swipe,
  getMatches,
} from '../api/buddy';
import type {
  UpdateBuddyProfilePayload,
  BuddyDiscoverParams,
  SwipePayload,
  PaginationParams,
} from '../types';

export function useBuddyProfile() {
  return useQuery({
    queryKey: ['buddy', 'profile'],
    queryFn: getBuddyProfile,
  });
}

export function useUpdateBuddyProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateBuddyProfilePayload) => updateBuddyProfile(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['buddy', 'profile'] }),
  });
}

export function useDiscoverBuddies(params?: BuddyDiscoverParams) {
  return useQuery({
    queryKey: ['buddy', 'discover', params],
    queryFn: () => discoverBuddies(params),
  });
}

export function useSwipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: SwipePayload) => swipe(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['buddy', 'discover'] });
      qc.invalidateQueries({ queryKey: ['buddy', 'matches'] });
    },
  });
}

export function useBuddyMatches(params?: PaginationParams) {
  return useQuery({
    queryKey: ['buddy', 'matches', params],
    queryFn: () => getMatches(params),
  });
}
