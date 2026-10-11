/**
 * PORTFOLIO CONFIGURATION - SHUBHAM SAUHRADRA
 * 
 * Edit this file to update your personal details, contact information,
 * project screenshots, and descriptions.
 * 
 * When you add your phone, email, WhatsApp, or LinkedIn URL below,
 * the corresponding contact buttons throughout the website will
 * activate automatically.
 */

export interface PersonalInfo {
  name: string;
  title: string;
  shortBio: string;
  aboutText: string[];
  // Contact details - leave empty until provided by the owner
  mobileNumber: string; // e.g. "+91 9876543210"
  email: string; // e.g. "shubham@example.com"
  whatsappNumber: string; // e.g. "919876543210" (country code + number without plus for wa.me)
  linkedInUrl: string; // e.g. "https://www.linkedin.com/in/shubham-sauhardra"
  profilePhotoUrl: string; // optional path to photo, e.g. "/images/profile.jpg"
  location: string; // optional location, e.g. "India"
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: 'Globe' | 'Database' | 'Search' | 'Headphones' | 'Smartphone' | 'Cpu' | 'Coins' | 'Blocks' | 'Wallet';
}

export interface AndroidAppItem {
  id: string;
  title: string;
  description: string;
  status: 'IN DEVELOPMENT' | 'COMPLETED' | 'TESTING';
  tags: string[];
  keyCapabilities: string[];
  targetAudience: string;
  // Actual screenshots array: leave empty until real screenshots are supplied
  // Paths can be relative like "/screenshots/1calcone-1.png"
  screenshots: string[];
  githubUrl?: string;
  playStoreUrl?: string;
}

export interface CrmProjectItem {
  id: string;
  title: string;
  description: string;
  status: 'IN DEVELOPMENT' | 'DETAILS COMING SOON' | 'ACTIVE';
  targetDomain: string;
  scopeHighlights: string[];
  screenshots: string[];
}

