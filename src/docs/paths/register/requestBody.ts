const properties = {
  rating: {
    type: 'integer',
    example: 5
  },
  comment: {
    type: 'string',
    example: 'very good'
  }
}

type Properties = typeof properties

export class RequestBody {
  putRegistration: ReturnType<RequestBody['addContent']>

  constructor () {
    this.putRegistration = this.addContent(properties)
  }

  private addContent (properties: Properties, form?: string): { content: typeof content } {
    const schema = { type: 'object', properties }
    const content = form === 'multipart/form-data'
      ? { 'multipart/form-data': { schema } }
      : { 'application/json': { schema } }

    return { content }
  }
}
