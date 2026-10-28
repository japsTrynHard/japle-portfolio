import { afterEach, describe, expect, it, vi } from 'vitest'
import { projects } from '../src/data/projects'
import { technologies } from '../src/data/technologies'
import { mediaManifest } from '../src/data/mediaManifest'
import { getProjectMedia } from '../src/services/projectService'
import { checkPdfAvailability } from '../src/services/resumeService'
import { evaluatePrompt } from '../src/utils/promptRubric'
const originalCarmelinkMedia = [...mediaManifest.carmelink.items]
afterEach(() => {
  mediaManifest.carmelink.items = [...originalCarmelinkMedia]
})
describe('content and future media integration', () => {
  it('keeps exactly six unique projects, 35 tools, and private source links private', () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(6)
    expect(technologies).toHaveLength(35)
    expect(new Set(technologies.map((tech) => tech.name)).size).toBe(35)
    expect(projects.find((item) => item.id === 'autosched-ai')?.github).toBeUndefined()
    expect(projects.find((item) => item.id === 'bayanihan-link')?.github).toBeUndefined()
    for (const technology of technologies)
      for (const id of technology.projects)
        expect(projects.some((project) => project.id === id)).toBe(true)
  })
  it('supplies honest original covers when genuine media is deferred', () => {
    for (const project of projects) {
      const original = mediaManifest[project.id].items
      mediaManifest[project.id].items = []
      const media = getProjectMedia(project.id)
      mediaManifest[project.id].items = original
      expect(media).toHaveLength(3)
      expect(media.every((item) => item.type === 'cover')).toBe(true)
    }
  })
  it('serves actual supplied screenshots for all six projects', () => {
    for (const project of projects) {
      expect(getProjectMedia(project.id).length).toBeGreaterThan(1)
      expect(getProjectMedia(project.id).every((media) => media.type === 'image')).toBe(true)
    }
  })
  it('integrates ordered images and videos using only manifest configuration', () => {
    mediaManifest.carmelink.items = [
      {
        id: 'video',
        type: 'video',
        src: '/videos/real.mp4',
        caption: 'Walkthrough',
        alt: 'A walkthrough',
        order: 2,
      },
      {
        id: 'image',
        type: 'image',
        src: '/images/projects/real.webp',
        alt: 'Actual supplied image',
        caption: 'First image',
        order: 0,
        width: 1600,
        height: 900,
      },
    ]
    expect(getProjectMedia('carmelink').map((item) => item.id)).toEqual(['image', 'video'])
    expect(mediaManifest.carmelink.items[0].id).toBe('video')
  })
})
describe('availability-aware PDF service', () => {
  it('rejects SPA HTML fallbacks, missing files, and spoofed non-PDF content', async () => {
    const responses = [
      new Response('<html/>', { headers: { 'content-type': 'text/html' } }),
      new Response('', { status: 404 }),
      new Response('not a PDF', { headers: { 'content-type': 'application/pdf' } }),
    ]
    for (const response of responses) {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
      expect(await checkPdfAvailability('/resumes/missing.pdf')).toBe(false)
    }
  })
  it('recognizes a PDF file signature and handles network failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('%PDF-1.7', { headers: { 'content-type': 'application/pdf' } }),
        ),
    )
    expect(await checkPdfAvailability('/resume.pdf')).toBe(true)
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    expect(await checkPdfAvailability('/resume.pdf')).toBe(false)
  })
})
it('explains a local rubric without treating arbitrary length as quality', () => {
  expect(evaluatePrompt('Tell me about AI.').filter((rule) => rule.passed)).toHaveLength(0)
  expect(
    evaluatePrompt('Explain AI for students in 5 bullet points. Include sources.').every(
      (rule) => rule.passed,
    ),
  ).toBe(true)
})
