import { formatCurrency, formatNumber } from './format'

test('formats numbers with separators', () => {
  expect(formatNumber(1234567)).toBe('1,234,567')
})

test('formats currency with usd symbol', () => {
  expect(formatCurrency(5000)).toBe('$5,000')
})
