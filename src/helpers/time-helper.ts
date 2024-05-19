import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { type Course } from '../models'

dayjs.extend(utc)
dayjs.extend(timezone)

export interface AvailableDaysCount {
  sun: 0 | 1
  mon: 0 | 1
  tue: 0 | 1
  wed: 0 | 1
  thu: 0 | 1
  fri: 0 | 1
  sat: 0 | 1
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

export function upcomingCourseDates (whichDay: { mon: boolean | null, tue: boolean | null, wed: boolean | null, thu: boolean | null, fri: boolean | null, sat: boolean | null, sun: boolean | null }): string[] {
  let newDay = dayjs().tz('Asia/Taipei')
  const afterTwoWeeks = newDay.add(14, 'day') // 未來兩周可上課的時間
  const startTime = '18:00:00'
  const endTime = '20:30:00'
  const futureCourseDates = []
  const timeInterval = 30 // minutes
  const availableDays = []

  if (whichDay.mon != null) availableDays.push(1)
  if (whichDay.tue != null) availableDays.push(2)
  if (whichDay.wed != null) availableDays.push(3)
  if (whichDay.thu != null) availableDays.push(4)
  if (whichDay.fri != null) availableDays.push(5)
  if (whichDay.sat != null) availableDays.push(6)
  if (whichDay.sun != null) availableDays.push(0)

  while (newDay.isBefore(afterTwoWeeks)) {
    newDay = newDay.add(1, 'day')
    if (availableDays.map(d => Number(d)).includes(newDay.day())) {
      let startingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${startTime}`)
      const endingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${endTime}`)
      while (startingTime.isBefore(endingTime)) {
        futureCourseDates.push(startingTime.format('YYYY-MM-DD HH:mm:ss'))
        startingTime = startingTime.add(Number(timeInterval), 'minute')
      }
    }
  }
  return futureCourseDates // 找出老師未來可上課的時間
}

export function pastCourseDates (whichDay: { mon: boolean | null, tue: boolean | null, wed: boolean | null, thu: boolean | null, fri: boolean | null, sat: boolean | null, sun: boolean | null }): string[] {
  let newDay = dayjs().tz('Asia/Taipei')
  const beforeLastMonth = newDay.subtract(30, 'day') // 過去30天內可上課的時間
  const startTime = '18:00:00'
  const endTime = '20:30:00'
  const pastCourseDates = []
  const timeInterval = 30 // minutes
  const availableDays = []

  if (whichDay.mon != null) availableDays.push(1)
  if (whichDay.tue != null) availableDays.push(2)
  if (whichDay.wed != null) availableDays.push(3)
  if (whichDay.thu != null) availableDays.push(4)
  if (whichDay.fri != null) availableDays.push(5)
  if (whichDay.sat != null) availableDays.push(6)
  if (whichDay.sun != null) availableDays.push(0)

  while (newDay.isAfter(beforeLastMonth)) {
    newDay = newDay.subtract(1, 'day')
    if (availableDays.map(d => Number(d)).includes(newDay.day())) {
      let startingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${startTime}`)
      const endingTime = dayjs(`${newDay.format('YYYY-MM-DD')} ${endTime}`)
      while (startingTime.isBefore(endingTime)) {
        pastCourseDates.push(startingTime.format('YYYY-MM-DD HH:mm:ss'))
        startingTime = startingTime.add(Number(timeInterval), 'minute')
      }
    }
  }
  return pastCourseDates // 找出老師過去可上課的時間
}

export function deDuplicateCourseDates (randomDatesArr: any[], availableDates: string | any[], limit: number, index: number): string[] {
  if (randomDatesArr.length < limit) {
    randomDatesArr
      .push(availableDates[Math.floor(Math.random() * availableDates.length)])
    return randomDatesArr[index]
  } else {
    let randomDate = availableDates[Math.floor(Math.random() * availableDates.length)]
    do { randomDate = availableDates[Math.floor(Math.random() * availableDates.length)] }
    while (randomDate === randomDatesArr[index])
    return randomDate
  }
}

export function confirmAvailability (availableDaysCount: AvailableDaysCount): boolean {
  const availableDaysSet = new Set(Object.values(availableDaysCount))
  return availableDaysSet.has(1)
}

export function confirmAvailabilityConflicts (availableDaysCount: AvailableDaysCount, startAt: 'YYYY-MM-DD HH:mm'): boolean {
  const whichDay = dayjs(startAt).day()
  const availableDaysArr = Object.values(availableDaysCount).map(day => day === 1)
  return availableDaysArr[whichDay]
}

export function confirmScheduledHoursConflicts (scheduledHours: FormattedCourse[], startAt: 'YYYY-MM-DD HH:mm', duration: number): boolean {
  const endAt = dayjs(startAt).add(duration, 'minute').format('YYYY-MM-DD HH:mm:ss')
  const timeSlots = scheduledHours.map(i => ({
    startAt: dayjs(i.startAt).format('YYYY-MM-DD HH:mm:ss'),
    endAt: dayjs(i.startAt).add(i.duration, 'minute').format('YYYY-MM-DD HH:mm:ss')
  }))

  for (const range of timeSlots) {
    const condition1 = dayjs(range.startAt).isAfter(endAt)
    const condition2 = dayjs(range.endAt).isBefore(startAt)
    console.log(condition1)
    console.log(condition2)
    if (!(condition1 || condition2)) return true
  }

  return false
}
