export const parameters = {
  getRegistrations: [
    {
      name: 'keyword',
      in: 'query',
      schema: {
        type: 'string'
      },
      description: '請輸入搜尋的關鍵字'
    }
  ],
  getRegistrationsByCourse: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入欲查看的課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ],
  postRegistration: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入註冊的課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ],
  putRegistration: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ],
  deleteRegistration: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入取消註冊的課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ]
}
