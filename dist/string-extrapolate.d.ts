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
declare function extrapolate(template: string, input: string): Record<string, string>;

export { extrapolate as default };
