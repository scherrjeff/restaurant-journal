import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-orange-500 tracking-tight">
          🍽️ Restaurant Journal
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/journal"
            className={({ isActive }) =>
              isActive ? 'font-medium text-orange-500' : 'text-gray-600 hover:text-gray-900'
            }
          >
            Journal
          </NavLink>
          <button
            onClick={() => signOut()}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign out
          </button>
        </nav>
      </div>
    </header>
  )
}
