import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFriends, sendFriendRequest, updateFriendship, removeFriend } from '../api/friends';
import type { FriendRequestPayload, UpdateFriendshipPayload, PaginationParams } from '../types';

export function useFriends(params?: PaginationParams) {
  return useQuery({
    queryKey: ['friends', params],
    queryFn: () => getFriends(params),
  });
}

export function useSendFriendRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: FriendRequestPayload) => sendFriendRequest(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['friends'] }),
  });
}

export function useUpdateFriendship() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateFriendshipPayload }) =>
      updateFriendship(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['friends'] }),
  });
}

export function useRemoveFriend() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (friendshipId: string) => removeFriend(friendshipId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['friends'] }),
  });
}
