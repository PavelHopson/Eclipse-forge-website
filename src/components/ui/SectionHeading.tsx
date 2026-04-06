type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="type-meta text-accent/40 mb-6">{eyebrow}</p>
      <h2 className="type-display text-section text-gradient max-w-[18ch] text-balance">{title}</h2>
    </div>
  );
}
