import { removeFirstAndLastChars, zipObject } from "./utils";

/**
  *
  * /     - delimiter
  * \{    - opening literal brace escaped because it is a special character used for quantifiers eg {2,3}
  * (     - start capturing
  * [^}]  - character class consisting of
  *   ^   - not
  *   }   - a closing brace (no escaping necessary because special characters in a character class are different)
  * +     - one or more of the character class
  * )     - end capturing
  * \}    - the closing literal brace
  * /     - delimiter
  *
  */
const insideCurlyBraces = /\{([^}]+)\}/g;

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
const regexForAnyCharButNewline = '([^\\n]+)';

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
export default function extrapolate(template: string, input: string): Record<string, string> {
  if (!template || !input) return {};

  const placeholders = template.match(insideCurlyBraces);
  if (!placeholders) return {};

  const keys = placeholders.map(removeFirstAndLastChars);
	const regexTemplate = template.replaceAll(insideCurlyBraces, regexForAnyCharButNewline);

	const matches = input.match(regexTemplate);
	if (!matches) return {};

  const values = matches.slice(1);

  return zipObject(keys, values);
}
