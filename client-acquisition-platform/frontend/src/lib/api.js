const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}
export const api = {
  health: () => request('/health'),
  uploadProfile: async (file) => { const form = new FormData(); form.append('file', file); const res = await fetch(`${API_BASE}/profile/extract`, { method: 'POST', body: form }); if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`); return res.json(); },
  saveProfile: (payload) => request('/profile', { method: 'POST', body: JSON.stringify(payload) }),
  getLeads: (params = {}) => request(`/leads?${new URLSearchParams(params)}`),
  getLead: (id) => request(`/leads/${id}`),
  startAudit: (payload) => request('/audit', { method: 'POST', body: JSON.stringify(payload) }),
  generateProposal: (payload) => request('/proposals', { method: 'POST', body: JSON.stringify(payload) }),
  getJob: (id) => request(`/jobs/${id}`),
  updateDeal: (id, payload) => request(`/crm/deals/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  createDeal: (payload) => request('/crm/deals', { method: 'POST', body: JSON.stringify(payload) }),
  deleteDeal: (id) => request(`/crm/deals/${id}`, { method: 'DELETE' }),
  negotiate: (payload) => request('/negotiate', { method: 'POST', body: JSON.stringify(payload) }),
  sendEmail: (payload) => request('/email/send', { method: 'POST', body: JSON.stringify(payload) })
};
