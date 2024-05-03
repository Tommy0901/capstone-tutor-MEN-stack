export function allNotNullOrEmpty (...values: Array<any | null | undefined>): boolean {
  return !values.every(value => value != null && value !== '')
}
