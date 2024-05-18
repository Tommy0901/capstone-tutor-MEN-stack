import { S3Client, PutObjectCommand, DeleteObjectCommand, type PutObjectCommandInput, type DeleteObjectCommandInput } from '@aws-sdk/client-s3'
import { createApi } from 'unsplash-js'
import fs from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config()

export interface MulterFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_REGION,
  BUCKET_NAME: Bucket,
  UNSPLASH_KEY
} = process.env as Record<string, string>

// AWS S3 client initialization
const s3Client = new S3Client({
  region: S3_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

const unsplash = createApi({
  accessKey: UNSPLASH_KEY
})

const uploadToS3 = async (fileBuffer: Buffer, remoteFilePath: string): Promise<void> => {
  try {
    // Upload to S3 bucket
    const uploadParams: PutObjectCommandInput = {
      Bucket,
      Key: remoteFilePath,
      Body: fileBuffer
    }

    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    console.log(`File uploaded to S3: ${remoteFilePath}`)
  } catch (err) {
    console.error(`Error uploading file to S3: ${(err as { message: string }).message}`)
    throw err
  }
}

const deleteFileFromS3 = async (fileNumber: number): Promise<void> => {
  try {
    // Specify the file key (path) to delete
    const fileKey = `${fileNumber}.jpg`

    // Prepare delete object command parameters
    const deleteParams: DeleteObjectCommandInput = {
      Bucket,
      Key: fileKey
    }

    // Execute delete object command
    await s3Client.send(new DeleteObjectCommand(deleteParams))

    console.log(`File ${fileKey} deleted successfully from S3.`)
  } catch (err) {
    console.error(`Error deleting file from S3: ${(err as { message: string }).message}`)
    throw err
  }
}

export async function uploadSingleImageToS3 (file: MulterFile, userId: number): Promise<string> {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams: PutObjectCommandInput = {
    Bucket,
    Key: `${userId}.jpg`,
    Body: fileStream
  }

  await s3Client.send(new PutObjectCommand(uploadParams))

  return `https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/${userId}.jpg`
}

export async function uploadImageToS3 (API_URL: string, fileNumber: number): Promise<void> {
  try {
    // Download image
    const response = await axios.get<ArrayBuffer>(API_URL, { responseType: 'arraybuffer' })

    // Upload to S3
    await uploadToS3(Buffer.from(response.data), `${fileNumber}.jpg`)

    console.log('Image uploaded to S3')
  } catch (err) {
    console.error('Image upload failed:', err)
    throw err
  }
}

export async function deleteFileInS3 (fileNumber: number): Promise<void> {
  try {
    // Delete file from S3
    await deleteFileFromS3(fileNumber)

    console.log('File deleted in S3')
  } catch (err: any) {
    console.error('Error deleting file in S3:', err)
    throw err
  }
}

export async function getUserPhotos (): Promise<any> {
  // 串接 unsplash 的圖片
  try {
    const photos = await Promise.all([
      unsplash.search.getPhotos({
        query: 'student portrait',
        page: 1,
        perPage: 10
      }),
      unsplash.search.getPhotos({
        query: 'teacher portrait',
        page: 1,
        perPage: 24
      })
    ])

    const userImages = photos.flatMap((photo: any) => photo.response.results.map((result: any) => result.urls.small))
    return userImages
  } catch (err) {
    console.error(err)
  }
}
