import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'outline' | 'subtle';
  className?: string;
}

export default function Badge({ children, variant = 'subtle', className }: BadgeProps) {
  const variants = {
    teal: 'bg-teal-500 text-background',
    outline: 'border border-teal-500/40 text-teal-400',
    subtle: 'bg-teal-50/10 text-teal-300 border border-teal-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
