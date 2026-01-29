'use client'

import * as React from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, LogOut, User } from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '#overview' },
  { name: 'Details', href: '#details' },
  { name: 'Eligibility', href: '#eligibility' },
  { name: 'Rules', href: '#rules' },
  { name: 'Domains', href: '#domains' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Jury', href: '#jury' },
  { name: 'Contact', href: '#contact' },
]

// Button Component
const Button = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all duration-200 ${className}`}
  >
    {children}
  </button>
)

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(' ')

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  // Check session on component mount and periodically
  React.useEffect(() => {
    const checkSession = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const email = localStorage.getItem('userEmail') || ''
      setIsLoggedIn(loggedIn)
      setUserEmail(email)
    }

    checkSession()

    // Check session periodically
    const interval = setInterval(checkSession, 1000)
    return () => clearInterval(interval)
  }, [])

  const checkSession = () => {
    return localStorage.getItem('isLoggedIn') === 'true'
  }

  const handleRegisterClick = () => {
    if (checkSession()) {
      window.location.href = '/register'
    } else {
      window.location.href = '/signup'
    }
  }

  const handleSignInClick = () => {
    window.location.href = '/signin'
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    setUserEmail('')
    window.location.href = '/'
  }

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  // Inside your Navbar component
  React.useEffect(() => {
    if (mobileMenuOpen) {
      // 1. Block scrolling
      document.body.style.overflow = 'hidden'

      // 2. Optional: block pointer events on everything except the menu
      // (only if you don't use a visible backdrop)
      document.body.style.pointerEvents = 'auto'

      // 3. Prevent pinch-zoom & weird touch behavior on mobile
      const preventDefault = (e) => {
        e.preventDefault()
      }
      document.addEventListener('touchmove', preventDefault, { passive: false })

      // 4. Try to re-enable pointer events on the menu (may need delay)
      const enableMenu = () => {}
      const timer = setTimeout(enableMenu, 50) // small delay after render

      // Cleanup
      return () => {
        document.body.style.overflow = ''
        document.body.style.pointerEvents = ''
        document.removeEventListener('touchmove', preventDefault)
        clearTimeout(timer)
      }
    }
  }, [mobileMenuOpen])
  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-border'
          : 'bg-transparent',
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <a href='/' className='text-xl font-bold text-primary'>
              AI4Dev<span className='text-accent'>'26</span>
            </a>
          </div>

          {/* Desktop Navigation + Auth Buttons */}
          <div className='hidden md:flex md:items-center md:space-x-1'>
            {/* Nav links */}
            <div className='flex items-baseline space-x-1'>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    isScrolled
                      ? 'text-black  hover:text-primary'
                      : 'text-foreground/80 hover:text-white',
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className='ml-4 flex items-center gap-4'>
              {isLoggedIn ? (
                <>
                  {/* User Email Display */}
                  <div
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm rounded-lg',
                      isScrolled
                        ? 'text-gray-700 bg-gray-100'
                        : 'text-white/90 bg-white/10',
                    )}
                  >
                    <User className='h-4 w-4' />
                    <span className='max-w-[150px] truncate'>{userEmail}</span>
                  </div>

                  {/* Register Button */}
                  <Button
                    onClick={handleRegisterClick}
                    className='transition-all duration-200 hover:scale-105'
                  >
                    Register Now
                  </Button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isScrolled
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-white/90 hover:bg-white/10',
                    )}
                  >
                    <LogOut className='h-4 w-4' />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In Button */}
                  <button
                    onClick={handleSignInClick}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:scale-105 bg-primary  ',
                      isScrolled
                        ? 'text-white  hover:text-white '
                        : 'text-white/90 hover:text-white ',
                    )}
                  >
                    Sign In
                  </button>

                  {/* Register Button */}
                  <Button
                    onClick={handleRegisterClick}
                    className='transition-all duration-200 hover:scale-105'
                  >
                    Register Now
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors',
                isScrolled
                  ? 'text-black hover:text-primary'
                  : ' text-white hover:text-white/80 ',
              )}
            >
              {mobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='md:hidden bg-background border-b border-border'
        >
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {/* Navigation Items */}
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className='block w-full text-left px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors duration-200'
              >
                {item.name}
              </button>
            ))}

            {/* Mobile Auth Section */}
            <div className='pt-4 px-3 space-y-3 gap:3 border-t border-border'>
              {isLoggedIn ? (
                <>
                  {/* User Email */}
                  <div className='flex items-center gap-2 px-3 py-3 text-sm text-gray-700 bg-gray-100 rounded-lg'>
                    <User className='h-4 w-4' />
                    <span className='truncate'>{userEmail}</span>
                  </div>

                  {/* Register Button */}
                  <Button
                    onClick={handleRegisterClick}
                    className='w-full  transition-all duration-200 '
                  >
                    Register Now
                  </Button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center justify-center gap-2 px-6 py-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium'
                  >
                    <LogOut className='h-4 w-4' />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In Button */}
                  <button
                    onClick={handleSignInClick}
                    className='w-full px-6 py-2 text-white-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-black  transition-all duration-200 font-medium'
                  >
                    Sign In
                  </button>

                  {/* Register Button */}
                  <Button
                    onClick={handleRegisterClick}
                    className='w-full transition-all duration-200'
                  >
                    Register Now
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
