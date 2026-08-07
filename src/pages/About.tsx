import { useState, useEffect, useRef } from 'react'
import LandingSidebar from '../components/layout/LandingSidebar'
import { useTheme } from '../context/ThemeContext'

const toolkit = [
  {
    icon: '/assets/media/about/complexity.svg',
    title: 'Translate Complexity',
    desc: 'I have a knack for breaking down complex problems into a clear set of knowns and unknowns.',
  },
  {
    icon: '/assets/media/about/rapid.svg',
    title: 'Rapid Iteration',
    desc: 'I explore and test ideas early — it’s the most efficient way to find what actually works.',
  },
  {
    icon: '/assets/media/about/systems.svg',
    title: 'Systems & Product Thinking',
    desc: 'I think holistically about product and business, not just design.',
  },
  {
    icon: '/assets/media/about/storytelling.svg',
    title: 'Visual Storytelling',
    desc: 'I transform complex concepts into visually compelling narratives.',
  },
]

const principles = [
  {
    icon: '/assets/media/about/people.svg',
    title: 'People',
    desc: 'Listen and learn from the people you design for and the people you build with.',
  },
  {
    icon: '/assets/media/about/peripheries.svg',
    title: 'Peripheries',
    desc: 'Design for a better life for all, and not just a few.',
  },
  {
    icon: '/assets/media/about/passion.svg',
    title: 'Passion',
    desc: 'Be passionate about what you’re solving for, and care about the details.',
  },
]

const values = [
  {
    title: 'Curiosity & strength',
    desc: 'I ask what no one else seems willing to. Getting here meant I stopped relying on the world around me to feel secure, and started building that security within my own thinking.',
  },
  {
    title: 'Experiences & learning',
    desc: 'I keep an open mind to learn from diverse stories, past and present. Through them I’m invited to experiences and lessons I could never have imagined.',
  },
  {
    title: 'Intuitions & taste',
    desc: 'Intuition is the outcome of reflection and introspection; taste is a sacred quality of a person. Both are strengths I actively cultivate.',
  },
]

const NUM_LAYERS = 6
const VIDEO_SRC = '/assets/media/hologram/head.webm'
// Head: 260×320 scaled to 60% → 156×192. Emitter: 140×96 scaled to 60% → 84×58.
const HEAD_W = 156, HEAD_H = 192
const EMIT_W = 84,  EMIT_H = 58

