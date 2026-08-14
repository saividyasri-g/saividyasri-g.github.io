import type { ReactNode } from 'react'
import {
  Outline,
  Carousel,
  DiagramSection,
  CaseBadge,
  ProblemCostAnnotations,
  ConstraintPivotGrid,
  sectionStyle,
  h2Style,
  pStyle,
  eyebrowStyle,
  Block,
  ScenarioGroup,
  SectionDivider,
} from '../../components/case-study'

const outlineItems = [
  { id: 'overview',         num: '', label: 'Overview' },
  { id: 'context',          num: '', label: 'Context' },
  { id: 'why-it-mattered',  num: '', label: 'Why it mattered' },
  { id: 'scope',            num: '', label: 'Scope' },
  { id: 'scenario-01',      num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',      num: '', label: 'Problem · Solution 2' },
  { id: 'scenario-03',      num: '', label: 'Problem · Solution 3' },
  { id: 'scenario-04',      num: '', label: 'Problem · Solution 4' },
  { id: 'impact',           num: '', label: 'Impact' },
  { id: 'learnings',        num: '', label: 'Learnings' },
]

const contextSlides = [
  { src: '/hmc/context-1.png', alt: 'Security guard at reception identifying customers', caption: '1. Security Guard at reception - identifying customers as they arrive.' },
  { src: '/hmc/context-2.png', alt: 'Service manager in the customer waiting lobby', caption: '2. Service Manager in the customer waiting lobby - engaging with customers.' },
  { src: '/hmc/context-3.png', alt: 'Service technician servicing vehicle on ramp', caption: '3. Service Technician on the workshop floor - repairing vehicles on ramps.' },
  { src: '/hmc/context-4.png', alt: 'Service manager processing payment and delivery', caption: '4. Service Manager at the checkout area - processing payment and delivery.' },
]

/* ── Inline helpers ───────────────────────────────────── */

/*
 * Finding card styles — dashed-border card pattern used for numbered
 * findings lists. Mirrors the page-local pattern in fidelity/index.tsx
 * (Problem1Findings); kept page-local here too since it isn't logged as
 * a shared component yet.
 */
const findingCardEyebrow: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--space-2)',
  fontFamily: 'var(--font-eyebrow)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: 'var(--tracking-badge-label)',
  textTransform: 'uppercase',
  color: 'var(--color-text-meta)',
  transition: 'var(--transition-theme)',
}

const findingCardHeader: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 'var(--text-base)',
  fontWeight: 400,
  lineHeight: 1.35,
  color: 'var(--color-text-body)',
  transition: 'var(--transition-theme)',
}

const findingCardDesc: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  fontWeight: 300,
  lineHeight: 1.55,
  color: 'var(--color-text-secondary)',
  margin: 0,
  transition: 'var(--transition-theme)',
}

