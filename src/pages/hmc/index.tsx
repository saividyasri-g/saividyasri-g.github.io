import type { ReactNode } from 'react'
import {
  Overview,
  Outline,
  Learning,
  Carousel,
  DiagramSection,
  CaseBadge,
  sectionStyle,
  h2Style,
  pStyle,
  eyebrowStyle,
  Block,
  ScenarioGroup,
  SectionDivider,
} from '../../components/case-study'
import Card from '../../components/ui/Card'

const outlineItems = [
  { id: 'context',          num: '', label: 'Context' },
  { id: 'why-it-mattered',  num: '', label: 'Why it mattered' },
  { id: 'scenario-01',      num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',      num: '', label: 'Problem · Solution 2' },
  { id: 'scenario-03',      num: '', label: 'Problem · Solution 3' },
  { id: 'scenario-04',      num: '', label: 'Problem · Solution 4' },
  { id: 'impact',           num: '', label: 'Impact' },
  { id: 'learnings',        num: '', label: 'Learnings' },
  { id: 'differently',      num: '', label: 'Do Differently' },
]

const overviewItems = [
  { label: 'Role',                       value: 'UX Designer & Team Lead' },
  { label: 'Team',                       value: '2 UX Designers, 2 Visual Designers' },
  { label: 'Timeline',                   value: '9 weeks' },
  { label: 'Design & Management Skills', value: 'Stakeholder communication and delivery management' },
]

const contextSlides = [
  { src: '/hmc/context-1.png', alt: 'Security guard at reception identifying customers', caption: '1. Security Guard at reception - identifying customers as they arrive.' },
  { src: '/hmc/context-2.png', alt: 'Service manager in the customer waiting lobby', caption: '2. Service Manager in the customer waiting lobby - engaging with customers.' },
  { src: '/hmc/context-3.png', alt: 'Service technician servicing vehicle on ramp', caption: '3. Service Technician on the workshop floor - repairing vehicles on ramps.' },
  { src: '/hmc/context-4.png', alt: 'Service manager processing payment and delivery', caption: '4. Service Manager at the checkout area - processing payment and delivery.' },
]

/* ── Inline helpers ───────────────────────────────────── */

function ImgStage({ label, aspectRatio = '16 / 10' }: { label: string; aspectRatio?: string }) {
  const stripes = 'repeating-linear-gradient(135deg, var(--color-stripe-a) 0px, var(--color-stripe-a) 8px, var(--color-stripe-b) 8px, var(--color-stripe-b) 16px)'
  return (
    <div
      style={{
        borderRadius: 'var(--radius-card)',
        border: '1px dashed var(--color-border-hair-hover)',
        background: stripes,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        aspectRatio,
        margin: '18px 0',
        transition: 'var(--transition-theme)',
      }}
      role="img"
      aria-label={label}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '.12em',
          textTransform: 'uppercase' as const,
          color: 'var(--color-text-meta)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/*
 * TOKEN GAP — amber draft color.
 * `rgba(200,150,0,x)` is hardcoded here because no --color-draft or yellow
 * token exists in tokens.css. Add --color-draft-border / --color-draft-bg if
 * this treatment is reused elsewhere, or accept it as a one-off.
 */
function TbdCallout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        borderLeft: '3px solid rgba(200,150,0,.38)',
        background: 'rgba(200,150,0,.05)',
        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
        padding: '12px 16px',
        margin: '16px 0',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '.18em',
          textTransform: 'uppercase' as const,
          color: 'rgba(160,120,0,.7)',
          display: 'block',
          marginBottom: '5px',
        }}
      >
        Draft
      </span>
      <p style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>{children}</p>
    </div>
  )
}

function ImpactItem({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '20px 1fr',
        gap: '12px',
        padding: '20px 0',
        borderBottom: '1px solid var(--color-border-hair)',
        transition: 'var(--transition-theme)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-faint)',
          lineHeight: 1.65,
          userSelect: 'none' as const,
        }}
      >
        —
      </span>
      <p style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>{children}</p>
    </div>
  )
}

