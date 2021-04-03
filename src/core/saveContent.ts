import { Entry, Group, Kdbx } from 'kdbxweb';
import { writeFileSync } from 'fs';
import { toBuffer } from '../lib/buffer';
import { findEntry } from './findEntry';
import { EntityNotFoundException } from '../lib/exceptions';

export function saveContent(
  source: string,
  db: Kdbx,
  group: Group,
  content: string
): void {
  const name: string = 'default';
  let entry: Entry;

  try {
    entry = findEntry(group, name);
  } catch (ex) {
    if (!(ex instanceof EntityNotFoundException)) throw ex;
    entry = db.createEntry(group);
  }

  entry.fields['Title'] = name;
  entry.fields['Notes'] = content;
  entry.pushHistory();
  entry.times.update();

  db.save()
    .then(data => writeFileSync(source, toBuffer(data)))
    .catch(e => console.log(e));
}
