import { parameters as param } from './parameter'
import { RequestBody } from './requestBody'
import { Response } from './response'

const tags = ['課程相關']

const security = [{
  bearerAuth: []
}]

const req = new RequestBody()
const res = new Response()

export default {
  '/course': {
    get: {
      tags,
      summary: '老師查看所有已建立的課程',
      security,
      description: '欄位 category(陣列), name, intro, link, duration 跟 startAt 為必填',
      responses: {
        200: res.getCoursesByTeacher.Success
      }
    },
    post: {
      tags,
      summary: '老師建立課程',
      security,
      description: '欄位 category(陣列), name, intro, link, duration 跟 startAt 為必填',
      requestBody: req.postCourse,
      responses: {
        200: res.postCourse.Success,
        400: res.postCourse.BadRequest,
        403: res.postCourse.Forbidden
      }
    }
  },
  '/course/{courseId}': {
    get: {
      tags,
      summary: '檢視單一課程(含學生註冊資料)',
      security,
      parameters: param.getCourse,
      responses: {
        200: res.getCourse.Success,
        403: res.getCourse.NotFound,
        404: res.getCourse.NotFound
      }
    },
    put: {
      tags,
      summary: '老師修改課程資料',
      security,
      parameters: param.putCourse,
      description: '可編輯欄位包含 category(陣列), name, intro, link, duration, image, startAt 其中 category(陣列), name, intro, link, duration 跟 startAt 為必填',
      requestBody: req.putCourse,
      responses: {
        200: res.putCourse.Success,
        400: res.putCourse.BadRequest,
        403: res.putCourse.Forbidden,
        404: res.putCourse.NotFound
      }
    },
    delete: {
      tags,
      summary: '老師註銷課程',
      security,
      parameters: param.deleteCourse,
      responses: {
        200: res.deleteCourse.Success,
        403: res.deleteCourse.Forbidden,
        404: res.deleteCourse.NotFound,
        500: res.deleteCourse.InternalServerError
      }
    }
  }
}
