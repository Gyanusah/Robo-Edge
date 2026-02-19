import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { authApi } from '@/services/apiService'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { name: 'Home', anchor: '#home' },
    { name: 'About', anchor: '#about' },
    { name: 'Services', anchor: '#services' },
    { name: 'Gallery', route: '/gallery' },
    { name: 'Testimonials', anchor: '#testimonials' },
    { name: 'Contact', anchor: '#contact' }
  ]

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = Cookies.get('token')
      if (!token) return setLoading(false)

      try {
        const res = await authApi.getMe()
        if (['admin', 'superadmin'].includes(res?.data?.role)) {
          setIsAdmin(true)
        }
      } catch {
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 60)

    checkAdminStatus()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchorClick = (anchor) => {
    setIsMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: anchor } })
    } else {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide text-white"
        >
         RoboEdge
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.route ? (
              <Link
                key={link.route}
                to={link.route}
                className="relative text-sm font-medium text-slate-200 hover:text-brand transition
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-brand after:transition-all after:duration-300
                  hover:after:w-full"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick(link.anchor)
                }}
                className="relative text-sm font-medium text-slate-200 hover:text-brand transition
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-brand after:transition-all after:duration-300
                  hover:after:w-full"
              >
                {link.name}
              </a>
            )
          )}

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="ml-4 px-4 py-2 rounded-md text-sm font-semibold
                bg-brand text-white hover:bg-brandDark transition shadow-sm"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
        >
          <div className="space-y-1">
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-slate-900 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-center h-full px-8 space-y-6">
          {navLinks.map((link) =>
            link.route ? (
              <Link
                key={link.route}
                to={link.route}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-brand transition"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick(link.anchor)
                }}
                className="text-lg font-medium text-slate-200 hover:text-brand transition"
              >
                {link.name}
              </a>
            )
          )}
        </div>
      </div>
    </header>
  )
}
