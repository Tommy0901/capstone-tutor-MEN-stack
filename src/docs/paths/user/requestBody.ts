const properties = {
  signUp: {
    name: {
      type: 'string',
      example: 'test'
    },
    email: {
      type: 'string',
      example: 'test@example.com'
    },
    password: {
      type: 'string',
      example: '12345678'
    },
    passwordCheck: {
      type: 'string',
      example: '12345678'
    }
  },
  signIn: {
    email: {
      type: 'string',
      example: 'user1@example.com'
    },
    password: {
      type: 'string',
      example: '12345678'
    }
  },
  putTeacher: {
    name: {
      type: 'string',
      example: ''
    },
    nation: {
      type: 'string',
      example: ''
    },
    nickname: {
      type: 'string',
      example: ''
    },
    avatar: {
      type: 'string',
      format: 'binary'
    },
    teachStyle: {
      type: 'string',
      example: ''
    },
    selfIntro: {
      type: 'string',
      example: ''
    },
    mon: {
      type: 'boolean',
      example: ''
    },
    tue: {
      type: 'boolean',
      example: ''
    },
    wed: {
      type: 'boolean',
      example: ''
    },
    thu: {
      type: 'boolean',
      example: ''
    },
    fri: {
      type: 'boolean',
      example: ''
    },
    sat: {
      type: 'boolean',
      example: ''
    },
    sun: {
      type: 'boolean',
      example: ''
    },
    category: {
      type: 'array',
      items: {
        type: 'integer'
      }
    }
  },
  putStudent: {
    name: {
      type: 'string',
      example: ''
    },
    nickname: {
      type: 'string',
      example: ''
    },
    avatar: {
      type: 'string',
      format: 'binary'
    },
    selfIntro: {
      type: 'string',
      example: ''
    }
  }
}

type Properties = typeof properties[keyof typeof properties]

export class RequestBody {
  signUp: ReturnType<RequestBody['addContent']>
  signIn: ReturnType<RequestBody['addContent']>
  putTeacher: ReturnType<RequestBody['addContent']>
  putStudent: ReturnType<RequestBody['addContent']>

  constructor () {
    this.signUp = this.addContent(properties.signUp)
    this.signIn = this.addContent(properties.signIn)
    this.putTeacher = this.addContent(properties.putTeacher, 'multipart/form-data')
    this.putStudent = this.addContent(properties.putStudent, 'multipart/form-data')
  }

  private addContent (properties: Properties, form?: string): { content: typeof content } {
    const schema = { type: 'object', properties }
    const content = form === 'multipart/form-data'
      ? { 'multipart/form-data': { schema } }
      : { 'application/json': { schema } }

    return { content }
  }
}
