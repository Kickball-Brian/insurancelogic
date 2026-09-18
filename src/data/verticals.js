// Shared vertical list — keep every vertical visible and independent so an
// agent working two or three product lines doesn't self-disqualify.
export const VERTICALS = [
  {
    slug: 'final-expense',
    name: 'Final Expense',
    icon: '🕊️',
    desc: 'Aged and live-transfer leads and calls for final expense agents writing burial and small whole-life policies.',
  },
  {
    slug: 'medicare',
    name: 'Medicare',
    icon: '🩺',
    desc: 'Medicare Advantage and Supplement leads and calls, routed to align with AEP, OEP, and SEP timing.',
  },
  {
    slug: 'life-insurance',
    name: 'Life Insurance',
    icon: '📄',
    desc: 'Term and permanent life leads and calls, segmented by coverage type so criteria match how you actually write business.',
  },
  {
    slug: 'annuity',
    name: 'Annuity',
    icon: '📈',
    desc: 'Fixed and indexed annuity leads for agents helping clients protect and grow retirement savings.',
    comingSoon: true,
  },
  {
    slug: 'home-insurance',
    name: 'Home Insurance',
    icon: '🏠',
    desc: 'Homeowners leads and calls for agents and agencies writing property coverage.',
  },
  {
    slug: 'mortgage-protection',
    name: 'Mortgage Protection',
    icon: '🔑',
    desc: 'Mortgage protection leads for agents covering new and existing homeowners.',
  },
  {
    slug: 'auto-insurance',
    name: 'Auto & Commercial Auto',
    icon: '🚗',
    desc: 'Personal and commercial auto leads and calls, including fleet and owner-operator coverage.',
  },
  {
    slug: 'gap-insurance',
    name: 'GAP Insurance',
    icon: '🛞',
    desc: 'GAP coverage leads for agents writing alongside auto and financing products.',
  },
  {
    slug: 'umbrella-insurance',
    name: 'Umbrella Insurance',
    icon: '☂️',
    desc: 'Umbrella coverage leads for agents rounding out clients\' personal liability protection.',
  },
]
