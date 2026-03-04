import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'light' | 'muted' | 'dark' | 'white';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  containerClassName?: string;
  children: ReactNode;
  as?: 'section' | 'div' | 'article';
}

const variantClasses: Record<Variant, string> = {
  white: 'bg-white',
  light: 'bg-neutral-50',
  muted: 'bg-neutral-100',
  dark: 'bg-primary text-white',
};

/**
 * Section wrapper: applies consistent vertical padding and constrains content
 * to a max-width container.
 *
 * @example
 * <Section variant="light" id="services">
 *   <SectionHeader ... />
 *   ...
 * </Section>
 */
export function Section({
  variant = 'white',
  containerClassName,
  className,
  children,
  as: Tag = 'section',
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        'section-padding',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      <div className={cn('site-container', containerClassName)}>{children}</div>
    </Tag>
  );
}
