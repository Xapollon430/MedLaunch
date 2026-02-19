import { filterHierarchy, flattenHierarchy } from './hierarchy'

const nodes = [
  {
    id: 'loc-1',
    label: 'Main Location',
    type: 'location',
    data: {},
    children: [
      {
        id: 'prov-1',
        label: 'Jane Doe',
        type: 'provider',
        data: {},
      },
    ],
  },
] as const

test('flattens nested hierarchy', () => {
  expect(flattenHierarchy(nodes as never).map((n) => n.id)).toEqual(['loc-1', 'prov-1'])
})

test('filters provider mode by label', () => {
  const result = filterHierarchy(nodes as never, 'jane', 'Provider')
  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('Jane Doe')
})

test('returns full location list when location search is empty', () => {
  const result = filterHierarchy(nodes as never, '', 'Location')
  expect(result).toHaveLength(1)
  expect(result[0].id).toBe('loc-1')
})
