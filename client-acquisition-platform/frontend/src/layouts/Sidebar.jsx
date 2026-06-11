import { NavLink } from 'react-router-dom';
import { BarChart3, Compass, Kanban, Map, Settings, Sparkles, FileText } from 'lucide-react';
const items = [
  ['Dashboard', '/dashboard', BarChart3], ['Lead Hunter', '/leads', Compass], ['Map Discovery', '/map', Map], ['Pipeline', '/pipeline', Kanban], ['Proposals', '/proposals', FileText], ['Settings', '/settings', Settings]
];
export function Sidebar({ onNavigate, mobile = false }) {
  return <aside className={`${mobile ? 'block' : 'hidden lg:block'} h-screen w-72 shrink-0 border-r border-border bg-surface p-4`}>
    <div className="mb-8 flex items-center gap-3 px-2"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white"><Sparkles size={20}/></div><div><div className="font-bold">AcquireAI</div><div className="text-xs text-muted">BD agent workspace</div></div></div>
    <nav className="space-y-1">{items.map(([label, to, Icon]) => <NavLink key={to} to={to} onClick={onNavigate} className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-accent text-white' : 'text-subtle hover:bg-elevated hover:text-text'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
  </aside>;
}
export { items as navItems };