/** Three same-height, horizontally aligned images with captions, in a grey card — used in Problem 4. */
function ProblemFourTrio() {
  const rowHeight = 420
  const items = [
    {
      src: '/hmc/problem-4-customer.png',
      alt: 'Manager documenting the service plan while the customer describes the issue',
      caption: 'The manager documents the service plan while the customer describes the issue. This plan is what the customer and the centre agree on.',
      imgHeight: 220,
    },
    {
      src: '/hmc/problem-4-ui.gif',
      alt: 'Documentation flow in the existing tool',
      caption: 'The documentation flow in the existing tool.',
      imgHeight: rowHeight,
    },
    {
      src: '/hmc/problem-4-technician.png',
      alt: 'Technician working from the documented service plan',
      caption: 'The technician works from the same plan. Context that did not fit the documentation form was relayed on the workshop floor.',
      imgHeight: 220,
    },
  ]

  return (
    <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {/* Fixed-height slot shared by all three columns, image bottom-anchored — keeps captions aligned regardless of each image's own height. */}
            <div style={{ height: `${rowHeight}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
              <img src={item.src} alt={item.alt} style={{ display: 'block', maxWidth: '100%', height: `${item.imgHeight}px`, maxHeight: '100%', objectFit: 'contain', objectPosition: 'center bottom' }} />
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text-secondary)', margin: 0, transition: 'var(--transition-theme)' }}>
              {item.caption}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-6)' }}>
        <ProblemCostAnnotations columns={[
          {
            problem: "The customer's narration did not match the order of the form",
            description: 'Customers described issues as they came to mind. The collapse-and-expand sections meant the manager scrolled back to find each one.',
            cost: 'Time spent documenting, and errors in what was documented',
          },
          {
            problem: 'Context that did not fit any form field was verbally relayed.',
            description: "Notes about the vehicle's history or past incidents could not be captured in the form. Typing them took longer than talking, so managers relayed them to the technician on the workshop floor instead. SMEs estimated this happened for about a third of vehicles.",
            cost: 'Managers held the context, walked to workshop floors',
          },
        ]} />
      </div>
    </div>
  )
}

/** Findings from testing the Solution 2A dashboard — used in scenario 03. */
function Solution2AFindings() {
  const findings: { label: string; header: string; description: ReactNode }[] = [
    {
      label: '#1',
      header: 'What was critical shifted with the time of day',
      description: 'I designed for one operational state. Testing showed customer intake dominated the morning, and inspections, billing, and deliveries dominated the evening.',
    },
    {
      label: '#2',
      header: 'What each widget held depended on the service',
      description: 'I assumed incorrectly that inspection was a mandatory step in every vehicle-service. Inspection depth varies by service type, and a well-planned service rarely raises a mid-service approval.',
    },
    {
      label: '#3',
      header: 'The same dashboard had to hold across centre formats',
      description: 'I knew centres ranged in size. I had not accounted for the services differing by format.',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {findings.map((item, i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23BEC1C3' stroke-width='0.6' stroke-dasharray='2%2c2'/%3e%3c/svg%3e")`,
            padding: 'var(--space-5)',
            transition: 'var(--transition-theme)',
          }}
        >
          <span style={findingCardEyebrow}>{item.label}</span>
          <p style={findingCardHeader}>{item.header}</p>
          <div style={findingCardDesc}>{item.description}</div>
        </div>
      ))}
    </div>
  )
}

