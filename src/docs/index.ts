import { user } from './paths'

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
  }
]

const paths = {
  ...user
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
