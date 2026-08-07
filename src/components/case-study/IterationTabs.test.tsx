import { render, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IterationTabs } from './IterationTabs'

const tabs = [
  { id: 'a', label: 'Tab A', content: <div>Content A</div> },
  { id: 'b', label: 'Tab B', content: <div>Content B</div> },
  { id: 'c', label: 'Tab C', content: <div>Content C</div> },
]

test('renders default tab content on mount', () => {
  const { getByText, queryByText } = render(
    <IterationTabs tabs={tabs} defaultTabId="b" />
  )
  expect(getByText('Content B')).toBeTruthy()
  expect(queryByText('Content A')).toBeNull()
  expect(queryByText('Content C')).toBeNull()
})

test('clicking a tab switches to that tabs content', () => {
  const { getByText, queryByText } = render(
    <IterationTabs tabs={tabs} defaultTabId="a" />
  )
  expect(getByText('Content A')).toBeTruthy()
  fireEvent.click(getByText('Tab C'))
  expect(getByText('Content C')).toBeTruthy()
  expect(queryByText('Content A')).toBeNull()
})

test('defaults to first tab when no defaultTabId is given', () => {
  const { getByText, queryByText } = render(<IterationTabs tabs={tabs} />)
  expect(getByText('Content A')).toBeTruthy()
  expect(queryByText('Content B')).toBeNull()
})

test('renders accessibly', async () => {
  const { container } = render(<IterationTabs tabs={tabs} defaultTabId="a" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
