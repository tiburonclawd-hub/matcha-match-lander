import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSavedPlaces,
  savePlace,
  unsavePlace,
  getSavedPosts,
  savePost,
  unsavePost,
} from '../api/saved';

export function useSavedPlaces() {
  return useQuery({
    queryKey: ['saved-places'],
    queryFn: getSavedPlaces,
  });
}

export function useSavePlace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (placeId: string) => savePlace(placeId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved-places'] }),
  });
}

export function useUnsavePlace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (placeId: string) => unsavePlace(placeId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved-places'] }),
  });
}

export function useSavedPosts() {
  return useQuery({
    queryKey: ['saved-posts'],
    queryFn: getSavedPosts,
  });
}

export function useSavePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => savePost(postId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved-posts'] }),
  });
}

export function useUnsavePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => unsavePost(postId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved-posts'] }),
  });
}
