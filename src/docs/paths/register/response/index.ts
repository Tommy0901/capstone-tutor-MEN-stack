import data from './data'

type Data = typeof data[keyof typeof data]

type responseType = 'Success' | 'BadRequest' | 'Unauthorized' | 'Forbidden' | 'NotFound' | 'Conflict' | 'InternalServerError'

type responseCode = 200 | 400 | 401 | 403 | 404 | 409 | 500

type Responses = Partial<Record<responseType, ReturnType<Response[responseCode]>>>

export class Response {
  getRegistrations: Responses = {
    Success: this[200](data.getRegistrations)
  }

  getRegistrationsByCourse: Responses = {
    Success: this[200](data.getRegistrationsByCourse),
    Forbidden: this[403]('Unable to browse this course booking records.')
  }

  postRegistration: Responses = {
    Success: this[200](data.postRegistration),
    BadRequest: this[400]('Duplicate registration for this course'),
    Forbidden: this[403]('Teachers are not allowed to register for their own courses.'),
    NotFound: this[404]("Unable to register the course. Because the course didn't exist!"),
    InternalServerError: this[500]('Register course failed, Database error!')
  }

  putRegistration: Responses = {
    Success: this[200](data.putRegistration),
    BadRequest: this[400]('The course has not started yet!')
  }

  deleteRegistration: Responses = {
    Success: this[200](data.deleteRegistration),
    NotFound: this[404]("Registration didn't exist!"),
    InternalServerError: this[500]('Delete registration failed, Database Error.')
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
