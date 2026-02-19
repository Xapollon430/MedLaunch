import OperationalLineChart from '../components/charts/OperationalLineChart'
import { mockDashboardData } from '../data/mockDashboardData'

const OperationalPage = () => {
  const operationalData = mockDashboardData.operational

  return (
    <section data-testid="operational-content" className="mx-auto w-full max-w-[1100px] space-y-4">
      <OperationalLineChart title="Patients Seen 2023 vs 2024" data={operationalData} metric="patientsSeen" />
      <OperationalLineChart title="New Patient Count 2023 vs 2024" data={operationalData} metric="newPatients" />
      <OperationalLineChart title="Charges 2023 vs 2024" data={operationalData} metric="charges" />
      <OperationalLineChart title="RVUs 2023 vs 2024" data={operationalData} metric="rvus" />
      <OperationalLineChart title="Total Receipts 2023 vs 2024" data={operationalData} metric="totalReceipts" />
      <OperationalLineChart title="Payer Payment 2023 vs 2024" data={operationalData} metric="payerPayment" />
      <OperationalLineChart title="Patient Payment 2023 vs 2024" data={operationalData} metric="patientPayment" />
      <OperationalLineChart title="Sleep Study 2023 vs 2024" data={operationalData} metric="sleepStudy" />
    </section>
  )
}

export default OperationalPage
