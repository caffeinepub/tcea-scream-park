import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { EventDateRange } from '../backend';

export function useGetMainHauntSchedule() {
  const { actor, isFetching } = useActor();

  return useQuery<EventDateRange[]>({
    queryKey: ['mainHauntSchedule'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMainHauntSchedule();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateMainHauntSchedule() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSchedule: EventDateRange[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateMainHauntSchedule(newSchedule);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mainHauntSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['contentItems'] });
    },
  });
}
