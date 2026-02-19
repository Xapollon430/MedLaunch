import { MONTHS } from '../../data/constants'
import type { HierarchyNode, Metric } from '../../types/dashboard'
import { formatCurrency, formatNumber } from '../../utils/format'

type ProviderPerformanceAnnualTableProps = {
  nodeId: string
  allYearsData: Record<string, HierarchyNode[]>
}

type AnnualMetricConfig = {
  key: 'totalVisits' | 'rvus' | 'charges' | 'payments' | 'adjustments' | 'operatingProfit'
  label: string
  formatter: (value: number) => string
}

const metricConfig: AnnualMetricConfig[] = [
  { key: 'totalVisits', label: 'Total Visits', formatter: formatNumber },
  { key: 'rvus', label: 'RVUs', formatter: formatNumber },
  { key: 'charges', label: 'Charges', formatter: formatCurrency },
  { key: 'payments', label: 'Payments', formatter: formatCurrency },
  { key: 'adjustments', label: 'Adjustments', formatter: formatCurrency },
  { key: 'operatingProfit', label: 'Operating Profit', formatter: formatCurrency },
]

const findNodeById = (nodes: HierarchyNode[], nodeId: string): HierarchyNode | null => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node
    }

    if (node.children?.length) {
      const childMatch = findNodeById(node.children, nodeId)
      if (childMatch) {
        return childMatch
      }
    }
  }

  return null
}

const ProviderPerformanceAnnualTable = ({ nodeId, allYearsData }: ProviderPerformanceAnnualTableProps) => {
  const yearRows = Object.keys(allYearsData)
    .sort()
    .map((year) => {
      const node = findNodeById(allYearsData[year], nodeId)
      return node ? { year, node } : null
    })
    .filter((entry): entry is { year: string; node: HierarchyNode } => entry !== null)

  if (yearRows.length === 0) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <h3 className="mb-3 text-xl font-semibold text-slate-900">{yearRows[0].node.label}</h3>
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className="border border-slate-200 bg-slate-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              Metric
            </th>
            <th className="border border-slate-200 bg-slate-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              Year
            </th>
            {MONTHS.map((month) => (
              <th
                key={month}
                className="border border-slate-200 bg-slate-100 px-2 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {month}
              </th>
            ))}
            <th className="border border-slate-200 bg-slate-100 px-2 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {metricConfig.flatMap(({ key, label, formatter }) =>
            yearRows.map(({ year, node }, index) => {
              const metric = node.data[key] as Metric

              return (
                <tr key={`${label}-${year}`}>
                  {index === 0 ? (
                    <td
                      rowSpan={yearRows.length}
                      className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800"
                    >
                      {label}
                    </td>
                  ) : null}
                  <td className="border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                    {year}
                  </td>
                  {metric.values.map((value, valueIndex) => (
                    <td
                      key={`${label}-${year}-${valueIndex}`}
                      className="border border-slate-200 px-2 py-2 text-right text-sm"
                    >
                      {formatter(value)}
                    </td>
                  ))}
                  <td className="border border-slate-200 bg-slate-50 px-2 py-2 text-right text-sm font-semibold">
                    {formatter(metric.total)}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProviderPerformanceAnnualTable
