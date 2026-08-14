import type { ReactNode } from 'react'
import {
  Outline,
  ProblemCostAnnotations,
  sectionStyle,
  pStyle,
  eyebrowStyle,
  Block,
  ScenarioGroup,
  SectionDivider,
} from '../../components/case-study'

const outlineItems = [
  { id: 'overview',          num: '', label: 'Overview' },
  { id: 'context',           num: '', label: 'Context' },
  { id: 'problem-discovery', num: '', label: 'Problem Discovery' },
  { id: 'reframe',           num: '', label: 'Reframe' },
  { id: 'solution',          num: '', label: 'Solution' },
  { id: 'impact',            num: '', label: 'Impact' },
  { id: 'post-launch-review', num: '', label: 'Post-launch Review' },
  { id: 'learnings',         num: '', label: 'Learnings' },
]


/*
 * Plain finding card styles — dashed-border card, header + description only
 * (no cost box). Mirrors the page-local pattern in hmc/index.tsx
 * (Solution2AFindings); kept page-local here too since it isn't logged as
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

/** Numbered finding cards with no cost box — used in Post-launch Review to lay out the three production-recording findings. */
function FindingCards({ findings }: { findings: { header: string; description: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', margin: '20px 0' }}>
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
          <span style={findingCardEyebrow}>#{i + 1}</span>
          <p style={findingCardHeader}>{item.header}</p>
          <p style={findingCardDesc}>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

/** Real (non-draft) inline note — left-border callout, mirrors the "Specification Note" pattern in hmc/index.tsx. Distinct from TbdCallout, which is reserved for draft/placeholder content. */
function Note({ label = 'Note', children }: { label?: string; children: ReactNode }) {
  return (
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
        {label}
      </span>
      <p style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>{children}</p>
    </div>
  )
}

/** Metric cards for the Impact section — dashed-card pattern matching hmc/fidelity's impact cards. */
function ImpactCards({ cards }: { cards: { title: string; description: string }[] }) {
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

export default function Marketplace() {
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
            <img src="/tbm.png" alt="Case study thumbnail — Builder Market onboarding" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
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
                Home Service Marketplace Onboarding & Activation
              </h1>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={eyebrowStyle}>Overview</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  Builder Market is an early-stage two-sided marketplace connecting homeowners with home service professionals. The business had asked me to redesign the professional onboarding flow because 71.6% of professionals were dropping off. On investigation, the deeper problem was that the flow required professionals to invest 7–8 minutes completing a full business listing before the platform delivered any value.
                </p>
              </div>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={eyebrowStyle}>Impact</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  I proposed and aligned the team on a reframe: surface value first, then ask for commitment. I designed the abbreviated signup flow, the routing to a dashboard, and the flow professionals used to claim their first free suggested leads. Signup bounce dropped from 71.6% to 34% in the two weeks after launch.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-10)', marginBottom: 'var(--space-8)' }}>
                <div>
                  <span style={eyebrowStyle}>Duration</span>
                  <p style={{ ...pStyle, margin: 0 }}>9 weeks (2025)</p>
                </div>
                <div>
                  <span style={eyebrowStyle}>My Role</span>
                  <p style={{ ...pStyle, margin: 0 }}>UX Design Intern</p>
                </div>
                <div>
                  <span style={eyebrowStyle}>Team</span>
                  <p style={{ ...pStyle, margin: 0 }}>3 designers — I owned onboarding; two designers owned dashboard and business listing form components</p>
                </div>
                <div>
                  <span style={eyebrowStyle}>Tools</span>
                  <p style={{ ...pStyle, margin: 0 }}>Web analytics, session recordings, heuristic evaluation, competitor analysis, wireframing, prototyping</p>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* CONTEXT                                 */}
            {/* ════════════════════════════════════════ */}
            <section id="context" style={sectionStyle}>
              <Block
                eyebrow="Context"
                header="Builder Market connected homeowners with home service professionals"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Builder Market was an early-stage startup that connected homeowners looking for home services with professionals who provide those services. On the homeowner side, the platform let people find and hire trusted professionals for their projects. On the professional side, it let professionals list their business and receive leads through the platform.
                </p>
              </Block>

              <Block
                header="The product roadmap invested in tools for professionals already active on the platform"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Lead management, website creation, financial tools, calendars, messaging, and a LinkedIn-style networking layer for professionals who were already using the platform actively.
                </p>
              </Block>

              <Block
                header="Business listing creation was the activation moment, and pros weren't getting there"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Despite monthly visitors, few pros created a business listing. Pros created listings within the platform's onboarding flow.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* PROBLEM DISCOVERY                       */}
            {/* ════════════════════════════════════════ */}
            <section id="problem-discovery" style={sectionStyle}>
              <Block
                eyebrow="Problem Discovery"
                header="Web analytics showed a 71.6% drop-off in the onboarding flow"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  When I joined as an intern, I was tasked with redesigning the onboarding flow because of this drop-off rate. I investigated by analyzing Hotjar analytics, reviewing session recordings, and benchmarking against competing marketplaces.
                </p>
                <ProblemCostAnnotations columns={[
                  {
                    problem: 'Business listing creation triggered the drop-off in the onboarding flow',
                    description: 'Web analytics showed the drop-off concentrated in business listing creation. Completing a listing took 8 minutes (timed the flow in UX audit).',
                    cost: 'Longest path to value · High drop-off before payoff',
                    media: <video src="/marketplace/modals.mp4" autoPlay loop muted playsInline style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }} />,
                  },
                  {
                    problem: "Onboarding described the platform's value instead of letting pros experience it",
                    description: 'Session recordings showed rage clicks on the marketing modals. Pros trying to move past the pitch to reach the value.',
                    cost: 'No first-hand value · Friction before payoff',
                    media: <video src="/marketplace/modals.mp4" autoPlay loop muted playsInline style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }} />,
                  },
                  {
                    problem: "Even after completing a business listing, pros didn't reach the value",
                    description: 'Pros who finished listing creation landed on the marketing homepage, not on any product surface. Competitors landed pros on a dashboard, letting them experience the platform.',
                    cost: 'No reason to return · Acquisition spend wasted',
                  },
                ]} />
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* REFRAME                                 */}
            {/* ════════════════════════════════════════ */}
            <section id="reframe" style={sectionStyle}>
              <Block
                eyebrow="Reframe"
                header={`I reframed the problem from "reduce onboarding drop-off" to "get pros to value early" and redefined success as the value became clearer`}
              >
                <p style={pStyle}>
                  The findings pointed that pros were asked to commit before the platform showed them anything. I redefined success from listing completion to time to reach value on a dashboard.
                </p>
                <p style={{ ...pStyle, margin: '20px 0 0' }}>
                  Part-way through, the business surfaced that they were sourcing leads externally and the first few would be free — a concrete value pros could reach. I redefined success again around claiming that free lead. This moved listing creation to after the pro sees value, betting that a pro who has seen a real lead completes the listing more readily than one asked upfront.
                </p>
                <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-hair)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', margin: '18px 0 0', transition: 'var(--transition-theme)' }}>
                  <img src="/marketplace/reframe.png" alt="Reframed success metric — listing creation moved after first free lead" style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }} />
                </div>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* SOLUTION                                 */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="solution" label="Solution">
              <Block header="I redesigned onboarding to collect only what lead-matching needs: business name, service type, service area">
                <p style={pStyle}>
                  Pros now pick one service through search instead of scrolling categories; additional services are optional. The business name field matches against the existing directory as they type, so they can claim an existing listing instead of creating a duplicate.
                </p>
                <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                  <video src="/marketplace/solution.mp4" autoPlay loop muted playsInline style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }} />
                </div>
              </Block>
            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* IMPACT                                  */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <ImpactCards cards={[
                {
                  title: 'Bounce: 71.6% → 34%',
                  description: 'Web analytics, two weeks post-launch against the baseline month before I started. Before/after comparison, not an A/B test.',
                },
                {
                  title: 'Time to reach a lead: 8 min → under 2',
                  description: 'Timed the redesigned flow the same way (UX audit). Run on the prototype, so it excludes production latency and edge cases.',
                },
              ]} />
              <Note>
                Both these metrics measure the flow I owned: how fast pros reached value. Whether more pros went on to complete a full business listing depended on the listing form and dashboard, owned by the other designers.
              </Note>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* POST-LAUNCH REVIEW                       */}
            {/* ════════════════════════════════════════ */}
            <section id="post-launch-review" style={sectionStyle}>
              <Block
                eyebrow="Post-launch Review"
                header="I reviewed production session recordings and found three interaction problems in the redesign"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  The structural changes reduced the major friction, but watching the production build surfaced three problems.
                </p>
                <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', margin: '20px 0 0', transition: 'var(--transition-theme)' }}>
                  <video src="/marketplace/review.mp4" autoPlay loop muted playsInline style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }} />
                  <FindingCards findings={[
                    {
                      header: 'The service dropdown closed after every selection.',
                      description: 'Pros adding more than one service had to reopen it each time. Recordings showed hesitation and rapid re-clicks.',
                    },
                    {
                      header: "Search wasn't discoverable.",
                      description: 'Some pros defaulted to scrolling instead of typing, the behavior the redesign was meant to replace.',
                    },
                    {
                      header: 'The clear icon sat next to the dropdown toggle.',
                      description: 'The two were easy to confuse, and recordings showed mis-clicks between them.',
                    },
                  ]} />
                </div>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* LEARNINGS                               */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <FindingCards findings={[
                {
                  header: "I kept asking what pros get out of the platform, and why they'd come back",
                  description: 'The ask was listing completion. I kept putting the value question back to the team. Each answer moved what success meant, from completing a listing, to reaching the dashboard, to claiming a free lead.',
                },
                {
                  header: 'I proposed a structure before the internship started',
                  description: "I came in with a proposal doc setting out what I wanted to own and what I needed from the team. That's what carved out the four weeks I spent on onboarding, activation, and the lead-claim flow.",
                },
              ]} />
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHAT I'D DO DIFFERENTLY                 */}
            {/* ════════════════════════════════════════ */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
