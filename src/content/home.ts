/**
 * Homepage copy. Edit text here — components only handle layout.
 * Items marked DEMO are placeholders to replace with real data before launch.
 */

export const CONTACT_EMAIL = "hello@trioga.com"; // DEMO: replace with the real inbox

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

export const hero = {
  titleAccent: "From idea to app,",
  title: "software built to grow your business",
  text: "Trioga is a software studio that designs and builds websites, web apps, mobile apps and custom platforms. We take your idea from the first sketch to a product in production — fast, secure and made to scale.",
};

export const ideaToApp = [
  {
    key: "idea",
    step: "01",
    label: "Idea",
    title: "We shape the idea",
    text: "Workshops, user flows and wireframes turn a rough idea into a clear, buildable plan.",
  },
  {
    key: "code",
    step: "02",
    label: "Code",
    title: "We write the code",
    text: "Clean, typed, tested code on a modern stack — reviewed, documented and yours to keep.",
  },
  {
    key: "app",
    step: "03",
    label: "App",
    title: "You launch the app",
    text: "A fast, polished product on web and mobile, deployed and monitored from day one.",
  },
] as const;

// DEMO: adjust numbers to your real track record.
export const stats = [
  { value: "6+", label: "Products delivered" },
  { value: "3", label: "Platforms — web, mobile, cloud" },
  { value: "<1s", label: "Target page load time" },
  { value: "100%", label: "Code & IP ownership for clients" },
];

export type ServiceMockup = "website" | "dashboard" | "mobile" | "automation";

export const services: {
  title: string;
  subtitle: string;
  text: string;
  point: string;
  mockup: ServiceMockup;
}[] = [
  {
    title: "Websites & landing pages",
    subtitle: "Fast, search-ready websites that turn visitors into clients",
    text: "Company sites, product pages and e-commerce built for speed and search. Every page is pre-rendered, accessible and easy for your team to update.",
    point: "Built to rank. Built to convert.",
    mockup: "website",
  },
  {
    title: "Web applications & SaaS",
    subtitle: "Dashboards, portals and platforms your team relies on",
    text: "From internal tools to customer-facing SaaS: secure logins, roles, payments, real-time data and integrations with the systems you already use.",
    point: "One platform for the way you work.",
    mockup: "dashboard",
  },
  {
    title: "Mobile apps",
    subtitle: "iOS and Android apps from a single, high-performance codebase",
    text: "Native-feeling apps with offline support, push notifications and smooth animations — shipped to both app stores without doubling your budget.",
    point: "Two platforms. One team.",
    mockup: "mobile",
  },
  {
    title: "Custom software & AI automation",
    subtitle: "Automate the busywork and connect your tools",
    text: "Workflow automation, AI assistants and API integrations that remove manual steps, reduce errors and give your team hours back every week.",
    point: "Less admin. More business.",
    mockup: "automation",
  },
];

export type FeatureIcon = "bolt" | "search" | "shield" | "layers" | "pen" | "lifebuoy";

export const features: { icon: FeatureIcon; title: string; text: string }[] = [
  {
    icon: "bolt",
    title: "Performance first",
    text: "Pages that load in under a second and apps that respond instantly. Speed is designed in from the start, not patched on at the end.",
  },
  {
    icon: "search",
    title: "SEO built in",
    text: "Server-rendered pages, structured data, clean URLs and Core Web Vitals in the green, so customers find you on Google.",
  },
  {
    icon: "shield",
    title: "Secure by default",
    text: "Encrypted data, hardened authentication and dependency monitoring, following OWASP best practices on every project.",
  },
  {
    icon: "layers",
    title: "Scales with you",
    text: "Cloud architecture that handles your first hundred users and your first hundred thousand without a rewrite.",
  },
  {
    icon: "pen",
    title: "Design that converts",
    text: "Interfaces designed around your users and your goals — clear, consistent and on-brand across every screen.",
  },
  {
    icon: "lifebuoy",
    title: "Long-term partnership",
    text: "After launch we stay on: monitoring, updates and new features as your business grows.",
  },
];

export const process = [
  { step: "01", title: "Discover", text: "We learn your business, users and goals, then define scope, timeline and a fixed quote." },
  { step: "02", title: "Design", text: "Wireframes and a clickable prototype you can test before a single line of code is written." },
  { step: "03", title: "Build", text: "Weekly demos on a live staging link. You see progress every week, not just at the end." },
  { step: "04", title: "Launch & grow", text: "We deploy, monitor and keep improving — with analytics telling us what to build next." },
];

export const stack = [
  "Next.js",
  "React",
  "React Native",
  "Flutter",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Vercel",
  "OpenAI & Claude APIs",
];

export const faq = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope. After a short discovery call we send a fixed quote with clear milestones, so there are no surprises. Websites typically start smaller; web and mobile apps are priced by features.",
  },
  {
    q: "How long does it take to build an app?",
    a: "A marketing website usually takes 2–4 weeks. A first version (MVP) of a web or mobile app typically takes 6–12 weeks. You see progress every week on a live staging link.",
  },
  {
    q: "Do I own the code?",
    a: "Yes. You own 100% of the source code, designs and intellectual property. Everything lives in your own repository and cloud accounts.",
  },
  {
    q: "Can you build for both iOS and Android?",
    a: "Yes. We build cross-platform apps from a single codebase, so you get both platforms with one budget, and we handle App Store and Google Play submission.",
  },
  {
    q: "Can you work with our existing system?",
    a: "Absolutely. We regularly integrate with existing databases, CRMs, ERPs, payment providers and third-party APIs, or modernise legacy software step by step.",
  },
  {
    q: "What happens after launch?",
    a: "We offer ongoing support and maintenance: monitoring, security updates, performance tuning and new features, on a flexible monthly plan.",
  },
];
