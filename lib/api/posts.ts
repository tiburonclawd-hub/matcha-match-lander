import { api } from '../api-client';
import type {
  Post,
  CreatePostPayload,
  PostFilters,
  Comment,
  CreateCommentPayload,
  PaginatedResponse,
  PaginationParams,
} from '../types';

export function getPosts(params?: PostFilters): Promise<PaginatedResponse<Post>> {
  return api.get('/posts', params);
}

export function getPostById(postId: string): Promise<Post> {
  return api.get(`/posts/${postId}`);
}

export function createPost(payload: CreatePostPayload): Promise<Post> {
  return api.post('/posts', payload);
}

export function deletePost(postId: string): Promise<void> {
  return api.delete(`/posts/${postId}`);
}

export function likePost(postId: string): Promise<void> {
  return api.post(`/posts/${postId}/like`);
}

export function unlikePost(postId: string): Promise<void> {
  return api.delete(`/posts/${postId}/like`);
}

export function getComments(
  postId: string,
  params?: PaginationParams,
): Promise<PaginatedResponse<Comment>> {
  return api.get(`/posts/${postId}/comments`, params);
}

export function addComment(postId: string, payload: CreateCommentPayload): Promise<Comment> {
  return api.post(`/posts/${postId}/comments`, payload);
}

export function getReplies(
  postId: string,
  commentId: string,
  params?: PaginationParams,
): Promise<PaginatedResponse<Comment>> {
  return api.get(
    `/posts/${postId}/comments/${commentId}/replies`,
    params,
  );
}

export function deleteComment(postId: string, commentId: string): Promise<void> {
  return api.delete(`/posts/${postId}/comments/${commentId}`);
}
