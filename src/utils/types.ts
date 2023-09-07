/* eslint-disable @typescript-eslint/no-explicit-any */
export const omitKeys = <T extends object>(obj: T, keys: string[]): any =>
  (Object.keys(obj) as Array<keyof T>).reduce((acc, key) => {
    if (keys.includes(String(key))) return acc

    return {
      ...acc,
      [key]: obj[key]
    }
  }, {})