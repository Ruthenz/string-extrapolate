import { escapeRegex, getPlaceholders, replaceTemplatePlaceholders, zipObject } from "./utils";

/**
  *
  * (   - start capturing
  * [^  - open negated set
  * \n  - matches a new line character (because of negation it matches everything BUT newline)
  * +   - one or more of preceding token
  * ]   - close set
  * )   - end capturing
  *
  */
const REGEX_ANY_CHAR_BUT_NEWLINE = '([^\\n]+)';

const REGEX_TEMPLATE_PLACEHOLDER = "___PLACEHOLDER___";

interface ExtrapolateConfig {
  /** String to indicate placeholder open */
  opener: string,
  /** String to indicate placeholder close */
  closer: string
}

/**
  *
  * @param template - A string in the format of - "This is a {something}" 
  * * where {} is used to mark a placeholder
  *
  * @param input - The input from which to extrapolate the values of the placeholders
  *
  * @returns Returns an object that keys are the placeholder given in the template (i.e {x}) and values are the value from the string
  *
  * @example
  * extrapolate("This is an {something}", "This is an example") => { something: "example" }
  *
  * * Will return an empty object for all wrong cases
  *
  * @remarks
  * The return of an empty object for all wrong cases was a technical decision made in order to simplify.
  * because most of the use will be with destructing, the error handling will be in the programmer hands, 
  * and there is less chance for an uncaught destructing error.
  *
  */
export default function extrapolate(template: string, input: string, config?: ExtrapolateConfig): Record<string, string> {
  if (!template || !input) return {};

  const placeholders = getPlaceholders(template, config);
  if (!placeholders || !placeholders.length) return {};

  const keys = placeholders.map(({ key }) => key);

  const regexTemplateWithPlaceholders = replaceTemplatePlaceholders(template, placeholders, REGEX_TEMPLATE_PLACEHOLDER);
  const escapedRegexTemplate = escapeRegex(regexTemplateWithPlaceholders);
  const regexTemplate = escapedRegexTemplate.replaceAll(REGEX_TEMPLATE_PLACEHOLDER, REGEX_ANY_CHAR_BUT_NEWLINE);

  const matches = input.match(regexTemplate);
  if (!matches) return {};

  const values = matches.slice(1); // first match for regex matching is irrelevant

  const result = zipObject(keys, values);
  if (!result) return {};

  return result;
}
