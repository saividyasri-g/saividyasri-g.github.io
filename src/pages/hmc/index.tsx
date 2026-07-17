import { Overview, Metric, BeforeAfter, Outline, Learning } from '../../components/case-study'

const outlineItems = [
  { id: 'overview', num: '01', label: 'Overview' },
  { id: 'problem', num: '02', label: 'Problem' },
  { id: 'solution', num: '03', label: 'Final Solution' },
  { id: 'impact', num: '04', label: 'Impact' },
  { id: 'deep-dive', num: '05', label: 'Deep Dive' },
]

const overviewItems = [
  { label: 'My Role', value: 'UX Designer & Team Lead' },
  { label: 'Team', value: '2 UX + 1 Visual Designer' },
  { label: 'Duration', value: '9 months (2024)' },
  { label: 'Methods', value: 'Research, Service Design, Concept Testing, Prototyping' },
]

const sectionStyle: React.CSSProperties = {
  padding: '52px 0',
  scrollMarginTop: '90px',
}

const h2Style: React.CSSProperties = {
  fontSize: 'var(--text-xl)',
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
  margin: '0 0 24px',
  maxWidth: '660px',
  transition: 'var(--transition-theme)',
}

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-sm)',
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
  fontWeight: 500,
  transition: 'var(--transition-theme)',
}

function SectionHead({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <span style={sectionLabelStyle}>{label}</span>
    </div>
  )
}

