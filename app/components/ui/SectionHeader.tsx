interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${textAlign}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight ${
          dark ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            dark ? 'text-white/70' : 'text-ink-muted'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
