import { getSortedRanking } from './rankings'

test('sorts rankings descending', () => {
  const out = getSortedRanking({ A: 3, B: 5, C: 1 })
  expect(out.categories).toEqual(['B', 'A', 'C'])
  expect(out.values).toEqual([5, 3, 1])
})
