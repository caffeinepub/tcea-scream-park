import { useQuery } from "@tanstack/react-query";
import type { RoomAssignment, TunnelMap, TunnelSchedule } from "../backend";
import { useActor } from "./useActor";

export function useTunnelMaps() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TunnelMap[]>({
    queryKey: ["tunnelMaps"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllTunnelMaps();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useRoomAssignments() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<RoomAssignment[][]>({
    queryKey: ["roomAssignments"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getRoomAssignments();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useTunnelSchedules() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TunnelSchedule[]>({
    queryKey: ["tunnelSchedules"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllTunnelSchedules();
    },
    enabled: !!actor && !actorFetching,
  });
}
