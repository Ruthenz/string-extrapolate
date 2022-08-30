/**
  *
  * This method accepts two arrays and zips them together to an object 
  * in which the keys are the first array values and the values are the second array values
  *
  * Example: zipObject([1,2,3], ['one', 'two', 'three']) shall return { 1: 'one', 2: 'two', 3: 'three' }
  *
  * This method implementation using forEach was chosen after speed testing 
  * other possibilites (namely Object.fromEntries, reduce and Object.assign)
  *
  */
export function zipObject(keys: string[], values: string[]) {
  if (keys.length !== values.length) return;

  const result = {};
  keys.forEach((key, index) => result[key] = values[index]);
  return result;
}
