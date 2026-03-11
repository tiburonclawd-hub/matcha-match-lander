import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '../api/users';
import { registerProfile } from '../api/auth';
import type { UpdateUserPayload, RegisterProfilePayload } from '../types';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
}

export function useUpdateMe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateMe(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }),
  });
}

export function useRegisterProfile() {
  return useMutation({
    mutationFn: (payload: RegisterProfilePayload) => registerProfile(payload),
  });
}
