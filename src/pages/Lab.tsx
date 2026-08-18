import { useState, type ReactNode } from 'react'
import HoloAvatar from '../components/HoloAvatar'
import Footer from '../components/ui/Footer'

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
    <a href={tile.href} target="_blank" rel="noopener noreferrer" className="fill-btn fill-btn--subtle fill-btn--card" style={cardStyle}>
      {content}
    </a>
  )
}

const SHUFFLE_S = 1.2
const LIFT_SCALE = 1.18

/** Painting photos laid out like a fanned-out stack of cards — centered, rotated outward from the middle image, middle image on top. Hovering a card that's peeking out from behind shuffles it to front: it lifts, carries over to the front slot, and settles back down — all one continuous `@keyframes` timeline (`painting-card-to-front` in index.css) rather than several transitions stitched together in JS, so the motion doesn't step between phases. The other cards in the stack ease over to their new offsets on a plain `transition` at the same time. */
function FannedPhotos({ images }: { images: string[] }) {
  const [order, setOrder] = useState(images)
  const [lift, setLift] = useState<{ src: string; fromX: number; fromRot: number } | null>(null)

  const bringToFront = (src: string) => {
    if (lift) return
    const mid = (order.length - 1) / 2
    const fromIndex = order.indexOf(src)
    if (fromIndex === mid) return
    const fromOffset = fromIndex - mid
    setLift({ src, fromX: fromOffset * 56, fromRot: fromOffset * 9 })
    setOrder(prev => {
      const rest = prev.filter(s => s !== src)
      const insertAt = Math.floor(rest.length / 2)
      return [...rest.slice(0, insertAt), src, ...rest.slice(insertAt)]
    })
  }

  const mid = (order.length - 1) / 2

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {order.map((src, i) => {
        const offset = i - mid
        const isLifting = lift?.src === src

        const style: React.CSSProperties = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '52%',
          aspectRatio: '4 / 5',
          zIndex: isLifting ? order.length + 1 : order.length - Math.abs(offset),
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          border: '4px solid #fff',
          boxShadow: isLifting ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 24px rgba(0,0,0,0.2)',
        }

        if (isLifting && lift) {
          Object.assign(style, {
            '--from-x': `${lift.fromX}px`,
            '--from-rot': `${lift.fromRot}deg`,
            '--to-x': `${offset * 56}px`,
            '--to-rot': `${offset * 9}deg`,
            '--lift-scale': LIFT_SCALE,
            animation: `painting-card-to-front ${SHUFFLE_S}s var(--ease-standard) forwards`,
          })
        } else {
          style.transform = `translate(-50%, -50%) translateX(${offset * 56}px) rotate(${offset * 9}deg) scale(1)`
          style.transition = `transform ${SHUFFLE_S}s var(--ease-standard), box-shadow ${SHUFFLE_S}s var(--ease-standard)`
        }

        return (
          <div
            key={src}
            className="painting-card"
            onMouseEnter={() => bringToFront(src)}
            onAnimationEnd={() => setLift(cur => (cur?.src === src ? null : cur))}
            style={style}
          >
            <img
              src={src}
              alt=""
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default function Lab() {
  const colGap = 'var(--space-6)'

  // Column 1 (top block)
  const holoTile: LabTile = {
    tags: ['CSS', 'Vibe-code'],
    desc: 'I made a css-layered hologram inspired from Kyle Turman’s website. It’s a pretty cool css trick.',
    thumbNode: (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <HoloAvatar />
      </div>
    ),
    // Shorter than the default 1/1 square — trims the column so this card's stack
    // bottoms out flush with the Visual Effect card at the bottom of column 2.
    thumbAspect: '15 / 14',
    href: '/experiments/hologram/index.html',
  }
  const researchAgentTile: LabTile = {
    tags: ['Claude Code'],
    desc: 'A second agent for deeper company or domain research based on my rules and hands me a good material before conversations.',
    href: 'https://github.com/saividyasri-g/company-intel',
    icon: '/icons/agent.svg',
  }

  // Column 2 (top block)
  const scraperAgentTile: LabTile = {
    tags: ['Claude Code'],
    desc: 'A job-scraper agent I built for myself - pulls listings, adds company intel, tracks applications. Seems like a necessity in 2026.',
    href: 'https://github.com/saividyasri-g/job-scraper',
    icon: '/icons/agent.svg',
  }
  const screenprintTile: LabTile = {
    tags: ['Visual Effect'],
    desc: 'I explored screen print effect on images. Combining this with hologram trick led to some good outputs.',
    thumb: '/experiments/screenprint-thumb.png',
    href: '/experiments/screenprint/index.html',
  }

  // Bottom row
  const comicsTile: LabTile = {
    tags: ['Illustration'],
    desc: 'I create comic illustrations in a weirdly ugly-cute aesthetic. An ongoing side thing.',
    thumb: '/comic.jpeg',
    thumbAspect: '2 / 3',
    href: 'https://www.instagram.com/imafartisttoo/',
  }
  const paintingTile: LabTile = {
    tags: ['Painting'],
    desc: 'Painting was one of the many classes my mom signed me up for as a kid, and one of the few that stuck. Lately, trying to pick it back up.',
    thumbNode: (
      <FannedPhotos images={['/painting/IMG_7703.jpeg', '/painting/IMG_7704.jpeg', '/painting/IMG_7705.jpeg']} />
    ),
    // Taller than 4/3 — bottoms this card out flush with the Illustration
    // card beside it in the bottom row.
    thumbAspect: '6 / 5',
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
        <h1
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.4,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            margin: '0 0 var(--space-3)',
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
        <Footer />
      </div>
    </div>
  )
}
