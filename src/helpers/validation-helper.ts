export function allNotNullOrEmpty (...values: Array<any | null | undefined>): boolean {
  return !values.every(value => value != null && value !== '')
}

export function booleanObjects (object: Record<string, boolean>): boolean {
  const Arr = [...Object.values(object)]
  const filterdArr = Arr.filter(i => i || !i)
  return Arr.length === filterdArr.length
}
