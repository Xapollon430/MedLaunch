import type { SidebarFilter } from '../data/constants'
import type { HierarchyNode } from '../types/dashboard'

export const flattenHierarchy = (nodes: HierarchyNode[]): HierarchyNode[] =>
  nodes.flatMap((node) => [node, ...(node.children ? flattenHierarchy(node.children) : [])])

export const filterHierarchy = (
  nodes: HierarchyNode[],
  term: string,
  mode: SidebarFilter
): HierarchyNode[] => {
  const normalizedTerm = term.trim().toLowerCase()

  if (mode === 'Provider') {
    return flattenHierarchy(nodes).filter(
      (node) => node.type === 'provider' && node.label.toLowerCase().includes(normalizedTerm)
    )
  }

  if (mode === 'Location') {
    if (!normalizedTerm) {
      return nodes
    }

    return nodes.filter((node) => node.label.toLowerCase().includes(normalizedTerm))
  }

  return nodes
}
