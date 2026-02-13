import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AuditionLink } from '../backend';

export function useGetAuditionLinks() {
  const { actor, isFetching } = useActor();

  return useQuery<AuditionLink[]>({
    queryKey: ['auditionLinks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditionLinks();
    },
    enabled: !!actor && !isFetching,
  });
}
