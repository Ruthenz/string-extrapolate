import { zipObject } from "./utils";

export default function extrapolate(str: string, template: string) {
  if (!str || !template) return;

  const keys = template.match(/\{([^}]+)\}/g).map(s => s.slice(1, -1));
	const regexTemplate = template.replaceAll(/\{([^}]+)\}/g, '([^\\n]+)');
  const values = str.match(regexTemplate).slice(1);

  return zipObject(keys, values);
}
