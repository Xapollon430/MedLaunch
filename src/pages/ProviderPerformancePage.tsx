import { useMemo, useState } from 'react'
import HierarchySidebar from '../components/provider/HierarchySidebar'
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

      <div className="min-h-[420px] flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Provider Performance</h2>
        <p className="mt-1 text-sm text-slate-600">
          Selected: <span className="font-medium">{selectedNode?.label ?? 'None'}</span>
        </p>
      </div>
    </section>
  )
}

export default ProviderPerformancePage
