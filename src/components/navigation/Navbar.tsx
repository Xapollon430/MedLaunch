type NavbarProps = {
  title: string
  onMenuClick: () => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

const Navbar = ({ title, onMenuClick, theme, onThemeToggle }: NavbarProps) => {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      role="navigation"
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="mr-3 rounded border border-slate-300 px-3 py-1 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
        aria-label="Open menu"
      >
        Menu
      </button>
      <span className="mr-3 rounded border border-slate-300 bg-slate-100 px-3 py-1 text-lg font-bold tracking-tight text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
        Medlaunch by Oakwin
      </span>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
      <button
        type="button"
        onClick={onThemeToggle}
        className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded border border-slate-300 text-slate-700 transition-colors dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className={`relative h-5 w-5 transition-transform duration-500 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="3.2" />
            <path d="M10 2.4v2.2M10 15.4v2.2M2.4 10h2.2M15.4 10h2.2M4.8 4.8l1.6 1.6M13.6 13.6l1.6 1.6M15.2 4.8l-1.6 1.6M6.4 13.6l-1.6 1.6" />
          </svg>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            aria-hidden="true"
          >
            <path d="M13.8 2.5a7.6 7.6 0 1 0 3.7 13.9A8.2 8.2 0 0 1 13.8 2.5Z" />
          </svg>
        </span>
      </button>
    </nav>
  )
}

export default Navbar