/* ── Annotation helpers ───────────────────────────────── */

const dashedCard: React.CSSProperties = {
  borderRadius: 'var(--radius-card)',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23BEC1C3' stroke-width='0.6' stroke-dasharray='2%2c2'/%3e%3c/svg%3e")`,
  padding: '14px 16px',
}

function BeforeAnnotations() {
  const problemColor = '#BD0505'
  const costColor = '#7F5C16'
  const costFill = 'rgba(127,92,22,0.12)'
  const cols = [
    {
      problem: "Limited visibility into Technician's availability",
      description: 'Managers planned the vehicle-service first and checked workshop availability afterward, resulting in queued vehicles without an assigned technicians.',
      cost: 'Assignment overhead on every vehicle',
    },
    {
      problem: 'Reassignment relied on the manager remembering unassigned vehicles',
      description: 'Unassigned vehicles created a mental load for the manager, who had to track availability and reassign each one as technicians freed up',
      cost: 'Vehicles sat idle & turnaround time increased',
    },
    {
      problem: 'Deliveries promised against inaccurate availabilities',
      description: "Without visibility into the centre's real-time workload, delivery estimates were made on inaccurate assumptions.",
      cost: 'Delays surfaced at pickup led to customer dissatisfaction',
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: '16px' }}>
        <CaseBadge icon="/hmc/icons/problem.svg" label="Problem" color="#BD0505" />
        <CaseBadge icon="/hmc/icons/cost.svg" label="Business Cost" color="#7F5C16" />
      </div>
      <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', alignItems: 'stretch' }}>
        {cols.map((col, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...dashedCard, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '10px' }}>
                <img src="/hmc/icons/problem.svg" alt="" aria-hidden style={{ width: 14, height: 14, flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, lineHeight: 1.35, color: problemColor, transition: 'var(--transition-theme)' }}>
                  {col.problem}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--color-text-secondary)', transition: 'var(--transition-theme)' }}>
                {col.description}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)', marginTop: 'var(--space-5)' }}>
              <div style={{ width: 22, height: 22, borderRadius: 'var(--radius-full)', background: costFill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 3 }}>
                <img src="/hmc/icons/cost.svg" alt="" aria-hidden style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
              <span style={{ background: costFill, borderRadius: 'var(--radius-full)', padding: '3px 8px', fontSize: '13px', fontWeight: 500, lineHeight: 1.35, color: costColor, transition: 'var(--transition-theme)' }}>
                {col.cost}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RampBeforeAnnotations() {
  const problemColor = '#BD0505'
  const costColor = '#7F5C16'
  const costFill = 'rgba(127,92,22,0.12)'
  const cols = [
    {
      problem: 'The ramp plan showed assignments, and not progress',
      description: 'The view showed the planned assignments but service progress and delays were not captured, so the manager learned them by walking the floor.',
      cost: 'late discoveries of delays',
    },
    {
      problem: 'The ramp plan could not be changed from the tool',
      description: 'When a service ran over or a ramp freed up, reassignment of vehicle-services happened verbally on the floor.',
      cost: 'manual verbal hand off hours',
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: '16px' }}>
        <CaseBadge icon="/hmc/icons/problem.svg" label="Problem" color="#BD0505" />
        <CaseBadge icon="/hmc/icons/cost.svg" label="Business Cost" color="#7F5C16" />
      </div>
      <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)', alignItems: 'stretch' }}>
        {cols.map((col, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...dashedCard, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '10px' }}>
                <img src="/hmc/icons/problem.svg" alt="" aria-hidden style={{ width: 14, height: 14, flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, lineHeight: 1.35, color: problemColor, transition: 'var(--transition-theme)' }}>
                  {col.problem}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--color-text-secondary)', transition: 'var(--transition-theme)' }}>
                {col.description}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)', marginTop: 'var(--space-5)' }}>
              <div style={{ width: 22, height: 22, borderRadius: 'var(--radius-full)', background: costFill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 3 }}>
                <img src="/hmc/icons/cost.svg" alt="" aria-hidden style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
              <span style={{ background: costFill, borderRadius: 'var(--radius-full)', padding: '3px 8px', fontSize: '13px', fontWeight: 500, lineHeight: 1.35, color: costColor, transition: 'var(--transition-theme)' }}>
                {col.cost}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Problem3BeforeAnnotations() {
  const problemColor = '#BD0505'
  const costColor = '#7F5C16'
  const costFill = 'rgba(127,92,22,0.12)'
  const cols = [
    {
      problem: 'No data ranked the demands',
      description: "Waiting durations, stalled services, and finished-vehicle counts weren't captured anywhere. The manager responded to demands that were visible while the critical demands waited behind.",
      cost: 'turnaround time increased',
    },
    {
      problem: 'Customer waiting time was unknown',
      description: 'Tokens were issued on paper, without timestamps. Waiting time was unknowable from the moment a customer entered.',
      cost: 'customer dissatisfaction',
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: '16px' }}>
        <CaseBadge icon="/hmc/icons/problem.svg" label="Problem" color="#BD0505" />
        <CaseBadge icon="/hmc/icons/cost.svg" label="Business Cost" color="#7F5C16" />
      </div>
      <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)', alignItems: 'stretch' }}>
        {cols.map((col, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...dashedCard, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '10px' }}>
                <img src="/hmc/icons/problem.svg" alt="" aria-hidden style={{ width: 14, height: 14, flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, lineHeight: 1.35, color: problemColor, transition: 'var(--transition-theme)' }}>
                  {col.problem}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--color-text-secondary)', transition: 'var(--transition-theme)' }}>
                {col.description}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)', marginTop: 'var(--space-5)' }}>
              <div style={{ width: 22, height: 22, borderRadius: 'var(--radius-full)', background: costFill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 3 }}>
                <img src="/hmc/icons/cost.svg" alt="" aria-hidden style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
              <span style={{ background: costFill, borderRadius: 'var(--radius-full)', padding: '3px 8px', fontSize: '13px', fontWeight: 500, lineHeight: 1.35, color: costColor, transition: 'var(--transition-theme)' }}>
                {col.cost}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExploredAnnotations() {
  const constraintColor = 'rgba(194,111,23,0.85)'
  const pivotColor = 'rgba(107,114,128,0.9)'
  const pivotFill = 'rgba(107,114,128,0.10)'
  const cols = [
    {
      title: 'Next-day scheduling had no data to run on',
      body: "Shift ≠ availability. Technician's availability was only known on the day",
      resolution: 'Next-day scheduling dropped; pivoted to live tracking vehicle-service status',
    },
    {
      title: 'Integration across diverse systems was expensive',
      body: `Technician's "presence" data sat in systems (HR systems, DMS, biometric) varied by centre`,
      resolution: "Technician presence data collection moved into the Technician's app",
    },
    {
      title: 'Training and expertise was held out of scope',
      body: 'The signal needed skill data from a proposed training module which was not approved for MVP.',
      resolution: "Excluded from the decision-support signal, showcased poc's in Technician App",
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: '16px' }}>
        <CaseBadge icon="/hmc/icons/constraints.svg" label="Constraint" color="#C26F17" />
        <CaseBadge icon="/hmc/icons/pivots.svg" label="Pivot" color="#6B7280" />
      </div>
      <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', alignItems: 'stretch' }}>
        {cols.map((col, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...dashedCard, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '8px' }}>
                <img src="/hmc/icons/constraints.svg" alt="" aria-hidden style={{ width: 12, height: 12, flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, lineHeight: 1.35, color: constraintColor, transition: 'var(--transition-theme)' }}>
                  {col.title}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--color-text-secondary)', transition: 'var(--transition-theme)' }}>
                {col.body}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-1)', marginTop: 'var(--space-5)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 'var(--radius-full)', background: pivotFill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 3 }}>
                <img src="/hmc/icons/pivots.svg" alt="" aria-hidden style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
              </div>
              <span style={{ background: pivotFill, borderRadius: 'var(--radius-full)', padding: '3px 14px', fontSize: '13px', fontWeight: 500, lineHeight: 1.35, color: pivotColor, transition: 'var(--transition-theme)' }}>
                {col.resolution}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinalAnnotations() {
  const intentColor = 'rgba(15,124,102,0.9)'
  const cards = [
    {
      title: 'Login created the availability input at every centre',
      body: 'Technicians set availability and ramp at daily login. This gave every centre the same input, independent of the systems.',
    },
    {
      title: 'Service status provided a real-time visibility',
      body: 'Tagging and tracking service statuses such as unassigned, not started, ongoing, delayed provided real-time vehicle status.',
    },
  ]

  return (
    <div>
      <CaseBadge icon="/hmc/icons/intent.svg" label="Intent" color="#0F7C66" style={{ marginBottom: '16px' }} />
      <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)' }}>
        {cards.map((card, i) => (
          <div key={i} style={dashedCard}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '8px' }}>
              <img src="/hmc/icons/intent.svg" alt="" aria-hidden style={{ width: 12, height: 12, flexShrink: 0, marginTop: '3px' }} />
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, lineHeight: 1.35, color: intentColor, transition: 'var(--transition-theme)' }}>
                {card.title}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--color-text-secondary)', transition: 'var(--transition-theme)' }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────── */

