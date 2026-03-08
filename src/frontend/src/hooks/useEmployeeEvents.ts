import { useQuery } from "@tanstack/react-query";
import type { Date_, UpcomingEvent } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useEmployeeUpcomingEvents() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<UpcomingEvent[]>({
    queryKey: ["employeeUpcomingEvents"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");

      // Get current date
      const now = new Date();
      const currentDate: Date_ = {
        year: BigInt(now.getFullYear()),
        month: BigInt(now.getMonth() + 1),
        day: BigInt(now.getDate()),
      };

      return actor.getEmployeeUpcomingEvents(currentDate);
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });
}
