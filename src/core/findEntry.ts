import { Entry, Group } from 'kdbxweb';
import { EntityNotFoundException, TooManyException } from '../lib/exceptions';

export function findEntry(group: Group, entryIdOrTitle: string): Entry {
  const filtered: Entry[] = group.entries.filter(
    entry =>
      entry.uuid.id === entryIdOrTitle ||
      entry.fields['Title'] === entryIdOrTitle
  );

  if (filtered.length > 1)
    throw new TooManyException(`Too many ${entryIdOrTitle} entries located`);

  if (filtered.length < 1)
    throw new EntityNotFoundException(
      `Entity not found with id or title of ${entryIdOrTitle}`
    );

  return filtered[0];
}
