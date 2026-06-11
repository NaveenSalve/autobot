import { useMemo, useState } from 'react';
import { ArrowRight, DollarSign, ShieldAlert, TrendingUp } from 'lucide-react';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/utils';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { Input } from './ui/Primitives';

function TierCard({ title, price, caption, active }) {
  return <div className={`rounded-2xl border p-4 ${active ? 'border-accent bg-accent/10' : 'border-border bg-bg2'}`}>
    <div className="text-xs uppercase tracking-wide text-muted">{title}</div>
    <div className="mt-2 font-mono text-2xl font-bold">{formatCurrency(price)}</div>
    <div className="mt-2 text-xs text-muted">{caption}</div>
  </div>;
}

export function NegotiationAdvisor({ auditScore = 60, defaultServices = ['AI chatbot setup', 'Booking funnel optimization'] }) {
  const [form, setForm] = useState({ industry: 'hospitality', company_size: 'small', user_services: defaultServices.join(', '), audit_score: auditScore });
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function run() {
    setLoading(true); setError('');
    try {
      const result = await api.negotiate({
        industry: form.industry,
        company_size: form.company_size,
        user_services: form.user_services.split(',').map(x => x.trim()).filter(Boolean),
        audit_score: Number(form.audit_score) || auditScore || 60,
      });
      setAdvice(result);
    } catch (e) {
      setError(e.message);
      setAdvice({ suggested_price: 2400, min_price: 1600, counteroffer_strategy: 'Offer two tiers: an essential setup and a growth package. Prefer phased scope over discounting.', warning: 'Backend unavailable; showing local fallback pricing guidance.' });
    } finally { setLoading(false); }
  }

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const tiers = useMemo(() => {
    const suggested = advice?.suggested_price || 0;
    const min = advice?.min_price || 0;
    return [
      { title: 'Floor', price: min, caption: 'Walk-away minimum; reduce scope if client pushes below this.' },
      { title: 'Target', price: suggested, caption: 'Recommended anchor for the current audit opportunity.', active: true },
      { title: 'Premium', price: Math.round((suggested * 1.45 || 0) / 100) * 100, caption: 'Bundle implementation, reporting, and follow-up automation.' },
    ];
  }, [advice]);

  const max = Math.max(...tiers.map(t => t.price), 1);

  return <Card>
    <CardContent>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div><h3 className="font-semibold">Negotiation advisor</h3><p className="mt-1 text-sm text-muted">Pricing anchors, visual counteroffer flow, and scope warnings.</p></div>
        <div className="rounded-xl bg-accent/10 p-2 text-accent"><DollarSign size={20}/></div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Input value={form.industry} onChange={update('industry')} placeholder="Industry" />
        <Input value={form.company_size} onChange={update('company_size')} placeholder="Company size" />
        <Input className="md:col-span-2" value={form.user_services} onChange={update('user_services')} placeholder="Services" />
        <Input type="number" value={form.audit_score} onChange={update('audit_score')} placeholder="Audit score" />
        <Button onClick={run} disabled={loading}>{loading ? 'Calculating...' : 'Get advice'}</Button>
      </div>
      {error && <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-300">{error}</div>}
      {advice && <div className="mt-5 space-y-5">
        <div className="grid gap-3 md:grid-cols-3">{tiers.map(t => <TierCard key={t.title} {...t}/>)}</div>
        <div className="rounded-2xl bg-bg2 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium"><TrendingUp size={16}/> Pricing chart</div>
          <div className="space-y-3">{tiers.map(t => <div key={t.title} className="grid grid-cols-[72px_1fr_80px] items-center gap-3 text-sm"><span className="text-muted">{t.title}</span><div className="h-2 overflow-hidden rounded-full bg-surface"><div className={`h-full ${t.active ? 'bg-accent' : 'bg-indigo'}`} style={{ width: `${Math.max(8, (t.price / max) * 100)}%` }}/></div><span className="text-right font-mono">{formatCurrency(t.price)}</span></div>)}</div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {['Anchor on value', 'Trade scope, not price', 'Close with phased plan'].map((step, i) => <div key={step} className="flex items-center gap-3 rounded-xl border border-border bg-bg2 p-3 text-sm"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs text-white">{i+1}</span><span>{step}</span>{i<2 && <ArrowRight className="ml-auto hidden text-muted md:block" size={14}/>}</div>)}
        </div>
        <div className="rounded-xl bg-bg2 p-4 text-sm text-subtle">{advice.counteroffer_strategy}</div>
        <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200"><ShieldAlert size={18} className="shrink-0"/>{advice.warning}</div>
      </div>}
    </CardContent>
  </Card>;
}
