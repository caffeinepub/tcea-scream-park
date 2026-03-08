import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContentItem } from "../backend";
import { useActor } from "./useActor";

export function useGetAllContentItems() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ["contentItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContentItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContentItem(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem | null>({
    queryKey: ["contentItem", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getContentItem(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ["contentItems", "events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetScareZones() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ["contentItems", "scareZones"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getScareZones();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetShows() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ["contentItems", "shows"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getShows();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAttractions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ["contentItems", "attractions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAttractions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateContentItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: ContentItem) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createContentItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });
}

export function useUpdateContentItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, item }: { id: bigint; item: ContentItem }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateContentItem(id, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });
}

export function useDeleteContentItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteContentItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });
}

export function useSeedInitialContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.seedInitialContent();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });
}
