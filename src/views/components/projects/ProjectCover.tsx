import type { CSSProperties } from 'react'
import type { Project } from '../../../models/Project'
import type { CoverMedia } from '../../../models/Gallery'
const illustrations = {
  home: (
    <>
      <path d="M112 164L200 92L288 164M132 150V277H268V150" />
      <path d="M182 277V214H220V277M154 175H174V195H154ZM227 175H247V195H227Z" />
      <path d="M96 278H304M149 120V94H168V106" />
      <circle cx="290" cy="110" r="23" />
      <path d="M281 110L288 117L300 102" />
    </>
  ),
  spark: (
    <>
      <path d="M201 84L223 158L298 180L223 202L201 276L179 202L104 180L179 158Z" />
      <path d="M291 91L299 115L323 123L299 131L291 155L283 131L259 123L283 115ZM111 231L118 251L138 258L118 265L111 285L104 265L84 258L104 251Z" />
      <path d="M130 105L145 120M269 250L285 265" />
    </>
  ),
  calendar: (
    <>
      <rect x="100" y="110" width="200" height="170" rx="17" />
      <path d="M100 152H300M145 94V126M253 94V126M141 186H166M186 186H211M235 186H260M141 220H166M235 220H260M141 253H166M186 253H211" />
      <circle cx="200" cy="219" r="20" />
      <path d="M190 219L198 227L211 210" />
    </>
  ),
  community: (
    <>
      <circle cx="200" cy="182" r="40" />
      <circle cx="105" cy="108" r="24" />
      <circle cx="301" cy="115" r="24" />
      <circle cx="102" cy="275" r="24" />
      <circle cx="303" cy="271" r="24" />
      <path d="M125 124L168 157M235 158L281 130M170 210L122 258M231 210L283 254M185 182L195 192L216 172" />
      <path d="M84 91Q202 25 320 93M83 292Q201 352 319 292" strokeDasharray="3 8" />
    </>
  ),
  dining: (
    <>
      <path d="M102 235Q106 129 200 129Q294 129 298 235ZM87 249H313M127 264Q200 292 273 264M200 129V114" />
      <circle cx="200" cy="104" r="10" />
      <path d="M82 116V174M71 116V143Q71 154 82 154Q93 154 93 143V116M320 116V174M320 116Q342 130 320 149" />
      <path d="M160 89Q150 73 162 61M229 89Q219 73 231 61" />
    </>
  ),
  map: (
    <>
      <path d="M154 77L190 91L182 117L201 134L183 153L192 181L166 191L143 164L149 140L131 119ZM204 197L229 189L247 209L233 229L210 219ZM154 201L176 214L170 242L151 234ZM235 243L268 237L288 260L272 287L241 299L215 278Z" />
      <path d="M96 111Q48 214 122 275M289 88Q352 154 317 226" strokeDasharray="3 8" />
      <circle cx="285" cy="96" r="19" />
      <path d="M277 96L283 102L294 89" />
    </>
  ),
}
export function ProjectCover({
  project,
  variant = 'identity',
  small = false,
}: {
  project: Project
  variant?: CoverMedia['variant']
  small?: boolean
}) {
  return (
    <div
      className={`project-cover cover-${project.symbol} ${small ? 'cover-small' : ''}`}
      style={{ '--project-color': project.color } as CSSProperties}
    >
      <div className="cover-grid" />
      <span className="cover-kicker">
        {project.kind} /{' '}
        {project.symbol === 'spark' ? 'AI literacy' : project.category.split('·')[0].trim()}
      </span>
      <span className="cover-art-label">ORIGINAL ARTWORK</span>
      {variant === 'identity' && (
        <>
          <span className="cover-tech-signature">{project.stack.slice(0, 3).join(' + ')}</span>
          <div className="cover-orbit" />
          <svg
            className="cover-illustration"
            viewBox="0 0 400 360"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {illustrations[project.symbol]}
          </svg>
          <div className="cover-title">
            <span>{project.name}</span>
            <p>{project.tagline}</p>
          </div>
          <span className="cover-plus plus-a">+</span>
          <span className="cover-plus plus-b">+</span>
        </>
      )}
      {variant === 'workflow' && (
        <div className="cover-flow">
          <p className="mono">APPLICATION WORKFLOW</p>
          <h3>{project.name}</h3>
          {project.workflow.map((step, index) => (
            <div className="cover-flow-step" key={step}>
              <b>0{index + 1}</b>
              <span>{step}</span>
              <span>↗</span>
            </div>
          ))}
        </div>
      )}
      {variant === 'stack' && (
        <div className="cover-stack">
          <span className="cover-brackets">{'{ }'}</span>
          <h3>Behind {project.name}.</h3>
          <div>
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>Technology stack and application services.</p>
        </div>
      )}
    </div>
  )
}
