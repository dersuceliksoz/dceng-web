/**
 * Experience & education timeline (About page).
 * Items are rendered newest-first by the Timeline component in the order
 * listed here.
 */

export interface TimelineItem {
  kind: 'experience' | 'education';
  role: string;
  org: string;
  period: string;
  /** optional location */
  place?: string;
  /** short bullet points describing the role/program */
  summary: string[];
  /** marks placeholder data to be replaced */
  placeholder?: boolean;
}

export const experience: TimelineItem[] = [
  {
    kind: 'experience',
    role: 'Founder | Systems & Control Engineer',
    org: 'DC Engineering Solutions',
    period: '2026 – Present',
    place: 'Ankara, Türkiye',
    summary: [
      'Independent engineering services in systems & control engineering',
      'Modeling & simulation, verification & validation, and technical consulting',
      'Technical publications, patents, and engineering knowledge sharing',
    ],
  },
  {
    kind: 'experience',
    role: 'Senior Controls Design Engineer',
    org: 'FNSS Defense Systems',
    period: '2021 – 2026',
    place: 'Ankara, Türkiye',
    summary: [
      'Model-based control design for hybrid electric tracked vehicles',
      'Real-time simulators, reduced-order modeling, and HIL validation',
      'Motion control, power management, and fault management',
    ],
  },
  {
    kind: 'experience',
    role: 'Undergraduate Engineer',
    org: 'STM Defense Technologies',
    period: '2020 – 2021',
    place: 'Ankara, Türkiye',
    summary: [
      'UAV gimbal electromechanical design & control',
      'Vibration isolation solutions for electromechanical components',
    ],
  },
  {
    kind: 'education',
    role: 'M.Sc. in Mechanical Engineering',
    org: 'Middle East Technical University (METU)',
    period: '2022 – 2025',
    summary: [
      'Thesis: Nonlinear Gear Dynamics',
      'Research Focus: Dynamics, Control Systems & Modeling',
      'CGPA: 3.64 / 4.00',
    ],
  },
  {
    kind: 'education',
    role: 'B.Sc. in Mechanical Engineering',
    org: 'Middle East Technical University (METU)',
    period: '2016 – 2021',
    summary: [
      'High Honors Graduate',
      'Focus: Mechanical Systems, Dynamics & Control',
      'CGPA: 3.77 / 4.00',
    ],
  },
];
