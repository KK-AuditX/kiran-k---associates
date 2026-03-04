import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-surface backdrop-blur-sm',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-[0_8px_32px_rgba(6,182,212,0.08)]',
        glow && 'shadow-[0_0_40px_rgba(6,182,212,0.05)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
