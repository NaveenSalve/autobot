import { useState } from 'react';
import { api } from '../lib/api';
export function useProposal() {
  const [jobId, setJobId] = useState(null);
  async function generate(payload) { const job = await api.generateProposal(payload); setJobId(job.job_id); return job; }
  return { generate, jobId };
}
