import { useState } from 'react'
import ThemeToggle from '../components/ui/ThemeToggle'
import NavLinks from '../components/layout/NavLinks'

interface Project {
  tags: string[]
  title: string
  desc: string
  imgAlt: string
  img: string | null
  href: string
  comingSoon?: boolean
  imgContained?: boolean
}

const projects: Project[] = [
  {
    tags: ['Enterprise', 'B2B', '100K+ Downloads'],
    title: 'Vehicle Service Management Tools',
    desc: 'Dashboard and workshop floor visualisation tool for Service Managers to manage vehicle service operations efficiently.',
    img: '/hmc/casestudy_thumbnail.png',
    imgAlt: 'Service manager dashboard on tablet and mobile',
    href: '#/hmc',
  },
  {
    tags: ['Enterprise', 'B2B', 'Multi-Role'],
    title: 'Integrating Complex Multi-Stakeholder Workflows',
    desc: 'Removing avoidable vehicle idle times, technician waiting time and manual dependencies at vehicle service centres.',
    img: null,
    imgAlt: 'Multi-stakeholder service workflow across mobile screens',
    href: '#/multi-stakeholder',
  },
  {
    tags: ['Marketplace', 'Growth Design'],
    title: 'Solving the Activation Problem in a Marketplace Platform',
    desc: 'Redesigning the supplier activation path — from a drop-off-heavy onboarding form to a guided, progressive flow that surfaced social proof at the moments of highest uncertainty.',
    img: null,
    imgAlt: 'Marketplace supplier activation flow',
    href: '#/marketplace',
  },
  {
    tags: ['Enterprise', 'Compliance', 'Fidelity'],
    title: 'Redesign of a Compliance Enterprise System',
    desc: 'Restructuring a legacy compliance supervision tool that reduced the completion time of supervision review tasks by 30%.',
    img: '/fidelity/thumbnail.png',
    imgAlt: 'Fidelity compliance system redesign — dashboard overview',
    href: '#/fidelity',
    imgContained: true,
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
      className="fill-btn fill-btn--subtle fill-btn--card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface-main)',
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-project-card)',
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
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          borderRadius: 'var(--radius-project-card) var(--radius-project-card) 0 0',
          borderBottom: '1px solid var(--color-border-hair)',
          flexShrink: 0,
          transition: 'var(--transition-theme)',
        }}
        role="img"
        aria-label={project.imgAlt || undefined}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: project.imgContained ? 'var(--color-surface-card)' : project.img ? stripesBg : 'var(--color-surface-card)',
            opacity: project.img && imgLoaded && !project.imgContained ? 0 : 1,
            transition: 'opacity 0.4s ease-out, background var(--transition-theme)',
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

        {project.img && (
          <img
            src={project.img}
            alt={project.imgAlt}
            className="card-thumb"
            onLoad={() => setImgLoaded(true)}
            style={{
              position: 'absolute',
              inset: project.imgContained ? 'var(--space-5)' : 0,
              width: project.imgContained ? 'calc(100% - 2 * var(--space-5))' : '100%',
              height: project.imgContained ? 'calc(100% - 2 * var(--space-5))' : '100%',
              objectFit: project.imgContained ? 'contain' : 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-out, transform 0.55s var(--ease-standard)',
            }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '14px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
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
            fontSize: '22px',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '-0.018em',
            color: 'var(--color-text-title)',
            margin: '0 0 14px',
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
      <div className="layout-content layout-content--centered" style={{ padding: '88px var(--space-12) 88px' }}>
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-6)' }}>
          <h1
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 1.4,
              fontWeight: 600,
              letterSpacing: '-0.005em',
              margin: 0,
              color: 'var(--color-text-title)',
              transition: 'var(--transition-theme)',
            }}
          >
            Sai Vidyasri Giridharan
          </h1>
          <ThemeToggle />
        </header>

        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.55,
            fontWeight: 400,
            color: 'var(--color-text-secondary)',
            margin: 'var(--space-3) 0 0',
            transition: 'var(--transition-theme)',
          }}
        >
          I'm a Product Designer based in San Francisco.<br />
          I help make complex, data-heavy tools to be intuitive and effortless to work with.
        </p>

        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', margin: 'var(--space-10) 0 0' }}>
          <NavLinks />
        </nav>

        <div id="home-inline-nav-sentinel" aria-hidden style={{ height: 1 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: '1fr', gap: 'var(--space-6)', marginTop: 'var(--space-10)' }}>
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
    </div>
  )
}
