export function string2number(val: string): number {
  const toNumber = Number(val)
  if (Number.isNaN(toNumber)) {
    return 0
  }
  return toNumber
}

export function string2Boolean(val: string): boolean {
  return val === 'true'
}

export const transFormUtils = {
  number: string2number,
  boolean: string2Boolean,
  string: (val: string) => val,
}
