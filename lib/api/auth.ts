import { api } from '../api-client';
import type { RegisterProfilePayload, UserMe } from '../types';

export function registerProfile(payload: RegisterProfilePayload): Promise<UserMe> {
  return api.post('/auth/register-profile', payload);
}
