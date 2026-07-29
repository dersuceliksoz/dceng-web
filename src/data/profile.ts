/**
 * Central profile / identity data. The one place to edit personal details.
 *
 * REPLACE-ME markers: items with `placeholder: true` (contacts) are still
 * placeholders to be replaced — Tools / Approach / Background below are real.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactChannel {
  /** stable key, also used for the icon */
  channel: 'email' | 'linkedin' | 'github' | 'scholar' | 'location';
  label: string;
  /** human-readable display value */
  value: string;
  /** link target; omit for non-linkable items (e.g. location) */
  href?: string;
  /** true => clearly-marked placeholder to be replaced */
  placeholder?: boolean;
}

export interface CollaborationModel {
  title: string;
  description: string;
  /** PreviewGraphic variant name shown as this card's centered illustration. */
  graphic: string;
}

export interface EngineeringPrinciple {
  title: string;
  tagline: string;
  items: string[];
}

export interface ToolGroup {
  label: string;
  items: string[];
}

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Engineering', href: '/engineering' },
  { label: 'Publications', href: '/publications' },
  { label: 'Academy', href: '/academy' },
  { label: 'Contact', href: '/contact' },
];

export const profile = {
  name: 'Dersu Celiksoz',
  role: 'Systems & Control Engineer',
  /** Small uppercase descriptor shown under the name in the header brand mark. */
  brandDescriptor: 'Engineering Solutions',
  /** Hero eyebrow label — the engineering discipline/activity area, not a personal job title. */
  heroEyebrow: 'Systems & Control Engineering',
  brandLine: 'Designing, modeling and validating control-driven engineering systems.',
  /** Footer-only company text — must not appear elsewhere on the site. */
  company: 'DC Engineering Solutions',
  location: 'Ankara, Türkiye',
  email: 'dersuceliksoz@outlook.com',

  /** Application domains (Engineering page). */
  domains: [
    'Automotive & Vehicle Dynamics',
    'Aerospace & Defense',
    'Robotics & Motion Control',
    'Energy & Power Systems',
    'Industrial Automation',
  ] as string[],

  /** Background paragraphs (About). */
  background: [
    'Dersu Celiksoz is an independent systems and control engineer specializing in complex engineering systems. Through DC Engineering Solutions, he collaborates with engineering teams and industry partners to develop, model, and validate control-driven systems across a wide range of engineering projects.',
    'His work brings together systems thinking, modeling, control design, and verification into a single engineering workflow—from concept to validated implementation.',
  ] as string[],

  /** Engineering Principles (About → Approach, the emphasized section). */
  approach: [
    {
      title: 'Model Before Design',
      tagline: 'Understand first. Model with purpose.',
      items: ['Systems Thinking', 'Dynamic Modeling', 'Design Exploration'],
    },
    {
      title: 'Design for Reality',
      tagline: 'Expect reality. Engineer accordingly.',
      items: ['Operating Conditions', 'Fault Handling', 'Robust Design'],
    },
    {
      title: 'Validate by Testing',
      tagline: 'Prototype fast. Validate continuously.',
      items: ['Rapid Prototyping', 'MIL / SIL / HIL Testing', 'Test Analysis'],
    },
    {
      title: 'Preserve Engineering Knowledge',
      tagline: 'Document once. Reuse often.',
      items: ['Technical Documentation', 'Knowledge Sharing', 'Technical Publications'],
    },
  ] as EngineeringPrinciple[],

  /** Tools & technologies (About). */
  tools: [
    { label: 'Modeling, Control & Simulation', items: ['MATLAB', 'Simulink', 'Simscape & Multibody', 'Stateflow', 'Reduced-Order Modeller'] },
    { label: 'Real-Time & Testing', items: ['NI LabVIEW', 'NI LabVIEW FPGA', 'NI VeriStand', 'Vector CANoe'] },
    { label: 'Development & Collaboration', items: ['C / C++', 'Python', 'Jira', 'Git', 'SVN', 'SolidWorks', 'CATIA'] },
  ] as ToolGroup[],

  /** Collaboration models (Engineering). */
  collaboration: [
    {
      title: 'Project Engagements',
      description:
        'Independent engineering support for system design, modeling, control development, and validation—from concept development to documented delivery.',
      graphic: 'gear',
    },
    {
      title: 'Technical Advisory',
      description:
        'Architecture reviews, design assessments, control strategy evaluation, and technical decision support for engineering teams.',
      graphic: 'review',
    },
    {
      title: 'Research & Reporting',
      description: 'White papers, technical notes, engineering research, and application-focused technical documentation.',
      graphic: 'chart',
    },
    {
      title: 'Education & Training',
      description:
        'Workshops, webinars, and practical engineering training in systems, control, modeling, and verification.',
      graphic: 'book',
    },
  ] as CollaborationModel[],

  /** Contact channels. Email is real; the rest are clearly-marked placeholders. */
  contacts: [
    {
      channel: 'email',
      label: 'Email',
      value: 'dersuceliksoz@outlook.com',
      href: 'mailto:dersuceliksoz@outlook.com',
    },
    {
      channel: 'linkedin',
      label: 'LinkedIn',
      value: 'Add your LinkedIn profile URL',
      placeholder: true,
    },
    {
      channel: 'location',
      label: 'Location',
      value: 'Ankara, Türkiye',
    },
  ] as ContactChannel[],
} as const;

export type Profile = typeof profile;
