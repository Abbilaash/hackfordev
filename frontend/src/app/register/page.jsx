'use client'
import React, { useState, useEffect } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const problemDomains = [
  'Sustainable Development and Climate Action',
  'Smart Cities and Urban Innovation',
  'Clean Energy and Environmental Monitoring',
  'Healthcare and Life Sciences',
  'Agriculture and Rural Innovation',
  'Education Technology and Learning Platforms',
  'E-commerce and Digital Ecosystems',
  'Media, Entertainment, and Digital Experiences',
  'Developer Productivity and Intelligent Automation',
  'Responsible AI and Resource Optimization',
]

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
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-700 bg-gray-900 hover:bg-gray-800 text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} h-12 px-8 text-base`}
    >
      {children}
    </button>
  )
}

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    window.location.href = '/'
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex gap-4 items-center'>
          <img src='/assets/psgtechlogo.jpeg' alt='' width='40px' height='30px' />
          <div className='flex flex-col'>
            <p className='text-base font-bold text-white'>PSG College Of Technology</p>
            <p className='text-sm font-semibold text-gray-300'>Presents AI4Dev '26</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <a
            href='/'
            className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
          >
            Home
          </a>
          <button
            onClick={handleLogout}
            className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

const Footer = () => (
  <footer className='bg-gray-900 border-t border-gray-800 py-8 mt-12'>
    <div className='container mx-auto px-4 text-center text-gray-400'>
      <p>© 2026 AI4Dev. All rights reserved.</p>
    </div>
  </footer>
)

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    teamName: '',
    institutionName: '',
    totalMembers: 2,
    members: [
      {
        name: '',
        designation: '',
        department: '',
        city: '',
        state: '',
        mobile: '',
        email: '',
      },
      {
        name: '',
        designation: '',
        department: '',
        city: '',
        state: '',
        mobile: '',
        email: '',
      },
    ],
    problemDomain: '',
    projectTitle: '',
    githubRepoLink: '',
    demoVideoURL: '',
    pptFile: null,
    bonafideFile: null,
    agreeToRules: false,
  })

  useEffect(() => {
    const currentLength = formData.members.length
    const targetLength = formData.totalMembers

    // Only update if there's an actual mismatch
    if (targetLength !== currentLength) {
      if (targetLength > currentLength) {
        const newMembers = [...formData.members]
        for (let i = currentLength; i < targetLength; i++) {
          newMembers.push({
            name: '',
            designation: '',
            department: '',
            city: '',
            state: '',
            mobile: '',
            email: '',
          })
        }
        setFormData((prev) => ({ ...prev, members: newMembers }))
      } else if (targetLength < currentLength) {
        setFormData((prev) => ({
          ...prev,
          members: prev.members.slice(0, targetLength),
        }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.totalMembers])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'totalMembers'
            ? parseInt(value)
            : value,
    }))
  }

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members]
    newMembers[index] = { ...newMembers[index], [field]: value }
    setFormData((prev) => ({ ...prev, members: newMembers }))
  }

  const handleFileChange = (e, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.teamName) newErrors.teamName = 'Team name is required'
    if (!formData.institutionName)
      newErrors.institutionName = 'Institution name is required'

    formData.members.forEach((member, index) => {
      if (!member.name) newErrors[`member${index}Name`] = 'Name is required'
      if (!member.designation)
        newErrors[`member${index}Designation`] = 'Designation is required'
      if (!member.department)
        newErrors[`member${index}Department`] = 'Department is required'
      if (!member.city) newErrors[`member${index}City`] = 'City is required'
      if (!member.state) newErrors[`member${index}State`] = 'State is required'
      if (!member.mobile)
        newErrors[`member${index}Mobile`] = 'Mobile is required'
      else if (!/^\d{10}$/.test(member.mobile.replace(/\D/g, '')))
        newErrors[`member${index}Mobile`] = 'Mobile must be 10 digits'
      if (!member.email || !/\S+@\S+\.\S+/.test(member.email)) {
        newErrors[`member${index}Email`] = 'Valid email is required'
      }
    })

    if (!formData.bonafideFile)
      newErrors.bonafideFile = 'Bonafide certificate is required'
    if (!formData.problemDomain)
      newErrors.problemDomain = 'Problem domain is required'
    if (!formData.projectTitle)
      newErrors.projectTitle = 'Project title is required'
    if (!formData.githubRepoLink)
      newErrors.githubRepoLink = 'GitHub link is required'
    else if (!/^https?:\/\/.+/.test(formData.githubRepoLink))
      newErrors.githubRepoLink = 'GitHub link must be a valid URL'
    if (!formData.demoVideoURL)
      newErrors.demoVideoURL = 'Demo video URL is required'
    else if (!/^https?:\/\/.+/.test(formData.demoVideoURL))
      newErrors.demoVideoURL = 'Demo video URL must be a valid URL'
    if (!formData.agreeToRules)
      newErrors.agreeToRules = 'You must agree to the rules'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async () => {
    // If you already have validation
    const newErrors = validateForm?.()
    if (newErrors && Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()

      // -------------------------------
      // Team Information
      // -------------------------------
      formDataToSend.append('teamName', formData.teamName)
      formDataToSend.append('institutionName', formData.institutionName)
      formDataToSend.append('totalMembers', String(formData.totalMembers))

      // -------------------------------
      // Members (send as JSON)
      // -------------------------------
      formDataToSend.append('members', JSON.stringify(formData.members))

      // -------------------------------
      // Project Info
      // -------------------------------
      formDataToSend.append('problemDomain', formData.problemDomain)
      formDataToSend.append('projectTitle', formData.projectTitle)
      formDataToSend.append('githubRepoLink', formData.githubRepoLink)
      formDataToSend.append('demoVideoURL', formData.demoVideoURL)

      // -------------------------------
      // Files
      // -------------------------------
      if (formData.pptFile instanceof File) {
        formDataToSend.append('pptFile', formData.pptFile)
      }

      if (formData.bonafideFile instanceof File) {
        formDataToSend.append('bonafideFile', formData.bonafideFile)
      }

      // -------------------------------
      // Agreement
      // -------------------------------
      formDataToSend.append('agreeToRules', String(formData.agreeToRules))

      // -------------------------------
      // Send request
      // -------------------------------
      const response = await fetch(`${API_BASE_URL}/api/registration`, {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.message || 'Registration failed')
      }

      alert('Registration submitted successfully!')
      setTimeout(() => (window.location.href = '/'), 1000)
    } catch (error) {
      console.error('Submit error:', error)
      // alert(error?.message || 'Something went wrong while submitting.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <main className='min-h-screen bg-gray-950'>
        <Navbar />
        <div className='pt-20 pb-12 px-4'>
          <div className='max-w-lg mx-auto text-center'>
            <Card className='p-8'>
              <div className='w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-6'>
                <CheckCircle2 className='w-10 h-10 text-green-500' />
              </div>
              <h2 className='text-2xl font-bold text-white mb-4'>
                Registration Successful!
              </h2>
              <p className='text-gray-400 mb-6'>
                Thank you for registering for AI4Dev '26. We have received your
                submission and will review it shortly. You will receive a
                confirmation email with further details.
              </p>
              <Button onClick={() => setIsSuccess(false)} variant='outline'>
                Register Another Team
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-950'>
      <Navbar />

      <div className='pt-24 pb-12 px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Register Your Team
            </h1>
            <p className='text-lg text-gray-400'>
              Fill in the details below to participate in AI4Dev '26
            </p>
          </div>

          <Card className='p-8'>
            <div className='space-y-8'>
              {/* Team Information */}
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-white border-b border-gray-800 pb-2'>
                  Team Information
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Team Name *
                    </label>
                    <Input
                      name='teamName'
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder='Enter your team name'
                      error={errors.teamName}
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Institution Name *
                    </label>
                    <Input
                      name='institutionName'
                      value={formData.institutionName}
                      onChange={handleChange}
                      placeholder='Enter your college/university'
                      error={errors.institutionName}
                    />
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <label className='text-sm font-medium text-white'>
                      Total Members (2-3) *
                    </label>
                    <select
                      name='totalMembers'
                      value={formData.totalMembers}
                      onChange={handleChange}
                      className='flex h-12 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Team Members - Dynamic */}
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-white border-b border-gray-800 pb-2'>
                  Team Members Details
                </h3>

                {formData.members.map((member, index) => (
                  <div
                    key={index}
                    className='p-6 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4'
                  >
                    <h4 className='text-lg font-semibold text-blue-400 mb-4'>
                      Member {index + 1}
                    </h4>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-white'>
                        Full Name *
                      </label>
                      <Input
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, 'name', e.target.value)
                        }
                        placeholder='Enter full name'
                        error={errors[`member${index}Name`]}
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-white'>
                          Designation / Course *
                        </label>
                        <Input
                          value={member.designation}
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              'designation',
                              e.target.value,
                            )
                          }
                          placeholder='e.g., B.Tech CSE'
                          error={errors[`member${index}Designation`]}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-white'>
                          Department / Section *
                        </label>
                        <Input
                          value={member.department}
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              'department',
                              e.target.value,
                            )
                          }
                          placeholder='e.g., Computer Science'
                          error={errors[`member${index}Department`]}
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-white'>
                          City *
                        </label>
                        <Input
                          value={member.city}
                          onChange={(e) =>
                            handleMemberChange(index, 'city', e.target.value)
                          }
                          placeholder='Enter city'
                          error={errors[`member${index}City`]}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-white'>
                          State *
                        </label>
                        <Input
                          value={member.state}
                          onChange={(e) =>
                            handleMemberChange(index, 'state', e.target.value)
                          }
                          placeholder='Enter state'
                          error={errors[`member${index}State`]}
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-white'>
                          Mobile (WhatsApp) *
                        </label>
                        <Input
                          type='tel'
                          value={member.mobile}
                          onChange={(e) =>
                            handleMemberChange(index, 'mobile', e.target.value)
                          }
                          placeholder='Enter mobile number'
                          error={errors[`member${index}Mobile`]}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-white'>
                          Email Address *
                        </label>
                        <Input
                          type='email'
                          value={member.email}
                          onChange={(e) =>
                            handleMemberChange(index, 'email', e.target.value)
                          }
                          placeholder='member@email.com'
                          error={errors[`member${index}Email`]}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Identity Verification */}
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-white border-b border-gray-800 pb-2'>
                  Identity Verification
                </h3>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white'>
                    Upload Bonafide Certificate / College ID Card *
                  </label>
                  <div className='border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors'>
                    <input
                      type='file'
                      accept='.jpg,.jpeg,.png,.pdf'
                      className='hidden'
                      id='bonafide-upload'
                      onChange={(e) => handleFileChange(e, 'bonafideFile')}
                    />
                    {formData.bonafideFile ? (
                      <div className='flex items-center justify-between bg-gray-800 rounded-lg p-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center'>
                            <CheckCircle2 className='w-5 h-5 text-green-500' />
                          </div>
                          <div className='text-left'>
                            <p className='text-sm font-medium text-white truncate max-w-xs'>
                              {formData.bonafideFile.name}
                            </p>
                            <p className='text-xs text-gray-400'>
                              {(formData.bonafideFile.size / 1024).toFixed(2)}{' '}
                              KB
                            </p>
                          </div>
                        </div>
                        <label
                          htmlFor='bonafide-upload'
                          className='cursor-pointer text-blue-400 hover:text-blue-300 text-sm font-medium'
                        >
                          Change
                        </label>
                      </div>
                    ) : (
                      <label
                        htmlFor='bonafide-upload'
                        className='cursor-pointer'
                      >
                        <div className='text-blue-400 hover:text-blue-300 transition-colors'>
                          <span className='font-medium'>Click to upload</span>{' '}
                          or drag and drop
                        </div>
                        <p className='text-sm text-gray-500 mt-2'>
                          JPG, PNG, PDF only, max 5MB
                        </p>
                      </label>
                    )}
                  </div>
                  {errors.bonafideFile && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.bonafideFile}
                    </p>
                  )}
                </div>
              </div>

              {/* Project Information */}
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-white border-b border-gray-800 pb-2'>
                  Project Information
                </h3>

                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Problem Domain *
                    </label>
                    <select
                      name='problemDomain'
                      value={formData.problemDomain}
                      onChange={handleChange}
                      className='flex h-12 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>Select a problem domain</option>
                      {problemDomains.map((domain, index) => (
                        <option key={index} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                    {errors.problemDomain && (
                      <p className='text-sm text-red-500 mt-1'>
                        {errors.problemDomain}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Project Title *
                    </label>
                    <Input
                      name='projectTitle'
                      value={formData.projectTitle}
                      onChange={handleChange}
                      placeholder='Enter your project title'
                      error={errors.projectTitle}
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      GitHub Repository Link *
                    </label>
                    <Input
                      name='githubRepoLink'
                      value={formData.githubRepoLink}
                      onChange={handleChange}
                      placeholder='https://github.com/username/repo'
                      error={errors.githubRepoLink}
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Demo Video URL *
                    </label>
                    <Input
                      name='demoVideoURL'
                      value={formData.demoVideoURL}
                      onChange={handleChange}
                      placeholder='https://youtube.com/watch?v=...'
                      error={errors.demoVideoURL}
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white'>
                      Project PPT (PDF)
                    </label>
                    <div className='border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors'>
                      <input
                        type='file'
                        accept='.pdf'
                        className='hidden'
                        id='ppt-upload'
                        onChange={(e) => handleFileChange(e, 'pptFile')}
                      />
                      {formData.pptFile ? (
                        <div className='flex items-center justify-between bg-gray-800 rounded-lg p-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center'>
                              <CheckCircle2 className='w-5 h-5 text-green-500' />
                            </div>
                            <div className='text-left'>
                              <p className='text-sm font-medium text-white truncate max-w-xs'>
                                {formData.pptFile.name}
                              </p>
                              <p className='text-xs text-gray-400'>
                                {(formData.pptFile.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <label
                            htmlFor='ppt-upload'
                            className='cursor-pointer text-blue-400 hover:text-blue-300 text-sm font-medium'
                          >
                            Change
                          </label>
                        </div>
                      ) : (
                        <label htmlFor='ppt-upload' className='cursor-pointer'>
                          <div className='text-blue-400 hover:text-blue-300 transition-colors'>
                            <span className='font-medium'>Click to upload</span>{' '}
                            or drag and drop
                          </div>
                          <p className='text-sm text-gray-500 mt-2'>
                            PDF only, max 10MB
                          </p>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <input
                    type='checkbox'
                    name='agreeToRules'
                    checked={formData.agreeToRules}
                    onChange={handleChange}
                    className='mt-1 w-5 h-5 rounded border-gray-700 text-blue-600 focus:ring-blue-500'
                    id='agree-rules'
                  />
                  <label
                    htmlFor='agree-rules'
                    className='text-sm text-gray-400'
                  >
                    I agree to the rules and regulations of the hackathon. I
                    understand that my team must have a working PoC with TRL 3
                    or above and that all submissions must be original work.
                  </label>
                </div>
                {errors.agreeToRules && (
                  <p className='text-sm text-red-500'>{errors.agreeToRules}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type='button'
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