export default function HeroMotoCorp() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-surface-page)',
        color: 'var(--color-text-body)',
        fontFamily: 'var(--font-sans)',
        transition: 'var(--transition-theme)',
      }}
    >

      {/* ── Hero / Title ── */}
      <section style={{ paddingTop: 'var(--space-10)' }}>
        <div className="layout-header-pad" style={{ padding: '0 var(--space-12)' }}>
        <img src="/hmc/casestudy_thumbnail.png" alt="Hero image — service dashboard on tablet + mobile" style={{ width: '100%', display: 'block', borderRadius: 'var(--radius-card)' }} />
        <div className="layout-content layout-content--centered layout-content--prose" style={{ marginTop: '32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '.09em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-secondary)',
              marginBottom: '22px',
              transition: 'var(--transition-theme)',
            }}
          >
            Hero MotoCorp · 2023
          </div>
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
            Vehicle Service Management Tools for Service Managers running two-wheeler service centres.
          </h1>
          <Overview items={overviewItems} />

          {/* ── Problem / Solution summary cards ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-10)',
              marginTop: 'var(--space-8)',
            }}
          >
            {/* Left: Problem Overview */}
            <Card>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '.12em',
                  color: 'var(--color-text-meta)',
                  display: 'block',
                  marginBottom: '14px',
                  transition: 'var(--transition-theme)',
                }}
              >
                Problem Overview
              </span>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.65,
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  transition: 'var(--transition-theme)',
                }}
              >
                A two-wheeler service centre ran on multiple staff roles working in physically separate zones. One of these roles, the service manager, managed the entire centre's operations. They relied on manually gathering information from each zone, which caused increased waiting times, vehicle idle time, and delayed deliveries.
              </p>
            </Card>

            {/* Right: Solution & Impact */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '.12em',
                    color: 'var(--color-text-meta)',
                    transition: 'var(--transition-theme)',
                  }}
                >
                  Solution &amp; Impact
                </span>
                <a
                  href="#scenario-01"
                  className="fill-btn fill-btn--subtle fill-btn--left"
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById('scenario-01')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '32px',
                    padding: '0 14px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 400,
                    background: 'transparent',
                    borderRadius: 'var(--radius-btn)',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: `border-color 0.4s var(--ease-standard), var(--transition-theme)`,
                  }}
                >
                  view solution
                </a>
              </div>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.65,
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  transition: 'var(--transition-theme)',
                }}
              >
                I led the design of service manager workflows and tools such as dashboard and workshop floor visualisation. Testing revealed that redesign IA and workflow cut documentation completion time by ~54%.{' '}
                The app is distributed across Hero MotoCorp's service dealership network, with 100K+ downloads on the Play Store (functionally gated to authorised dealers, so downloads track the intended workforce across 6,000+ centres).
              </p>
            </Card>
          </div>
        </div>
        </div>
      </section>

      {/* ── Sidebar + body grid ── */}
      <div className="layout-grid-body">
        <Outline
          items={outlineItems}
        />

        <main style={{ background: 'var(--color-surface-main)', minWidth: 0, transition: 'var(--transition-theme)' }}>
          <div className="layout-main-pad" style={{ padding: 'var(--space-10) var(--space-12) 60px' }}>
            <div className="layout-content layout-content--centered layout-content--prose">

            {/* ════════════════════════════════════════ */}
            {/* 01 CONTEXT                              */}
            {/* ════════════════════════════════════════ */}
            <section id="context" style={sectionStyle}>
              <Block
                eyebrow="Context"
                header="A two-wheeler service centre runs on multiple roles working across separate zones."
              >
                <p style={pStyle}>
                  A two-wheeler service centre is where customers bring their motorbikes and scooters for routine service and repairs. A typical centre runs on multiple staff roles working across physically separate zones:
                </p>
                <Carousel slides={contextSlides} autoPlayMs={3500} width="50%" />
              </Block>

              <Block
                header="The Service Manager is accountable for the service centre's operations starting from vehicle entry to delivery."
              >
                <p style={pStyle}>
                  Their operations span customer engagement and alignment, vehicle-service documentation, estimating service duration, assigning vehicles to technicians' ramps, assessing service quality, and processing payment through to checkout.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  Top three most important business goals were increasing the number of vehicles serviced, improving on-time vehicle-service delivery, and driving overall customer satisfaction.
                </p>
              </Block>

              <Block
                header="Because of siloed operations, the manager relied on manual information gathering & handoffs that caused vehicle-service delays and operational inefficiency."
              >
                <p style={pStyle}>
                  Each stage of the vehicle's journey happened in a different zone. Service Managers with limited visibility into other zones, physically moved between zones to coordinate the operations.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  They walked the workshop floor to find out which technicians were free, and relayed information verbally to technicians. They walked back to the lobby to update customers. This manual information gathering and handoff led to inefficient ramp utilization, increased customer waiting times, vehicle idle times, vehicle-service delays, and reduced customer satisfaction.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHY IT MATTERED                         */}
            {/* ════════════════════════════════════════ */}
            <section id="why-it-mattered" style={sectionStyle}>
              <Block
                eyebrow="Why it mattered"
                header="The Service Management Tool was Hero MotoCorp's initiative to improve business operations across 6,000+ service centres."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Hero MotoCorp's business depends on independent dealership service centres to drive post-sales revenue (parts, service, accessories) and customer loyalty. The Service Management Tool was Hero's initiative to streamline operations across 6,000+ service centres in India, alongside standard operating procedures (SOPs) to improve the numbers each dealership was accountable for.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* 03 SCENARIO 01 — ASSIGNING VEHICLES     */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-01">

              <DiagramSection
                wide={false}
                counter="Problem 1"
                stage="before"
                title="To assign a vehicle to a technician's ramp, the manager had to physically walk the workshop floor to find out who was free."
                description="Once a vehicle's service plan was documented, the service manager had to assign it to a technician's ramp for servicing. But the manager had no data on technician availability or workshop status, so they physically moved to the workshop floor to gather this information manually."
                tabs={[{
                  id: 'starting',
                  diagramTitle: "Technician assignment ran on floor-walks and the manager's memory",
                  diagramBadges: [{ icon: '/hmc/icons/friction.svg', label: 'Friction in workflow', color: '#BD0505' }],
                  diagram: <img src="/hmc/workflow-before.svg" alt="Starting point: manual technician assignment workflow" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />,
                  annotations: <BeforeAnnotations />,
                }]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 1A"
                title="A technician assignment workflow that pulled availability data into the manager's screen."
                description="I designed a workflow that let the manager assign a documented vehicle to a specific technician's ramp without leaving the tool."
                defaultTabId="final"
                tabs={[
                  {
                    id: 'explored',
                    label: 'Explored, not pursued',
                    diagramTitle: 'Next-day scheduling needed availability data that no system held',
                    diagramBadges: [
                      { icon: '/hmc/icons/redesign.svg', label: 'Redesigned workflow', color: '#0F7C66' },
                      { icon: '/hmc/icons/constraints.svg', label: 'Constraints', color: '#C26F17' },
                    ],
                    diagram: <img src="/hmc/explored.svg" alt="Explored workflow: next-day scheduling approach" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />,
                    annotations: <ExploredAnnotations />,
                  },
                  {
                    id: 'final',
                    label: 'Final workflow',
                    diagramTitle: 'Technician assignment ran on availability data the app collected',
                    diagramBadges: [{ icon: '/hmc/icons/redesign.svg', label: 'Redesigned workflow', color: '#0F7C66' }],
                    diagram: <img src="/hmc/workflow-after.svg" alt="Final redesigned technician assignment workflow" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />,
                    annotations: <FinalAnnotations />,
                  },
                ]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 1B · i"
                title="When a technician was available"
                description="Assignment happened inside vehicle-service planning."
                tabs={[{
                  id: '1b-i',
                  diagram: <img src="/hmc/technician_available.png" alt="Technician available — assignment flow annotated" style={{ display: 'block', width: '100%' }} />,
                }]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 1B · ii"
                title="When no technician was available"
                description="The vehicle stayed unassigned and the count stayed visible on the dashboard as 'parking bay'."
                tabs={[{
                  id: '1b-ii',
                  diagram: <img src="/hmc/dashboard_count.png" alt="Unassigned vehicles surfaced on the dashboard" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />,
                }]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 1B · iii"
                title="When a technician freed up"
                description="Reassignment happened from the ramp plan view, where waiting vehicles sat alongside the ramps."
                tabs={[{
                  id: '1b-iii',
                  diagram: (
                    <video
                      src="/hmc/ramp-plan.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedMetadata={e => { (e.target as HTMLVideoElement).playbackRate = 1 }}
                      style={{ display: 'block', width: '60%', margin: '0 auto', borderRadius: 'var(--radius-sm)' }}
                    />
                  ),
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 02 SCENARIO 02 — RAMP PLAN               */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-02">

              <DiagramSection
                wide={false}
                counter="Problem 2"
                stage="before"
                title="The tool showed the day's plan, and the manager still walked the floor to learn its progress"
                description="The ramp plan showed which vehicles were assigned to which ramps, but not whether a service was progressing, delayed, or done — so managers walked the workshop floor to find out. Each walk answered the floor's state for that moment, and the state changed through the day."
                tabs={[{
                  id: 'ramp-before',
                  diagram: <img src="/hmc/problem-2.png" alt="Ramp plan before — assignments only, no progress visibility" style={{ display: 'block', width: '70%', margin: '0 auto' }} />,
                  annotations: <RampBeforeAnnotations />,
                }]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 2"
                title="A ramp and workshop view for mid-service tracking and reassignment."
                description="When vehicles needed to move between ramps mid-service, or when unassigned vehicles built up in the parking bay, the manager could open a live view of the workshop floor."
                tabs={[{
                  id: 'ramp-after',
                  diagram: <img src="/hmc/ramp-plan.png" alt="Ramp plan redesign — live service progress and reassignment" style={{ display: 'block', width: '100%' }} />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 03 SCENARIO 03 — OPERATIONS             */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-03">

              <Block
                eyebrow="Problem 3"
                header="Without full awareness of real-time operations, the manager couldn't make operational decisions based on actual priority."
              >
                <p style={pStyle}>
                  At any point in the day, the service manager had to decide between competing calls on their attention: a technician on the workshop floor needed approval for a newly found issue, a customer was waiting in the lobby, and a vehicle was waiting for payment processing. Without a criticality or urgency signal, decisions were made on anything but real urgency.
                </p>
                <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                  <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-10)', transition: 'var(--transition-theme)' }}>
                    <img src="/hmc/problem-3.png" alt="Problem 3 — real-time operations awareness" style={{ display: 'block', width: '100%' }} />
                  </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-5)', marginTop: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                  <Problem3BeforeAnnotations />
                </div>
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution · 2a"
                title="The first version ranked delays by criticality — until testing showed criticality shifts by time of day."
                description="Working with SMEs, I mapped the delay points across the service journey and set out to surface them on a dashboard."
                defaultTabId="starting"
                tabs={[
                  {
                    id: 'starting',
                    label: 'Starting concept',
                    diagramTitle: 'A dashboard of fixed widgets, one per touchpoint where waiting costs the business',
                    diagram: <img src="/hmc/solution3-iteration.png" alt="Starting concept wireframe — fixed widget dashboard" style={{ display: 'block', width: '100%' }} />,
                    annotations: (
                      <p style={{ ...pStyle, margin: 0 }}>
                        Each widget is a point where a delay has a cost such as customer satisfaction at intake, idle technicians at approvals, held ramps at inspection, and promised deliveries in the parking bay.
                      </p>
                    ),
                  },
                  {
                    id: 'pivot',
                    label: 'Pivotal iteration',
                    diagramTitle: 'Testing showed criticality shifts by time of day — a fixed layout couldn\'t flex',
                    diagram: <ImgStage label="Dashboard with equal-weighted tabs, annotated" />,
                    annotations: (
                      <div>
                        <p style={{ ...pStyle, margin: '0 0 16px' }}>
                          Testing with service executives and SMEs surfaced the flaw: what counts as critical shifts by time of day. Customer wait dominates the morning rush. Workshop floor and billing dominate the evening crunch. A fixed "top 5" would always be showing the wrong moment's priority.
                        </p>
                        <p style={{ ...pStyle, margin: 0 }}>
                          Instead of ranking, I gave each delay point its own equally-weighted tab — so the manager could navigate to whichever mattered at that moment.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />

              <Block
                eyebrow="Solution · 2b"
                header="A persistent alert layer for anything that needed a prompt decision, regardless of which tab was open."
              >
                <p style={pStyle}>
                  Above the tabs, an alert layer stayed visible regardless of which tab the manager had open. Anything that required a prompt decision — a stalled approval, a customer waiting past a threshold, a vehicle idling too long — surfaced here so the manager didn't have to be looking at the right tab to see it.
                </p>
                <ImgStage label="Notifications / persistent alert layer, annotated" />
              </Block>

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 04 SCENARIO 04 — DOCUMENTATION          */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-04">

              <Block
                eyebrow="Problem 4"
                header="The documentation tool served two audiences — customer and technician — and it was failing both."
              >
                <p style={pStyle}>
                  The documentation tool had two jobs. First, it aligned the customer and the centre on what was being serviced and how long it would take. Second, the technician used it to understand what needed to be done on the vehicle. Both were failing.
                </p>
                <p style={pStyle}>
                  <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>Customer alignment.</strong>{' '}
                  Through a UX audit, I found that the current documentation flow's IA — with its collapse and expand interactions — forced the manager to scroll back and forth constantly. Customers don't narrate complaints in the order the form expects. As a customer described an issue, a part replacement got added; a complaint changed; the criticality shifted — all before the customer finished talking. The long-list format made managers waste time scrolling to find and jump into sections.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>Technician handoff.</strong>{' '}
                  Some context that technicians needed to service the vehicle didn't fit into any tagged field. Typing it into the notes section on a tablet was too slow — so managers physically walked to the workshop and relayed it to the technician verbally. This was the same manual information gathering the rest of this project was designed to eliminate, surfacing again inside documentation. SMEs described this as roughly a third of job cards — an estimate, not a measured figure.
                </p>
              </Block>

              <Block
                eyebrow="Solution · 3a"
                header="A redesigned IA with a sidebar to jump between sections, a preview of what was filled, and sticky quick-access fields."
              >
                <p style={pStyle}>
                  I restructured the form into a sidebar of sections the manager could jump between quickly. A preview of what was filled in each section gave the manager awareness of what was documented and what was missing, and gave the customer awareness of what was being captured. Frequently-edited fields — supervisor and criticality — were pulled out as sticky, quick-access items so the manager could change them from any section without navigating away.
                </p>
                <ImgStage label="Redesigned documentation IA — sidebar, preview, sticky fields, annotated" />
              </Block>

              <Block
                eyebrow="Solution · 3b"
                header="Voice recording against complaints and overall notes — capturing the context that couldn't be typed, without another walk to the workshop."
              >
                <p style={pStyle}>
                  To avoid the physical trip and the manual handoff, I proposed a voice-recording option against individual complaints and the overall notes section. Instead of walking to the technician to relay context verbally, the manager could record it once and the technician could listen to it on the workshop floor.
                </p>
                <p style={pStyle}>
                  Two considerations shaped the specification. The recording needed to cut through ambient workshop noise so the manager could speak at normal volume. And the technician needed to hear the recorded note clearly on a noisy workshop floor — so I proposed pairing the feature with earphones on the tablets.
                </p>
                <ImgStage label="Voice recording feature — noise handling, playback for technician" />
                <TbdCallout>Iteration or decision-making story — how did I land on voice specifically vs. other options?</TbdCallout>
              </Block>

              {/* Result — uses Learning component for the highlighted callout */}
              <div style={{ marginBottom: '48px' }}>
                <span style={eyebrowStyle}>Result</span>
                <Learning>
                  The redesigned IA cut documentation time roughly in half; voice recording was projected to remove verbal handoffs for a third of job cards.
                </Learning>
                <p style={{ ...pStyle, marginTop: '16px', margin: '16px 0 0' }}>
                  Tested with service managers and executives, completing documentation for an average set of complaints took 7 minutes less using the redesigned IA than the original form — roughly a 50% reduction against a 13–15 minute baseline. The voice feature was projected to cut verbal handoffs for roughly a third of job cards, based on SME estimate — not measured post-launch.
                </p>
              </div>

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 05 IMPACT                               */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <h2 style={h2Style}>One tested outcome, one shipped-and-live signal, one labeled projection.</h2>
              <div style={{ borderTop: '1px solid var(--color-border-hair)', marginTop: '8px', transition: 'var(--transition-theme)' }}>
                <ImpactItem>
                  <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>Documentation time cut by roughly 50%</strong>{' '}
                  — 7 minutes off a 13–15 minute baseline in testing, with service managers and executives.
                </ImpactItem>
                <ImpactItem>
                  <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>App shipped and live</strong>{' '}
                  across Hero MotoCorp's authorised-dealer network, with 100K+ Play Store downloads (functionally gated to authorised dealers, so downloads track the intended workforce across 6,000+ centres).
                </ImpactItem>
                <ImpactItem>
                  <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>Voice recording</strong>{' '}
                  projected to cut verbal handoffs for roughly a third of job cards (SME estimate; not measured).
                </ImpactItem>
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* 06 LEARNINGS                            */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <TbdCallout>
                Your learnings — what to take from this project. Placeholder for the structural-consistency / adoption-as-design-problem synthesis if you want it, or something else.
              </TbdCallout>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* 07 WHAT I'D DO DIFFERENTLY              */}
            {/* ════════════════════════════════════════ */}
            <section id="differently" style={sectionStyle}>
              <SectionDivider label="What I'd do differently" />
              <h2 style={h2Style}>
                Treat this as a service design project from the start — and design the workflows before the tools.
              </h2>
              <TbdCallout>
                Expand in your own words. Your note says "Service Design Project — so design the workflows." If you want the measurement-handoff reflection folded in here too, or replacing this, say so.
              </TbdCallout>
            </section>



            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