function HoloAvatar() {
  const { theme } = useTheme()
  const headRef  = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(NUM_LAYERS).fill(null))
  const rafRef   = useRef<number>(0)
  const targetX  = useRef(0), targetY = useRef(0)
  const currentX = useRef(0), currentY = useRef(0)
  const [isEmitting, setIsEmitting] = useState(false)
  const [isLoaded,   setIsLoaded]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsEmitting(true), 300)
    const t2 = setTimeout(() => setIsLoaded(true), 1350)

    const onMove = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth  - 0.5) * 2
      targetY.current = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08
      currentY.current += (targetY.current - currentY.current) * 0.08
      const cx = currentX.current, cy = currentY.current

      if (headRef.current) {
        headRef.current.style.transform =
          `rotateY(${(cx * 25).toFixed(2)}deg) translateX(${(-cx * 3).toFixed(2)}px) rotateX(${(-cy * 10).toFixed(2)}deg)`
      }
      for (let i = 0; i < NUM_LAYERS - 1; i++) {
        const v = videoRefs.current[i]
        if (!v) continue
        const factor = (NUM_LAYERS - 1 - i) / (NUM_LAYERS - 1)
        v.style.transform =
          `translate3d(${(-cx * 35 * factor).toFixed(2)}px, ${(-cy * 7.35 * factor).toFixed(2)}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Light mode: use a very light blue so multiply doesn't darken the face.
  // Dark mode: use the site accent (medium blue) for a luminous glow via screen.
  const holoColor = theme === 'dark' ? 'var(--color-accent)' : 'var(--color-highlight-bg)'

  const ghostStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'contain', objectPosition: '50% 38%',
    display: 'block',
    filter: 'saturate(0) blur(0.75px) brightness(130%) contrast(180%)',
    mixBlendMode: 'multiply',
    transition: 'transform 0.1s ease-out',
  }

  const frontVideoStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'contain', objectPosition: '50% 38%',
    display: 'block',
    opacity: 0.6,
    filter: isLoaded
      ? 'saturate(0) brightness(100%) contrast(200%)'
      : 'saturate(0) blur(1.75px) brightness(130%) contrast(180%)',
    mixBlendMode: 'multiply',
    transition: isLoaded
      ? 'transform 0.1s ease-out, filter 0.3s ease 0.8s'
      : 'transform 0.1s ease-out',
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isEmitting ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Head — horizontally and vertically centered */}
      <div
        ref={headRef}
        style={{
          position: 'relative',
          width: `${HEAD_W}px`, height: `${HEAD_H}px`,
          transformOrigin: '50% 40%',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
        }}
      >
        {[0.5, 0.5, 0.6, 0.7, 0.7].map((opacity, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el }}
            src={VIDEO_SRC}
            autoPlay loop muted playsInline
            style={{ ...ghostStyle, opacity }}
          />
        ))}

        {/* Front layer */}
        <div
          style={{
            position: 'absolute', inset: 0,
            zIndex: 20,
            background: holoColor,
            maskImage: 'radial-gradient(ellipse 75% 55% at 50% 38%, black 28%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 55% at 50% 38%, black 28%, transparent 75%)',
          }}
        >
          <video
            ref={el => { videoRefs.current[5] = el }}
            src={VIDEO_SRC}
            autoPlay loop muted playsInline
            style={frontVideoStyle}
          />
        </div>

        {/* Scanlines */}
        <div
          style={{
            position: 'absolute', inset: 0,
            zIndex: 25, pointerEvents: 'none',
            background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.032) 0px, rgba(0,0,0,0.032) 1px, transparent 1px, transparent 3px)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
          }}
        />
      </div>

      {/* Emitter — pinned to bottom-center of the left column */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${EMIT_W}px`, height: `${EMIT_H}px`,
          background: holoColor,
          clipPath: 'polygon(0 0, 100% 0, 65% 100%, 35% 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          opacity: 0.5,
          transition: 'var(--transition-theme)',
        }}
      />
    </div>
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border-hair)',
        paddingBottom: '18px',
        marginBottom: '32px',
        transition: 'var(--transition-theme)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          color: 'var(--color-text-body)',
          fontWeight: 500,
          transition: 'var(--transition-theme)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function IconCard({
  icon,
  title,
  desc,
  hovered,
  onEnter,
  onLeave,
  iconSize = 46,
}: {
  icon: string
  title: string
  desc: string
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
  iconSize?: number
}) {
  return (
    <div
      style={{
        background: 'var(--color-surface-page)',
        border: `1px solid ${hovered ? 'var(--color-surface-card)' : 'var(--color-border-hair)'}`,
        borderRadius: 'var(--radius-card)',
        padding: '26px',
        cursor: 'default',
        transition: `var(--transition-theme), border-color var(--duration-fast) var(--ease-standard)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          marginBottom: '20px',
          overflow: 'hidden',
        }}
      >
        <img
          src={icon}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
            transition: `transform var(--duration-hover) var(--ease-standard)`,
          }}
        />
      </div>
      <div
        style={{
          fontSize: '17px',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--color-text-title)',
          marginBottom: '10px',
          transition: 'var(--transition-theme)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '14px',
          lineHeight: 1.55,
          color: 'var(--color-text-secondary)',
          transition: 'var(--transition-theme)',
        }}
      >
        {desc}
      </div>
    </div>
  )
}

function ValueCard({
  title,
  desc,
  hovered,
  onEnter,
  onLeave,
}: {
  title: string
  desc: string
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      style={{
        background: 'var(--color-surface-page)',
        border: `1px solid ${hovered ? 'var(--color-surface-card)' : 'var(--color-border-hair)'}`,
        borderRadius: 'var(--radius-card)',
        padding: '26px',
        cursor: 'default',
        transition: `var(--transition-theme), border-color var(--duration-fast) var(--ease-standard)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        style={{
          fontSize: '17px',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--color-text-title)',
          marginBottom: '10px',
          transition: 'var(--transition-theme)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '14px',
          lineHeight: 1.55,
          color: 'var(--color-text-secondary)',
          transition: 'var(--transition-theme)',
        }}
      >
        {desc}
      </div>
    </div>
  )
}

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-text-meta)',
  marginBottom: '6px',
  transition: 'var(--transition-theme)',
}

