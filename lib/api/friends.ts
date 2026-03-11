import { api } from '../api-client';
import type {
  Friend,
  FriendRequestPayload,
  UpdateFriendshipPayload,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getFriends(params?: PaginationParams): Promise<PaginatedResponse<Friend>> {
  return api.get('/friends', params);
}

export function sendFriendRequest(payload: FriendRequestPayload): Promise<Friend> {
  return api.post('/friends/request', payload);
}

export function updateFriendship(
  friendshipId: string,
  payload: UpdateFriendshipPayload,
): Promise<Friend> {
  return api.patch(`/friends/${friendshipId}`, payload);
}

export function removeFriend(friendshipId: string): Promise<void> {
  return api.delete(`/friends/${friendshipId}`);
}
