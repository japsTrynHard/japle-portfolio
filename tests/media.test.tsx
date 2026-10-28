import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MediaView } from '../src/views/components/galleries/MediaView'
import { projects } from '../src/data/projects'
describe('deferred project media', () => {
  it('preserves image captions in the manifest and renders accessible responsive assets', () => {
    render(
      <MediaView
        project={projects[0]}
        media={{
          id: 'actual',
          type: 'image',
          src: '/actual.webp',
          alt: 'Actual supplied project image',
          caption: 'Verified caption',
          order: 0,
          srcSet: '/small.webp 640w, /actual.webp 1600w',
          sizes: '100vw',
          width: 1600,
          height: 900,
        }}
      />,
    )
    expect(screen.getByAltText('Actual supplied project image')).toHaveAttribute(
      'srcset',
      '/small.webp 640w, /actual.webp 1600w',
    )
  })
  it('replaces broken images with an honestly identified original cover', () => {
    render(
      <MediaView
        project={projects[0]}
        media={{
          id: 'missing',
          type: 'image',
          src: '/missing.webp',
          alt: 'Missing genuine media',
          caption: 'Caption',
          order: 0,
        }}
      />,
    )
    fireEvent.error(screen.getByAltText('Missing genuine media'))
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Media unavailable')
    expect(screen.getByText('ORIGINAL ARTWORK')).toBeVisible()
  })
  it('shows video posters in project links without nested playback controls', () => {
    render(
      <MediaView
        project={projects[0]}
        previewOnly
        media={{
          id: 'video',
          type: 'video',
          src: '/actual.mp4',
          poster: '/actual-poster.webp',
          alt: 'Video preview',
          caption: 'Walkthrough',
          order: 0,
        }}
      />,
    )
    expect(screen.getByAltText('Video preview')).toHaveAttribute('src', '/actual-poster.webp')
    expect(document.querySelector('video')).toBeNull()
  })
})
