export default {
  getRegistrations: {
    type: 'object',
    properties: {
      registeredCourses: {
        type: 'integer',
        items: {
          type: 'object',
          properties: {
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
                name: {
                  type: 'string'
                },
                category: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                intro: {
                  type: 'string'
                },
                link: {
                  type: 'string'
                },
                image: {
                  type: 'string'
                },
                duration: {
                  type: 'integer'
                },
                startAt: {
                  type: 'string'
                },
                teacher: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer'
                    },
                    name: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        example: [
          {
            studentId: 1,
            courseId: 1,
            rating: 4,
            comment: 'Tabesco clibanus demum undique. Sollers corroboro tenus utroque fugit. Maiores succedo itaque.',
            course: {
              name: 'adicio',
              category: [
                '多益',
                '雅思'
              ],
              intro: 'Aut cinis at coniuratio. Certus vitiosus depraedor rerum acer facilis defleo vero. Brevis trucido perferendis curia basium quia.',
              link: 'https://scarce-puggle.net',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 30,
              startAt: '2024-04-26 19:30:00',
              teacher: {
                id: 11,
                name: 'Shanks'
              }
            }
          },
          {
            studentId: 1,
            courseId: 2,
            rating: 4,
            comment: 'Decipio suffoco sustineo tumultus. Eligendi color adaugeo supellex alveus. Delectus cui amplexus theatrum custodia.',
            course: {
              name: 'minima',
              category: [
                '雅思',
                '多益'
              ],
              intro: 'Cattus tabula cernuus quae crinis. Collum valde ubi adsum sub tollo eos. Collum repudiandae denuncio.',
              link: 'https://questionable-relation.org',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 60,
              startAt: '2024-05-01 18:00:00',
              teacher: {
                id: 11,
                name: 'Shanks'
              }
            }
          },
          {
            studentId: 1,
            courseId: 5,
            rating: 1,
            comment: 'Crastinus cetera denique deludo magnam vetus. Necessitatibus quidem ago. Solium amo cubicularis uredo magnam sonitus cinis necessitatibus conculco ver.',
            course: {
              name: 'tamen',
              category: [
                '多益'
              ],
              intro: 'Cometes ait demo turba angelus balbus cogito deorsum. Est cotidie deserunt currus maxime necessitatibus acies ambulo. Ipsum cognatus tergeo spectaculum.',
              link: 'https://notable-week.biz/',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 30,
              startAt: '2024-05-20 18:30:00',
              teacher: {
                id: 12,
                name: 'Dracule Mihawk'
              }
            }
          },
          {
            studentId: 1,
            courseId: 6,
            rating: 5,
            comment: 'very good',
            course: {
              name: 'delectus',
              category: [
                '多益',
                '雅思'
              ],
              intro: 'Via acies aer certe pax. Talis tertius condico sto depulso circumvenio vilitas desipio textor. Cuius avarus aperte cicuta admoveo rerum subiungo.',
              link: 'https://super-clank.net',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 60,
              startAt: '2024-05-08 18:30:00',
              teacher: {
                id: 12,
                name: 'Dracule Mihawk'
              }
            }
          },
          {
            studentId: 1,
            courseId: 11,
            rating: null,
            comment: null,
            course: {
              name: 'cultellus',
              category: [
                '商用英文',
                '旅遊英文',
                '多益',
                '雅思'
              ],
              intro: 'Synagoga tergeo utilis alienus stella peior veniam temptatio tamdiu. Usque viriliter error amitto solum. Voveo labore convoco neque vix.',
              link: 'https://impossible-ale.org/',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 30,
              startAt: '2024-06-07 20:00:00',
              teacher: {
                id: 13,
                name: 'Boa Hancock'
              }
            }
          },
          {
            studentId: 1,
            courseId: 48,
            rating: null,
            comment: null,
            course: {
              name: 'autem',
              category: [
                '旅遊英文'
              ],
              intro: 'Sublime quo tertius capitulus uxor ter illo tabesco cumque. Triumphus similique umerus amor cupiditas excepturi accusamus vix accusator. Cado argumentum acerbitas dolorum colo tondeo suffoco voluptatem.',
              link: 'https://distorted-knife.info',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 30,
              startAt: '2024-05-31 18:30:00',
              teacher: {
                id: 22,
                name: 'Blackbeard'
              }
            }
          },
          {
            studentId: 1,
            courseId: 51,
            rating: null,
            comment: null,
            course: {
              name: 'apto',
              category: [
                '生活會話',
                '新聞英文',
                '旅遊英文',
                '多益'
              ],
              intro: 'Volup impedit venia summisse aptus veniam aequitas vinum cotidie. Tyrannus vero coaegresco reprehenderit arguo. Argentum vesco crapula deprimo amicitia.',
              link: 'https://glamorous-bestseller.biz/',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 30,
              startAt: '2024-05-29 19:30:00',
              teacher: {
                id: 23,
                name: 'Katakuri'
              }
            }
          },
          {
            studentId: 1,
            courseId: 84,
            rating: null,
            comment: null,
            course: {
              name: 'comes',
              category: [
                '生活會話',
                '多益'
              ],
              intro: 'Tabula alioqui coepi chirographum minus temeritas. Urbs uter natus sequi vomer. Derelinquo bos acsi asper cohibeo vulgivagus.',
              link: 'https://kind-wear.biz',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 60,
              startAt: '2024-05-25 19:30:00',
              teacher: {
                id: 31,
                name: 'Kuzan'
              }
            }
          },
          {
            studentId: 1,
            courseId: 88,
            rating: null,
            comment: null,
            course: {
              name: 'cruentus',
              category: [
                '旅遊英文'
              ],
              intro: 'Coniuratio desidero adicio comburo xiphias subnecto. Cresco adeptio adeptio angelus recusandae a incidunt ex. Texo torqueo acer clarus valetudo beneficium.',
              link: 'https://offbeat-habitat.info',
              image: 'https://fakeimg.pl/300/?text=course%20img',
              duration: 60,
              startAt: '2024-05-27 19:00:00',
              teacher: {
                id: 32,
                name: 'Fujitora'
              }
            }
          }
        ]
      }
    }
  },
  getRegistrationsByCourse: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        studentId: {
          type: 'integer',
          example: 1
        },
        courseId: {
          type: 'integer',
          example: 6
        },
        rating: {
          type: 'integer',
          example: 5
        },
        comment: {
          type: 'string',
          example: 'very good'
        },
        student: {
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
              example: 'luffy'
            },
            avatar: {
              type: 'string',
              example: 'https://capstone-tutor.s3.ap-northeast-1.amazonaws.com/1.jpg'
            }
          }
        },
        course: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'delectus'
            },
            category: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: [
                '多益',
                '雅思'
              ]
            },
            link: {
              type: 'string',
              example: 'https://super-clank.net'
            },
            teacherId: {
              type: 'integer',
              example: 12
            },
            startAt: {
              type: 'string',
              example: '2024-05-08 18:30:00'
            },
            duration: {
              type: 'integer',
              example: 60
            }
          }
        }
      }
    }
  },
  postRegistration: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 97
      },
      studentId: {
        type: 'integer',
        example: 1
      },
      courseId: {
        type: 'integer',
        example: 92
      },
      updatedAt: {
        type: 'string',
        example: '2024-05-27 18:00:00'
      },
      createdAt: {
        type: 'string',
        example: '2024-05-27 18:00:00'
      },
      course: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'creta'
          },
          category: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: [
              '生活會話'
            ]
          },
          intro: {
            type: 'string',
            example: 'Tametsi delectatio deficio defaeco. Causa denuo crux deorsum utpote contabesco caries adversus cupressus. Excepturi sumptus asperiores umerus ait tardus vereor.'
          },
          link: {
            type: 'string',
            example: 'https://powerless-glen.name'
          },
          image: {
            type: 'string',
            example: 'https://fakeimg.pl/300/?text=course%20img'
          },
          duration: {
            type: 'integer',
            example: 60
          },
          startAt: {
            type: 'string',
            example: '2024-05-08 18:30:00'
          },
          teacher: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 33
              },
              name: {
                type: 'string',
                example: 'Borsalino'
              }
            }
          }
        }
      }
    }
  },
  putRegistration: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 4
      },
      studentId: {
        type: 'integer',
        example: 1
      },
      courseId: {
        type: 'integer',
        example: 6
      },
      rating: {
        type: 'integer',
        example: 5
      },
      comment: {
        type: 'string',
        example: 'very good'
      },
      createdAt: {
        type: 'string',
        example: '2024-05-04 23:30:00'
      },
      updatedAt: {
        type: 'string',
        example: '2024-05-08 22:00:00'
      },
      course: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'delectus'
          },
          category: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: [
              '多益',
              '雅思'
            ]
          },
          intro: {
            type: 'string',
            example: 'Via acies aer certe pax. Talis tertius condico sto depulso circumvenio vilitas desipio textor. Cuius avarus aperte cicuta admoveo rerum subiungo.'
          },
          link: {
            type: 'string',
            example: 'https://super-clank.net'
          },
          image: {
            type: 'string',
            example: 'https://fakeimg.pl/300/?text=course%20img'
          },
          duration: {
            type: 'integer',
            example: 60
          },
          startAt: {
            type: 'string',
            example: '2024-05-08 18:30:00'
          },
          teacher: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 12
              },
              name: {
                type: 'string',
                example: 'Dracule Mihawk'
              }
            }
          }
        }
      }
    }
  },
  deleteRegistration: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 97
      },
      studentId: {
        type: 'integer',
        example: 1
      },
      courseId: {
        type: 'integer',
        example: 92
      },
      rating: {
        type: 'null',
        example: null
      },
      comment: {
        type: 'null',
        example: null
      },
      createdAt: {
        type: 'string',
        example: '2024-05-27 18:00:00'
      },
      updatedAt: {
        type: 'string',
        example: '2024-05-27 18:00:00'
      }
    }
  }
}
