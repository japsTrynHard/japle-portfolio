import { projects } from '../data/projects'
import { mediaManifest } from '../data/mediaManifest'
import type { ProjectId } from '../models/Project'
import type { ProjectMedia } from '../models/Gallery'
export const getProject = (id?: string) => projects.find((project) => project.id === id)
export function getProjectMedia(id: ProjectId): ProjectMedia[] {
  const media = mediaManifest[id].items
  return media.length
    ? [...media].sort((a, b) => a.order - b.order)
    : [
        {
          id: `${id}-identity`,
          type: 'cover',
          variant: 'identity',
          caption: 'Original animated project cover · portfolio illustration',
          order: 0,
        },
        {
          id: `${id}-workflow`,
          type: 'cover',
          variant: 'workflow',
          caption: 'Conceptual workflow · portfolio illustration',
          order: 1,
        },
        {
          id: `${id}-stack`,
          type: 'cover',
          variant: 'stack',
          caption: 'Project technology composition · portfolio illustration',
          order: 2,
        },
      ]
}
