import { api } from '../api-client';
import type {
  Conversation,
  Message,
  SendMessagePayload,
  MessageParams,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getConversations(
  params?: PaginationParams,
): Promise<PaginatedResponse<Conversation>> {
  return api.get('/messages/conversations', params);
}

export function getMessages(
  userId: string,
  params?: MessageParams,
): Promise<PaginatedResponse<Message>> {
  return api.get(`/messages/${userId}`, params);
}

export function sendMessage(userId: string, payload: SendMessagePayload): Promise<Message> {
  return api.post(`/messages/${userId}`, payload);
}

export function markRead(messageId: string): Promise<void> {
  return api.patch(`/messages/${messageId}/read`);
}
