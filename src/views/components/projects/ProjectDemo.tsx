import { lazy, Suspense } from 'react'
import type { ProjectId } from '../../../models/Project'
const CarmeLink = lazy(() =>
  import('./demos/CarmeLinkDemo').then((module) => ({ default: module.CarmeLinkDemo })),
)
const PromptWise = lazy(() =>
  import('./demos/PromptWiseDemo').then((module) => ({ default: module.PromptWiseDemo })),
)
const AutoSched = lazy(() =>
  import('./demos/AutoSchedDemo').then((module) => ({ default: module.AutoSchedDemo })),
)
const Bayanihan = lazy(() =>
  import('./demos/BayanihanDemo').then((module) => ({ default: module.BayanihanDemo })),
)
const RodelConnect = lazy(() =>
  import('./demos/RodelConnectDemo').then((module) => ({ default: module.RodelConnectDemo })),
)
const MapExplorer = lazy(() =>
  import('./demos/MapExplorerDemo').then((module) => ({ default: module.MapExplorerDemo })),
)
const demos = {
  carmelink: CarmeLink,
  promptwise: PromptWise,
  'autosched-ai': AutoSched,
  'bayanihan-link': Bayanihan,
  rodelconnect: RodelConnect,
  'map-explorer': MapExplorer,
}
export function ProjectDemo({ id }: { id: ProjectId }) {
  const Demo = demos[id]
  return (
    <div className="demo-shell">
      <div className="demo-shell-header">
        <span className="status-dot" />
        <span className="mono">INTERACTIVE PORTFOLIO DEMO</span>
        <span className="demo-label">Fictional data · runs locally</span>
      </div>
      <div className="demo-content">
        <Suspense fallback={<p>Opening the interactive preview…</p>}>
          <Demo />
        </Suspense>
      </div>
    </div>
  )
}
