import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TunnelMap, RoomAssignment, TunnelSchedule } from '../backend';

export function useTunnelMaps() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TunnelMap[]>({
    queryKey: ['tunnelMaps'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllTunnelMaps();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useRoomAssignments() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<RoomAssignment[][]>({
    queryKey: ['roomAssignments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getRoomAssignments();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useTunnelSchedules() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TunnelSchedule[]>({
    queryKey: ['tunnelSchedules'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllTunnelSchedules();
    },
    enabled: !!actor && !actorFetching,
  });
}
