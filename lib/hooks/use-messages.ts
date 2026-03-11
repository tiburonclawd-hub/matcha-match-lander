import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversations, getMessages, sendMessage, markRead } from '../api/messages';
import type { SendMessagePayload, MessageParams, PaginationParams } from '../types';

export function useConversations(params?: PaginationParams) {
  return useQuery({
    queryKey: ['conversations', params],
    queryFn: () => getConversations(params),
  });
}

export function useMessages(userId: string, params?: MessageParams) {
  return useQuery({
    queryKey: ['messages', userId, params],
    queryFn: () => getMessages(userId, params),
    enabled: !!userId,
  });
}

export function useSendMessage(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessage(userId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['messages', userId] });
      qc.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (messageId: string) => markRead(messageId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['conversations'] }),
  });
}
