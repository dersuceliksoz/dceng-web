/**
 * Central profile / identity data. The one place to edit personal details.
 *
 * REPLACE-ME markers: items with `placeholder: true` (contacts) and the
 * Tools / Approach / Background copy below are reasonable placeholders for a
 * Systems & Control engineer — swap in Dersu's real details when available.
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
  brandLine: 'Designing, modeling and validating control-driven engineering systems.',
  /** Footer-only company text — must not appear elsewhere on the site. */
  company: 'DC Engineering Solutions',
  location: 'Ankara, Türkiye',
  email: 'dersuceliksoz@outlook.com',
  shortStatement: 'Independent engineering, technical publications and knowledge sharing.',

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

  /** Background paragraphs (About). REPLACE-ME with real biography. */
  background: [
    'Dersu Celiksoz is a systems and control engineer focused on the full lifecycle of control-driven systems — from first-principles modeling and simulation through controller design, real-time implementation, and rigorous verification.',
    'His work bridges theory and practice: deriving tractable models from complex dynamics, designing controllers that hold up under real-world disturbance and uncertainty, and validating them through structured SIL/HIL pipelines before they reach hardware.',
    'Alongside engineering practice, he writes and teaches — publishing white papers and engineering notes, and running the Academy to share applied control and modeling knowledge with practising engineers.',
  ] as string[],

  /** How Dersu thinks as an engineer (About → Approach, the emphasized section). */
  approach: [
    {
      title: 'Model before code',
      description:
        'Every control problem starts as a model. A clear, validated plant model — with explicit assumptions and operating envelopes — makes the controller design honest and the failure modes visible early.',
    },
    {
      title: 'Design for the disturbance',
      description:
        'Nominal performance is the easy part. Robustness margins, actuator limits, sensor noise, and delay are treated as first-class design inputs, not afterthoughts discovered on the test bench.',
    },
    {
      title: 'Verify continuously',
      description:
        'Requirements, simulation, SIL, and HIL form one traceable chain. Each stage closes the loop on the last, so behaviour on hardware is a confirmation rather than a surprise.',
    },
    {
      title: 'Document to transfer',
      description:
        'Engineering value only compounds when it is written down. Decisions, derivations, and trade-offs are documented so they survive the project and teach the next one.',
    },
  ],

  /** Tools & technologies (About). REPLACE-ME / trim to taste. */
  tools: [
    { label: 'Modeling & Control', items: ['MATLAB', 'Simulink', 'Simscape', 'Stateflow', 'Control System Toolbox'] },
    { label: 'Simulation & Real-Time', items: ['dSPACE', 'Speedgoat / xPC', 'Modelica', 'Python (NumPy / SciPy / control)'] },
    { label: 'Systems & V&V', items: ['MBSE / SysML', 'Requirements tracing', 'SIL / HIL', 'Test automation'] },
    { label: 'Languages & Tooling', items: ['C / C++', 'Python', 'MATLAB', 'Git', 'CI pipelines'] },
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
