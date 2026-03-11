import { api } from '../api-client';
import type { Badge, UserBadge } from '../types';

export function getAllBadges(): Promise<Badge[]> {
  return api.get('/badges');
}

export function getMyBadges(): Promise<UserBadge[]> {
  return api.get('/badges/me');
}
