export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

export const TABLE_HEADERS = ['Code', ...MONTHS, 'Totals', 'Coding %'] as const

export const ANNUAL_HEADERS = ['', '', ...MONTHS, 'Totals'] as const

export const FINANCIAL_AGING_BUCKETS = [
  '0-30 Days',
  '31-60 Days',
  '61-90 Days',
  '91-120 Days',
  '121 - 150 Days',
  '151 - 180 Days',
  '> 180 Days',
  'Total Balance',
  'Total Balance %',
] as const

export const FINANCIAL_BALANCE_TYPES = [
  'Overall - Sum',
  'Patient Balance',
  'Payer Balance',
  'Self Pay Balance',
  '% Subtotal',
] as const

export const SIDEBAR_FILTERS = ['Location', 'Provider', 'Hierarchial PDF'] as const

export type SidebarFilter = (typeof SIDEBAR_FILTERS)[number]
