const properties = {
  category: {
    type: 'array',
    items: {
      type: 'integer'
    }
  },
  name: {
    type: 'string',
    example: ''
  },
  intro: {
    type: 'string',
    example: ''
  },
  link: {
    type: 'string',
    example: ''
  },
  duration: {
    type: 'integer',
    example: ''
  },
  image: {
    type: 'string',
    format: 'binary'
  },
  startAt: {
    type: 'string',
    example: ''
  }
}

type Properties = typeof properties

export class RequestBody {
  postCourse: ReturnType<RequestBody['addContent']>
  putCourse: ReturnType<RequestBody['addContent']>

  constructor () {
    this.postCourse = this.addContent(properties, 'multipart/form-data')
    this.putCourse = this.addContent(properties, 'multipart/form-data')
  }

  private addContent (properties: Properties, form?: string): { content: typeof content } {
    const schema = { type: 'object', properties }
    const content = form === 'multipart/form-data'
      ? { 'multipart/form-data': { schema } }
      : { 'application/json': { schema } }

    return { content }
  }
}
