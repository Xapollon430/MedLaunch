import { useState } from 'react'
import { MONTHS } from '../../data/constants'
import type { HierarchyNode } from '../../types/dashboard'
import { formatCurrency, formatNumber } from '../../utils/format'
import MetricSectionRow from './MetricSectionRow'

type ProviderPerformanceTableProps = {
  node: HierarchyNode
}

const formatPercent = (value: number) => `${value.toFixed(2)}%`
const getProfitValueClassName = (value: number) =>
  value < 0
    ? 'bg-rose-200 text-rose-900 font-semibold dark:bg-rose-900/60 dark:text-rose-200'
    : 'bg-emerald-200 text-emerald-900 font-semibold dark:bg-emerald-900/60 dark:text-emerald-200'

const getProfitTotalClassName = (value: number) =>
  value < 0
    ? 'bg-rose-300 text-rose-950 font-bold dark:bg-rose-800 dark:text-rose-100'
    : 'bg-emerald-300 text-emerald-950 font-bold dark:bg-emerald-800 dark:text-emerald-100'

const ProviderPerformanceTable = ({ node }: ProviderPerformanceTableProps) => {
  const [chargesExpanded, setChargesExpanded] = useState(true)
  const [rvusExpanded, setRvusExpanded] = useState(true)
  const [paymentsExpanded, setPaymentsExpanded] = useState(true)
  const [adjustmentsExpanded, setAdjustmentsExpanded] = useState(true)
  const [cptExpanded, setCptExpanded] = useState(true)

  const data = node.data

  return (
    <div className="overflow-x-auto">
      <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{node.label}</h3>
      <table className="min-w-full border-collapse bg-white dark:bg-slate-900">
        <thead>
          <tr>
            <th className="border border-slate-200 bg-slate-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Metric
            </th>
            {MONTHS.map((month) => (
              <th
                key={month}
                className="border border-slate-200 bg-slate-100 px-2 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {month}
              </th>
            ))}
            <th className="border border-slate-200 bg-slate-100 px-2 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <MetricSectionRow
            label={data.totalVisits.label}
            metric={data.totalVisits}
            formatValue={formatNumber}
            rowClassName="bg-blue-100 dark:bg-blue-950/60"
          />

          <MetricSectionRow
            label={data.cptCodingTotal.label}
            metric={data.cptCodingTotal}
            formatValue={formatNumber}
            expandable
            expanded={cptExpanded}
            onToggle={() => setCptExpanded((prev) => !prev)}
            detailRows={data.cptCodes.map((cptCodeMetric) => ({
              label: `${cptCodeMetric.code} - ${cptCodeMetric.label}`,
              metric: cptCodeMetric,
              formatValue: formatNumber,
            }))}
            rowClassName="bg-amber-100 dark:bg-amber-950/60"
          />

          <MetricSectionRow
            label={data.rvus.label}
            metric={data.rvus}
            formatValue={formatNumber}
            expandable
            expanded={rvusExpanded}
            onToggle={() => setRvusExpanded((prev) => !prev)}
            detailRows={[
              {
                label: data.rvuPerPatient.label,
                metric: data.rvuPerPatient,
                formatValue: (value) => value.toFixed(2),
              },
            ]}
            rowClassName="bg-emerald-100 dark:bg-emerald-950/60"
          />

          <MetricSectionRow
            label={data.charges.label}
            metric={data.charges}
            formatValue={formatCurrency}
            expandable
            expanded={chargesExpanded}
            onToggle={() => setChargesExpanded((prev) => !prev)}
            detailRows={[
              {
                label: data.chargePerPatient.label,
                metric: data.chargePerPatient,
                formatValue: formatCurrency,
              },
            ]}
            rowClassName="bg-violet-100 dark:bg-violet-950/60"
          />

          <MetricSectionRow
            label={data.payments.label}
            metric={data.payments}
            formatValue={formatCurrency}
            expandable
            expanded={paymentsExpanded}
            onToggle={() => setPaymentsExpanded((prev) => !prev)}
            detailRows={[
              {
                label: data.paymentPercentOfCharges.label,
                metric: data.paymentPercentOfCharges,
                formatValue: formatPercent,
              },
              {
                label: data.averageReceiptsPerPatient.label,
                metric: data.averageReceiptsPerPatient,
                formatValue: formatCurrency,
              },
            ]}
            rowClassName="bg-sky-100 dark:bg-sky-950/60"
          />

          <MetricSectionRow
            label={data.adjustments.label}
            metric={data.adjustments}
            formatValue={formatCurrency}
            expandable
            expanded={adjustmentsExpanded}
            onToggle={() => setAdjustmentsExpanded((prev) => !prev)}
            detailRows={[
              {
                label: data.adjustmentPercentOfCharges.label,
                metric: data.adjustmentPercentOfCharges,
                formatValue: formatPercent,
              },
            ]}
            rowClassName="bg-rose-100 dark:bg-rose-950/60"
          />

          {data.payerPayment ? (
            <MetricSectionRow
              label={data.payerPayment.label}
              metric={data.payerPayment}
              formatValue={formatCurrency}
              rowClassName="bg-teal-100 dark:bg-teal-950/60"
            />
          ) : null}

          {data.patientPayment ? (
            <MetricSectionRow
              label={data.patientPayment.label}
              metric={data.patientPayment}
              formatValue={formatCurrency}
              rowClassName="bg-cyan-100 dark:bg-cyan-950/60"
            />
          ) : null}

          <MetricSectionRow
            label={data.payroll.label}
            metric={data.payroll}
            formatValue={formatCurrency}
            rowClassName="bg-orange-100 dark:bg-orange-950/60"
          />

          <MetricSectionRow
            label={data.operatingProfit.label}
            metric={data.operatingProfit}
            formatValue={formatCurrency}
            rowClassName="bg-slate-100 dark:bg-slate-800"
            valueClassName={getProfitValueClassName}
            totalClassName={getProfitTotalClassName}
          />
        </tbody>
      </table>
    </div>
  )
}

export default ProviderPerformanceTable
