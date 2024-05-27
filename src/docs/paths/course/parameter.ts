export const parameters = {
  getCourse: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入欲檢視的課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ],
  putCourse: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入欲修改的課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ],
  deleteCourse: [
    {
      name: 'courseId',
      in: 'path',
      description: '請輸入欲修改的課程 id',
      schema: {
        type: 'integer'
      },
      required: true
    }
  ]
}
