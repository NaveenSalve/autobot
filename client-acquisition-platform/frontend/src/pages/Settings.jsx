import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Primitives';
import { Card, CardContent } from '../components/ui/Card';
import { useUserProfileStore } from '../stores/userProfileStore';
export default function Settings() { const { profile, setProfile } = useUserProfileStore(); return <><PageHeader title="Settings" description="Manage your profile, services, target markets, and AI preferences."/><Card><CardContent className="grid gap-4 md:grid-cols-2"><label className="text-sm">Name<Input className="mt-1" value={profile.name} onChange={e=>setProfile({name:e.target.value})}/></label><label className="text-sm">Headline<Input className="mt-1" value={profile.headline} onChange={e=>setProfile({headline:e.target.value})}/></label><label className="text-sm md:col-span-2">Services<Input className="mt-1" value={(profile.services||[]).join(', ')} onChange={e=>setProfile({services:e.target.value.split(',').map(x=>x.trim())})}/></label><div className="md:col-span-2"><Button>Save settings</Button></div></CardContent></Card></>; }
