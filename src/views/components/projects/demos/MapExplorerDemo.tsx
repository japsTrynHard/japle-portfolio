import { useState } from 'react'
import { Check, GripVertical, RotateCcw } from 'lucide-react'
const regions = [
  { name: 'Ilocos Region', group: 'Luzon', code: 'Region I' },
  { name: 'Western Visayas', group: 'Visayas', code: 'Region VI' },
  { name: 'Davao Region', group: 'Mindanao', code: 'Region XI' },
]
export function MapExplorerDemo() {
  const [selected, setSelected] = useState<string | null>(null),
    [placed, setPlaced] = useState<string[]>([]),
    [message, setMessage] = useState(
      'Pick a region, then choose its island group. You can also drag and drop.',
    )
  function place(name: string | null, group: string) {
    const region = regions.find((item) => item.name === name)
    if (!region || placed.includes(region.name)) return
    if (region.group !== group) {
      setMessage(`${region.name} belongs to a different island group. Try again!`)
      return
    }
    const next = [...placed, region.name]
    setPlaced(next)
    setSelected(null)
    setMessage(
      next.length === regions.length
        ? 'All three matched! You connected Luzon, Visayas, and Mindanao.'
        : `${region.name} matched to ${group}. Match confirmed.`,
    )
  }
  return (
    <div>
      <div className="puzzle-heading">
        <h3>Region matching exercise.</h3>
        <span className="mono">{placed.length} / 3 MATCHED</span>
      </div>
      <div className="puzzle-pieces" role="group" aria-label="Choose a region">
        {regions.map((region) => (
          <button
            key={region.name}
            aria-label={`${region.name}, ${region.code}`}
            draggable={!placed.includes(region.name)}
            disabled={placed.includes(region.name)}
            aria-pressed={selected === region.name}
            className={selected === region.name ? 'puzzle-piece selected' : 'puzzle-piece'}
            onDragStart={(event) => {
              event.dataTransfer.setData('text/plain', region.name)
              setSelected(region.name)
            }}
            onClick={() => setSelected(region.name)}
          >
            {placed.includes(region.name) ? <Check size={17} /> : <GripVertical size={17} />}
            <span>
              {region.name}
              <small>{region.code}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="puzzle-targets" role="group" aria-label="Island group targets">
        {['Luzon', 'Visayas', 'Mindanao'].map((group) => (
          <button
            key={group}
            className="puzzle-target"
            aria-label={`Place selected region in ${group}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              place(event.dataTransfer.getData('text/plain'), group)
            }}
            onClick={() => place(selected, group)}
          >
            <span className={`island-shape island-${group.toLowerCase()}`} aria-hidden="true" />
            <strong>{group}</strong>
            <span>
              {placed.find(
                (name) => regions.find((region) => region.name === name)?.group === group,
              ) ?? 'Drop or tap to place'}
            </span>
          </button>
        ))}
      </div>
      <p className="puzzle-message" role="status">
        {message}
      </p>
      <div className="puzzle-footer">
        <a
          href="https://psa.gov.ph/classification/psgc/regions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Region names: Philippine Statistics Authority ↗
        </a>
        <button
          className="text-link"
          onClick={() => {
            setPlaced([])
            setSelected(null)
            setMessage('Pick a region, then choose its island group.')
          }}
        >
          <RotateCcw size={14} /> Reset puzzle
        </button>
      </div>
    </div>
  )
}
