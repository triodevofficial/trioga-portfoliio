import type { FeatureIcon } from "@/content/home";

type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export function ArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.5} className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Plus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const featurePaths: Record<FeatureIcon, React.ReactNode> = {
  bolt: <path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12l1-8z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21M8 10.5h5M10.5 8v5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.3-7.5 9.8-4.3-1.5-7.5-5.2-7.5-9.8V5.8l7.5-3z" />
      <path d="M8.8 12l2.2 2.2 4.4-4.6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 4.8-9 4.8-9-4.8L12 3z" />
      <path d="M3 12.2l9 4.8 9-4.8M3 16.4l9 4.8 9-4.8" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1.2-4.6L16.3 4.3a2 2 0 012.8 0l.6.6a2 2 0 010 2.8L8.6 18.8 4 20z" />
      <path d="M14.5 6.2l3.3 3.3" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M5.6 5.6l3.7 3.7M14.7 14.7l3.7 3.7M18.4 5.6l-3.7 3.7M9.3 14.7l-3.7 3.7" />
    </>
  ),
};

export function FeatureGlyph({ name, className = "h-8 w-8" }: IconProps & { name: FeatureIcon }) {
  return (
    <svg {...base} className={className}>
      {featurePaths[name]}
    </svg>
  );
}
