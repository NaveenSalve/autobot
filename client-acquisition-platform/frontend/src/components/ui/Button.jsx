import { cn } from '../../lib/utils';
export function Button({ className = '', variant = 'primary', size = 'md', ...props }) {
  const variants = {
    primary: 'bg-accent text-white hover:opacity-90',
    secondary: 'bg-elevated text-text border border-border hover:bg-bg2',
    ghost: 'hover:bg-elevated text-subtle',
    danger: 'bg-red-500 text-white hover:opacity-90'
  };
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-12 px-5' };
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:opacity-50 disabled:pointer-events-none', variants[variant], sizes[size], className)} {...props} />;
}
