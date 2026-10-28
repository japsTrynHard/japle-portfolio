export type ProjectId =
  'carmelink' | 'promptwise' | 'autosched-ai' | 'bayanihan-link' | 'rodelconnect' | 'map-explorer'
export interface Project {
  id: ProjectId
  name: string
  title: string
  category: string
  kind: 'Personal' | 'Collaboration'
  role: string
  color: string
  symbol: 'home' | 'spark' | 'calendar' | 'community' | 'dining' | 'map'
  tagline: string
  overview: string
  users: string
  problem: string
  solution: string
  features: string[]
  stack: string[]
  architecture: string[]
  workflow: string[]
  contributions: string[]
  challenge: string
  outcome: string
  limitations: string
  github?: string
  live?: string
}
