import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';
export function MobileDrawer({ open, onClose }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close menu"/><div className="relative h-full w-80 max-w-[86vw] bg-surface"><button className="absolute right-3 top-3 z-10 rounded-xl p-2 hover:bg-elevated" onClick={onClose}><X size={18}/></button><Sidebar mobile onNavigate={onClose}/></div></div>;
}