// Placeholder image stage (used until real screenshots are supplied)
function ImgStage({ label, aspectRatio = '16 / 10', muted = false }: { label: string; aspectRatio?: string; muted?: boolean }) {
  const stripes = 'repeating-linear-gradient(135deg, var(--color-stripe-a) 0px, var(--color-stripe-a) 8px, var(--color-stripe-b) 8px, var(--color-stripe-b) 16px)'
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        border: muted ? '1px dashed var(--color-border-hair-hover)' : '1px solid var(--color-border-hair)',
        background: muted ? stripes : 'var(--color-surface-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        aspectRatio,
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


      {/* Hero section — full width, sidebar grid bleeds to left viewport edge */}
      <div>
        <section
          style={{
            padding: 'var(--space-10) 60px var(--space-8)',
          }}
        >
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
              Enterprise · B2B · Service Operations
            </div>
            <h1
              style={{
                fontSize: 'var(--text-4xl)',
                lineHeight: 1.1,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: 'var(--color-text-title)',
                margin: '0 0 16px',
                transition: 'var(--transition-theme)',
              }}
            >
              Vehicle Service Management Tools
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                lineHeight: 1.5,
                color: 'var(--color-text-secondary)',
                margin: '0 0 34px',
                maxWidth: '640px',
                transition: 'var(--transition-theme)',
              }}
            >
              Integrating two-wheeler service workflows for optimal operations and faster delivery.
            </p>
            <Overview items={overviewItems} />
          </div>
        </section>

        {/* Sidebar + main body grid */}
        <div className="layout-grid-body">
          <Outline
            items={outlineItems}
            nextProject={{ label: 'Builder Market', href: '#' }}
          />

          <main style={{ background: 'var(--color-surface-main)', minWidth: 0, transition: 'var(--transition-theme)' }}>
            <div className="layout-main-pad" style={{ padding: 'var(--space-10) var(--space-12) 60px', maxWidth: '900px' }}>

              {/* 01 — Overview */}
              <section id="overview" style={sectionStyle}>
                <SectionHead label="01 — Overview" />
                <h2 style={h2Style}>Manual handoffs on the workshop floor were causing late deliveries.</h2>
                <p style={pStyle}>
                  In India, two-wheeler service-centre management relied heavily on manual information handoffs between service staff, creating workflow dependencies that resulted in late service deliveries — which directly impacted the business of the service centres.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                  <ImgStage label="Workshop floor — service on ramps" />
                  <ImgStage label="Staff identifying vehicle issues" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { t: 'Loss of daily service revenue', m: 'Indicator: reduced ramp utilisation' },
                    { t: 'Customer dissatisfaction', m: 'Indicator: low customer satisfaction index' },
                  ].map(ind => (
                    <div
                      key={ind.t}
                      style={{
                        background: 'var(--color-surface-card)',
                        border: '1px solid var(--color-border-hair)',
                        borderRadius: 'var(--radius-card)',
                        padding: '22px',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '10px', transition: 'var(--transition-theme)' }}>{ind.t}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-meta)', transition: 'var(--transition-theme)' }}>{ind.m}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 02 — Problem */}
              <section id="problem" style={sectionStyle}>
                <SectionHead label="02 — Problem" />
                <h2 style={h2Style}>Two root causes behind the delays.</h2>
                <p style={pStyle}>Combining primary and secondary research, we traced the workflow dependencies and late deliveries back to two root causes.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  {[
                    { n: '#1', k: 'Service Workflow', d: 'Lack of shared, real-time visibility led to fragmented coordination and avoidable workflow delays.', tag: 'User Interviews · Research Synthesis' },
                    { n: '#2', k: 'Service Management Tool', d: 'The tool\'s affordances did not support time-sensitive operations, forcing staff to work around the system rather than through it.', tag: 'Heuristic Evaluation' },
                  ].map(p => (
                    <div
                      key={p.n}
                      style={{
                        background: 'var(--color-surface-card)',
                        border: '1px solid var(--color-border-hair)',
                        borderRadius: 'var(--radius-card)',
                        padding: '26px',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--color-accent)', marginBottom: '14px', transition: 'var(--transition-theme)' }}>{p.n}</div>
                      <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '10px', transition: 'var(--transition-theme)' }}>{p.k}</div>
                      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: '0 0 18px', transition: 'var(--transition-theme)' }}>{p.d}</p>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-meta)', transition: 'var(--transition-theme)' }}>{p.tag}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 03 — Final Solution */}
              <section id="solution" style={sectionStyle}>
                <SectionHead label="03 — Final Solution" />
                <h2 style={h2Style}>From fragmented handoffs to shared, real-time visibility.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '10px' }}>
                  {[
                    {
                      idx: 'Solution 01 / 03',
                      beforeTitle: 'Unstructured job-card form',
                      beforeDesc: 'Poor IA and no field grouping created a long form with no contextual summary; frequently edited fields needed repeated vertical navigation.',
                      beforeImg: 'Old long form (scrolling)',
                      afterTitle: 'Multi-step form with contextual feedback',
                      afterDesc: 'Guided navigation, progress indicators, grouped information, and a clear hierarchy. Critical fields made sticky for constant access.',
                      afterImg: 'New multi-step form',
                    },
                    {
                      idx: 'Solution 02 / 03',
                      beforeTitle: 'Paper job cards preferred',
                      beforeDesc: 'Technicians relied on printed job cards because they supported quick scanning and task tracking during repairs.',
                      beforeImg: 'Printed job card',
                      afterTitle: 'Checklist-like technician interface',
                      afterDesc: 'Job cards become a digital checklist optimised for in-workshop use — touch-friendly, with persistent access to supporting tools.',
                      afterImg: 'Digital checklist UI',
                    },
                    {
                      idx: 'Solution 03 / 03',
                      beforeTitle: 'Manual tracking of operations',
                      beforeDesc: 'Vehicle status across workshops, bays, and waiting areas was tracked manually, with no visibility into who was waiting or what needed attention.',
                      beforeImg: 'Manual floor tracking',
                      afterTitle: 'Real-time operations dashboard',
                      afterDesc: 'A centralised dashboard surfaces vehicle and customer status — Waiting, Ongoing, Pending, Billing — so teams act in time.',
                      afterImg: 'Real-time dashboard',
                    },
                  ].map(sol => (
                    <div key={sol.idx}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          letterSpacing: '.14em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--color-text-meta)',
                          marginBottom: '18px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid var(--color-border-hair)',
                          transition: 'var(--transition-theme)',
                        }}
                      >
                        {sol.idx}
                      </div>
                      <BeforeAfter
                        beforeTitle={sol.beforeTitle}
                        beforeDesc={sol.beforeDesc}
                        beforeContent={<ImgStage label={sol.beforeImg} muted />}
                        afterTitle={sol.afterTitle}
                        afterDesc={sol.afterDesc}
                        afterContent={<ImgStage label={sol.afterImg} />}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* 04 — Impact */}
              <section id="impact" style={sectionStyle}>
                <SectionHead label="04 — Projected Impact" />
                {/* TODO: Sai to confirm final metric values and statuses before wiring real Metric components.
                    All three below are status="intended" (source: Design bundle "Projected Impact" header). */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginTop: '6px' }}>
                  <Metric status="intended" value="5–10%" label="Increase in daily vehicle service capacity." context="Task prioritisation · Ramp utilisation" />
                  <Metric status="intended" value="10–20%" label="Improvement in on-time vehicle service deliveries." context="Accurate documentation · Proactive alerts · Real-time visibility" />
                  <Metric status="intended" value="[TODO]" label="Reduction in job-card creation time. Sai to confirm value and status." context="Guided navigation · Accessible layout" />
                </div>
              </section>

              {/* 05 — Deep Dive */}
              <section id="deep-dive" style={sectionStyle}>
                <SectionHead label="05 — Deep Dive" />
                <h2 style={h2Style}>Understanding the service-centre layout &amp; operations.</h2>
                <p style={pStyle}>To find where the fragmentation happened, we studied the spatial layout and workflow of the service-centre ecosystem. Most centres organise into four operational zones a vehicle moves through, entry to delivery.</p>
                <ImgStage label="Service-centre layout — four operational zones" aspectRatio="16 / 7" />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginTop: '20px', marginBottom: '28px' }}>
                  {[
                    { n: '1', t: 'Vehicle Identification', d: 'Security guard identifies vehicle and customer on entry; customer waits in the lobby.' },
                    { n: '2', t: 'Service Documentation', d: 'Executive documents issues in a job card, assigns staff, and estimates delivery time.' },
                    { n: '3', t: 'Service Execution', d: 'The assigned technician performs the service according to the job card.' },
                    { n: '4', t: 'Billing & Delivery', d: 'Final inspection, billing, and handover of the vehicle to the customer.' },
                  ].map(z => (
                    <div
                      key={z.n}
                      style={{
                        background: 'var(--color-surface-card)',
                        border: '1px solid var(--color-border-hair)',
                        borderRadius: 'var(--radius-card)',
                        padding: '20px',
                        transition: 'var(--transition-theme)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-accent)', marginBottom: '12px', transition: 'var(--transition-theme)' }}>{z.n}</div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '8px', lineHeight: 1.3, transition: 'var(--transition-theme)' }}>{z.t}</div>
                      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5, color: 'var(--color-text-secondary)', margin: 0, transition: 'var(--transition-theme)' }}>{z.d}</p>
                    </div>
                  ))}
                </div>

                <Learning>Each vehicle movement between zones triggered a manual information handoff. At scale, these dependencies became service delays.</Learning>

                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-text-title)', margin: '46px 0 16px', transition: 'var(--transition-theme)' }}>The roles behind each handoff</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {[
                    { t: 'Security Guard', d: 'Identifies & verifies customer and vehicle; creates a Token ID for each vehicle.' },
                    { t: 'Service Executive', d: 'Documents issues, estimates delivery, assigns technicians, and manages ramp allocation.' },
                    { t: 'Service Technician', d: 'Performs the repair, flags undiagnosed issues, and undergoes service training.' },
                  ].map(r => (
                    <div key={r.t} style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-hair)', borderRadius: 'var(--radius-card)', padding: '22px', transition: 'var(--transition-theme)' }}>
                      <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '8px', transition: 'var(--transition-theme)' }}>{r.t}</div>
                      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--color-text-secondary)', margin: 0, transition: 'var(--transition-theme)' }}>{r.d}</p>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-text-title)', margin: '46px 0 16px', transition: 'var(--transition-theme)' }}>Key research insights</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { n: 'Insight 01', t: 'Post-creation changes created approval bottlenecks.', d: 'Inaccurate job cards meant even minor updates needed manual approvals from executives, adding wait time.' },
                    { n: 'Insight 02', t: 'Critical visibility was concentrated in one role.', d: 'The Service Executive alone tracked ramp utilisation, customer engagement, approvals, and deliveries.' },
                    { n: 'Insight 03', t: 'Technicians preferred printed job cards.', d: 'Paper was more accessible for checking tasks and tracking progress than the existing interface.' },
                  ].map(ins => (
                    <div key={ins.n} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '24px', padding: '22px 0', borderTop: '1px solid var(--color-border-hair)', transition: 'var(--transition-theme)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--color-accent)', paddingTop: '2px', transition: 'var(--transition-theme)' }}>{ins.n}</div>
                      <div>
                        <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '8px', transition: 'var(--transition-theme)' }}>{ins.t}</div>
                        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: 0, maxWidth: '560px', transition: 'var(--transition-theme)' }}>{ins.d}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-text-title)', margin: '46px 0 16px', transition: 'var(--transition-theme)' }}>Design strategy — design for efficiency</h3>
                <p style={pStyle}>We designed interfaces around operational behaviours: mobile-first for the Security Guard (fast scanning, one-handed), tablet-first for the Service Executive and Technician (multi-vehicle management, job cards, and inspection during service).</p>
                <ImgStage label="Sketches → low-fi wireframes → iterations" aspectRatio="16 / 7" />

                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-text-title)', margin: '46px 0 16px', transition: 'var(--transition-theme)' }}>Concept validation &amp; iteration</h3>
                <p style={pStyle}>
                  Through remote walkthroughs and structured concept testing with SMEs, product, and engineering, we learnt the aha moment:{' '}
                  <span style={{ color: 'var(--color-highlight-text)', background: 'var(--color-highlight-bg)', padding: '1px 5px', borderRadius: 'var(--radius-highlight)', transition: 'var(--transition-theme)' }}>
                    priority in service operations is time- and context-driven, not status-driven.
                  </span>{' '}
                  The final dashboard became a context-driven operational workspace that reduces decision friction.
                </p>
                <BeforeAfter
                  beforeLabel="Iteration 1"
                  afterLabel="Final"
                  beforeContent={<ImgStage label="Visibility-first, low contextual relevance" muted />}
                  afterContent={<ImgStage label="Context-driven operational workspace" />}
                />
              </section>

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
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text-title)', letterSpacing: '-0.01em', transition: 'var(--transition-theme)' }}>
                  Let's connect.
                </span>
                <div style={{ display: 'flex', gap: '24px', fontSize: 'var(--text-base)' }}>
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-vidyasri-giridharan-a98270146/' },
                    { label: 'Email', href: 'mailto:vidya1997@gmail.com' },
                    { label: 'Next project →', href: '#' },
                  ].map(l => (
                    <a key={l.label} href={l.href} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'var(--transition-theme)' }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </footer>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
