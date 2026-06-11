import { useState } from 'react';
import { api } from '../lib/api';
import { useLeadsStore } from '../stores/leadsStore';
export function useLeadSearch() {
  const [error, setError] = useState(null);
  const { setLeads, setLoading } = useLeadsStore();
  async function search(params) {
    setLoading(true); setError(null);
    try { const data = await api.getLeads(params); setLeads(data.items || data.leads || []); return data; }
    catch (e) { setError(e.message); throw e; }
    finally { setLoading(false); }
  }
  return { search, error };
}
