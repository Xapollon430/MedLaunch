export type Metric = {
  label: string
  values: number[]
  total: number
  coding: string
}

export type CptCodeMetric = {
  code: string
  label: string
  values: number[]
  total: number
  coding: string
}

export type NodeData = {
  cptCodes: CptCodeMetric[]
  cptCodingTotal: Metric
  total: Metric
  totalVisits: Metric
  patientCountTotal: Metric
  followUpPatientTotal: Metric
  charges: Metric
  payments: Metric
  rvus: Metric
  payroll: Metric
  adjustments: Metric
  operatingProfit: Metric
  rvuPerPatient: Metric
  chargePerPatient: Metric
  paymentPercentOfCharges: Metric
  averageReceiptsPerPatient: Metric
  adjustmentPercentOfCharges: Metric
  payerPayment?: Metric
  patientPayment?: Metric
}

export type HierarchyNode = {
  id: string
  label: string
  type: 'location' | 'provider'
  data: NodeData
  children?: HierarchyNode[]
}

export type ProviderRankingsYear = {
  PatientCount: Record<string, number>
  RVUs: Record<string, number>
  G2211: Record<string, number>
  SleepStudy: Record<string, number>
}

export type FinancialCell = string | number

export type OperationalYearMetrics = {
  patientsSeen: number[]
  newPatients: number[]
  charges: number[]
  rvus: number[]
  totalReceipts: number[]
  payerPayment: number[]
  patientPayment: number[]
  sleepStudy: number[]
}

export type ClinicalData = {
  title: string
  subtitle: string
}

export type DataSourcesCard = {
  id: string
  title: string
  description: string
}

export type DashboardData = {
  providerPerformance: Record<string, HierarchyNode[]>
  providerRankings: Record<string, ProviderRankingsYear>
  financial: Record<string, Record<string, FinancialCell>>
  operational: Record<string, OperationalYearMetrics>
  clinical: ClinicalData
  dataSources: {
    cards: DataSourcesCard[]
  }
}
