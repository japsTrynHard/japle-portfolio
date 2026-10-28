import type { ProjectId } from './Project'
export interface MediaBase {
  id: string
  caption: string
  order: number
  width?: number
  height?: number
}
export interface ImageMedia extends MediaBase {
  type: 'image'
  src: string
  alt: string
  srcSet?: string
  sizes?: string
}
export interface VideoMedia extends MediaBase {
  type: 'video'
  src: string
  poster?: string
  alt: string
  captions?: string
}
export interface CoverMedia extends MediaBase {
  type: 'cover'
  variant: 'identity' | 'workflow' | 'stack'
}
export type ProjectMedia = ImageMedia | VideoMedia | CoverMedia
export type MediaManifest = Record<ProjectId, { items: ProjectMedia[] }>
