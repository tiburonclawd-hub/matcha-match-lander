import { useQuery } from '@tanstack/react-query';
import { getAllBadges, getMyBadges } from '../api/badges';

export function useAllBadges() {
  return useQuery({
    queryKey: ['badges'],
    queryFn: getAllBadges,
  });
}

export function useMyBadges() {
  return useQuery({
    queryKey: ['badges', 'me'],
    queryFn: getMyBadges,
  });
}
