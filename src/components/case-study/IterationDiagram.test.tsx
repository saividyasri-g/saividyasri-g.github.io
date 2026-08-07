import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IterationDiagram, ScopeBadge } from './IterationDiagram'

/* ── ScopeBadge ─────────────────────────────────────── */

test('ScopeBadge rejected shows default text', () => {
  const { getByText } = render(<ScopeBadge variant="rejected" />)
  expect(getByText('Explored, not pursued')).toBeTruthy()
})

test('ScopeBadge descoped shows default text', () => {
  const { getByText } = render(<ScopeBadge variant="descoped" />)
  expect(getByText('Out of scope')).toBeTruthy()
})

test('ScopeBadge renders custom text', () => {
  const { getByText } = render(<ScopeBadge variant="rejected" text="Custom label" />)
  expect(getByText('Custom label')).toBeTruthy()
})

/* ── variant="starting" ─────────────────────────────── */

test('starting variant renders expected node labels', () => {
  const { getByText } = render(<IterationDiagram variant="starting" />)
  expect(getByText('Plan the vehicle-service')).toBeTruthy()
  expect(getByText(/Estimate the service duration/)).toBeTruthy()
  expect(getByText(/Check technician/)).toBeTruthy()
  expect(getByText(/Vehicle remains unassigned/)).toBeTruthy()
  expect(getByText(/Assign the technician/)).toBeTruthy()
})

test('starting variant has no scope badges', () => {
  const { container } = render(<IterationDiagram variant="starting" />)
  expect(container.querySelectorAll('[data-badge-variant]')).toHaveLength(0)
})

/* ── variant="final" ────────────────────────────────── */

test('final variant renders expected node labels and signals section', () => {
  const { getByText } = render(<IterationDiagram variant="final" />)
  expect(getByText(/Check technicians/)).toBeTruthy()
  expect(getByText(/Determine the best suited/)).toBeTruthy()
  expect(getByText(/Check real-time/)).toBeTruthy()
  expect(getByText(/Decision-making signals/)).toBeTruthy()
  expect(getByText('exact vehicle-service history')).toBeTruthy()
})

test('final variant has no scope badges', () => {
  const { container } = render(<IterationDiagram variant="final" />)
  expect(container.querySelectorAll('[data-badge-variant]')).toHaveLength(0)
})

test('final variant signals box uses updated title', () => {
  const { getByText } = render(<IterationDiagram variant="final" />)
  expect(getByText('Decision-making signals')).toBeTruthy()
})

/* ── variant="explored" ─────────────────────────────── */

test('explored variant renders expected node labels', () => {
  const { getByText } = render(<IterationDiagram variant="explored" />)
  expect(getByText(/Schedule the delivery date/)).toBeTruthy()
  expect(getByText(/next day's/)).toBeTruthy()
  expect(getByText(/Determine the best suited/)).toBeTruthy()
})

test('explored variant renders one descoped badge', () => {
  const { container } = render(<IterationDiagram variant="explored" />)
  const badges = container.querySelectorAll('[data-badge-variant]')
  expect(badges).toHaveLength(1)
  expect(badges[0].getAttribute('data-badge-variant')).toBe('descoped')
})

test('explored variant renders the signals section with 4 items', () => {
  const { getByText } = render(<IterationDiagram variant="explored" />)
  expect(getByText('exact vehicle-service history')).toBeTruthy()
  expect(getByText('similar vehicle-service history')).toBeTruthy()
  expect(getByText('immediate/sooner availability')).toBeTruthy()
  expect(getByText('Training & Expertise')).toBeTruthy()
})

/* ── Accessibility ───────────────────────────────────── */

test('starting variant renders accessibly', async () => {
  const { container } = render(<IterationDiagram variant="starting" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('final variant renders accessibly', async () => {
  const { container } = render(<IterationDiagram variant="final" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('explored variant renders accessibly', async () => {
  const { container } = render(<IterationDiagram variant="explored" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
