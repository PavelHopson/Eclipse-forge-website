type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-[54rem]">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-white/35">
        {eyebrow}
      </p>
      <h2 className="type-display mt-4 max-w-[18ch] text-balance text-[clamp(2.1rem,4vw,4rem)] font-semibold leading-[0.96] text-white sm:mt-5">
        {title}
      </h2>
    </div>
  );
}
