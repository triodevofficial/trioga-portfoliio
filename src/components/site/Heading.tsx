/** Two-tone heading in the style of enterprise sites: accent phrase in sky, rest in navy. */
export function Heading({ accent, children, as: Tag = "h2" }: { accent: string; children: React.ReactNode; as?: "h1" | "h2" }) {
  return (
    <Tag
      className={`font-semibold tracking-tight text-navy ${
        Tag === "h1"
          ? "text-[34px] leading-[1.15] sm:text-5xl 2xl:text-6xl"
          : "text-[28px] leading-tight sm:text-[34px] 2xl:text-[42px]"
      }`}
    >
      <span className="text-sky">{accent}</span> {children}
    </Tag>
  );
}
