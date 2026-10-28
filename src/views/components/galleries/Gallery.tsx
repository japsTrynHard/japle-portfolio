import { useEffect, useRef, useId } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, Pause, Play, X } from 'lucide-react'
import { useGalleryController } from '../../../controllers/useGalleryController'
import { getProjectMedia } from '../../../services/projectService'
import type { Project } from '../../../models/Project'
import type { ProjectMedia } from '../../../models/Gallery'
import { MediaView } from './MediaView'
interface Slide {
  project: Project
  media: ProjectMedia
}
export function Gallery({
  projects,
  featured = false,
}: {
  projects: Project[]
  featured?: boolean
}) {
  const slides: Slide[] = featured
    ? projects.map((project) => ({ project, media: getProjectMedia(project.id)[0] }))
    : getProjectMedia(projects[0].id).map((media) => ({ project: projects[0], media }))
  const {
    viewportRef,
    selected,
    paused,
    setPaused,
    setHovered,
    setFocused,
    fullscreen,
    setFullscreen,
    running,
    previous,
    next,
    goTo,
    onscreen,
    visible,
    setMediaPlaying,
    reducedMotion,
  } = useGalleryController(slides.length)
  const dialog = useRef<HTMLDialogElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const carouselId = useId()
  useEffect(() => {
    const element = dialog.current
    if (!element || !fullscreen) return
    element.showModal()
    const rootElement = root.current
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = original
      requestAnimationFrame(() => {
        const target = rootElement?.querySelector<HTMLButtonElement>(
          '.gallery-slide:not([inert]) .expand-button',
        )
        if (target?.isConnected) target.focus({ preventScroll: true })
      })
    }
  }, [fullscreen])
  const current = slides[selected] ?? slides[0]
  const controls = (
    <>
      <div className="gallery-count mono">
        <span>{String(selected + 1).padStart(2, '0')}</span> /{' '}
        {String(slides.length).padStart(2, '0')}
      </div>
      <div className="gallery-indicators">
        {slides.map((slide, index) => (
          <button
            key={`${slide.project.id}-${slide.media.id}`}
            className={`gallery-indicator ${index === selected ? 'active' : ''}`}
            aria-label={`Go to ${featured ? slide.project.name : `slide ${index + 1}`}`}
            aria-current={index === selected ? 'true' : undefined}
            onClick={() => goTo(index)}
          >
            <span
              className={running && index === selected ? 'progress-running' : ''}
              key={`${selected}-${running}`}
            />
          </button>
        ))}
      </div>
      <div className="gallery-buttons">
        <button
          className="icon-button"
          aria-label={
            reducedMotion
              ? 'Autoplay disabled for reduced motion'
              : paused
                ? 'Play slideshow'
                : 'Pause slideshow'
          }
          aria-pressed={paused}
          disabled={slides.length < 2 || Boolean(reducedMotion)}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
        <button
          className="icon-button"
          aria-label="Previous slide"
          disabled={slides.length < 2}
          onClick={previous}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="icon-button"
          aria-label="Next slide"
          disabled={slides.length < 2}
          onClick={next}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </>
  )
  return (
    <div
      ref={root}
      className={`gallery ${featured ? 'featured-gallery' : 'project-gallery'}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={featured ? 'Featured projects' : `${projects[0].name} media gallery`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLVideoElement)
          return
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          next()
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          previous()
        }
        if (event.key === 'Home') {
          event.preventDefault()
          goTo(0)
        }
        if (event.key === 'End') {
          event.preventDefault()
          goTo(slides.length - 1)
        }
      }}
    >
      <div
        className="gallery-viewport"
        ref={viewportRef}
        id={carouselId}
        tabIndex={0}
        aria-label="Swipe or use arrow keys to browse"
      >
        <div className="gallery-track">
          {slides.map((slide, index) => (
            <div
              className="gallery-slide"
              key={`${slide.project.id}-${slide.media.id}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.project.name}`}
              inert={index !== selected}
              aria-hidden={index !== selected}
            >
              <div className="gallery-visual">
                <MediaView
                  media={slide.media}
                  project={slide.project}
                  active={index === selected && !fullscreen && onscreen && visible}
                  onPlayingChange={setMediaPlaying}
                />
                <button
                  className="expand-button icon-button"
                  aria-label={`Open ${slide.project.name} media fullscreen`}
                  onClick={() => setFullscreen(true)}
                >
                  <Maximize2 size={18} />
                </button>
              </div>
              {featured && (
                <div className="featured-detail">
                  <span className="eyebrow">SELECTED PROJECT / 0{index + 1}</span>
                  <h3>{slide.project.name}</h3>
                  <p>{slide.project.overview}</p>
                  <div className="tag-list">
                    {slide.project.stack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <Link className="text-link" to={`/work/${slide.project.id}`}>
                    Explore case study <ArrowUpRight size={20} />
                  </Link>
                  <span className="featured-role">{slide.project.role}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {!featured && (
        <p className="gallery-caption" aria-live={running ? 'off' : 'polite'}>
          {current.media.caption}
        </p>
      )}
      <div className="gallery-controls">{controls}</div>
      <span className="sr-only" aria-live={running ? 'off' : 'polite'}>
        Slide {selected + 1} of {slides.length}: {current.project.name}
      </span>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${current.project.name} fullscreen gallery`}
        onCancel={() => setFullscreen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setFullscreen(false)
        }}
      >
        <div className="lightbox-header">
          <span>
            {current.project.name}{' '}
            <span className="muted">
              / {selected + 1} of {slides.length}
            </span>
          </span>
          <button
            className="icon-button"
            autoFocus
            aria-label="Close fullscreen"
            onClick={() => setFullscreen(false)}
          >
            <X />
          </button>
        </div>
        <div className="lightbox-media">
          <MediaView
            key={current.media.id}
            media={current.media}
            project={current.project}
            active={fullscreen && visible}
            onPlayingChange={setMediaPlaying}
            fullscreen
          />
        </div>
        <p className="gallery-caption">{current.media.caption}</p>
        <div className="lightbox-controls">
          <button className="button secondary" onClick={previous} disabled={slides.length < 2}>
            <ArrowLeft size={16} /> Previous
          </button>
          <button className="button secondary" onClick={next} disabled={slides.length < 2}>
            Next <ArrowRight size={16} />
          </button>
        </div>
      </dialog>
    </div>
  )
}
