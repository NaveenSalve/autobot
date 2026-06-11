import { Menu, Moon, Search, Sun } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { applyTheme, getInitialTheme } from '../lib/theme';
import { useState } from 'react';
export function Topbar({ onMenu }) {
  const [theme, setTheme] = useState(getInitialTheme());
  function toggle() { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); applyTheme(next); }
  return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur md:px-6">
    <div className="flex items-center gap-3"><Button className="lg:hidden" variant="ghost" size="sm" onClick={onMenu}><Menu size={18}/></Button><div className="hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-muted md:flex"><Search size={16}/><span className="text-sm">Search leads, proposals, deals...</span></div></div>
    <Button variant="secondary" size="sm" onClick={toggle}>{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>} {theme === 'dark' ? 'Light' : 'Dark'}</Button>
  </header>;
}
