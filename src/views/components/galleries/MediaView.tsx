import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { ProjectMedia } from '../../../models/Gallery'
import type { Project } from '../../../models/Project'
import { ProjectCover } from '../projects/ProjectCover'
export function MediaView({
  media,
  project,
  active = false,
  fullscreen = false,
  previewOnly = false,
  onPlayingChange,
}: {
  media: ProjectMedia
  project: Project
  active?: boolean
  fullscreen?: boolean
  previewOnly?: boolean
  onPlayingChange?: (playing: boolean) => void
}) {
  const [failed, setFailed] = useState(false)
  const onFailure = () => {
    setFailed(true)
    onPlayingChange?.(false)
  }
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!active) video.current?.pause()
  }, [active])
  if (media.type === 'cover' || failed)
    return (
      <div className="media-cover">
        <ProjectCover
          project={project}
          variant={media.type === 'cover' ? media.variant : 'identity'}
        />
        {failed && (
          <span className="media-error" role="status">
            Media unavailable · original illustration shown
          </span>
        )}
      </div>
    )
  if (media.type === 'image')
    return (
      <div
        className={`media-stage ${media.height && media.width && media.height > media.width ? 'media-portrait' : 'media-landscape'} ${fullscreen ? 'media-fullscreen' : ''}`}
        style={{ '--media-color': project.color } as CSSProperties}
      >
        <img
          className={`gallery-image ${fullscreen ? 'is-fullscreen' : ''}`}
          src={media.src}
          srcSet={media.srcSet}
          sizes={media.sizes ?? '(max-width: 768px) 100vw, 80vw'}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={active ? 'eager' : 'lazy'}
          onError={onFailure}
        />
      </div>
    )
  if (previewOnly)
    return media.poster ? (
      <img
        className="gallery-image"
        src={media.poster}
        alt={media.alt}
        loading="lazy"
        onError={onFailure}
      />
    ) : (
      <ProjectCover project={project} />
    )
  return (
    <video
      ref={video}
      className="gallery-video"
      controls
      playsInline
      preload={active ? 'metadata' : 'none'}
      poster={media.poster}
      aria-label={media.alt}
      onError={onFailure}
      onPlay={() => {
        if (!active) video.current?.pause()
        else onPlayingChange?.(true)
      }}
      onPause={() => onPlayingChange?.(false)}
      onEnded={() => onPlayingChange?.(false)}
    >
      <source src={media.src} onError={onFailure} />
      {media.captions && (
        <track kind="captions" src={media.captions} srcLang="en" label="English" default />
      )}
      Your browser does not support this video.
    </video>
  )
}
