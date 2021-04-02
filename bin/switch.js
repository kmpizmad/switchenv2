"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchenv = void 0;
var kdbxweb_1 = require("kdbxweb");
var fs_1 = require("fs");
var path_1 = require("path");
var buffer_1 = require("./lib/buffer");
function switchenv(source, groupId, entryId) {
    return function (db) {
        var groupUuid = new kdbxweb_1.KdbxUuid(groupId);
        var group = db.getGroup(groupUuid);
        if (group === undefined)
            return console.log('Group does not exist!');
        var entry = group.entries.filter(function (entry) { return entry.uuid.id === entryId; })[0];
        var fields = entry.fields;
        var values = fields['Notes'].toString();
        var path = path_1.join(process.cwd(), '.env');
        var ogContent = fs_1.readFileSync(path).toString();
        fs_1.writeFileSync(path, values || '');
        db.cleanup({
            historyRules: true,
            customIcons: true,
            binaries: true,
        });
        var newEntry = db.createEntry(group);
        newEntry.fields['Title'] = 'default';
        newEntry.fields['Notes'] = ogContent;
        newEntry.pushHistory();
        newEntry.times.update();
        console.log(group.entries);
        db.save()
            .then(function (data) { return fs_1.writeFileSync(source, buffer_1.toBuffer(data)); })
            .catch(function (e) { return console.log(e); });
    };
}
exports.switchenv = switchenv;
