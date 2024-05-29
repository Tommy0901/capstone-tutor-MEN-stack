import { parameters as param } from './parameter'
import { RequestBody } from './requestBody'
import { Response } from './response'

const tags = ['註冊相關']

const security = [{
  bearerAuth: []
}]

const req = new RequestBody()
const res = new Response()

export default {
  '/register/all': {
    get: {
      tags,
      summary: '學生檢視所有已預約的課程',
      security,
      parameters: param.getRegistrations,
      responses: {
        200: res.getRegistrations.Success
      }
    }
  },
  '/register/{courseId}': {
    post: {
      tags,
      summary: '學生預約課程',
      security,
      parameters: param.postRegistration,
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: {
                courseId: 114
              }
            }
          }
        }
      },
      responses: {
        200: res.postRegistration.Success,
        400: res.postRegistration.BadRequest,
        403: res.postRegistration.Forbidden,
        404: res.postRegistration.NotFound,
        500: res.postRegistration.InternalServerError
      }
    },
    put: {
      tags,
      summary: '學生對課程評分及評論',
      security,
      description: '課程評分為必填',
      parameters: param.putRegistration,
      requestBody: req.putRegistration,
      responses: {
        200: res.putRegistration.Success,
        400: res.putRegistration.BadRequest
      }
    },
    delete: {
      tags,
      summary: '學生取消課程預約',
      security,
      parameters: param.deleteRegistration,
      responses: {
        200: res.deleteRegistration.Success,
        404: res.deleteRegistration.NotFound,
        500: res.deleteRegistration.InternalServerError
      }
    }
  }
}
