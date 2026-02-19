import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

type RankingsBarChartProps = {
  title: string
  categories: string[]
  values: number[]
  color: string
}

const formatTooltipValue = (value: number | string | undefined) => {
  if (typeof value === 'number') {
    return value.toLocaleString()
  }

  return value ?? ''
}

const RankingsBarChart = ({ title, categories, values, color }: RankingsBarChartProps) => {
  const chartData = categories.map((name, index) => ({ name, value: values[index] ?? 0 }))

  if (chartData.length === 0) {
    return null
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="w-full overflow-x-auto">
        <div className="mx-auto w-[900px]">
          <BarChart
            width={900}
            height={320}
            data={chartData}
            margin={{ top: 10, right: 16, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis
              dataKey="name"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={64}
              tick={{ fontSize: 11, fill: 'var(--chart-axis)' }}
            />
            <YAxis tick={{ fontSize: 11, fill: 'var(--chart-axis)' }} />
            <Tooltip
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'var(--chart-tooltip-bg)',
                borderColor: 'var(--chart-tooltip-border)',
              }}
              labelStyle={{ color: 'var(--chart-tooltip-text)' }}
              itemStyle={{ color: 'var(--chart-tooltip-text)' }}
            />
            <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
          </BarChart>
        </div>
      </div>
    </section>
  )
}

export default RankingsBarChart
