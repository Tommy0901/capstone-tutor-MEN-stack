import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { type Course } from '../models'

dayjs.extend(utc)
dayjs.extend(timezone)

export interface AvailableDaysCount {
  sun: boolean
  mon: boolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
}

export interface FormattedCourse extends Omit<Course, 'startAt'> {
  startAt: string | Date
}

export function currentTaipeiTime (datetime: string | dayjs.Dayjs | Date | null | undefined): string {
  return dayjs(datetime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
}

export function formatCourseStartAt (courseDate: string | dayjs.Dayjs | Date | null | undefined): string {
  return dayjs(courseDate).format('YYYY-MM-DD HH:mm:ss') // 將課程時間格式化
}

export function formattedTimestamp (): string {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份是從0開始的，所以需要加1
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}_${hours}${minutes}${seconds}`
}

export function upcomingCourseDates (freeDays: AvailableDaysCount): string[] {
  let newDay = dayjs().tz('Asia/Taipei').add(1, 'day') // 從明天開始起算
  const afterTwoWeeks = newDay.add(14 + 1, 'day') // 未來兩周可上課的時間
  const startTime = '18:00:00'
  const endTime = '20:30:00'
  const timeInterval = 30 // minutes
  const availableDays = []
  const futureCourseDates = []

  if (freeDays.mon) availableDays.push(1)
  if (freeDays.tue) availableDays.push(2)
  if (freeDays.wed) availableDays.push(3)
  if (freeDays.thu) availableDays.push(4)
  if (freeDays.fri) availableDays.push(5)
  if (freeDays.sat) availableDays.push(6)
  if (freeDays.sun) availableDays.push(0)

  while (newDay.isBefore(afterTwoWeeks)) {
    if (availableDays.includes(newDay.day())) {
      let startingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${startTime}`)
      const endingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${endTime}`)
      while (startingTime.isBefore(endingTime)) {
        futureCourseDates.push(startingTime.format('YYYY-MM-DD HH:mm:ss'))
        startingTime = startingTime.add(timeInterval, 'minute')
      }
    }
    newDay = newDay.add(1, 'day')
  }
  return futureCourseDates // 找出老師未來可上課的時間
}

export function pastCourseDates (freeDays: AvailableDaysCount): string[] {
  let newDay = dayjs().tz('Asia/Taipei').subtract(1, 'day') // 從昨天開始起算
  const beforeLastMonth = newDay.subtract(30, 'day') // 過去30天內可上課的時間
  const startTime = '18:00:00'
  const endTime = '20:30:00'
  const timeInterval = 30 // minutes
  const availableDays = []
  const pastCourseDates = []

  if (freeDays.mon) availableDays.push(1)
  if (freeDays.tue) availableDays.push(2)
  if (freeDays.wed) availableDays.push(3)
  if (freeDays.thu) availableDays.push(4)
  if (freeDays.fri) availableDays.push(5)
  if (freeDays.sat) availableDays.push(6)
  if (freeDays.sun) availableDays.push(0)

  while (newDay.isAfter(beforeLastMonth)) {
    if (availableDays.includes(newDay.day())) {
      let startingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${startTime}`)
      const endingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${endTime}`)
      while (startingTime.isBefore(endingTime)) {
        pastCourseDates.push(startingTime.format('YYYY-MM-DD HH:mm:ss'))
        startingTime = startingTime.add(timeInterval, 'minute')
      }
    }
    newDay = newDay.subtract(1, 'day')
  }
  return pastCourseDates // 找出老師過去可上課的時間
}

export function confirmAvailability (availableDaysCount: AvailableDaysCount): boolean {
  const availableDaysSet = new Set(Object.values(availableDaysCount))
  return availableDaysSet.has(1)
}

export function confirmAvailabilityConflicts (availableDaysCount: AvailableDaysCount, startAt: 'YYYY-MM-DD HH:mm:ss'): boolean {
  const whichDay = dayjs(startAt).day()
  const availableDaysArr = Object.values(availableDaysCount).map(day => day === 1)
  return availableDaysArr[whichDay]
}

export function confirmScheduledHoursConflicts (scheduledHours: FormattedCourse[], startAt: 'YYYY-MM-DD HH:mm:ss', duration: number): boolean {
  const endAt = dayjs(startAt).add(duration, 'minute').format('YYYY-MM-DD HH:mm:ss')
  const timeSlots = scheduledHours.map(i => ({
    startAt: dayjs(i.startAt).format('YYYY-MM-DD HH:mm:ss'),
    endAt: dayjs(i.startAt).add(i.duration, 'minute').format('YYYY-MM-DD HH:mm:ss')
  }))

  for (const range of timeSlots) {
    const condition1 = dayjs(range.startAt).isBefore(endAt)
    const condition2 = dayjs(range.endAt).isAfter(startAt)

    if (condition1 && condition2) return true
  }

  return false
}
