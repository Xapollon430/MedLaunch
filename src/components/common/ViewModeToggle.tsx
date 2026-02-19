type ViewMode = 'monthly' | 'annual'

type ViewModeToggleProps = {
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

const ViewModeToggle = ({ viewMode, onChange }: ViewModeToggleProps) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={`rounded border px-3 py-1.5 text-sm ${
          viewMode === 'monthly'
            ? 'border-slate-900 bg-slate-900 text-white'
            : 'border-slate-300 bg-white text-slate-700'
        }`}
      >
        View Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange('annual')}
        className={`rounded border px-3 py-1.5 text-sm ${
          viewMode === 'annual'
            ? 'border-slate-900 bg-slate-900 text-white'
            : 'border-slate-300 bg-white text-slate-700'
        }`}
      >
        View Annually
      </button>
    </div>
  )
}

export default ViewModeToggle
