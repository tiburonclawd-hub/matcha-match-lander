import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getShopItems,
  getShopItemById,
  getShopItemReviews,
  createShopReview,
  deleteShopReview,
} from '../api/shop';
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishlist';
import type { ShopItemFilters, CreateShopReviewPayload, PaginationParams } from '../types';

export function useShopItems(params?: ShopItemFilters) {
  return useQuery({
    queryKey: ['shop', 'items', params],
    queryFn: () => getShopItems(params),
  });
}

export function useShopItem(itemId: string) {
  return useQuery({
    queryKey: ['shop', 'items', itemId],
    queryFn: () => getShopItemById(itemId),
    enabled: !!itemId,
  });
}

export function useShopItemReviews(itemId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: ['shop', 'items', itemId, 'reviews', params],
    queryFn: () => getShopItemReviews(itemId, params),
    enabled: !!itemId,
  });
}

export function useCreateShopReview(itemId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateShopReviewPayload) => createShopReview(itemId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shop', 'items', itemId, 'reviews'] });
      qc.invalidateQueries({ queryKey: ['shop', 'items', itemId] });
    },
  });
}

export function useDeleteShopReview(itemId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => deleteShopReview(itemId, reviewId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shop', 'items', itemId, 'reviews'] });
      qc.invalidateQueries({ queryKey: ['shop', 'items', itemId] });
    },
  });
}

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });
}

export function useAddToWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => addToWishlist(itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wishlist'] }),
  });
}

export function useRemoveFromWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => removeFromWishlist(itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wishlist'] }),
  });
}
