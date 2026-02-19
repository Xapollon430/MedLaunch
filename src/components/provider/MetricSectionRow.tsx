import type { Metric } from '../../types/dashboard'

type DetailRow = {
  label: string
  metric: Metric
  formatValue: (value: number) => string
}

type DynamicClassName = string | ((value: number) => string)

type MetricSectionRowProps = {
  label: string
  metric: Metric
  formatValue: (value: number) => string
  expandable?: boolean
  expanded?: boolean
  onToggle?: () => void
  detailRows?: DetailRow[]
  rowClassName?: string
  valueClassName?: DynamicClassName
  totalClassName?: DynamicClassName
}

const resolveClassName = (className: DynamicClassName | undefined, value: number) =>
  typeof className === 'function' ? className(value) : (className ?? '')

const MetricSectionRow = ({
  label,
  metric,
  formatValue,
  expandable = false,
  expanded = false,
  onToggle,
  detailRows = [],
  rowClassName,
  valueClassName,
  totalClassName,
}: MetricSectionRowProps) => {
  return (
    <>
      <tr className={rowClassName}>
        <td className="border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 dark:border-slate-700 dark:text-slate-100">
          {expandable ? (
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center gap-1 text-left"
              aria-label={label}
            >
              <span>{expanded ? '▾' : '▸'}</span>
              <span>{label}</span>
            </button>
          ) : (
            label
          )}
        </td>
        {metric.values.map((value, index) => (
          <td
            key={`${label}-${index}`}
            className={`border border-slate-200 px-2 py-2 text-right text-sm dark:border-slate-700 ${resolveClassName(valueClassName, value)}`}
          >
            {formatValue(value)}
          </td>
        ))}
        <td
          className={`border border-slate-200 bg-slate-200 px-2 py-2 text-right text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-100 ${resolveClassName(totalClassName, metric.total)}`}
        >
          {formatValue(metric.total)}
        </td>
      </tr>

      {expandable && expanded
        ? detailRows.map((row) => (
            <tr key={`${label}-${row.label}`} className="bg-slate-100 dark:bg-slate-800/70">
              <td className="border border-slate-200 px-3 py-2 pl-8 text-sm text-slate-800 dark:border-slate-700 dark:text-slate-200">{row.label}</td>
              {row.metric.values.map((value, index) => (
                <td
                  key={`${row.label}-${index}`}
                  className="border border-slate-200 px-2 py-2 text-right text-sm text-slate-800 dark:border-slate-700 dark:text-slate-200"
                >
                  {row.formatValue(value)}
                </td>
              ))}
              <td className="border border-slate-200 bg-slate-200 px-2 py-2 text-right text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-100">
                {row.formatValue(row.metric.total)}
              </td>
            </tr>
          ))
        : null}
    </>
  )
}

export default MetricSectionRow
