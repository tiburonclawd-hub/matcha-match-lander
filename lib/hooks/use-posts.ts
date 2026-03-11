import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getComments,
  addComment,
  getReplies,
  deleteComment,
} from '../api/posts';
import type {
  PostFilters,
  CreatePostPayload,
  PaginationParams,
  CreateCommentPayload,
} from '../types';

export function usePosts(params?: PostFilters) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  });
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useLikePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useUnlikePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => unlikePost(postId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useComments(postId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: ['posts', postId, 'comments', params],
    queryFn: () => getComments(postId, params),
    enabled: !!postId,
  });
}

export function useAddComment(postId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCommentPayload) => addComment(postId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts', postId, 'comments'] }),
  });
}

export function useReplies(postId: string, commentId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: ['posts', postId, 'comments', commentId, 'replies', params],
    queryFn: () => getReplies(postId, commentId, params),
    enabled: !!postId && !!commentId,
  });
}

export function useDeleteComment(postId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts', postId, 'comments'] }),
  });
}
