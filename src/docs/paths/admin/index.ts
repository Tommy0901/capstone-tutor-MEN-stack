import { Response } from './response'

const security = [{
  bearerAuth: []
}]

const res = new Response()

export default {
  '/admin/users': {
    get: {
      tags: ['管理者權限相關'],
      summary: 'admin browse user list',
      security,
      description: '進入後台查看使用者清單',
      responses: {
        200: res.getAllUser.Success,
        403: res.getAllUser.Forbidden
      }
    }
  }
}