/** Metric cards for the Impact section — dashed-card pattern matching fidelity's impact/learnings cards. */
function ImpactCards() {
  const cards: { title: ReactNode; description: string }[] = [
    {
      title: '15 min → ~7 min',
      description: 'Documentation time cut by roughly 50%.',
    },
    {
      title: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0 }}>
            <path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5" stroke="var(--color-text-title)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14" stroke="var(--color-text-title)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          100K+ downloads
        </span>
      ),
      description: "App shipped and live across Hero MotoCorp's authorised-dealer network.",
    },
  ]

  return (
    <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-8)' }}>
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            borderRadius: 'var(--radius-card)',
            background: 'var(--color-surface-card)',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23BEC1C3' stroke-width='0.6' stroke-dasharray='2%2c2'/%3e%3c/svg%3e")`,
            padding: '20px 24px',
            transition: 'var(--transition-theme)',
          }}
        >
          <h4
            style={{
              margin: '0 0 10px',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              lineHeight: 1.3,
              color: 'var(--color-text-title)',
              transition: 'var(--transition-theme)',
            }}
          >
            {card.title}
          </h4>
          <p style={{ ...pStyle, margin: 0 }}>{card.description}</p>
        </div>
      ))}
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

      {/* ── Hero thumbnail ── */}
      <section style={{ paddingTop: 'var(--space-10)' }}>
        <div className="layout-header-pad" style={{ padding: '0 var(--space-12)' }}>
          <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            <img src="/hmc/casestudy_thumbnail.png" alt="Hero image — service dashboard on tablet + mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
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
            {/* OVERVIEW                                */}
            {/* ════════════════════════════════════════ */}
            <section id="overview">
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
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={eyebrowStyle}>Overview</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  A two-wheeler service centre ran on multiple staff roles working in physically separate zones. One of these roles, the service manager, managed the entire centre's operations. They relied on manually gathering information from each zone, which caused increased waiting times, vehicle idle time, and delayed deliveries.
                </p>
              </div>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={eyebrowStyle}>Impact</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  I led the design of service manager workflows and tools — dashboard, workshop floor visualisation, and documentation. Testing showed the redesigned IA cut documentation completion time by ~54%. The app shipped across Hero MotoCorp's authorised-dealer network, with{' '}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hero.serviceapp&hl=en_US"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-text-title)', textDecoration: 'underline', textUnderlineOffset: '2px', transition: 'var(--transition-theme)' }}
                  >
                    100K+ Play Store downloads
                  </a>.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-10)', marginBottom: 'var(--space-8)' }}>
                <div>
                  <span style={eyebrowStyle}>Duration</span>
                  <p style={{ ...pStyle, margin: 0 }}>9 weeks (2023)</p>
                </div>
                <div>
                  <span style={eyebrowStyle}>My Role</span>
                  <p style={{ ...pStyle, margin: 0 }}>UX Designer &amp; Team Lead</p>
                </div>
                <div>
                  <span style={eyebrowStyle}>Team</span>
                  <p style={{ ...pStyle, margin: 0 }}>2 UX Designers, 2 Visual Designers</p>
                </div>
              </div>
            </section>

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
                  The Service Manager's operations span customer engagement, alignment, vehicle-service documentation, estimating service duration, assigning vehicles to technicians' ramps, assessing service quality, and processing payment through to checkout.
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
            {/* SCOPE                                   */}
            {/* ════════════════════════════════════════ */}
            <section id="scope" style={sectionStyle}>
              <Block
                eyebrow="Scope"
                header="An agency engagement with no direct research access"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  This project with Hero MotoCorp (client) ran remotely through COVID. Primary research at the service centres was not in scope, so we worked from stakeholder interviews and concept testing with four service executives and a product manager who were the SMEs engaged throughout the project. They were the source for how centres actually ran, and concept testing was how I checked design decisions against that.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* 03 SCENARIO 01 — ASSIGNING VEHICLES     */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-01">

              <DiagramSection
                wide={false}
                hideStageLabel
                diagramPadding="0"
                counter="Problem 1"
                stage="before"
                title="To assign a vehicle to a technician's ramp, the manager had to physically walk the workshop floor to find out who was free."
                description="Once a vehicle's service plan was documented, the service manager had to assign it to a technician's ramp for servicing. But the manager had no data on technician availability or workshop status, so they physically moved to the workshop floor to gather this information manually."
                tabs={[{
                  id: 'starting',
                  diagram: (
                    <>
                      <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-2)', transition: 'var(--transition-theme)' }}>
                        <div style={{ position: 'relative' }}>
                          <img src="/hmc/workflow-before.svg" alt="Starting point: manual technician assignment workflow" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
                          <CaseBadge icon="/hmc/icons/friction.svg" label="Friction in workflow" color="#BD0505" style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' }} />
                        </div>
                      </div>
                      <div style={{ marginTop: 'var(--space-6)' }}>
                        <ProblemCostAnnotations columns={[
                          {
                            problem: "Limited visibility into Technician's availability",
                            description: 'Managers planned the vehicle-service first and checked workshop availability afterward, resulting in queued vehicles without an assigned technician.',
                            cost: 'Assignment overhead on every vehicle',
                          },
                          {
                            problem: 'Reassignment relied on the manager remembering unassigned vehicles',
                            description: 'Unassigned vehicles created a mental load for the manager, who had to track availability and reassign each one as technicians freed up.',
                            cost: 'Vehicles sat idle & turnaround time increased',
                          },
                          {
                            problem: 'Deliveries promised against inaccurate availabilities',
                            description: "Without visibility into the centre's real-time workload, delivery estimates were made on inaccurate assumptions.",
                            cost: 'Delays surfaced at pickup led to customer dissatisfaction',
                          },
                        ]} />
                      </div>
                    </>
                  ),
                }]}
              />

              <DiagramSection
                wide={false}
                hideStageLabel
                card={false}
                diagramPadding="0"
                stage="after"
                solutionLabel="Solution 1A · Exploration"
                title="I explored a technician assignment workflow that pulled availability data from external HR and dealer management systems."
                description={
                  <>
                    <p style={{ ...pStyle, margin: '0 0 var(--space-4)' }}>
                      I explored existing systems that held workforce data, such as HR systems which held biometric attendance, and the dealer management systems that held rosters and shift information.
                    </p>
                    <p style={{ ...pStyle, margin: '0 0 var(--space-4)' }}>
                      However, these systems lacked information on whether the technicians were present on the workshop or available to take a vehicle. This was known only on the day, and hence next-day scheduling had no reliable data.
                    </p>
                    <p style={{ ...pStyle, margin: 0 }}>
                      The systems also differed by centre, and integrating each one was a separate build.
                    </p>
                  </>
                }
                tabs={[{
                  id: 'explored',
                  diagram: (
                    <div>
                      {/* Grey card: diagram title + image + constraints */}
                      <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                        <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-2)', marginBottom: 'var(--space-8)', transition: 'var(--transition-theme)' }}>
                          <img src="/hmc/explored-workflow.png" alt="Explored workflow: next-day scheduling approach" style={{ display: 'block', width: '100%' }} />
                        </div>
                        <p style={{ ...pStyle, margin: '0 0 var(--space-5)', maxWidth: 'none' }}>
                          Two constraints came out of the feasibility discussion with the SMEs and service managers: external system reliability and integration cost.
                        </p>
                        <ConstraintPivotGrid entries={[
                          {
                            title: 'Next-day scheduling had no data to run on',
                            description: "Shift ≠ availability. Technician's availability was only known on the day, so there was no source for forward scheduling.",
                            pivot: 'Live tracking of Technician availability through vehicle-service status',
                          },
                          {
                            title: 'Integration across diverse systems was expensive',
                            description: "Technician presence data sat in systems (HR, DMS, biometric) that varied by centre. Integrating them was outside the scope and budget of the MVP.",
                            pivot: "Technician presence data collected through App's daily login",
                          },
                          {
                            title: 'Training and expertise data came from an external system',
                            description: 'This decision-support signal needed skill data from a proposed training module integration that was not approved for MVP.',
                            pivot: "Not prioritised for this release.",
                          },
                        ]} />
                      </div>

                      {/* Final section */}
                      <div style={{ marginTop: 'var(--space-8)' }}>
                        <span style={eyebrowStyle}>Solution 1A · Final</span>
                        <h2 style={{ fontSize: 'var(--text-lg)', lineHeight: 1.22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--color-text-title)', margin: '0 0 14px', maxWidth: 'var(--content-width-prose)', transition: 'var(--transition-theme)' }}>
                          A technician assignment workflow that pulled availability data from the technician's app into the manager's screen.
                        </h2>
                        <p style={{ ...pStyle, margin: '0 0 var(--space-6)' }}>
                          I designed a workflow where the Technicians set availability and ramp at daily login on Technician's app. This login input provides every centre the same input, independent of the systems. Tagging and tracking service statuses such as unassigned, not started, ongoing, delayed provided real-time vehicle status.
                        </p>
                        <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                          <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-2)', transition: 'var(--transition-theme)' }}>
                            <img src="/hmc/final-workflow.png" alt="Final redesigned technician assignment workflow" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                }]}
              />

              <DiagramSection
                wide={false}
                hideStageLabel
                diagramPadding="0"
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
                hideStageLabel
                diagramPadding="0"
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
                hideStageLabel
                diagramPadding="0"
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
                      style={{ display: 'block', width: '85%', margin: '0 auto', borderRadius: 'var(--radius-sm)' }}
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
                hideStageLabel
                diagramPadding="0"
                counter="Problem 2"
                stage="before"
                title="The tool showed the day's plan, and the manager still walked the floor to learn its progress"
                description="The ramp plan showed which vehicles were assigned to which ramps, but not whether a service was progressing, delayed, or done. So managers walked the workshop floor to find out the floor's state for that moment, and the state changed through the day."
                tabs={[{
                  id: 'ramp-before',
                  diagram: (
                    <>
                      <img src="/hmc/problem-2.png" alt="Ramp plan before — assignments only, no progress visibility" style={{ display: 'block', width: '70%', margin: '0 auto' }} />
                      <div style={{ marginTop: 'var(--space-6)' }}>
                        <ProblemCostAnnotations columns={[
                          {
                            problem: 'The ramp plan showed assignments, and not progress',
                            description: 'The view showed the planned assignments but service progress and delays were not captured, so the manager learned them by walking the floor.',
                            cost: 'Late discoveries of delays',
                          },
                          {
                            problem: 'The ramp plan could not be changed from the tool',
                            description: 'When a service ran over or a ramp freed up, reassignment of vehicle-services happened verbally on the floor.',
                            cost: 'Manual verbal hand-off hours',
                          },
                        ]} />
                      </div>
                    </>
                  ),
                }]}
              />

              <DiagramSection
                wide={false}
                hideStageLabel
                diagramPadding="0"
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
                  <div style={{ marginTop: 'var(--space-6)' }}>
                    <ProblemCostAnnotations columns={[
                      {
                        problem: 'No data ranked the demands',
                        description: "Waiting durations, stalled services, and finished-vehicle counts weren't captured anywhere. The manager responded to demands that were visible while the critical demands waited behind.",
                        cost: 'Turnaround time increased',
                      },
                      {
                        problem: 'Customer waiting time was unknown',
                        description: 'Tokens were issued on paper, without timestamps. Waiting time was unknowable from the moment a customer entered.',
                        cost: 'Customer dissatisfaction',
                      },
                    ]} />
                  </div>
                </div>
              </Block>

              <DiagramSection
                wide={false}
                hideStageLabel
                stage="after"
                solutionLabel="Solution · 3a · Exploration"
                title="I explored a dashboard surfacing touchpoints where any delay costs the business."
                description="Working with SMEs, I mapped the delay points across the service journey and set out to surface them on a dashboard. Each widget is a point where a delay has a cost such as customer satisfaction at intake, idle technicians at approvals, held ramps at inspection, and promised deliveries in the parking bay."
                diagramPadding="0"
                tabs={[
                  {
                    id: 'starting',
                    diagram: (
                      <>
                        <img src="/hmc/solution3-iteration.png" alt="Starting concept wireframe — fixed widget dashboard" style={{ display: 'block', width: '100%' }} />
                        <p style={{ ...pStyle, margin: 'var(--space-6) 0 var(--space-5)' }}>
                          Testing revealed three sources of variance the layout could not hold: time of day, service type, and service centre format.
                        </p>
                        <Solution2AFindings />
                      </>
                    ),
                  },
                ]}
              />

              <DiagramSection
                wide={false}
                hideStageLabel
                stage="after"
                solutionLabel="Solution · 3a · Final"
                title="The final iteration made each category a tab with its own count."
                description="Each category — tokens, ongoing jobs, billing, ramp plan, parking bay — became a tab carrying its own count. The tabs held the same order and position through the day, so the manager read where the load was from the numbers and moved to it. This system solved for the operational and service centre variance."
                diagramPadding="0"
                tabs={[
                  {
                    id: 'final',
                    diagram: <img src="/hmc/solution-3-final.png" alt="Final dashboard — tabs per category with counts" style={{ display: 'block', width: '100%' }} />,
                  },
                ]}
              />

              <Block
                eyebrow="Solution · 3b"
                header="A persistent alert layer for anything that needed a prompt decision, regardless of which tab was open."
              >
                <p style={pStyle}>
                  Above the tabs, an alert layer stayed visible regardless of which tab the manager had open. Anything that required a prompt decision a waiting inspection, a customer waiting past a threshold were surfaced as alerts so the manager didn't have to be looking at the right tab to see it.
                </p>
                <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                  <img src="/hmc/solution-2b.png" alt="Persistent alert layer, annotated" style={{ display: 'block', width: '70%', margin: '0 auto' }} />
                </div>
              </Block>

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 04 SCENARIO 04 — DOCUMENTATION          */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-04">

              <Block
                eyebrow="Problem 4"
                header="The vehicle-service plan documentation flow forced the manager to scroll back and forth while the customer talked, and some context did not fit the form at all."
              >
                <p style={pStyle}>
                  The documentation served two audiences. It aligned the customer and the centre on what was being serviced and how long it would take, and it told the technician what needed to be done on the vehicle.
                </p>
                <ProblemFourTrio />
              </Block>

              <Block
                eyebrow="Solution · 4a"
                header="I redesigned the documentation IA with a sidebar to jump between sections, a preview of what was filled, and sticky quick-access fields."
              >
                <p style={pStyle}>
                  I restructured the form into a sidebar of sections the manager could jump between quickly. A preview of what was filled in each section gave the manager awareness of what was documented and what was missing, and gave the customer awareness of what was being captured. Frequently-edited fields like supervisor and service criticality were pulled out as sticky, quick-access items so the manager could change them from any section without navigating away.
                </p>
                <video
                  src="/hmc/solution-4.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedMetadata={e => { (e.target as HTMLVideoElement).playbackRate = 1 }}
                  style={{ display: 'block', width: '68%', margin: '18px auto', borderRadius: 'var(--radius-sm)' }}
                />
              </Block>

              <Block
                eyebrow="Solution · 4b"
                header="I introduced voice recording against complaints to capture the context that couldn't be typed, without having to walk to the workshop."
              >
                <p style={pStyle}>
                  To avoid the physical trip and the manual handoff, I proposed a voice-recording option against individual complaints and the overall notes section. Instead of walking to the technician to relay context verbally, the manager could record it once and the technician could listen to it on the workshop floor.
                </p>
                <div
                  style={{
                    borderLeft: '3px solid var(--color-border-hair-hover)',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    padding: '8px 16px',
                    margin: 'var(--space-5) 0',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-eyebrow)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: 'var(--tracking-badge-label)',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-meta)',
                      display: 'block',
                      marginBottom: '4px',
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    Specification Note
                  </span>
                  <p style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>
                    The recording needed to cut through ambient workshop noise so the manager could speak at normal volume. And the technician needed to hear the recorded note clearly on a noisy workshop floor, so I proposed pairing the feature with earphones on the tablets.
                  </p>
                </div>
                <video
                  src="/hmc/voice-recording.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedMetadata={e => { (e.target as HTMLVideoElement).playbackRate = 1 }}
                  style={{ display: 'block', width: '68%', margin: '18px auto', borderRadius: 'var(--radius-sm)' }}
                />
              </Block>

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 05 IMPACT                               */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <h2 style={h2Style}>I tested the documentation redesign, the one flow I could test before handing off to development.</h2>
              <p style={pStyle}>
                This was an agency engagement, so testing happened before the specification was handed off to the client's development team, and there was no research resource for post-launch measurement. Documentation was the one flow I could test in a session: it's a bounded task, repeated for every vehicle, with a clear before and after.
              </p>
              <p style={{ ...pStyle, margin: 0 }}>
                I ran task-based testing with 3 service managers, comparing the original form against the redesigned IA on the same set of complaints.
              </p>
              <ImpactCards />
            </section>

            {/* ════════════════════════════════════════ */}
            {/* 06 LEARNINGS                            */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <div className="annotation-grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--space-5)' }}>
                {[
                  {
                    title: 'Concept testing surfaced more than stakeholder interviews did',
                    description: 'Research resource was limited, so I had to choose where to spend it. While stakeholder interviews led to generic answers, putting a concept in front of them produced specific insights like how a day in service centre actually ran, which was pivotal to the dashboard concept.',
                  },
                  {
                    title: 'Designing across 6,000 centres meant finding what stayed constant',
                    description: "My instinct on the dashboard was to surface the top five things needing the manager's attention. Priority changed by hour, by service mix, and by centre, so any ranking the system produced would be wrong somewhere. I shifted to using the dashboard to communicate the state of the centre and alerts to communicate criticality, leaving the decision of what to act on with the manager.",
                  },
                  {
                    title: 'A proposed feature carries a cost, and the case has to include when it does not apply',
                    description: 'Voice recording needed audio infrastructure and development time. Proposing it meant stating what it was worth, what broke without it, and where it would not help. After the specification handed off, I had no way to protect the decision.',
                  },
                ].map((learning, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--color-surface-card)',
                      borderRadius: 'var(--radius-card)',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23BEC1C3' stroke-width='0.6' stroke-dasharray='2%2c2'/%3e%3c/svg%3e")`,
                      padding: 'var(--space-5)',
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    <span style={findingCardEyebrow}>#{i + 1}</span>
                    <p style={findingCardHeader}>{learning.title}</p>
                    <div style={findingCardDesc}>{learning.description}</div>
                  </div>
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
