import { useMemo, useState } from 'react'
import HierarchySidebar from '../components/provider/HierarchySidebar'
import ProviderPerformanceTable from '../components/provider/ProviderPerformanceTable'
import { mockDashboardData } from '../data/mockDashboardData'
import type { HierarchyNode } from '../types/dashboard'

const ProviderPerformancePage = () => {
  const providerNodes = useMemo(() => mockDashboardData.providerPerformance['2024'], [])
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(providerNodes[0] ?? null)

  return (
    <section className="flex gap-4">
      <HierarchySidebar
        nodes={providerNodes}
        selectedId={selectedNode?.id ?? null}
        onSelect={setSelectedNode}
      />

      <div className="min-h-[420px] flex-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        {selectedNode ? <ProviderPerformanceTable node={selectedNode} /> : null}
      </div>
    </section>
  )
}

export default ProviderPerformancePage
