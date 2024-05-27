export default {
  getCoursesByTeacher: {
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
        link: {
          type: 'string'
        },
        duration: {
          type: 'integer'
        },
        image: {
          type: 'string'
        },
        startAt: {
          type: 'string'
        }
      }
    },
    example: [
      {
        id: 5,
        teacherId: 12,
        category: [
          '多益'
        ],
        name: 'tamen',
        intro: 'Cometes ait demo turba angelus balbus cogito deorsum. Est cotidie deserunt currus maxime necessitatibus acies ambulo. Ipsum cognatus tergeo spectaculum.',
        link: 'https://notable-week.biz/',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-05-20 18:30:00'
      },
      {
        id: 6,
        teacherId: 12,
        category: [
          '多益',
          '雅思'
        ],
        name: 'delectus',
        intro: 'Via acies aer certe pax. Talis tertius condico sto depulso circumvenio vilitas desipio textor. Cuius avarus aperte cicuta admoveo rerum subiungo.',
        link: 'https://super-clank.net',
        duration: 60,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-05-08 18:30:00'
      },
      {
        id: 7,
        teacherId: 12,
        category: [
          '多益'
        ],
        name: 'cenaculum',
        intro: 'Toties viridis vomer sumptus complectus totidem tutamen cogito cibus. Asperiores arx aeternus. Aro stultus subseco suadeo thymum comes terebro vere.',
        link: 'https://jumbo-widow.name',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-05-28 18:00:00'
      },
      {
        id: 8,
        teacherId: 12,
        category: [
          '雅思'
        ],
        name: 'amoveo',
        intro: 'Degenero tendo cupiditas copia aer conturbo callide terra. Crur qui vulnero ipsa condico volup sint culpa comedo. Carbo accommodo argentum.',
        link: 'https://repentant-geology.net',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-05-27 19:00:00'
      },
      {
        id: 99,
        teacherId: 12,
        category: [
          '雅思',
          '多益'
        ],
        name: 'admiratio',
        intro: 'Supellex anser caterva comptus assumenda chirographum succurro volaticus. Aer sursum clibanus talio tristis solitudo thema antepono comis solutio. Aequus supra absque tres odit victus somniculosus tabesco stella.',
        link: 'https://perfumed-invader.name/',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-05-29 20:00:00'
      },
      {
        id: 100,
        teacherId: 12,
        category: [
          '雅思'
        ],
        name: 'deprecator',
        intro: 'Cuppedia statua totidem ascit crapula. Allatus comitatus adficio taceo. Uter cibus velut ventito consequuntur deleniti vespillo torqueo.',
        link: 'https://bewitched-cherry.biz/',
        duration: 60,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-05-29 18:00:00'
      },
      {
        id: 147,
        teacherId: 12,
        category: [
          '雅思'
        ],
        name: 'vehemens',
        intro: 'Aduro theca abscido alter pax summa consequatur sufficio totam. Coniuratio spargo confugo utrum aeternus. Aequus cupiditate super crustulum bonus cresco amplus.',
        link: 'https://few-stamen.biz/',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-06-04 19:30:00'
      },
      {
        id: 148,
        teacherId: 12,
        category: [
          '多益'
        ],
        name: 'confugo',
        intro: 'Thesis vae coniuratio textor alienus aliquam. Apud sodalitas civis. Denego delectatio corporis conqueror vorago.',
        link: 'https://stained-jewel.biz/',
        duration: 60,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-06-05 19:00:00'
      },
      {
        id: 195,
        teacherId: 12,
        category: [
          '雅思'
        ],
        name: 'aureus',
        intro: 'Vesper cultellus cado auctus delicate tremo curatio ullam. Texo despecto est confugo voluptates deorsum tergum defendo. Admoveo spero ultra careo facere atrocitas.',
        link: 'https://violet-birdbath.biz',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-06-04 19:30:00'
      },
      {
        id: 196,
        teacherId: 12,
        category: [
          '雅思',
          '多益'
        ],
        name: 'apud',
        intro: 'Congregatio tribuo cariosus. Substantia eum desipio unde alo currus venio neque. Tam confugo dolore cupiditate repellat angelus.',
        link: 'https://vapid-fondue.org',
        duration: 30,
        image: 'https://fakeimg.pl/300/?text=course%20img',
        startAt: '2024-06-05 20:00:00'
      }
    ]
  },
  postCourse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 196
      },
      teacherId: {
        type: 'integer',
        example: 12
      },
      category: {
        type: 'array',
        items: {
          type: 'string'
        },
        example: ['雅思', '多益']
      },
      name: {
        type: 'string',
        example: 'apud'
      },
      intro: {
        type: 'string',
        example: 'Congregatio tribuo cariosus. Substantia eum desipio unde alo currus venio neque. Tam confugo dolore cupiditate repellat angelus.'
      },
      link: {
        type: 'string',
        example: 'https://vapid-fondue.org'
      },
      duration: {
        type: 'integer',
        example: 30
      },
      image: {
        type: 'string',
        example: 'https://fakeimg.pl/300/?text=course%20img'
      },
      startAt: {
        type: 'string',
        example: '2024-06-05 20:00:00'
      }
    }
  },
  getCourse: {
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
            example: 6
          },
          teacherId: {
            type: 'integer',
            example: 12
          },
          category: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['雅思', '多益']
          },
          name: {
            type: 'string',
            example: 'delectus'
          },
          intro: {
            type: 'string',
            example: 'Via acies aer certe pax. Talis tertius condico sto depulso circumvenio vilitas desipio textor. Cuius avarus aperte cicuta admoveo rerum subiungo.'
          },
          link: {
            type: 'string',
            example: 'https://super-clank.net'
          },
          duration: {
            type: 'integer',
            example: 60
          },
          image: {
            type: 'string',
            example: 'https://fakeimg.pl/300/?text=course%20img'
          },
          startAt: {
            type: 'string',
            example: '2024-05-08 18:30:00'
          },
          registrations: {
            type: 'array',
            items: {
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
                  example: 3
                },
                comment: {
                  type: 'string',
                  example: 'Aggero despecto candidus bene thymbra balbus. Vergo catena auxilium clementia utrimque maiores somnus annus vereor. Tutamen aestus valens tonsor condico.'
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
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  putCourse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 196
      },
      teacherId: {
        type: 'integer',
        example: 12
      },
      category: {
        type: 'array',
        items: {
          type: 'string'
        },
        example: ['雅思', '多益']
      },
      name: {
        type: 'string',
        example: 'apud'
      },
      intro: {
        type: 'string',
        example: 'Congregatio tribuo cariosus. Substantia eum desipio unde alo currus venio neque. Tam confugo dolore cupiditate repellat angelus.'
      },
      link: {
        type: 'string',
        example: 'https://vapid-fondue.org'
      },
      duration: {
        type: 'integer',
        example: 30
      },
      image: {
        type: 'string',
        example: 'https://fakeimg.pl/300/?text=course%20img'
      },
      startAt: {
        type: 'string',
        example: '2024-06-05 20:00:00'
      }
    }
  },
  deleteCourse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 196
      },
      teacherId: {
        type: 'integer',
        example: 12
      },
      category: {
        type: 'array',
        items: {
          type: 'string'
        },
        example: ['雅思', '多益']
      },
      name: {
        type: 'string',
        example: 'apud'
      },
      intro: {
        type: 'string',
        example: 'Congregatio tribuo cariosus. Substantia eum desipio unde alo currus venio neque. Tam confugo dolore cupiditate repellat angelus.'
      },
      link: {
        type: 'string',
        example: 'https://vapid-fondue.org'
      },
      duration: {
        type: 'integer',
        example: 30
      },
      image: {
        type: 'string',
        example: 'https://fakeimg.pl/300/?text=course%20img'
      },
      startAt: {
        type: 'string',
        example: '2024-06-05 20:00:00'
      }
    }
  }
}
