import { NavLink } from 'react-router-dom'

type DrawerMenuProps = {
  open: boolean
  onClose: () => void
}

const links = [
  { label: 'Provider Performance', to: '/provider-performance' },
  { label: 'Provider Rankings', to: '/provider-rankings' },
  { label: 'Financial Dashboard', to: '/financial' },
  { label: 'Operational Dashboard', to: '/operational' },
  { label: 'Clinical Dashboard', to: '/clinical' },
  { label: 'Data Sources', to: '/data-sources' },
]

const DrawerMenu = ({ open, onClose }: DrawerMenuProps) => {
  return (
    <aside
      className={`fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-72 border-r border-slate-200 bg-white p-3 shadow-sm transition-transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-hidden={!open}
    >
      <div className="mb-2 text-xs font-semibold uppercase text-slate-500">Dashboards</div>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default DrawerMenu
