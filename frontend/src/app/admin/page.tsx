import React from 'react'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
/* ================= TYPES ================= */

interface TeamMember {
  name: string
  designation: string
  department: string
  city: string
  state: string
  mobile: string
  email: string
}

interface hackathon_registration {
  id: number
  registration_id: string
  project_title: string
  team_name: string
  team_size: number
  institution_name: string
  problem_domain: string
  agree_to_rules: boolean

  bonafide_file: string
  ppt_file: string
  demo_video_url: string
  github_repo_link: string

  members: string // JSON string
  submitted_at: string
  user_id: number | null
}

interface ApiResponse {
  hackathon_registration: hackathon_registration[]
  totalUsers: number
}

/* ================= PAGE ================= */

export default async function Page() {
  const res = await fetch(`${API_BASE_URL}/api/admin/all-data`, {
    cache: 'no-store', // important for admin dashboards
  })

  if (!res.ok) {
    throw new Error('Failed to fetch admin data')
  }

  const data: ApiResponse = await res.json()

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>
        Admin Dashboard ({data.totalUsers})
      </h1>

      {data.hackathon_registration.map((item) => {
        const members: TeamMember[] = JSON.parse(item.members)

        return (
          <div key={item.id} className='border rounded-lg p-4 space-y-3'>
            <div>
              <h2 className='text-xl font-semibold'>{item.project_title}</h2>
              <p className='text-sm text-gray-600'>
                {item.registration_id} • {item.problem_domain}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-2 text-sm'>
              <p>
                <b>Team:</b> {item.team_name}
              </p>
              <p>
                <b>Size:</b> {item.team_size}
              </p>
              <p>
                <b>Institution:</b> {item.institution_name}
              </p>
              <p>
                <b>Submitted:</b> {item.submitted_at}
              </p>
            </div>

            <div>
              <h3 className='font-semibold'>Members</h3>
              <ul className='list-disc list-inside text-sm'>
                {members.map((m, index) => (
                  <li key={index}>
                    {m.name} ({m.designation}) – {m.email}
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex gap-4 text-sm text-blue-600 underline'>
              <a href={item.ppt_file} target='_blank'>
                PPT
              </a>
              <a href={item.bonafide_file} target='_blank'>
                Bonafide
              </a>
              <a href={item.github_repo_link} target='_blank'>
                GitHub
              </a>
              <a href={item.demo_video_url} target='_blank'>
                Demo
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
