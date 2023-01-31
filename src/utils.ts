/**
  *
  * Zips two arrays together to make an object in which the keys are the first array values and the values are the second array values
  *
  * @param keys - An array of keys
  * @param values - An array of values
  * @returns An object which is the result of zipping the two arrays
  *
  * @example 
  * zipObject([1,2,3], ['one', 'two', 'three']) => { 1: 'one', 2: 'two', 3: 'three' }
  *
  * @remarks 
  * This method implementation using forEach was chosen after speed testing other possibilites (namely Object.fromEntries, reduce and Object.assign)
  *
  */
export function zipObject<T>(keys: string[], values: T[]): Record<string, T> {
  if (!Array.isArray(keys) || !Array.isArray(values) || keys.length !== values.length) return;

  return keys.reduce((result, key, index) => {
    result[key] = values[index];
    return result;
  }, {});
}

interface Placeholder {
  start: number
  end: number
  key: string
}

interface GetPlaceholdersConfig {
  /** String to indicate placeholder open */
  opener: string,
  /** String to indicate placeholder close */
  closer: string
}

/**
  *
  * Gets all the placeholders of a template
  *
  * @param template - A string with placeholders in it
  * @param config - Configuration object
  *
  * @example
  * getPlaceholders('This is {placeholder}') => [{ start: 8, end: 19, key: placeholder }]
  *
  */
export function getPlaceholders(
  template: string,
  { opener = '{', closer = '}' }: GetPlaceholdersConfig = { opener: '{', closer: '}' }
): Placeholder[] {
  if (!template || !opener || !closer) return [];

  const placeholders = [];
  let i = 0;
  let openers = 0;
  let openerIndex: number = null;
  let closerIndex: number = null;

  function pushPlaceholder() {
    const start = openerIndex;
    const end = closerIndex;
    const key = template.substring(start + opener.length, end - closer.length + 1);
    if (key) placeholders.push({ start, end, key });
    closerIndex = null;
  }

  while (i < template.length) {
    if (template.substring(i, i + opener.length) === opener) {
      openers += 1;
      if (openers === 1) openerIndex = i;
      i += opener.length;
    } else if (openers > 0 && template.substring(i, i + closer.length) === closer) {
      openers -= 1;
      closerIndex = i + closer.length - 1;
      if (openers === 0) pushPlaceholder();
      i += closer.length;
    } else {
      i++;
    }
  }

  if (openers > 0 && closerIndex) pushPlaceholder();

  return placeholders;
}

/**
  *
  * Replaces a part of a string
  *
  * @param input - The input string
  * @param replacement - The replacement string
  * @param from - Replace from index
  * @param [to] - Replace to index
  *
  * @example
  * replace("what replace this", 'is', 5, 11) => "what is this"
  *
  */
export function replace(input: string, replacement: string, from: number, to?: number) {
  if (to === undefined || to === null) to = from + replacement.length - 1;
  if (from > to || input.length < from || input.length < to) return;

  return input.substring(0, from) + replacement + input.substring(to + 1);
}

/**
  *
  * Replaces placeholders in a template
  *
  * @param template - The template to in which to replace placeholders
  * @param placeholders - The placeholders
  * @param replacement - The replacement string
  *
  */
export function replaceTemplatePlaceholders(template: string, placeholders: Placeholder[], replacement: string) {
  let result = template;
  let delta = 0;
  placeholders.forEach(({ start, end }) => {
    result = replace(result, replacement, start + delta, end + delta);
    const placeholderLength = (end - start);
    delta += replacement.length - placeholderLength - 1;
  });
  return result;
}
