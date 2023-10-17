export const getLowerCaseKeyObject = (obj: Record<string, any>) => {
  const result: Record<string, any> = {}
  Object.keys(obj).forEach((k) => {
    result[k.slice(0, 1).toLowerCase() + k.slice(1)] = obj[k as keyof typeof obj]
  })

  return result
}
