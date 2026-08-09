import {
  Outline,
  DiagramSection,
  ProblemCostAnnotations,
  ConstraintPivotGrid,
  sectionStyle,
  h2Style,
  pStyle,
  eyebrowStyle,
  proseStyle,
  Block,
  ScenarioGroup,
  SectionDivider,
} from '../../components/case-study'

const outlineItems = [
  { id: 'overview',        num: '', label: 'Overview' },
  { id: 'context',         num: '', label: 'Context' },
  { id: 'users',           num: '', label: 'Users' },
  { id: 'scope',           num: '', label: 'Scope' },
  { id: 'why-it-mattered', num: '', label: 'Problem discovery' },
  { id: 'scenario-01',     num: '', label: 'Problem · Solution 1' },
  { id: 'scenario-02',     num: '', label: 'Problem · Solution 2' },
  { id: 'impact',          num: '', label: 'Impact' },
  { id: 'learnings',       num: '', label: 'Learnings' },
]

/* ── Inline helpers ───────────────────────────────────── */

function Problem1Annotations() {
  return (
    <ProblemCostAnnotations
      columns={[
        {
          problem: 'Users with deep supervision hierarchies took the longest to complete a review, and they were the most senior',
          description: 'Every level of supervision below the user added a navigation step or another modal to the path.',
          cost: 'Senior compliance staff spending review time on navigation',
        },
        {
          problem: 'Participants said the tool took time to learn, and first-time users struggled',
          description: 'Similar triggers behaved differently. Clicking a row expanded it in one table and opened a new page in another.',
          cost: 'training cost and ramp-up time',
        },
        {
          problem: 'Users carried context across multiple modals and tabs',
          description: 'Recalling a manager name from earlier in the path meant navigating back to the modal that held it.',
          cost: 'Repeated navigation for a single review, and the risk of filing against the wrong associate.',
        },
      ]}
    />
  )
}

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

