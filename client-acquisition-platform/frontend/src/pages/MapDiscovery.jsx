import { LeadSearchBar } from '../components/LeadSearchBar';
import { MapView } from '../components/MapView';
import { PageHeader } from '../components/PageHeader';
import { useLeadSearch } from '../hooks/useLeadSearch';
import { useLeadsStore } from '../stores/leadsStore';
export default function MapDiscovery() {
  const { search } = useLeadSearch(); const leads = useLeadsStore(s => s.leads);
  return <><PageHeader title="Map Discovery" description="Visualize lead density and high-value opportunities geographically." /><LeadSearchBar onSearch={search}/><div className="mt-5"><MapView leads={leads.length ? leads : [{id:'1', name:'Kreuzberg Coffee Lab', score:82},{id:'2', name:'Mitte Dental Studio', score:76},{id:'3', name:'Hotel Spreeblick', score:69}]}/></div></>;
}
