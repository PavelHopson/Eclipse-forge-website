type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="type-meta mb-6" style={{ color: 'var(--accent-text)', opacity: 0.6 }}>{eyebrow}</p>
      <h2 className="type-display text-[clamp(2rem,4vw,3.8rem)] text-gradient max-w-[18ch] text-balance">{title}</h2>
    </div>
  );
}
