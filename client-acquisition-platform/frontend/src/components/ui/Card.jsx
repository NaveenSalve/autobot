import { cn } from '../../lib/utils';
export function Card({ className = '', ...props }) { return <div className={cn('rounded-2xl border border-border bg-surface shadow-soft', className)} {...props} />; }
export function CardHeader({ className = '', ...props }) { return <div className={cn('p-5 pb-2', className)} {...props} />; }
export function CardContent({ className = '', ...props }) { return <div className={cn('p-5', className)} {...props} />; }
