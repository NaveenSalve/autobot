import { useState } from 'react';
import { api } from '../lib/api';
export function useWebsiteAudit() {
  const [jobId, setJobId] = useState(null);
  async function start(url) { const job = await api.startAudit({ url }); setJobId(job.job_id); return job; }
  return { start, jobId };
}
