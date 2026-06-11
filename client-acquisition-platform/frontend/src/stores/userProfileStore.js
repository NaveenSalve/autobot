import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useUserProfileStore = create(persist((set) => ({
  completed: false,
  profile: { name: '', headline: '', services: ['Web design', 'AI chatbot setup'], targetIndustries: ['Hospitality', 'Healthcare'], targetLocations: ['Berlin', 'London'] },
  setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  completeOnboarding: () => set({ completed: true })
}), { name: 'acquireai-profile' }));
