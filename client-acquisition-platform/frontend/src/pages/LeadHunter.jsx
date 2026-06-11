import { useEffect } from 'react';
import { LeadSearchBar } from '../components/LeadSearchBar';
import { LeadTable } from '../components/LeadTable';
import { PageHeader } from '../components/PageHeader';
import { useLeadSearch } from '../hooks/useLeadSearch';
import { useLeadsStore } from '../stores/leadsStore';
const fallback = [
  {id:'1', name:'Kreuzberg Coffee Lab', category:'coffee shop', location:'Berlin', score:82, status:'New'},
  {id:'2', name:'Mitte Dental Studio', category:'dentist', location:'Berlin', score:76, status:'Qualified'},
  {id:'3', name:'Hotel Spreeblick', category:'hotel', location:'Berlin', score:69, status:'New'}
];
export default function LeadHunter() {
  const { search, error } = useLeadSearch(); const { leads, setLeads, loading } = useLeadsStore();
  useEffect(() => { if (!leads.length) setLeads(fallback); }, []);
  return <><PageHeader title="Lead Hunter" description="Search markets, categories, and locations to discover scored business leads." />
    <LeadSearchBar onSearch={search}/>{error && <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">Backend unavailable — showing demo data. {error}</div>}
    <div className="mt-5">{loading ? <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">Searching...</div> : <LeadTable leads={leads}/>}</div></>;
}
