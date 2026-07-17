import { useState } from 'react'
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

interface CardProps {
  project: Project
  dimmed: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function ProjectCard({ project, dimmed, onMouseEnter, onMouseLeave }: CardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const stripesBg =
    'repeating-linear-gradient(135deg, var(--color-stripe-a) 0px, var(--color-stripe-a) 8px, var(--color-stripe-b) 8px, var(--color-stripe-b) 16px)'

  return (
    <div
      className="project-card-grid fill-btn fill-btn--subtle fill-btn--card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.02fr) 1fr',
        gap: '56px',
        alignItems: 'center',
        background: 'var(--color-surface-main)',
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-project-card)',
        padding: '28px',
        cursor: project.comingSoon ? 'default' : 'pointer',
        opacity: dimmed ? 0.45 : 1,
        transition: `border-color var(--duration-hover) var(--ease-standard), opacity 0.3s ease-out`,
      }}
      onClick={() => { if (!project.comingSoon && project.href !== '#') window.location.hash = project.href.replace('#', '') }}
      role={project.comingSoon ? undefined : 'link'}
      tabIndex={project.comingSoon ? undefined : 0}
      onKeyDown={e => { if (!project.comingSoon && (e.key === 'Enter' || e.key === ' ')) window.location.hash = project.href.replace('#', '') }}
      aria-label={project.comingSoon ? undefined : `View case study: ${project.title}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image column */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          aspectRatio: '3 / 2',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          border: '1px solid var(--color-border-hair)',
          transition: 'var(--transition-theme)',
        }}
        role="img"
        aria-label={project.imgAlt || undefined}
      >
        {/* Stripe placeholder — fades out once image loads */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: project.img ? stripesBg : 'var(--color-surface-card)',
            backgroundSize: 'auto',
            opacity: project.img && imgLoaded ? 0 : 1,
            transition: 'opacity 0.4s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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

        {/* Real image — fades in on load, scales on card hover */}
        {project.img && (
          <img
            src={project.img}
            alt={project.imgAlt}
            className="card-thumb"
            onLoad={() => setImgLoaded(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-out, transform 0.55s var(--ease-standard)',
            }}
          />
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
            fontSize: '28px',
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
              fontSize: 'var(--text-base)',
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface-page)',
        transition: 'var(--transition-theme)',
      }}
    >
      <div className="layout-grid">
        <LandingSidebar />

        <main style={{ background: 'var(--color-surface-main)', transition: 'var(--transition-theme)' }}>
          <div className="layout-main-pad" style={{ padding: '88px var(--space-12) 88px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  dimmed={hoveredIndex !== null && hoveredIndex !== i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
