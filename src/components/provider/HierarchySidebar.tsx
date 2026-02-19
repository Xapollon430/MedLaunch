import { useMemo, useState } from 'react'
import { SIDEBAR_FILTERS, type SidebarFilter } from '../../data/constants'
import type { HierarchyNode as HierarchyNodeType } from '../../types/dashboard'
import { filterHierarchy } from '../../utils/hierarchy'
import HierarchyNode from './HierarchyNode'
import NodeTypeIcon from './NodeTypeIcon'

type HierarchySidebarProps = {
  nodes: HierarchyNodeType[]
  selectedId: string | null
  onSelect: (node: HierarchyNodeType) => void
}

const HierarchySidebar = ({ nodes, selectedId, onSelect }: HierarchySidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [mode, setMode] = useState<SidebarFilter>('Location')

  const filteredNodes = useMemo(
    () => filterHierarchy(nodes, searchTerm, mode),
    [mode, nodes, searchTerm]
  )

  return (
    <aside className="w-72 shrink-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap gap-2">
        {SIDEBAR_FILTERS.map((filterMode) => (
          <button
            key={filterMode}
            type="button"
            onClick={() => setMode(filterMode)}
            className={`rounded border px-2 py-1 text-xs ${
              mode === filterMode
                ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                : 'border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {filterMode}
          </button>
        ))}
      </div>

      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search"
        className="mb-3 w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
      />

      <ul className="space-y-1">
        {mode === 'Provider'
          ? filteredNodes.map((node) => (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => onSelect(node)}
                  className={`w-full rounded px-2 py-2 text-left text-sm ${
                    selectedId === node.id
                      ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <NodeTypeIcon nodeType={node.type} />
                    <span>{node.label}</span>
                  </span>
                </button>
              </li>
            ))
          : filteredNodes.map((node) => (
              <HierarchyNode
                key={node.id}
                node={node}
                depth={0}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
      </ul>
    </aside>
  )
}

export default HierarchySidebar
