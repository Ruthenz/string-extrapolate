/**
  *
  * This method zips two arrays together to make an object in which the keys are the first array values and the values are the second array values
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

  const result = {} as Record<string, T>;
  keys.forEach((key, index) => result[key] = values[index]);
  return result;
}

export function removeFirstAndLastChars(str: string): string {
  return str?.slice(1, -1);
}
