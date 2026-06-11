import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { AuditReport } from '../components/AuditReport';
import { OpportunityScore } from '../components/OpportunityScore';
import { ProposalEditor } from '../components/ProposalEditor';
import { NegotiationAdvisor } from '../components/NegotiationAdvisor';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Primitives';
import { useWebsiteAudit } from '../hooks/useWebsiteAudit';
import { useProposal } from '../hooks/useProposal';
import { useJobPolling } from '../hooks/useJobPolling';
const demoAudit = { score: 64, checks: [
  {id:'chatbot', label:'Chatbot present', passed:false, severity:'medium', recommendation:'Add an AI chat assistant to capture visitors after hours.'},
  {id:'booking', label:'Booking widget', passed:false, severity:'high', recommendation:'Install a direct booking or consultation widget.'},
  {id:'seo', label:'SEO basics', passed:true, severity:'low', recommendation:'Meta title and description detected.'},
  {id:'mobile', label:'Mobile responsive', passed:true, severity:'low', recommendation:'Mobile layout is usable but could improve conversion CTAs.'}
]};
const demoOpps = [{service:'AI chatbot setup', value_estimate:1800, urgency:'high', probability:.72, reasoning:'The website lacks automated lead capture and likely misses after-hours inquiries.'},{service:'Booking funnel optimization', value_estimate:2400, urgency:'medium', probability:.64, reasoning:'No direct booking widget is visible, creating friction for interested visitors.'}];
export default function LeadDetail() {
  const { id } = useParams(); const audit = useWebsiteAudit(); const proposal = useProposal(); const [localAudit, setLocalAudit] = useState(null); const [proposalText, setProposalText] = useState('');
  const auditJob = useJobPolling(audit.jobId); const proposalJob = useJobPolling(proposal.jobId);
  const finalAudit = auditJob?.result?.audit || localAudit; const opps = auditJob?.result?.opportunities || (finalAudit ? demoOpps : []);
  return <><PageHeader title={`Lead detail #${id}`} description="Audit the website, detect opportunities, and generate tailored proposals." action={<div className="flex gap-2"><Button onClick={async()=>{try{await audit.start('https://example.com')}catch{setLocalAudit(demoAudit)}}}>Run audit</Button><Button variant="secondary" onClick={async()=>{try{await proposal.generate({ lead_id:id, audit: finalAudit, opportunities: opps })}catch{setProposalText('# Proposal for Lead\n\nBased on the audit, we recommend adding an AI chatbot and direct booking workflow.')}}}>Generate proposal</Button></div>} />
    {auditJob && !['completed','failed'].includes(auditJob.status) && <div className="mb-5 rounded-2xl border border-border bg-surface p-4"><div className="mb-2 text-sm text-muted">{auditJob.message || 'Audit running...'}</div><Progress value={auditJob.progress || 35}/></div>}
    <div className="grid gap-5 lg:grid-cols-2"><div className="space-y-5"><AuditReport audit={finalAudit}/><OpportunityScore opportunities={opps}/><NegotiationAdvisor auditScore={finalAudit?.score || 60} defaultServices={opps.map(o => o.service)}/></div><ProposalEditor initial={proposalJob?.result?.proposal || proposalText}/></div></>;
}
