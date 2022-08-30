'use strict';

function zipObject(keys, values) {
  if (!Array.isArray(keys) || !Array.isArray(values) || keys.length !== values.length)
    return;
  const result = {};
  keys.forEach((key, index) => result[key] = values[index]);
  return result;
}
function removeFirstAndLastChars(str) {
  return str?.slice(1, -1);
}

const insideCurlyBraces = /\{([^}]+)\}/g;
const regexForAnyCharButNewline = "([^\\n]+)";
function extrapolate(template, input) {
  if (!template || !input)
    return {};
  const placeholders = template.match(insideCurlyBraces);
  if (!placeholders)
    return {};
  const keys = placeholders.map(removeFirstAndLastChars);
  const regexTemplate = template.replaceAll(insideCurlyBraces, regexForAnyCharButNewline);
  const matches = input.match(regexTemplate);
  if (!matches)
    return {};
  const values = matches.slice(1);
  return zipObject(keys, values);
}

module.exports = extrapolate;
//# sourceMappingURL=string-extrapolate.js.map
