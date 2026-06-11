import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export function useJobPolling(jobId) {
  const [job, setJob] = useState(null);
  useEffect(() => {
    if (!jobId) return;
    let active = true;
    async function poll() {
      try {
        const next = await api.getJob(jobId);
        if (!active) return;
        setJob(next);
        if (!['completed', 'failed'].includes(next.status)) setTimeout(poll, 1200);
      } catch (error) { if (active) setJob({ status: 'failed', message: error.message }); }
    }
    poll();
    return () => { active = false; };
  }, [jobId]);
  return job;
}
