/**
 * Experience & education timeline (About page).
 * REPLACE-ME: placeholder roles/dates for a Systems & Control engineer —
 * swap in Dersu's real history. Items are rendered newest-first by the
 * Timeline component in the order listed here.
 */

export interface TimelineItem {
  kind: 'experience' | 'education';
  role: string;
  org: string;
  period: string;
  /** optional location */
  place?: string;
  summary: string;
  /** marks placeholder data to be replaced */
  placeholder?: boolean;
}

export const experience: TimelineItem[] = [
  {
    kind: 'experience',
    role: 'Independent Systems & Control Engineer',
    org: 'DC Engineering Solutions',
    period: '2024 — Present',
    place: 'Ankara, Türkiye',
    summary:
      'Modeling, control design, and SIL/HIL validation for control-driven systems; technical writing and applied research.',
    placeholder: true,
  },
  {
    kind: 'experience',
    role: 'Control Systems Engineer',
    org: 'Placeholder Engineering Company',
    period: '2021 — 2024',
    place: 'Ankara, Türkiye',
    summary:
      'Developed plant models and real-time controllers, built HIL test benches, and led verification campaigns for embedded control units.',
    placeholder: true,
  },
  {
    kind: 'experience',
    role: 'Modeling & Simulation Engineer',
    org: 'Placeholder Research Lab',
    period: '2019 — 2021',
    place: 'Ankara, Türkiye',
    summary:
      'Built high-fidelity vehicle and actuator models, performed parameter identification, and supported controller tuning studies.',
    placeholder: true,
  },
  {
    kind: 'education',
    role: 'M.Sc. in Control / Mechatronics Engineering',
    org: 'Placeholder University',
    period: '2017 — 2019',
    place: 'Türkiye',
    summary:
      'Thesis on model-based control of a nonlinear electromechanical system, with experimental validation.',
    placeholder: true,
  },
  {
    kind: 'education',
    role: 'B.Sc. in Mechanical / Electrical Engineering',
    org: 'Placeholder University',
    period: '2013 — 2017',
    place: 'Türkiye',
    summary:
      'Foundations in dynamics, systems theory, and control, with capstone work in simulation and embedded control.',
    placeholder: true,
  },
];
