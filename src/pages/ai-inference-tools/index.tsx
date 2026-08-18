import type { ReactNode } from 'react'
import {
  Outline,
  sectionStyle,
  pStyle,
  eyebrowStyle,
  h2Style,
  Block,
} from '../../components/case-study'

const outlineItems = [
  { id: 'overview',           num: '', label: 'Overview' },
  { id: 'buying-journey',     num: '', label: 'Research & Discovery' },
  { id: 'pricing',            num: '', label: 'Pricing Problem' },
  { id: 'competitive-audit',  num: '', label: 'Intake Problem' },
  { id: 'intake-flow',        num: '', label: 'Concept Design' },
  { id: 'validation-plan',    num: '', label: 'Testing Plan & Strategy' },
]

/*
 * Dashed-border finding card styles — mirrors the page-local pattern in
 * marketplace/index.tsx, hmc/index.tsx, and fidelity/index.tsx (not a
 * shared component yet, so kept page-local here too).
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

/** Numbered (or custom-labelled) finding cards. `columns` lays cards out side by side (same "annotation-grid" pattern as marketplace/index.tsx's ImpactCards, so it collapses to one column on narrow screens); `showLabels` hides the #N/label eyebrow entirely. */
function FindingCards({
  findings,
  columns = 1,
  showLabels = true,
}: {
  findings: { label?: string; header: string; description: ReactNode }[]
  columns?: number
  showLabels?: boolean
}) {
  return (
    <div
      className={columns > 1 ? 'annotation-grid' : undefined}
      style={
        columns > 1
          ? { gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'var(--space-5)', margin: '20px 0' }
          : { display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', margin: '20px 0' }
      }
    >
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
          {showLabels && <span style={findingCardEyebrow}>{item.label ?? `#${i + 1}`}</span>}
          <p style={findingCardHeader}>{item.header}</p>
          <div style={findingCardDesc}>{item.description}</div>
        </div>
      ))}
    </div>
  )
}

/** Inline note — left-border callout, mirrors the "Note" pattern in marketplace/index.tsx and hmc/index.tsx (page-local there too). */
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

/** Sentence-style subhead used within the Validation Plan's Block, one step down from Block's own h2. */
const subHeadStyle: React.CSSProperties = {
  ...h2Style,
  fontSize: 'var(--text-base)',
  margin: '28px 0 8px',
}

/* ── Page ─────────────────────────────────────────────── */

