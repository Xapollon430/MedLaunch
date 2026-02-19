import { Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { MONTHS } from '../../data/constants'
import type { OperationalYearMetrics } from '../../types/dashboard'

type OperationalMetricKey = keyof OperationalYearMetrics

type OperationalLineChartProps = {
  title: string
  data: Record<string, OperationalYearMetrics>
  metric: OperationalMetricKey
}

const colors = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2']

const formatValue = (metric: OperationalMetricKey, value: number) => {
  if (
    metric === 'charges' ||
    metric === 'totalReceipts' ||
    metric === 'payerPayment' ||
    metric === 'patientPayment'
  ) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  return value.toLocaleString()
}

const formatTooltipValue = (metric: OperationalMetricKey, value: unknown) => {
  if (typeof value === 'number') {
    return formatValue(metric, value)
  }

  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  return ''
}

const OperationalLineChart = ({ title, data, metric }: OperationalLineChartProps) => {
  const years = Object.keys(data).sort()

  const chartData = MONTHS.map((month, monthIndex) => {
    const row: Record<string, number | string> = { month }

    years.forEach((year) => {
      row[year] = data[year][metric][monthIndex] ?? 0
    })

    return row
  })

  if (years.length === 0) {
    return null
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
      <div className="w-full overflow-x-auto">
        <div className="mx-auto w-[920px]">
          <LineChart
            width={920}
            height={320}
            data={chartData}
            margin={{ top: 12, right: 18, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => formatValue(metric, value as number)} />
            <Tooltip formatter={(value) => formatTooltipValue(metric, value)} />
            {years.map((year, index) => (
              <Line
                key={year}
                type="monotone"
                dataKey={year}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </div>
      </div>
    </section>
  )
}

export default OperationalLineChart
