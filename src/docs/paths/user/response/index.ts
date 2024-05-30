import data from './data'

type Data = typeof data[keyof typeof data]

export class Response {
  signUp: {
    Success: ReturnType<Response[200]>
    BadRequest: ReturnType<Response[400]>
    Conflict: ReturnType<Response[409]>
  }

  signIn: {
    Success: ReturnType<Response[200]>
    BadRequest: ReturnType<Response[400]>
    Unauthorized: ReturnType<Response[401]>
  }

  homepage: {
    Success: ReturnType<Response[200]>
  }

  getTeacher: {
    Success: ReturnType<Response[200]>
    Unauthorized: ReturnType<Response[401]>
    NotFound: ReturnType<Response[404]>
  }

  editTeacher: {
    Success: ReturnType<Response[200]>
    Unauthorized: ReturnType<Response[401]>
    InternalServerError: ReturnType<Response[500]>
  }

  putTeacher: {
    Success: ReturnType<Response[200]>
    BadRequest: ReturnType<Response[400]>
    Unauthorized: ReturnType<Response[401]>
    InternalServerError: ReturnType<Response[500]>
  }

  patchTeacher: {
    Success: ReturnType<Response[200]>
    Unauthorized: ReturnType<Response[401]>
    Conflict: ReturnType<Response[409]>
    InternalServerError: ReturnType<Response[500]>
  }

  editStudent: {
    Success: ReturnType<Response[200]>
    Unauthorized: ReturnType<Response[401]>
    InternalServerError: ReturnType<Response[500]>
  }

  putStudent: {
    Success: ReturnType<Response[200]>
    BadRequest: ReturnType<Response[400]>
    Unauthorized: ReturnType<Response[401]>
    InternalServerError: ReturnType<Response[500]>
  }

  getStudent: {
    Success: ReturnType<Response[200]>
    Unauthorized: ReturnType<Response[401]>
    InternalServerError: ReturnType<Response[500]>
  }

  constructor () {
    this.signUp = {
      Success: this[200](data.signUp),
      BadRequest: this[400]('Password does not match the confirmed password.'),
      Conflict: this[409]('Email has already been registered.')
    }
    this.signIn = {
      Success: this[200](data.signIn),
      BadRequest: this[400]('Please enter email and password.'),
      Unauthorized: this[401]('Incorrect username or password!')
    }
    this.homepage = {
      Success: this[200](data.homepage)
    }
    this.getTeacher = {
      Success: this[200](data.getTeacher),
      Unauthorized: this[401]('Unauthorized'),
      NotFound: this[404]("Teacher didn't exist!")
    }
    this.editTeacher = {
      Success: this[200](data.editTeacher),
      Unauthorized: this[401]('Unauthorized'),
      InternalServerError: this[500]('User data missing')
    }
    this.putTeacher = {
      Success: this[200](data.putTeacher),
      BadRequest: this[400]('Please enter categoryId array.'),
      Unauthorized: this[401]('Unauthorized'),
      InternalServerError: this[500]('User data missing')
    }
    this.patchTeacher = {
      Success: this[200](data.patchTeacher),
      Unauthorized: this[401]('Unauthorized'),
      Conflict: this[409]('Duplicate application for teacher. Update failed!'),
      InternalServerError: this[500]('DataBase Error. Update failed!')
    }
    this.editStudent = {
      Success: this[200](data.editStudent),
      Unauthorized: this[401]('Unauthorized'),
      InternalServerError: this[500]('User data missing')
    }
    this.putStudent = {
      Success: this[200](data.putStudent),
      BadRequest: this[400]('Please enter name.'),
      Unauthorized: this[401]('Unauthorized'),
      InternalServerError: this[500]('DataBase Error. Update failed!')
    }
    this.getStudent = {
      Success: this[200](data.getStudent),
      Unauthorized: this[401]('Unauthorized'),
      InternalServerError: this[500]('User data missing')
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
