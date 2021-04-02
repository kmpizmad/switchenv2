"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveContent = void 0;
var fs_1 = require("fs");
var buffer_1 = require("../lib/buffer");
var findEntry_1 = require("./findEntry");
var exceptions_1 = require("../lib/exceptions");
var saveContent = function (source, db, group, content) {
    var name = 'default';
    var entry;
    try {
        entry = findEntry_1.findEntry(group, name);
    }
    catch (ex) {
        if (!(ex instanceof exceptions_1.EntityNotFoundException))
            throw ex;
        entry = db.createEntry(group);
    }
    entry.fields['Title'] = name;
    entry.fields['Notes'] = content;
    entry.pushHistory();
    entry.times.update();
    db.save()
        .then(function (data) { return fs_1.writeFileSync(source, buffer_1.toBuffer(data)); })
        .catch(function (e) { return console.log(e); });
};
exports.saveContent = saveContent;
