type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-[54rem]">
      <p className="text-[0.62rem] uppercase tracking-[0.42em] text-white/34 sm:text-[0.68rem]">
        {eyebrow}
      </p>
      <h2 className="type-heading mt-4 max-w-[18ch] text-balance text-[clamp(2rem,4vw,4rem)] text-white sm:mt-5">
        {title}
      </h2>
    </div>
  );
}
