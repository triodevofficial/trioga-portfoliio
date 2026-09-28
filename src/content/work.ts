/**
 * Trioga products / case studies. Edit freely — pages and cards are generated from this list.
 *
 * - `name` is the product's display name (working names — rename to the real ones).
 * - `cover` picks the built-in illustrated thumbnail. To use a real screenshot instead,
 *   put the file in /public/work/ and set `image: "/work/your-file.jpg"`.
 * - `stack` lists typical technologies; adjust to what each project actually uses.
 */

export type Platform = "Web" | "Android" | "iOS";
export type ProductCover = "qr" | "stay" | "expense" | "bus" | "learn";

export type Product = {
  slug: string;
  name: string;
  title: string; // short descriptive line under the name
  category: string;
  platforms: Platform[];
  summary: string; // card text
  overview: string; // detail page intro
  features: { title: string; text: string }[];
  roles?: { name: string; text: string }[]; // who uses it (multi-sided products)
  stack: string[];
  cover: ProductCover;
  image?: string;
};

export const products: Product[] = [
  {
    slug: "qr-code-generator",
    name: "QRify",
    title: "Static & dynamic QR code generator",
    category: "Web app · SaaS",
    platforms: ["Web"],
    summary: "Create branded static QR codes in seconds, or dynamic QR codes you can edit and track after they are printed.",
    overview:
      "A QR code platform for businesses and creators. Static codes encode content directly and never expire. Dynamic codes point to a short link, so the destination can be changed at any time — even after thousands have been printed — while every scan is tracked.",
    features: [
      { title: "Static QR codes", text: "URL, text, Wi-Fi, email, phone and vCard codes that work forever, with no dependency on our servers." },
      { title: "Dynamic QR codes", text: "Change the destination any time without reprinting. Perfect for menus, flyers, packaging and posters." },
      { title: "Scan analytics", text: "See scans over time, by device and by location to measure every campaign." },
      { title: "Brand styling", text: "Custom colours, dot styles, frames and your logo in the centre — while staying scannable." },
      { title: "High-quality export", text: "Download as PNG, SVG or PDF, ready for screens and professional print." },
      { title: "Bulk generation", text: "Create hundreds of codes at once from a spreadsheet." },
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    cover: "qr",
  },
  {
    slug: "room-hostel-finder",
    name: "StayNest",
    title: "Room & hostel finder",
    category: "Mobile app · Marketplace",
    platforms: ["Android", "iOS", "Web"],
    summary: "Owners list their rooms and hostels; students and working professionals find, compare and contact them nearby.",
    overview:
      "A two-sided marketplace connecting room and hostel owners with people looking for a place to stay. Owners manage listings and enquiries from their phone, while customers search by location, budget and facilities and contact owners directly.",
    features: [
      { title: "Easy listings for owners", text: "Add rooms and hostels with photos, rent, facilities, rules and availability in a few taps." },
      { title: "Location-based search", text: "Find rooms near a college, office or area on a map, sorted by distance." },
      { title: "Smart filters", text: "Filter by budget, room type, gender, food, Wi-Fi, parking and more." },
      { title: "Direct enquiries", text: "Call, chat or request a visit — owners get notified instantly." },
      { title: "Owner dashboard", text: "Track enquiries, occupancy and listing views in one place." },
      { title: "Reviews & ratings", text: "Genuine reviews from residents help customers choose with confidence." },
    ],
    roles: [
      { name: "Owners", text: "List properties, update availability and respond to enquiries." },
      { name: "Customers", text: "Search, compare, shortlist and contact owners." },
      { name: "Admin", text: "Verify listings, moderate reviews and manage the platform." },
    ],
    stack: ["Flutter", "Firebase", "Google Maps", "Node.js"],
    cover: "stay",
  },
  {
    slug: "expense-tracker",
    name: "Spendwise",
    title: "Income & daily expense tracker",
    category: "Mobile app · Personal finance",
    platforms: ["Android", "iOS"],
    summary: "Add income and daily expenses, set budgets and see exactly where the money goes with clear charts.",
    overview:
      "A simple, fast personal finance app. Record income and daily expenses in seconds, organise them into categories, set monthly budgets and understand spending habits through clean charts and reports.",
    features: [
      { title: "Quick entry", text: "Add an expense or income in under five seconds with smart category suggestions." },
      { title: "Categories & tags", text: "Food, travel, bills, shopping — or create your own." },
      { title: "Monthly budgets", text: "Set limits per category and get alerts before you overspend." },
      { title: "Charts & reports", text: "Daily, weekly and monthly breakdowns with visual charts." },
      { title: "Export", text: "Download reports as PDF or Excel for records and taxes." },
      { title: "Secure & private", text: "PIN / fingerprint lock and encrypted cloud backup." },
    ],
    stack: ["React Native", "TypeScript", "SQLite", "Firebase"],
    cover: "expense",
  },
  {
    slug: "school-bus-tracking",
    name: "SafeRide",
    title: "School bus tracking system",
    category: "Mobile + web platform",
    platforms: ["Android", "iOS", "Web"],
    summary: "Schools manage buses and drivers, drivers share live location, and parents track their child's bus in real time.",
    overview:
      "A complete school transport platform with three connected apps. The school adds buses, routes, drivers and students; drivers share live GPS from their phone during trips; and parents follow their child's bus in real time with pickup and drop alerts.",
    features: [
      { title: "Live GPS tracking", text: "Real-time bus location on a map, updated every few seconds." },
      { title: "Pickup & drop alerts", text: "Parents are notified when the bus is near, and when their child boards and gets off." },
      { title: "Route & stop management", text: "Schools plan routes, stops and timings, and assign students to buses." },
      { title: "Driver app", text: "One-tap trip start, student attendance and emergency SOS." },
      { title: "Student-level tracking", text: "Each parent sees only their own child's bus and status." },
      { title: "Trip history & reports", text: "Replays, delays and attendance reports for the school." },
    ],
    roles: [
      { name: "School admin", text: "Adds buses, routes, drivers and students; monitors all trips live." },
      { name: "Drivers", text: "Start trips, share location and mark student attendance." },
      { name: "Parents", text: "Track their child's bus live and receive alerts." },
    ],
    stack: ["Flutter", "Node.js", "Socket.IO", "Google Maps", "PostgreSQL"],
    cover: "bus",
  },
  {
    slug: "learning-app",
    name: "LearnPath",
    title: "Online learning platform",
    category: "EdTech · Mobile + web",
    platforms: ["Android", "iOS", "Web"],
    summary: "Courses, video lessons, mock tests and progress tracking — a complete learning app in the style of Entri.",
    overview:
      "An online learning platform for exam preparation and skill courses. Learners watch video lessons, practise with quizzes and mock tests and track their progress, while educators publish courses and follow each student's performance.",
    features: [
      { title: "Video courses", text: "Structured courses with recorded lessons, notes and downloadable material." },
      { title: "Live classes", text: "Scheduled live sessions with reminders and recordings." },
      { title: "Quizzes & mock tests", text: "Timed tests with instant results, explanations and rankings." },
      { title: "Progress tracking", text: "Completion, scores and streaks to keep learners motivated." },
      { title: "Subscriptions & payments", text: "Course plans with secure in-app payments." },
      { title: "Multi-language content", text: "Courses in English and regional languages." },
    ],
    roles: [
      { name: "Learners", text: "Watch lessons, take tests and track progress." },
      { name: "Educators", text: "Publish courses, schedule classes and review results." },
      { name: "Admin", text: "Manage content, plans, payments and users." },
    ],
    stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    cover: "learn",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
