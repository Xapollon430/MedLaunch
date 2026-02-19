import type {
  CptCodeMetric,
  DashboardData,
  HierarchyNode,
  Metric,
  NodeData,
  OperationalYearMetrics,
} from '../types/dashboard'

const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0)

const average = (values: number[]) =>
  values.length === 0 ? 0 : values.reduce((acc, value) => acc + value, 0) / values.length

const scale = (values: number[], factor: number, digits = 0) =>
  values.map((value) => Number((value * factor).toFixed(digits)))

const ratioPercent = (numerator: number[], denominator: number[]) =>
  numerator.map((value, index) =>
    denominator[index] === 0
      ? 0
      : Number(((value / denominator[index]) * 100).toFixed(2))
  )

const ratioValue = (numerator: number[], denominator: number[], digits = 2) =>
  numerator.map((value, index) =>
    denominator[index] === 0 ? 0 : Number((value / denominator[index]).toFixed(digits))
  )

const metric = (label: string, values: number[], coding = '-'): Metric => ({
  label,
  values,
  total: Number(sum(values).toFixed(2)),
  coding,
})

const averageMetric = (label: string, values: number[], coding = '-'): Metric => ({
  label,
  values,
  total: Number(average(values).toFixed(2)),
  coding,
})

const cptMetric = (code: string, label: string, values: number[], coding = '-'): CptCodeMetric => ({
  code,
  label,
  values,
  total: Number(sum(values).toFixed(2)),
  coding,
})

const baseVisits = [82, 86, 90, 92, 96, 101, 104, 108, 111, 115, 118, 122]
const baseRVUs = [160, 168, 175, 180, 188, 194, 198, 204, 209, 214, 220, 225]
const baseCharges = [38000, 39000, 40200, 41500, 43000, 44200, 45500, 47000, 48200, 49500, 50800, 52000]
const basePayments = [20000, 20600, 21200, 21800, 22500, 23100, 23800, 24400, 25000, 25700, 26400, 27000]
const baseAdjustments = [7000, 7100, 7250, 7400, 7550, 7700, 7850, 8000, 8150, 8300, 8400, 8550]
const basePayroll = [8300, 8400, 8550, 8700, 8850, 9000, 9150, 9300, 9450, 9600, 9750, 9900]
const basePayerPayment = [13600, 14000, 14400, 14700, 15100, 15400, 15800, 16100, 16500, 16800, 17200, 17600]
const basePatientPayment = [6400, 6600, 6800, 7100, 7400, 7700, 8000, 8300, 8500, 8900, 9200, 9400]
const baseOperatingOverhead = [12000, 11800, 11500, 11200, 10800, 10400, 10000, 9600, 9200, 8800, 8500, 8200]

const createNodeData = (factor: number): NodeData => {
  const totalVisits = scale(baseVisits, factor)
  const rvus = scale(baseRVUs, factor)
  const charges = scale(baseCharges, factor)
  const payments = scale(basePayments, factor)
  const adjustments = scale(baseAdjustments, factor)
  const payroll = scale(basePayroll, factor)
  const payerPayment = scale(basePayerPayment, factor)
  const patientPayment = scale(basePatientPayment, factor)
  const operatingOverhead = scale(baseOperatingOverhead, factor)

  const newPatientValues = totalVisits.map((value) => Math.round(value * 0.28))
  const followUpValues = totalVisits.map((value) => Math.round(value * 0.57))
  const codingValues = totalVisits.map((value) => value - Math.round(value * 0.28) - Math.round(value * 0.57))

  const operatingProfitValues = payments.map((value, index) =>
    value - payroll[index] - Math.round(adjustments[index] * 0.18) - operatingOverhead[index]
  )

  const rvuPerPatientValues = ratioValue(rvus, totalVisits)
  const chargePerPatientValues = ratioValue(charges, totalVisits)
  const paymentPercentValues = ratioPercent(payments, charges)
  const adjustmentPercentValues = ratioPercent(adjustments, charges)
  const averageReceiptsValues = ratioValue(
    payerPayment.map((value, index) => value + patientPayment[index]),
    totalVisits
  )

  const cptCodes = [
    cptMetric('99204', 'New Patient', newPatientValues),
    cptMetric('99214', 'Follow Up Patient', followUpValues),
    cptMetric('G2211', 'CPT Coding', codingValues),
  ]

  return {
    cptCodes,
    cptCodingTotal: metric('CPT Coding Total', codingValues),
    total: metric('Grand Total', totalVisits),
    totalVisits: metric('Total Visits', totalVisits),
    patientCountTotal: metric('New Patient Total', newPatientValues),
    followUpPatientTotal: metric('Follow Up Total', followUpValues),
    charges: metric('Charges', charges),
    payments: metric('Payments', payments),
    rvus: metric('RVUs', rvus),
    payroll: metric('Payroll', payroll),
    adjustments: metric('Adjustments', adjustments),
    operatingProfit: metric('Operating Profit', operatingProfitValues),
    rvuPerPatient: averageMetric('RVU Per Patient', rvuPerPatientValues),
    chargePerPatient: averageMetric('Charge Per Patient', chargePerPatientValues),
    paymentPercentOfCharges: averageMetric('Payment % Of Charges', paymentPercentValues),
    averageReceiptsPerPatient: averageMetric('Average Receipts Per Patient', averageReceiptsValues),
    adjustmentPercentOfCharges: averageMetric('Adjustment % Of Charges', adjustmentPercentValues),
    payerPayment: metric('Payer Payment', payerPayment),
    patientPayment: metric('Patient Payment', patientPayment),
  }
}

const createHierarchy = (yearFactor: number): HierarchyNode[] => {
  const providerNode = (id: string, label: string, factor: number): HierarchyNode => ({
    id,
    label,
    type: 'provider',
    data: createNodeData(yearFactor * factor),
  })

  return [
    {
      id: 'loc-nyc',
      label: 'New York Sleep Center',
      type: 'location',
      data: createNodeData(yearFactor * 1.35),
      children: [
        providerNode('prov-jane-doe', 'Jane Doe, MD', 0.58),
        providerNode('prov-alan-smith', 'Alan Smith, DO', 0.55),
      ],
    },
    {
      id: 'loc-bos',
      label: 'Boston Pulmonary Group',
      type: 'location',
      data: createNodeData(yearFactor * 1.22),
      children: [
        providerNode('prov-maria-lee', 'Maria Lee, MD', 0.52),
        providerNode('prov-eric-jones', 'Eric Jones, PA-C', 0.47),
      ],
    },
    {
      id: 'loc-chi',
      label: 'Chicago Respiratory Associates',
      type: 'location',
      data: createNodeData(yearFactor * 1.14),
      children: [
        providerNode('prov-nina-patel', 'Nina Patel, MD', 0.45),
        providerNode('prov-paul-brown', 'Paul Brown, NP', 0.43),
      ],
    },
    {
      id: 'loc-aus',
      label: 'Austin Sleep and Pulmonary',
      type: 'location',
      data: createNodeData(yearFactor * 1.08),
      children: [
        providerNode('prov-olivia-nguyen', 'Olivia Nguyen, MD', 0.41),
        providerNode('prov-david-rivera', 'David Rivera, PA-C', 0.39),
      ],
    },
  ]
}

const createOperationalYear = (factor: number): OperationalYearMetrics => {
  const patientsSeen = scale(baseVisits, factor)
  const newPatients = patientsSeen.map((value) => Math.round(value * 0.24))
  const charges = scale(baseCharges, factor)
  const rvus = scale(baseRVUs, factor)
  const totalReceipts = scale(basePayments, factor)
  const payerPayment = scale(basePayerPayment, factor)
  const patientPayment = scale(basePatientPayment, factor)
  const sleepStudy = patientsSeen.map((value) => Math.round(value * 0.19))

  return {
    patientsSeen,
    newPatients,
    charges,
    rvus,
    totalReceipts,
    payerPayment,
    patientPayment,
    sleepStudy,
  }
}

export const mockDashboardData: DashboardData = {
  providerPerformance: {
    '2023': createHierarchy(0.93),
    '2024': createHierarchy(1),
  },
  providerRankings: {
    '2023': {
      PatientCount: {
        'Doe, Jane': 1710,
        'Smith, Alan': 1630,
        'Lee, Maria': 1542,
        'Jones, Eric': 1328,
        'Patel, Nina': 1261,
        'Brown, Paul': 1217,
        'Nguyen, Olivia': 1160,
        'Rivera, David': 1098,
      },
      RVUs: {
        'Doe, Jane': 2184,
        'Smith, Alan': 2066,
        'Lee, Maria': 1987,
        'Jones, Eric': 1732,
        'Patel, Nina': 1658,
        'Brown, Paul': 1599,
        'Nguyen, Olivia': 1531,
        'Rivera, David': 1464,
      },
      G2211: {
        'Doe, Jane': 604,
        'Smith, Alan': 552,
        'Lee, Maria': 497,
        'Jones, Eric': 441,
        'Patel, Nina': 414,
        'Brown, Paul': 389,
        'Nguyen, Olivia': 366,
        'Rivera, David': 342,
      },
      SleepStudy: {
        'Doe, Jane': 402,
        'Smith, Alan': 378,
        'Lee, Maria': 351,
        'Jones, Eric': 309,
        'Patel, Nina': 291,
        'Brown, Paul': 276,
        'Nguyen, Olivia': 259,
        'Rivera, David': 243,
      },
    },
    '2024': {
      PatientCount: {
        'Doe, Jane': 1834,
        'Smith, Alan': 1716,
        'Lee, Maria': 1620,
        'Jones, Eric': 1478,
        'Patel, Nina': 1412,
        'Brown, Paul': 1365,
        'Nguyen, Olivia': 1298,
        'Rivera, David': 1214,
      },
      RVUs: {
        'Doe, Jane': 2308,
        'Smith, Alan': 2193,
        'Lee, Maria': 2086,
        'Jones, Eric': 1899,
        'Patel, Nina': 1823,
        'Brown, Paul': 1762,
        'Nguyen, Olivia': 1687,
        'Rivera, David': 1595,
      },
      G2211: {
        'Doe, Jane': 649,
        'Smith, Alan': 588,
        'Lee, Maria': 531,
        'Jones, Eric': 474,
        'Patel, Nina': 446,
        'Brown, Paul': 418,
        'Nguyen, Olivia': 394,
        'Rivera, David': 366,
      },
      SleepStudy: {
        'Doe, Jane': 431,
        'Smith, Alan': 402,
        'Lee, Maria': 378,
        'Jones, Eric': 339,
        'Patel, Nina': 319,
        'Brown, Paul': 304,
        'Nguyen, Olivia': 284,
        'Rivera, David': 267,
      },
    },
  },
  financial: {
    'Overall - Sum': {
      '0-30 Days': 248000,
      '31-60 Days': 177500,
      '61-90 Days': 104200,
      '91-120 Days': 68800,
      '121 - 150 Days': 45100,
      '151 - 180 Days': 32900,
      '> 180 Days': 27400,
      'Total Balance': 703900,
      'Total Balance %': '100%',
    },
    'Patient Balance': {
      '0-30 Days': 80100,
      '31-60 Days': 59400,
      '61-90 Days': 35200,
      '91-120 Days': 21400,
      '121 - 150 Days': 14800,
      '151 - 180 Days': 10200,
      '> 180 Days': 7600,
      'Total Balance': 228700,
      'Total Balance %': '32.49%',
    },
    'Payer Balance': {
      '0-30 Days': 154900,
      '31-60 Days': 106100,
      '61-90 Days': 62800,
      '91-120 Days': 41200,
      '121 - 150 Days': 26500,
      '151 - 180 Days': 19200,
      '> 180 Days': 15400,
      'Total Balance': 426100,
      'Total Balance %': '60.54%',
    },
    'Self Pay Balance': {
      '0-30 Days': 13000,
      '31-60 Days': 12000,
      '61-90 Days': 6200,
      '91-120 Days': 4200,
      '121 - 150 Days': 3800,
      '151 - 180 Days': 2600,
      '> 180 Days': 1900,
      'Total Balance': 43700,
      'Total Balance %': '6.21%',
    },
    '% Subtotal': {
      '0-30 Days': '35.23%',
      '31-60 Days': '25.22%',
      '61-90 Days': '14.80%',
      '91-120 Days': '9.77%',
      '121 - 150 Days': '6.41%',
      '151 - 180 Days': '4.67%',
      '> 180 Days': '3.89%',
      'Total Balance': '-',
      'Total Balance %': '100%',
    },
  },
  operational: {
    '2023': createOperationalYear(0.92),
    '2024': createOperationalYear(1),
  },
  clinical: {
    title: 'Clinical Dashboard',
    subtitle: 'Coming soon...',
  },
  dataSources: {
    cards: [
      {
        id: 'local-demo',
        title: 'Local Mock Dataset',
        description: 'This demo is frontend-only and uses static in-memory dashboard data.',
      },
    ],
  },
}
