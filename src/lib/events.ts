import type { CollectionEntry } from 'astro:content';

type EventEntry = CollectionEntry<'events'>;
export type EventWhen = 'upcoming' | 'past';

/** Filter chips for the Academy events list, in display order. Default = upcoming. */
export const EVENT_FILTERS: Array<{ value: EventWhen; label: string }> = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

export const EVENT_TYPE_LABELS: Record<EventEntry['data']['type'], string> = {
  webinar: 'Webinar',
  course: 'Course',
  talk: 'Talk',
  workshop: 'Workshop',
};

/**
 * Upcoming vs past is classified at BUILD TIME by comparing the event date to
 * `now`. This is more reliable than the authored `status` field, but it freezes
 * at deploy time — an event whose date passes between builds stays "upcoming"
 * until the next rebuild. (Consider a nightly scheduled rebuild for freshness.)
 */
export function classifyWhen(date: Date, now: Date = new Date()): EventWhen {
  return date.getTime() >= now.getTime() ? 'upcoming' : 'past';
}

export type PreparedEvent = { entry: EventEntry; when: EventWhen };

/** Order: upcoming soonest-first, then past most-recent-first. */
export function prepareEvents(items: EventEntry[], now: Date = new Date()): PreparedEvent[] {
  const tagged = items.map((entry) => ({ entry, when: classifyWhen(entry.data.date, now) }));
  const upcoming = tagged
    .filter((x) => x.when === 'upcoming')
    .sort((a, b) => a.entry.data.date.getTime() - b.entry.data.date.getTime());
  const past = tagged
    .filter((x) => x.when === 'past')
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
  return [...upcoming, ...past];
}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
