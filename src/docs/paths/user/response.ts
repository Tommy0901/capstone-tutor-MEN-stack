export const responses = {
  signUp: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  name: {
                    type: 'string',
                    example: 'user1'
                  },
                  email: {
                    type: 'string',
                    example: 'user1@example.com'
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2024-05-21 00:00:00'
                  },
                  createdAt: {
                    type: 'string',
                    example: '2024-05-21 00:00:00'
                  }
                }
              }
            }
          }
        }
      }
    },
    BadRequest: {
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
                example: 'Password does not match the confirmed password.'
              }
            }
          }
        }
      }
    },
    Conflict: {
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
                example: 'Email has already been registered.'
              }
            }
          }
        }
      }
    }
  },
  signIn: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  isTeacher: {
                    type: 'boolean',
                    example: 0
                  },
                  name: {
                    type: 'string',
                    example: 'Monkey D. Luffy'
                  },
                  email: {
                    type: 'string',
                    example: 'user1@example.com'
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNUZWFjaGVyIjowLCJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE2NDU3ODgwLCJleHAiOjE3MTkwNDk4ODB9._STG5FB4t7QI0N3FWwi7kyGyIDHsMdIk7jWri3ESJBM'
                  }
                }
              }
            }
          }
        }
      }
    },
    BadRequest: {
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
                example: 'Please enter email and password.'
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Incorrect username or password!'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
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
                example: 'JWT token encountered a generation error.'
              }
            }
          }
        }
      }
    }
  },
  homepage: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  totalPages: {
                    type: 'integer',
                    example: 4
                  },
                  currentPage: {
                    type: 'integer',
                    example: 1
                  },
                  prev: {
                    type: 'integer',
                    example: 1
                  },
                  next: {
                    type: 'integer',
                    example: 2
                  },
                  pages: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    example: [1, 2, 3, 4]
                  },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer'
                        },
                        name: {
                          type: 'string'
                        }
                      }
                    },
                    example: [
                      {
                        id: 1,
                        name: '多益'
                      },
                      {
                        id: 2,
                        name: '托福'
                      },
                      {
                        id: 3,
                        name: '雅思'
                      },
                      {
                        id: 4,
                        name: '商用英文'
                      },
                      {
                        id: 5,
                        name: '生活會話'
                      },
                      {
                        id: 6,
                        name: '旅遊英文'
                      },
                      {
                        id: 7,
                        name: '新聞英文'
                      }
                    ]
                  },
                  teachers: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer'
                        },
                        name: {
                          type: 'string'
                        },
                        nation: {
                          type: 'string'
                        },
                        nickname: {
                          type: 'string'
                        },
                        avatar: {
                          type: 'string'
                        },
                        teachStyle: {
                          type: 'string'
                        },
                        selfIntro: {
                          type: 'string'
                        },
                        teachingCategories: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              categoryId: {
                                type: 'integer'
                              },
                              category: {
                                type: 'object',
                                properties: {
                                  name: {
                                    type: 'string'
                                  }
                                }
                              }
                            }
                          }
                        },
                        ratingAverage: {
                          type: 'number'
                        }
                      }
                    },
                    example: [
                      {
                        id: 11,
                        name: 'Shanks',
                        nation: 'SL',
                        nickname: 'audax',
                        avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/11.jpg',
                        teachStyle: 'Deprimo turba excepturi antiquus. Aut claudeo sursum ascit verumtamen corroboro sponte trans acsi avarus. Defungo strues decor.',
                        selfIntro: 'Pectus curriculum verbera universe stips caveo cohaero speciosus. Usitas vigilo volutabrum similique derelinquo. Adeptio attollo depono audio.',
                        teachingCategories: [
                          {
                            categoryId: 2,
                            category: {
                              name: '托福'
                            }
                          },
                          {
                            categoryId: 3,
                            category: {
                              name: '雅思'
                            }
                          },
                          {
                            categoryId: 5,
                            category: {
                              name: '生活會話'
                            }
                          }
                        ],
                        ratingAverage: '4.5000'
                      },
                      {
                        id: 12,
                        name: 'Dracule Mihawk',
                        nation: 'TM',
                        nickname: 'absum',
                        avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/12.jpg',
                        teachStyle: 'Antea spero traho usus capio. Curatio assentator terror acquiro vehemens patruus atque suadeo vacuus. Quidem una vulgus spiritus stella.',
                        selfIntro: 'Iusto benevolentia coniecto copia sui acceptus accommodo strues sophismata. Velut somniculosus aperio vaco. Clarus reprehenderit aetas corpus suspendo alioqui crastinus sum animi.',
                        teachingCategories: [
                          {
                            categoryId: 5,
                            category: {
                              name: '生活會話'
                            }
                          }
                        ],
                        ratingAverage: '5.0000'
                      },
                      {
                        id: 13,
                        name: 'Boa Hancock',
                        nation: 'VG',
                        nickname: 'anser',
                        avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/13.jpg',
                        teachStyle: 'Tremo autus terebro audeo. Depromo decens suffoco denique clibanus delectus amitto argentum adamo. Approbo tremo concido argumentum torrens delinquo caterva architecto.',
                        selfIntro: 'Atqui et reprehenderit ambulo. Pauper quod votum. Vox corpus tibi.',
                        teachingCategories: [
                          {
                            categoryId: 1,
                            category: {
                              name: '多益'
                            }
                          },
                          {
                            categoryId: 2,
                            category: {
                              name: '托福'
                            }
                          },
                          {
                            categoryId: 3,
                            category: {
                              name: '雅思'
                            }
                          },
                          {
                            categoryId: 4,
                            category: {
                              name: '商用英文'
                            }
                          },
                          {
                            categoryId: 5,
                            category: {
                              name: '生活會話'
                            }
                          },
                          {
                            categoryId: 6,
                            category: {
                              name: '旅遊英文'
                            }
                          },
                          {
                            categoryId: 7,
                            category: {
                              name: '新聞英文'
                            }
                          }
                        ],
                        ratingAverage: '3.5000'
                      },
                      {
                        id: 14,
                        name: 'Buggy',
                        nation: 'HT',
                        nickname: 'curvo',
                        avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/14.jpg',
                        teachStyle: 'Articulus minus combibo coma cubo. Supplanto vacuus desidero contra custodia corrupti omnis. Varius aptus compono terebro vilis vulgaris vinculum valens clarus.',
                        selfIntro: 'Id clibanus tot curiositas talus voluptatum. Comprehendo ceno cupiditate defleo amor antea victus. Saepe nesciunt cruciamentum undique articulus fuga adnuo aeneus.',
                        teachingCategories: [
                          {
                            categoryId: 2,
                            category: {
                              name: '托福'
                            }
                          },
                          {
                            categoryId: 3,
                            category: {
                              name: '雅思'
                            }
                          },
                          {
                            categoryId: 4,
                            category: {
                              name: '商用英文'
                            }
                          },
                          {
                            categoryId: 5,
                            category: {
                              name: '生活會話'
                            }
                          },
                          {
                            categoryId: 6,
                            category: {
                              name: '旅遊英文'
                            }
                          }
                        ],
                        ratingAverage: '2.5000'
                      },
                      {
                        id: 15,
                        name: 'Edward Newgate',
                        nation: 'GQ',
                        nickname: 'cavus',
                        avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/15.jpg',
                        teachStyle: 'Debitis sapiente cervus. Concedo centum cubicularis distinctio clibanus depromo recusandae via. Velut nemo cognatus volup vapulus turpis admitto.',
                        selfIntro: 'Concedo angelus dignissimos nam sonitus cado volo. Defaeco ea perferendis velut quam sono caelum tergo sub. Cibo sui aegrus mollitia statim subito depulso cohors.',
                        teachingCategories: [
                          {
                            categoryId: 1,
                            category: {
                              name: '多益'
                            }
                          },
                          {
                            categoryId: 2,
                            category: {
                              name: '托福'
                            }
                          },
                          {
                            categoryId: 3,
                            category: {
                              name: '雅思'
                            }
                          },
                          {
                            categoryId: 4,
                            category: {
                              name: '商用英文'
                            }
                          },
                          {
                            categoryId: 5,
                            category: {
                              name: '生活會話'
                            }
                          },
                          {
                            categoryId: 7,
                            category: {
                              name: '新聞英文'
                            }
                          }
                        ],
                        ratingAverage: '3.0000'
                      },
                      {
                        id: 16,
                        name: 'Portgas D. Ace',
                        nation: 'NZ',
                        nickname: 'velit',
                        avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/16.jpg',
                        teachStyle: 'Vulgaris cumque summopere tertius alveus valde. Alias sophismata verus cuppedia cultura angelus voro. Volubilis crudelis beatae degero confero talio comedo ager admoveo.',
                        selfIntro: 'Commodo chirographum arca ex desidero arbitro. Aspernatur audio suus nulla vomito. Assumenda adulatio vito accusator admoneo aegrus viridis creptio.',
                        teachingCategories: [
                          {
                            categoryId: 1,
                            category: {
                              name: '多益'
                            }
                          },
                          {
                            categoryId: 2,
                            category: {
                              name: '托福'
                            }
                          },
                          {
                            categoryId: 4,
                            category: {
                              name: '商用英文'
                            }
                          },
                          {
                            categoryId: 5,
                            category: {
                              name: '生活會話'
                            }
                          },
                          {
                            categoryId: 6,
                            category: {
                              name: '旅遊英文'
                            }
                          }
                        ],
                        ratingAverage: '1.5000'
                      }
                    ]
                  },
                  students: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        studentId: {
                          type: 'integer'
                        },
                        studyHours: {
                          type: 'number'
                        },
                        student: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string'
                            },
                            nickname: {
                              type: 'string'
                            },
                            avatar: {
                              type: 'string'
                            }
                          }
                        }
                      }
                    },
                    example: [
                      {
                        studentId: 5,
                        studyHours: 4,
                        student: {
                          name: 'Vinsmoke Sanji',
                          nickname: 'valeo',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/5.jpg'
                        }
                      },
                      {
                        studentId: 7,
                        studyHours: 4,
                        student: {
                          name: 'Nico Robin',
                          nickname: 'audio',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/7.jpg'
                        }
                      },
                      {
                        studentId: 9,
                        studyHours: 4,
                        student: {
                          name: 'Brook',
                          nickname: 'debeo',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/9.jpg'
                        }
                      },
                      {
                        studentId: 1,
                        studyHours: 3.5,
                        student: {
                          name: 'Monkey D. Luffy',
                          nickname: 'usque',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/1.jpg'
                        }
                      },
                      {
                        studentId: 2,
                        studyHours: 3.5,
                        student: {
                          name: 'Roronoa Zoro',
                          nickname: 'clamo',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/2.jpg'
                        }
                      },
                      {
                        studentId: 4,
                        studyHours: 3.5,
                        student: {
                          name: 'Usopp',
                          nickname: 'saepe',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/4.jpg'
                        }
                      },
                      {
                        studentId: 6,
                        studyHours: 3.5,
                        student: {
                          name: 'Chopper',
                          nickname: 'audax',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/6.jpg'
                        }
                      },
                      {
                        studentId: 8,
                        studyHours: 3.5,
                        student: {
                          name: 'Franky',
                          nickname: 'eaque',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/8.jpg'
                        }
                      },
                      {
                        studentId: 3,
                        studyHours: 2.5,
                        student: {
                          name: 'Nami',
                          nickname: 'votum',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/3.jpg'
                        }
                      },
                      {
                        studentId: 10,
                        studyHours: 2.5,
                        student: {
                          name: 'Jimbei',
                          nickname: 'pauci',
                          avatar: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/10.jpg'
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  getTeacher: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 11
                  },
                  name: {
                    type: 'string',
                    example: 'Shanks'
                  },
                  nation: {
                    type: 'string',
                    example: 'SL'
                  },
                  email: {
                    type: 'string',
                    example: 'teacher1@example.com'
                  },
                  nickname: {
                    type: 'string',
                    example: 'audax'
                  },
                  avatar: {
                    type: 'string',
                    example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/11.jpg'
                  },
                  teachStyle: {
                    type: 'string',
                    example: 'Deprimo turba excepturi antiquus. Aut claudeo sursum ascit verumtamen corroboro sponte trans acsi avarus. Defungo strues decor.'
                  },
                  selfIntro: {
                    type: 'string',
                    example: 'Pectus curriculum verbera universe stips caveo cohaero speciosus. Usitas vigilo volutabrum similique derelinquo. Adeptio attollo depono audio.'
                  },
                  mon: {
                    type: 'boolean',
                    example: true
                  },
                  tue: {
                    type: 'boolean',
                    example: false
                  },
                  wed: {
                    type: 'boolean',
                    example: true
                  },
                  thu: {
                    type: 'boolean',
                    example: false
                  },
                  fri: {
                    type: 'boolean',
                    example: true
                  },
                  sat: {
                    type: 'boolean',
                    example: false
                  },
                  sun: {
                    type: 'boolean',
                    example: true
                  },
                  teachingCategories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        categoryId: {
                          type: 'integer'
                        },
                        category: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'integer'
                            }
                          }
                        }
                      }
                    },
                    example: [
                      {
                        categoryId: 2,
                        category: {
                          name: '托福'
                        }
                      },
                      {
                        categoryId: 3,
                        category: {
                          name: '雅思'
                        }
                      },
                      {
                        categoryId: 5,
                        category: {
                          name: '生活會話'
                        }
                      }
                    ]
                  },
                  courses: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer'
                        },
                        teacherId: {
                          type: 'integer'
                        },
                        category: {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        },
                        name: {
                          type: 'string'
                        },
                        intro: {
                          type: 'string'
                        },
                        image: {
                          type: 'string'
                        },
                        link: {
                          type: 'string'
                        },
                        startAt: {
                          type: 'string'
                        },
                        duration: {
                          type: 'integer'
                        },
                        registrations: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              rating: {
                                type: 'integer'
                              },
                              comment: {
                                type: 'string'
                              }
                            }
                          }
                        }
                      }
                    },
                    example: [
                      {
                        id: 1,
                        teacherId: 11,
                        category: [
                          '生活會話',
                          '托福'
                        ],
                        name: 'abstergo',
                        intro: 'Delectatio verto vester theatrum vinco arbustum antepono. Cuppedia denique apparatus animadverto civis damnatio apparatus vulgivagus. Adipisci casus callide eveniet tenus.',
                        image: 'https://fakeimg.pl/300/?text=course%20img',
                        link: 'https://creepy-crop.net/',
                        startAt: '2024-05-03 18:00:00',
                        duration: 30,
                        registrations: [
                          {
                            rating: 5,
                            comment: 'Templum auctus compono suscipit appello vorax. Capto clamo pel cresco termes brevis corroboro deinde. Eligendi comes assentator beatae depereo apto via thymum cubo demitto.'
                          }
                        ]
                      },
                      {
                        id: 2,
                        teacherId: 11,
                        category: [
                          '雅思',
                          '托福',
                          '生活會話'
                        ],
                        name: 'natus',
                        intro: 'Vir ratione ab sub sum adhuc depromo. Bellicus defendo bibo doloribus. Cilicium curtus statim doloremque amaritudo virga auditor libero.',
                        image: 'https://fakeimg.pl/300/?text=course%20img',
                        link: 'https://intrepid-fitness.info',
                        startAt: '2024-04-29 18:30:00',
                        duration: 60,
                        registrations: [
                          {
                            rating: 4,
                            comment: 'Vilis vobis annus. Adflicto viscus testimonium cognomen verus varietas. Aureus verecundia confido suggero degenero distinctio timidus accusator blandior.'
                          }
                        ]
                      },
                      {
                        id: 3,
                        teacherId: 11,
                        category: [
                          '生活會話',
                          '雅思'
                        ],
                        name: 'cribro',
                        intro: 'Adipisci aestivus spectaculum baiulus assumenda. Civitas assentator molestiae suscipio combibo caute defendo cado tollo clamo. Cupio adficio cedo curis aggredior aro avarus deduco deserunt.',
                        image: 'https://fakeimg.pl/300/?text=course%20img',
                        link: 'https://lumpy-box.info/',
                        startAt: '2024-05-26 18:00:00',
                        duration: 30,
                        registrations: [
                          {
                            rating: null,
                            comment: null
                          }
                        ]
                      },
                      {
                        id: 4,
                        teacherId: 11,
                        category: [
                          '生活會話'
                        ],
                        name: 'tantum',
                        intro: 'Aperiam valens corrigo. Tristis alienus tamquam tabernus nisi conicio. Explicabo consequatur iste.',
                        image: 'https://fakeimg.pl/300/?text=course%20img',
                        link: 'https://harmonious-gum.com',
                        startAt: '2024-06-03 19:00:00',
                        duration: 60,
                        registrations: [
                          {
                            rating: null,
                            comment: null
                          }
                        ]
                      }
                    ]
                  },
                  ratingAverage: {
                    type: 'number',
                    example: 4.5000
                  }
                }
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    NotFound: {
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
                example: "Teacher didn't exist!"
              }
            }
          }
        }
      }
    }
  },
  editTeacher: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 11
                  },
                  name: {
                    type: 'string',
                    example: 'Shanks'
                  },
                  nation: {
                    type: 'string',
                    example: 'SL'
                  },
                  email: {
                    type: 'string',
                    example: 'teacher1@example.com'
                  },
                  nickname: {
                    type: 'string',
                    example: 'audax'
                  },
                  avatar: {
                    type: 'string',
                    example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/11.jpg'
                  },
                  teachStyle: {
                    type: 'string',
                    example: 'Deprimo turba excepturi antiquus. Aut claudeo sursum ascit verumtamen corroboro sponte trans acsi avarus. Defungo strues decor.'
                  },
                  selfIntro: {
                    type: 'string',
                    example: 'Pectus curriculum verbera universe stips caveo cohaero speciosus. Usitas vigilo volutabrum similique derelinquo. Adeptio attollo depono audio.'
                  },
                  mon: {
                    type: 'boolean',
                    example: true
                  },
                  tue: {
                    type: 'boolean',
                    example: false
                  },
                  wed: {
                    type: 'boolean',
                    example: true
                  },
                  thu: {
                    type: 'boolean',
                    example: false
                  },
                  fri: {
                    type: 'boolean',
                    example: true
                  },
                  sat: {
                    type: 'boolean',
                    example: false
                  },
                  sun: {
                    type: 'boolean',
                    example: true
                  },
                  createdAt: {
                    type: 'string',
                    example: '2024-05-18 07:00:00'
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2024-05-18 07:00:00'
                  },
                  teachingCategories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        categoryId: {
                          type: 'integer'
                        },
                        category: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'integer'
                            }
                          }
                        }
                      }
                    },
                    example: [
                      {
                        categoryId: 2,
                        category: {
                          name: '托福'
                        }
                      },
                      {
                        categoryId: 3,
                        category: {
                          name: '雅思'
                        }
                      },
                      {
                        categoryId: 5,
                        category: {
                          name: '生活會話'
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
      description: 'Internal Server Error',
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
                example: 'User data missing'
              }
            }
          }
        }
      }
    }
  },
  putTeacher: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 11
                  },
                  name: {
                    type: 'string',
                    example: 'Shanks'
                  },
                  nation: {
                    type: 'string',
                    example: 'KG'
                  },
                  email: {
                    type: 'string',
                    example: 'teacher1@example.com'
                  },
                  nickname: {
                    type: 'string',
                    example: 'terra'
                  },
                  avatar: {
                    type: 'string',
                    example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/11.jpg'
                  },
                  teachStyle: {
                    type: 'string',
                    example: 'Ambulo tres volaticus delectus patruus suscipio varietas. Clibanus demoror varius deprimo adsum adinventitias. Atrox tripudio verecundia uredo benevolentia dedico claudeo casus.'
                  },
                  selfIntro: {
                    type: 'string',
                    example: 'Caste tamdiu volva congregatio. Consuasor tabula voluntarius commodo altus tergiversatio cohors suus statua solio. Apostolus sumo tamen tristis virga.'
                  },
                  mon: {
                    type: 'boolean',
                    example: true
                  },
                  tue: {
                    type: 'boolean',
                    example: false
                  },
                  wed: {
                    type: 'boolean',
                    example: true
                  },
                  thu: {
                    type: 'boolean',
                    example: false
                  },
                  fri: {
                    type: 'boolean',
                    example: true
                  },
                  sat: {
                    type: 'boolean',
                    example: false
                  },
                  sun: {
                    type: 'boolean',
                    example: true
                  },
                  createdAt: {
                    type: 'string',
                    example: '2024-05-18 07:00:00'
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2024-05-24 14:30:00'
                  },
                  teachingCategories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        categoryId: {
                          type: 'integer'
                        },
                        category: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string'
                            }
                          }
                        }
                      }
                    },
                    example: [
                      {
                        categoryId: 1,
                        category: {
                          name: '多益'
                        }
                      },
                      {
                        categoryId: 3,
                        category: {
                          name: '雅思'
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    BadRequest: {
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
                example: 'Please enter categoryId array.'
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
      description: 'Internal Server Error',
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
                example: 'User data missing'
              }
            }
          }
        }
      }
    }
  },
  patchTeacher: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 11
                  },
                  isTeacher: {
                    type: 'boolean',
                    example: true
                  },
                  name: {
                    type: 'string',
                    example: 'Shanks'
                  },
                  email: {
                    type: 'string',
                    example: 'teacher1@example.com'
                  },
                  createdAt: {
                    type: 'string',
                    example: '2024-05-18 07:00:00'
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2024-05-18 07:30:00'
                  }
                }
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    Conflict: {
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
                example: 'Duplicate application for teacher. Update failed!'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
      description: 'Internal Server Error',
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
                example: 'DataBase Error. Update failed!'
              }
            }
          }
        }
      }
    }
  },
  editStudent: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  name: {
                    type: 'string',
                    example: 'Monkey D. Luffy'
                  },
                  email: {
                    type: 'string',
                    example: 'user1@example.com'
                  },
                  nickname: {
                    type: 'string',
                    example: 'usque'
                  },
                  avatar: {
                    type: 'string',
                    example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/1.jpg'
                  },
                  selfIntro: {
                    type: 'string',
                    example: 'Coruscus victus civis degenero cicuta. Collum demum viriliter usque. Dolore utrum aut numquam cunae deporto campana valde quibusdam thalassinus.'
                  },
                  createdAt: {
                    type: 'string',
                    example: '2024-05-21 00:00:00'
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2024-05-21 00:00:00'
                  }
                }
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
      description: 'Internal Server Error',
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
                example: 'User data missing'
              }
            }
          }
        }
      }
    }
  },
  putStudent: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  name: {
                    type: 'string',
                    example: 'Monkey D. Luffy'
                  },
                  email: {
                    type: 'string',
                    example: 'user1@example.com'
                  },
                  nickname: {
                    type: 'string',
                    example: 'usque'
                  },
                  avatar: {
                    type: 'string',
                    example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/1.jpg'
                  },
                  selfIntro: {
                    type: 'string',
                    example: 'Coruscus victus civis degenero cicuta. Collum demum viriliter usque. Dolore utrum aut numquam cunae deporto campana valde quibusdam thalassinus.'
                  },
                  createdAt: {
                    type: 'string',
                    example: '2024-05-21 00:00:00'
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2024-05-21 00:00:00'
                  }
                }
              }
            }
          }
        }
      }
    },
    BadRequest: {
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
                example: 'Please enter name.'
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
      description: 'Internal Server Error',
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
                example: 'DataBase Error. Update failed!'
              }
            }
          }
        }
      }
    }
  },
  getStudent: {
    Success: {
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
              data: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  name: {
                    type: 'string',
                    example: 'Monkey D. Luffy'
                  },
                  email: {
                    type: 'string',
                    example: 'user1@example.com'
                  },
                  nickname: {
                    type: 'string',
                    example: 'usque'
                  },
                  avatar: {
                    type: 'string',
                    example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/1.jpg'
                  },
                  selfIntro: {
                    type: 'string',
                    example: 'Coruscus victus civis degenero cicuta. Collum demum viriliter usque. Dolore utrum aut numquam cunae deporto campana valde quibusdam thalassinus.'
                  },
                  registrations: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer'
                        },
                        studentId: {
                          type: 'integer'
                        },
                        courseId: {
                          type: 'integer'
                        },
                        rating: {
                          type: 'integer'
                        },
                        comment: {
                          type: 'string'
                        },
                        course: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'integer'
                            },
                            teacherId: {
                              type: 'integer'
                            },
                            category: {
                              type: 'array',
                              items: {
                                type: 'string'
                              }
                            },
                            name: {
                              type: 'string'
                            },
                            intro: {
                              type: 'string'
                            },
                            image: {
                              type: 'string'
                            },
                            link: {
                              type: 'string'
                            },
                            startAt: {
                              type: 'string'
                            },
                            duration: {
                              type: 'integer'
                            }
                          }
                        }
                      }
                    },
                    example: [
                      {
                        id: 1,
                        studentId: 1,
                        courseId: 1,
                        rating: 5,
                        comment: 'Templum auctus compono suscipit appello vorax. Capto clamo pel cresco termes brevis corroboro deinde. Eligendi comes assentator beatae depereo apto via thymum cubo demitto.',
                        course: {
                          id: 1,
                          teacherId: 11,
                          category: [
                            '生活會話',
                            '托福'
                          ],
                          name: 'abstergo',
                          intro: 'Delectatio verto vester theatrum vinco arbustum antepono. Cuppedia denique apparatus animadverto civis damnatio apparatus vulgivagus. Adipisci casus callide eveniet tenus.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://creepy-crop.net/',
                          startAt: '2024-05-03 18:00:00',
                          duration: 30
                        }
                      },
                      {
                        id: 2,
                        studentId: 1,
                        courseId: 2,
                        rating: 4,
                        comment: 'Vilis vobis annus. Adflicto viscus testimonium cognomen verus varietas. Aureus verecundia confido suggero degenero distinctio timidus accusator blandior.',
                        course: {
                          id: 2,
                          teacherId: 11,
                          category: [
                            '雅思',
                            '托福',
                            '生活會話'
                          ],
                          name: 'natus',
                          intro: 'Vir ratione ab sub sum adhuc depromo. Bellicus defendo bibo doloribus. Cilicium curtus statim doloremque amaritudo virga auditor libero.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://intrepid-fitness.info',
                          startAt: '2024-04-29 18:30:00',
                          duration: 60
                        }
                      },
                      {
                        id: 3,
                        studentId: 1,
                        courseId: 5,
                        rating: 5,
                        comment: 'Sublime tergiversatio inventore cogo tutis dolorum tepesco aestivus aperio enim. Veritatis tero velociter. Vociferor venustas carus compello adhuc subnecto surculus.',
                        course: {
                          id: 5,
                          teacherId: 12,
                          category: [
                            '生活會話'
                          ],
                          name: 'ago',
                          intro: 'Vivo agnosco repellat vulgus. Adamo tot aliquid summopere vulariter aurum clamo. Textor sono tabella tibi crinis vix artificiose textilis attonbitus deinde.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://tidy-stab.org/',
                          startAt: '2024-05-02 18:00:00',
                          duration: 60
                        }
                      },
                      {
                        id: 4,
                        studentId: 1,
                        courseId: 6,
                        rating: 5,
                        comment: 'Debeo tripudio careo admitto sonitus desparatus campana victoria corporis. Bellum conitor coma coniecto vestigium. Trans arbor texo armarium.',
                        course: {
                          id: 6,
                          teacherId: 12,
                          category: [
                            '生活會話'
                          ],
                          name: 'spes',
                          intro: 'Unus aestivus virga ars convoco calamitas. Caries degenero vobis theatrum defaeco. Atrocitas nobis ago aqua nobis.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://gruesome-bellows.org',
                          startAt: '2024-05-21 20:00:00',
                          duration: 60
                        }
                      },
                      {
                        id: 57,
                        studentId: 1,
                        courseId: 19,
                        rating: null,
                        comment: null,
                        course: {
                          id: 19,
                          teacherId: 15,
                          category: [
                            '多益'
                          ],
                          name: 'temeritas',
                          intro: 'Demulceo volo adeo tolero constans timidus ratione. Ipsa vobis color verbera certus thesaurus. Correptius depulso adnuo vulgivagus termes alo tener vilicus.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://majestic-crest.name',
                          startAt: '2024-06-02 19:30:00',
                          duration: 60
                        }
                      },
                      {
                        id: 72,
                        studentId: 1,
                        courseId: 48,
                        rating: null,
                        comment: null,
                        course: {
                          id: 48,
                          teacherId: 22,
                          category: [
                            '雅思',
                            '新聞英文',
                            '旅遊英文',
                            '生活會話'
                          ],
                          name: 'spero',
                          intro: 'Admoneo celer socius. Tum adficio magnam utor amiculum pecus conitor ter. Bellum trepide terminatio occaecati cultellus.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://poor-sprat.com',
                          startAt: '2024-06-05 19:30:00',
                          duration: 60
                        }
                      },
                      {
                        id: 74,
                        studentId: 1,
                        courseId: 52,
                        rating: null,
                        comment: null,
                        course: {
                          id: 52,
                          teacherId: 23,
                          category: [
                            '托福',
                            '生活會話',
                            '旅遊英文'
                          ],
                          name: 'acerbitas',
                          intro: 'Aliquam acquiro viscus corrumpo tres tenuis adhuc laborum toties clamo. Deleo turbo ciminatio. Valeo inventore optio cibus.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://loyal-doctorate.biz/',
                          startAt: '2024-05-24 18:00:00',
                          duration: 30
                        }
                      },
                      {
                        id: 80,
                        studentId: 1,
                        courseId: 64,
                        rating: null,
                        comment: null,
                        course: {
                          id: 64,
                          teacherId: 26,
                          category: [
                            '生活會話'
                          ],
                          name: 'demonstro',
                          intro: 'Coma considero repudiandae utilis illo excepturi. Curto beatae allatus rerum crastinus agnosco. Careo corporis auctor.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://happy-go-lucky-stab.net/',
                          startAt: '2024-05-26 20:00:00',
                          duration: 60
                        }
                      },
                      {
                        id: 88,
                        studentId: 1,
                        courseId: 80,
                        rating: null,
                        comment: null,
                        course: {
                          id: 80,
                          teacherId: 30,
                          category: [
                            '商用英文'
                          ],
                          name: 'communis',
                          intro: 'Pecto quae capillus tutamen tactus commemoro verumtamen celebrer. Distinctio sequi tabgo sapiente vorago. Utpote beatus perspiciatis eum absens defero bellicus atrocitas.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://innocent-molar.net',
                          startAt: '2024-06-04 18:00:00',
                          duration: 60
                        }
                      },
                      {
                        id: 89,
                        studentId: 1,
                        courseId: 83,
                        rating: null,
                        comment: null,
                        course: {
                          id: 83,
                          teacherId: 31,
                          category: [
                            '雅思'
                          ],
                          name: 'coepi',
                          intro: 'Delectus talio vis correptius crustulum abstergo confugo decens testimonium denuncio. Explicabo conicio sequi. Cogo tumultus alius aperte.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://false-pathway.biz/',
                          startAt: '2024-05-24 18:30:00',
                          duration: 60
                        }
                      },
                      {
                        id: 91,
                        studentId: 1,
                        courseId: 87,
                        rating: null,
                        comment: null,
                        course: {
                          id: 87,
                          teacherId: 32,
                          category: [
                            '生活會話'
                          ],
                          name: 'tenuis',
                          intro: 'Id argentum volutabrum blanditiis coadunatio contego capio tubineus textilis. Omnis accusator ipsum ago vetus volaticus advenio acceptus comes. Officiis patria audio reiciendis tyrannus pecco solus somniculosus.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://thankful-wreck.net/',
                          startAt: '2024-05-31 20:00:00',
                          duration: 60
                        }
                      },
                      {
                        id: 93,
                        studentId: 1,
                        courseId: 91,
                        rating: null,
                        comment: null,
                        course: {
                          id: 91,
                          teacherId: 33,
                          category: [
                            '多益',
                            '新聞英文',
                            '雅思'
                          ],
                          name: 'ventus',
                          intro: 'Abscido stillicidium arcus patria similique xiphias comburo. Caveo catena teres cado esse audacia cogito thermae facilis antepono. Sursum complectus strenuus amplexus.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://ideal-tolerance.info',
                          startAt: '2024-06-04 19:00:00',
                          duration: 30
                        }
                      },
                      {
                        id: 94,
                        studentId: 1,
                        courseId: 92,
                        rating: null,
                        comment: null,
                        course: {
                          id: 92,
                          teacherId: 33,
                          category: [
                            '新聞英文',
                            '雅思',
                            '商用英文',
                            '托福',
                            '生活會話',
                            '旅遊英文'
                          ],
                          name: 'ustulo',
                          intro: 'Modi audax currus. Uterque vito arma aranea culpo acsi amo turbo unus damnatio. Cohibeo incidunt annus averto caelestis chirographum minima pecco.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://sparse-disagreement.net',
                          startAt: '2024-06-01 18:00:00',
                          duration: 30
                        }
                      },
                      {
                        id: 95,
                        studentId: 1,
                        courseId: 95,
                        rating: null,
                        comment: null,
                        course: {
                          id: 95,
                          teacherId: 34,
                          category: [
                            '托福',
                            '旅遊英文',
                            '多益',
                            '雅思',
                            '新聞英文',
                            '生活會話',
                            '商用英文'
                          ],
                          name: 'acies',
                          intro: 'Decet tenetur corporis delego beatus. Aetas debeo tondeo conatus. Fugit vos umerus sopor taedium auctor umquam.',
                          image: 'https://fakeimg.pl/300/?text=course%20img',
                          link: 'https://sure-footed-labor.info/',
                          startAt: '2024-06-05 19:30:00',
                          duration: 30
                        }
                      }
                    ]
                  },
                  studyRank: {
                    type: 'integer',
                    example: '4'
                  },
                  studyHours: {
                    type: 'number',
                    example: '3.5'
                  }
                }
              }
            }
          }
        }
      }
    },
    Unauthorized: {
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
                example: 'Unauthorized'
              }
            }
          }
        }
      }
    },
    InternalServerError: {
      description: 'Internal Server Error',
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
                example: 'User data missing'
              }
            }
          }
        }
      }
    }
  }
}
