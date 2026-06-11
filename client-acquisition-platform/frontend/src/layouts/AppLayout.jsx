import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileDrawer } from './MobileDrawer';
export function AppLayout() {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-bg text-text lg:flex"><Sidebar/><MobileDrawer open={open} onClose={() => setOpen(false)}/><div className="min-w-0 flex-1"><Topbar onMenu={() => setOpen(true)}/><main className="mx-auto max-w-7xl p-4 md:p-6"><Outlet/></main></div></div>;
}
