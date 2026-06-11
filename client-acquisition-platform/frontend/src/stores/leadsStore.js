import { create } from 'zustand';
export const useLeadsStore = create((set) => ({
  leads: [], selectedLead: null, loading: false,
  setLeads: (leads) => set({ leads }),
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  setLoading: (loading) => set({ loading })
}));
