import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Cols = 1 | 2 | 3 | 4;
type Gap = 'sm' | 'md' | 'lg';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: Cols;
  gap?: Gap;
}

const colClasses: Record<Cols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const gapClasses: Record<Gap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function Grid({ cols = 3, gap = 'md', className, ...rest }: GridProps) {
  return (
    <div
      className={cn('grid', colClasses[cols], gapClasses[gap], className)}
      {...rest}
    />
  );
}
