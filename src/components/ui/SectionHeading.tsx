type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="type-meta mb-6" style={{ color: 'var(--accent)' }}>{eyebrow}</p>
      <h2 className="type-display text-section max-w-[18ch] text-balance" style={{ color: 'var(--text-1)' }}>{title}</h2>
    </div>
  );
}
