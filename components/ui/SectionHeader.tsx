import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', 'mb-14', className)}>
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-teal-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
