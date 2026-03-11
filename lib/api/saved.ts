import { api } from '../api-client';
import type { Place, Post } from '../types';

export function getSavedPlaces(): Promise<Place[]> {
  return api.get('/saved-places');
}

export function savePlace(placeId: string): Promise<void> {
  return api.post(`/saved-places/${placeId}`);
}

export function unsavePlace(placeId: string): Promise<void> {
  return api.delete(`/saved-places/${placeId}`);
}

export function getSavedPosts(): Promise<Post[]> {
  return api.get('/saved-posts');
}

export function savePost(postId: string): Promise<void> {
  return api.post(`/saved-posts/${postId}`);
}

export function unsavePost(postId: string): Promise<void> {
  return api.delete(`/saved-posts/${postId}`);
}
