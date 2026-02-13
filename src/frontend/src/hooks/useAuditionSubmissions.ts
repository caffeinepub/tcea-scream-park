import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ScareActorAuditionForm, DanceAuditionForm } from '../backend';

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

      // Map minimal UI fields to backend form with safe defaults
      const backendForm: ScareActorAuditionForm = {
        name: formData.name,
        age: BigInt(formData.age),
        phone: '',
        email: '',
        experience: formData.experience,
        specialSkills: '',
        availability: '',
        previousWork: '',
        referredBy: '',
        whyScaryRole: formData.whatYouLoveToDo,
        physicalLimitations: '',
        favoriteCharacterType: '',
        preferredScareType: formData.rolePreference,
        preferenceOutfitType: '',
        conflictSchedule: '',
        preferedWorkingCondition: '',
        operationAgreeStatus: '',
      };

      return actor.submitScareActorAudition(backendForm);
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
      locationPreference: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      // Map minimal UI fields to backend form with safe defaults
      const backendForm: DanceAuditionForm = {
        name: formData.name,
        age: BigInt(formData.age),
        phone: '',
        email: '',
        experience: formData.experience,
        danceStyles: '',
        availability: '',
        previousWork: '',
        referredBy: '',
        whyDancing: formData.whatYouLoveToDo,
        physicalLimitations: '',
        favoriteDanceType: formData.locationPreference,
        performanceExperience: '',
        costumePreferences: '',
        scheduleConflicts: '',
        workingConditions: '',
        operationAgreeStatus: '',
      };

      return actor.submitDanceAudition(backendForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditions'] });
    },
  });
}
