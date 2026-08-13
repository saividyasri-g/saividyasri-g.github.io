import { useState, type ReactNode } from 'react'
import HoloAvatar from '../components/HoloAvatar'

interface LabTile {
  tags: string[]
  desc: string
  href?: string
  /** Static image thumbnail. */
  thumb?: string
  /** Live component thumbnail (e.g. the hologram effect) — takes precedence over `thumb`. */
  thumbNode?: ReactNode
  thumbAspect?: string
  /** Small glyph shown above the tags row, for cards with no real screenshot to use as a thumbnail (e.g. agent tiles). */
  icon?: string
}

const cardBg = 'var(--color-surface-sidebar)'

/** Flat grey card — no border, matches the Lab mockup's look (distinct from Work's white bordered ProjectCard). */
function LabCard({ tile }: { tile: LabTile }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const hasThumb = !!(tile.thumbNode || tile.thumb)
  const clickable = !!tile.href

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: cardBg,
    borderRadius: 'var(--radius-project-card)',
    textDecoration: 'none',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'var(--transition-theme)',
  }

  const content = (
    <>
      {hasThumb && (
        <div
          style={{
            position: 'relative',
            aspectRatio: tile.thumbAspect ?? '1 / 1',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'var(--color-surface-card)',
            transition: 'var(--transition-theme)',
          }}
        >
          {tile.thumbNode ?? (
            <img
              src={tile.thumb}
              alt=""
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
      )}

      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {tile.icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-surface-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              transition: 'var(--transition-theme)',
            }}
          >
            {/* Recolored via CSS mask (not <img>) so the glyph follows the theme's text color instead of the SVG's hardcoded dark fill. */}
            <div
              role="img"
              aria-label=""
              style={{
                width: '22px',
                height: '22px',
                background: 'var(--color-text-title)',
                maskImage: `url(${tile.icon})`,
                WebkitMaskImage: `url(${tile.icon})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                transition: 'var(--transition-theme)',
              }}
            />
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '14px' }}>
          {tile.tags.map(tag => (
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
        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.55,
            fontWeight: 400,
            color: 'var(--color-text-title)',
            margin: 0,
            transition: 'var(--transition-theme)',
          }}
        >
          {tile.desc}
        </p>
      </div>
    </>
  )

  if (!clickable) {
    return <div style={cardStyle}>{content}</div>
  }

  return (
    <a href={tile.href} target="_blank" rel="noopener noreferrer" className="fill-btn fill-btn--subtle" style={cardStyle}>
      {content}
    </a>
  )
}

export default function Lab() {
  const colGap = 'var(--space-6)'

  // Column 1 (top block)
  const holoTile: LabTile = {
    tags: ['CSS', 'Vibe-code'],
    desc: 'I made a css-layered hologram inspired from Kyle Turman’s website. It’s pretty cool css trick.',
    thumbNode: (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <HoloAvatar />
      </div>
    ),
  }
  const researchAgentTile: LabTile = {
    tags: ['Claude Code'],
    desc: 'A second agent for deeper company or domain research based on my rules and hands me a good material before conversations.',
    href: 'https://github.com/saividyasri-g/company-intel',
    icon: '/agent.svg',
  }

  // Column 2 (top block)
  const scraperAgentTile: LabTile = {
    tags: ['Claude Code'],
    desc: 'A job-scraper agent I built for myself - pulls listings, adds company intel, tracks applications. Seems like a necessity in 2026.',
    href: 'https://github.com/saividyasri-g/job-scraper',
    icon: '/agent.svg',
  }
  const screenprintTile: LabTile = {
    tags: ['Visual Effect'],
    desc: 'I explored screen print effect on images. Combining this with hologram trick led to some good outputs.',
    thumb: '/experiments/screenprint-thumb.png',
  }

  // Bottom row
  const comicsTile: LabTile = {
    tags: ['Illustration'],
    desc: 'I create comic illustrations in a weirdly ugly-cute aesthetic. An ongoing side thing',
    thumb: '/lab/comics.png',
    thumbAspect: '2 / 3',
  }
  const paintingTile: LabTile = {
    tags: ['Painting'],
    desc: 'Painting was one of the many classes my mom signed me up for as a kid, and one of the few that stuck. Lately, trying to pick it back up.',
    thumb: '/lab/painting.png',
    thumbAspect: '4 / 3',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface-page)',
        transition: 'var(--transition-theme)',
      }}
    >
      <div className="layout-content layout-content--centered" style={{ padding: '120px var(--space-12) 88px' }}>
        <h1
          style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 1.4,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            margin: '0 0 8px',
            color: 'var(--color-text-title)',
            transition: 'var(--transition-theme)',
          }}
        >
          Laboratory
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.55,
            fontWeight: 400,
            color: 'var(--color-text-secondary)',
            margin: '0 0 var(--space-10)',
            transition: 'var(--transition-theme)',
          }}
        >
          In-progress experiments, agents I've built for myself, and things I make by hand.
        </p>

        {/* Top block — two independent flex columns (not a row-locked grid), so each stack's total height is free to differ. */}
        <div style={{ display: 'flex', gap: colGap }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: colGap }}>
            <LabCard tile={holoTile} />
            <LabCard tile={researchAgentTile} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: colGap }}>
            <LabCard tile={scraperAgentTile} />
            <LabCard tile={screenprintTile} />
          </div>
        </div>

        {/* Bottom row — comics narrower, painting wider. */}
        <div style={{ display: 'flex', gap: colGap, marginTop: colGap }}>
          <div style={{ flex: '1' }}>
            <LabCard tile={comicsTile} />
          </div>
          <div style={{ flex: '1.8' }}>
            <LabCard tile={paintingTile} />
          </div>
        </div>
      </div>
    </div>
  )
}
