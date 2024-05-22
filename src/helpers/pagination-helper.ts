export function getOffset (limit = 6, page = 1): number { return (page - 1) * limit }

export function getPagination (limit = 6, page = 1, total = 6): Record<string, number | number[]> {
  const totalPages = Math.ceil(total / limit)
  const pages = Array.from(Array(totalPages), (_, i) => i + 1)
  const currentPage = +page > 1 ? +page < totalPages ? +page : totalPages : 1
  const prev = currentPage === 1 ? 1 : currentPage - 1
  const next = currentPage === totalPages ? totalPages : currentPage + 1
  return { totalPages, currentPage, prev, next, pages }
}
