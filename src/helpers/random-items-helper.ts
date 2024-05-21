export function getRandomArraryElements (originalArray: Array<string | number>): Array<string | number> {
  const count = Math.ceil(Math.random() * originalArray.length)
  const randomElementsArrary: Array<string | number> = []

  while (randomElementsArrary.length < count) {
    const randomIndex = Math.floor(Math.random() * originalArray.length)
    const randomElement = originalArray[randomIndex]

    if (!randomElementsArrary.includes(randomElement)) {
      randomElementsArrary.push(randomElement)
    }
  }
  return randomElementsArrary
}
