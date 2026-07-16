import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import Metric from './Metric'

test('Metric tested renders accessibly', async () => {
  const { container } = render(
    <Metric value="7 min" label="Job-card creation time" status="tested" />
  )
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('Metric intended renders accessibly', async () => {
  const { container } = render(
    <Metric value="~3 min" label="Job-card creation time" status="intended" />
  )
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('Metric tested and intended have different visual treatment', () => {
  const { container: testedContainer } = render(
    <Metric value="7 min" label="Job-card creation time" status="tested" />
  )
  const { container: intendedContainer } = render(
    <Metric value="~3 min" label="Job-card creation time" status="intended" />
  )
  // Status indicator text differs
  expect(testedContainer.textContent).toContain('Tested')
  expect(intendedContainer.textContent).toContain('Projected')
})
