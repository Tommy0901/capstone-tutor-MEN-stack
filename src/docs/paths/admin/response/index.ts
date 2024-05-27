import data from './data'

type Data = typeof data[keyof typeof data]

export class Response {
  getAllUser: {
    Success: ReturnType<Response[200]>
    Forbidden: ReturnType<Response[403]>
  }

  constructor () {
    this.getAllUser = {
      Success: this[200](data.getAllUser),
      Forbidden: this[403]('Insufficient permission.')
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
