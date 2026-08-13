import type { ReactNode } from 'react'
import {
  Outline,
  sectionStyle,
  h2Style,
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
  { id: 'scenario-01',       num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',       num: '', label: 'Problem · Solution 2' },
  { id: 'scenario-03',       num: '', label: 'Problem · Solution 3' },
  { id: 'impact',            num: '', label: 'Impact' },
  { id: 'learnings',         num: '', label: 'Learnings' },
  { id: 'differently',       num: '', label: 'Do Differently' },
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

/*
 * Finding card styles — dashed-border card pattern used for numbered
 * findings lists. Mirrors the page-local pattern in hmc/index.tsx
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

/** Numbered finding cards — used in Problem Discovery to lay out the four proxy-method findings. */
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
          <span style={findingCardEyebrow}>Finding #{i + 1}</span>
          <p style={findingCardHeader}>{item.header}</p>
          <p style={findingCardDesc}>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

/** Metric + baseline cards — dashed-card pattern with a side box, mirrors ProblemCostAnnotations/ConstraintPivotGrid. Used in Reframe to lay out the two success metrics. */
function MetricCards({ metrics }: { metrics: { label: string; baseline: string }[] }) {
  const baselineColor = '#6B7280'
  const baselineFill = '#F1F2F4'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', margin: '20px 0' }}>
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            background: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23BEC1C3' stroke-width='0.6' stroke-dasharray='2%2c2'/%3e%3c/svg%3e")`,
            padding: 'var(--space-5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-6)',
            transition: 'var(--transition-theme)',
          }}
        >
          <div style={{ flex: 1 }}>
            <span style={findingCardEyebrow}>Metric #{i + 1}</span>
            <p style={{ ...findingCardHeader, margin: 0 }}>{m.label}</p>
          </div>
          <div style={{ width: '280px', flexShrink: 0, background: baselineFill, borderRadius: 'var(--radius-card)', padding: 'var(--space-4) var(--space-5)', transition: 'var(--transition-theme)' }}>
            <span style={{ ...findingCardEyebrow, marginBottom: 'var(--space-2)', color: `${baselineColor}e6` }}>Baseline</span>
            {/* Fixed dark text — this panel's fill stays light in both themes, so text must not follow the theme-swapping body-text token. */}
            <span style={{ fontSize: 'var(--text-base)', fontWeight: 400, lineHeight: 1.35, color: 'var(--primitive-light-title)' }}>
              {m.baseline}
            </span>
          </div>
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
      {/* div, not p — children here is a TbdCallout, which renders its own block-level markup that isn't valid inside a <p>. */}
      <div style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>{children}</div>
    </div>
  )
}

/* ── Stat tile ────────────────────────────────────────── */

