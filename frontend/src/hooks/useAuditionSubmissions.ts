import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ScareActorAuditionForm, DanceAuditionForm, CostumeCharacterAuditionForm, UsherAuditionForm, HauntedHouseSupervisorAuditionForm } from '@/backend';

export function useSubmitScareActorAudition() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      name: string;
      age: number;
      experience: string;
      whatYouLoveToDo: string;
      rolePreference: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      const form: ScareActorAuditionForm = {
        name: formData.name,
        age: BigInt(formData.age),
        phone: 'Not provided',
        email: 'Not provided',
        experience: formData.experience,
        specialSkills: 'Not provided',
        availability: 'Not provided',
        previousWork: 'Not provided',
        referredBy: 'Not provided',
        whyScaryRole: formData.whatYouLoveToDo,
        physicalLimitations: 'None',
        favoriteCharacterType: formData.rolePreference,
        preferredScareType: 'Not provided',
        preferenceOutfitType: 'Not provided',
        conflictSchedule: 'None',
        preferedWorkingCondition: 'Not provided',
        operationAgreeStatus: 'Agreed',
      };

      return actor.submitScareActorAudition(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditions'] });
    },
  });
}

export function useSubmitDancerAudition() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      name: string;
      age: number;
      experience: string;
      whatYouLoveToDo: string;
      rolePreference: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      const form: DanceAuditionForm = {
        name: formData.name,
        age: BigInt(formData.age),
        phone: 'Not provided',
        email: 'Not provided',
        experience: formData.experience,
        danceStyles: 'Not provided',
        availability: 'Not provided',
        previousWork: 'Not provided',
        referredBy: 'Not provided',
        whyDancing: formData.whatYouLoveToDo,
        physicalLimitations: 'None',
        favoriteDanceType: formData.rolePreference,
        performanceExperience: 'Not provided',
        costumePreferences: 'Not provided',
        scheduleConflicts: 'None',
        workingConditions: 'Not provided',
        operationAgreeStatus: 'Agreed',
      };

      return actor.submitDanceAudition(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditions'] });
    },
  });
}

export function useCostumeCharacterAuditionSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      name: string;
      age?: bigint;
      phone: string;
      email: string;
      experience: string;
      characterVoices: string;
      musicalSkills: string;
      performancePreferences: string;
      whyAudition: string;
      costumePreferences: string;
      vocalRange: string;
      scheduleConflicts: string;
      physicalLimitations: string;
      referredBy: string;
      operationAgreeStatus: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      const form: CostumeCharacterAuditionForm = {
        name: formData.name,
        age: formData.age,
        phone: formData.phone,
        email: formData.email,
        experience: formData.experience,
        characterVoices: formData.characterVoices,
        musicalSkills: formData.musicalSkills,
        performancePreferences: formData.performancePreferences,
        whyAudition: formData.whyAudition,
        costumePreferences: formData.costumePreferences,
        vocalRange: formData.vocalRange,
        scheduleConflicts: formData.scheduleConflicts,
        physicalLimitations: formData.physicalLimitations,
        referredBy: formData.referredBy,
        operationAgreeStatus: formData.operationAgreeStatus,
      };

      return actor.submitCostumeCharacterAudition(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditions'] });
    },
  });
}

export function useSubmitUsherAudition() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      name: string;
      age: number;
      phone: string;
      email: string;
      availability: string;
      experience: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      const form: UsherAuditionForm = {
        name: formData.name,
        age: BigInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        availability: formData.availability,
        experience: formData.experience,
      };

      return actor.submitUsherAudition(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditions'] });
    },
  });
}

export function useSubmitHauntedHouseSupervisorAudition() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      name: string;
      age: number;
      phone: string;
      email: string;
      experience: string;
      availability: string;
      leadershipExperience: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      const form: HauntedHouseSupervisorAuditionForm = {
        name: formData.name,
        age: BigInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        experience: formData.experience,
        availability: formData.availability,
        leadershipExperience: formData.leadershipExperience,
      };

      return actor.submitHauntedHouseSupervisorAudition(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditions'] });
    },
  });
}
