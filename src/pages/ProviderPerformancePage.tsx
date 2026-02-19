import { useEffect, useMemo, useState } from 'react'
import ViewModeToggle from '../components/common/ViewModeToggle'
import YearSelector from '../components/common/YearSelector'
import HierarchySidebar from '../components/provider/HierarchySidebar'
import ProviderPerformanceAnnualTable from '../components/provider/ProviderPerformanceAnnualTable'
import ProviderPerformanceTable from '../components/provider/ProviderPerformanceTable'
import { mockDashboardData } from '../data/mockDashboardData'
import type { HierarchyNode } from '../types/dashboard'

const ProviderPerformancePage = () => {
  const allYearsData = mockDashboardData.providerPerformance
  const availableYears = useMemo(() => Object.keys(allYearsData).sort(), [allYearsData])
  const defaultYear = availableYears[availableYears.length - 1] ?? ''

  const [activeYear, setActiveYear] = useState(defaultYear)
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly')

  const providerNodes = useMemo(() => allYearsData[activeYear] ?? [], [activeYear, allYearsData])

  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(providerNodes[0] ?? null)

  useEffect(() => {
    if (providerNodes.length === 0) {
      setSelectedNode(null)
      return
    }

    setSelectedNode((previous) => {
      if (!previous) {
        return providerNodes[0]
      }

      const matchingNode = providerNodes.find((node) => node.id === previous.id)
      return matchingNode ?? providerNodes[0]
    })
  }, [providerNodes])

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <YearSelector
          availableYears={availableYears}
          activeYear={activeYear}
          onYearChange={setActiveYear}
          disabled={viewMode === 'annual'}
        />
        <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      <div className="flex gap-4">
        <HierarchySidebar
          nodes={providerNodes}
          selectedId={selectedNode?.id ?? null}
          onSelect={setSelectedNode}
        />

        <div className="min-h-[420px] flex-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          {selectedNode
            ? viewMode === 'monthly'
              ? <ProviderPerformanceTable node={selectedNode} />
              : <ProviderPerformanceAnnualTable nodeId={selectedNode.id} allYearsData={allYearsData} />
            : null}
        </div>
      </div>
    </section>
  )
}

export default ProviderPerformancePage
