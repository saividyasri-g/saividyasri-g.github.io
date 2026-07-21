import type { ReactNode } from 'react'
import { Overview, Outline, Learning, Carousel } from '../../components/case-study'
import Card from '../../components/ui/Card'

const outlineItems = [
  { id: 'context',          num: '', label: 'Context' },
  { id: 'why-it-mattered',  num: '', label: 'Why it mattered' },
  { id: 'scenario-01',      num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',      num: '', label: 'Problem · Solution 2' },
  { id: 'scenario-03',      num: '', label: 'Problem · Solution 3' },
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
  { src: '/hmc/context-1.png', alt: 'Service centre layout — customers entering service centre', caption: 'Customers entering the service centre' },
  { src: '/hmc/context-2.png', alt: 'Service centre layout — service manager learning from customer', caption: 'Service manager learns from the customer about vehicle issues and documents the vehicle-service' },
  { src: '/hmc/context-3.png', alt: 'Service centre layout — technician servicing vehicle on ramp', caption: 'Technician servicing the vehicle on ramp' },
  { src: '/hmc/context-4.png', alt: 'Service centre layout — service manager processing payment', caption: 'Service manager processing payment & delivery' },
]

/* ── Shared style constants ───────────────────────────── */

const sectionStyle: React.CSSProperties = {
  padding: '52px 0',
  scrollMarginTop: '90px',
}

const h2Style: React.CSSProperties = {
  fontSize: 'var(--text-lg)',
  lineHeight: 1.22,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: 'var(--color-text-title)',
  margin: '0 0 18px',
  maxWidth: '660px',
  transition: 'var(--transition-theme)',
}

const pStyle: React.CSSProperties = {
  fontSize: 'var(--text-base)',
  lineHeight: 1.65,
  color: 'var(--color-text-secondary)',
  margin: '0 0 16px',
  maxWidth: '660px',
  transition: 'var(--transition-theme)',
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  color: 'var(--color-text-meta)',
  marginBottom: '12px',
  display: 'block',
  transition: 'var(--transition-theme)',
}

const sectionDividerLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-text-meta)',
  transition: 'var(--transition-theme)',
}

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

function Block({ eyebrow, header, children }: { eyebrow?: string; header: string; children?: ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {eyebrow && <span style={eyebrowStyle}>{eyebrow}</span>}
      <h2 style={h2Style}>{header}</h2>
      {children}
    </div>
  )
}