export default function About() {
  const [toolkitHover, setToolkitHover] = useState<number | null>(null)
  const [principlesHover, setPrinciplesHover] = useState<number | null>(null)
  const [valuesHover, setValuesHover] = useState<number | null>(null)

  const bio: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: 1.65,
    color: 'var(--color-text-secondary)',
    margin: '0 0 18px',
    transition: 'var(--transition-theme)',
  }

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
          <div className="layout-content">

            {/* ── Hero identity card ── */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                border: '1px solid var(--color-border-hair)',
                borderRadius: 'var(--radius-project-card)',
                overflow: 'hidden',
                marginBottom: '56px',
                transition: 'var(--transition-theme)',
              }}
            >
              {/* Left — hologram avatar */}
              <div
                style={{
                  position: 'relative',
                  background: 'var(--color-surface-card)',
                  borderRight: '1px solid var(--color-border-hair)',
                  minHeight: '360px',
                  overflow: 'hidden',
                  transition: 'var(--transition-theme)',
                }}
              >
                <HoloAvatar />
              </div>

              {/* Right — name / role / previously / education */}
              <div
                style={{
                  padding: '40px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '28px',
                  background: 'var(--color-surface-card)',
                  transition: 'var(--transition-theme)',
                }}
              >
                {/* Name + pronouns */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'var(--color-text-title)',
                        letterSpacing: '-0.01em',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      Sai Vidyasri Giridharan
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                        color: 'var(--color-accent)',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      she/her
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '6px',
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    Product &amp; systems designer
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--color-text-meta)',
                      marginTop: '3px',
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    Designing for 5+ years
                  </div>
                </div>

                {/* Previously at */}
                <div>
                  <div style={monoLabel}>Previously at</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '15px',
                      color: 'var(--color-text-title)',
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    Fidelity Investments
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div style={monoLabel}>Education</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      color: 'var(--color-text-body)',
                      lineHeight: 1.6,
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    MS, Product &amp; Service Innovation — Carnegie Mellon
                    <br />
                    M.Des, Human-Centered Design — SMI, India
                  </div>
                </div>
              </div>
            </section>

            {/* ── Bio ── */}
            <section style={{ maxWidth: '660px', marginBottom: '64px' }}>
              <p style={bio}>
                I design end-to-end product solutions to be intuitive and delightful. Along the way,
                I like having a good time with the people I build them with.
              </p>
              <p style={bio}>
                I studied biotechnology &amp; bioinformatics. Before UX design, I was an analyst in
                pharmaceutical R&amp;D, where I helped build{' '}
                <span
                  style={{
                    background: 'var(--color-highlight-bg)',
                    color: 'var(--color-highlight-text)',
                    padding: '1px 5px',
                    borderRadius: 'var(--radius-highlight)',
                    transition: 'var(--transition-theme)',
                  }}
                >
                  seewise
                </span>{' '}
                &mdash; a tool to manage and visualise clinical trial data. That was my window into
                UX &amp; design.
              </p>
              <p style={{ ...bio, margin: 0 }}>
                Outside of work, I enjoy exploring new dishes, watching cooking videos, doodling
                comics from my childhood, reading, and occasionally painting. I&rsquo;m learning to
                grow into adulthood while keeping my inner child alive.
              </p>
            </section>

            {/* ── Toolkit ── */}
            <section style={{ marginBottom: '60px' }}>
              <SectionHeader label="My Toolkit" />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                {toolkit.map((item, i) => (
                  <IconCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    hovered={toolkitHover === i}
                    onEnter={() => setToolkitHover(i)}
                    onLeave={() => setToolkitHover(null)}

                  />
                ))}
              </div>
            </section>

            {/* ── Ethics & Principles ── */}
            <section style={{ marginBottom: '60px' }}>
              <SectionHeader label="Ethics & Principles" />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                }}
              >
                {principles.map((item, i) => (
                  <IconCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    hovered={principlesHover === i}
                    onEnter={() => setPrinciplesHover(i)}
                    onLeave={() => setPrinciplesHover(null)}
                    iconSize={64}
                  />
                ))}
              </div>
            </section>

            {/* ── Current Values ── */}
            <section style={{ marginBottom: '24px' }}>
              <SectionHeader label="Current Values" />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                }}
              >
                {values.map((item, i) => (
                  <ValueCard
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                    hovered={valuesHover === i}
                    onEnter={() => setValuesHover(i)}
                    onLeave={() => setValuesHover(null)}

                  />
                ))}
              </div>
            </section>

          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
