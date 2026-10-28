import { useState } from 'react'
import { technologies } from '../data/technologies'
export function useTechnologyController() {
  const [category, setCategory] = useState('All tools')
  const [selected, setSelected] = useState<string | null>(null)
  return {
    category,
    setCategory,
    selected,
    setSelected,
    technologies: technologies.filter(
      (item) => category === 'All tools' || item.category === category,
    ),
    active: technologies.find((item) => item.name === selected),
  }
}
