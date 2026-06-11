import { create } from 'zustand';
const initialDeals = [
  { id: 'd1', leadId: '1', name: 'Kreuzberg Coffee Lab', stage: 'New', value: 1800, nextFollowUp: '2026-06-14' },
  { id: 'd2', leadId: '2', name: 'Mitte Dental Studio', stage: 'Proposal Sent', value: 4200, nextFollowUp: '2026-06-18' }
];
export const stages = ['New', 'Contacted', 'Proposal Sent', 'Negotiating', 'Won', 'Lost'];
export const usePipelineStore = create((set) => ({
  deals: initialDeals,
  moveDeal: (id, stage) => set((state) => ({ deals: state.deals.map(d => d.id === id ? { ...d, stage } : d) }))
}));
