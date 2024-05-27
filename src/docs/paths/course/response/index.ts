import data from './data'

type Data = typeof data[keyof typeof data]

export class Response {
  getCoursesByTeacher: {
    Success: ReturnType<Response[200]>
  }

  postCourse: {
    Success: ReturnType<Response[200]>
    BadRequest: ReturnType<Response[400]>
    Forbidden: ReturnType<Response[403]>
  }

  getCourse: {
    Success: ReturnType<Response[200]>
    Forbidden: ReturnType<Response[403]>
    NotFound: ReturnType<Response[404]>
  }

  putCourse: {
    Success: ReturnType<Response[200]>
    BadRequest: ReturnType<Response[400]>
    Forbidden: ReturnType<Response[403]>
    NotFound: ReturnType<Response[404]>
  }

  deleteCourse: {
    Success: ReturnType<Response[200]>
    Forbidden: ReturnType<Response[403]>
    NotFound: ReturnType<Response[404]>
    InternalServerError: ReturnType<Response[500]>
  }

  constructor () {
    this.getCoursesByTeacher = {
      Success: this[200](data.getCoursesByTeacher)
    }
    this.postCourse = {
      Success: this[200](data.postCourse),
      BadRequest: this[400]('The course cannot open in the past.'),
      Forbidden: this[403]('Insufficient permission. Unable to create a new course!')
    }
    this.getCourse = {
      Success: this[200](data.getCourse),
      Forbidden: this[403]('Insufficient permissions.'),
      NotFound: this[404]("Course didn't exist!")
    }
    this.putCourse = {
      Success: this[200](data.putCourse),
      BadRequest: this[400]('Please input correct categoryId.'),
      Forbidden: this[403]('Insufficient permissions. Update failed!'),
      NotFound: this[404]("Course didn't exist!")
    }
    this.deleteCourse = {
      Success: this[200](data.deleteCourse),
      Forbidden: this[403]('Insufficient permissions.'),
      NotFound: this[404]("Course didn't exist!"),
      InternalServerError: this[500]('Delete course failed, Database Error.')
    }
  }

  private 200 (data: Data): typeof Success {
    const Success = {
      description: 'ok',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'success'
              },
              data
            }
          }
        }
      }
    }
    return Success
  }

  private 400 (message: string): typeof BadRequest {
    const BadRequest = {
      description: 'Error: Bad Request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: message
              }
            }
          }
        }
      }
    }
    return BadRequest
  }

  private 401 (message: string): typeof Unauthorized {
    const Unauthorized = {
      description: 'Error: Unauthorized',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: message
              }
            }
          }
        }
      }
    }
    return Unauthorized
  }

  private 403 (message: string): typeof Forbidden {
    const Forbidden = {
      description: 'Error: Forbidden',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: message
              }
            }
          }
        }
      }
    }
    return Forbidden
  }

  private 404 (message: string): typeof NotFound {
    const NotFound = {
      description: 'Error: Not Found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: message
              }
            }
          }
        }
      }
    }
    return NotFound
  }

  private 409 (message: string): typeof Conflict {
    const Conflict = {
      description: 'Error: Conflict',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: message
              }
            }
          }
        }
      }
    }
    return Conflict
  }

  private 500 (message: string): typeof InternalServerError {
    const InternalServerError = {
      description: 'Error: Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: message
              }
            }
          }
        }
      }
    }
    return InternalServerError
  }
}
