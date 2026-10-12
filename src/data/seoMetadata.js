/**
 * Centralized SEO & Social Share Preview Metadata (Open Graph / Twitter Cards)
 * Edit this file to update the title, description, and preview image for any page.
 */

export const DEFAULT_METADATA = {
  title: 'Hamza Ziyard | UI/UX Designer & Creative Developer',
  description:
    'UI/UX Designer and Creative Developer based in Sri Lanka. Designing experiences where logic meets emotion. Specialized in UI/UX, product strategy, and creative development.',
  image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
  url: 'https://hamzaziyard.com/',
  type: 'website',
};

export const PAGE_METADATA = {
  '/': {
    title: 'Hamza Ziyard | Product Designer & Creative Developer',
    description:
      'Designing experiences where logic meets emotion. Explore case studies in native iOS development, enterprise redesigns, and fintech interfaces.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/',
  },
  '/about': {
    title: 'About | Hamza Ziyard',
    description:
      'Learn more about Hamza Ziyard, his journey as a UI/UX Designer & Creative Developer, design philosophy, and creative pursuits.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/about',
  },
  '/resume': {
    title: 'Resume | Hamza Ziyard',
    description:
      'Curriculum vitae and professional background of Hamza Ziyard — UI/UX Designer, Design System Architect, and Creative Developer.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/resume',
  },
  '/pockomint': {
    title: 'Pockomint Case Study | Hamza Ziyard',
    description:
      'End-to-end product design & SwiftUI engineering for Pockomint, a native iOS gamified personal finance app built to turn daily money tracking into an engaging habit.',
    image: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/pockomint-cover.webp',
    url: 'https://hamzaziyard.com/pockomint',
  },
  '/dfcc-bank': {
    title: 'DFCC Bank ATM Redesign Case Study | Hamza Ziyard',
    description:
      'Nationwide trilingual ATM/CRM interface redesign deployed across 180+ machines in Sri Lanka, validated through on-site hardware usability testing.',
    image: 'https://assets.hamzaziyard.com/projects-for-fun/dfcc/dfcc-assets/hero.webp',
    url: 'https://hamzaziyard.com/dfcc-bank',
  },
  '/what-if': {
    title: 'What If? Redesign Series | Hamza Ziyard',
    description:
      'A design critique and redesign series exploring how everyday apps can be rebuilt with evidence, research, and heuristic evaluation.',
    image: 'https://assets.hamzaziyard.com/projects-for-fun/What%20If%20Series/Lanka%20Metro%20Redesign/Redesign%20P1%20Cover.webp',
    url: 'https://hamzaziyard.com/what-if',
  },
  '/what-if/lanka-metro': {
    title: 'Redesigning Lanka Metro - P1 | Hamza Ziyard',
    description:
      'Independent redesign of Lanka Metro bus tracking & ticketing app — 4 core UX decisions rebuilt with evidence, research, and Apple Human Interface Guidelines.',
    image: 'https://assets.hamzaziyard.com/projects-for-fun/What%20If%20Series/Lanka%20Metro%20Redesign/Redesign%20P1%20Cover.webp',
    url: 'https://hamzaziyard.com/what-if/lanka-metro',
  },
  '/what-if/slt-mobitel': {
    title: 'Redesigning SLT Mobitel - P2 | Hamza Ziyard',
    description:
      'What if the SLT-Mobitel self-care app were organized around what users actually do? Complete restructuring based on heuristic evaluation and WCAG accessibility.',
    image: 'https://assets.hamzaziyard.com/projects-for-fun/What%20If%20Series/SLT%20Mobile%20Redesign/Redesign%20P2%20Cover.webp',
    url: 'https://hamzaziyard.com/what-if/slt-mobitel',
  },
  '/redesigns': {
    title: 'Redesigns & Concept Work | Hamza Ziyard',
    description:
      'Explorations where I revisit past work and applications with fresh eyes, new design systems, and modern UX patterns.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/redesigns',
  },
  '/work/zafer-work': {
    title: 'Zafer (ZorroSign) Case Study | Hamza Ziyard',
    description:
      'Enterprise design systems (HIG & Material Design), AI/blockchain signing workflows, and WCAG 2.1 compliance for a white-label digital signature suite.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/work/zafer-work',
  },
  '/work/surge-work': {
    title: 'Surge Global Case Study | Hamza Ziyard',
    description:
      'User journeys, sitemaps, interactive prototypes, and component libraries developed for enterprise client digital transformation.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/work/surge-work',
  },
  '/work/vetstoria-work': {
    title: 'Vetstoria Case Study | Hamza Ziyard',
    description:
      'High-converting landing page designs, clinic dashboard interactive prototypes, and product sprint explorations for a global veterinary booking platform.',
    image: 'https://assets.hamzaziyard.com/about/me-animated.webp',
    url: 'https://hamzaziyard.com/work/vetstoria-work',
  },
};

/**
 * Helper function to retrieve metadata for a given path,
 * falling back to default values if not explicitly defined.
 */
export function getPageMetadata(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const meta = PAGE_METADATA[normalizedPath];

  if (meta) {
    return { ...DEFAULT_METADATA, ...meta };
  }

  // Handle dynamic prefix matching if any
  return {
    ...DEFAULT_METADATA,
    url: `https://hamzaziyard.com${normalizedPath === '/' ? '' : normalizedPath}`,
  };
}
