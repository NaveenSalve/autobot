import { useEffect, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from './ui/Button';
import { Input } from './ui/Primitives';

export function ProposalEditor({ initial = '' }) {
  const [content, setContent] = useState(initial || '# Proposal\n\nGenerated proposal will appear here.');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('Quick website growth ideas');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  useEffect(() => { if (initial) setContent(initial); }, [initial]);

  async function sendEmail() {
    setSending(true); setStatus('');
    try {
      const result = await api.sendEmail({ to, subject, body: content });
      setStatus(result.sent ? 'Email sent successfully.' : result.message || 'Email generated in mock mode.');
    } catch (error) {
      setStatus(`Send failed: ${error.message}`);
    } finally { setSending(false); }
  }

  return <div className="rounded-2xl border border-border bg-surface p-4">
    <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="font-semibold">Proposal editor</h3>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="secondary" size="sm" onClick={() => navigator.clipboard?.writeText(content)}>Copy</Button>
      </div>
    </div>
    <textarea className="min-h-[320px] w-full resize-y rounded-xl border border-border bg-bg2 p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-accent/40" value={content} onChange={e => setContent(e.target.value)} />
    <div className="mt-4 rounded-2xl border border-border bg-bg2 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Mail size={16}/> Email outreach</div>
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <Input type="email" value={to} onChange={e=>setTo(e.target.value)} placeholder="recipient@company.com" />
        <Input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" />
        <Button onClick={sendEmail} disabled={sending || !to}><Send size={16}/>{sending ? 'Sending...' : 'Send'}</Button>
      </div>
      {status && <div className="mt-3 rounded-xl bg-surface p-3 text-sm text-muted">{status}</div>}
    </div>
  </div>;
}
