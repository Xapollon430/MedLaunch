export const getSortedRanking = (rankings: Record<string, number>) => {
  const entries = Object.entries(rankings).sort(([, valueA], [, valueB]) => valueB - valueA)

  return {
    categories: entries.map(([name]) => name),
    values: entries.map(([, value]) => value),
  }
}
