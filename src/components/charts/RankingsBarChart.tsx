import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

type RankingsBarChartProps = {
  title: string
  categories: string[]
  values: number[]
  color: string
}

const RankingsBarChart = ({ title, categories, values, color }: RankingsBarChartProps) => {
  const chartData = categories.map((name, index) => ({ name, value: values[index] ?? 0 }))

  if (chartData.length === 0) {
    return null
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
      <div className="w-full overflow-x-auto">
        <BarChart width={900} height={320} data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            angle={-25}
            textAnchor="end"
            interval={0}
            height={64}
            tick={{ fontSize: 11 }}
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </BarChart>
      </div>
    </section>
  )
}

export default RankingsBarChart
