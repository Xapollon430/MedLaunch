import { MONTHS } from '../../data/constants'
import type { CptCodeMetric, HierarchyNode, Metric } from '../../types/dashboard'
import { formatCurrency, formatNumber } from '../../utils/format'

type ProviderPerformanceAnnualTableProps = {
  nodeId: string
  allYearsData: Record<string, HierarchyNode[]>
}

type MetricLike = {
  values: number[]
  total: number
}

type DynamicClassName = string | ((value: number) => string)

type AnnualMetricConfig = {
  label: string
  formatter: (value: number) => string
  getMetric: (node: HierarchyNode) => MetricLike | null
  metricLabelClassName: string
  yearClassName: string
  valueClassName: DynamicClassName
  totalClassName: DynamicClassName
}

const resolveClassName = (className: DynamicClassName, value: number) =>
  typeof className === 'function' ? className(value) : className

const getProfitValueClassName = (value: number) =>
  value < 0
    ? 'bg-rose-200 text-rose-900 font-semibold'
    : 'bg-emerald-200 text-emerald-900 font-semibold'

const getProfitTotalClassName = (value: number) =>
  value < 0 ? 'bg-rose-300 text-rose-950 font-bold' : 'bg-emerald-300 text-emerald-950 font-bold'

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

  const cptCodeRows = yearRows[0].node.data.cptCodes.map((cptCodeMetric) => ({
    label: `${cptCodeMetric.code} - ${cptCodeMetric.label}`,
    formatter: formatNumber,
    getMetric: (node: HierarchyNode) =>
      node.data.cptCodes.find((entry) => entry.code === cptCodeMetric.code) ?? null,
    metricLabelClassName: 'bg-amber-100',
    yearClassName: 'bg-amber-200 text-amber-900',
    valueClassName: 'bg-amber-100 text-slate-900',
    totalClassName: 'bg-amber-200 text-amber-950',
  }))

  const metricConfig: AnnualMetricConfig[] = [
    {
      label: 'Total Visits',
      formatter: formatNumber,
      getMetric: (node) => node.data.totalVisits,
      metricLabelClassName: 'bg-blue-100',
      yearClassName: 'bg-blue-200 text-blue-900',
      valueClassName: 'bg-blue-50 text-slate-900',
      totalClassName: 'bg-blue-200 text-blue-950',
    },
    {
      label: 'CPT Coding Total',
      formatter: formatNumber,
      getMetric: (node) => node.data.cptCodingTotal,
      metricLabelClassName: 'bg-amber-100',
      yearClassName: 'bg-amber-200 text-amber-900',
      valueClassName: 'bg-amber-50 text-slate-900',
      totalClassName: 'bg-amber-200 text-amber-950',
    },
    ...cptCodeRows,
    {
      label: 'RVUs',
      formatter: formatNumber,
      getMetric: (node) => node.data.rvus,
      metricLabelClassName: 'bg-emerald-100',
      yearClassName: 'bg-emerald-200 text-emerald-900',
      valueClassName: 'bg-emerald-50 text-slate-900',
      totalClassName: 'bg-emerald-200 text-emerald-950',
    },
    {
      label: 'Charges',
      formatter: formatCurrency,
      getMetric: (node) => node.data.charges,
      metricLabelClassName: 'bg-violet-100',
      yearClassName: 'bg-violet-200 text-violet-900',
      valueClassName: 'bg-violet-50 text-slate-900',
      totalClassName: 'bg-violet-200 text-violet-950',
    },
    {
      label: 'Payments',
      formatter: formatCurrency,
      getMetric: (node) => node.data.payments,
      metricLabelClassName: 'bg-sky-100',
      yearClassName: 'bg-sky-200 text-sky-900',
      valueClassName: 'bg-sky-50 text-slate-900',
      totalClassName: 'bg-sky-200 text-sky-950',
    },
    {
      label: 'Adjustments',
      formatter: formatCurrency,
      getMetric: (node) => node.data.adjustments,
      metricLabelClassName: 'bg-rose-100',
      yearClassName: 'bg-rose-200 text-rose-900',
      valueClassName: 'bg-rose-50 text-slate-900',
      totalClassName: 'bg-rose-200 text-rose-950',
    },
    {
      label: 'Operating Profit',
      formatter: formatCurrency,
      getMetric: (node) => node.data.operatingProfit,
      metricLabelClassName: 'bg-lime-100',
      yearClassName: 'bg-lime-200 text-lime-900',
      valueClassName: getProfitValueClassName,
      totalClassName: getProfitTotalClassName,
    },
  ]

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
          {metricConfig.flatMap(
            ({
              label,
              formatter,
              getMetric,
              metricLabelClassName,
              yearClassName,
              valueClassName,
              totalClassName,
            }) => {
            const metricRows = yearRows
              .map(({ year, node }) => {
                const metric = getMetric(node)
                return metric ? { year, metric } : null
              })
              .filter((entry): entry is { year: string; metric: Metric | CptCodeMetric } => entry !== null)

            return metricRows.map(({ year, metric }, index) => (
              <tr key={`${label}-${year}`}>
                {index === 0 ? (
                  <td
                    rowSpan={metricRows.length}
                    className={`border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 ${metricLabelClassName}`}
                  >
                    {label}
                  </td>
                ) : null}
                <td className={`border border-slate-200 px-3 py-2 text-sm font-semibold ${yearClassName}`}>
                  {year}
                </td>
                {metric.values.map((value, valueIndex) => (
                  <td
                    key={`${label}-${year}-${valueIndex}`}
                    className={`border border-slate-200 px-2 py-2 text-right text-sm font-medium ${resolveClassName(valueClassName, value)}`}
                  >
                    {formatter(value)}
                  </td>
                ))}
                <td
                  className={`border border-slate-200 px-2 py-2 text-right text-sm font-bold ${resolveClassName(totalClassName, metric.total)}`}
                >
                  {formatter(metric.total)}
                </td>
              </tr>
            ))
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProviderPerformanceAnnualTable
