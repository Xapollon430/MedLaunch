import { useMemo, useState } from 'react'
import YearSelector from '../components/common/YearSelector'
import RankingsBarChart from '../components/charts/RankingsBarChart'
import { mockDashboardData } from '../data/mockDashboardData'
import { getSortedRanking } from '../utils/rankings'

const toDisplayName = (name: string) => {
  const [last, first] = name.split(', ')
  return first && last ? `${first} ${last}` : name
}

const ProviderRankingsPage = () => {
  const rankingsByYear = mockDashboardData.providerRankings
  const availableYears = Object.keys(rankingsByYear).sort()
  const [activeYear, setActiveYear] = useState(availableYears[availableYears.length - 1] ?? '')

  const yearData = rankingsByYear[activeYear]

  const patientCount = useMemo(
    () => getSortedRanking(yearData?.PatientCount ?? {}),
    [yearData?.PatientCount]
  )
  const rvus = useMemo(() => getSortedRanking(yearData?.RVUs ?? {}), [yearData?.RVUs])
  const g2211 = useMemo(() => getSortedRanking(yearData?.G2211 ?? {}), [yearData?.G2211])
  const sleepStudy = useMemo(
    () => getSortedRanking(yearData?.SleepStudy ?? {}),
    [yearData?.SleepStudy]
  )

  return (
    <section data-testid="rankings-content" className="mx-auto w-full max-w-[1080px] space-y-4">
      <YearSelector availableYears={availableYears} activeYear={activeYear} onYearChange={setActiveYear} />

      <RankingsBarChart
        title={`Total Patients Seen Year to Date ${activeYear}`}
        categories={patientCount.categories.map(toDisplayName)}
        values={patientCount.values}
        color="#2563eb"
      />

      <RankingsBarChart
        title={`RVUs Year to Date ${activeYear}`}
        categories={rvus.categories.map(toDisplayName)}
        values={rvus.values}
        color="#ea580c"
      />

      <RankingsBarChart
        title={`G2211 Codes Year to Date ${activeYear}`}
        categories={g2211.categories.map(toDisplayName)}
        values={g2211.values}
        color="#059669"
      />

      <RankingsBarChart
        title={`Sleep Studies Year to Date ${activeYear}`}
        categories={sleepStudy.categories.map(toDisplayName)}
        values={sleepStudy.values}
        color="#7c3aed"
      />
    </section>
  )
}

export default ProviderRankingsPage
