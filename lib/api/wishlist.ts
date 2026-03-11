import { api } from '../api-client';
import type { ShopItem } from '../types';

export function getWishlist(): Promise<ShopItem[]> {
  return api.get('/wishlist');
}

export function addToWishlist(itemId: string): Promise<void> {
  return api.post(`/wishlist/${itemId}`);
}

export function removeFromWishlist(itemId: string): Promise<void> {
  return api.delete(`/wishlist/${itemId}`);
}