function ScenarioGroup({ id, label, children }: { id: string; label?: string; children: ReactNode }) {
  return (
    <section id={id} style={sectionStyle}>
      <div
        style={{
          borderTop: '1px solid var(--color-border-hair)',
          paddingTop: '32px',
          marginBottom: '40px',
          transition: 'var(--transition-theme)',
        }}
      >
        {label && <span style={sectionDividerLabelStyle}>{label}</span>}
      </div>
      {children}
    </section>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border-hair)',
        paddingTop: '32px',
        marginBottom: '40px',
        transition: 'var(--transition-theme)',
      }}
    >
      <span style={sectionDividerLabelStyle}>{label}</span>
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
        <div style={{ padding: '0 var(--space-12)' }}>
        <ImgStage label="Hero image — service dashboard on tablet + mobile" aspectRatio="16 / 8" />
        <div style={{ marginTop: '32px' }}>
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
              fontSize: 'var(--text-4xl)',
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
          nextProject={{ label: 'Builder Market', href: '#' }}
        />

        <main style={{ background: 'var(--color-surface-main)', minWidth: 0, transition: 'var(--transition-theme)' }}>
          <div className="layout-main-pad" style={{ padding: 'var(--space-10) var(--space-12) 60px', maxWidth: '1040px' }}>

            {/* ════════════════════════════════════════ */}
            {/* 01 CONTEXT                              */}
            {/* ════════════════════════════════════════ */}
            <section id="context" style={sectionStyle}>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

                {/* Left: text blocks */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Block
                    eyebrow="Context"
                    header="A two-wheeler service centre runs on multiple roles working across separate zones."
                  >
                    <p style={pStyle}>
                      A two-wheeler service centre is where customers bring their motorbikes and scooters for routine service and repairs. A typical centre runs on multiple staff roles working across physically separate zones:
                    </p>
                    <ul style={{ paddingLeft: '4px', margin: '0 0 8px', maxWidth: '620px' }}>
                      {[
                        '1. Security Guard at reception - identifying customers as they arrive.',
                        '2. Service Manager in the customer waiting lobby - engaging with customers.', 
                        '3. Service Technician on the workshop floor - repairing vehicles on ramps.',
                        '4. Service Manager at the checkout area - processing payment and delivery.',
                      ].map(r => (
                        <li
                          key={r}
                          style={{
                            fontSize: 'var(--text-base)',
                            lineHeight: 1.65,
                            color: 'var(--color-text-secondary)',
                            marginBottom: '6px',
                            transition: 'var(--transition-theme)',
                          }}
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
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
                    header="Due to the centre's siloed operations, the manager relied on manual information gathering & handoffs that caused vehicle-service delays."
                  >
                    <p style={pStyle}>
                      Each stage of the vehicle's journey happened in a different zone. Service Managers with limited visibility into other zones, physically moved between zones to coordinate the operations. 
                    </p>
                    <p style={{ ...pStyle, margin: 0 }}>
                    They walked the workshop floor to find out which technicians were free, and relayed information verbally to technicians. They walked back to the lobby to update customers. This manual information gathering and handoff caused delays in vehicle servicing.
                    </p>
                  </Block>
                </div>

                {/* Right: sticky carousel */}
                <div style={{ width: '390px', flexShrink: 0, position: 'sticky', top: '90px' }}>
                  <Carousel slides={contextSlides} autoPlayMs={3500} />
                </div>

              </div>
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

              <Block
                eyebrow="Problem 1"
                header="To assign a vehicle to a technician's ramp, the manager had to physically walk the workshop floor to find out who was free."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Once a vehicle's service plan was documented, the service manager had to assign it to a technician's ramp for servicing. But the manager had no data on technician availability or workshop status, so they physically moved to the workshop floor to gather this information manually.
                </p>
              </Block>

              <Block
                eyebrow="Solution · 1a"
                header="A technician assignment workflow that pulled availability data into the manager's screen."
              >
                <p style={pStyle}>
                  I designed a workflow that let the manager assign a documented vehicle to a specific technician's ramp without leaving the tool. Technician availability, Ramp status, and workshop data were captured digitally — a workflow explored in another casestudy.
                </p>
                <ImgStage label="Technician assignment workflow, annotated" />
                <TbdCallout>First remembered insight that changed direction — what was the initial approach and what shifted it?</TbdCallout>
              </Block>

              <Block
                eyebrow="Solution · 1b"
                header="Assigned versus unassigned counts, surfaced on the dashboard."
              >
                <p style={pStyle}>
                  Alongside assignment, a live count of assigned versus unassigned vehicles gave the manager a running measure of centre load - how much was moving, how much was stuck.
                </p>
                <ImgStage label="Assigned / unassigned analytics view, annotated" />
              </Block>

              <Block
                eyebrow="Solution · 1c"
                header="A ramp and workshop view for mid-service tracking and reassignment."
              >
                <p style={pStyle}>
                  When vehicles needed to move between ramps mid-service, or when unassigned vehicles built up in the parking bay, the manager could open a live view of the workshop floor — which ramps were occupied, how far along each vehicle was, which vehicles were delayed, and how many were waiting. A drag-and-drop interaction let the manager reassign a vehicle from one ramp to another directly from the view.
                </p>
                <ImgStage label="Ramp / workshop floor view, annotated" />
                <TbdCallout>Second remembered insight that changed direction — what shifted here?</TbdCallout>
              </Block>

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* 03 SCENARIO 02 — OPERATIONS             */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-02">

              <Block
                eyebrow="Problem 2"
                header="Without full awareness of real-time operations, the manager couldn't make operational decisions based on actual priority."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  At any point in the day, the service manager had to decide between competing calls on their attention: a technician on the workshop floor needed approval for a newly found issue, a customer was waiting in the lobby, and a vehicle was waiting for payment processing. Without a criticality or urgency signal, decisions were made on anything but real urgency.
                </p>
              </Block>

              <Block
                eyebrow="Solution · 2a"
                header="The first version ranked delays by criticality — until testing showed criticality shifts by time of day."
              >
                <p style={pStyle}>
                  Working with SMEs, I mapped the delay points across the service journey and set out to surface them on a dashboard. My first instinct was to rank each delay by criticality — a "top 5 action items" view that would tell the manager what to attend to first.
                </p>
                <p style={pStyle}>
                  Testing that with service executives and SMEs surfaced the flaw: what counts as critical shifts by time of day. Customer wait dominates the morning rush. Workshop floor and billing dominate the evening crunch. A fixed "top 5" would always be showing the wrong moment's priority.
                </p>
                <p style={pStyle}>
                  Instead of ranking, I gave each delay point its own equally-weighted tab — so the manager could navigate to whichever mattered at that moment.
                </p>
                <ImgStage label="Dashboard with equal-weighted tabs, annotated" />
              </Block>

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
            {/* 04 SCENARIO 03 — DOCUMENTATION          */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-03">

              <Block
                eyebrow="Problem 3"
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

            {/* ── Footer ── */}
            <footer
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '18px',
                borderTop: '1px solid var(--color-border-hair)',
                paddingTop: '36px',
                marginTop: '20px',
                transition: 'var(--transition-theme)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--color-text-title)',
                  letterSpacing: '-0.01em',
                  transition: 'var(--transition-theme)',
                }}
              >
                Let's connect.
              </span>
              <div style={{ display: 'flex', gap: '24px', fontSize: 'var(--text-base)' }}>
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-vidyasri-giridharan-a98270146/' },
                  { label: 'Email',    href: 'mailto:vidya1997@gmail.com' },
                  { label: 'Next project →', href: '#' },
                ].map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'var(--transition-theme)' }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </footer>

          </div>
        </main>
      </div>
    </div>
  )
}
