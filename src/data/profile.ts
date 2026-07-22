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

  /** Engineering Focus tags (About + Home). */
  focusAreas: [
    'Control Systems',
    'Modeling & Simulation',
    'Systems Engineering',
    'Verification & Validation',
    'Real-Time Systems',
    'Estimation & Sensor Fusion',
  ] as string[],

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
    'Dersu Celiksoz is a systems and control engineer specializing in complex engineering systems. He collaborates with engineering teams on the development, modeling and validation of control-driven systems across a range of engineering projects.',
    'His work integrates systems engineering, modeling, control and validation into a single engineering workflow—from concept to validated implementation.',
    'Alongside engineering projects, he publishes white papers and technical notes to share practical engineering knowledge and contribute to the wider engineering community.',
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
    { label: 'Development & Collaboration', items: ['C / C++', 'Python', 'Jira', 'Git', 'SVN'] },
  ] as ToolGroup[],

  /** Collaboration models (Engineering). */
  collaboration: [
    {
      title: 'Project Engagements',
      description:
        'Scoped delivery of a modeling, control-design, or validation work package — from problem framing to documented, reproducible results.',
    },
    {
      title: 'Technical Advisory',
      description:
        'Design reviews, architecture and robustness assessments, and second-opinion analysis on control and systems-engineering decisions.',
    },
    {
      title: 'Research & Writing',
      description:
        'Applied investigation of a control or modeling question, written up as a white paper, engineering note, or internal reference.',
    },
    {
      title: 'Education & Training',
      description:
        'Webinars, courses, and workshops through the Academy — practical control and modeling knowledge for working engineers.',
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
      channel: 'scholar',
      label: 'Google Scholar / ORCID',
      value: 'Add your researcher profile',
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
