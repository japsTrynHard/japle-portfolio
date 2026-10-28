import { useEffect, useState } from 'react'
import { ArrowRight, Check, FileScan, RotateCcw } from 'lucide-react'
const classes = [
  { name: 'Web Development', day: 'Monday', time: '09:00–10:30' },
  { name: 'Database Systems', day: 'Wednesday', time: '13:00–14:30' },
  { name: 'Application Design', day: 'Friday', time: '10:00–11:30' },
]
export function AutoSchedDemo() {
  const [stage, setStage] = useState(0),
    [scanning, setScanning] = useState(false)
  const [day, setDay] = useState('Tuesday'),
    [priority, setPriority] = useState('High'),
    [added, setAdded] = useState(false)
  const [excluded, setExcluded] = useState<string[]>([])
  useEffect(() => {
    if (!scanning) return
    const timer = window.setTimeout(() => {
      setStage(1)
      setScanning(false)
    }, 700)
    return () => window.clearTimeout(timer)
  }, [scanning])
  return (
    <div>
      <ol className="demo-stepper">
        {['Sample COR', 'Review classes', 'Study plan'].map((name, i) => (
          <li key={name} className={stage >= i ? 'active' : ''}>
            <span>{stage > i ? <Check size={12} /> : i + 1}</span>
            {name}
          </li>
        ))}
      </ol>
      {stage === 0 && (
        <div className="sample-cor">
          <FileScan size={34} />
          <h3>Sample Certificate of Registration.</h3>
          <p>Alex Reyes · Sample Student · BS Information Technology</p>
          <div className="demo-table">
            <table>
              <caption className="sr-only">Fictional certificate of registration</caption>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Day</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="button primary" disabled={scanning} onClick={() => setScanning(true)}>
            {scanning ? 'Simulating extraction…' : 'Simulate COR extraction'}
            <ArrowRight size={16} />
          </button>
          <p className="demo-fine-print">
            Predefined local data. No upload, OCR service, or real student record.
          </p>
        </div>
      )}
      {stage === 1 && (
        <div>
          <h3>Review extracted classes.</h3>
          <p>
            The simulated extraction found these classes. Deselect a class to exclude it from your
            sample plan.
          </p>
          <div className="class-review">
            {classes.map((item) => (
              <label key={item.name}>
                <input
                  type="checkbox"
                  checked={!excluded.includes(item.name)}
                  onChange={(event) =>
                    setExcluded(
                      event.target.checked
                        ? excluded.filter((name) => name !== item.name)
                        : [...excluded, item.name],
                    )
                  }
                />
                <span>
                  <strong>{item.name}</strong>
                  <small>
                    {item.day} · {item.time}
                  </small>
                </span>
              </label>
            ))}
          </div>
          <button
            className="button primary"
            disabled={excluded.length === classes.length}
            onClick={() => setStage(2)}
          >
            Use these classes <ArrowRight size={16} />
          </button>
        </div>
      )}
      {stage === 2 && (
        <div>
          <h3>Configure a study session.</h3>
          <div className="demo-form-row">
            <label>
              Study day
              <select
                value={day}
                onChange={(event) => {
                  setDay(event.target.value)
                  setAdded(false)
                }}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Priority
              <select
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value)
                  setAdded(false)
                }}
              >
                {['High', 'Medium', 'Low'].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button className="button primary" onClick={() => setAdded(true)}>
              Add study session
            </button>
          </div>
          <div className="sample-timetable">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((item) => (
              <div key={item}>
                <strong>{item}</strong>
                {classes
                  .filter((subject) => subject.day === item && !excluded.includes(subject.name))
                  .map((subject) => (
                    <span key={subject.name}>
                      {subject.name}
                      <small>{subject.time}</small>
                    </span>
                  ))}
                {added && day === item && (
                  <span className="study-session">
                    Independent study<small>16:00–17:00 · {priority} priority</small>
                  </span>
                )}
              </div>
            ))}
          </div>
          <p aria-live="polite" className="demo-fine-print">
            {added
              ? `Study session added on ${day}, with ${priority.toLowerCase()} priority.`
              : 'Choose a day to add a fictional study session.'}
          </p>
        </div>
      )}
      {stage > 0 && (
        <button
          className="text-link demo-reset"
          onClick={() => {
            setStage(0)
            setAdded(false)
            setExcluded([])
          }}
        >
          <RotateCcw size={14} /> Start again
        </button>
      )}
    </div>
  )
}
