const exampleUsers = [
  {
    id: 1,
    name: 'Monkey D. Luffy',
    isTeacher: 0
  },
  {
    id: 2,
    name: 'Roronoa Zoro',
    isTeacher: 0
  },
  {
    id: 3,
    name: 'Nami',
    isTeacher: 0
  },
  {
    id: 4,
    name: 'Usopp',
    isTeacher: 0
  },
  {
    id: 5,
    name: 'Vinsmoke Sanji',
    isTeacher: 0
  },
  {
    id: 6,
    name: 'Chopper',
    isTeacher: 0
  },
  {
    id: 7,
    name: 'Nico Robin',
    isTeacher: 0
  },
  {
    id: 8,
    name: 'Franky',
    isTeacher: 0
  },
  {
    id: 9,
    name: 'Brook',
    isTeacher: 0
  },
  {
    id: 10,
    name: 'Jimbei',
    isTeacher: 0
  },
  {
    id: 11,
    name: 'Shanks',
    isTeacher: 1
  },
  {
    id: 12,
    name: 'Dracule Mihawk',
    isTeacher: 1
  },
  {
    id: 13,
    name: 'Boa Hancock',
    isTeacher: 1
  },
  {
    id: 14,
    name: 'Buggy',
    isTeacher: 1
  },
  {
    id: 15,
    name: 'Edward Newgate',
    isTeacher: 1
  },
  {
    id: 16,
    name: 'Portgas D. Ace',
    isTeacher: 1
  },
  {
    id: 17,
    name: 'Law',
    isTeacher: 1
  },
  {
    id: 18,
    name: 'Doflamingo',
    isTeacher: 1
  },
  {
    id: 19,
    name: 'Eustass Kid',
    isTeacher: 1
  },
  {
    id: 20,
    name: 'Kaido',
    isTeacher: 1
  },
  {
    id: 21,
    name: 'Big Mom',
    isTeacher: 1
  },
  {
    id: 22,
    name: 'Blackbeard',
    isTeacher: 1
  },
  {
    id: 23,
    name: 'Katakuri',
    isTeacher: 1
  },
  {
    id: 24,
    name: 'Marco',
    isTeacher: 1
  },
  {
    id: 25,
    name: 'Jinbe',
    isTeacher: 1
  },
  {
    id: 26,
    name: 'Rob Lucci',
    isTeacher: 1
  },
  {
    id: 27,
    name: 'Sabo',
    isTeacher: 1
  },
  {
    id: 28,
    name: 'Crocodile',
    isTeacher: 1
  },
  {
    id: 29,
    name: 'Nico Robin',
    isTeacher: 1
  },
  {
    id: 30,
    name: 'Enel',
    isTeacher: 1
  },
  {
    id: 31,
    name: 'Kuzan',
    isTeacher: 1
  },
  {
    id: 32,
    name: 'Fujitora',
    isTeacher: 1
  },
  {
    id: 33,
    name: 'Borsalino',
    isTeacher: 1
  },
  {
    id: 34,
    name: 'Akainu',
    isTeacher: 1
  }
]

export default {
  getAllUser: {
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
        isTeacher: {
          type: 'integer'
        }
      }
    },
    example: exampleUsers
  }
}
