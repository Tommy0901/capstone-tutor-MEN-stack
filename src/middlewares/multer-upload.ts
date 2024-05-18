import multer, { type Multer } from 'multer'

const upload: Multer = multer({ dest: 'temp/' })

export {
  upload
}
