type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-[56rem]">
      <p className="text-[0.68rem] uppercase tracking-[0.36em] text-white/38">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,4.2rem)] uppercase leading-[0.92] tracking-[-0.055em] text-white">
        {title}
      </h2>
    </div>
  );
}
