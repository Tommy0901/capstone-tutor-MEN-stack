import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config()

export function processEnv (name: string): string {
  const value = process.env[name]
  if (value == null || value === '') {
    throw new Error(`${name} is not defined`)
  }
  return value
}
