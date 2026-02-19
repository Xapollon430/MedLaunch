import { useState } from 'react'
import type { HierarchyNode as HierarchyNodeType } from '../../types/dashboard'
import NodeTypeIcon from './NodeTypeIcon'

type HierarchyNodeProps = {
  node: HierarchyNodeType
  depth: number
  selectedId: string | null
  onSelect: (node: HierarchyNodeType) => void
}

const HierarchyNode = ({ node, depth, selectedId, onSelect }: HierarchyNodeProps) => {
  const hasChildren = Boolean(node.children?.length)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev)
    }
    onSelect(node)
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className={`flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm ${
          selectedId === node.id
            ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
        }`}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        <span className="flex items-center gap-2">
          <NodeTypeIcon nodeType={node.type} />
          <span>{node.label}</span>
        </span>
        {hasChildren ? <span className="text-xs text-slate-500 dark:text-slate-400">{isOpen ? '▾' : '▸'}</span> : null}
      </button>
      {hasChildren && isOpen ? (
        <ul className="space-y-1">
          {node.children?.map((childNode) => (
            <HierarchyNode
              key={childNode.id}
              node={childNode}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default HierarchyNode
