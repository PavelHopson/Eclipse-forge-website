type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-[54rem]">
      <p className="type-meta text-white/34">
        {eyebrow}
      </p>
      <h2 className="type-heading mt-4 max-w-[19ch] text-balance text-[clamp(1.9rem,3.7vw,3.7rem)] font-medium text-white sm:mt-5">
        {title}
      </h2>
    </div>
  );
}
