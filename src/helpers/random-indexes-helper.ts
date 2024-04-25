export function getRandomIndexes (maxIndex: number, count: number): number[] {
  const indexes: number[] = []
  while (indexes.length < count) {
    const index = Math.floor(Math.random() * maxIndex)
    if (!indexes.includes(index)) {
      indexes.push(index)
    }
  }
  return indexes
}
