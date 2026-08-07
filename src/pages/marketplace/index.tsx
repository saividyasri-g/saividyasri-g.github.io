import type { ReactNode } from 'react'
import {
  Overview,
  Outline,
  Learning,
  DiagramSection,
  sectionStyle,
  h2Style,
  pStyle,
  Block,
  ScenarioGroup,
  SectionDivider,
} from '../../components/case-study'
import Card from '../../components/ui/Card'

const outlineItems = [
  { id: 'context',         num: '', label: 'Context' },
  { id: 'why-it-mattered', num: '', label: 'Why it mattered' },
  { id: 'research',        num: '', label: 'Research' },
  { id: 'scenario-01',     num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',     num: '', label: 'Problem · Solution 2' },
  { id: 'scenario-03',     num: '', label: 'Problem · Solution 3' },
  { id: 'impact',          num: '', label: 'Impact' },
  { id: 'learnings',       num: '', label: 'Learnings' },
  { id: 'differently',     num: '', label: 'Do Differently' },
]

const overviewItems = [
  { label: 'Role',                       value: 'Product Designer' },
  { label: 'Team',                       value: '1 Product Designer, 1 PM, 2 Engineers' },
  { label: 'Timeline',                   value: 'TBD' },
  { label: 'Design & Management Skills', value: 'Funnel analysis, activation flow design, growth design' },
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
      <p style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>{children}</p>
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

      {/* ── Hero / Title ── */}
      <section style={{ paddingTop: 'var(--space-10)' }}>
        <div className="layout-header-pad" style={{ padding: '0 var(--space-12)' }}>
          <ImgStage label="Case study thumbnail — marketplace activation" aspectRatio="21 / 9" />
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
              <TbdCallout>Company name and year — fill in before publishing.</TbdCallout>
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
              Solving the Activation Problem in a Two-Sided Marketplace Platform.
            </h1>
            <Overview items={overviewItems} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-10)',
                marginTop: 'var(--space-8)',
              }}
            >
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
                  A marketplace platform was signing up new suppliers but losing most of them before they reached their first active listing. Suppliers who made it past onboarding but hadn't yet transacted were the platform's largest untapped growth lever — and the activation path was the primary blocker.
                </p>
              </Card>

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
                  I redesigned the supplier activation flow — reducing the onboarding to a progressive disclosure model, redesigning the empty state to give first-time users a clear next action, and adding contextual social proof at the moments of highest drop-off.
                </p>
              </Card>
            </div>
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
            {/* CONTEXT                                 */}
            {/* ════════════════════════════════════════ */}
            <section id="context" style={sectionStyle}>
              <Block
                eyebrow="Context"
                header="A two-sided marketplace where growth required activating both sides — but one side was falling away before the first transaction."
              >
                <p style={pStyle}>
                  The platform connected buyers and suppliers on a marketplace model. The supply side was the growth constraint: without sufficient active, listed suppliers, buyers had limited selection, which suppressed demand, which in turn reduced supplier motivation to complete onboarding.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  Suppliers were signing up in reasonable numbers. The problem was activation — the proportion making it from sign-up to first active listing was low enough to make supply-side growth expensive and slow.
                </p>
              </Block>

              <Block
                header="Activation was defined as a supplier completing their first listing and receiving their first order — but most suppliers dropped well before listing."
              >
                <p style={pStyle}>
                  Funnel analysis showed two major drop-off points: one during the onboarding form (before the supplier had ever seen the product), and one on the post-onboarding empty state (after signup, before listing). Together, these two points accounted for the majority of activation failures.
                </p>
                <StatRow stats={[
                  { value: 'TBD%', label: 'Drop at onboarding form' },
                  { value: 'TBD%', label: 'Drop at empty state' },
                  { value: 'TBD%', label: 'Reached first listing' },
                ]} />
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHY IT MATTERED                         */}
            {/* ════════════════════════════════════════ */}
            <section id="why-it-mattered" style={sectionStyle}>
              <Block
                eyebrow="Why it mattered"
                header="Each activated supplier had a compounding effect on supply-side depth — the activation rate was the supply-side growth rate."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  A supplier who activates lists products, attracts orders, and re-engages. A supplier who drops off is a lost acquisition cost with no return. At the scale this platform was targeting, a 10-point improvement in activation rate translated directly into supply-side volume and reduced the cost-per-active-supplier significantly.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* RESEARCH                                */}
            {/* ════════════════════════════════════════ */}
            <section id="research" style={sectionStyle}>
              <SectionDivider label="Research" />
              <Block
                header="Funnel analysis told us where suppliers dropped. Interviews told us why."
              >
                <p style={pStyle}>
                  I combined quantitative funnel data with qualitative interviews of suppliers at different activation stages — those who dropped early, those who made it to listing but didn't convert, and those who activated successfully.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  Three themes emerged consistently: the onboarding form asked for information suppliers didn't have on hand, the empty state after signup gave no direction on what to do first, and suppliers who nearly dropped cited a moment of uncertainty — "I wasn't sure this platform was worth my time yet."
                </p>
                <ImgStage label="Research synthesis — drop-off themes and interview quotes" />
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 01 — ONBOARDING FORM           */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-01">

              <Block
                eyebrow="Problem 1"
                header="The onboarding form front-loaded information suppliers didn't have — and abandoned them mid-flow when they couldn't continue."
              >
                <p style={pStyle}>
                  The onboarding form was a single long sequence asking for business registration details, tax information, banking details, and catalogue structure — in one sitting. Most suppliers had some of this information but not all of it.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  When a supplier couldn't answer a required field, there was no save-and-return. They abandoned the form. When they returned later, they restarted. The cumulative dropout from this loop was the largest single activation loss.
                </p>
                <ImgStage label="Before: long-form onboarding flow — dropout points annotated" />
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 1"
                title="A progressive disclosure model — complete what you have now, return for the rest."
                description="I redesigned the onboarding into a staged model. Stage 1 required only a minimal set of fields to create an account and unlock the product. Stage 2 and 3 — required for listing and payment — could be completed in any order, with progress saved between sessions. Suppliers could see the product before completing all requirements."
                tabs={[{
                  id: 's1-solution',
                  diagram: <ImgStage label="Progressive onboarding — staged flow, save and return, annotated" />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 02 — EMPTY STATE               */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-02">

              <Block
                eyebrow="Problem 2"
                header="The empty state after signup offered no direction — suppliers landed in a blank dashboard with no clear first action."
              >
                <p style={pStyle}>
                  After completing enough of onboarding to log in, suppliers saw a dashboard with empty states across every widget: no listings, no orders, no activity. There was no prioritised next action, no indication of what "active" would look like, and no prompt toward the steps still required.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  For suppliers already uncertain whether the platform was worth their time, this blank state was the moment most of them decided it wasn't.
                </p>
                <ImgStage label="Before: empty state dashboard — uncertainty points annotated" />
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 2"
                title="A guided activation checklist that replaced the empty state with a structured path to first listing."
                description="I designed a persistent activation panel on the post-login dashboard that gave each new supplier a numbered checklist: complete your profile, add your first listing, set your delivery options, receive your first order. Each step was accompanied by the estimated time it took and unlocked progressively. The panel stayed visible until a supplier reached first-order status."
                tabs={[{
                  id: 's2-solution',
                  diagram: <ImgStage label="Activation checklist panel — progressive unlock, time estimates, annotated" />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 03 — TRUST MOMENT              */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-03">

              <Block
                eyebrow="Problem 3"
                header="Suppliers who nearly dropped cited a moment of uncertainty — they needed evidence the platform was worth completing setup for."
              >
                <p style={pStyle}>
                  Interviews with suppliers who re-engaged after nearly dropping revealed a common trigger: seeing that other suppliers were active, and seeing how the platform was performing for them. Suppliers who dropped had no equivalent moment.
                </p>
                <p style={{ ...pStyle, margin: 0 }}>
                  The activation path offered no social proof, no transaction volume signals, and no indication of what demand looked like on the buyer side.
                </p>
              </Block>

              <DiagramSection
                wide={false}
                stage="after"
                solutionLabel="Solution 3"
                title="Contextual social proof at the two highest drop-off points in the activation flow."
                description="I added lightweight trust signals at the onboarding form and the empty-state dashboard. At the form: a banner showing how many suppliers in the same category had joined in the last month and what they earned. At the dashboard: a 'what others are earning' tile with anonymised order volume from similar suppliers. Neither blocked the flow — they appeared contextually alongside the step where suppliers most frequently questioned whether to continue."
                tabs={[{
                  id: 's3-solution',
                  diagram: <ImgStage label="Social proof placement — onboarding banner + dashboard tile, annotated" />,
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* IMPACT                                  */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <h2 style={h2Style}>Activation rate improvement across the full funnel.</h2>
              <div style={{ borderTop: '1px solid var(--color-border-hair)', marginTop: '8px', transition: 'var(--transition-theme)' }}>
                <ImpactItem>
                  <TbdCallout>Add measured improvement in onboarding completion rate after progressive disclosure redesign.</TbdCallout>
                </ImpactItem>
                <ImpactItem>
                  <TbdCallout>Add measured improvement in empty-state to first-listing conversion after checklist.</TbdCallout>
                </ImpactItem>
                <ImpactItem>
                  <TbdCallout>Add overall activation rate change (sign-up to first order) after full rollout.</TbdCallout>
                </ImpactItem>
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* LEARNINGS                               */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <Learning>
                Activation is a trust problem as much as a usability problem — fixing the flow matters, but so does giving users a reason to complete it.
              </Learning>
              <p style={{ ...pStyle, marginTop: '16px' }}>
                I expected most of the gain to come from the progressive onboarding form. In testing, the empty-state and social-proof changes had as much impact on stated confidence to continue — which surprised me. The flow friction was real, but uncertainty about return on effort was equally blocking.
              </p>
              <TbdCallout>Expand with your own synthesis from this project. What changed about how you think about activation or growth design?</TbdCallout>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* WHAT I'D DO DIFFERENTLY                 */}
            {/* ════════════════════════════════════════ */}
            <section id="differently" style={sectionStyle}>
              <SectionDivider label="What I'd do differently" />
              <h2 style={h2Style}>
                Run the funnel analysis before the interviews — not alongside them.
              </h2>
              <p style={pStyle}>
                I ran quantitative and qualitative research in parallel, which meant I was asking interview questions without yet knowing where in the funnel the drop was concentrated. Knowing the data first would have let me target the interviews more precisely — talking to suppliers who dropped at specific funnel steps rather than distributed across all of them.
              </p>
              <TbdCallout>Add any other reflections — on scope, on what you would have pushed for, or on anything that was surprising about working on this type of problem.</TbdCallout>
            </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