function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: 'var(--space-5)',
        margin: '24px 0',
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-hair)',
            padding: '20px 24px',
            transition: 'var(--transition-theme)',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-title)',
              lineHeight: 1.1,
              marginBottom: '6px',
              transition: 'var(--transition-theme)',
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '.1em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-meta)',
              transition: 'var(--transition-theme)',
            }}
          >
            {s.label}
          </div>
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
          <ImgStage label="Case study thumbnail — Builder Market onboarding" aspectRatio="21 / 9" />
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
                Cutting Professional Signup Bounce From 71.6% to 34% in a Two-Sided Marketplace.
              </h1>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={eyebrowStyle}>Overview</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  Builder Market is a two-sided home services marketplace. When I joined as a product design intern, 71.6% of professionals were dropping off during signup. The product roadmap was investing in retention features designed for professionals who were already active on the platform, while most professionals were never becoming active for those features to matter.
                </p>
              </div>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <span style={eyebrowStyle}>Impact</span>
                <p style={{ ...pStyle, margin: 0 }}>
                  I owned the onboarding redesign. The redesign removed nine marketing modals from the signup flow, shortened the form to the fields the platform needed to run lead-matching, and routed post-signup to a dashboard where real matched leads were visible. Bounce during signup dropped from 71.6% to 34% in the two weeks after launch, measured as a pre/post comparison against the equivalent prior window.
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
                header="The startup sourced leads externally and matched them to pros based on the business listing"
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Professionals could claim the first few matched leads free before paying for any. This was the startup's advantage in the competitive market landscape.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* PROBLEM DISCOVERY                       */}
            {/* ════════════════════════════════════════ */}
            <section id="problem-discovery" style={sectionStyle}>
              <Block
                eyebrow="Problem Discovery"
                header="Web analytics showed a 71.6% drop-off in the onboarding flow."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  When I joined as an intern, I was tasked with redesigning the onboarding flow because of this drop-off rate. I investigated by analyzing Hotjar analytics, reviewing session recordings, and benchmarking against competing marketplaces.
                </p>
                <FindingCards findings={[
                  {
                    header: 'The signup flow used nine marketing modals to describe future value with a generic example.',
                    description: "Each modal described what the platform could do for the professional's business in the future, using aspirational language and a single generic example. Session recordings showed professionals rage-clicking Back and Continue trying to move past the modals to reach the actual product.",
                  },
                  {
                    header: 'Signup routed professionals back to the marketing homepage instead of the leads dashboard.',
                    description: 'Professionals who completed signup landed on the homepage, where nothing showed them a matched lead or gave them a reason to return.',
                  },
                  {
                    header: "Builder Market's onboarding flow was a market outlier.",
                    description: "Angi, Jobber, and Houzz Pro introduced professionals to dashboards and management tools early in onboarding, letting them experience the platform's value before committing to detailed configuration. Builder Market's flow did the opposite.",
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
                header={`I reframed the problem from "onboarding redesign" to "onboarding is gating pros from the platform's value" and defined two success metrics with baselines`}
              >
                <p style={pStyle}>
                  Findings pointed at a deeper problem than the ask: the flow wasn't just tedious to complete, it was gating pros from the matched leads that were the platform's advantage. Fixing the flow's usability would have produced a smoother version of the same problem.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  I proposed two metrics to measure the redesign's impact, and established baselines for both.
                </p>
                <MetricCards metrics={[
                  {
                    label: 'Onboarding drop-off rate',
                    baseline: '71.6% (web analytics, 2 weeks at the start of the internship)',
                  },
                  {
                    label: 'Time to first value',
                    baseline: '7–8 minutes to reach the end of onboarding',
                  },
                ]} />
                <Note>
                  Time to first value baseline was established through a UX audit where other interns and I ran timed task-completions of the existing flow using fake data. The end of onboarding was the marketing homepage, not a matched lead, so none of the 7–8 minutes delivered value.
                </Note>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 01 — ONBOARDING FORM           */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-01" label="Problem · Solution 1">
              <TbdCallout>Add Problem 1 / Solution 1 — likely maps to removing the nine marketing modals from the signup flow (referenced in the Overview Impact summary). Fill in with the before/after detail, screens, and reasoning.</TbdCallout>
            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 02                              */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-02" label="Problem · Solution 2">
              <TbdCallout>Add Problem 2 / Solution 2 — likely maps to shortening the signup form to only the fields needed for lead-matching. Fill in with the before/after detail, screens, and reasoning.</TbdCallout>
            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 03                              */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-03" label="Problem · Solution 3">
              <TbdCallout>Add Problem 3 / Solution 3 — likely maps to routing post-signup to a dashboard showing real matched leads instead of the marketing homepage. Fill in with the before/after detail, screens, and reasoning.</TbdCallout>
            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* IMPACT                                  */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <h2 style={h2Style}>Signup bounce dropped from 71.6% to 34% in the two weeks after launch.</h2>
              <StatRow stats={[
                { value: '71.6%', label: 'Signup bounce — before' },
                { value: '34%', label: 'Signup bounce — after' },
              ]} />
              <div style={{ borderTop: '1px solid var(--color-border-hair)', marginTop: '8px', transition: 'var(--transition-theme)' }}>
                <ImpactItem>
                  <TbdCallout>Add any dashboard/business-listing-side impact metrics from the two designers who owned those components, if relevant to attribute alongside the onboarding number.</TbdCallout>
                </ImpactItem>
                <ImpactItem>
                  <TbdCallout>Add downstream impact if measured — e.g. change in professionals reaching a completed business listing, or claiming their first lead, after the onboarding redesign.</TbdCallout>
                </ImpactItem>
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* LEARNINGS                               */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <TbdCallout>Add your synthesis from this project — what changed about how you think about onboarding, activation, or scoping a redesign around what the platform actually needed (lead-matching fields) versus what the roadmap assumed mattered (retention features).</TbdCallout>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHAT I'D DO DIFFERENTLY                 */}
            {/* ════════════════════════════════════════ */}
            <section id="differently" style={sectionStyle}>
              <SectionDivider label="What I'd do differently" />
              <TbdCallout>Add reflections — on scope, on what you'd push for given the missing step-level instrumentation on listing creation/activation, or on anything else surprising about this project.</TbdCallout>
            </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
