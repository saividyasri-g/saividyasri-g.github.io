import { useState } from 'react'
import Card from '../components/ui/Card'
import HoloAvatar from '../components/HoloAvatar'

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
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
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
    <Card
      style={{
        border: `1px solid ${hovered ? 'var(--color-border-hair-hover)' : 'var(--color-border-hair)'}`,
        padding: '20px',
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
          fontSize: 'var(--text-base)',
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
          fontSize: 'var(--text-sm)',
          lineHeight: 1.55,
          color: 'var(--color-text-secondary)',
          transition: 'var(--transition-theme)',
        }}
      >
        {desc}
      </div>
    </Card>
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
    <Card
      style={{
        border: `1px solid ${hovered ? 'var(--color-border-hair-hover)' : 'var(--color-border-hair)'}`,
        padding: '20px',
        cursor: 'default',
        transition: `var(--transition-theme), border-color var(--duration-fast) var(--ease-standard)`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        style={{
          fontSize: 'var(--text-base)',
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
          fontSize: 'var(--text-sm)',
          lineHeight: 1.55,
          color: 'var(--color-text-secondary)',
          transition: 'var(--transition-theme)',
        }}
      >
        {desc}
      </div>
    </Card>
  )
}

export default function About() {
  const [toolkitHover, setToolkitHover] = useState<number | null>(null)
  const [principlesHover, setPrinciplesHover] = useState<number | null>(null)
  const [valuesHover, setValuesHover] = useState<number | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const [emailHovered, setEmailHovered] = useState(false)

  const bio: React.CSSProperties = {
    fontSize: 'var(--text-base)',
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
      <div className="layout-content layout-content--centered page-outer-pad" style={{ padding: '120px var(--space-12) 88px' }}>

            {/* ── Intro ── */}
            <section style={{ maxWidth: '660px', marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
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
                  Hi! I'm Sai
                </h1>
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    transition: 'var(--transition-theme)',
                  }}
                >
                  (/sai/ &mdash; rhymes with &ldquo;hi&rdquo;)
                </span>
              </div>

              <p style={bio}>
                I design end-to-end digital product solutions to be intuitive. Along the way,
                I like having a good time with the people I build them with.
                I studied biotechnology &amp; bioinformatics. Before design, I was an analyst in
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
                Outside of work, I enjoy exploring new recipes, watching cooking videos, doodling
                comics from my childhood, reading, and occasionally painting. I&rsquo;m learning to
                grow into adulthood while keeping my inner child alive.
              </p>
            </section>

            {/* ── Identity card ── */}
            <section
              className="about-identity-card"
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
                className="about-identity-avatar"
                style={{
                  position: 'relative',
                  background: 'var(--color-surface-card)',
                  borderRight: '1px solid var(--color-border-hair)',
                  overflow: 'hidden',
                  transition: 'var(--transition-theme)',
                }}
              >
                <HoloAvatar />
              </div>

              {/* Right — name / role / previously / education */}
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: '28px',
                  background: 'var(--color-surface-card)',
                  transition: 'var(--transition-theme)',
                }}
              >
                {/* Name + pronouns */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 400,
                        color: 'var(--color-text-title)',
                        letterSpacing: '-0.01em',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      Sai Vidyasri Giridharan
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      she/her
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-accent)',
                      marginTop: '6px',
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    Designing for 4+ years
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    MS, Product &amp; Service Innovation @ Carnegie Mellon University
                    <br />
                    M.Des, Human-Centered Design @ SMI, India
                  </div>
                </div>

                {/* Contact — icon + handle links, matches the identity card's info-row style */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                  {[
                    {
                      label: 'LinkedIn',
                      href: 'https://www.linkedin.com/in/sai-vidyasri-giridharan-a98270146/',
                      icon: '/icons/linkedin.svg',
                    },
                    {
                      label: 'GitHub',
                      href: 'https://github.com/saividyasri-g',
                      icon: '/icons/github.svg',
                    },
                    {
                      label: 'vidya1997@gmail.com',
                      href: 'mailto:vidya1997@gmail.com',
                      icon: '/icons/mail.svg',
                    },
                  ].map(contact => (
                    /* Hover treatment matches the Work/Lab/About nav tabs (NavLinks.tsx): same fill-btn/--subtle classes, same mechanism — the sweep itself has no radius, it's clipped by this element's own overflow:hidden + border-radius, so it automatically matches whatever radius the element has. The fill-btn lives on this outer span (not the <a>) so the copy button sits inside the same fill as the link, not beside it. */
                    <span
                      key={contact.label}
                      className="fill-btn fill-btn--subtle"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        margin: '-4px -8px',
                        borderRadius: 'var(--radius-lg)',
                        transition: 'var(--transition-theme)',
                      }}
                      onMouseEnter={() => { if (contact.icon === '/icons/mail.svg') setEmailHovered(true) }}
                      onMouseLeave={() => { if (contact.icon === '/icons/mail.svg') setEmailHovered(false) }}
                    >
                      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <a
                          href={contact.href}
                          target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={contact.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                          }}
                        >
                          {/* Recolored via CSS mask + currentColor so the glyph follows this link's color — theme-aware at rest. */}
                          <span
                            role="img"
                            aria-label=""
                            style={{
                              display: 'block',
                              width: '15px',
                              height: '15px',
                              flexShrink: 0,
                              background: 'currentColor',
                              maskImage: `url(${contact.icon})`,
                              WebkitMaskImage: `url(${contact.icon})`,
                              maskSize: 'contain',
                              WebkitMaskSize: 'contain',
                              maskRepeat: 'no-repeat',
                              WebkitMaskRepeat: 'no-repeat',
                              maskPosition: 'center',
                              WebkitMaskPosition: 'center',
                            }}
                          />
                          {contact.label}
                        </a>
                        {contact.icon === '/icons/mail.svg' && (
                          /* Always mounted (space reserved even when hidden) so its appearance on hover never changes this row's wrap/height. */
                          <button
                            type="button"
                            aria-label={emailCopied ? 'Email address copied' : 'Copy email address'}
                            tabIndex={emailHovered ? 0 : -1}
                            onClick={() => {
                              navigator.clipboard.writeText('vidya1997@gmail.com')
                              setEmailCopied(true)
                              window.setTimeout(() => setEmailCopied(false), 1500)
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '22px',
                              height: '22px',
                              padding: 0,
                              border: 'none',
                              background: 'none',
                              color: emailCopied ? 'var(--color-accent)' : 'var(--color-text-meta)',
                              cursor: 'pointer',
                              opacity: emailHovered ? 1 : 0,
                              pointerEvents: emailHovered ? 'auto' : 'none',
                              transition: 'color var(--duration-hover) var(--ease-standard), opacity var(--duration-hover) var(--ease-standard)',
                            }}
                            onMouseEnter={e => { if (!emailCopied) e.currentTarget.style.color = 'var(--color-accent)' }}
                            onMouseLeave={e => { if (!emailCopied) e.currentTarget.style.color = 'var(--color-text-meta)' }}
                          >
                            {emailCopied ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            )}
                          </button>
                        )}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Toolkit ── */}
            <section style={{ marginBottom: '60px' }}>
              <SectionHeader label="My Toolkit" />
              <div
                className="about-card-grid-2"
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
                className="about-card-grid-3"
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
                className="about-card-grid-3"
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
  )
}
