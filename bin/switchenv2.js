"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchenv2 = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var core_1 = require("./core");
function switchenv2(environment, options) {
    return function (db) {
        var groupId = options.group, source = options.source, entryId = options.entry, envPath = options.path;
        db.cleanup({
            historyRules: true,
            customIcons: true,
            binaries: true,
        });
        var group = core_1.findGroup(db, groupId);
        var entry = core_1.findEntry(group, entryId || environment);
        var content = entry.fields['Notes'].toString();
        var path = path_1.join(envPath || process.cwd(), '.env');
        var ogContent = fs_1.readFileSync(path).toString();
        core_1.saveContent(source, db, group, ogContent);
        fs_1.writeFileSync(path, content || '');
    };
}
exports.switchenv2 = switchenv2;
