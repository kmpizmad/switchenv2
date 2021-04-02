"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGroup = void 0;
var kdbxweb_1 = require("kdbxweb");
var exceptions_1 = require("../lib/exceptions");
function findGroup(db, groupId) {
    var groupUuid = new kdbxweb_1.KdbxUuid(groupId);
    var group = db.getGroup(groupUuid);
    if (group === undefined)
        throw new exceptions_1.KeyNotFoundException("Group does not exist with the id of " + groupId);
    return group;
}
exports.findGroup = findGroup;