function Problem1Findings() {
  const findings: { label: string; header: string; description: React.ReactNode }[] = [
    {
      label: '#1',
      header: 'Each click loaded one table, so reaching the associate meant loading one per manager',
      description: 'Selecting a manager returned the associates or incidents linked to that manager alone. The path down the hierarchy was one query per layer, surfaced as one screen per layer.',
    },
    {
      label: '#2',
      header: 'Each table and page loaded with no title or breadcrumb to show whose table the user was viewing, or which path they took to arrive.',
      description: 'Recollecting a name meant opening the same modal again.',
    },
    {
      label: '#3',
      header: 'The review action was attached to the associate, not to the incident-review',
      description: '"Start review" was built on the associate profile, so it opened from the associate and not from the review analysis. While an associate and incident are related in the data and unrelated in the interface.',
    },
    {
      label: '#4',
      header: 'The tables labelled managers and associates the same way',
      description: 'Both roles appeared as "Associate," with a person icon and a headcount as the only distinction. The copy was confusing to me and my team as we were understanding the tool.',
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

/* ── Page ─────────────────────────────────────────────── */

export default function Fidelity() {
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

      {/* ── Hero image (full-bleed, outside the sidebar+content pair) ── */}
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
              src="/fidelity/thumbnail.png"
              alt="Fidelity compliance system redesign — dashboard overview"
              style={{ width: '50%', display: 'block', borderRadius: 'var(--radius-sm)', margin: '0 auto' }}
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
              Redesign of a Enterprise Tool for Compliance Supervision System
            </h1>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <span style={eyebrowStyle}>Overview</span>
              <p style={{ ...pStyle, margin: 0 }}>
                Fidelity was migrating its compliance tools off a third-party vendor platform onto Microsoft PowerApps. Supervisory Workstation was one of them, a tool roughly 4,000 employees used daily to review associates and file supervision reports. It had run on the vendor platform for over a decade. I joined as the sole designer on the team and took the associate review workflow from research through to shipped interface, working from the data model rather than the existing design.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--space-8)' }}>
              <span style={eyebrowStyle}>Impact</span>
              <p style={{ ...pStyle, margin: 0 }}>
                I redesigned how users reach the associate responsible for a compliance incident, resolving the supervision chain in the query layer instead of the interaction. In concept testing with 5 users, the task completion time dropped from 5–7 minutes to ~2 mins. The design shipped as part of the PowerApps migration.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-10)', marginBottom: 'var(--space-8)' }}>
              <div>
                <span style={eyebrowStyle}>Duration</span>
                <p style={{ ...pStyle, margin: 0 }}>6 weeks (2023)</p>
              </div>
              <div>
                <span style={eyebrowStyle}>My Role</span>
                <p style={{ ...pStyle, margin: 0 }}>Sole UX Designer</p>
              </div>
              <div>
                <span style={eyebrowStyle}>Team</span>
                <p style={{ ...pStyle, margin: 0 }}>Product Manager, Business Analysts, Engineering Team</p>
              </div>
            </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* CONTEXT                                 */}
            {/* ════════════════════════════════════════ */}
            <section id="context" style={sectionStyle}>
              <Block
                eyebrow="Context"
                header="Fidelity moved its compliance tools in-house; Supervisory Workstation was one of them"
              >
                <p style={pStyle}>
                  Fidelity Investments was migrating enterprise applications from third-party vendor platforms to Microsoft PowerApps, to reduce licensing costs and keep regulated data on internal infrastructure. Supervisory Workstation was one of these applications. It had been in use for over a decade on the vendor platform.
                </p>
                <p style={pStyle}>
                  The tool supports supervision: the compliance review a designated supervisor performs on an associate after an incident is flagged. Roughly 4,000 employees used it daily.
                </p>
                <div style={{ width: '110%', marginLeft: '-5%' }}>
                  <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                    <img src="/fidelity/vendor-tool.png" alt="Supervisory Workstation on the legacy vendor platform" style={{ display: 'block', width: '100%' }} />
                  </div>
                </div>
                <div
                  style={{
                    borderLeft: '3px solid var(--color-border-hair-hover)',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    padding: '8px 16px',
                    margin: 'var(--space-5) 0 0',
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
                    Note
                  </span>
                  <p style={{ ...pStyle, margin: 0, maxWidth: 'none' }}>
                    This case study covers the Associate tab, where the review task lives. The Supervisor tab, which supports oversight of managers, is a separate workflow and is not covered here.{' '}
                    <span style={{ color: 'var(--color-text-body)' }}>Screens in this case study are simplified recreations. Original interfaces are confidential.</span>
                  </p>
                </div>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* USERS                                   */}
            {/* ════════════════════════════════════════ */}
            <section id="users" style={sectionStyle}>
              <Block
                eyebrow="Users"
                header="Managers file reports on their associates. Supervisory Principals do that, and also monitor whether the managers below them are compliant in filing theirs."
              >
                <p style={pStyle}>
                  Frontline managers file supervision reports on the associates they supervise. Supervisory Principals file reports on the associates in their scope and oversee whether the managers below them are completing reviews on schedule.
                </p>
                <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-5)' }}>
                  <img src="/fidelity/users-supervison-hierarchy.png" alt="Supervision hierarchy — managers and Supervisory Principals over associates" style={{ display: 'block', width: '100%' }} />
                </div>
                <h3
                  style={{
                    ...proseStyle,
                    fontSize: 'var(--text-base)',
                    fontWeight: 500,
                    lineHeight: 1.35,
                    color: 'var(--color-diagram-title)',
                    margin: 'var(--space-8) 0 8px',
                    transition: 'var(--transition-theme)',
                  }}
                >
                  Review flow takes two paths: incident-review and associate-review.
                </h3>
                <p style={{ ...pStyle, margin: '0 0 12px' }}>
                  Both flows were designed to supervise associates based on incident frequency, trends and severity.
                </p>
                <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-5)' }}>
                  <img src="/fidelity/review-task-flow.png" alt="Incident-review and associate-review task flows" style={{ display: 'block', width: '100%' }} />
                </div>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* SCOPE                                   */}
            {/* ════════════════════════════════════════ */}
            <section id="scope" style={sectionStyle}>
              <Block
                eyebrow="Scope"
                header="Redesign with the existing data structure and no new analysis."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  The timeline was 3 sprints, design through to production. The product manager scoped out new analysis, aggregate tables or data insights. So the redesign had to work with the data as it was already structured. Workflow and layout were open.
                </p>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* PROBLEM DISCOVERY                         */}
            {/* ════════════════════════════════════════ */}
            <section id="why-it-mattered" style={sectionStyle}>
              <Block
                eyebrow="Problem discovery"
                header="The legacy vendor tool had a steep learning curve, and users had built strong habits over the decade they had been using it."
              >
                <p style={{ ...pStyle, margin: 0 }}>
                  Coming in with the no domain knowledge, I struggled to understand what the tool did. I worked with the business analysts to gather the training modules and documentation, which taught me the functions but not how people actually used them. I asked the product manager for access to users and ran contextual inquiries and semi-structured interviews in person with five participants (both managers and Supervisory Principals) observing them complete real reviews in the vendor tool, alongside a heuristic analysis.
                </p>
                <div style={{ marginTop: 'var(--space-8)' }}>
                  <DiagramSection
                    wide={false}
                    stage="before"
                    hideStageLabel
                    diagramPadding="0"
                    diagramBorderRadius="0"
                    tabs={[
                      {
                        id: 'manager-userflow',
                        label: 'Manager',
                        diagramTitle: 'Manager Incident-review User Flow',
                        diagram: <img src="/fidelity/manager-userflow.png" alt="Manager userflow" style={{ display: 'block', width: '100%' }} />,
                        annotations: <Problem1Annotations />,
                      },
                      {
                        id: 'sp-userflow',
                        label: 'Supervisory Principal',
                        diagramTitle: 'Supervisory Principal Incident-review User Flow',
                        diagram: <img src="/fidelity/sp-userflow.png" alt="Supervisory Principal userflow" style={{ display: 'block', width: '100%' }} />,
                        annotations: <Problem1Annotations />,
                      },
                    ]}
                  />
                </div>
              </Block>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 01 — ALERT FATIGUE             */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-01">

              <DiagramSection
                wide={false}
                counter="Problem 1"
                stage="before"
                hideStageLabel
                title="In both associate and incident reviews, every layer of supervision hierarchy below a Supervisory Principal added a modal or screen to close, a context to hold, and a chance to file against the wrong associate."
                description={
                  <>
                    <p style={{ margin: '0 0 12px' }}>Task length was set by the supervision hierarchy, not by the review itself.</p>
                    <p style={{ margin: '0 0 12px' }}>In the associate-review flow, selecting a person opened their profile, and the incidents under them sat on that page. If that person was a manager, the incidents belonged to the associates below them, so the user opened the next profile down.</p>
                    <p style={{ margin: 0 }}>In the incident-review flow, selecting an incident surfaced the managers in the user's scope who owned it. Selecting one of those managers opened a modal of the reporting managers below them. That repeated until the modals reached the level where associates sat.</p>
                  </>
                }
                diagramPadding="0"
                tabs={[
                  {
                    id: 'problem-1-video',
                    diagram: (
                      <>
                        <video
                          src="/fidelity/before-flow.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                        />
                        <div style={{ marginTop: 'var(--space-8)' }}>
                          <Problem1Findings />
                        </div>
                      </>
                    ),
                  },
                ]}
              />

              <DiagramSection
                wide={false}
                card={false}
                stage="after"
                hideStageLabel
                solutionLabel="Solution - Exploration - 1"
                title="I explored surfacing the associate directly with review action, at the same level for every user"
                description="In the incident flow, selecting an incident would surface the responsible associate immediately, without stepping through the managers in between. In the associate flow, selecting an associate or manager would surface the incidents under them the same way. One level for every user, regardless of position in the supervision chain."
                diagramPadding="0"
                tabs={[
                  {
                    id: 'explored',
                    diagram: (
                      <div>
                        <div style={{ background: 'var(--color-surface-sidebar)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', transition: 'var(--transition-theme)' }}>
                          <video
                            src="/fidelity/exploration.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-8)' }}
                          />
                          <h3
                            style={{
                              ...proseStyle,
                              fontSize: 'var(--text-base)',
                              fontWeight: 400,
                              lineHeight: 1.35,
                              color: 'var(--color-text-title)',
                              margin: '0 auto 12px',
                              transition: 'var(--transition-theme)',
                            }}
                          >
                            Two constraints came out of the feasibility discussion with the developer: the supervision record, and the volume of data behind one click
                          </h3>
                          <ConstraintPivotGrid
                            entries={[
                              {
                                title: 'A supervision report has to document who was accountable for reviewing the associate',
                                description: 'The managers, who owned the incident and who the associate reports to are part of the report record. Removing them would violate the compliance requirement.',
                                pivot: 'Show associate records with reporting manager and owning manager',
                              },
                              {
                                title: "A Supervisory Principal's first click would return hundreds of rows of associate data",
                                description: 'I had not accounted for the 100-200s of associates under the scope of a Supervisory Principal. PowerApps loads that data in the browser, so the concept would trade the clicks it removed for load time.',
                                pivot: 'Group the incidents by owning manager',
                              },
                              {
                                title: 'Renaming a column from Associate to Manager meant updating the compliance documentation that references it',
                                description: 'I proposed labelling "Associate" and "Managers" based on who the user is monitoring. This label appears throughout the supervisory procedures and training material, so the naming stayed as the vendor tool had it.',
                                pivot: 'Not prioritized for this release',
                              },
                            ]}
                          />
                        </div>
                        <div style={{ marginTop: 'var(--space-8)' }}>
                          <span style={eyebrowStyle}>Solution - Final - 1</span>
                          <h2
                            style={{
                              fontSize: 'var(--text-lg)',
                              lineHeight: 1.22,
                              fontWeight: 600,
                              letterSpacing: '-0.02em',
                              color: 'var(--color-text-title)',
                              margin: '0 0 14px',
                              maxWidth: 'var(--content-width-prose)',
                              transition: 'var(--transition-theme)',
                            }}
                          >
                            I designed a new page listing every associate incident, with the accountable managers as columns based on the user selection.
                          </h2>
                          <p style={{ ...pStyle, margin: '0 auto var(--space-8)' }}>
                            Selecting an incident or an associate opens a dedicated page listing the associate incidents within that scope. Each row is one associate: the incident, its severity, the associate who performed it, the reporting manager that associate reports to, the manager accountable for the incident, and the incident count by month across the quarter.
                          </p>
                          <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
                            <img src="/fidelity/after-screen.png" alt="Final userflow screen" style={{ display: 'block', width: '100%' }} />
                          </div>
                          <video
                            src="/fidelity/solution-1.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                          />
                        </div>
                      </div>
                    ),
                  },
                ]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* SCENARIO 02 — SCATTERED WORKFLOW        */}
            {/* ════════════════════════════════════════ */}
            <ScenarioGroup id="scenario-02">

              <DiagramSection
                wide={false}
                counter="Problem 2"
                stage="before"
                hideStageLabel
                diagramPadding="0"
                title="Identical triggers resulted in different outcomes (modal, expansion, navigation), requiring reliance on recall"
                description="Users learned the behavior of each table separately and relied on recall to know what a click would do."
                tabs={[{
                  id: 's2-before',
                  diagram: (
                    <video
                      src="/fidelity/problem-2.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                    />
                  ),
                }]}
              />

              <DiagramSection
                wide={false}
                stage="after"
                hideStageLabel
                solutionLabel="Solution 2"
                diagramPadding="0"
                title = "One overview-to-detail pattern across both the incident and associate views"
                description="Both the incident overview and the associate overview follow the same structure: a summary table where selecting a row opens its detail."
                tabs={[{
                  id: 's2-solution',
                  diagram: (
                    <video
                      src="/fidelity/solution-2.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ display: 'block', width: '100%', borderRadius: 'var(--radius-sm)' }}
                    />
                  ),
                }]}
              />

            </ScenarioGroup>

            {/* ════════════════════════════════════════ */}
            {/* IMPACT                                  */}
            {/* ════════════════════════════════════════ */}
            <section id="impact" style={sectionStyle}>
              <SectionDivider label="Impact" />
              <h2 style={h2Style}>I tested the concept before development, because rebuilding a legacy tool meant users already had habits</h2>
              <p style={{ ...pStyle, marginTop: '-8px' }}>
                I ran concept testing with five managers across levels of the supervision chain to test usability, intuitivity and measure the metrics against baseline
              </p>
              <div style={{ marginTop: 'var(--space-8)', background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-5)' }}>
                <img src="/fidelity/concept-testing.jpg" alt="Concept testing" style={{ display: 'block', width: '100%' }} />
              </div>
              <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-8)' }}>
                {[
                  { title: '7 to 3 clicks', description: 'clicks to file one supervision report (task) on an associate' },
                  { title: '5-7 min → ~2 min', description: 'task completion time, tested across levels of the chain' },
                  { title: '5/5 task success', description: 'all participants completed the task' },
                ].map((metric, i) => (
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
                      {metric.title}
                    </h4>
                    <p style={{ ...pStyle, margin: 0 }}>{metric.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ════════════════════════════════════════ */}
            {/* LEARNINGS                               */}
            {/* ════════════════════════════════════════ */}
            <section id="learnings" style={sectionStyle}>
              <SectionDivider label="Learnings" />
              <div className="annotation-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}>
                {[
                  {
                    title: 'Questioning the unquestioned revealed more insights',
                    description: 'I proposed removing the intermediate managers. Checking that against the data model and the platform is what surfaced both the compliance requirement and the load cost. Neither would have come up if I had designed around the existing structure.',
                  },
                  {
                    title: 'Learning the data model empowered my design choices',
                    description: 'Learning that surfacing associate - reporting manager - owning manager was possible was the breakthrough moment.',
                  },
                  {
                    title: 'Being new to the domain cut both ways',
                    description: 'Having no compliance background is why I questioned how the data was presented. It is also why I did not know the compliance requirement in supervision record.',
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
