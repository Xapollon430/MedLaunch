type NavbarProps = {
  title: string
  onMenuClick: () => void
}

const Navbar = ({ title, onMenuClick }: NavbarProps) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 shadow-sm" role="navigation">
      <button
        type="button"
        onClick={onMenuClick}
        className="mr-3 rounded border border-slate-300 px-3 py-1 text-sm text-slate-700"
        aria-label="Open menu"
      >
        Menu
      </button>
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
    </nav>
  )
}

export default Navbar
