import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { motion, MotionConfig } from 'motion/react'
import { useSceneMotion } from './hooks/useSceneMotion'
import { AmbientBackdrop } from './views/components/animations/AmbientBackdrop'
import { InteractiveCursor } from './views/components/animations/InteractiveCursor'
import { Header } from './views/components/layouts/Header'
import { Footer } from './views/components/layouts/Footer'
const HomePage = lazy(() => import('./views/pages/HomePage'))
import NotFoundPage from './views/pages/NotFoundPage'
const ProjectPage = lazy(() => import('./views/pages/ProjectPage'))
function PageRoutes() {
  const { pathname } = useLocation()
  return (
    <motion.div
      className="route-stage"
      key={pathname}
      initial={{ opacity: 0.5, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Suspense
        fallback={
          <div className="page-loading" role="status">
            <span className="wordmark">
              japle<span className="wordmark-dot">.dev</span>
            </span>
            <p>Loading portfolio…</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </motion.div>
  )
}
function NavigationEffects() {
  useSceneMotion()
  const { pathname, hash } = useLocation()
  const previousPath = useRef(pathname)
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (previousPath.current !== pathname)
        document.getElementById('main-content')?.focus({ preventScroll: true })
      previousPath.current = pathname
      return
    }
    previousPath.current = pathname
    const frame = requestAnimationFrame(() =>
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      }),
    )
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AmbientBackdrop />
        <InteractiveCursor />
        <NavigationEffects />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <PageRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  )
}
