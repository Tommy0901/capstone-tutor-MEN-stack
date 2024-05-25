export const parameters = {
  homepage: [
    {
      name: 'categoryId',
      in: 'query',
      schema: {
        type: 'integer'
      },
      description: '請輸入分類的 id (Number)'
    },
    {
      name: 'keyword',
      in: 'query',
      schema: {
        type: 'string'
      },
      description: '請輸入搜尋的關鍵字'
    },
    {
      name: 'page',
      in: 'query',
      schema: {
        type: 'integer'
      },
      description: '請輸入瀏覽頁碼'
    }
  ],
  getTeacher: [
    {
      name: 'id',
      in: 'path',
      description: '請輸入老師 id',
      schema: {
        type: 'string'
      },
      required: true
    }
  ]
}
