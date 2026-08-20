import type { ReactNode } from 'react'
import {
  Outline,
  Learning,
  DiagramSection,
  sectionStyle,
  h2Style,
  pStyle,
  eyebrowStyle,
  Block,
  ScenarioGroup,
  SectionDivider,
} from '../../components/case-study'

const outlineItems = [
  { id: 'overview',        num: '', label: 'Overview' },
  { id: 'context',         num: '', label: 'Context' },
  { id: 'why-it-mattered', num: '', label: 'Why it mattered' },
  { id: 'scenario-01',     num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',     num: '', label: 'Problem · Solution 2' },
  { id: 'scenario-03',     num: '', label: 'Problem · Solution 3' },
  { id: 'impact',          num: '', label: 'Impact' },
  { id: 'learnings',       num: '', label: 'Learnings' },
  { id: 'differently',     num: '', label: 'Do Differently' },
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
      <div style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>{children}</div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────── */

export default function MultiStakeholder() {
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
          <ImgStage label="Case study thumbnail — multi-stakeholder workflow" aspectRatio="21 / 9" />
        </div>
      </section>

      {/* ── Sidebar + body grid ── */}
      <div className="layout-grid-body">
        <Outline items={outlineItems} />

        <main style={{ background: 'var(--color-surface-main)', minWidth: 0, transition: 'var(--transition-theme)' }}>
          <div className="layout-main-pad" style={{ padding: 'var(--space-10) var(--space-12) 60px' }}>
            <div className="layout-content layout-content--centered layout-content--prose">

            {/* ════════════════════════════════════════ */}
            {/* OVERVIEW                                */}
            {/* ════════════════════════════════════════ */}
            <section id="overview" style={{ ...sectionStyle, paddingTop: 0 }}>
              <h1
                style={{
                  fontSize: 'var(--text-2xl)',
                  lineHeight: 1.1,
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-text-title)',
                  margin: '0 0 32px',
                  transition: 'var(--transition-theme)',
                }}
              >
                Integrating Complex Multi-Stakeholder Workflows Across a Two-Wheeler Service Centre.
              </h1>
              <div className="case-study-block">
                <span className="case-study-eyebrow" style={eyebrowStyle}>Overview</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  A two-wheeler service centre runs on four distinct roles — Security Guard, Service Manager, Technician, and Checkout — each working in a separate zone with no shared digital layer. Information moved between them verbally and on paper, creating avoidable idle times, delayed handoffs, and service bottlenecks.
                </p>
              </div>
              <div className="case-study-block">
                <span className="case-study-eyebrow" style={eyebrowStyle}>Impact</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  I designed cross-role digital workflows connecting Security Guard check-in, technician status reporting, and checkout confirmation into a single shared system — removing the verbal handoffs and idle wait times that accumulated across every vehicle's journey.
                </p>
              </div>
              <div className="case-study-block" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-10)' }}>
                <div>
                  <span className="case-study-eyebrow" style={eyebrowStyle}>Duration</span>
                  <p style={{ ...pStyle, margin: 0 }}>12 weeks (2023)</p>
                </div>
                <div>
                  <span className="case-study-eyebrow" style={eyebrowStyle}>My Role</span>
                  <p style={{ ...pStyle, margin: 0 }}>UX Designer</p>
                </div>
                <div>
                  <span className="case-study-eyebrow" style={eyebrowStyle}>Team</span>
                  <p style={{ ...pStyle, margin: 0 }}>2 UX Designers, 1 Product Manager</p>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* 01 CONTEXT                              */}
            {/* ════════════════════════════════════════ */}
            <section id="context" style={sectionStyle}>
              <Block
                eyebrow="Context"
                header="A service centre runs on four roles across four physically separate zones — with no shared digital layer connecting them."
              >
                <p style={pStyle}>
                  Each vehicle's journey through a two-wheeler service centre passes through at least four roles: the Security Guard who checks the vehicle in and issues a token, the Service Manager who documents the job and assigns it to a technician, the Technician who services the vehicle on the workshop floor, and the Checkout desk who confirms completion and processes payment.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  Each role worked in a physically separate zone with its own paper-based process. Information moved between roles verbally — or didn't move at all until someone walked from one zone to another to retrieve it.
                </p>
                <ImgStage label="Four-role journey map across the service centre" />
              </Block>

              <Block
                header="Each handoff between roles introduced a gap — a moment where a vehicle sat idle waiting for information to travel."
              >
                <p style={pStyle}>
                  The Security Guard issued a paper token without digitally logging the vehicle. The Service Manager had to walk the floor to get technician status. Technicians couldn't signal completion without interrupting their own work or waiting for a manager visit. Checkout couldn't start payment processing until the service manager physically confirmed completion.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  These weren't occasional edge cases. Every vehicle's journey accumulated the same delays, multiplied across 200–400 vehicles per centre per day.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHY IT MATTERED                         */}
            {/* ════════════════════════════════════════ */}
            <section id="why-it-mattered" style={sectionStyle}>
              <Block
                eyebrow="Why it mattered"
                header="Hero MotoCorp's post-sales revenue depends on service throughput — every idle minute is a vehicle that missed its delivery slot."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Hero MotoCorp's independent dealership service centres are the primary post-sales revenue channel for parts, service, and accessories. Throughput — the number of vehicles completed and delivered on time — is the key metric each centre is held to. Cross-role coordination failures were costing throughput directly: vehicles sat in parking bays waiting for assignment, technicians sat idle waiting for approval, and customers waited in the lobby while the vehicle was already done.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 01 — CHECK-IN HANDOFF          */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-01">

              <Block
                eyebrow="Problem 1"
                header="The Security Guard check-in was on paper — the Service Manager had no visibility into vehicles queuing at reception."
              >
                <p style={pStyle}>
                  At reception, the Security Guard issued a numbered paper token and noted the vehicle in a physical register. The Service Manager learned a vehicle was waiting only when the customer walked in from reception — or when the queue backed up enough to be visible from the service bay.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  On peak days, this meant the manager was surprised by waiting customers, couldn't pre-plan documentation, and couldn't give customers a realistic wait time estimate on arrival.
                </p>
                <ImgStage label="Before: paper token check-in flow — friction points annotated" />
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 1"
                title="A digital check-in on the Guard's app that surfaced arriving vehicles on the Manager's dashboard in real time."
                description="I designed a lightweight check-in flow for the Security Guard's app that logged the vehicle's registration and categorised it as walk-in or appointment. The moment a vehicle was checked in, it appeared as a queue entry on the Manager's dashboard, allowing the Manager to begin documentation before the customer reached the service bay."
                tabs={[{
                  id: 's1-solution',
                  diagram: <ImgStage label="Guard check-in flow → Manager queue visibility, annotated" />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 02 — TECHNICIAN STATUS         */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-02">

              <Block
                eyebrow="Problem 2"
                header="Technicians couldn't signal service progress or completion without stopping work to find a manager."
              >
                <p style={pStyle}>
                  On the workshop floor, a technician who discovered an additional issue, needed approval, or completed a service had one option: stop working and find the Service Manager. The Manager would then update the vehicle's record manually — or delay the update until their next sweep of the floor.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  This created two failure modes: approval bottlenecks that stalled services mid-job, and completion delays where a finished vehicle sat on the ramp while checkout waited for the manager's confirmation.
                </p>
                <ImgStage label="Before: technician-to-manager signalling — friction points annotated" />
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 2A"
                title="Status tagging from the Technician's app that updated the Manager's view in real time."
                description="I designed a status-tagging flow on the Technician's app — not-started, in-progress, needs-approval, completed — that the Technician could update without leaving the ramp. Each status change propagated to the Manager's dashboard, eliminating the physical trip and updating the live ramp view."
                tabs={[{
                  id: 's2a-solution',
                  diagram: <ImgStage label="Technician status tagging flow, annotated" />,
                }]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 2B"
                title="Approval requests that routed to the Manager without a floor walk."
                description="When a technician flagged needs-approval, the Manager's dashboard surfaced it as an alert — with the vehicle details and the technician's note. The Manager could approve or redirect from the dashboard, and the Technician received the response on their own device."
                tabs={[{
                  id: 's2b-solution',
                  diagram: <ImgStage label="Approval request and response flow across both apps, annotated" />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 03 — CHECKOUT HANDOFF          */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-03">

              <Block
                eyebrow="Problem 3"
                header="Checkout couldn't start payment processing until a service manager physically confirmed the vehicle was done."
              >
                <p style={pStyle}>
                  Once a technician completed a vehicle's service, the checkout process couldn't begin until the Service Manager had walked the floor to verify it, updated the record, and notified checkout. On busy days, this sequence could take 20–30 minutes per vehicle.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  Customers who had been waiting for their vehicle experienced the longest waits in this final stage — after the actual service was already complete.
                </p>
                <ImgStage label="Before: checkout trigger sequence — idle time annotated" />
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 3"
                title="A completion signal that triggered checkout preparation automatically — without a manager walk."
                description="When the Technician tagged a vehicle as completed, and the Manager confirmed quality from the dashboard, the vehicle's status updated to ready-for-checkout and the Checkout queue was notified automatically. Checkout could begin preparing the invoice before the customer approached the desk."
                tabs={[{
                  id: 's3-solution',
                  diagram: <ImgStage label="Technician complete → Manager confirm → Checkout notify flow, annotated" />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* IMPACT                                  */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <h2 style={h2Style}>Coordination overhead reduced across every vehicle's journey.</h2>
              <div style={{ borderTop: '1px solid var(--color-border-hair)', marginTop: '8px', transition: 'var(--transition-theme)' }}>
                <ImpactItem>
                  <TbdCallout>Add measured or projected impact on vehicle idle time and throughput from pilot centres.</TbdCallout>
                </ImpactItem>
                <ImpactItem>
                  <TbdCallout>Add impact on floor-walk frequency or manager travel time.</TbdCallout>
                </ImpactItem>
                <ImpactItem>
                  <TbdCallout>Add customer satisfaction or checkout wait-time data if available.</TbdCallout>
                </ImpactItem>
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* LEARNINGS                               */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <Learning>
                The hardest constraint wasn't technical — it was designing flows that worked even when one role's device wasn't in hand.
              </Learning>
              <p style={{ ...pStyle, marginTop: '16px' }}>
                Technicians on a ramp can't hold a tablet while torquing a bolt. Guards handle peak rush with both hands full. Every flow had to function in the negative space — with the device pocketed, on a bench, or across the room — which forced me to think about physical context as a first-class design constraint.
              </p>
              <TbdCallout>Expand with your own synthesis. What surprised you about multi-role design that single-user design didn't prepare you for?</TbdCallout>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHAT I'D DO DIFFERENTLY                 */}
            {/* ════════════════════════════════════════ */}
            <section id="differently" style={sectionStyle}>
              <SectionDivider label="What I'd do differently" />
              <h2 style={h2Style}>
                Shadow each role on the same day, in sequence — before designing any flow.
              </h2>
              <p style={pStyle}>
                I interviewed roles separately and built a composite picture in synthesis. In hindsight, the most revealing moments came from watching a handoff happen in real time — the pause where a technician waited for a manager who was on the other side of the centre. That pause wasn't in any interview transcript.
              </p>
              <TbdCallout>Add any other reflections — on scope, on stakeholder buy-in, on what you would have pushed for earlier.</TbdCallout>
            </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
