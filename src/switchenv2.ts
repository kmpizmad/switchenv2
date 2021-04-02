import { Kdbx } from 'kdbxweb';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { findEntry, findGroup, saveContent } from './core';
import { IOptions } from './types';

export function switchenv2(environment: string, options: IOptions) {
  return (db: Kdbx): void => {
    const { group: groupId, source, entry: entryId, path: envPath } = options;

    // Maintenance
    db.cleanup({
      historyRules: true,
      customIcons: true,
      binaries: true,
    });

    const group = findGroup(db, groupId);
    const entry = findEntry(group, entryId || environment);
    const content: string = entry.fields['Notes'].toString();

    // Save og content and rewrite .env file with new data
    const path = join(envPath || process.cwd(), '.env');
    const ogContent = readFileSync(path).toString();
    saveContent(source, db, group, ogContent);
    writeFileSync(path, content || '');
  };
}