export default function AiInferenceTools() {
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
      {/* ── Hero image, same framing as marketplace/hmc/fidelity's hero ── */}
      <section style={{ paddingTop: 'var(--space-10)' }}>
        <div className="layout-header-pad" style={{ padding: '0 var(--space-12)' }}>
          <div
            style={{
              background: 'var(--color-surface-card)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-8)',
              transition: 'var(--transition-theme)',
            }}
          >
            <img
              src="/ai_inference/header.png"
              alt="Competitive positioning quadrant — configuration burden vs. cost predictability across Groq, Together.ai, and Fireworks AI"
              style={{ width: '70%', display: 'block', borderRadius: 'var(--radius-sm)', margin: '0 auto' }}
            />
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
                  AI Inference Tools: Intake and Purchase Decision
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '0 0 24px' }}>
                  <a
                    href="https://www.figma.com/design/Hk7utIeqU6j3bKIRppmrEC/AI-inference-research?node-id=0-1&t=UaY0cUAfejsmiDsJ-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-title)', textDecoration: 'underline', textUnderlineOffset: '2px', transition: 'var(--transition-theme)' }}
                  >
                    Figma file
                  </a>
                  <a
                    href="https://docs.google.com/document/d/15fguZIjgfrbzfGQifFXHs2-nEGvuXYTp_pnObMW8NRA/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text-title)', textDecoration: 'underline', textUnderlineOffset: '2px', transition: 'var(--transition-theme)' }}
                  >
                    Research log
                  </a>
                </div>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <span style={eyebrowStyle}>Overview</span>
                  <p style={{ ...pStyle, margin: '8px 0 16px' }}>
                    I started with no knowledge of this domain. I set out to find where an unsolved problem sits in AI infrastructure and design against it.
                  </p>
                  <p style={{ ...pStyle, margin: '0 0 16px' }}>
                    I learned that the buying chain runs bottom-up over ~9 months, and that the ML engineer who discovers a tool becomes its salesperson inside their own company. Deals fail most often when that engineer escalates to their manager, because a technical trial does not produce a business case. I also learned that pricing and intake solve the same problem: whether the engineer can predict a cost and defend it to someone who will not read benchmarks.
                  </p>
                  <p style={{ ...pStyle, margin: '0 0 16px' }}>
                    From this I formed a hypothesis: ML engineers configuring an inference tool think in terms of what they are running (model, workload type, request volume, latency tolerance) not in terms of hardware. I designed an intake flow on that hypothesis, structured so the engineer reaches a result and a defensible cost estimate in the same session.
                  </p>
                  <Note label="Tools">
                    I used Claude for the secondary research like finding sources, summarising community forums discussion, and building the buyer journey and positioning maps. I audited Groq, Fireworks AI, and Together.ai myself. I specified the intake flow and generated the wireframes by prompting in Paper.
                  </Note>
                </div>
              </section>

              {/* ════════════════════════════════════════ */}
              {/* BUYING JOURNEY                          */}
              {/* ════════════════════════════════════════ */}
              <section id="buying-journey" style={sectionStyle}>
                <Block
                  eyebrow="Research & Discovery"
                  header="The engineer who trials the tool has to make the business case to their manager"
                >
                  <p style={{ ...pStyle, margin: 0 }}>
                    I mapped the buying process for a mid-size company, 500 to 5,000 employees, across six stages. An engineer hits a trigger, searches community forums, trials the tool alone, then escalates through a manager, a VP, and finally security, legal, and procurement.
                  </p>
                  <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', margin: '20px 0 0', transition: 'var(--transition-theme)' }}>
                    <img
                      src="/ai_inference/buying-journey.png"
                      alt="Buying journey map for a mid-size company — six stages from awareness to procurement, with what moves each stage forward and what kills it"
                      style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                    />
                    <FindingCards
                      findings={[
                        {
                          header: 'Most deals stop at the first escalation',
                          description: 'The engineer has technical evidence. The manager needs switching cost, the risk of switching against not switching, and a build-versus-buy rationale.',
                        },
                        {
                          header: 'Engineers start looking because of a specific problem.',
                          description: 'Bill shock, latency, a compliance flag, or moving a proof of concept into production.',
                        },
                        {
                          header: 'The purchase takes about nine months.',
                          description: 'Long enough for the champion to leave, the priority to shift, or a competitor to win.',
                        },
                      ]}
                    />
                  </div>
                  <Note label="Learning #1">
                    I assumed identifying the buyer mattered. It does not. What matters is the effort and confidence behind the decision, because every unit of effort required to understand a product's value is a reason not to buy it.
                  </Note>
                </Block>
              </section>

              {/* ════════════════════════════════════════ */}
              {/* PRICING                                 */}
              {/* ════════════════════════════════════════ */}
              <section id="pricing" style={sectionStyle}>
                <Block
                  eyebrow="Pricing Problem"
                  header="Pricing information decides whether the engineer can make the case"
                >
                  <p style={{ ...pStyle, margin: 0 }}>
                    I compared per-token pricing, GPU-hour pricing, and prepaid credits against what each does to the buyer's confidence.
                  </p>
                  <FindingCards
                    findings={[
                      {
                        header: 'Per-token pricing removes the entry barrier and the cost ceiling',
                        description: 'No provisioning risk and control through prompt and batching decisions. Token counts still depend on model behaviour, output verbosity, and retries.',
                      },
                      {
                        header: 'GPU-hour pricing gives a known maximum and wastes money when idle',
                        description: "A known maximum, and visibly burning money when GPUs sit unused. Teams stay on more expensive token pricing because they know what they are losing and not what they might save.",
                      },
                      {
                        header: 'Pricing has to serve the trial and the escalation.',
                        description: 'Unit economics while the engineer is testing, a forecast when they present it.',
                      },
                    ]}
                  />
                  <Note label="Learning #2">
                    I looked up how ML engineers talk about cost before writing any interface copy. Predictability, transparency, and control appear far more often than speed.
                  </Note>
                </Block>
              </section>

              {/* ════════════════════════════════════════ */}
              {/* COMPETITIVE AUDIT                       */}
              {/* ════════════════════════════════════════ */}
              <section id="competitive-audit" style={sectionStyle}>
                <Block
                  eyebrow="Intake Problem"
                  header="The three platforms I audited start with configuration or a playground"
                >
                  <p style={{ ...pStyle, margin: 0 }}>
                    I audited Groq, Together.ai, and Fireworks AI, annotating how each handles the first interaction after sign-in.
                  </p>
                  <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', margin: '20px 0 0', transition: 'var(--transition-theme)' }}>
                    <img
                      src="/ai_inference/market-positioning.png"
                      alt="Competitive positioning quadrant — configuration burden vs. cost predictability across Groq, Together.ai, and Fireworks AI"
                      style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                    />
                    <FindingCards
                      findings={[
                        {
                          header: 'All three assume the user wants to experiment',
                          description: 'The research says engineers arrive with a problem they already know how to describe.',
                        },
                        {
                          header: 'Engineers have a specific target and a short time limit.',
                          description: 'A latency number, a bill, or a deadline, and about thirty minutes to find out whether the tool helps.',
                        },
                        {
                          header: 'Company size changes who does this work.',
                          description: 'Large enterprises have ML and MLOps roles. Mid-size companies give inference to backend platform or DevOps engineers who know web infrastructure and not GPU specifications.',
                        },
                      ]}
                    />
                  </div>
                  <Note label="Learning #3">
                    I got stuck choosing which platforms to audit. I looked at CoreWeave, NVIDIA Run:ai, Modal, AWS, Together.ai, Groq, Fireworks, and Baseten, which is itself a version of the problem I was studying: deciding which tool to use. The mid-size staffing pattern is also why API-first products took this market.
                  </Note>
                </Block>
              </section>

              {/* ════════════════════════════════════════ */}
              {/* INTAKE FLOW                              */}
              {/* ════════════════════════════════════════ */}
              <section id="intake-flow" style={sectionStyle}>
                <Block
                  eyebrow="Concept Design"
                  header="I designed the intake flow starting with the model and the workload"
                >
                  <p style={{ ...pStyle, margin: 0 }}>
                    The flow runs in four steps: select or upload a model, describe the workload, choose what to improve, test.
                  </p>
                  <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', margin: '20px 0 0', transition: 'var(--transition-theme)' }}>
                    <video
                      src="/ai_inference/ai-inference-intake-flow.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                    />
                    <FindingCards
                      findings={[
                        {
                          header: 'The model source determines which improvements the tool can offer.',
                          description: 'A catalogue model exposes prompt optimisation, caching, and routing. An uploaded model exposes quantisation, distillation, and export. The branch follows from what is technically possible against each.',
                        },
                        {
                          header: "The workload questions use the engineer's terms.",
                          description: 'When requests happen, how many per month, and an explicit option for not knowing.',
                        },
                        {
                          header: 'The credit balance stays in the navigation.',
                          description: 'The spending ceiling is visible during the work rather than on a separate pricing page.',
                        },
                      ]}
                    />
                  </div>
                </Block>
              </section>

              {/* ════════════════════════════════════════ */}
              {/* VALIDATION PLAN                          */}
              {/* ════════════════════════════════════════ */}
              <section id="validation-plan" style={sectionStyle}>
                <Block
                  eyebrow="Testing Plan & Strategy"
                  header="I would test whether engineers configure by workload or by hardware"
                >
                  <p style={{ ...pStyle, margin: 0 }}>
                    My concept rests on one answer to this, and my own research points both ways. If I had one week and five user interviews lined up with ML engineers at mid-size AI companies, this would be the one question I would use that time to answer.
                  </p>

                  <h3 style={subHeadStyle}>
                    I would talk to engineers who have set up both pricing models recently
                  </h3>
                  <p style={{ ...pStyle, margin: 0 }}>
                    ML engineers at mid-size AI companies who have configured an inference tool on GPU-hour and token-based pricing in the last few months. Record the participants' scope (what they are responsible for, and how much of the infrastructure decision is theirs) and company (size, domain, and the use case they were setting up for) details for segmentation.
                  </p>
                </Block>

                <Block header="Phase 1: I would run 3/5 qualitative research interviews to validate the hypothesis">
                  <p style={{ ...pStyle, margin: 0 }}>
                    <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>Hypothesis: </strong>
                    ML engineers configuring an inference tool think in terms of what they are running (model, workload type, request volume, latency tolerance) rather than hardware requirements.
                  </p>
                  <span style={{ ...eyebrowStyle, display: 'block', margin: '20px 0 0' }}>Testing results and strategy</span>
                  <FindingCards
                    columns={3}
                    showLabels={false}
                    findings={[
                      {
                        header: 'If all three describe the workload first.',
                        description: 'The assumption holds. I learn what else they consider beyond model, latency, and volume, and why. Anything that changes the design goes into the wireframes before the next phase.',
                      },
                      {
                        header: 'If one or more describe hardware first.',
                        description: 'The design does not serve them, and I need to know why GPU configuration feels right. I map what those engineers have in common and survey a wider group to segment by preference.',
                      },
                      {
                        header: 'If they describe something else entirely.',
                        description: 'The most useful outcome and the one I have least prepared for. I learn what they are actually thinking about, then segment the same way.',
                      },
                    ]}
                  />
                </Block>

                <Block header="Phase 2: I would test the concept only if all three interviews support the hypothesis">
                  <p style={{ ...pStyle, margin: '0 0 16px' }}>
                    Participants perform the first interaction as a task and think out loud. I observe where they hesitate and what they read.
                  </p>
                  <p style={{ ...pStyle, margin: 0 }}>
                    <strong style={{ color: 'var(--color-text-title)', fontWeight: 600 }}>What I validate: </strong>
                    time from sign-in to first output is less than {'<target time>'}. I would benchmark Groq, Fireworks, and Together first and use a real target value.
                  </p>
                  <span style={{ ...eyebrowStyle, display: 'block', margin: '20px 0 0' }}>Testing results and strategy</span>
                  <FindingCards
                    columns={2}
                    showLabels={false}
                    findings={[
                      {
                        header: 'If under the target benchmark.',
                        description: 'I learn which parts of the flow carried them, so I know what to protect in later iterations.',
                      },
                      {
                        header: 'If over the benchmark.',
                        description: 'I find where they stalled and whether design can fix it. If it cannot, the barrier is the finding, and the problem statement needs refining rather than the screens.',
                      },
                    ]}
                  />
                </Block>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
