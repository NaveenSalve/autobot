import { Link } from 'react-router-dom';
import { Badge } from './ui/Primitives';
export function LeadTable({ leads = [] }) {
  return <div className="overflow-hidden rounded-2xl border border-border bg-surface"><div className="hidden grid-cols-[1.5fr_1fr_1fr_.6fr_.8fr] gap-4 border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted md:grid"><span>Name</span><span>Category</span><span>Location</span><span>Score</span><span>Status</span></div>
    <div>{leads.map(lead => <Link to={`/lead/${lead.id}`} key={lead.id} className="grid gap-2 border-b border-border px-4 py-4 transition hover:bg-elevated md:grid-cols-[1.5fr_1fr_1fr_.6fr_.8fr] md:items-center md:gap-4"><div><div className="font-medium">{lead.name}</div><div className="text-xs text-muted md:hidden">{lead.category} · {lead.location}</div></div><span className="hidden text-sm text-subtle md:block">{lead.category}</span><span className="hidden text-sm text-subtle md:block">{lead.location}</span><span className="font-mono text-sm font-semibold text-accent">{lead.score}</span><Badge variant={lead.score > 70 ? 'success' : 'default'}>{lead.status || 'New'}</Badge></Link>)}</div>
  </div>;
}
