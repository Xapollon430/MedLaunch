type YearSelectorProps = {
  availableYears: string[]
  activeYear: string
  onYearChange: (year: string) => void
  disabled?: boolean
}

const YearSelector = ({ availableYears, activeYear, onYearChange, disabled = false }: YearSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {availableYears.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onYearChange(year)}
          disabled={disabled}
          className={`rounded border px-3 py-1.5 text-sm ${
            activeYear === year
              ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900'
              : 'border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
          } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

export default YearSelector
