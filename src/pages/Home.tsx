import { useState, type ReactNode } from 'react'
import ThemeToggle from '../components/ui/ThemeToggle'
import NavLinks from '../components/layout/NavLinks'
import Modal from '../components/ui/Modal'
import { eyebrowStyle, pStyle, h2Style, Carousel } from '../components/case-study'

const hydroportSlides = Array.from({ length: 8 }, (_, i) => ({
  src: `/Hydroport/h-${i + 1}.png`,
  alt: `HydroPort concept visual ${i + 1}`,
}))

interface Project {
  tags: string[]
  title: string
  desc: string
  imgAlt: string
  img: string | null
  href: string
  comingSoon?: boolean
  imgContained?: boolean
  /** Default scale for the thumbnail (e.g. 0.7 = shown 30% smaller); zooms to full size on hover. Omit for the standard fill treatment. */
  imgScale?: number
  /** When present, clicking the card opens a modal with this content instead of navigating — for projects with no dedicated case-study page yet. */
  modalContent?: ReactNode
}

const projects: Project[] = [
  {
    tags: ['Enterprise', 'B2B', '100K+ Downloads'],
    title: 'Vehicle Service Management Tools',
    desc: 'Dashboard and workshop floor visualisation tool for Service Managers to manage vehicle service operations efficiently.',
    img: '/hmc/hmc-thumbnail.png',
    imgAlt: 'Service manager dashboard on tablet and mobile',
    href: '#/hmc',
    imgContained: true,
  },
  {
    tags: ['Enterprise', 'Compliance Dashboard'],
    title: 'Supervisory Workstation - Compliance Tool',
    desc: 'Redesigned how managers at Fidelity Investments find the associate responsible for a compliance incident and file a supervision report.',
    img: '/fidelity/thumbnail.png',
    imgAlt: 'Fidelity compliance system redesign — dashboard overview',
    href: '#/fidelity',
    imgContained: true,
  },
  {
    tags: ['Enterprise', 'B2B', '100K+ Downloads'],
    title: 'Multi-Stakeholder Workflows Integration',
    desc: 'Removed manual dependencies between Service Manager, Technician and Security Guard at vehicle service centres.',
    img: '/workflow-thumbnail.png',
    imgAlt: 'Multi-stakeholder service workflow across mobile screens',
    href: '#/multi-stakeholder',
    imgScale: 0.7,
    comingSoon: true,
  },
  {
    tags: ['Product Strategy', '0 -> 1', 'B2B2C'],
    title: 'Marketplace Onboarding & Activation',
    desc: 'Redesigned onboarding around early value delivery, reducing signup drop-off from 71.6% to 34%',
    img: '/marketplace/tbm.png',
    imgAlt: 'Marketplace supplier activation flow',
    href: '#/marketplace',
    imgScale: 0.7,
  },
]

/** School projects and self-directed concepts — shown in their own section below Work, using the same ProjectCard as the main grid. */
const conceptProjects: Project[] = [
  {
    tags: ['Self-Directed Exploration', 'B2B'],
    title: 'AI Inference Tools: Intake and Purchase Decision',
    desc: 'I investigated how mid-size companies buy AI inference tools, what triggers ML engineers to look for one, and how that buying chain should shape the first interaction.',
    img: '/ai_inference/header.png',
    imgAlt: 'Competitive positioning quadrant — configuration burden vs. cost predictability across Groq, Together.ai, and Fireworks AI',
    href: '#/ai-inference-tools',
    imgContained: true,
  },
  {
    tags: ['Service Design', 'Innovation Strategy'],
    title: 'HydroPort - Electrolyser Rental Service Model',
    desc: 'Moving a new alloy to market by innovating how green hydrogen plants get built and paid for.',
    img: '/Hydroport/Electrolyser-thumbnail.jpg',
    imgAlt: 'HydroPort — modular electrolyser rental model concept',
    href: '#',
    modalContent: (
      <>
        <h1
          style={{
            fontSize: 'var(--text-xl)',
            lineHeight: 1.1,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--color-text-title)',
            margin: '0 0 32px',
            transition: 'var(--transition-theme)',
          }}
        >
          HydroPort — Electrolyser Rental Service Model
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-10)', marginBottom: 'var(--space-8)' }}>
          <div>
            <span style={eyebrowStyle}>Status</span>
            <p style={{ ...pStyle, margin: 0 }}>Proposal • Capstone with ATI • 2025</p>
          </div>
          <div>
            <span style={eyebrowStyle}>Team</span>
            <p style={{ ...pStyle, margin: 0 }}>Irene, Roy, Manasi, Jenny, Linda and Me</p>
          </div>
          <div>
            <span style={eyebrowStyle}>Skills</span>
            <p style={{ ...pStyle, margin: 0 }}>User Research, PESTLE Analysis, Value Opportunity Analysis, Competitor Research</p>
          </div>
        </div>
        <div style={{ margin: '24px 0' }}>
          <Carousel slides={hydroportSlides} autoPlayMs={4000} />
        </div>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span style={eyebrowStyle}>Problem overview</span>
          <h3 style={{ ...h2Style, fontSize: 'var(--text-base)', margin: '0 0 8px' }}>
            ATI developed a novel nickel alloy and needed a route to market
          </h3>
          <p style={{ ...pStyle, margin: '0 0 20px' }}>
            ATI is a materials science company selling specialty alloys into aerospace, defense, energy, and medical markets. They developed a nickel alloy that replaces Ni-201 in green hydrogen electrolysis at 20% lower cost and half the lead time. The brief was to commercialise it.
          </p>
          <h3 style={{ ...h2Style, fontSize: 'var(--text-base)', margin: '0 0 8px' }}>
            Plant economics hold back green hydrogen production
          </h3>
          <p style={{ ...pStyle, margin: 0 }}>
            The alloy sells in volume only if green hydrogen production grows. We interviewed the U.S. Department of Energy to find out what constrains that growth. A green hydrogen plant costs millions to build, takes years to construct, and runs at fixed capacity once it exists, so a buyer who wants to try green hydrogen has to commit capital to a permanent plant before producing anything.
          </p>
        </div>
        <div>
          <span style={eyebrowStyle}>Solution</span>
          <h3 style={{ ...h2Style, fontSize: 'var(--text-base)', margin: '0 0 8px' }}>
            HydroPort rents a trailer-mounted electrolyser by the month
          </h3>
          <p style={{ ...pStyle, margin: '0 0 20px' }}>
            We worked with ATI as a team of designers and engineers to change what a buyer commits to. HydroPort puts a 1 MW electrolyser on a trailer, delivers it to the buyer's site, and rents it at $8,600 per month. Buyers add capacity by renting more units and stop without stranding capital. ATI does not build electrolysers, so the model runs through a venture with electrolyser manufacturers: ATI supplies the alloy, manufacturers build the units, and the venture rents them.
          </p>
          <h3 style={{ ...h2Style, fontSize: 'var(--text-base)', margin: '0 0 8px' }}>
            Replacing the plates every three years turns a one-time alloy sale into recurring demand
          </h3>
          <p style={{ ...pStyle, margin: 0 }}>
            We modeled the unit economics to check the model held. The rental price clears a 25% margin over operating cost, and the largest cost line is plate replacement, which is where ATI's alloy goes. That cycle is the reason the model works for ATI specifically.
          </p>
        </div>
      </>
    ),
  },
  {
    tags: ['Recommendation System', 'Concept'],
    title: 'Course Compass',
    desc: 'An AI-assisted course discovery concept that helps students identify curriculum paths based on goals, constraints, and prior knowledge.',
    img: '/course-compass-thumbnail.png',
    imgAlt: 'Course Compass — AI course discovery concept',
    href: '#',
    comingSoon: true,
  },
]