export interface LiveWebsiteItem {
  id: string;
  name: string;
  url: string;
  status: 'LIVE WEBSITE';
  contribution: string;
  techStack: string[];
  screenshotUrl?: string; // optional screenshot path
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TechnicalSkill {
  name: string;
  category: 'Frontend & Web' | 'Web3 & Blockchain' | 'Android & Mobile' | 'Backend & CRM' | 'IT Support & SEO';
  proficiency: number;
  level?: string;
  highlight: string;
  iconName?: string;
}

export const PORTFOLIO_DATA: {
  personal: PersonalInfo;
  services: ServiceItem[];
  androidApps: AndroidAppItem[];
  crmProjects: CrmProjectItem[];
  liveWebsites: LiveWebsiteItem[];
  processSteps: ProcessStep[];
  skills: TechnicalSkill[];
  toolsAndPlatforms: string[];
} = {
  personal: {
    name: "Shubham Sauhardra",
    title: "Website Developer & IT Solutions Provider",
    shortBio:
      "I work on website development, Web3 & blockchain solutions, software and CRM systems, SEO, IT support, Android applications, and AI-based digital solutions. Explore my services and projects to learn more about my work.",
    aboutText: [
      "I am an independent website developer and IT solutions provider working across web development, Web3 decentralized applications, custom software systems, IT infrastructure support, and digital solutions for businesses, institutions, and startups.",
      "My work focuses on practical, reliable technology: crafting responsive websites that communicate clearly, engineering Web3 and decentralized user interfaces, building customized CRM tools to simplify daily operations, maintaining stable computer systems, and engineering mobile solutions."
    ],
    // Owner verified contact details
    mobileNumber: "+91 7870903071",
    email: "sauhardra76@gmail.com",
    whatsappNumber: "917870903071",
    linkedInUrl: "https://www.linkedin.com/in/shubham-sauhardra-0a20421b9?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    profilePhotoUrl: "",
    location: "India"
  },

  services: [
    {
      id: "web-dev",
      title: "Website Development",
      description: "Business websites, landing pages, responsive websites, and website improvements.",
      features: [
        "Business & corporate websites",
        "High-conversion landing pages",
        "Mobile-first responsive layouts",
        "Performance & website improvements"
      ],
      iconName: "Globe"
    },
    {
      id: "web3-blockchain",
      title: "Web3 & Blockchain Development",
      description: "Decentralized applications (dApps), smart contract interfaces, Web3 wallet connectivity, and token-gated digital solutions.",
      features: [
        "dApp frontend engineering (React & Vite)",
        "Crypto wallet connectivity (MetaMask, WalletConnect)",
        "Smart contract ABI interaction (Ethers.js / Viem)",
        "Token gating, NFT showcases & IPFS storage"
      ],
      iconName: "Coins"
    },
    {
      id: "software-crm",
      title: "Software & CRM Development",
      description: "Custom software, CRM systems, business management tools, and workflow solutions.",
      features: [
        "Custom workflow management",
        "Customer & lead tracking tools",
        "Internal record management",
        "Operational administrative dashboards"
      ],
      iconName: "Database"
    },
    {
      id: "seo-marketing",
      title: "SEO & Digital Marketing",
      description: "Technical SEO, on-page optimization, website structure improvements, and local SEO support.",
      features: [
        "Technical SEO structure audit",
        "On-page meta & content optimization",
        "Search engine indexing assistance",
        "Local business SEO setup"
      ],
      iconName: "Search"
    },
    {
      id: "it-support",
      title: "IT Support",
      description: "Desktop troubleshooting, software installation, computer setup, and technical support.",
      features: [
        "Operating system & software installation",
        "Desktop & laptop troubleshooting",
        "Peripheral setup & office computer configuration",
        "Routine diagnostic & system maintenance"
      ],
      iconName: "Headphones"
    },
    {
      id: "android-dev",
      title: "Android App Development",
      description: "Android application development and improvement.",
      features: [
        "Native Android interface design",
        "Offline-first utility tools",
        "App architecture & performance",
        "Feature updates & code maintenance"
      ],
      iconName: "Smartphone"
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      description: "AI-enabled applications, workflow automation, and suitable AI integrations.",
      features: [
        "Automated repetitive workflows",
        "Smart API integration into existing apps",
        "Natural language processing features",
        "Practical business automation tools"
      ],
      iconName: "Cpu"
    }
  ],

  androidApps: [
    {
      id: "1calcone",
      title: "1CalcOne (CalcOne)",
      description: "All-in-One Digital Calculator — Precision Math & Pro Calculations Suite.",
      status: "IN DEVELOPMENT",
      tags: ["Android PWA", "Offline-First", "14+ Modules", "Finance & Math"],
      targetAudience: "Students, financial professionals, business owners, and everyday users requiring zero-latency offline calculations.",
      keyCapabilities: [
        "Quick Math Bar with instant evaluation & one-tap presets (GST, monthly divisions)",
        "Dedicated Mathematics suite: Basic Calculator & 5-mode Percentage Calculator",
        "Business & Finance tools: Compound Interest growth & Profit / Loss margin calculators",
        "Precision Age Calculator with exact total lived time and birthday countdowns",
        "100% Offline PWA architecture with Saved tapes, History log, and multi-theme palette"
      ],
      screenshots: ["calcone_dashboard_ui", "calcone_math_ui", "calcone_finance_ui"]
    },
    {
      id: "astroveda-ai",
      title: "AstroVeda AI",
      description: "Astrology and horoscope application project — Ancient Wisdom. Intelligent Guidance.",
      status: "IN DEVELOPMENT",
      tags: ["Android", "Vedic Astrology", "3D Solar Model", "AI Guidance"],
      targetAudience: "Individuals seeking personalized Vedic astrological guidance, planetary transit charts, and daily insights.",
      keyCapabilities: [
        "Interactive 3D Planetary Orbit model with real-time celestial coordinates",
        "Detailed celestial profiles (e.g. Sun Surya in Virgo, House 5, friendly status)",
        "Itemized Vedic attributes: Nakshatra, Planetary Lord, Gemstone, and Sanskrit Mantras",
        "Kundli House analysis (Tanu Bhava physical vitality through 12 houses)",
        "Unified navigation covering Kundli, AstroGuru, Panchang, and Kundli Matching"
      ],
      screenshots: ["astroveda_kundli_ui"]
    },
    {
      id: "digitalkhatatheme",
      title: "DigitalKhata",
      description: "Digital bookkeeping and account-management application project.",
      status: "IN DEVELOPMENT",
      tags: ["Android", "Digital Ledger", "Udhaar & Jama", "MSME Finance"],
      targetAudience: "Retail shopkeepers, merchants, and small business owners tracking daily credit (udhaar) and debit (jama) balances.",
      keyCapabilities: [
        "Udhaar & Jama (Credit & Debit) transaction recording",
        "Dedicated Customer and Supplier ledger directories",
        "Real-time Pending vs. Paid financial balance cards",
        "Chronological recent transaction history feeds with itemized deltas",
        "Fast-access 'Add Transaction' mobile workflow for counter sales"
      ],
      screenshots: ["digital_khata_live_ui"]
    },
    {
      id: "phoneraksha",
      title: "PhoneRaksha",
      description: "Smart Anti-Theft System — Proactive Smartphone Protection.",
      status: "IN DEVELOPMENT",
      tags: ["Android", "Cyber-Security", "Anti-Theft", "GPS Tracking"],
      targetAudience: "Smartphone owners seeking automated real-time theft prevention, unauthorized movement alerts, and device recovery.",
      keyCapabilities: [
        "Central 'SYSTEM ARMED / SECURE' real-time protection gauge",
        "Multi-sensor detection: Pocket Theft, Motion/Movement, Charger Unplug, and SIM Change",
        "Interactive GPS / Map live tracking with geofence surveillance",
        "Silent front-camera intruder selfie capture upon wrong PIN attempts",
        "Remote Alarm trigger and lock screen high-decibel siren protocol"
      ],
      screenshots: ["phoneraksha_armed_ui"]
    },
    {
      id: "androprompt-cli",
      title: "AndroPrompt (Android Command Prompt UI)",
      description: "Native Android Terminal Emulator & Command Prompt UI — Shell Scripting, ADB Diagnostics, and Mobile Linux Utilities.",
      status: "IN DEVELOPMENT",
      tags: ["Android CLI", "Terminal Emulator", "ADB Shell", "Linux Core", "Dev Tools"],
      targetAudience: "Developers, power users, system administrators, and IT technicians executing shell commands, package inspection, and device diagnostics on mobile.",
      keyCapabilities: [
        "Interactive POSIX shell environment (sh / mksh / bash) with command history & auto-scroll",
        "Android Package Manager (pm) and system diagnostic tools (neofetch, top, df, dumpsys)",
        "Integrated ADB command suite (adb devices, adb shell, logcat inspector presets)",
        "Virtual programmer accessory keyboard bar (TAB, CTRL, ALT, ESC, and arrow navigation)",
        "Custom terminal color palettes: Matrix Green, Cyber Cyan, Amber Phosphor, and Hacker Red"
      ],
      screenshots: ["androprompt_terminal_ui"]
    }
  ],

  crmProjects: [
    {
      id: "hr-crm",
      title: "HR Management CRM (TalentSpace CRM)",
      description: "A comprehensive enterprise HR management platform organizing employee records, visual recruitment pipelines, attendance, and manpower workflows.",
      status: "IN DEVELOPMENT",
      targetDomain: "Corporate & Enterprise Human Resources",
      scopeHighlights: [
        "Active Employee Directory & Onboarding tracker (234 active personnel)",
        "Visual Kanban Recruitment Pipeline from Sourcing to Onboarding",
        "Live Employee Attendance, WFH, Delayed & Leave status tracking",
        "Workforce Growth, Department Diversity & turnover analytics"
      ],
      screenshots: ["talentspace_crm_ui"]
    },
    {
      id: "school-crm",
      title: "School Management CRM (EduScholar CRM)",
      description: "A complete administrative school ecosystem supporting student admissions, fee collections, attendance, alerts, and parent communication.",
      status: "IN DEVELOPMENT",
      targetDomain: "Educational Institutions, Schools & Academies",
      scopeHighlights: [
        "Total Student Directory & Attendance monitoring (1,482 students, 94.2% daily attendance)",
        "Fee & Revenue Manager with real-time billing vs. collection registers (₹28.4L collected)",
        "Admission & Enrollment Pipeline tracking enquiries to verified enrollment",
        "Active Student Alerts & Recent Enquiries communication log (SMS, calls, notices)"
      ],
      screenshots: ["eduscholar_crm_ui"]
    },
    {
      id: "real-estate-crm",
      title: "Real Estate CRM (PropFlow CRM)",
      description: "A high-performance enterprise real estate CRM managing property listings, sales deal pipelines, agent performance, client interactions, and scheduled viewings.",
      status: "IN DEVELOPMENT",
      targetDomain: "Real Estate Agencies, Brokerage Networks & Property Developers",
      scopeHighlights: [
        "Total Listings & Inventory tracking (3,842 listings: 2,145 active, 1,697 sold)",
        "Visual Property Deals & Sales Pipeline with 5 Kanban stages from New Lead to Closed Won",
        "Live Property Viewings & Appointments schedule with agent dispatch (124 scheduled)",
        "Broker Commissions & Revenue analytics with recent interaction logs (WhatsApp, Calls, Emails)"
      ],
      screenshots: ["propflow_crm_ui"]
    }
  ],

  liveWebsites: [
    {
      id: "sunrises-trust",
      name: "Sunrises Trust",
      url: "https://www.sunrisestrust.in/",
      status: "LIVE WEBSITE",
      contribution: "Contributed to website design, layout structuring, content presentation, and ongoing technical support.",
      techStack: ["Web Design", "Content Formatting", "Technical Support"],
      screenshotUrl: "" // optional screenshot path
    },
    {
      id: "gsstvl",
      name: "GSSTVL",
      url: "https://www.gsstvl.com/",
      status: "LIVE WEBSITE",
      contribution: "Contributed to user interface updates, web structure improvements, and operational technical support.",
      techStack: ["Frontend Structuring", "Web Support", "Performance"],
      screenshotUrl: "" // optional screenshot path
    },
    {
      id: "suntec-india",
      name: "SunTec India",
      url: "https://www.suntecindia.com/",
      status: "LIVE WEBSITE",
      contribution: "Contributed to enterprise web development, responsive frontend component restructuring, performance tuning, and technical maintenance.",
      techStack: ["Enterprise Web", "Frontend Architecture", "Performance Optimization", "Technical Support"],
      screenshotUrl: ""
    },
    {
      id: "all-surface-pdx",
      name: "All Surface Cleaning",
      url: "https://www.allsurfacepdx.com/",
      status: "LIVE WEBSITE",
      contribution: "Contributed to modern responsive layout enhancements, service page structuring, SEO discoverability, and ongoing technical web support.",
      techStack: ["Responsive UI", "Local SEO Optimization", "Web Maintenance", "Service Architecture"],
      screenshotUrl: ""
    },
    {
      id: "loop-and-loom",
      name: "Loop & Loom",
      url: "https://loopandloom.shop/",
      status: "LIVE WEBSITE",
      contribution: "Contributed to eCommerce store interface refinement, catalog presentation, mobile navigation flow, and checkout performance improvements.",
      techStack: ["eCommerce Store", "Catalog UI/UX", "Mobile Responsiveness", "Frontend Support"],
      screenshotUrl: ""
    }
  ],

  processSteps: [
    {
      stepNumber: "01",
      title: "Understand Client Requirements",
      description: "Deep dive into your exact business needs, target audience, technical scope, and project goals."
    },
    {
      stepNumber: "02",
      title: "Plan the Project",
      description: "Formulate the architectural blueprint, milestone schedule, tech stack selection, and delivery expectations."
    },
    {
      stepNumber: "03",
      title: "Design and Develop",
      description: "Build clean, standards-compliant web, Android, or CRM solutions with responsive layouts and robust logic."
    },
    {
      stepNumber: "04",
      title: "Test and Review",
      description: "Validate performance, verify cross-device compatibility, iron out edge cases, and review with you."
    },
    {
      stepNumber: "05",
      title: "Deliver and Support",
      description: "Deliver and launch the agreed work smoothly and provide technical support and guidance as arranged."
    }
  ],

  skills: [
    // Frontend & Web Development
    {
      name: "HTML5 & Semantic Web Structure",
      category: "Frontend & Web",
      proficiency: 95,
      level: "Expert",
      highlight: "Clean semantic markup, accessibility (a11y), valid SEO structure, and clean DOM trees."
    },
    {
      name: "Modern CSS & Tailwind CSS",
      category: "Frontend & Web",
      proficiency: 92,
      level: "Expert",
      highlight: "Utility-first design, fluid responsive grids, smooth transitions, and design consistency."
    },
    {
      name: "JavaScript (ES6+) & TypeScript",
      category: "Frontend & Web",
      proficiency: 88,
      level: "Advanced",
      highlight: "Asynchronous programming, type safety, modular design patterns, and robust event handling."
    },
    {
      name: "React.js & Component Architecture",
      category: "Frontend & Web",
      proficiency: 86,
      level: "Advanced",
      highlight: "Reusable component design, React hooks, state management, and modern SPA performance."
    },
    {
      name: "Responsive & Cross-Device Layouts",
      category: "Frontend & Web",
      proficiency: 94,
      level: "Expert",
      highlight: "Pixel-accurate rendering across mobile handsets, tablets, laptops, and desktop monitors."
    },
    {
      name: "Web Performance & Core Web Vitals",
      category: "Frontend & Web",
      proficiency: 85,
      level: "Advanced",
      highlight: "Asset compression, bundle optimization, fast paint times, and Lighthouse audit scores."
    },

    // Web3 & Blockchain Development
    {
      name: "Web3.js, Ethers.js & Viem Integration",
      category: "Web3 & Blockchain",
      proficiency: 86,
      level: "Advanced",
      highlight: "RPC provider connectivity, reading on-chain contract state, ABI encoding/decoding, and transaction signing."
    },
    {
      name: "Crypto Wallet Integration (MetaMask & WalletConnect)",
      category: "Web3 & Blockchain",
      proficiency: 89,
      level: "Advanced",
      highlight: "Non-custodial wallet bindings, multi-chain network switching, account authorization, and balance inspection."
    },
    {
      name: "dApp Architecture & Decentralized Storage (IPFS)",
      category: "Web3 & Blockchain",
      proficiency: 83,
      level: "Proficient",
      highlight: "Decentralized UI patterns, token-gated routing, IPFS asset pinning, and decentralized data persistence."
    },
    {
      name: "Smart Contract ABI Interfaces & Event Listeners",
      category: "Web3 & Blockchain",
      proficiency: 81,
      level: "Proficient",
      highlight: "Interacting with ERC-20 / ERC-721 token standards, event subscription listeners, and transaction lifecycle handling."
    },

    // Android & Mobile Development
    {
      name: "Android Studio & Native SDK",
      category: "Android & Mobile",
      proficiency: 88,
      level: "Advanced",
      highlight: "Native Android application development, XML layouts, Activity/Fragment lifecycle management."
    },
    {
      name: "Java & Kotlin for Android",
      category: "Android & Mobile",
      proficiency: 84,
      level: "Proficient",
      highlight: "Core business logic, sensor listener bindings, background threads, and object-oriented patterns."
    },
    {
      name: "Mobile UI/UX & Touch Ergonomics",
      category: "Android & Mobile",
      proficiency: 89,
      level: "Advanced",
      highlight: "Intuitive touch targets, dark/light theme switching, bottom sheets, and native material components."
    },
    {
      name: "Hardware Sensor & Security Automation",
      category: "Android & Mobile",
      proficiency: 86,
      level: "Advanced",
      highlight: "Accelerometer motion detection, pocket sensors, charger disconnect, and siren triggers (PhoneRaksha)."
    },
    {
      name: "Offline SQLite & Ledger Persistence",
      category: "Android & Mobile",
      proficiency: 87,
      level: "Advanced",
      highlight: "Local SQLite database schemas, credit/debit calculation pipelines, and instant offline queries (DigitalKhata)."
    },

    // Backend & CRM Systems
    {
      name: "Custom CRM Workflow Architecture",
      category: "Backend & CRM",
      proficiency: 87,
      level: "Advanced",
      highlight: "Visual Kanban deal pipelines, HR employee directories, and school administrative modules."
    },
    {
      name: "REST API Integration & JSON Schemas",
      category: "Backend & CRM",
      proficiency: 85,
      level: "Advanced",
      highlight: "Connecting frontends with backend APIs, error handling, status codes, and secure payload parsing."
    },
    {
      name: "Business Logic & Computational Utilities",
      category: "Backend & CRM",
      proficiency: 90,
      level: "Expert",
      highlight: "All-in-one financial, GST, scientific, and unit conversion algorithms with immediate accuracy (1CalcOne)."
    },
    {
      name: "Relational Data Modeling & Tables",
      category: "Backend & CRM",
      proficiency: 82,
      level: "Proficient",
      highlight: "Clean entity-relationship schemas, foreign key structures, indexing, and scalable record organization."
    },

    // IT Support & SEO
    {
      name: "Desktop Diagnostics & Hardware Troubleshooting",
      category: "IT Support & SEO",
      proficiency: 92,
      level: "Expert",
      highlight: "Component-level fault isolation, system assembly, memory/storage diagnostics, and hardware repairs."
    },
    {
      name: "Operating Systems (Windows & Linux)",
      category: "IT Support & SEO",
      proficiency: 90,
      level: "Expert",
      highlight: "Clean OS installations, driver installations, stability tuning, command line operations, and system security."
    },
    {
      name: "Enterprise Software Setup & Maintenance",
      category: "IT Support & SEO",
      proficiency: 93,
      level: "Expert",
      highlight: "Configuring business productivity suites, developer environments, routine backup routines, and updates."
    },
    {
      name: "Technical SEO & Schema.org Architecture",
      category: "IT Support & SEO",
      proficiency: 88,
      level: "Advanced",
      highlight: "Sitemaps, robots.txt, canonical headers, OpenGraph tags, JSON-LD structured data, and search crawling."
    },
    {
      name: "Local Search Optimization & Discoverability",
      category: "IT Support & SEO",
      proficiency: 86,
      level: "Advanced",
      highlight: "Google Search Console monitoring, indexation verification, meta keywords tuning, and local discoverability."
    }
  ],

  toolsAndPlatforms: [
    "VS Code",
    "Android Studio",
    "Git & GitHub",
    "Vite",
    "Tailwind CSS",
    "Postman",
    "Chrome DevTools",
    "Node.js / npm",
    "Linux / Shell",
    "Windows OS",
    "Figma",
    "Google Search Console",
    "SQLite",
    "REST APIs",
    "Ethers.js / Web3.js",
    "MetaMask",
    "IPFS / Pinata"
  ]
};
