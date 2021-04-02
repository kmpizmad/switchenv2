import { Group, Kdbx, KdbxUuid } from 'kdbxweb';
import { KeyNotFoundException } from '../lib/exceptions';

export function findGroup(db: Kdbx, groupId: string): Group {
  const groupUuid: KdbxUuid = new KdbxUuid(groupId);
  const group: Group | undefined = db.getGroup(groupUuid);

  if (group === undefined)
    throw new KeyNotFoundException(
      `Group does not exist with the id of ${groupId}`
    );

  return group;
}
