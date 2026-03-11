import { api } from '../api-client';
import type {
  ShopItem,
  ShopItemFilters,
  ShopReview,
  CreateShopReviewPayload,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getShopItems(params?: ShopItemFilters): Promise<PaginatedResponse<ShopItem>> {
  return api.get('/shop/items', params);
}

export function getShopItemById(itemId: string): Promise<ShopItem> {
  return api.get(`/shop/items/${itemId}`);
}

export function getShopItemReviews(
  itemId: string,
  params?: PaginationParams,
): Promise<PaginatedResponse<ShopReview>> {
  return api.get(`/shop/items/${itemId}/reviews`, params);
}

export function createShopReview(
  itemId: string,
  payload: CreateShopReviewPayload,
): Promise<ShopReview> {
  return api.post(`/shop/items/${itemId}/reviews`, payload);
}

export function deleteShopReview(itemId: string, reviewId: string): Promise<void> {
  return api.delete(`/shop/items/${itemId}/reviews/${reviewId}`);
}
