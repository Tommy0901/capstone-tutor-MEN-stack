import { type QueryInterface } from 'sequelize'

import bcrypt from 'bcryptjs'
import { User } from '../models'
import { faker } from '@faker-js/faker'
import { uploadImageToS3, deleteFileInS3, getUserPhotos } from '../helpers/image-helper'
import onePieceCharacters from '../config/one-piece'

import countries from '../config/conuntries'
const countryCodes = Object.keys(countries)

const availableDays = [
  { mon: 1, tue: 1, wed: 1, thu: 0, fri: 0, sat: 0, sun: 0 },
  { mon: 1, tue: 0, wed: 1, thu: 0, fri: 1, sat: 0, sun: 1 },
  { mon: 0, tue: 1, wed: 0, thu: 1, fri: 0, sat: 1, sun: 0 },
  { mon: 0, tue: 0, wed: 1, thu: 1, fri: 1, sat: 0, sun: 0 },
  { mon: 1, tue: 0, wed: 0, thu: 0, fri: 0, sat: 1, sun: 1 }
]

export default {
  up: async (queryInterface: QueryInterface) => {
    const [avatars, count] = await Promise.all([getUserPhotos(), User.count()])

    if (avatars != null) {
      await Promise.all(Array.from({ length: 34 }, async (_, i) => {
        await uploadImageToS3((avatars as string[])[i], i + 1 + count)
      }))
    }

    const hash = await bcrypt.hash('12345678', 10)
    const data = Array.from({ length: 34 }, (_, i) => {
      if (i < 10) {
        // Insert regular users
        return {
          name: onePieceCharacters[i],
          nation: countryCodes[Math.floor(Math.random() * countryCodes.length)],
          email: `user${i + 1}@example.com`,
          password: hash,
          nickname: faker.lorem.word(5),
          avatar: `https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/${i + 1 + count}.jpg`,
          is_teacher: false,
          self_intro: faker.lorem.paragraph(),
          ...{ mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }
        }
      } else {
        // Insert teachers
        return {
          name: onePieceCharacters[i],
          nation: countryCodes[Math.floor(Math.random() * countryCodes.length)],
          email: `teacher${i - 9}@example.com`,
          password: hash,
          nickname: faker.lorem.word(5),
          avatar: `https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/${i + 1 + count}.jpg`,
          is_teacher: true,
          teach_style: faker.lorem.paragraph(),
          self_intro: faker.lorem.paragraph(),
          ...availableDays[Math.floor(Math.random() * availableDays.length)]
        }
      }
    })

    if (count === 0) {
      await queryInterface.bulkInsert('users', data)
    }
  },

  down: async (queryInterface: QueryInterface) => {
    const count = await User.count()
    await Promise.all(Array.from({ length: 34 }).map(async (_, i) => { await deleteFileInS3(count - i) }))
    await queryInterface.bulkDelete('users', {})
  }
}
