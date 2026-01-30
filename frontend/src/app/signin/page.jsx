'use client'

import React, { useState } from 'react'
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const Card = ({ children, className = '' }) => (
  <div
    className={`bg-gray-900 border border-gray-800 rounded-lg shadow-lg ${className}`}
  >
    {children}
  </div>
)

const Input = ({ error, className = '', ...props }) => (
  <div className='w-full'>
    <input
      className={`flex h-12 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
    {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
  </div>
)

const Button = ({
  children,
  variant = 'default',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-700 bg-gray-900 hover:bg-gray-800 text-white',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} h-12 px-8 text-base ${className}`}
    >
      {children}
    </button>
  )
}

const Navbar = () => (
  <nav className='fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800'>
    <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
      <div className='text-xl font-bold text-white flex gap-4 items-center'>
        <img src='/assets/psgtechlogo.jpeg' alt='' width='40px' height='30px' />
        <p>AI4Dev '26</p>
      </div>
      <div className='flex items-center gap-4'>
        <a
          href='/'
          className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
        >
          Home
        </a>
        <a
          href='/signup'
          className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
        >
          Sign Up
        </a>
      </div>
    </div>
  </nav>
)

const Footer = () => (
  <footer className='bg-gray-900 border-t border-gray-800 py-8 mt-auto'>
    <div className='container mx-auto px-4 text-center text-gray-400'>
      <p>© 2026 AI4Dev. All rights reserved.</p>
    </div>
  </footer>
)

export default function SignIn() {
  // State Management
  const [isResetMode, setIsResetMode] = useState(false)
  const [resetStep, setResetStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [resetData, setResetData] = useState({
    email: '',
    otp: '', {isResetMode
                ? resetStep === 1
                  ? 'Enter your email to receive an OTP'
                  : 'Enter OTP and new password'
                : 'Sign in to access your AI4Dev localStorage.setItem('isLoggedIn', 'true')account'}
    newPassword: '',
  })

  // Handlers
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    if (feedback.message) setFeedback({ type: '', message: '' })
  }

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value })
    if (feedback.message) setFeedback({ type: '', message: '' })
  }

  // Sign In Handler
  const handleSignIn = async (e) => {
    e.preventDefault()

    // Admin Check
    if (
      credentials.email === 'admin@ai4dev.com' &&
      credentials.password === 'Admin@2026'
    ) {
      setFeedback({
        type: 'success',
        message: 'Admin Verified. Redirecting...',
      })
      setTimeout(() => (window.location.href = '/admin'), 1000)
      return
    }

    setLoading(true)
    setFeedback({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', data.email)
        setFeedback({ type: 'success', message: 'Sign In Successful!' })
        setTimeout(() => (window.location.href = '/'), 1000)
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Invalid credentials',
        })
      }
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Server connection failed.' })
    } finally {
      setLoading(false)
    }
  }

  // Send OTP Handler
  const handleSendResetOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetData.email, purpose: 'reset' }),
      })
      const data = await response.json()

      if (response.ok) {
        setFeedback({ type: 'success', message: 'OTP sent to your email!' })
        setResetStep(2)
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Failed to send OTP',
        })
      }
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Server Error' })
    } finally {
      setLoading(false)
    }
  }

  // Confirm Reset Handler
  const handleConfirmReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData),
      })
      const data = await response.json()

      if (response.ok) {
        setFeedback({
          type: 'success',
          message: 'Password Changed! Please Login.',
        })
        setTimeout(() => {
          setIsResetMode(false)
          setResetStep(1)
          setResetData({ email: '', otp: '', newPassword: '' })
          setFeedback({ type: '', message: '' })
        }, 2000)
      } else {
        setFeedback({ type: 'error', message: data.message || 'Reset Failed' })
      }
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Server Error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='min-h-screen bg-gray-950 flex flex-col'>
      <Navbar />

      <div className='flex-1 flex items-center justify-center px-4 pt-24 pb-12'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
              {isResetMode ? 'Reset Password' : 'Welcome Back'}
            </h1>
            <p className='text-gray-400'>
              {isResetMode
                ? resetStep === 1
                  ? 'Enter your email to receive an OTP'
                  : 'Enter OTP and new password'
                : 'Sign in to access your AI4Dev account'}
            </p>
          </div>

          <Card className='p-8'>
            {/* Feedback Messages */}
            {feedback.message && (
              <div
                className={`mb-6 p-4 rounded-lg text-center font-medium ${
                  feedback.type === 'error'
                    ? 'bg-red-500/10 border border-red-500 text-red-500'
                    : 'bg-green-500/10 border border-green-500 text-green-500'
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Normal Login Form */}
            {!isResetMode && (
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white'>
                    Email Address
                  </label>
                  <Input
                    type='email'
                    name='email'
                    placeholder='your@email.com'
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white'>
                    Password
                  </label>
                  <Input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => setIsResetMode(true)}
                    className='text-sm text-blue-400 hover:text-blue-300 transition-colors'
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type='button'
                  onClick={handleSignIn}
                  disabled={loading}
                  className='w-full'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <div className='text-center text-sm text-gray-400'>
                  Don't have an account?{' '}
                  <a
                    href='/signup'
                    className='text-blue-400 hover:text-blue-300 font-medium'
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            )}

            {/* Reset Password Form */}
            {isResetMode && (
              <div className='space-y-6'>
                {resetStep === 1 ? (
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Registered Email
                    </label>
                    <Input
                      type='email'
                      name='email'
                      placeholder='your@email.com'
                      value={resetData.email}
                      onChange={handleResetChange}
                      disabled={loading}
                    />
                  </div>
                ) : (
                  <>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-white'>
                        OTP Code
                      </label>
                      <Input
                        type='text'
                        name='otp'
                        placeholder='Enter 6-digit OTP'
                        value={resetData.otp}
                        onChange={handleResetChange}
                        maxLength={6}
                        disabled={loading}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-white'>
                        New Password
                      </label>
                      <Input
                        type='password'
                        name='newPassword'
                        placeholder='Enter new password'
                        value={resetData.newPassword}
                        onChange={handleResetChange}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}

                <Button
                  type='button'
                  onClick={
                    resetStep === 1 ? handleSendResetOtp : handleConfirmReset
                  }
                  disabled={loading}
                  className='w-full'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Processing...
                    </>
                  ) : resetStep === 1 ? (
                    'Send OTP'
                  ) : (
                    'Reset Password'
                  )}
                </Button>

                <button
                  type='button'
                  onClick={() => {
                    setIsResetMode(false)
                    setResetStep(1)
                    setResetData({ email: '', otp: '', newPassword: '' })
                    setFeedback({ type: '', message: '' })
                  }}
                  className='w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors'
                >
                  <ArrowLeft className='h-4 w-4' />
                  Back to Login
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
