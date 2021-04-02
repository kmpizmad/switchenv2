"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEntry = void 0;
var kdbxweb_1 = require("kdbxweb");
var exceptions_1 = require("../lib/exceptions");
function findEntry(group, entryIdOrTitle) {
    var uuid = new kdbxweb_1.KdbxUuid(entryIdOrTitle);
    var filtered = group.entries.filter(function (entry) { return entry.uuid === uuid || entry.fields['Title'] === entryIdOrTitle; });
    if (filtered.length > 1)
        throw new exceptions_1.TooManyException("Too many " + entryIdOrTitle + " entries located");
    if (filtered.length < 1)
        throw new exceptions_1.EntityNotFoundException("Entity not found with id or title of " + entryIdOrTitle);
    return filtered[0];
}
exports.findEntry = findEntry;
