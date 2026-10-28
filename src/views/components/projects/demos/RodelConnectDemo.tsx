import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Utensils } from 'lucide-react'
const packages = [
  { name: 'Intimate Gathering', price: 450, text: 'A simple sample menu for a small occasion.' },
  { name: 'Celebration', price: 650, text: 'A fictional expanded menu for a special event.' },
  { name: 'Signature', price: 850, text: 'An illustrative premium package.' },
]
export function RodelConnectDemo() {
  const [step, setStep] = useState(0),
    [selected, setSelected] = useState(0),
    [guests, setGuests] = useState(50),
    [event, setEvent] = useState('Birthday'),
    [date, setDate] = useState(''),
    [finished, setFinished] = useState(false),
    [error, setError] = useState('')
  return (
    <div>
      <ol className="demo-stepper">
        {['Choose a package', 'Event details', 'Sample quote'].map((name, i) => (
          <li key={name} className={step >= i ? 'active' : ''}>
            <span>{i + 1}</span>
            {name}
          </li>
        ))}
      </ol>
      {step === 0 && (
        <div className="package-grid" role="group" aria-label="Sample catering packages">
          {packages.map((item, index) => (
            <button
              key={item.name}
              className={selected === index ? 'package-card selected' : 'package-card'}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <Utensils size={24} />
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <strong>
                ₱{item.price}
                <small> / guest · sample</small>
              </strong>
              {selected === index && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="booking-form">
          <h3>Configure sample event details.</h3>
          <label>
            Event type
            <select value={event} onChange={(e) => setEvent(e.target.value)}>
              {['Birthday', 'Wedding', 'Community gathering'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Event date
            <input
              type="date"
              value={date}
              required
              onChange={(e) => {
                setDate(e.target.value)
                setError('')
              }}
            />
          </label>
          <label>
            Number of guests (20–300)
            <input
              type="number"
              min={20}
              max={300}
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                setError('')
              }}
            />
          </label>
          {error && <p role="alert">{error}</p>}
        </div>
      )}
      {step === 2 && (
        <div className="quote-preview">
          <span className="eyebrow">ILLUSTRATIVE ESTIMATE</span>
          <h3>{finished ? 'Your sample plan is ready.' : 'Sample event quotation.'}</h3>
          <dl>
            <div>
              <dt>Package</dt>
              <dd>{packages[selected].name}</dd>
            </div>
            <div>
              <dt>Event</dt>
              <dd>
                {event} · {date}
              </dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{guests}</dd>
            </div>
            <div>
              <dt>Sample total</dt>
              <dd>₱{(guests * packages[selected].price).toLocaleString('en-PH')}</dd>
            </div>
          </dl>
          <p>
            No booking is created. Prices are fictional. No payment, tax, availability, or actual
            quote is represented.
          </p>
          {finished && (
            <p role="status">
              <Check size={16} /> Sample configuration completed locally.
            </p>
          )}
        </div>
      )}
      <div className="demo-wizard-actions">
        {step > 0 && (
          <button
            className="button secondary"
            onClick={() => {
              setStep(step - 1)
              setFinished(false)
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        {step < 2 ? (
          <button
            className="button primary"
            onClick={() => {
              if (
                step === 1 &&
                !(Number.isInteger(guests) && guests >= 20 && guests <= 300 && date)
              ) {
                setError('Choose a date and a whole number between 20 and 300 guests.')
                return
              }
              setStep(step + 1)
            }}
          >
            Continue <ArrowRight size={16} />
          </button>
        ) : (
          <button
            className="button primary"
            onClick={() => {
              if (finished) {
                setStep(0)
                setFinished(false)
              } else setFinished(true)
            }}
          >
            {finished ? 'Build another sample' : 'Finish sample plan'}
            <Check size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