interface CardProps {
  project: Project
  dimmed: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onOpenModal: (project: Project) => void
}

function ProjectCard({ project, dimmed, onMouseEnter, onMouseLeave, onOpenModal }: CardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, fromRight: false, fromBottom: false })

  const hasModal = !!project.modalContent
  const isClickable = hasModal || (!project.comingSoon && project.href !== '#')
  const activate = () => {
    if (hasModal) onOpenModal(project)
    else if (isClickable) window.location.hash = project.href.replace('#', '')
  }

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
        cursor: isClickable ? 'pointer' : 'default',
        opacity: dimmed ? 0.45 : 1,
        transition: `border-color var(--duration-hover) var(--ease-standard), opacity 0.3s ease-out`,
      }}
      onClick={activate}
      role={isClickable ? (hasModal ? 'button' : 'link') : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={e => { if (isClickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); activate() } }}
      aria-label={hasModal ? `View project: ${project.title}` : project.comingSoon ? `${project.title} — coming soon` : `View case study: ${project.title}`}
      onMouseEnter={() => { setIsHovered(true); onMouseEnter() }}
      onMouseLeave={() => { setIsHovered(false); onMouseLeave() }}
      onMouseMove={e => {
        if (!project.comingSoon) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setCursorPos({ x, y, fromRight: x > rect.width / 2, fromBottom: y > rect.height / 2 })
      }}
    >
      {project.comingSoon && isHovered && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: cursorPos.x,
            top: cursorPos.y,
            transform: `translate(${cursorPos.fromRight ? 'calc(-100% - 14px)' : '14px'}, ${cursorPos.fromBottom ? 'calc(-100% - 14px)' : '14px'})`,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'var(--color-text-title)',
            color: 'var(--color-surface-page)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 'var(--text-xs)',
            letterSpacing: '.06em',
            textTransform: 'uppercase' as const,
            padding: '6px 10px',
            borderRadius: 'var(--radius-lg)',
            whiteSpace: 'nowrap',
          }}
        >
          Coming soon
        </span>
      )}
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
            /* Same themed background on every card's thumbnail — including full-bleed covers whose image is scaled down (imgScale), which otherwise leaves the card's own background showing through the gap around the shrunk image instead of this one. */
            background: 'var(--color-surface-card)',
            opacity: project.img && imgLoaded && !project.imgContained && !project.imgScale ? 0 : 1,
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
              transform: project.imgScale ? `scale(${isHovered ? 0.8 : project.imgScale})` : undefined,
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
  const [conceptHoveredIndex, setConceptHoveredIndex] = useState<number | null>(null)
  const [modalProject, setModalProject] = useState<Project | null>(null)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface-page)',
        transition: 'var(--transition-theme)',
      }}
    >
      <div className="layout-content layout-content--centered" style={{ padding: '120px var(--space-12) 88px' }}>
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
              onOpenModal={setModalProject}
            />
          ))}
        </div>

        <section style={{ marginTop: 'var(--space-16)' }}>
          <span
            style={{
              display: 'block',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-eyebrow)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '.12em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-meta)',
              transition: 'var(--transition-theme)',
            }}
          >
            Other Projects & Concepts
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: '1fr', gap: 'var(--space-6)' }}>
            {conceptProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                dimmed={conceptHoveredIndex !== null && conceptHoveredIndex !== i}
                onMouseEnter={() => setConceptHoveredIndex(i)}
                onMouseLeave={() => setConceptHoveredIndex(null)}
                onOpenModal={setModalProject}
              />
            ))}
          </div>
        </section>
      </div>

      <Modal open={!!modalProject} onClose={() => setModalProject(null)}>
        {modalProject?.modalContent}
      </Modal>
    </div>
  )
}
