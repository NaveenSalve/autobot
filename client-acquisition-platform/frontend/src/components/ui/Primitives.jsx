import { cn } from '../../lib/utils';
export function Badge({ className='', variant='default', ...props }) {
  const v = variant === 'success' ? 'bg-green-500/12 text-green-400 border-green-500/20' : variant === 'warning' ? 'bg-amber-500/12 text-amber-400 border-amber-500/20' : 'bg-accent/10 text-accent border-accent/20';
  return <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', v, className)} {...props} />;
}
export function Input({ className='', ...props }) { return <input className={cn('h-10 w-full rounded-xl border border-border bg-bg2 px-3 text-sm outline-none focus:ring-2 focus:ring-accent/40', className)} {...props} />; }
export function Select({ className='', children, ...props }) { return <select className={cn('h-10 w-full rounded-xl border border-border bg-bg2 px-3 text-sm outline-none focus:ring-2 focus:ring-accent/40', className)} {...props}>{children}</select>; }
export function Progress({ value=0 }) { return <div className="h-2 overflow-hidden rounded-full bg-bg2"><div className="h-full bg-accent transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>; }
export function Skeleton({ className='' }) { return <div className={cn('animate-pulse rounded-xl bg-elevated', className)} />; }
