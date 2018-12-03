"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getJSDocDescription(node) {
    var jsDocs = node.jsDoc;
    if (!jsDocs || !jsDocs.length) {
        return '';
    }
    return jsDocs[0].comment || '';
}
exports.getJSDocDescription = getJSDocDescription;
function getJSDocTag(node, tagName) {
    var tags = getJSDocTags(node, tagName);
    if (!tags || !tags.length) {
        return;
    }
    return tags[0].comment;
}
exports.getJSDocTag = getJSDocTag;
function isExistJSDocTag(node, tagName) {
    var tags = getJSDocTags(node, tagName);
    if (!tags || !tags.length) {
        return false;
    }
    return true;
}
exports.isExistJSDocTag = isExistJSDocTag;
function getJSDocTags(node, tagName) {
    return getMatchingJSDocTags(node, function (t) { return t.tagName.text === tagName; });
}
function getFirstMatchingJSDocTagName(node, isMatching) {
    var tags = getMatchingJSDocTags(node, isMatching);
    if (!tags || !tags.length) {
        return;
    }
    return tags[0].tagName.text;
}
exports.getFirstMatchingJSDocTagName = getFirstMatchingJSDocTagName;
function getMatchingJSDocTags(node, isMatching) {
    var jsDocs = node.jsDoc;
    if (!jsDocs || !jsDocs.length) {
        return;
    }
    var jsDoc = jsDocs[0];
    if (!jsDoc.tags) {
        return;
    }
    return jsDoc.tags.filter(isMatching);
}
//# sourceMappingURL=jsDocUtils.js.map