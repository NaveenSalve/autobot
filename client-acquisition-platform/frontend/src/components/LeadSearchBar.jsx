import { useState } from 'react';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Primitives';
export function LeadSearchBar({ onSearch }) {
  const [form, setForm] = useState({ country: 'Germany', city: 'Berlin', category: 'coffee shops' });
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  return <form onSubmit={(e) => { e.preventDefault(); onSearch(form); }} className="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
    <Input name="country" value={form.country} onChange={update} placeholder="Country" />
    <Input name="city" value={form.city} onChange={update} placeholder="City" />
    <Select name="category" value={form.category} onChange={update}><option>coffee shops</option><option>restaurants</option><option>dentists</option><option>hotels</option><option>gyms</option></Select>
    <Button type="submit">Search leads</Button>
  </form>;
}
