import { useState } from 'react'
import { projects } from '../data/projects'
export function useProjectController() {
  const [filter, setFilter] = useState('All projects')
  return {
    filter,
    setFilter,
    projects: projects.filter((project) => filter === 'All projects' || project.kind === filter),
  }
}
