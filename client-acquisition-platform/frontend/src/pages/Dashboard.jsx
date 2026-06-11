import { Activity, DollarSign, FileText, Target } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { PageHeader } from '../components/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
export default function Dashboard() {
  return <><PageHeader title="Dashboard" description="Your AI business development command center." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Total leads" value="128" icon={Target} delta="+18 this week"/><MetricCard label="Qualified leads" value="42" icon={Activity} delta="32.8% quality rate"/><MetricCard label="Pipeline value" value="$84k" icon={DollarSign} delta="+12.4%"/><MetricCard label="Proposal win rate" value="27%" icon={FileText} delta="Above baseline"/></div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><CardContent><h3 className="font-semibold">Recent agent activity</h3><div className="mt-4 space-y-3 text-sm text-muted">{['Audited Kreuzberg Coffee Lab website', 'Generated proposal for Mitte Dental Studio', 'Discovered 25 new Berlin hospitality leads', 'Queued follow-up email sequence'].map(x => <div key={x} className="rounded-xl bg-bg2 p-3">{x}</div>)}</div></CardContent></Card><Card><CardContent><h3 className="font-semibold">Top opportunities</h3><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>AI chatbot setup</span><b className="text-accent">$18k</b></div><div className="flex justify-between"><span>Booking funnel</span><b className="text-accent">$12k</b></div><div className="flex justify-between"><span>Website redesign</span><b className="text-accent">$32k</b></div></div></CardContent></Card></div>
  </>;
}
