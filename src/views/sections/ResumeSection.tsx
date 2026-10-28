import { AnimatePresence, motion } from 'motion/react'
import { Check, Download, FileText, Image, Maximize2, Minus, Plus, ScanLine } from 'lucide-react'
import { resumes } from '../../data/resumes'
import { useResumeController } from '../../controllers/useResumeController'
import { SectionHeading } from '../components/ui/SectionHeading'
export function ResumeSection() {
  const controller = useResumeController()
  const state = controller.availability[controller.resume.id]
  const available = state === 'available'
  return (
    <section id="resume" className="section resume-section">
      <div className="container">
        <SectionHeading
          number="07"
          label="EDUCATION & QUALIFICATIONS"
          title={
            <>
              My <em>resume.</em>
            </>
          }
          text="Review my education, technical skills, and project experience."
        />
        <div className="resume-layout">
          <div className="resume-options" role="group" aria-label="Resume version">
            {resumes.map((resume, index) => (
              <button
                key={resume.id}
                className={`resume-option ${controller.selected === index ? 'selected' : ''}`}
                aria-pressed={controller.selected === index}
                onClick={() => controller.setSelected(index)}
              >
                <span className="resume-option-icon">
                  {index === 0 ? <FileText size={23} /> : <Image size={23} />}
                </span>
                <span>
                  <strong>{resume.name}</strong>
                  <span>{resume.description}</span>
                  <small>
                    {controller.availability[resume.id] === 'available'
                      ? 'PDF ready to view'
                      : controller.availability[resume.id] === 'checking'
                        ? 'Checking availability…'
                        : 'PDF coming soon'}
                  </small>
                </span>
                <span className="selection-check">
                  {controller.selected === index && <Check size={13} />}
                </span>
              </button>
            ))}
            <p className="resume-note">Select a format to preview or download the original PDF.</p>
          </div>
          <div className="resume-preview">
            <div className="resume-toolbar">
              <span>
                <FileText size={15} />
                {controller.resume.name}
              </span>
              <div>
                <button
                  className="icon-button"
                  disabled={!available || controller.zoom <= 50}
                  aria-label="Zoom out resume"
                  onClick={() => controller.setZoom(Math.max(50, controller.zoom - 25))}
                >
                  <Minus size={15} />
                </button>
                <span className="mono">{controller.zoom}%</span>
                <button
                  className="icon-button"
                  disabled={!available || controller.zoom >= 200}
                  aria-label="Zoom in resume"
                  onClick={() => controller.setZoom(Math.min(200, controller.zoom + 25))}
                >
                  <Plus size={15} />
                </button>
                <button
                  className="icon-button"
                  disabled={!available}
                  aria-label="Fit resume to width"
                  onClick={() => controller.setZoom(100)}
                >
                  <ScanLine size={16} />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={controller.resume.id}
                className="resume-document"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {available ? (
                  <object
                    type="application/pdf"
                    data={`${controller.resume.path}#${controller.zoom === 100 ? 'view=FitH' : `zoom=${controller.zoom}`}`}
                    aria-label={`${controller.resume.name} resume preview`}
                  >
                    <p>
                      Your browser cannot display this PDF.{' '}
                      <a href={controller.resume.path} target="_blank" rel="noopener noreferrer">
                        Open the resume in a new tab.
                      </a>
                    </p>
                  </object>
                ) : (
                  <div className="resume-unavailable">
                    <span className="resume-empty-icon">
                      <FileText size={35} />
                    </span>
                    <h3>
                      {state === 'checking'
                        ? 'Checking the details…'
                        : 'Resume file not yet available'}
                    </h3>
                    <p>
                      {state === 'checking'
                        ? 'Looking for the selected PDF.'
                        : 'The original PDF will appear here when it is added.'}
                    </p>
                    <span className="mono">{controller.resume.name.toUpperCase()} / PDF</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="resume-actions">
              {available ? (
                <>
                  <a
                    className="button primary"
                    href={controller.resume.path}
                    download={controller.resume.downloadName}
                  >
                    Download PDF <Download size={16} />
                  </a>
                  <a
                    className="button secondary"
                    href={controller.resume.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open full view <Maximize2 size={16} />
                  </a>
                </>
              ) : (
                <>
                  <button className="button primary" disabled>
                    Download PDF <Download size={16} />
                  </button>
                  <button className="button secondary" disabled>
                    Open full view <Maximize2 size={16} />
                  </button>
                </>
              )}
            </div>
            <p className="pdf-support">
              PDF zoom support depends on your browser. On mobile, use full view.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
