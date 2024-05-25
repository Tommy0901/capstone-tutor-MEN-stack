import { parameters as param } from './parameter'
import { requestBody } from './requestBody'
import { responses as res } from './response'

const tags = ['使用者相關']

const security = [{
  bearerAuth: []
}]

export default {
  '/signup': {
    post: {
      tags,
      summary: '送出使用者註冊資料',
      description: '欄位 name, email, password, passwordCheck 為必填',
      requestBody: requestBody.signUp,
      responses: {
        200: res.signUp.Success,
        400: res.signUp.BadRequest,
        409: res.signUp.Conflict
      }
    }
  },
  '/signin': {
    post: {
      tags,
      summary: '送出使用者登入資料',
      description: '欄位 email, password 為必填',
      requestBody: requestBody.signIn,
      responses: {
        200: res.signIn.Success,
        400: res.signIn.BadRequest,
        401: res.signIn.Unauthorized,
        500: res.signIn.InternalServerError
      }
    }
  },
  '/home': {
    get: {
      tags,
      summary: '顯示所有老師資料與學生的學習時數排名',
      parameters: param.homepage,
      responses: {
        200: res.homepage.Success
      }
    }
  },
  '/teacher/{id}': {
    get: {
      tags,
      summary: '學生瀏覽老師的個人頁面',
      parameters: param.getTeacher,
      responses: {
        200: res.getTeacher.Success,
        404: res.getTeacher.NotFound
      }
    }
  },
  '/teacher/{id}/personal': {
    get: {
      tags,
      summary: '老師瀏覽自己的個人頁面',
      security,
      parameters: param.getTeacher,
      responses: {
        200: res.getTeacher.Success,
        401: res.getTeacher.Unauthorized,
        404: res.getTeacher.NotFound
      }
    }
  },
  '/teacher/edit': {
    get: {
      tags,
      summary: '老師進入個人編輯頁',
      security,
      responses: {
        200: res.editTeacher.Success,
        401: res.editTeacher.Unauthorized,
        500: res.editTeacher.InternalServerError
      }
    }
  },
  '/teacher': {
    put: {
      tags,
      summary: '老師修改個人頁面',
      security,
      description: '可編輯欄位包含 name, nation, nickname, teachStyle, selfIntro, category(陣列) 及勾選可上課星期，其中 name 跟 category 為必填',
      requestBody: requestBody.putTeacher,
      responses: {
        200: res.putTeacher.Success,
        400: res.putTeacher.BadRequest,
        401: res.putTeacher.Unauthorized,
        500: res.putTeacher.InternalServerError
      }
    },
    patch: {
      tags,
      summary: '申請成為老師',
      security,
      responses: {
        200: res.patchTeacher.Success,
        401: res.patchTeacher.Unauthorized,
        409: res.patchTeacher.Conflict,
        500: res.patchTeacher.InternalServerError
      }
    }
  },
  '/student/edit': {
    get: {
      tags,
      summary: '學生進入個人編輯頁',
      security,
      responses: {
        200: res.editStudent.Success,
        401: res.editStudent.Unauthorized,
        500: res.editStudent.InternalServerError
      }
    }
  },
  '/student': {
    put: {
      tags,
      summary: '學生修改個人頁面',
      security,
      description: '可編輯欄位包含 name , nickname, avatar, selfIntro 其中 name 為必填',
      requestBody: requestBody.putStudent,
      responses: {
        200: res.putStudent.Success,
        400: res.putStudent.BadRequest,
        401: res.putStudent.Unauthorized,
        500: res.putStudent.InternalServerError
      }
    },
    get: {
      tags,
      summary: '學生瀏覽自己的個人頁面',
      security,
      responses: {
        200: res.getStudent.Success,
        401: res.getStudent.Unauthorized,
        500: res.getStudent.InternalServerError
      }
    }
  }
}
