import type { HierarchyNode } from '../../types/dashboard'

type NodeTypeIconProps = {
  nodeType: HierarchyNode['type']
}

const iconClassName = 'h-4 w-4 shrink-0 text-slate-500 dark:text-slate-300'

const NodeTypeIcon = ({ nodeType }: NodeTypeIconProps) => {
  if (nodeType === 'location') {
    return (
      <svg
        data-testid="location-icon"
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className={iconClassName}
      >
        <path d="M10 17c3.2-3.2 5-5.8 5-8a5 5 0 1 0-10 0c0 2.2 1.8 4.8 5 8Z" />
        <circle cx="10" cy="9" r="1.7" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg
      data-testid="provider-icon"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={iconClassName}
    >
      <circle cx="10" cy="6" r="3" />
      <path d="M4 16a6 6 0 0 1 12 0" />
    </svg>
  )
}

export default NodeTypeIcon
