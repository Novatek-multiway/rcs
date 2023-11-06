export const getLowerCaseKeyObject = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((k) => {
    result[k.slice(0, 1).toLowerCase() + k.slice(1)] =
      obj[k as keyof typeof obj];
  });

  return result;
};

export function getUpperCaseKeyObject(obj: Record<string, any>) {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const capitalizedKey: string = key.charAt(0).toUpperCase() + key.slice(1);
    result[capitalizedKey] = obj[key];
  });
  return result;
}

/**
 * Transforms an array of objects into an array of dictionaries.
 *
 * @param {Array} arr - The array of objects to be transformed.
 * @param {string} label - The key of the property to be used as the label in the dictionary.
 * @param {string} value - The key of the property to be used as the value in the dictionary.
 * @return {Array} An array of dictionaries with the specified label and value properties.
 */
export const dictsTransform = (arr: [], label?: string, value?: string) => {
  if (!arr) {
    return [];
  }
  if (!label || !value) {
    return arr.map((item) => String(item?.id));
  }
  return arr.map((item) => ({
    label: String(item[label]),
    value: item[value],
  }));
};
