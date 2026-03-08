import { useQuery } from "@tanstack/react-query";
import type { EventUnlockStatus } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useEventUnlockStatus() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EventUnlockStatus>({
    queryKey: ["eventUnlockStatus"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getEventUnlockStatus();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });
}
