import { useState } from 'react'
import Header from '../components/layout/Header'
import LandingSidebar from '../components/layout/LandingSidebar'

interface Project {
  tags: string[]
  title: string
  desc: string
  imgAlt: string
  img: string | null
  href: string
  comingSoon?: boolean
}

const projects: Project[] = [
  {
    tags: ['Enterprise', 'B2B', '100K+ Downloads'],
    title: 'Vehicle Service Management Tools',
    desc: 'Dashboard and workshop floor visualisation tool for Service Managers to manage vehicle service operations efficiently.',
    img: '/assets/media/hero-dashboard.png',
    imgAlt: 'Service manager dashboard on tablet and mobile',
    href: '#/hmc',
  },
  {
    tags: ['Enterprise', 'B2B', '100K+ Downloads'],
    title: 'Integrating Complex Multi-Stakeholder Workflows',
    desc: 'Removing avoidable vehicle idle times, technician waiting time and manual dependencies at vehicle service centres.',
    img: '/assets/media/hero-flow.png',
    imgAlt: 'Multi-stakeholder service workflow across mobile screens',
    href: '#/hmc',
  },
  {
    tags: ['Coming Soon'],
    title: 'Builder Market',
    desc: '',
    img: null,
    imgAlt: '',
    href: '#',
    comingSoon: true,
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const stripesBg =
    'repeating-linear-gradient(135deg, var(--color-stripe-a) 0px, var(--color-stripe-a) 8px, var(--color-stripe-b) 8px, var(--color-stripe-b) 16px)'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.02fr) 1fr',
        gap: '56px',
        alignItems: 'center',
        background: 'var(--color-surface-card)',
        border: `1px solid ${hovered ? 'var(--color-border-hair-hover)' : 'var(--color-border-hair)'}`,
        borderRadius: 'var(--radius-project-card)',
        padding: '28px',
        cursor: project.comingSoon ? 'default' : 'pointer',
        transition: `border-color var(--duration-hover) var(--ease-standard)`,
      }}
      onClick={() => { if (!project.comingSoon && project.href !== '#') window.location.hash = project.href.replace('#', '') }}
      role={project.comingSoon ? undefined : 'link'}
      tabIndex={project.comingSoon ? undefined : 0}
      onKeyDown={e => { if (!project.comingSoon && (e.key === 'Enter' || e.key === ' ')) window.location.hash = project.href.replace('#', '') }}
      aria-label={project.comingSoon ? undefined : `View case study: ${project.title}`}
    >
      {/* Sweep overlay */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-surface-sidebar)',
          transform: hovered ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'bottom left',
          transition: `transform var(--duration-hover) var(--ease-standard)`,
          zIndex: 0,
        }}
      />

      {/* Image column */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          aspectRatio: '3 / 2',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          border: '1px solid var(--color-border-hair)',
          background: project.img ? '#0e1116' : 'var(--color-surface-card)',
          backgroundImage: project.img ? `url(${project.img})` : stripesBg,
          backgroundSize: project.img ? 'cover' : 'auto',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition-theme)',
        }}
        role="img"
        aria-label={project.imgAlt || undefined}
      >
        {!project.img && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '.14em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-meta)',
              transition: 'var(--transition-theme)',
            }}
          >
            {project.comingSoon ? 'Coming soon' : 'Case study'}
          </span>
        )}
      </div>

      {/* Text column */}
      <div style={{ position: 'relative', zIndex: 1, paddingRight: 'var(--space-5)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px', marginBottom: 'var(--space-6)' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                letterSpacing: '.09em',
                textTransform: 'uppercase' as const,
                color: 'var(--color-text-secondary)',
                transition: 'var(--transition-theme)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          style={{
            fontSize: '30px',
            lineHeight: 1.16,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-title)',
            margin: '0 0 22px',
            maxWidth: '540px',
            transition: 'var(--transition-theme)',
          }}
        >
          {project.title}
        </h3>
        {project.desc && (
          <p
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: 1.55,
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              margin: 0,
              maxWidth: '520px',
              transition: 'var(--transition-theme)',
            }}
          >
            {project.desc}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface-page)',
        transition: 'var(--transition-theme)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          minHeight: '100vh',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <LandingSidebar />

        <main style={{ background: 'var(--color-surface-main)', transition: 'var(--transition-theme)' }}>
          <Header />
          <div style={{ padding: 'var(--space-12) var(--space-12) 88px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {projects.map(project => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
