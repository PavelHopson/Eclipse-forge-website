type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-[54rem]">
      <p className="type-meta text-accent/50 mb-5">
        {eyebrow}
      </p>
      <h2 className="type-display max-w-[20ch] text-balance text-[clamp(1.8rem,3.8vw,3.4rem)] text-white/90">
        {title}
      </h2>
    </div>
  );
}