import { PageHeader } from '../components/PageHeader';
import { ProposalEditor } from '../components/ProposalEditor';
export default function Proposals() { return <><PageHeader title="Proposals" description="Review generated drafts, outreach emails, and follow-up sequences."/><ProposalEditor initial={'# Website Growth Proposal\n\n## Summary\nWe identified conversion gaps and recommend an AI-enabled lead capture workflow.\n\n## Scope\n- AI chatbot setup\n- Booking widget integration\n- Follow-up sequence\n'}/></>; }
