import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padded?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = true, padded = true, className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-xl border border-neutral-200',
          'shadow-card',
          hoverable && 'transition-shadow duration-300 hover:shadow-card-hover',
          padded && 'p-6 lg:p-8',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

// Convenience sub-components
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold text-primary leading-snug', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-ink-muted leading-relaxed', className)} {...props} />;
}
