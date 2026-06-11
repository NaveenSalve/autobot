import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
export function AuditReport({ audit }) {
  if (!audit) return null;
  return <Card><CardContent><div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Website audit</h3><div className="font-mono text-2xl font-bold text-accent">{audit.score}/100</div></div><div className="space-y-3">{audit.checks.map(c => <div key={c.id} className="flex gap-3 rounded-xl bg-bg2 p-3">{c.passed ? <CheckCircle2 className="text-green-400"/> : <XCircle className="text-red-400"/>}<div><div className="font-medium">{c.label}</div><p className="text-sm text-muted">{c.recommendation}</p></div></div>)}</div></CardContent></Card>;
}
