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
