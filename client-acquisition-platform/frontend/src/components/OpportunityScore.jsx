import { formatCurrency } from '../lib/utils';
import { Card, CardContent } from './ui/Card';
export function OpportunityScore({ opportunities = [] }) {
  if (!opportunities.length) return null;
  return <div className="grid gap-4 md:grid-cols-2">{opportunities.map(o => <Card key={o.service}><CardContent><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold">{o.service}</h3><p className="mt-2 text-sm text-muted">{o.reasoning}</p></div><div className="text-right"><div className="font-mono text-xl font-bold text-accent">{formatCurrency(o.value_estimate)}</div><div className="mt-1 text-xs uppercase text-muted">{Math.round((o.probability || 0) * 100)}% probability</div></div></div></CardContent></Card>)}</div>;
}
