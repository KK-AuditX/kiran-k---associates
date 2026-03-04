import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'accent' | 'primary' | 'neutral';
  className?: string;
}

const variants = {
  accent: 'bg-accent/10 text-accent-700 border border-accent/20',
  primary: 'bg-primary/10 text-primary border border-primary/20',
  neutral: 'bg-neutral-200 text-ink-muted border border-neutral-300',
};

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
