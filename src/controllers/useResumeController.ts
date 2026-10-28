import { useEffect, useState } from 'react'
import { resumes } from '../data/resumes'
import { checkPdfAvailability } from '../services/resumeService'
import type { FileAvailability } from '../models/Resume'
export function useResumeController() {
  const [selected, setSelected] = useState(0)
  const [availability, setAvailability] = useState<Record<string, FileAvailability>>({
    ats: 'checking',
    photo: 'checking',
  })
  const [zoom, setZoom] = useState(100)
  useEffect(() => {
    const abort = new AbortController()
    void Promise.all(
      resumes.map(
        async (resume) =>
          [
            resume.id,
            (await checkPdfAvailability(resume.path, abort.signal)) ? 'available' : 'missing',
          ] as const,
      ),
    ).then((entries) => {
      if (!abort.signal.aborted) setAvailability(Object.fromEntries(entries))
    })
    return () => abort.abort()
  }, [])
  return { selected, setSelected, resume: resumes[selected], availability, zoom, setZoom }
}
