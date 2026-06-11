import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input, Progress } from '../components/ui/Primitives';
import { Card, CardContent } from '../components/ui/Card';
import { ResumeUploader } from '../components/ResumeUploader';
import { useUserProfileStore } from '../stores/userProfileStore';
const steps = ['Profile', 'Services', 'Targets', 'Review'];
export default function Onboarding() {
  const [step, setStep] = useState(0); const { profile, setProfile, completeOnboarding } = useUserProfileStore(); const nav = useNavigate();
  function next(){ if(step < steps.length-1) setStep(step+1); else { completeOnboarding(); nav('/dashboard'); } }
  return <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl items-center"><Card className="w-full"><CardContent><div className="mb-6"><div className="text-sm text-muted">Step {step+1} of {steps.length}</div><h1 className="mt-1 text-2xl font-bold">{steps[step]}</h1><div className="mt-4"><Progress value={((step+1)/steps.length)*100}/></div></div>
    {step===0 && <div className="grid gap-3"><ResumeUploader onExtracted={setProfile}/><Input placeholder="Your name" value={profile.name} onChange={e=>setProfile({name:e.target.value})}/><Input placeholder="Headline e.g. AI Automation Consultant" value={profile.headline} onChange={e=>setProfile({headline:e.target.value})}/></div>}
    {step===1 && <Input value={(profile.services||[]).join(', ')} onChange={e=>setProfile({services:e.target.value.split(',').map(x=>x.trim())})} placeholder="Services, comma separated"/>}
    {step===2 && <Input value={(profile.targetLocations||[]).join(', ')} onChange={e=>setProfile({targetLocations:e.target.value.split(',').map(x=>x.trim())})} placeholder="Target locations, comma separated"/>}
    {step===3 && <div className="rounded-xl bg-bg2 p-4 text-sm text-muted"><pre className="whitespace-pre-wrap">{JSON.stringify(profile,null,2)}</pre></div>}
    <div className="mt-6 flex justify-between"><Button variant="secondary" disabled={step===0} onClick={()=>setStep(step-1)}>Back</Button><Button onClick={next}>{step===steps.length-1?'Finish':'Next'}</Button></div>
  </CardContent></Card></div>;
}
