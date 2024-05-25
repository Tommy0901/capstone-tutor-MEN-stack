export const requestBody = {
  signUp: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
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
          }
        }
      }
    }
  },
  signIn: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user1@example.com'
            },
            password: {
              type: 'string',
              example: '12345678'
            }
          }
        }
      }
    }
  },
  putTeacher: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
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
          }
        }
      }
    }
  },
  putStudent: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
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
      }
    }
  }
}
