// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Schreiner Content Systems LLC",
  description: "Engineering High-Performance Digital Media Systems. We build scalable entertainment systems optimized for browse-based distribution and streaming platforms.",
  language: "en",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "SCHREINER",
  items: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Growth", href: "#growth" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const heroConfig: HeroConfig = {
  title: "SCHREINER",
  subtitle: "Engineering High-Performance Digital Media Systems",
  backgroundImage: "",
  servicesLabel: "Digital Media Systems",
  copyright: "© 2025",
  ctaPrimary: "Our Channels",
  ctaSecondary: "Contact",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "About Schreiner Content Systems",
  titleLine2: "",
  description: "Schreiner Content Systems LLC is a digital media automation company focused on building scalable browse-based entertainment channels. We engineer production systems designed to maximize output quality, consistency, and performance across streaming platforms. Our approach combines automation, workflow optimization, AI-assisted production, and systematic content experimentation. We focus on building infrastructure — not just individual videos.",
  image1: "",
  image1Alt: "",
  image2: "",
  image2Alt: "",
  authorImage: "",
  authorName: "",
  authorBio: "",
};

// ============================================================================
// Services Section Configuration
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "What We Do",
  subtitle: "Scalable digital media systems engineered for performance",
  services: [
    {
      id: "01",
      title: "Browse-Based Channel Development",
      description: "We develop and operate YouTube channels optimized for browse and recommendation-driven distribution.",
      image: "",
    },
    {
      id: "02",
      title: "Streaming & Long-Form Optimization",
      description: "We produce long-form and ultra-long-form content engineered for retention and engagement.",
      image: "",
    },
    {
      id: "03",
      title: "Multi-Platform Distribution",
      description: "We expand content across YouTube, YouTube Shorts, TikTok, Instagram, X, LinkedIn, and other platforms.",
      image: "",
    },
    {
      id: "04",
      title: "AI-Assisted Production Systems",
      description: "We integrate tools such as Vidrush, CapCut, ElevenLabs, and proprietary AI systems to optimize video creation workflows, including automated thumbnail generation and content structuring.",
      image: "",
    },
  ],
};

// ============================================================================
// Growth & Milestones Section Configuration
// ============================================================================

export interface MilestoneItem {
  id: number;
  title: string;
  description: string;
}

export interface GrowthConfig {
  title: string;
  subtitle: string;
  milestones: MilestoneItem[];
}

export const growthConfig: GrowthConfig = {
  title: "Growth & Achievements",
  subtitle: "Measurable progress in digital media systems",
  milestones: [
    {
      id: 1,
      title: "Multiple Channels Launched",
      description: "Multiple browse-based YouTube channels successfully developed and deployed",
    },
    {
      id: 2,
      title: "Two Channels Monetized",
      description: "Achieved monetization status on two separate channel properties",
    },
    {
      id: 3,
      title: "Silver Play Button",
      description: "YouTube Silver Play Button achievement unlocked",
    },
    {
      id: 4,
      title: "Multi-Platform Expansion",
      description: "Active expansion across YouTube, Shorts, TikTok, Instagram, X, and LinkedIn",
    },
    {
      id: 5,
      title: "Proprietary AI Development",
      description: "In-house AI tool development for automated production workflows",
    },
  ],
};

// ============================================================================
// Philosophy Section Configuration
// ============================================================================

export interface PhilosophyConfig {
  title: string;
  subtitle: string;
  text: string;
}

export const philosophyConfig: PhilosophyConfig = {
  title: "System Over Talent",
  subtitle: "Our Philosophy",
  text: "We believe scalable digital media is built through systems, not randomness. By simulating and optimizing production workflows, we increase both creative output and technical quality. Our goal is to produce high-quality entertainment at scale while continuously refining efficiency, retention, and audience alignment.",
};

// ============================================================================
// Founder Section Configuration
// ============================================================================

export interface FounderConfig {
  title: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
  imageAlt: string;
}

export const founderConfig: FounderConfig = {
  title: "Founder",
  name: "Konrad Schreiner",
  role: "Founder, Schreiner Content Systems LLC",
  bio: "Konrad focuses on engineering scalable content systems designed for algorithmic distribution and audience growth. His work combines media production, workflow optimization, and AI-assisted tooling.",
  email: "konrad.schrein@gmail.com",
  image: "",
  imageAlt: "Founder Photo",
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: ContactFormOption[];
  messageLabel: string;
  submitButtonText: string;
  image: string;
  companyName: string;
  address: string;
  phone: string;
  contactInfo: string;
}

export const contactConfig: ContactConfig = {
  title: "Contact",
  subtitle: "For partnerships, platform collaborations, or production inquiries",
  nameLabel: "Name",
  emailLabel: "Email",
  projectTypeLabel: "Inquiry Type",
  projectTypePlaceholder: "Select inquiry type",
  projectTypeOptions: [
    { value: "partnership", label: "Partnership" },
    { value: "platform", label: "Platform Collaboration" },
    { value: "production", label: "Production Inquiry" },
    { value: "other", label: "Other" },
  ],
  messageLabel: "Message",
  submitButtonText: "Send Message",
  image: "",
  companyName: "Schreiner Content Systems LLC",
  address: "Johann-Meyer-Str. 01097 Dresden Germany",
  phone: "+49 157 85471426",
  contactInfo: "For partnerships, platform collaborations, or production inquiries, please use the contact form.",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  marqueeHighlightChars: string[];
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  ctaText: string;
  ctaHref: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "Engineering Digital Media Systems",
  marqueeHighlightChars: ["E", "S"],
  navLinks1: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Growth", href: "#growth" },
  ],
  navLinks2: [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText: "Get in Touch",
  ctaHref: "#contact",
  copyright: "© 2025 Schreiner Content Systems LLC. All rights reserved.",
  tagline: "Systems over talent",
};

// ============================================================================
// Works Section Configuration (hidden - not used)
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "",
  subtitle: "",
  projects: [],
};

// ============================================================================
// Testimonials Section Configuration (hidden - not used)
// ============================================================================

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "",
  testimonials: [],
};

// ============================================================================
// Pricing Section Configuration (hidden - not used)
// ============================================================================

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  featured: boolean;
  features: string[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  title: "",
  subtitle: "",
  ctaButtonText: "",
  plans: [],
};

// ============================================================================
// FAQ Section Configuration (hidden - not used)
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "",
  faqs: [],
};

// ============================================================================
// Blog Section Configuration (hidden - not used)
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  title: "",
  subtitle: "",
  allPostsLabel: "",
  readMoreLabel: "",
  readTimePrefix: "",
  posts: [],
};
