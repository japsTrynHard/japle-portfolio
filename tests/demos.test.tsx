import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CarmeLinkDemo } from '../src/views/components/projects/demos/CarmeLinkDemo'
import { PromptWiseDemo } from '../src/views/components/projects/demos/PromptWiseDemo'
import { AutoSchedDemo } from '../src/views/components/projects/demos/AutoSchedDemo'
import { BayanihanDemo } from '../src/views/components/projects/demos/BayanihanDemo'
import { RodelConnectDemo } from '../src/views/components/projects/demos/RodelConnectDemo'
import { MapExplorerDemo } from '../src/views/components/projects/demos/MapExplorerDemo'
describe('fictional interactive demonstrations', () => {
  it('changes role-specific information', async () => {
    render(<CarmeLinkDemo />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardian' }))
    expect(screen.getByText('Linked tenant')).toBeVisible()
    expect(screen.queryByText('Contract')).not.toBeInTheDocument()
  })
  it('evaluates editable prompts with transparent rules', async () => {
    render(<PromptWiseDemo />)
    await userEvent.click(screen.getByRole('button', { name: 'Structured prompt' }))
    await userEvent.click(screen.getByRole('button', { name: 'Review my prompt' }))
    expect(screen.getByText('4 of 4 signals found')).toBeVisible()
  })
  it('reviews extracted classes and creates a local study session', async () => {
    render(<AutoSchedDemo />)
    await userEvent.click(screen.getByRole('button', { name: 'Simulate COR extraction' }))
    const checkbox = await screen.findByRole('checkbox', { name: /Database Systems/ })
    await userEvent.click(checkbox)
    await userEvent.click(screen.getByRole('button', { name: 'Use these classes' }))
    await userEvent.click(screen.getByRole('button', { name: 'Add study session' }))
    expect(screen.getByText('Independent study')).toBeVisible()
    expect(screen.queryByText('Database Systems')).not.toBeInTheDocument()
  })
  it('filters fictional community posts', async () => {
    render(<BayanihanDemo />)
    await userEvent.click(screen.getByRole('button', { name: 'Jobs', exact: true }))
    expect(screen.getByText('Weekend shop assistant')).toBeVisible()
    expect(screen.queryByText('Found: a blue umbrella')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Read sample post' }))
    expect(screen.getByText(/fictional neighborhood shop/)).toBeVisible()
  })
  it('validates event details and produces an illustrative quote', async () => {
    render(<RodelConnectDemo />)
    await userEvent.click(screen.getByRole('button', { name: /Celebration/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }))
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByRole('alert')).toBeVisible()
    await userEvent.type(screen.getByLabelText('Event date'), '2027-01-15')
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByText('₱32,500')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Finish sample plan' }))
    expect(screen.getByRole('status')).toHaveTextContent('completed locally')
  })
  it('supports the geography puzzle using keyboard-friendly buttons', async () => {
    render(<MapExplorerDemo />)
    await userEvent.click(screen.getByRole('button', { name: /Ilocos Region/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Place selected region in Visayas' }))
    expect(screen.getByRole('status')).toHaveTextContent('Try again')
    await userEvent.click(screen.getByRole('button', { name: 'Place selected region in Luzon' }))
    await userEvent.click(screen.getByRole('button', { name: /Western Visayas/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Place selected region in Visayas' }))
    await userEvent.click(screen.getByRole('button', { name: /Davao Region/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Place selected region in Mindanao' }))
    expect(screen.getByRole('status')).toHaveTextContent('All three matched')
    await userEvent.click(screen.getByRole('button', { name: 'Reset puzzle' }))
    expect(screen.getByText('0 / 3 MATCHED')).toBeVisible()
  })
})
