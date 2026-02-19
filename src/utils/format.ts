export const formatNumber = (value: number) =>
  value.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })

export const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
