'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircle2, Loader2, ArrowLeft, Clock } from 'lucide-react'

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
      <div className='text-xl font-bold text-white flex items-center gap-4'>
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
          href='/signin'
          className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
        >
          Sign In
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

export default function SignUp() {
  // State Management
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')

  // OTP Timer State - NEW
  const [otpTimer, setOtpTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)

  // OTP Countdown Timer - NEW
  useEffect(() => {
    let interval
    if (step === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, otpTimer])

  // Send OTP Handler
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' })

    if (!email) {
      setFeedback({
        type: 'error',
        message: 'Please enter your email address.',
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setFeedback({ type: 'success', message: 'OTP sent! Check your inbox.' })
        setStep(2)
        setOtpTimer(30) // Reset timer - NEW
        setCanResend(false)
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Failed to send OTP.',
        })
      }
    } catch (err) {
      console.error('OTP Error:', err)
      setFeedback({ type: 'error', message: 'Server connection failed.' })
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP Handler - NEW
  const handleResendOtp = async () => {
    setFeedback({ type: '', message: '' })
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setFeedback({
          type: 'success',
          message: 'New OTP sent! Check your inbox.',
        })
        setOtpTimer(30)
        setCanResend(false)
        setOtp('')
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Failed to resend OTP.',
        })
      }
    } catch (err) {
      console.error('Resend OTP Error:', err)
      setFeedback({ type: 'error', message: 'Server connection failed.' })
    } finally {
      setLoading(false)
    }
  }

  // Register Handler
  const handleRegister = async (e) => {
    e.preventDefault()
    setFeedback({ type: '', message: '' })

    if (!otp || !password) {
      setFeedback({ type: 'error', message: 'Please fill in all fields.' })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        setFeedback({
          type: 'success',
          message: 'Account Created! Redirecting to registration...',
        })
        setTimeout(() => (window.location.href = '/register'), 1500)
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Registration failed.',
        })
      }
    } catch (err) {
      console.error('Signup Error:', err)
      setFeedback({ type: 'error', message: 'Server connection failed.' })
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
              Create Account
            </h1>
            <p className='text-gray-400'>
              {step === 1
                ? 'Register with your email to get started'
                : `Enter the OTP sent to ${email}`}
            </p>
          </div>

          <Card className='p-8'>
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

            {step === 1 && (
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white'>
                    Email Address
                  </label>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button
                  type='button'
                  onClick={handleSendOtp}
                  disabled={loading}
                  className='w-full'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Sending OTP...
                    </>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>

                <div className='text-center text-sm text-gray-400'>
                  Already have an account?{' '}
                  <a
                    href='/signin'
                    className='text-blue-400 hover:text-blue-300 font-medium'
                  >
                    Sign In
                  </a>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-6'>
                {/* TIMER DISPLAY - THIS IS THE KEY PART */}
                <div className='flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30'>
                  <Clock className='h-4 w-4 text-blue-400' />
                  <span className='text-sm font-medium text-blue-400'>
                    {canResend
                      ? 'OTP expired. Please request a new one.'
                      : `OTP expires in ${otpTimer}s`}
                  </span>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white'>
                    Enter OTP
                  </label>
                  <Input
                    type='text'
                    placeholder='Enter 6-digit OTP'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    disabled={loading}
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white'>
                    Create Password
                  </label>
                  <Input
                    type='password'
                    placeholder='Enter a strong password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button
                  type='button'
                  onClick={handleRegister}
                  disabled={loading || canResend}
                  className='w-full'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Verifying...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </Button>

                {canResend && (
                  <Button
                    type='button'
                    onClick={handleResendOtp}
                    disabled={loading}
                    variant='outline'
                    className='w-full'
                  >
                    {loading ? (
                      <>
                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                        Resending...
                      </>
                    ) : (
                      'Resend OTP'
                    )}
                  </Button>
                )}

                <button
                  type='button'
                  onClick={() => {
                    setStep(1)
                    setOtp('')
                    setPassword('')
                    setOtpTimer(30)
                    setCanResend(false)
                    setFeedback({ type: '', message: '' })
                  }}
                  className='w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors'
                >
                  <ArrowLeft className='h-4 w-4' />
                  Change Email
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
