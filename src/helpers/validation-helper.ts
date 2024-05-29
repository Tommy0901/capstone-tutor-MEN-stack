import { isBoolean } from 'validator'

export function allNotNullOrEmpty (...values: Array<any | null | undefined>): boolean {
  return !values.every(value => value != null && value !== '')
}

export function booleanObjects (object: Record<string, boolean>): boolean {
  const Arr = [...Object.values(object)]
  const filterdArr = Arr.filter(i => i === undefined || isBoolean(String(i)))
  return Arr.length === filterdArr.length
}

export function sanitizeFileName (fileName: string): string {
  // 定義無效字符的正則表達式，不包括控制字符
  const invalidChars = /[<>:"/\\|?*]/g
  // 替換無效字符
  return fileName.replace(invalidChars, '_')
}
