import { User } from '../models'

import { getUserPhotos, uploadImagesToS3 } from '../helpers/image-helper'

void (async () => {
  try {
    const [avatars, count] = await Promise.all([getUserPhotos(), User.count()])

    if (typeof avatars?.[0] === 'string') {
      await Promise.all((avatars as string[]).map(async (avatar, i) => {
        await uploadImagesToS3(avatar, i + 1 + count)
      }))
    }
  } catch (err) {
    console.log(err)
  }
})()
