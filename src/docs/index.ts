import { admin, user, course, register } from './paths'

const openapi = '3.1.0'

const info = {
  version: '1.0.0',
  title: 'Tutor.docs',
  description: '同學要認真上課喔 Σヽ(ﾟД ﾟ; )ﾉ'
}

const servers = [
  {
    url: 'http://localhost:3000'
  }
]

const tags = [
  {
    name: '使用者相關',
    description: 'User login/logout, edit personal profile, apply to become a teacher'
  },
  {
    name: '課程相關',
    description: 'Create/update course, course information, cancel Course'
  },
  {
    name: '註冊相關',
    description: 'Course registration and review, cancel registration'
  },
  {
    name: '管理者權限相關',
    description: 'Administrator privileges'
  }
]

const paths = {
  ...admin,
  ...user,
  ...course,
  ...register
}

const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }
}

export default {
  openapi,
  info,
  servers,
  tags,
  paths,
  components: { securitySchemes }
}
