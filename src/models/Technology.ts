export type TechnologyCategory =
  'Languages' | 'Frameworks & platforms' | 'Backend & data' | 'AI & ML' | 'Tools & deployment'
export interface Technology {
  name: string
  icon: string
  category: TechnologyCategory
  description: string
  projects: string[]
}
