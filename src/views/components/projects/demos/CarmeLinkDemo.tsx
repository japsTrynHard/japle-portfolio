import { useState } from 'react'
import { Bell, Building2, CheckCircle2, KeyRound } from 'lucide-react'
const roles = {
  Tenant: {
    greeting: 'Hello, Alex.',
    subtitle: 'Tenant account overview.',
    cards: [
      ['Room assignment', 'Room B-204'],
      ['Contract', 'Sample active tenancy'],
      ['Maintenance', 'Desk lamp · reported'],
    ],
    notification: 'A sample announcement: common-area cleaning is scheduled for Friday.',
  },
  Guardian: {
    greeting: 'Hello, Sam.',
    subtitle: 'Guardian account overview.',
    cards: [
      ['Linked tenant', 'Alex · fictional resident'],
      ['Room', 'Building B · Room 204'],
      ['Curfew summary', 'Sample status: checked in'],
    ],
    notification: 'This sample status is fictional and does not use location tracking.',
  },
  Staff: {
    greeting: 'Welcome, staff.',
    subtitle: 'Staff operations overview.',
    cards: [
      ['Room B-204', 'Sample occupied room'],
      ['Maintenance queue', 'Desk lamp · awaiting review'],
      ['Visitor record', 'Sample visit · scheduled'],
    ],
    notification: 'One fictional maintenance request is ready for review.',
  },
}
export function CarmeLinkDemo() {
  const [role, setRole] = useState<keyof typeof roles>('Tenant')
  const data = roles[role]
  return (
    <div>
      <div className="demo-tabs" role="group" aria-label="Preview a dormitory role">
        {Object.keys(roles).map((item) => (
          <button
            key={item}
            className={item === role ? 'selected' : ''}
            aria-pressed={item === role}
            onClick={() => setRole(item as keyof typeof roles)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="role-preview" key={role}>
        <span className="eyebrow">
          <Building2 size={15} /> {role.toUpperCase()} VIEW
        </span>
        <h3>{data.greeting}</h3>
        <p>{data.subtitle}</p>
        <div className="demo-stat-grid">
          {data.cards.map(([label, value], index) => (
            <div key={label}>
              {index === 0 ? <KeyRound size={19} /> : <CheckCircle2 size={19} />}
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="demo-notice">
          <Bell size={17} />
          {data.notification}
        </div>
      </div>
    </div>
  )
}
