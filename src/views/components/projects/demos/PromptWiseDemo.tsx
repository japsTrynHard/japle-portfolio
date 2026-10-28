import { useState } from 'react'
import { Check, Circle, Sparkles } from 'lucide-react'
import { evaluatePrompt } from '../../../../utils/promptRubric'
const samples = [
  'Tell me about AI.',
  'Explain AI for a beginner in 5 bullet points. Include sources and flag uncertainty.',
]
export function PromptWiseDemo() {
  const [text, setText] = useState(samples[0])
  const [result, setResult] = useState<ReturnType<typeof evaluatePrompt> | null>(null)
  return (
    <div className="prompt-demo">
      <div>
        <label className="field-label" htmlFor="sample-prompt">
          Your practice prompt
        </label>
        <textarea
          id="sample-prompt"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            setResult(null)
          }}
          maxLength={1500}
          rows={5}
        />
        <div className="sample-buttons">
          <span className="mono">TRY A SAMPLE</span>
          {samples.map((sample, index) => (
            <button
              key={sample}
              onClick={() => {
                setText(sample)
                setResult(null)
              }}
            >
              {index === 0 ? 'Basic prompt' : 'Structured prompt'}
            </button>
          ))}
        </div>
        <button
          className="button primary"
          disabled={!text.trim()}
          onClick={() => setResult(evaluatePrompt(text))}
        >
          Review my prompt <Sparkles size={16} />
        </button>
        <p className="demo-fine-print">
          Local keyword rubric only. No AI model, external request, or semantic assessment.
        </p>
      </div>
      <div className="prompt-feedback" aria-live="polite">
        <span className="eyebrow">TRANSPARENT FEEDBACK</span>
        <h3>
          {result
            ? `${result.filter((item) => item.passed).length} of 4 signals found`
            : 'Prompt assessment.'}
        </h3>
        <p>Look for a task, context, format, and a way to verify.</p>
        {(result ?? evaluatePrompt('')).map((item) => (
          <div className={`rubric-row ${result && item.passed ? 'passed' : ''}`} key={item.name}>
            {result && item.passed ? <Check size={17} /> : <Circle size={15} />}
            <div>
              <strong>{item.name}</strong>
              <span>{item.hint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
