import { api } from '../api-client';
import type {
  UserMe,
  UserPublic,
  UpdateUserPayload,
  Matcha,
  Post,
  UserBadge,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getMe(): Promise<UserMe> {
  return api.get('/users/me');
}

export function updateMe(payload: UpdateUserPayload): Promise<UserMe> {
  return api.patch('/users/me', payload);
}

export function getUserById(userId: string): Promise<UserPublic> {
  return api.get(`/users/${userId}`);
}

export function getUserMatchas(
  userId: string,
  params?: PaginationParams,
): Promise<PaginatedResponse<Matcha>> {
  return api.get(`/users/${userId}/matchas`, params);
}

export function getUserPosts(
  userId: string,
  params?: PaginationParams,
): Promise<PaginatedResponse<Post>> {
  return api.get(`/users/${userId}/posts`, params);
}

export function getUserBadges(userId: string): Promise<UserBadge[]> {
  return api.get(`/users/${userId}/badges`);
}
