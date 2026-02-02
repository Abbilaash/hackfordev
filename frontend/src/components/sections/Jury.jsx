'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { User, Building2, Linkedin, GraduationCap } from 'lucide-react'

// Card Component
const Card = ({ children, className = '' }) => (
  <div
    className={`
       bg-slate-900 
      rounded-xl shadow-sm border  border-slate-800 
      hover:shadow-md transition-shadow duration-300
      ${className}
    `}
  >
    {children}
  </div>
)

// --- Data (unchanged) ---

const juryMembers = [
  {
    name: 'Mr. Madhusudhan',
    role: 'Senior Manager, Product Management, AI SoC',
    company: 'Intel, Bangalore',
    linkedin: 'https://www.linkedin.com/in/madhusudan-k/',
    image: '/assets/madhusudhan.png',
  },
  {
    name: 'Dr. Srinivasan Aruchamy',
    role: 'Principal Scientist',
    company: 'CSIR-CMERI',
    linkedin: 'https://www.linkedin.com/in/dr-srinivasan-aruchamy/',
    image: '/assets/srinvasan.png',
  },
  {
    name: 'Mr. Azad Sheriff',
    role: 'Director / Software Architect',
    company: 'Octa, Bangalore',
    image: '/assets/azadsheriff.png',
  },
  {
    name: 'Dr. C. S. Saravana Kumar',
    role: 'Senior Software Architect',
    company: 'Bosch Global Software Technologies',
    linkedin: 'https://www.linkedin.com/in/dr-saravana-kumar-c-s/',
    image: '/assets/saravankumar.png',
  },
  {
    name: 'Ms. Usha Rengaraju',
    role: 'Kaggle Grandmaster, Head of Research',
    company: 'Exa Protocol',
    linkedin: 'https://www.linkedin.com/in/usha-rengaraju/',
    image: '/assets/Usha.jpeg',
  },
]

const facultyCoordinators = [
  {
    name: 'Dr. V Senthil Kumaran',
    role: 'Faculty Advisor - Coding Club',
    company: 'Department of AMCS',
    linkedin: 'https://www.linkedin.com/in/vskpsgtech/',
    image: '',
  },
  {
    name: 'Dr. Gopika Rani N',
    role: 'Assistant Professor (Sl. Gr.)',
    company: 'Department of CSE',
    image: '',
  },
]

const leadCoordinators = [
  { name: 'Harini P', company: 'CSE' },
  { name: 'Muralitharan A', company: 'BME' },
  { name: 'Irudaya Paulin G', company: 'Production' },
  { name: 'Abilash A T', company: 'AI ML' },
  { name: 'Sai Kabilan A', company: 'ECE' },
  { name: 'Swetha A', company: 'ICE' },
  { name: 'Yashini N', company: 'FT' },
]

const associateCoordinators = [
  { name: 'Anish J S', company: 'Mech' },
  { name: 'Nithiish S D', company: 'AMCS' },
  { name: 'Praveen R P', company: 'CSE' },
]

// --- Member Card Component ---

const MemberCard = ({ member, index, isStudent = false, isstaff = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
  >
    <Card className='p-6 h-full'>
      <div className='flex items-start gap-4'>
        {/* Photo / Icon */}
        <div className='relative flex-shrink-0'>
          <div
            className={`
              rounded-full flex items-center justify-center overflow-hidden border-2
              ${
                isStudent || isstaff
                  ? 'w-14 h-14 bg-indigo-50 border-indigo-100'
                  : 'w-24 h-24 bg-blue-50 border-blue-200'
              }
            `}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className='w-full h-full object-cover'
              />
            ) : isStudent ? (
              <GraduationCap className='w-7 h-7 text-indigo-600/80' />
            ) : (
              <User className='w-8 h-8 text-blue-600/80' />
            )}
          </div>

          {/* LinkedIn badge */}
          {!isStudent && member.linkedin && (
            <a
              href={member.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='absolute -bottom-1 -right-1 bg-slate-800 border-2 border-slate-700 rounded-full p-1.5 shadow-md hover:scale-110 transition-transform'
              aria-label={`LinkedIn profile of ${member.name}`}
            >
              <Linkedin className='w-4 h-4 text-[#0A66C2]' />
            </a>
          )}
        </div>

        {/* Text content */}
        <div className='flex-1 min-w-0'>
          <h3 className='font-semibold text-slate-100 text-lg leading-tight wrap-break-word'>
            {member.name}
          </h3>

          {!isStudent && member.role && (
            <p className='text-sm text-blue-400 font-medium mt-0.5'>
              {member.role}
            </p>
          )}

          <div className='flex items-center gap-1.5 text-sm text-slate-400 mt-1.5'>
            <Building2 className='w-4 h-4 flex-shrink-0' />
            <span className='break-words'>{member.company}</span>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
)

// --- Section Header ---

const SectionHeader = ({ title, subtitle }) => (
  <div className='mb-12 text-center'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-white'>
      {title}
    </h2>
    {subtitle && (
      <p className='mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto'>
        {subtitle}
      </p>
    )}
    <div className='h-1 w-16 bg-blue-500/60 mx-auto mt-5 rounded-full' />
  </div>
)

// --- Main Jury Component ---

export function Jury() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='py-20 md:py-24 bg-slate-950 space-y-28 md:space-y-32 ' id="jury">
      {/* Jury & Industry Experts */}
      <section className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
        <SectionHeader
          title='Jury & Advisory Members'
          subtitle='Learn from and be evaluated by leaders shaping the future of AI & technology'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {juryMembers.map((m, i) => (
            <MemberCard key={`jury-${i}`} member={m} index={i} />
          ))}
        </div>
      </section>

      {/* Faculty Coordinators */}
      <section className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
        <SectionHeader
          title='Faculty Coordinators'
          subtitle='Guidance and support from our esteemed academic mentors'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 lg:gap-8'>
          {facultyCoordinators.map((m, i) => (
            <MemberCard key={`fac-${i}`} member={m} index={i} isstaff />
          ))}
        </div>
      </section>

      {/* Lead Coordinators */}
      <section className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
        <SectionHeader title='Lead Coordinators' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6'>
          {leadCoordinators.map((m, i) => (
            <MemberCard key={`lead-${i}`} member={m} index={i} isStudent />
          ))}
        </div>
      </section>

      {/* Associate Coordinators */}
      <section className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
        <SectionHeader title='Associate Coordinators' />
        <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 '>
          {associateCoordinators.map((m, i) => (
            <MemberCard key={`assoc-${i}`} member={m} index={i} isStudent />
          ))}
        </div>
      </section>
    </div>
  )
}
