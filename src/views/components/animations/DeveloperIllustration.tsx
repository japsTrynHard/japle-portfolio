export function DeveloperIllustration() {
  return (
    <div
      className="developer-art"
      aria-label="Original illustration of a developer's creative workspace"
      role="img"
    >
      <div className="art-grid" />
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <span className="art-label label-top">APPLICATION DEVELOPMENT</span>
      <svg viewBox="0 0 540 480" fill="none" aria-hidden="true">
        <g
          className="draw-lines"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="draw-path"
            d="M72 369C168 363 348 374 474 367M100 373L89 434M446 374L457 434"
          />
          <g className="desk-laptop">
            <path
              fill="var(--art-paper)"
              d="M123 216Q121 209 130 207L328 207Q336 207 337 215L353 340L139 340Z"
            />
            <path d="M137 220L322 220L335 325L152 325Z" />
            <path
              fill="var(--art-paper)"
              d="M139 340L353 340L384 359Q386 363 377 365L112 365Q104 362 112 357Z"
            />
            <path d="M214 347L287 347L293 356L208 356Z" />
            <g stroke="var(--highlight)">
              <path d="M178 249L165 262L180 274M300 249L313 262L299 274M250 241L232 286" />
              <path className="code-stroke" d="M173 299H203M216 299H262M274 299H304" />
            </g>
          </g>
          <g className="plant">
            <path d="M385 328H431L423 365H394Z" fill="var(--art-paper)" />
            <path
              d="M407 328V274M407 310Q374 315 377 286Q400 284 407 310M408 295Q434 291 437 267Q410 266 408 295M407 282Q385 267 395 249Q416 252 407 282"
              fill="var(--accent)"
            />
          </g>
          <path
            d="M95 329V354Q94 364 79 363Q64 363 64 354V329ZM95 335Q112 330 111 342Q111 351 95 349"
            fill="var(--art-paper)"
          />
          <path className="steam" d="M75 315Q66 306 76 296M87 315Q78 305 88 296" />
          <path
            className="sparkle"
            d="M352 138V163M339 151H365M99 171V187M91 179H107M441 219V233M434 226H448"
            stroke="var(--highlight)"
          />
          <path
            className="draw-path"
            d="M164 166Q202 125 269 152M257 141L271 153L253 159"
            stroke="var(--highlight)"
          />
          <path d="M123 397Q226 412 351 395" stroke="var(--highlight)" strokeDasharray="2 7" />
        </g>
        <g className="floating-code">
          <rect
            x="340"
            y="83"
            width="106"
            height="61"
            rx="12"
            fill="var(--art-paper)"
            stroke="var(--art-ink)"
            strokeWidth="1.5"
            transform="rotate(8 340 83)"
          />
          <text
            x="365"
            y="122"
            fill="var(--highlight)"
            fontSize="24"
            fontFamily="monospace"
            transform="rotate(8 340 83)"
          >
            {'</>'}
          </text>
        </g>
        <g className="art-sticker" transform="rotate(-12 103 140)">
          <rect x="47" y="108" width="89" height="48" rx="8" fill="var(--accent)" />
          <text x="65" y="139" fill="#fff" fontSize="20" fontFamily="monospace">
            {'{ }'}
          </text>
        </g>
      </svg>
      <span className="art-label label-bottom">INTERFACES / AUTH / DATA / AI</span>
      <span className="art-coordinate">japle.dev</span>
    </div>
  )
}
