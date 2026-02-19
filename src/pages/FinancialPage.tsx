import {
  FINANCIAL_AGING_BUCKETS,
  FINANCIAL_BALANCE_TYPES,
} from '../data/constants'
import { mockDashboardData } from '../data/mockDashboardData'

const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

const formatCell = (bucket: string, value: string | number) => {
  if (typeof value === 'string') {
    return value
  }

  if (bucket === 'Total Balance %') {
    return `${(value * 100).toFixed(2)}%`
  }

  return formatCurrency(value)
}

const FinancialPage = () => {
  const financialData = mockDashboardData.financial

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">Financial Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white dark:bg-slate-900">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-slate-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Balance Type
              </th>
              {FINANCIAL_AGING_BUCKETS.map((bucket) => (
                <th
                  key={bucket}
                  className="border border-slate-200 bg-slate-100 px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {bucket}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FINANCIAL_BALANCE_TYPES.map((balanceType) => (
              <tr key={balanceType}>
                <td className="border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100">
                  {balanceType}
                </td>
                {FINANCIAL_AGING_BUCKETS.map((bucket) => (
                  <td
                    key={`${balanceType}-${bucket}`}
                    className="border border-slate-200 px-3 py-2 text-right text-sm dark:border-slate-700 dark:text-slate-200"
                  >
                    {formatCell(bucket, financialData[balanceType][bucket])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default FinancialPage
